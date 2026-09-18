import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db, hasLiveDatabase, payments, enrollments } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      console.error('PAYSTACK_SECRET_KEY not configured.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Read raw body for HMAC signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-paystack-signature header' }, { status: 400 });
    }

    // 1. Verify HMAC SHA512 Signature
    const hash = crypto.createHmac('sha512', paystackSecret).update(rawBody).digest('hex');
    if (hash !== signature) {
      console.warn('Paystack webhook signature mismatch.');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // 2. Process only charge.success events
    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const amount = data.amount / 100; // Convert kobo to NGN
      const metadata = data.metadata || {};
      const courseId = metadata.courseId;
      const courseSlug = metadata.courseSlug;
      const studentEmail = data.customer?.email;

      // Idempotency key derived from event id and reference
      const idempotencyKey = `paystack_event_${event.id || reference}`;

      console.log(`[Paystack Webhook] Processing successful charge for ref: ${reference}, amount: ₦${amount}`);

      if (hasLiveDatabase && db) {
        // Check for duplicate webhook execution (Idempotency protection)
        const existingPayment = await db
          .select()
          .from(payments)
          .where(eq(payments.idempotencyKey, idempotencyKey))
          .limit(1);

        if (existingPayment.length > 0) {
          console.log(`[Paystack Webhook] Duplicate event ignored (idempotent): ${idempotencyKey}`);
          return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
        }

        // Record payment & update status
        await db.insert(payments).values({
          id: `pay-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
          reference,
          paystackId: String(data.id),
          userId: metadata.userId || 'guest_user',
          courseId: courseId || 'course-1',
          amount: String(amount),
          currency: data.currency || 'NGN',
          status: 'success',
          channel: data.channel || 'card',
          idempotencyKey,
          rawResponse: data,
          verifiedAt: new Date(),
        });

        // Activate course enrollment
        if (metadata.userId && courseId) {
          await db.insert(enrollments).values({
            id: `enr-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
            userId: metadata.userId,
            courseId,
            status: 'active',
          });
        }
      }

      return NextResponse.json({ status: true, message: 'Enrollment activated' }, { status: 200 });
    }

    return NextResponse.json({ status: true, message: 'Event ignored' }, { status: 200 });
  } catch (err: any) {
    console.error('[Paystack Webhook Error]:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
