import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTService } from '@/lib/jwt';

type JwtPayload = {
  userId: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
};

function getToken(req: Request): string | undefined {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    const t = header.slice('Bearer '.length).trim();
    if (t) return t;
  }
  const cookie = req.cookies?.auth_token;
  if (typeof cookie === 'string' && cookie.trim()) return cookie.trim();
  return undefined;
}

export function requireJwt(req: Request, res: Response, next: NextFunction) {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required' });
  }
  try {
    const verified = JWTService.verifyAccessToken(token) as JwtPayload;
    (req as any).user = verified;
    return next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token expired — log in again',
      });
    }
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayload | undefined;
    if (!user) return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required' });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Insufficient role' });
    }
    return next();
  };
}

