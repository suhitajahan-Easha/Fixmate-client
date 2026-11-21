
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("MONGODB_URI is not defined");
// }

// const globalForMongo = globalThis as typeof globalThis & {
//   mongoClient?: MongoClient;
//   mongoClientPromise?: Promise<MongoClient>;
// };

// const client = globalForMongo.mongoClient ?? new MongoClient(uri);

// if (!globalForMongo.mongoClient) {
//   globalForMongo.mongoClient = client;
// }

// const clientPromise =
//   globalForMongo.mongoClientPromise ?? client.connect();

// if (!globalForMongo.mongoClientPromise) {
//   globalForMongo.mongoClientPromise = clientPromise;
// }

// export { client, clientPromise };
// export const db = client.db("Assignment-9ph");



import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export const client =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = client;
}

// export const db = client.db("Assignment-9ph");
export const db = client.db("Fixmate");


