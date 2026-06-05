import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getContent, saveContent } from '@/lib/store';
import type { SiteContent } from '@/lib/content';

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getContent());
}

export async function PUT(request: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = (await request.json()) as SiteContent;
    await saveContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }
}
