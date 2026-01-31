import { z } from 'zod';

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(1000),
  read: z.boolean().default(false),
});

export const updateMessageSchema = messageSchema.partial();

export type MessageInput = z.infer<typeof messageSchema>;
export type UpdateMessageInput = z.infer<typeof updateMessageSchema>;
