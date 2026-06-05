import { NextResponse } from 'next/server';
import { addOrder, type Order, type OrderItem } from '@/lib/store';

interface IncomingItem {
  productId?: string;
  productName?: string;
  slug?: string;
  weightKg?: number;
  quantity?: number;
  priceEur?: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total, currency } = body;

    const orderNumber = `ZSE-${Date.now().toString().slice(-6)}`;

    const order: Order = {
      id: String(Date.now()),
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'new',
      currency: currency || 'EUR',
      total: Number(total) || 0,
      customer: customer || {},
      items: ((items as IncomingItem[]) || []).map(
        (i): OrderItem => ({
          productId: i.productId || '',
          name: i.productName || '',
          slug: i.slug || '',
          weightKg: Number(i.weightKg) || 0,
          quantity: Number(i.quantity) || 1,
          priceEur: Number(i.priceEur) || 0,
        })
      ),
    };

    await addOrder(order);
    return NextResponse.json({ success: true, orderNumber });
  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
