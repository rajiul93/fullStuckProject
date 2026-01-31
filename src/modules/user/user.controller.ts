import { NextRequest } from 'next/server';
import { UserService } from './user.service';
import { UserRole } from './user.model';

export class UserController {
  static async getAll(role?: UserRole) {
    try {
      const users = await UserService.getAll(role);
      return Response.json({ success: true, data: users });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const user = await UserService.getById(id);
      return Response.json({ success: true, data: user });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 404 },
      );
    }
  }

  static async getByEmail(email: string) {
    try {
      const user = await UserService.getByEmail(email);
      return Response.json({ success: true, data: user });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 404 },
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const user = await UserService.create(body);
      return Response.json({ success: true, data: user }, { status: 201 });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const user = await UserService.update(id, body);
      return Response.json({ success: true, data: user });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
  }

  static async updateRole(id: string, role: UserRole) {
    try {
      const user = await UserService.updateRole(id, role);
      return Response.json({ success: true, data: user });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
  }

  static async delete(id: string) {
    try {
      const result = await UserService.delete(id);
      return Response.json({ success: true, data: result });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 404 },
      );
    }
  }

  static async toggleActive(id: string) {
    try {
      const user = await UserService.toggleActive(id);
      return Response.json({ success: true, data: user });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
  }
}
