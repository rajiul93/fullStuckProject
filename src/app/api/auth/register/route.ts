import { AuthController } from '@/modules/auth/auth.controller';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Received registration request');
  return AuthController.register(request);
}
