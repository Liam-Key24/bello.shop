import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateTokenPresence } from '@/lib/auth/token-utils';

/**
 * Middleware for server-side authentication and route protection
 * Runs on every request before the page renders
 * 
 * Location: Root of project (required by Next.js)
 * 
 * Note: Token expiration is validated in API routes via Shopify API calls.
 * Middleware only checks token presence and format for performance.
 */

// Routes that require authentication
const protectedRoutes = ['/account/profile', '/account/orders', '/account/settings'];

// Routes that should redirect to profile if already authenticated
const authRoutes = ['/account/login', '/account/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('shopifyCustomerToken')?.value;
  const hasValidToken = validateTokenPresence(token);

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Redirect to login if accessing protected route without valid token
  if (isProtectedRoute && !hasValidToken) {
    const loginUrl = new URL('/account/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to profile if accessing auth routes while authenticated
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/account/profile', request.url));
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Only set CSP in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static assets (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
