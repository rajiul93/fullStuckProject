import { requireAuth } from '@/lib/require-auth';
import { EducationController } from '@/modules/education/education.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** PUT /api/education/:id — update education (authenticated, owner only) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return EducationController.update(request, id, auth.payload.userId);
}

/** DELETE /api/education/:id — delete education (authenticated, owner only) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return EducationController.delete(id, auth.payload.userId);
}
