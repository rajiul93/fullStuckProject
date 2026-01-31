import { connectDB } from '@/lib/db';
import Notification from './notification.model';
import { NotificationInput, UpdateNotificationInput } from './notification.validation';
import { INotification } from './notification.interface';

export class NotificationService {
  static async getAllNotifications(): Promise<INotification[]> {
    await connectDB();
    return await Notification.find().sort({ createdAt: -1 });
  }

  static async getUnreadNotifications(): Promise<INotification[]> {
    await connectDB();
    return await Notification.find({ read: false }).sort({ createdAt: -1 });
  }

  static async getNotificationById(id: string): Promise<INotification | null> {
    await connectDB();
    return await Notification.findById(id);
  }

  static async createNotification(data: NotificationInput): Promise<INotification> {
    await connectDB();
    const notification = new Notification(data);
    return await notification.save();
  }

  static async updateNotification(id: string, data: UpdateNotificationInput): Promise<INotification | null> {
    await connectDB();
    return await Notification.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteNotification(id: string): Promise<INotification | null> {
    await connectDB();
    return await Notification.findByIdAndDelete(id);
  }

  static async markAsRead(id: string): Promise<INotification | null> {
    await connectDB();
    return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
  }
}
