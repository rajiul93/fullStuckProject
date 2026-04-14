import { requireAuth } from '@/lib/require-auth';
import { CertificationController } from '@/modules/certification/certification.controller';
import { NextRequest } from 'next/server';

/** GET /api/certification — list user certifications (authenticated) */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return CertificationController.getAll(auth.payload.userId);
}

/** POST /api/certification — create certification (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return CertificationController.create(request, auth.payload.userId);
}
