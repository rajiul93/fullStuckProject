import { requireAuth } from '@/lib/require-auth';
import { BlogV2Controller } from '@/modules/blog-v2/blog-v2.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/blog/:id — get one blog (public) */
export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return BlogV2Controller.getById(id);
}

/** PUT /api/blog/:id — update a blog (authenticated) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return BlogV2Controller.update(request, id);
}

/** DELETE /api/blog/:id — delete a blog (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return BlogV2Controller.delete(id);
}

