import { NextResponse } from 'next/server';
import { checkPassword, createToken, ADMIN_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!checkPassword(password ?? '')) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }
    const res = NextResponse.json({ success: true });
    res.cookies.set(ADMIN_COOKIE, createToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }
}
