import { requireAuth } from '@/lib/require-auth';
import { ResumeController } from '@/modules/resume/resume.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/resume/:id — get own resume by id (authenticated) */
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return ResumeController.getById(id, auth.payload.userId);
}

/** PATCH /api/resume/:id — update own resume (authenticated) */
export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return ResumeController.update(request, id, auth.payload.userId);
}

/** DELETE /api/resume/:id — delete own resume (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return ResumeController.delete(id, auth.payload.userId);
}
