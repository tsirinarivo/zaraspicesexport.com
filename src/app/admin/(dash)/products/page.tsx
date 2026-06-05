import { getProducts } from '@/lib/store';
import ProductsManager from '@/components/admin/ProductsManager';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProducts();
  return <ProductsManager initialProducts={products} />;
}
