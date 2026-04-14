import { requireAuth } from '@/lib/require-auth';
import { LanguageController } from '@/modules/language/language.controller';
import { NextRequest } from 'next/server';

/** GET /api/language — list user languages (authenticated) */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return LanguageController.getAll(auth.payload.userId);
}

/** POST /api/language — create language (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return LanguageController.create(request, auth.payload.userId);
}
