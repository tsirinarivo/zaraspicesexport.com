import { NextResponse } from 'next/server';
import { products } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  if (slug) {
    const product = products.find((p) => p.slug === slug);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  }

  const filtered = category ? products.filter((p) => p.category === category) : products;
  return NextResponse.json(filtered);
}
