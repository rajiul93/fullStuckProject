import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectDB();
    return NextResponse.json({ 
      status: 'success', 
      message: 'Database connected', 
      dbState: db.connection.readyState,
      dbName: db.connection.name
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
