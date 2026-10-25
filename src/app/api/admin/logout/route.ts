import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { hashToken, SESSION_COOKIE } from '@/lib/server/auth';
import { apiError, assertSameOrigin } from '@/lib/server/http';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token)
      await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return apiError(error);
  }
}
