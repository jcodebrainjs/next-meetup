import { MongoClient } from "mongodb";

let client = null;

async function getMongoClient() {
  if (!client) {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`
    );
  }
  return client;
}

function getCollection(client, collectionName) {
  const db = client.db();
  const collection = db.collection(collectionName);
  return collection;
}

export async function queryOne(collectionName, query, projection, options) {
  const client = await getMongoClient();
  const result = await getCollection(client, collectionName).findOne(
    query,
    projection,
    options
  );
  client.close();
  return result;
}

export async function queryCollection(collectionName, query, options) {
  const client = await getMongoClient();
  const result = await getCollection(client, collectionName)
    .find(query, options)
    .toArray();
  client.close();
  return result;
}

export async function writeToCollection(collectionName, data) {
  const client = await getMongoClient();
  const result = await getCollection(client, collectionName).insertOne(data);
  client.close();
  return result;
}
