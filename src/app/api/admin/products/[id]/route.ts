import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getProducts, upsertProduct, deleteProduct } from '@/lib/store';
import type { Product } from '@/lib/data';

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    const body = (await request.json()) as Partial<Product>;
    const list = await getProducts();
    const existing = list.find((p) => p.id === id);
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const merged: Product = {
      ...existing,
      ...body,
      id: existing.id,
      priceEur: Number(body.priceEur ?? existing.priceEur) || 0,
      price: body.price || `${Number(body.priceEur ?? existing.priceEur) || 0}€/kg`,
    };
    await upsertProduct(merged);
    return NextResponse.json(merged);
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
