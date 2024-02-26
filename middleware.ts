import { withAuth } from 'next-auth/middleware';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token!.userType !== 'ADMIN'
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }

    if (
      req.nextUrl.pathname.startsWith('/client') &&
      req.nextauth.token!.userType !== 'CLIENT' &&
      req.nextauth.token!.userType !== 'ADMIN' &&
      req.nextauth.token!.userType !== 'MANAGER'
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
  },
  {
    pages: {
      signIn: '/signin',
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};
