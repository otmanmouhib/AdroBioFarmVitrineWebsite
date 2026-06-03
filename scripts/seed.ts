import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { Document, GridFSBucket, MongoClient } from 'mongodb';
import { boutiqueCategories, boutiqueProducts } from '../data/boutique';
import { newsPosts } from '../data/news';
import { poles } from '../data/poles';
import { products } from '../data/products';
import { services } from '../data/services';

config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'adrobiofarm';

if (!uri) {
  throw new Error('MONGODB_URI must be set in .env.local or environment variables.');
}

const client = new MongoClient(uri);

type ImageDoc = {
  slug: string;
  sourceCollection: string;
  sourceSlug: string;
  title: string;
  src: string;
  alt: string;
  kind: string;
  pole?: string;
  domain?: string;
  category?: string;
  subcategory?: string;
  fileId?: unknown;
  contentType?: string;
};

function buildImageDocs(): ImageDoc[] {
  const images: ImageDoc[] = [];

  products.forEach((product) => {
    if (product.image) {
      images.push({
        slug: `products-${product.slug}`,
        sourceCollection: 'products',
        sourceSlug: product.slug,
        title: product.title,
        src: product.image,
        alt: `Image for ${product.title}`,
        kind: 'product',
        pole: product.pole,
        domain: product.domain,
        category: product.category,
      });
    }
  });

  services.forEach((service) => {
    if (service.image) {
      images.push({
        slug: `services-${service.slug}`,
        sourceCollection: 'services',
        sourceSlug: service.slug,
        title: service.title,
        src: service.image,
        alt: `Image for ${service.title}`,
        kind: 'service',
        pole: service.pole,
        domain: service.domain,
        category: service.category,
      });
    }
  });

  boutiqueProducts.forEach((product) => {
    if (product.image) {
      images.push({
        slug: `boutiqueProducts-${product.slug}`,
        sourceCollection: 'boutiqueProducts',
        sourceSlug: product.slug,
        title: product.title,
        src: product.image,
        alt: `Image for ${product.title}`,
        kind: 'boutique',
        category: product.category,
        subcategory: product.subcategory,
      });
    }
  });

  newsPosts.forEach((post) => {
    if (post.image) {
      images.push({
        slug: `news-${post.slug}`,
        sourceCollection: 'news',
        sourceSlug: post.slug,
        title: post.title,
        src: post.image,
        alt: `Image for ${post.title}`,
        kind: 'news',
        category: post.category,
      });
    }
  });

  return images;
}

async function buildPublicImageDocs(bucket: GridFSBucket): Promise<ImageDoc[]> {
  const publicDir = path.join(process.cwd(), 'public');
  const images: ImageDoc[] = [];

  async function addFile(fullPath: string) {
    const relativePath = path.relative(publicDir, fullPath).split(path.sep).join('/');
    const src = `/${relativePath}`;
    const ext = path.extname(fullPath).toLowerCase().substring(1);
    const contentType = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'application/octet-stream';
    const content = fs.readFileSync(fullPath);

    const uploadStream = bucket.openUploadStream(relativePath, {
      metadata: {
        sourceCollection: 'public',
        sourceSlug: relativePath,
        contentType,
      },
    });

    uploadStream.end(content);
    await new Promise<void>((resolve, reject) => {
      uploadStream.on('finish', () => resolve());
      uploadStream.on('error', (error) => reject(error));
    });

    images.push({
      slug: `public-${relativePath.replace(/[\/]/g, '-')}`,
      sourceCollection: 'public',
      sourceSlug: relativePath,
      title: path.basename(relativePath),
      src,
      alt: `Public asset ${relativePath}`,
      kind: 'public',
      fileId: uploadStream.id,
      contentType,
    });
  }

  async function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      await addFile(fullPath);
    }
  }

  if (fs.existsSync(publicDir)) {
    await walk(publicDir);
  }

  return images;
}

function mergeImageDocs(publicDocs: ImageDoc[], itemDocs: ImageDoc[]) {
  const map = new Map<string, ImageDoc>();
  for (const doc of [...publicDocs, ...itemDocs]) {
    const existing = map.get(doc.src);
    if (!existing) {
      map.set(doc.src, doc);
      continue;
    }
    if (existing.kind !== 'public' && doc.kind === 'public') {
      map.set(doc.src, doc);
    }
  }
  return Array.from(map.values());
}

async function seedCollection<T extends Document>(db: Awaited<ReturnType<typeof client.db>>, collectionName: string, docs: T[]) {
  const collection = db.collection<T>(collectionName);
  await collection.deleteMany({});
  if (docs.length > 0) {
    await collection.insertMany(docs as any[]);
  }
  if (['products', 'services', 'boutiqueProducts', 'news', 'poles', 'boutiqueCategories', 'images'].includes(collectionName)) {
    await collection.createIndex({ slug: 1 }, { unique: true, background: true });
  }
}

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);

    console.log('Seeding MongoDB database:', db.databaseName);

    await seedCollection(db, 'poles', poles);
    await seedCollection(db, 'products', products);
    await seedCollection(db, 'services', services);
    await seedCollection(db, 'boutiqueCategories', boutiqueCategories);
    await seedCollection(db, 'boutiqueProducts', boutiqueProducts);
    await seedCollection(db, 'news', newsPosts);

    await db.collection('images.files').deleteMany({});
    await db.collection('images.chunks').deleteMany({});
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    const publicImages = await buildPublicImageDocs(bucket);
    const itemImages = buildImageDocs();
    const mergedImages = mergeImageDocs(publicImages, itemImages);
    await seedCollection(db, 'images', mergedImages);

    console.log('Seed complete. Collections created: poles, products, services, boutiqueCategories, boutiqueProducts, news, images, images.files, images.chunks.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
