/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { AuthService } from './auth.service';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export class AuthController {
  static async login(request: NextRequest) {
    try {
      const body = await request.json();
      const { user, accessToken, refreshToken } = await AuthService.login(body);

      const response = Response.json(
        { success: true, data: { user } },
        { status: 200 },
      );

      response.headers.set(
        'Set-Cookie',
        [
          `accessToken=${accessToken}; ${Object.entries(COOKIE_OPTIONS)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')}; Max-Age=${15 * 60}`,
          `refreshToken=${refreshToken}; ${Object.entries(COOKIE_OPTIONS)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')}; Max-Age=${7 * 24 * 60 * 60}`,
        ].join(', '),
      );

      return response;
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 401 },
      );
    }
  }

  static async register(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await AuthService.register(body);

      return Response.json({ success: true, data: result }, { status: 201 });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
  }
}
