import { ObjectId } from "mongodb";
import { getPriceListsCollection } from "./database.js";

const seedMarkerId = "price-list-seed-v1";
const defaultPriceLists = [
  {
    _id: new ObjectId("66f000000000000000000001"),
    name: "Birgunj",
    address: "Lukahi Mai, Laxmanwa, Birgunj, Nepal",
    imagePath: "/Price/birgunj.webp",
    fileName: "Birgunj-Price-List.webp",
    contentType: "image/webp",
    isPublished: true,
    sortOrder: 0,
  },
  {
    _id: new ObjectId("66f000000000000000000002"),
    name: "Birtamode",
    address: "Charpani, near Heaven’s Water Park, Birtamode",
    imagePath: "/Price/birtamode.webp",
    fileName: "Birtamode-Price-List.webp",
    contentType: "image/webp",
    isPublished: true,
    sortOrder: 1,
  },
];

export async function ensurePriceListsSeeded() {
  const collection = await getPriceListsCollection();
  if (await collection.findOne({ _id: seedMarkerId })) return collection;

  for (const item of defaultPriceLists) {
    const { _id, ...fields } = item;
    await collection.updateOne({ _id }, { $setOnInsert: fields }, { upsert: true });
  }
  await collection.updateOne(
    { _id: seedMarkerId },
    { $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
  return collection;
}

export function serializePriceList(item, { admin = false } = {}) {
  const id = item._id.toString();
  const fileId = item.imageFileId?.toString();
  const imageUrl = fileId
    ? admin
      ? `/api/admin/price-lists/${id}/file`
      : `/api/price-lists/files/${fileId}`
    : item.imagePath || "";

  return {
    id,
    name: item.name,
    address: item.address,
    imageUrl,
    fileName: item.fileName || "Price-List",
    contentType: item.contentType || "image/webp",
    isPublished: Boolean(item.isPublished),
    sortOrder: item.sortOrder || 0,
    updatedAt: item.updatedAt || null,
  };
}
