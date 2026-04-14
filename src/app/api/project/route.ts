import { requireAuth } from '@/lib/require-auth';
import { ProjectController } from '@/modules/project/project.controller';
import { NextRequest } from 'next/server';

/** GET /api/project — list all projects (public) */
export async function GET() {
  return ProjectController.getAll();
}

/** POST /api/project — create a project (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return ProjectController.create(request);
}

