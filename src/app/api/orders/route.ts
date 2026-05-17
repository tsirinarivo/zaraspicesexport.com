import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total, currency } = body;

    // Générer un numéro de commande
    const orderNumber = `ZSE-${Date.now().toString().slice(-6)}`;

    // Log la commande (en prod: sauvegarder en DB + envoyer email)
    console.log('New order:', { orderNumber, customer, items, total, currency });

    return NextResponse.json({ success: true, orderNumber });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
