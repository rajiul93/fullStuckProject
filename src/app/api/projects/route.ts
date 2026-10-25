import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { serializeProject, withImages } from '@/lib/server/projects';
import { apiError } from '@/lib/server/http';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
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
