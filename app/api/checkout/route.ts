import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getProduct } from '@/lib/db';

// Force Node.js runtime (required for better-sqlite3 native module)
export const runtime = 'nodejs';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // ── 1. CSRF Verification ──────────────────────────────────────────────
    const csrfTokenHeader = request.headers.get('x-csrf-token');
    const csrfTokenCookie = request.cookies.get('csrf-token')?.value;

    if (!csrfTokenHeader || !csrfTokenCookie || csrfTokenHeader !== csrfTokenCookie) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 403 }
      );
    }

    // ── 2. Input Validation ───────────────────────────────────────────────
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const sanitizedEmail = email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (sanitizedEmail.length > 255) {
      return NextResponse.json({ error: 'Email too long' }, { status: 400 });
    }

    // ── 3. Rate Limiting (5 req/email/hour) ───────────────────────────────
    const rateLimit = checkRateLimit(sanitizedEmail);

    if (!rateLimit.allowed) {
      console.warn(`[Rate Limit] Blocked: ${sanitizedEmail} until ${rateLimit.resetAt}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(5),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(rateLimit.resetAt.getTime() / 1000)),
          },
        }
      );
    }

    // ── 4. Load product price from database (not hardcoded) ───────────────
    const product = getProduct('complete-openclaw-os');
    if (!product) {
      console.error('[Checkout] Product not found in database');
      return NextResponse.json(
        { error: 'Product unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // ── 5. Create Stripe Checkout Session ────────────────────────────────
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': product.name,
        'line_items[0][price_data][product_data][description]': product.description,
        'line_items[0][price_data][unit_amount]': String(product.price_cents),
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(sanitizedEmail)}`,
        'cancel_url': `${process.env.NEXT_PUBLIC_SITE_URL}`,
        'customer_email': sanitizedEmail,
        'metadata[email]': sanitizedEmail,
        'metadata[product]': product.id,
      }).toString(),
    });

    if (!response.ok) {
      // Log error internally but don't expose details
      const errorData = await response.json().catch(() => ({}));
      console.error('[Checkout] Stripe error:', errorData?.error?.message, errorData?.error?.code);
      return NextResponse.json(
        { error: 'Payment processing failed. Please try again.' },
        { status: 502 }
      );
    }

    const session = await response.json();
    return NextResponse.json({ sessionId: session.id, url: session.url });

  } catch (error: any) {
    // Log full error internally, return generic message
    console.error('[Checkout Error]', {
      message: error.message,
      code: error.code,
      type: error.type,
    });

    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS preflight for CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
