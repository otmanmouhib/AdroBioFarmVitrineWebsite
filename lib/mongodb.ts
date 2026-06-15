import type { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'adrobiofarm';

if (!uri) {
  throw new Error('MONGODB_URI must be set in .env.local or environment variables.');
}

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient> | undefined = globalWithMongo._mongoClientPromise;

async function getClientPromise(): Promise<MongoClient> {
  if (!clientPromise) {
    const { MongoClient } = await import('mongodb');
    clientPromise = new MongoClient(uri).connect();
    globalWithMongo._mongoClientPromise = clientPromise;
  }
  return clientPromise;
}

export async function getDb(dbNameOverride?: string): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbNameOverride ?? dbName);
}

export async function getGridFSBucket() {
  const { GridFSBucket } = await import('mongodb');
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: 'images' });
}
