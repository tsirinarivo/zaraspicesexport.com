import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getProducts, upsertProduct } from '@/lib/store';
import type { Product } from '@/lib/data';

function slugify(input: string): string {
  const COMBINING = new RegExp('[\\u0300-\\u036f]', 'g');
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getProducts());
}

export async function POST(request: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = (await request.json()) as Partial<Product>;
    const list = await getProducts();

    const id = String(Date.now());
    let slug = body.slug?.trim() || slugify(body.name?.fr || body.name?.en || `produit-${id}`);
    // Ensure slug uniqueness.
    while (list.some((p) => p.slug === slug)) slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

    const product: Product = {
      id,
      slug,
      name: body.name || { fr: 'Nouveau produit', en: 'New product' },
      tagline: body.tagline || { fr: '', en: '' },
      description: body.description || { fr: '', en: '' },
      price: body.price || `${body.priceEur ?? 0}€/kg`,
      priceEur: Number(body.priceEur) || 0,
      priceNote: body.priceNote,
      category: body.category || 'spices',
      featured: Boolean(body.featured),
      specs: body.specs || [],
      gradient: body.gradient || 'from-amber-950 via-amber-900 to-stone-900',
      accentColor: body.accentColor || '#C8A96E',
      emoji: body.emoji || '🌿',
      sensoryProfile:
        body.sensoryProfile || {
          vanillin: 50,
          floral: 50,
          sweetness: 50,
          richness: 50,
          suppleness: 50,
          purity: 50,
        },
      lot: body.lot,
      harvest: body.harvest,
    };

    await upsertProduct(product);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }
}
