import { BlogController } from '@/modules/blog/blog.controller';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (slug) {
    return BlogController.getBySlug(slug);
  }
  
  return BlogController.getAll();
}

export async function POST(request: NextRequest) {
  return BlogController.create(request);
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }
  
  return BlogController.update(request, id);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }
  
  return BlogController.delete(id);
}
