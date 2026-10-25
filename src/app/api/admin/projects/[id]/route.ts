import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { saveProject, deleteProject } from '@/lib/server/projects';
import { apiError } from '@/lib/server/http';

type Context = { params: Promise<{ id: string }> };
export async function PUT(request: Request, { params }: Context) {
  try {
    await requireAdmin(request);
    return NextResponse.json({
      project: await saveProject(await request.json(), (await params).id),
    });
  } catch (error) {
    return apiError(error);
  }
}
export async function DELETE(request: Request, { params }: Context) {
  try {
    await requireAdmin(request);
    await deleteProject((await params).id);
    return NextResponse.json({
      success: true,
      message:
        'Project deleted. Its images are now available under unused uploads for permanent removal.',
    });
  } catch (error) {
    return apiError(error);
  }
}
