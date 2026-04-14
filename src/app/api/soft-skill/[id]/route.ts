import { requireAuth } from '@/lib/require-auth';
import { SoftSkillController } from '@/modules/soft-skill/soft-skill.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** PUT /api/soft-skill/:id — update own soft skill (authenticated) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return SoftSkillController.update(request, id, auth.payload.userId);
}

/** DELETE /api/soft-skill/:id — delete own soft skill (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return SoftSkillController.delete(id, auth.payload.userId);
}
