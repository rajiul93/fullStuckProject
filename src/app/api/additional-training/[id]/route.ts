import { requireAuth } from '@/lib/require-auth';
import { AdditionalTrainingController } from '@/modules/additional-training/additional-training.controller';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** PUT /api/additional-training/:id — update own training (authenticated) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return AdditionalTrainingController.update(request, id, auth.payload.userId);
}

/** DELETE /api/additional-training/:id — delete own training (authenticated) */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;
  return AdditionalTrainingController.delete(id, auth.payload.userId);
}
