import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/server/db';
import { hashToken, SESSION_COOKIE } from '@/lib/server/auth';
import { apiError, assertSameOrigin, HttpError } from '@/lib/server/http';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const { email, password } = z
      .object({
        email: z
          .email()
          .max(254)
          .transform((value) => value.toLowerCase()),
        password: z.string().min(1).max(200),
      })
      .parse(await request.json());
    const identifier = hashToken(email);
    const cutoff = new Date(Date.now() - 15 * 60 * 1000);
    await db.loginAttempt.deleteMany({ where: { startedAt: { lt: cutoff } } });
    const attempt = await db.loginAttempt.upsert({
      where: { identifier },
      create: { identifier },
      update: { count: { increment: 1 } },
    });
    if (attempt.count > 10)
      throw new HttpError(
        429,
        'Too many sign-in attempts. Try again in 15 minutes.',
      );
    const admin = await db.admin.findUnique({ where: { email } });
    const valid = await bcrypt.compare(
      password,
      admin?.passwordHash ||
        '$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW',
    );
    if (!admin || !valid)
      throw new HttpError(401, 'Incorrect email or password.');
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    await db.session.create({
      data: { adminId: admin.id, tokenHash: hashToken(token), expiresAt },
    });
    await db.loginAttempt.deleteMany({ where: { identifier } });
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });
    return response;
  } catch (error) {
    return apiError(error);
  }
}
