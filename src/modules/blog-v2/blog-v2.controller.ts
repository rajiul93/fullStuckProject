import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { BlogV2Service } from './blog-v2.service';
import { blogV2Schema, updateBlogV2Schema } from './blog-v2.validation';

export class BlogV2Controller {
  static async getAll() {
    try {
      const blogs = await BlogV2Service.getAll();
      return NextResponse.json(blogs);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const blog = await BlogV2Service.getById(id);
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(blog);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch blog' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validated = blogV2Schema.parse(body);
      const created = await BlogV2Service.create(validated);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create blog' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const validated = updateBlogV2Schema.parse(body);
      const updated = await BlogV2Service.update(id, validated);
      if (!updated) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update blog' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string) {
    try {
      const deleted = await BlogV2Service.delete(id);
      if (!deleted) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete blog' },
        { status: 500 },
      );
    }
  }
}

