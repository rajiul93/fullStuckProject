import { connectDB } from '@/lib/db';
import Message from './message.model';
import { MessageInput, UpdateMessageInput } from './message.validation';
import { IMessage } from './message.interface';

export class MessageService {
  static async getAllMessages(): Promise<IMessage[]> {
    await connectDB();
    return await Message.find().sort({ createdAt: -1 });
  }

  static async getMessageById(id: string): Promise<IMessage | null> {
    await connectDB();
    return await Message.findById(id);
  }

  static async createMessage(data: MessageInput): Promise<IMessage> {
    await connectDB();
    const message = new Message(data);
    return await message.save();
  }

  static async updateMessage(id: string, data: UpdateMessageInput): Promise<IMessage | null> {
    await connectDB();
    return await Message.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteMessage(id: string): Promise<IMessage | null> {
    await connectDB();
    return await Message.findByIdAndDelete(id);
  }
}
