import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWTService, type TokenPayload } from './jwt';

type AuthResult =
  | { ok: true; payload: TokenPayload; token: string }
  | { ok: false; response: NextResponse };

function bearerFromRequest(request: NextRequest): string | undefined {
  const h = request.headers.get('authorization');
  if (!h?.startsWith('Bearer ')) return undefined;
  const t = h.slice('Bearer '.length).trim();
  return t || undefined;
}

/**
 * JWT from cookie **or** `Authorization: Bearer` (whichever verifies first).
 * Tries Bearer before cookie so a stale `auth_token` cookie does not block a valid Bearer
 * from `api-client` localStorage — and the reverse order is not needed because cookie is httpOnly fresh from login.
 */
export function requireAuth(request: NextRequest): AuthResult {
  const cookieRaw = request.cookies.get('auth_token')?.value?.trim() ?? '';
  const bearerRaw = bearerFromRequest(request) ?? '';

  /** Prefer Bearer first (often matches axios interceptor), then cookie. Deduplicate if equal. */
  const candidates = [...new Set([bearerRaw, cookieRaw].filter(Boolean))];

  if (candidates.length === 0) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 },
      ),
    };
  }

  let sawExpired = false;
  for (const token of candidates) {
    try {
      const payload = JWTService.verifyAccessToken(token);
      return { ok: true, payload, token };
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) sawExpired = true;
    }
  }

  if (sawExpired) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Unauthorized', message: 'Token expired — log in again' },
        { status: 401 },
      ),
    };
  }
  return {
    ok: false,
    response: NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or expired token' },
      { status: 401 },
    ),
  };
}
