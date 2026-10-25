import 'server-only';
import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { db } from './db';
import { HttpError, assertSameOrigin } from './http';

export const SESSION_COOKIE = 'portfolio_admin';
export const hashToken = (token: string) =>
  createHash('sha256').update(token).digest('hex');

export async function currentAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { admin: true },
  });
  if (!session || session.expiresAt <= new Date()) return null;
  return { id: session.admin.id, email: session.admin.email };
}

export async function requireAdmin(request?: Request) {
  if (request && request.method !== 'GET') assertSameOrigin(request);
  const admin = await currentAdmin();
  if (!admin) throw new HttpError(401, 'Please sign in to continue.');
  return admin;
}
