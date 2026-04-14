import { SkillController } from '@/modules/skill/skill.controller';
import { requireAuth } from '@/lib/require-auth';
import { NextRequest } from 'next/server';

/** GET /api/skill — list all skills (public) */
export async function GET() {
  return SkillController.getAll();
}

/** POST /api/skill — create a skill (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return SkillController.create(request);
}
