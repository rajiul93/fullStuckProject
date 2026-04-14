import { requireAuth } from '@/lib/require-auth';
import { AdditionalTrainingController } from '@/modules/additional-training/additional-training.controller';
import { NextRequest } from 'next/server';

/** GET /api/additional-training — list user trainings (authenticated) */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return AdditionalTrainingController.getAll(auth.payload.userId);
}

/** POST /api/additional-training — create training (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return AdditionalTrainingController.create(request, auth.payload.userId);
}
