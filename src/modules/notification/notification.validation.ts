import { z } from 'zod';

export const notificationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  message: z.string().min(1, 'Message is required').max(500),
  type: z.enum(['info', 'success', 'warning', 'error']).default('info'),
  read: z.boolean().default(false),
});

export const updateNotificationSchema = notificationSchema.partial();

export type NotificationInput = z.infer<typeof notificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
