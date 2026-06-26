import { NextRequest, NextResponse } from 'next/server';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { getDb } from '../../../lib/mongodb';

type DbImageDocument = {
  _id: ObjectId;
  src?: string;
  fileId?: ObjectId | string;
  contentType?: string;
  data?:
    | Buffer
    | { type: 'Buffer'; data: number[] }
    | { buffer: Uint8Array }
    | Uint8Array
    | ArrayBuffer
    | null;
};

function toBinaryData(value: DbImageDocument['data']): Buffer | null {
  if (!value) return null;
  if (Buffer.isBuffer(value)) return value;
  if (typeof value === 'object' && 'buffer' in value && value.buffer instanceof Uint8Array) {
    return Buffer.from(value.buffer);
  }
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (value instanceof ArrayBuffer) return Buffer.from(value);
  if (typeof value === 'object' && 'type' in value && value.type === 'Buffer' && Array.isArray(value.data)) {
    return Buffer.from(value.data);
  }
  return null;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const src = url.searchParams.get('src');
  const id = url.searchParams.get('id');

  if (!src && !id) {
    return NextResponse.json({ error: 'Missing src or id query parameter.' }, { status: 400 });
  }

  const db = await getDb();
  const bucket = new GridFSBucket(db, { bucketName: 'images' });
  const imagesCollection = db.collection<DbImageDocument>('images');

  let fileId: ObjectId | string | undefined;
  let contentType = 'application/octet-stream';
  let directImage: DbImageDocument | null = null;

  if (id) {
    try {
      fileId = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: 'Invalid id parameter.' }, { status: 400 });
    }

    directImage = await imagesCollection.findOne({ _id: fileId as ObjectId });
    if (directImage?.contentType) {
      contentType = directImage.contentType;
    }

    const binaryData = toBinaryData(directImage?.data ?? null);
    if (binaryData) {
      return new Response(binaryData, {
        headers: new Headers({
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        }),
      });
    }

    if (directImage?.fileId) {
      fileId = directImage.fileId;
    }
  } else {
    const imageMeta = await imagesCollection.findOne({ src: src ?? undefined });
    const binaryData = toBinaryData(imageMeta?.data ?? null);
    if (binaryData) {
      return new Response(binaryData, {
        headers: new Headers({
          'Content-Type': imageMeta?.contentType ?? contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        }),
      });
    }

    if (!imageMeta?.fileId) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }

    fileId = imageMeta.fileId;
    contentType = imageMeta.contentType ?? contentType;
  }

  if (!fileId) {
    return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
  }

  let normalizedFileId: ObjectId;
  try {
    normalizedFileId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;
  } catch {
    return NextResponse.json({ error: 'Invalid fileId in image metadata.' }, { status: 500 });
  }

  const gridFsMeta = await db.collection('images.files').findOne(
    { _id: normalizedFileId },
    { projection: { _id: 1 } },
  );

  if (!gridFsMeta) {
    const imageById = await imagesCollection.findOne({ _id: normalizedFileId });
    const binaryData = toBinaryData(imageById?.data ?? null);
    if (binaryData) {
      return new Response(binaryData, {
        headers: new Headers({
          'Content-Type': imageById?.contentType ?? contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        }),
      });
    }

    return NextResponse.json({ error: 'Image file not found.' }, { status: 404 });
  }

  try {
    const downloadStream = bucket.openDownloadStream(normalizedFileId);
    const readableStream = Readable.toWeb(downloadStream) as unknown as globalThis.ReadableStream;
    const headers = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    });

    return new Response(readableStream, { headers });
  } catch {
    if (id) {
      const imageById = await imagesCollection.findOne({ _id: normalizedFileId });
      const binaryData = toBinaryData(imageById?.data ?? null);
      if (binaryData) {
        return new Response(binaryData, {
          headers: new Headers({
            'Content-Type': imageById?.contentType ?? contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          }),
        });
      }
    }

    return NextResponse.json({ error: 'Image file not found.' }, { status: 404 });
  }
}
