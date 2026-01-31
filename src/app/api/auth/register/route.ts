import { AuthController } from '@/modules/auth/auth.controller';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return AuthController.register(request);
}
