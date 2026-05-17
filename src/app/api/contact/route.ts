import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, country, product, quantity, message } = body;

    if (!name || !email || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Log the inquiry (in production, integrate with email service)
    console.log('Quote request:', { name, email, country, product, quantity, message });

    return NextResponse.json({ success: true, message: 'Quote request received' });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
