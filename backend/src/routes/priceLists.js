import { ObjectId } from "mongodb";
import { Router } from "express";
import { getPriceListFilesBucket } from "../database.js";
import { ensurePriceListsSeeded, serializePriceList } from "../priceLists.js";

const router = Router();

router.get("/", async (_request, response, next) => {
  try {
    const priceLists = await ensurePriceListsSeeded();
    const items = await priceLists
      .find({ isPublished: true, _id: { $type: "objectId" } })
      .sort({ sortOrder: 1, name: 1 })
      .toArray();
    return response.json({ items: items.map((item) => serializePriceList(item)) });
  } catch (error) {
    return next(error);
  }
});

router.get("/files/:fileId", async (request, response, next) => {
  if (!/^[a-f\d]{24}$/i.test(request.params.fileId)) {
    return response.status(400).json({ error: "The price list file ID is invalid." });
  }

  try {
    const fileId = new ObjectId(request.params.fileId);
    const priceLists = await ensurePriceListsSeeded();
    const publishedItem = await priceLists.findOne({ imageFileId: fileId, isPublished: true });
    if (!publishedItem) {
      return response.status(404).json({ error: "The published price list file was not found." });
    }

    const bucket = await getPriceListFilesBucket();
    const file = await bucket.find({ _id: fileId }).limit(1).next();
    if (!file) return response.status(404).json({ error: "The price list file was not found." });

    response.set({
      "Content-Type": file.metadata?.contentType || "application/octet-stream",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    const stream = bucket.openDownloadStream(fileId);
    stream.on("error", (error) => {
      if (response.headersSent) response.destroy(error);
      else next(error);
    });
    return stream.pipe(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
