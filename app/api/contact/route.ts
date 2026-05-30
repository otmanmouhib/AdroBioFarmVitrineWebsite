import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const dbName = process.env.MONGODB_DB || 'adrobiofarm';
const collectionName = 'contacts';

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not configured.');
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export async function POST(request: NextRequest) {
  const clientPromise = getClientPromise();
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Les champs nom, email et message sont obligatoires.' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  await collection.insertOne({
    name: String(name),
    email: String(email),
    subject: subject ? String(subject) : '',
    message: String(message),
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
