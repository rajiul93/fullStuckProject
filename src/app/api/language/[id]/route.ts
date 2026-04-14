import { requireAuth } from '@/lib/require-auth';
import { LanguageController } from '@/modules/language/language.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** PUT /api/language/:id — update own language (authenticated) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return LanguageController.update(request, id, auth.payload.userId);
}

/** DELETE /api/language/:id — delete own language (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return LanguageController.delete(id, auth.payload.userId);
}
