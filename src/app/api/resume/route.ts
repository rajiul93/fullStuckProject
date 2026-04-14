import { requireAuth } from '@/lib/require-auth';
import { ResumeController } from '@/modules/resume/resume.controller';
import { NextRequest } from 'next/server';

/** GET /api/resume — list own resumes (authenticated) */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return ResumeController.getAll(auth.payload.userId);
}

/** POST /api/resume — create a resume (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return ResumeController.create(request, auth.payload.userId);
}
