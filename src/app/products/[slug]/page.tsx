import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/store';
import ProductDetail from './ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
