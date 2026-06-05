import { getOrders } from '@/lib/store';
import OrdersManager from '@/components/admin/OrdersManager';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return <OrdersManager initialOrders={orders} />;
}
