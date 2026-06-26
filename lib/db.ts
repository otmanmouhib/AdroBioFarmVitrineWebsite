import { getDb } from './mongodb';
import { enterpriseInfo } from '../data/enterprise';
import type { Product } from '../data/products';
import type { Service } from '../data/services';
import type { BoutiqueCategory, BoutiqueProduct } from '../data/boutique';
import { boutiqueCategories as localBoutiqueCategories, boutiqueProducts as localBoutiqueProducts } from '../data/boutique';
import type { NewsCategory, NewsPost } from '../data/news';
import type { Pole } from '../data/poles';
import type { EnterpriseInfo } from '../data/enterprise';

type ProductDocument = Partial<Product> & {
  imageId?: unknown;
  tags?: unknown;
  category?: unknown;
  shortDescription?: unknown;
  description?: unknown;
  features?: unknown;
  price?: unknown;
  stock?: unknown;
};

type ServiceDocument = Partial<Service> & {
  imageId?: unknown;
  tags?: unknown;
  category?: string;
  methodology?: unknown;
  deliverables?: unknown;
};

type EnterpriseInfoDocument = Partial<EnterpriseInfo> & {
  phones?: unknown;
  fax?: unknown;
  addressLines?: unknown;
};

type BoutiqueProductDocument = Partial<BoutiqueProduct> & {
  category?: unknown;
  subcategory?: unknown;
  excerpt?: unknown;
  detail?: unknown;
  details?: unknown;
  imageId?: unknown;
  tags?: unknown;
  stock?: unknown;
};

type NewsPostDocument = Partial<NewsPost> & {
  imageId?: unknown;
  categoryId?: unknown;
  publishedAt?: unknown;
  author?: unknown;
  tags?: unknown;
  status?: unknown;
  content?: unknown;
};

function toStringValue(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (value && typeof value === 'object' && 'toString' in value && typeof value.toString === 'function') {
    const converted = value.toString().trim();
    return converted.length > 0 && converted !== '[object Object]' ? converted : undefined;
  }

  return undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => toStringValue(item))
    .filter((item): item is string => Boolean(item));
}

function toNumberValue(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value.trim());
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function toDateStringValue(value: unknown): string | undefined {
  const asString = toStringValue(value);
  if (!asString) return undefined;
  const timestamp = Date.parse(asString);
  return Number.isNaN(timestamp) ? undefined : new Date(timestamp).toISOString();
}

function mapEnterpriseInfoDocument(doc: EnterpriseInfoDocument | null): EnterpriseInfo {
  const phones = toStringArray(doc?.phones);
  const addressLines = toStringArray(doc?.addressLines);
  const fallbackAddress = addressLines.join(', ');
  const address = toStringValue(doc?.address) ?? (fallbackAddress.length > 0 ? fallbackAddress : enterpriseInfo.address);

  return {
    key: 'contact',
    companyName: toStringValue(doc?.companyName) ?? enterpriseInfo.companyName,
    email: toStringValue(doc?.email) ?? enterpriseInfo.email,
    phone: toStringValue(doc?.phone) ?? phones[0] ?? enterpriseInfo.phone,
    address,
    phones: phones.length > 0 ? phones : undefined,
    fax: toStringValue(doc?.fax),
    addressLines: addressLines.length > 0 ? addressLines : undefined,
  };
}

function mapProductDocument(doc: ProductDocument): Product {
  const shortDescription = toStringValue(doc.shortDescription)
    ?? toStringValue(doc.description)
    ?? toStringValue(doc.title)
    ?? '';

  const description = toStringValue(doc.description) ?? shortDescription;
  const image = toStringValue(doc.image) ?? toStringValue(doc.imageId);

  return {
    slug: toStringValue(doc.slug) ?? '',
    title: toStringValue(doc.title) ?? '',
    pole: toStringValue(doc.pole) ?? '',
    domain: toStringValue(doc.domain) ?? '',
    category: toStringValue(doc.category) ?? toStringValue(doc.domain) ?? 'Produit',
    shortDescription,
    description,
    features: toStringArray(doc.features),
    image,
    imageId: toStringValue(doc.imageId),
    tags: toStringArray(doc.tags),
    price: toNumberValue(doc.price),
    stock: toStringValue(doc.stock),
  };
}

function mapServiceDocument(doc: ServiceDocument): Service {
  const image = toStringValue(doc.image) ?? toStringValue(doc.imageId);

  return {
    slug: toStringValue(doc.slug) ?? '',
    title: toStringValue(doc.title) ?? '',
    pole: toStringValue(doc.pole) ?? '',
    domain: toStringValue(doc.domain) ?? '',
    category: toStringValue(doc.category) ?? toStringValue(doc.domain) ?? 'Service',
    description: toStringValue(doc.description) ?? '',
    methodology: toStringArray(doc.methodology),
    deliverables: toStringArray(doc.deliverables),
    duration: toStringValue(doc.duration),
    audience: toStringValue(doc.audience),
    image,
    imageId: toStringValue(doc.imageId),
    tags: toStringArray(doc.tags),
  };
}

function mapBoutiqueProductDocument(doc: BoutiqueProductDocument): BoutiqueProduct {
  const legacyDetailArray = toStringArray(doc.detail);
  const details = toStringArray(doc.details);
  const specs = toStringArray(doc.specs);
  const tags = toStringArray(doc.tags);
  const price = toNumberValue(doc.price) ?? 0;
  const stock = toStringValue(doc.stock);
  const stockCount = toNumberValue(stock) ?? 0;
  const image = toStringValue(doc.image) ?? toStringValue(doc.imageId) ?? '';
  const categorySlug = toStringValue(doc.boutiqueCategoryId) ?? toStringValue(doc.category) ?? '';
  const subcategorySlug = toStringValue(doc.boutiqueSubcategoryId) ?? toStringValue(doc.subcategory) ?? '';

  let availability: BoutiqueProduct['availability'];
  if (doc.availability === 'in-stock' || doc.availability === 'out-of-stock' || doc.availability === 'on-demand') {
    availability = doc.availability;
  } else {
    availability = stockCount > 0 ? 'in-stock' : 'out-of-stock';
  }

  return {
    slug: toStringValue(doc.slug) ?? '',
    title: toStringValue(doc.title) ?? '',
    shortDescription: toStringValue(doc.shortDescription) ?? toStringValue(doc.excerpt) ?? toStringValue(doc.description) ?? '',
    description: toStringValue(doc.description) ?? toStringValue(doc.excerpt) ?? '',
    details: details.length > 0 ? details : legacyDetailArray,
    detail: legacyDetailArray.length > 0 ? legacyDetailArray : undefined,
    specs: specs.length > 0 ? specs : tags,
    price,
    currency: toStringValue(doc.currency) ?? 'MAD',
    availability,
    inStock: availability === 'in-stock',
    inventoryCount: toNumberValue(doc.inventoryCount) ?? stockCount,
    sku: toStringValue(doc.sku) ?? `BOUT-${(toStringValue(doc.slug) ?? 'ITEM').toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`,
    featured: Boolean(doc.featured),
    status: doc.status === 'inactive' ? 'inactive' : 'active',
    tags,
    image,
    imageId: toStringValue(doc.imageId),
    stock,
    category: toStringValue(doc.category),
    subcategory: toStringValue(doc.subcategory),
    excerpt: toStringValue(doc.excerpt),
    gallery: toStringArray(doc.gallery),
    boutiqueCategoryId: categorySlug,
    boutiqueSubcategoryId: subcategorySlug,
    createdAt: toDateStringValue(doc.createdAt) ?? new Date().toISOString(),
    updatedAt: toDateStringValue(doc.updatedAt) ?? new Date().toISOString(),
  };
}

function mapNewsPostDocument(doc: NewsPostDocument): NewsPost {
  const image = toStringValue(doc.image) ?? toStringValue(doc.imageId) ?? '';
  const date = toDateStringValue(doc.date) ?? toDateStringValue(doc.publishedAt) ?? new Date().toISOString();

  return {
    slug: toStringValue(doc.slug) ?? '',
    title: toStringValue(doc.title) ?? '',
    date,
    category: toStringValue(doc.category) ?? toStringValue(doc.categoryId) ?? '',
    subcategory: toStringValue(doc.subcategory) ?? '',
    excerpt: toStringValue(doc.excerpt) ?? toStringValue(doc.summary) ?? '',
    summary: toStringValue(doc.summary) ?? toStringValue(doc.excerpt) ?? '',
    image,
    content: toStringArray(doc.content),
    imageId: toStringValue(doc.imageId),
    categoryId: toStringValue(doc.categoryId),
    publishedAt: toDateStringValue(doc.publishedAt),
    author: toStringValue(doc.author),
    tags: toStringArray(doc.tags),
    status: toStringValue(doc.status),
  };
}

export async function getPoles(): Promise<Pole[]> {
  const db = await getDb();
  return db.collection<Pole>('poles').find({}, { projection: { _id: 0 } }).toArray();
}

export async function getEnterpriseInfo(): Promise<EnterpriseInfo> {
  const db = await getDb();
  const collection = db.collection<EnterpriseInfoDocument>('entrepriseInfo');
  await collection.updateOne(
    { email: enterpriseInfo.email },
    { $setOnInsert: enterpriseInfo },
    { upsert: true },
  );

  const record = await collection.findOne({}, { projection: { _id: 0 } });
  return mapEnterpriseInfoDocument(record);
}

export async function getProducts(pole?: string | null, domain?: string | null): Promise<Product[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (pole) filter.pole = pole;
  if (domain) filter.domain = domain;
  const docs = await db.collection<ProductDocument>('products').find(filter, { projection: { _id: 0 } }).toArray();
  return docs.map(mapProductDocument).filter((product) => product.slug.length > 0 && product.title.length > 0);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await getDb();
  const doc = await db.collection<ProductDocument>('products').findOne({ slug }, { projection: { _id: 0 } });
  return doc ? mapProductDocument(doc) : null;
}

export async function getServices(pole?: string | null, domain?: string | null): Promise<Service[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (pole) filter.pole = pole;
  if (domain) filter.domain = domain;
  const docs = await db.collection<ServiceDocument>('services').find(filter, { projection: { _id: 0 } }).toArray();
  return docs.map(mapServiceDocument).filter((service) => service.slug.length > 0 && service.title.length > 0);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const db = await getDb();
  const doc = await db.collection<ServiceDocument>('services').findOne({ slug }, { projection: { _id: 0 } });
  return doc ? mapServiceDocument(doc) : null;
}

export async function getBoutiqueCategories(): Promise<BoutiqueCategory[]> {
  try {
    const db = await getDb();
    return db.collection<BoutiqueCategory>('boutiqueCategories').find({}).toArray();
  } catch {
    return localBoutiqueCategories;
  }
}

export async function getBoutiqueProducts(category?: string | null, subcategory?: string | null): Promise<BoutiqueProduct[]> {
  try {
    const db = await getDb();
    const filter: Record<string, unknown> = {};
    if (category && subcategory) {
      filter.$and = [
        { $or: [{ boutiqueCategoryId: category }, { category }] },
        { $or: [{ boutiqueSubcategoryId: subcategory }, { subcategory }] },
      ];
    } else {
      if (category) {
        filter.$or = [{ boutiqueCategoryId: category }, { category }];
      }
      if (subcategory) {
        filter.$or = [...(Array.isArray(filter.$or) ? filter.$or : []), { boutiqueSubcategoryId: subcategory }, { subcategory }];
      }
    }

    const docs = await db.collection<BoutiqueProductDocument>('boutique').find(filter).toArray();
    return docs
      .map(mapBoutiqueProductDocument)
      .filter((product) => product.slug.length > 0 && product.title.length > 0);
  } catch {
    return localBoutiqueProducts.filter((product) => {
      const categoryMatch = category
        ? (product.boutiqueCategoryId === category || product.category === category)
        : true;
      const subcategoryMatch = subcategory
        ? (product.boutiqueSubcategoryId === subcategory || product.subcategory === subcategory)
        : true;
      return categoryMatch && subcategoryMatch;
    });
  }
}

export async function getBoutiqueProductBySlug(slug: string): Promise<BoutiqueProduct | null> {
  try {
    const db = await getDb();
    const doc = await db.collection<BoutiqueProductDocument>('boutique').findOne({ slug });
    return doc ? mapBoutiqueProductDocument(doc) : null;
  } catch {
    return localBoutiqueProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getNewsPosts(category?: string | null, subcategory?: string | null): Promise<NewsPost[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (category) filter.$or = [{ category }, { categoryId: category }];
  if (subcategory) filter.subcategory = subcategory;
  const docs = await db.collection<NewsPostDocument>('news').find(filter, { projection: { _id: 0 } }).toArray();
  return docs
    .map(mapNewsPostDocument)
    .filter((post) => post.slug.length > 0 && post.title.length > 0);
}

export async function getNewsCategories(): Promise<NewsCategory[]> {
  const db = await getDb();
  return db.collection<NewsCategory>('newsCategories').find({}, { projection: { _id: 0 } }).toArray();
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const db = await getDb();
  const doc = await db.collection<NewsPostDocument>('news').findOne({ slug }, { projection: { _id: 0 } });
  return doc ? mapNewsPostDocument(doc) : null;
}
