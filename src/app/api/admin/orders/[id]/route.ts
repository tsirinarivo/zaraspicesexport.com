import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { updateOrderStatus, deleteOrder, type Order } from '@/lib/store';

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    const { status } = (await request.json()) as { status: Order['status'] };
    await updateOrderStatus(id, status);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await deleteOrder(id);
  return NextResponse.json({ success: true });
}
