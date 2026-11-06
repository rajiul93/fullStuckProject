import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import {
  serializeProject,
  withImages,
  projectOrder,
} from '@/lib/server/projects';
import { apiError } from '@/lib/server/http';

export const revalidate = 300;
export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: projectOrder,
      include: withImages,
    });
    return NextResponse.json({ projects: projects.map(serializeProject) });
  } catch (error) {
    return apiError(error);
  }
}
