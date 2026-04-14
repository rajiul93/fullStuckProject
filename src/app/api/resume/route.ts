import { requireAuth } from '@/lib/require-auth';
import { ResumeController } from '@/modules/resume/resume.controller';
import { NextRequest } from 'next/server';

/** GET /api/resume — list all resumes (public) */
export async function GET() {
  return ResumeController.getAll();
}

/** POST /api/resume — create a resume (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return ResumeController.create(request);
}
