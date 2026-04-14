import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRY = '1d';

/** Same resolution for sign + verify; handles empty/quoted env (`.env` mistakes). */
export function accessTokenSecret(): string {
  let s = (process.env.ACCESS_TOKEN_SECRET ?? '').trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  if (!s) return 'access-secret-key';
  return s;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class JWTService {
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, accessTokenSecret(), {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      algorithm: 'HS256',
    });
  }

  static verifyAccessToken(token: string): TokenPayload {
    const t = token.trim();
    if (!t) {
      throw new jwt.JsonWebTokenError('Token missing');
    }
    return jwt.verify(t, accessTokenSecret(), {
      algorithms: ['HS256'],
      clockTolerance: 60,
    }) as TokenPayload;
  }
}
