
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


//before gemini suggest code 
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("MONGODB_URI is not defined");
// }

// const globalForMongo = globalThis as typeof globalThis & {
//   mongoClient?: MongoClient;
// };

// export const client =
//   globalForMongo.mongoClient ?? new MongoClient(uri);

// if (!globalForMongo.mongoClient) {
//   globalForMongo.mongoClient = client;
// }
// export const db = client.db("Fixmate-9ph");
// // export const db = client.db("Assignment-9ph");
// // export const db = client.db("Fixmate");

//after gemini suggest code
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const options = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 20000,
  socketTimeoutMS: 45000,
};

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

function getClient(): MongoClient {
  const existing = globalForMongo.mongoClient as any;
  const isClosed =
    !existing ||
    existing.topology?.isClosed?.() === true ||
    existing.topology?.s?.state === "closed";

  if (isClosed) {
    const newClient = new MongoClient(uri!, options);

    newClient.on("topologyClosed", () => {
      if (globalForMongo.mongoClient === newClient) {
        globalForMongo.mongoClient = undefined;
      }
    });

    globalForMongo.mongoClient = newClient;
  }

  return globalForMongo.mongoClient!;
}

export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const currentDb = getClient().db("Fixmate-9ph");
    const value = Reflect.get(currentDb, prop, receiver);
    return typeof value === "function" ? value.bind(currentDb) : value;
  },
});
