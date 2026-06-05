import { promises as fs } from 'fs';
import path from 'path';
import {
  products as seedProducts,
  type Product,
} from '@/lib/data';
import { defaultContent, type SiteContent } from '@/lib/content';

/**
 * Tiny JSON file-based store. In production the DATA_DIR is mounted as a
 * Docker volume so the data survives container rebuilds. On first access each
 * file is seeded from the static defaults in data.ts / content.ts so the site
 * looks identical until something is edited from the admin panel.
 */

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

const FILES = {
  products: path.join(DATA_DIR, 'products.json'),
  content: path.join(DATA_DIR, 'content.json'),
  orders: path.join(DATA_DIR, 'orders.json'),
};

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  weightKg: number;
  quantity: number;
  priceEur: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'new' | 'processing' | 'shipped' | 'cancelled';
  currency: string;
  total: number;
  customer: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    country?: string;
    message?: string;
    [key: string]: unknown;
  };
  items: OrderItem[];
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJSON<T>(file: string, seed: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    // File doesn't exist yet — seed it.
    await ensureDir();
    await writeJSON(file, seed);
    return seed;
  }
}

async function writeJSON<T>(file: string, data: T): Promise<void> {
  await ensureDir();
  // Atomic write: write to a temp file then rename to avoid corruption.
  const tmp = `${file}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tmp, file);
}

/* ── Products ─────────────────────────────────────────────────────────── */

export async function getProducts(): Promise<Product[]> {
  return readJSON<Product[]>(FILES.products, seedProducts);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const list = await getProducts();
  return list.find((p) => p.slug === slug);
}

export async function saveProducts(list: Product[]): Promise<void> {
  await writeJSON(FILES.products, list);
}

export async function upsertProduct(product: Product): Promise<Product> {
  const list = await getProducts();
  const idx = list.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    list[idx] = product;
  } else {
    list.push(product);
  }
  await saveProducts(list);
  return product;
}

export async function deleteProduct(id: string): Promise<void> {
  const list = await getProducts();
  await saveProducts(list.filter((p) => p.id !== id));
}

/* ── Content ──────────────────────────────────────────────────────────── */

export async function getContent(): Promise<SiteContent> {
  const stored = await readJSON<Partial<SiteContent>>(FILES.content, defaultContent);
  // Merge with defaults so newly-added fields always have a value.
  return {
    hero: { ...defaultContent.hero, ...stored.hero },
    contact: { ...defaultContent.contact, ...stored.contact },
  };
}

export async function saveContent(content: SiteContent): Promise<void> {
  await writeJSON(FILES.content, content);
}

/* ── Orders ───────────────────────────────────────────────────────────── */

export async function getOrders(): Promise<Order[]> {
  const list = await readJSON<Order[]>(FILES.orders, []);
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addOrder(order: Order): Promise<void> {
  const list = await readJSON<Order[]>(FILES.orders, []);
  list.push(order);
  await writeJSON(FILES.orders, list);
}

export async function updateOrderStatus(
  id: string,
  status: Order['status']
): Promise<void> {
  const list = await readJSON<Order[]>(FILES.orders, []);
  const idx = list.findIndex((o) => o.id === id);
  if (idx >= 0) {
    list[idx].status = status;
    await writeJSON(FILES.orders, list);
  }
}

export async function deleteOrder(id: string): Promise<void> {
  const list = await readJSON<Order[]>(FILES.orders, []);
  await writeJSON(
    FILES.orders,
    list.filter((o) => o.id !== id)
  );
}
