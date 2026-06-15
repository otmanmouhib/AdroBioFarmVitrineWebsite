import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { enterpriseInfo } from '../data/enterprise';

config({ path: '.env.local' });

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_ENTERPRISE || 'atlanticdunes';

if (!uri) {
  throw new Error('MONGODB_URI must be set in .env.local or environment variables.');
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('entrepriseInfo');

    const result = await collection.updateOne(
      { key: enterpriseInfo.key },
      { $setOnInsert: enterpriseInfo },
      { upsert: true },
    );

    const savedInfo = await collection.findOne({ key: enterpriseInfo.key }, { projection: { _id: 0 } });
    console.log('Seeded entrepriseInfo into database:', dbName);
    console.log('Upsert result:', result);
    console.log('enterpriseInfo document:', savedInfo);
  } catch (error) {
    console.error('Failed to seed entrepriseInfo:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
