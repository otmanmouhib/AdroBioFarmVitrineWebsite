import { NextRequest, NextResponse } from 'next/server';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { getDb } from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const src = url.searchParams.get('src');
  const id = url.searchParams.get('id');

  if (!src && !id) {
    return NextResponse.json({ error: 'Missing src or id query parameter.' }, { status: 400 });
  }

  const db = await getDb();
  const bucket = new GridFSBucket(db, { bucketName: 'images' });

  let fileId;
  let contentType = 'application/octet-stream';

  if (id) {
    try {
      fileId = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: 'Invalid id parameter.' }, { status: 400 });
    }
  } else {
    const imageMeta = await db.collection('images').findOne({ src });
    if (!imageMeta?.fileId) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }
    fileId = imageMeta.fileId;
    contentType = imageMeta.contentType ?? contentType;
  }

  const downloadStream = bucket.openDownloadStream(fileId);
  const readableStream = Readable.toWeb(downloadStream) as unknown as globalThis.ReadableStream;
  const headers = new Headers({ 'Content-Type': contentType });

  return new Response(readableStream, { headers });
}
