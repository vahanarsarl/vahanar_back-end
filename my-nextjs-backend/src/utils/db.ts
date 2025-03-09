import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the MongoClient is not constantly created
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
};

export const queryDatabase = async (collectionName: string, query: object) => {
  const { db } = await connectToDatabase();
  const collection = db.collection(collectionName);
  return await collection.find(query).toArray();
};