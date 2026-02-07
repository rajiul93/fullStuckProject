/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './auth.service';
import { apiResponse } from '../utils/response';
import { catchAsync } from '../utils/catch-async';
import { ValidationService } from '../utils/zod-validation-service';
import { loginSchema, registerSchema } from '../user/user.validation';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export class AuthController {
  static login = catchAsync(async (request: NextRequest) => {
    const validatedData = await ValidationService.validateBody(
      request,
      loginSchema,
    );

    const result = await AuthService.login(validatedData);
    const { accessToken, role } = result;

    // Create a response
    const response = NextResponse.json(
      apiResponse(true, 'Login successful', 200, { role }),
    );

    // Set the cookie with token
    response.cookies.set('auth_token', accessToken, COOKIE_OPTIONS);

    return response;
  });

  static register = catchAsync(async (request: NextRequest) => {
    // Central validation
    const validatedData = await ValidationService.validateBody(
      request,
      registerSchema,
    );

    const result = await AuthService.register(validatedData);
    const { accessToken, role } = result;

    const response = NextResponse.json(
      apiResponse(true, 'Registration successful', 201, { role }),
    );

    response.cookies.set('auth_token', accessToken, COOKIE_OPTIONS);
    return response;
  });
}
