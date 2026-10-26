import { Router, raw } from "express";
import { ObjectId } from "mongodb";
import { requireAdminApiKey } from "./admin.js";
import { getPriceListFilesBucket } from "../database.js";
import { ensurePriceListsSeeded, serializePriceList } from "../priceLists.js";

const router = Router();
const fileTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const rawPriceListFile = raw({ type: [...fileTypes], limit: "10mb" });

function readText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidFileSignature(buffer, contentType) {
  if (contentType === "image/webp") {
    return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF"
      && buffer.toString("ascii", 8, 12) === "WEBP";
  }
  if (contentType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (contentType === "image/jpeg") return buffer.length > 3 && buffer[0] === 255 && buffer[1] === 216 && buffer.at(-2) === 255 && buffer.at(-1) === 217;
  if (contentType === "application/pdf") return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  return false;
}

function cleanFileName(value) {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return "";
  }
  return decoded.replace(/[\\/\0]/g, "_").trim().slice(0, 120);
}

function sendGridFsFile(bucket, fileId, response, next) {
  const stream = bucket.openDownloadStream(fileId);
  stream.on("error", (error) => {
    if (response.headersSent) response.destroy(error);
    else next(error);
  });
  return stream.pipe(response);
}

router.get("/", requireAdminApiKey, async (_request, response, next) => {
  try {
    const priceLists = await ensurePriceListsSeeded();
    const items = await priceLists
      .find({ _id: { $type: "objectId" } })
      .sort({ sortOrder: 1, name: 1 })
      .toArray();
    return response.json({ items: items.map((item) => serializePriceList(item, { admin: true })) });
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAdminApiKey, async (request, response, next) => {
  const name = readText(request.body?.name, 80);
  const address = readText(request.body?.address, 240);
  if (!name || !address) {
    return response.status(400).json({ error: "Enter a branch name and address." });
  }

  try {
    const priceLists = await ensurePriceListsSeeded();
    const result = await priceLists.insertOne({
      name,
      address,
      imagePath: "",
      fileName: "",
      contentType: "",
      isPublished: false,
      sortOrder: Number.isSafeInteger(request.body.sortOrder) && request.body.sortOrder >= 0
        ? Math.min(request.body.sortOrder, 9999)
        : 999,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const item = await priceLists.findOne({ _id: result.insertedId });
    return response.status(201).json({ item: serializePriceList(item, { admin: true }) });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", requireAdminApiKey, async (request, response, next) => {
  if (!/^[a-f\d]{24}$/i.test(request.params.id)) {
    return response.status(400).json({ error: "The price list ID is invalid." });
  }

  const changes = {};
  if (Object.hasOwn(request.body || {}, "name")) {
    const name = readText(request.body.name, 80);
    if (!name) return response.status(400).json({ error: "Enter a branch name." });
    changes.name = name;
  }
  if (Object.hasOwn(request.body || {}, "address")) {
    const address = readText(request.body.address, 240);
    if (!address) return response.status(400).json({ error: "Enter a branch address." });
    changes.address = address;
  }
  if (Object.hasOwn(request.body || {}, "sortOrder")) {
    if (!Number.isSafeInteger(request.body.sortOrder) || request.body.sortOrder < 0 || request.body.sortOrder > 9999) {
      return response.status(400).json({ error: "Sort order must be a whole number between 0 and 9999." });
    }
    changes.sortOrder = request.body.sortOrder;
  }
  if (Object.hasOwn(request.body || {}, "isPublished")) {
    if (typeof request.body.isPublished !== "boolean") {
      return response.status(400).json({ error: "Published must be true or false." });
    }
    changes.isPublished = request.body.isPublished;
  }
  if (!Object.keys(changes).length) {
    return response.status(400).json({ error: "There are no valid price list changes to save." });
  }

  try {
    const priceLists = await ensurePriceListsSeeded();
    const id = new ObjectId(request.params.id);
    const current = await priceLists.findOne({ _id: id });
    if (!current) return response.status(404).json({ error: "That price list was not found." });
    if (changes.isPublished && !current.imageFileId && !current.imagePath) {
      return response.status(400).json({ error: "Upload a price list file before publishing this branch." });
    }

    await priceLists.updateOne({ _id: id }, { $set: { ...changes, updatedAt: new Date() } });
    const item = await priceLists.findOne({ _id: id });
    return response.json({ item: serializePriceList(item, { admin: true }) });
  } catch (error) {
    return next(error);
  }
});

router.put("/:id/file", requireAdminApiKey, rawPriceListFile, async (request, response, next) => {
  if (!/^[a-f\d]{24}$/i.test(request.params.id)) {
    return response.status(400).json({ error: "The price list ID is invalid." });
  }
  const contentType = (request.get("content-type") || "").split(";")[0].trim().toLowerCase();
  const fileName = cleanFileName(request.get("x-file-name") || "");
  if (!Buffer.isBuffer(request.body) || request.body.length === 0) {
    return response.status(400).json({ error: "Choose a price list file to upload." });
  }
  if (!fileTypes.has(contentType) || !isValidFileSignature(request.body, contentType)) {
    return response.status(400).json({ error: "Upload a valid WebP, PNG, JPEG, or PDF file." });
  }
  if (!fileName) return response.status(400).json({ error: "The file name is invalid." });

  try {
    const priceLists = await ensurePriceListsSeeded();
    const id = new ObjectId(request.params.id);
    const current = await priceLists.findOne({ _id: id });
    if (!current) return response.status(404).json({ error: "That price list was not found." });

    const bucket = await getPriceListFilesBucket();
    const fileId = new ObjectId();
    await new Promise((resolve, reject) => {
      const stream = bucket.openUploadStreamWithId(fileId, fileName, {
        metadata: { priceListId: id.toString(), contentType },
      });
      stream.once("error", reject);
      stream.once("finish", resolve);
      stream.end(request.body);
    });

    try {
      await priceLists.updateOne({ _id: id }, {
        $set: {
          imageFileId: fileId,
          imagePath: "",
          fileName,
          contentType,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      await bucket.delete(fileId).catch(() => {});
      throw error;
    }

    if (current.imageFileId) await bucket.delete(current.imageFileId).catch(() => {});
    const item = await priceLists.findOne({ _id: id });
    return response.json({ item: serializePriceList(item, { admin: true }) });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/file", requireAdminApiKey, async (request, response, next) => {
  if (!/^[a-f\d]{24}$/i.test(request.params.id)) {
    return response.status(400).json({ error: "The price list ID is invalid." });
  }
  try {
    const priceLists = await ensurePriceListsSeeded();
    const item = await priceLists.findOne({ _id: new ObjectId(request.params.id) });
    if (!item?.imageFileId) return response.status(404).json({ error: "That price list file was not found." });
    const bucket = await getPriceListFilesBucket();
    const file = await bucket.find({ _id: item.imageFileId }).limit(1).next();
    if (!file) return response.status(404).json({ error: "That price list file was not found." });
    response.set({
      "Content-Type": file.metadata?.contentType || "application/octet-stream",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    return sendGridFsFile(bucket, item.imageFileId, response, next);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", requireAdminApiKey, async (request, response, next) => {
  if (!/^[a-f\d]{24}$/i.test(request.params.id)) {
    return response.status(400).json({ error: "The price list ID is invalid." });
  }
  try {
    const priceLists = await ensurePriceListsSeeded();
    const id = new ObjectId(request.params.id);
    const item = await priceLists.findOne({ _id: id });
    if (!item) return response.status(404).json({ error: "That price list was not found." });
    await priceLists.deleteOne({ _id: id });
    if (item.imageFileId) {
      const bucket = await getPriceListFilesBucket();
      await bucket.delete(item.imageFileId).catch(() => {});
    }
    return response.json({ success: true, id: id.toString() });
  } catch (error) {
    return next(error);
  }
});

export default router;
