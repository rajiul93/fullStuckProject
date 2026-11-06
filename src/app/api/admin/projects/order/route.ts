import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { apiError } from '@/lib/server/http';
import { revalidatePublicProjects } from '@/lib/server/revalidate';
import { reorderProjects } from '@/lib/server/projects';

export async function PUT(request: Request) {
  try {
    await requireAdmin(request);
    const projects = await reorderProjects(await request.json());
    revalidatePublicProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    return apiError(error);
  }
}
