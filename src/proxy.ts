import { verify } from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';

type TJwt = {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

function isValidJwt(
  pathname: string,
  protectedPaths: string[],
  request: NextRequest,
): boolean | undefined {
  const token = request.cookies.get('auth_token')?.value;
  if (protectedPaths.includes(pathname) && !token) {
    return false;
  }
  if (token) {
    const verified = verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    if (!verified) {
      return false;
    }
    if (Date.now() / 1000 > (verified as TJwt).exp) {
      return false;
    }
    return true;
  }
}

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ['/dashboard'];

  try {
    const isValid = isValidJwt(pathname, protectedPaths, request);

    // If JWT validation returned false (invalid token or expired)
    if (!isValid) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If JWT is valid or path is not protected, continue
    return NextResponse.next();
  } catch (error) {
    // If JWT verification throws an error, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Match the paths you want to protect
};
