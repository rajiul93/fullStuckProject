import { requireAuth } from '@/lib/require-auth';
import { ProjectController } from '@/modules/project/project.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/project/:id — get one project (public) */
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return ProjectController.getById(id);
}

/** PATCH /api/project/:id — update a project (authenticated) */
export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return ProjectController.update(request, id, auth.payload.userId);
}

/** DELETE /api/project/:id — delete a project (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return ProjectController.delete(id);
}

