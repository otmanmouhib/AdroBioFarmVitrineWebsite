import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { readFileSync, unlinkSync } from 'fs';

config({ path: '.env.local' });
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'adrobiofarm';
if (!uri) throw new Error('Missing MONGODB_URI');

const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);
const cols = await db.listCollections().toArray();
console.log('db:', dbName);
for (const c of cols) {
  const collection = db.collection(c.name);
  const count = await collection.countDocuments();
  const sample = count > 0 ? await collection.findOne() : null;
  const fields = sample ? Object.keys(sample) : [];
  console.log(`${c.name}\tcount=${count}\tfields=${fields.join(', ')}`);
}
await client.close();
