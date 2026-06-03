import { GridFSBucket, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'adrobiofarm';

if (!uri) {
  throw new Error('MONGODB_URI must be set in .env.local or environment variables.');
}

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise = globalWithMongo._mongoClientPromise ?? (globalWithMongo._mongoClientPromise = new MongoClient(uri).connect());

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getGridFSBucket() {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: 'images' });
}
