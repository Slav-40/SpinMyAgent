import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { recordPayment } from '@/lib/db';
import { sendPurchaseConfirmationEmail } from '@/lib/resend';

// Force Node.js runtime (required for better-sqlite3 native module)
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!WEBHOOK_SECRET) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  // Read raw body for signature verification
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.warn('[Webhook] Missing Stripe-Signature header');
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // ── Verify webhook signature ────────────────────────────────────────────
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('[Webhook] Signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

  // ── Handle event types ──────────────────────────────────────────────────
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Only process paid sessions
      if (session.payment_status !== 'paid') {
        console.log(`[Webhook] Session ${session.id} not paid, skipping`);
        break;
      }

      const email =
        session.customer_email ||
        (session.metadata?.email) ||
        '';

      const amountCents = session.amount_total || 0;

      let isDuplicate = false;
      try {
        recordPayment(session.id, email, amountCents, 'completed');
        console.log(`[Webhook] Payment recorded: ${session.id} for ${email} ($${amountCents / 100})`);
      } catch (dbErr: any) {
        // Duplicate session_id → idempotency, already recorded
        if (dbErr.message?.includes('UNIQUE constraint')) {
          console.log(`[Webhook] Duplicate event for session ${session.id}, skipping`);
          isDuplicate = true;
        } else {
          console.error('[Webhook] DB error recording payment:', dbErr.message);
          // Return 500 so Stripe retries
          return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
        }
      }

      // Send purchase confirmation email (only for new payments, not duplicates)
      if (!isDuplicate && email) {
        const emailResult = await sendPurchaseConfirmationEmail(email, [
          {
            title: 'Complete OpenClaw Operating System',
            url: 'https://blnapqdkwdtnykxfrznk.supabase.co/storage/v1/object/public/guides/complete-openclaw-os.pdf',
          },
        ]);

        if (emailResult.success) {
          console.log(`[Webhook] Confirmation email sent to ${email} (messageId: ${emailResult.messageId})`);
        } else {
          // Email failure doesn't block payment success; log for manual follow-up
          console.error(`[Webhook] Email send failed for ${email}: ${emailResult.error}. Payment still confirmed.`);
        }
      } else if (!email) {
        console.warn(`[Webhook] No email address for session ${session.id}, skipping email send`);
      }
      break;
    }

    case 'checkout.session.expired': {
      // Log expired sessions (no action needed)
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[Webhook] Session expired: ${session.id}`);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn(`[Webhook] Payment failed: ${paymentIntent.id}`);
      break;
    }

    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Note: In Next.js 14 App Router, body parsing is handled by request.text()
// No config needed - we read the raw body with request.text() directly
