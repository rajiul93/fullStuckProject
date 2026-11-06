import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/auth';
import {
  serializeProject,
  withImages,
  saveProject,
  projectOrder,
} from '@/lib/server/projects';
import { apiError } from '@/lib/server/http';
import { revalidatePublicProjects } from '@/lib/server/revalidate';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await requireAdmin();
    const projects = await db.project.findMany({
      orderBy: projectOrder,
      include: withImages,
    });
    return NextResponse.json(
      { projects: projects.map(serializeProject) },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return apiError(error);
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const project = await saveProject(await request.json());
    revalidatePublicProjects();
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
