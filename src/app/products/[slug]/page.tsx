import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import ProductDetail from './ProductDetail';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
