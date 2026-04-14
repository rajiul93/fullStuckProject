import { requireAuth } from '@/lib/require-auth';
import { BlogV2Controller } from '@/modules/blog-v2/blog-v2.controller';
import { NextRequest } from 'next/server';

/** GET /api/blog — list all blogs (public) */
export async function GET() {
  return BlogV2Controller.getAll();
}

/** POST /api/blog — create a blog (authenticated) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  return BlogV2Controller.create(request);
}

