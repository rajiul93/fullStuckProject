import { requireAuth } from '@/lib/require-auth';
import { SoftSkillController } from '@/modules/soft-skill/soft-skill.controller';
import { NextRequest } from 'next/server';

/** GET /api/soft-skill — list user soft skills (authenticated) */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return SoftSkillController.getAll(auth.payload.userId);
}

/** POST /api/soft-skill — create soft skill (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return SoftSkillController.create(request, auth.payload.userId);
}
