import { requireAuth } from '@/lib/require-auth';
import { CertificationController } from '@/modules/certification/certification.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** PUT /api/certification/:id — update own certification (authenticated) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return CertificationController.update(request, id, auth.payload.userId);
}

/** DELETE /api/certification/:id — delete own certification (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return CertificationController.delete(id, auth.payload.userId);
}
