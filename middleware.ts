import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://spinmyagent.com',
  'https://www.spinmyagent.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
].filter(Boolean);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  const origin = request.headers.get('origin') || '';

  // ── Handle CORS preflight (OPTIONS) ──────────────────────────────────
  if (method === 'OPTIONS' && pathname.startsWith('/api/')) {
    // Stripe webhooks must NOT have strict CORS (they come from Stripe servers)
    if (pathname === '/api/webhooks/stripe') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // All other API routes: restrict to allowed origins
    if (ALLOWED_ORIGINS.includes(origin)) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Vary': 'Origin',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-csrf-token',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Unknown origin → reject preflight
    return new NextResponse(null, { status: 403 });
  }

  // ── Add CORS headers to actual API responses ──────────────────────────
  const response = NextResponse.next();

  if (pathname.startsWith('/api/')) {
    // Stripe webhooks: allow all origins (webhook calls come from Stripe)
    if (pathname === '/api/webhooks/stripe') {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'POST');
    } else if (ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Vary', 'Origin');
      response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-csrf-token');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  // ── Security headers for all routes ──────────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ── CSRF Cookie injection for page routes ────────────────────────────
  // Generate CSRF token cookie for non-API, non-webhook page loads
  if (!pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    const existingToken = request.cookies.get('csrf-token')?.value;
    if (!existingToken) {
      const token = crypto.randomUUID();
      response.cookies.set('csrf-token', token, {
        httpOnly: false, // Must be readable by JS to include in header
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
