import { getDb } from './mongodb';
import { enterpriseInfo } from '../data/enterprise';
import type { Product } from '../data/products';
import type { Service } from '../data/services';
import type { BoutiqueCategory, BoutiqueProduct } from '../data/boutique';
import type { NewsCategory, NewsPost } from '../data/news';
import type { Pole } from '../data/poles';
import type { EnterpriseInfo } from '../data/enterprise';

export async function getPoles(): Promise<Pole[]> {
  const db = await getDb();
  return db.collection<Pole>('poles').find({}, { projection: { _id: 0 } }).toArray();
}

export async function getEnterpriseInfo(): Promise<EnterpriseInfo> {
  const db = await getDb();
  const collection = db.collection<EnterpriseInfo>('entrepriseInfo');
  await collection.updateOne(
    { key: enterpriseInfo.key },
    { $setOnInsert: enterpriseInfo },
    { upsert: true },
  );

  const record = await collection.findOne({ key: enterpriseInfo.key }, { projection: { _id: 0 } });
  return record ?? enterpriseInfo;
}

export async function getProducts(pole?: string | null, domain?: string | null): Promise<Product[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (pole) filter.pole = pole;
  if (domain) filter.domain = domain;
  return db.collection<Product>('products').find(filter, { projection: { _id: 0 } }).toArray();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await getDb();
  return db.collection<Product>('products').findOne({ slug }, { projection: { _id: 0 } });
}

export async function getServices(pole?: string | null, domain?: string | null): Promise<Service[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (pole) filter.pole = pole;
  if (domain) filter.domain = domain;
  return db.collection<Service>('services').find(filter, { projection: { _id: 0 } }).toArray();
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const db = await getDb();
  return db.collection<Service>('services').findOne({ slug }, { projection: { _id: 0 } });
}

export async function getBoutiqueCategories(): Promise<BoutiqueCategory[]> {
  const db = await getDb();
  return db.collection<BoutiqueCategory>('boutiqueCategories').find({}, { projection: { _id: 0 } }).toArray();
}

export async function getBoutiqueProducts(category?: string | null, subcategory?: string | null): Promise<BoutiqueProduct[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  return db.collection<BoutiqueProduct>('boutiqueProducts').find(filter, { projection: { _id: 0 } }).toArray();
}

export async function getBoutiqueProductBySlug(slug: string): Promise<BoutiqueProduct | null> {
  const db = await getDb();
  return db.collection<BoutiqueProduct>('boutiqueProducts').findOne({ slug }, { projection: { _id: 0 } });
}

export async function getNewsPosts(category?: string | null, subcategory?: string | null): Promise<NewsPost[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  return db.collection<NewsPost>('news').find(filter, { projection: { _id: 0 } }).toArray();
}

export async function getNewsCategories(): Promise<NewsCategory[]> {
  const db = await getDb();
  return db.collection<NewsCategory>('newsCategories').find({}, { projection: { _id: 0 } }).toArray();
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const db = await getDb();
  return db.collection<NewsPost>('news').findOne({ slug }, { projection: { _id: 0 } });
}
