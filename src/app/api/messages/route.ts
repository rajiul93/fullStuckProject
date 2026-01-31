import { MessageController } from '@/modules/message/message.controller';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    return MessageController.getById(id);
  }
  
  return MessageController.getAll();
}

export async function POST(request: NextRequest) {
  return MessageController.create(request);
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }
  
  return MessageController.update(request, id);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }
  
  return MessageController.delete(id);
}
