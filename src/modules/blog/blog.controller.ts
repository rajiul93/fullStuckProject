import { BlogService } from './blog.service';
import { blogSchema, updateBlogSchema } from './blog.validation';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class BlogController {
  static async getAll() {
    try {
      const blogs = await BlogService.getAllBlogs();
      return NextResponse.json(blogs);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
  }

  static async getBySlug(slug: string) {
    try {
      const blog = await BlogService.getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(blog);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData = blogSchema.parse(body);
      const blog = await BlogService.createBlog(validatedData);
      return NextResponse.json(blog, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const validatedData = updateBlogSchema.parse(body);
      const blog = await BlogService.updateBlog(id, validatedData);
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(blog);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
  }

  static async delete(id: string) {
    try {
      const blog = await BlogService.deleteBlog(id);
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
  }
}
