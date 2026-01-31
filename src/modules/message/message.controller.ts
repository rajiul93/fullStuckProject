import { MessageService } from './message.service';
import { messageSchema, updateMessageSchema } from './message.validation';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class MessageController {
  static async getAll() {
    try {
      const messages = await MessageService.getAllMessages();
      return NextResponse.json(messages);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
  }

  static async getById(id: string) {
    try {
      const message = await MessageService.getMessageById(id);
      if (!message) {
        return NextResponse.json({ error: 'Message not found' }, { status: 404 });
      }
      return NextResponse.json(message);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 });
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData = messageSchema.parse(body);
      const message = await MessageService.createMessage(validatedData);
      return NextResponse.json(message, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const validatedData = updateMessageSchema.parse(body);
      const message = await MessageService.updateMessage(id, validatedData);
      if (!message) {
        return NextResponse.json({ error: 'Message not found' }, { status: 404 });
      }
      return NextResponse.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
  }

  static async delete(id: string) {
    try {
      const message = await MessageService.deleteMessage(id);
      if (!message) {
        return NextResponse.json({ error: 'Message not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
  }
}
