/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { apiResponse } from './response';

export const catchAsync = <T>(fn: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    try {
      const data = await fn(...args);

      // If the handler already returned a NextResponse, return it directly.
      if (data instanceof NextResponse) {
        return data;
      }

      // If the handler returned an apiResponse-like object, return it as JSON with its status.
      if (
        data &&
        typeof data === 'object' &&
        'status' in data &&
        'success' in data &&
        typeof (data as any).status === 'number'
      ) {
        return NextResponse.json(data as any, { status: (data as any).status });
      }

      // Otherwise wrap the payload in the standard apiResponse
      return NextResponse.json(apiResponse(true, 'Success', 200, data), {
        status: 200,
      });
    } catch (error: any) {
      const status = error?.status || 500;
      const message = error?.message || 'Internal server error';
      return NextResponse.json(apiResponse(false, message, status, null), {
        status,
      });
    }
  };
};
