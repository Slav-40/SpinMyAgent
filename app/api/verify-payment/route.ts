import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isPaymentValid, recordPayment, checkSessionAttempt, recordFailedAttempt, resetAttempts } from '@/lib/db';

// Force Node.js runtime (required for better-sqlite3 native module)
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: NextRequest) {
  // ── Rate limit by IP for brute-force protection ───────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const attemptCheck = checkSessionAttempt(ip);
  if (!attemptCheck.allowed) {
    console.warn(`[Verify] IP ${ip} blocked until ${attemptCheck.blockedUntil}`);
    return NextResponse.json(
      { valid: false, error: 'Too many invalid attempts. Please try again later.' },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false, error: 'Invalid request' }, { status: 400 });
  }

  const { sessionId, email } = body;

  if (!sessionId || typeof sessionId !== 'string') {
    recordFailedAttempt(ip);
    return NextResponse.json({ valid: false, error: 'Invalid request' }, { status: 400 });
  }

  // Validate Stripe session_id format (cs_test_* or cs_live_*)
  if (!/^cs_(test|live)_[a-zA-Z0-9]{20,}$/.test(sessionId)) {
    recordFailedAttempt(ip);
    console.warn(`[Verify] Invalid session ID format from IP ${ip}: ${sessionId.slice(0, 20)}...`);
    return NextResponse.json({ valid: false, error: 'Invalid session' }, { status: 400 });
  }

  // ── Check local database first (fast path) ───────────────────────────
  const localCheck = isPaymentValid(sessionId);

  if (localCheck.valid) {
    // Payment confirmed from webhook
    resetAttempts(ip);
    return NextResponse.json({ valid: true });
  }

  // ── Fallback: Verify directly with Stripe API ────────────────────────
  // (handles case where webhook hasn't fired yet)
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      session.payment_status === 'paid' &&
      session.status === 'complete'
    ) {
      // Record in DB (idempotent)
      const sessionEmail =
        session.customer_email ||
        session.metadata?.email ||
        (email?.toLowerCase().trim() || '');

      try {
        recordPayment(session.id, sessionEmail, session.amount_total || 0, 'completed');
      } catch (dbErr: any) {
        if (!dbErr.message?.includes('UNIQUE constraint')) {
          console.error('[Verify] DB error:', dbErr.message);
        }
      }

      resetAttempts(ip);
      return NextResponse.json({ valid: true });
    }

    // Payment not complete
    recordFailedAttempt(ip);
    console.warn(`[Verify] Unverified session ${sessionId} from IP ${ip}`);
    return NextResponse.json({ valid: false, error: 'Payment not confirmed' }, { status: 402 });

  } catch (stripeErr: any) {
    if (stripeErr.code === 'resource_missing') {
      // Session ID doesn't exist at all
      recordFailedAttempt(ip);
      console.warn(`[Verify] Non-existent session ${sessionId} from IP ${ip}`);
      return NextResponse.json({ valid: false, error: 'Invalid session' }, { status: 404 });
    }

    // Stripe API error → log internally, return generic error
    console.error('[Verify] Stripe API error:', stripeErr.message);
    return NextResponse.json(
      { valid: false, error: 'Verification unavailable. Please try again.' },
      { status: 503 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
