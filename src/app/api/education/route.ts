import { requireAuth } from '@/lib/require-auth';
import { EducationController } from '@/modules/education/education.controller';
import { NextRequest } from 'next/server';

/** GET /api/education — list user educations (authenticated) */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return EducationController.getAll(auth.payload.userId);
}

/** POST /api/education — create education (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return EducationController.create(request, auth.payload.userId);
}
