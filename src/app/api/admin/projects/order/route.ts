import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { apiError } from '@/lib/server/http';
import { reorderProjects } from '@/lib/server/projects';

export async function PUT(request: Request) {
  try {
    await requireAdmin(request);
    return NextResponse.json({
      projects: await reorderProjects(await request.json()),
    });
  } catch (error) {
    return apiError(error);
  }
}
