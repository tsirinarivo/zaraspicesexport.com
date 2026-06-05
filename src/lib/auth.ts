import crypto from 'crypto';
import { cookies } from 'next/headers';

/**
 * Minimal stateless auth for the single-admin panel. A signed token
 * (HMAC-SHA256 over an expiry timestamp) is stored in an httpOnly cookie.
 * No database or external dependency required.
 */

export const ADMIN_COOKIE = 'zse_admin';
const SESSION_DAYS = 7;

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || 'zaraspices2024';
}

function getSecret(): string {
  // Derive a stable secret from ADMIN_SECRET (or the password) so tokens stay
  // valid across restarts of the same deployment.
  return process.env.ADMIN_SECRET || `zse-secret::${getPassword()}`;
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
}

export function checkPassword(input: string): boolean {
  const expected = getPassword();
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createToken(): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

/** Server-side check used by layouts and route handlers. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;
