import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'access-secret-key';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class JWTService {
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  }

  static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
  }

  static verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
  }
}
