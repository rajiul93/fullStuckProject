import { SkillController } from '@/modules/skill/skill.controller';
import { requireAuth } from '@/lib/require-auth';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/skill/:id — get one skill (public) */
export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return SkillController.getById(id);
}

/** PUT /api/skill/:id — update a skill (authenticated) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return SkillController.update(request, id);
}

/** DELETE /api/skill/:id — delete a skill (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return SkillController.delete(id);
}
