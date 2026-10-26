import { GridFSBucket, MongoClient } from "mongodb";

let databasePromise;

export function getDatabase() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!databasePromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    const databaseName = process.env.MONGODB_DATABASE || "vastuvihar";
    databasePromise = client.connect().then(() => client.db(databaseName)).catch((error) => {
      databasePromise = undefined;
      throw error;
    });
  }

  return databasePromise;
}

export async function getEnquiriesCollection() {
  const database = await getDatabase();
  return database.collection("enquiries");
}

export async function getPriceListsCollection() {
  const database = await getDatabase();
  return database.collection("priceLists");
}

export async function getPriceListFilesBucket() {
  const database = await getDatabase();
  return new GridFSBucket(database, { bucketName: "priceListFiles" });
}
