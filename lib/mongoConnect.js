import { MongoClient } from "mongodb";

async function connectToMongo() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`
  );
  return client;
}

export async function getCollection(collectionName) {
  const client = await connectToMongo();
  const db = client.db();
  return [db.collection(collectionName), client];
}

export async function queryOne(collectionName, query, projection, options) {
  const [collection, client] = await getCollection(collectionName);
  const result = await collection.findOne(query, projection, options);
  client.close();
  return result;
}

export async function queryCollection(collectionName, query, options) {
  const [collection, client] = await getCollection(collectionName);
  const result = await collection.find(query, options).toArray();
  client.close();
  return result;
}

export async function writeToCollection(collectionName, data) {
  const [collection, client] = await getCollection(collectionName);
  const result = await collection.insertOne(data);
  client.close();
  return result;
}
