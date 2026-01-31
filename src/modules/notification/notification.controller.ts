import { NotificationService } from './notification.service';
import { notificationSchema, updateNotificationSchema } from './notification.validation';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class NotificationController {
  static async getAll() {
    try {
      const notifications = await NotificationService.getAllNotifications();
      return NextResponse.json(notifications);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
  }

  static async getUnread() {
    try {
      const notifications = await NotificationService.getUnreadNotifications();
      return NextResponse.json(notifications);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch unread notifications' }, { status: 500 });
    }
  }

  static async getById(id: string) {
    try {
      const notification = await NotificationService.getNotificationById(id);
      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
      }
      return NextResponse.json(notification);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch notification' }, { status: 500 });
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData = notificationSchema.parse(body);
      const notification = await NotificationService.createNotification(validatedData);
      return NextResponse.json(notification, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const validatedData = updateNotificationSchema.parse(body);
      const notification = await NotificationService.updateNotification(id, validatedData);
      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
      }
      return NextResponse.json(notification);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
    }
  }

  static async delete(id: string) {
    try {
      const notification = await NotificationService.deleteNotification(id);
      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
    }
  }

  static async markAsRead(id: string) {
    try {
      const notification = await NotificationService.markAsRead(id);
      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
      }
      return NextResponse.json(notification);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to mark notification as read' }, { status: 500 });
    }
  }
}
