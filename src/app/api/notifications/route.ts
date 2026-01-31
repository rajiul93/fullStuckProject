import { NotificationController } from '@/modules/notification/notification.controller';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const unread = searchParams.get('unread');
  
  if (id) {
    return NotificationController.getById(id);
  }
  
  if (unread === 'true') {
    return NotificationController.getUnread();
  }
  
  return NotificationController.getAll();
}

export async function POST(request: NextRequest) {
  return NotificationController.create(request);
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const markRead = searchParams.get('markRead');
  
  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }
  
  if (markRead === 'true') {
    return NotificationController.markAsRead(id);
  }
  
  return NotificationController.update(request, id);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }
  
  return NotificationController.delete(id);
}
