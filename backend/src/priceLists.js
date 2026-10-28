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
    properties: [
      { name: "Suryoday 7 BHK (G+1)", landArea: "2800", carpetArea: "2820", bua: "3700", price: "1,40,00,000", otherExpenses: "3,00,000" },
      { name: "Suryoday 5 BHK", landArea: "2230", carpetArea: "2240", bua: "2900", price: "1,10,00,000", otherExpenses: "3,00,000" },
      { name: "Kanchanjunga 5 BHK (G+1)", landArea: "1800", carpetArea: "1680", bua: "2450", price: "90,00,000", otherExpenses: "2,50,000" },
      { name: "Bagmati 4 BHK (G+1)", landArea: "1463", carpetArea: "1740", bua: "2250", price: "80,00,000", otherExpenses: "2,00,000" },
      { name: "Pashupati 3 BHK (G+1)", landArea: "1540", carpetArea: "1156", bua: "1460", price: "65,00,000", otherExpenses: "2,00,000" },
      { name: "Simplex 2 BHK (G)", landArea: "1413", carpetArea: "650", bua: "850", price: "51,00,000", otherExpenses: "2,00,000" },
    ],
    specifications: [
      { name: "Structure", detail: "R.C.C. Frame" }, { name: "Wall", detail: "5\" Brick Work" }, { name: "Flooring", detail: "24\"×48\" Tiles" },
      { name: "Wall Interior", detail: "Wall Putty" }, { name: "Wall Exterior", detail: "Wall Putty with Weather Coat" }, { name: "Bathroom Tiles", detail: "12\"×18\" (Upto 7’)" },
      { name: "Kitchen Wall Tiles", detail: "2’ Height" }, { name: "Kitchen Top", detail: "Granite" }, { name: "CP Fitting", detail: "Branded" },
      { name: "Door Frame", detail: "Stone Frame" }, { name: "Door Shutter", detail: "Flush Door" }, { name: "Windows", detail: "UPVC" },
      { name: "Stair Railing", detail: "S.S. Railing" }, { name: "Stair Top", detail: "Slab Marble" }, { name: "No. of AC Points", detail: "Two Room" }, { name: "Electric Fitting", detail: "Branded" },
    ],
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
    properties: [],
    specifications: [],
  },
];

export async function ensurePriceListsSeeded() {
  const collection = await getPriceListsCollection();
  if (await collection.findOne({ _id: seedMarkerId })) {
    for (const item of defaultPriceLists) {
      await collection.updateOne(
        { _id: item._id, properties: { $exists: false } },
        { $set: { properties: item.properties, specifications: item.specifications } },
      );
    }
    return collection;
  }

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
    properties: Array.isArray(item.properties) ? item.properties : [],
    specifications: Array.isArray(item.specifications) ? item.specifications : [],
    imageUrl,
    fileName: item.fileName || "Price-List",
    contentType: item.contentType || "image/webp",
    isPublished: Boolean(item.isPublished),
    sortOrder: item.sortOrder || 0,
    updatedAt: item.updatedAt || null,
  };
}
