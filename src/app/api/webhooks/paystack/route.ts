import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getPaymentByReference, markPaymentSuccess, findUserById, getCourseById } from '@/lib/db';
import { sendPaymentReceiptEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY || '';

    const bodyText = await req.text();

    // Verify HMAC SHA-512 signature if secret is active
    if (secret && !secret.includes('sample') && signature) {
      const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex');
      if (hash !== signature) {
        console.warn('Paystack webhook signature verification failed.');
        return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
      }
    }

    const event = JSON.parse(bodyText);

    // Handle successful charge event
    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const payment = await getPaymentByReference(reference);

      if (payment) {
        // Idempotency: skip if already processed
        if (payment.status === 'success') {
          return NextResponse.json({ status: 'already_processed' }, { status: 200 });
        }

        // Verify amount
        if (Number(data.amount) >= Number(payment.amount_kobo)) {
          await markPaymentSuccess(reference, data.channel || 'webhook');

          const user = await findUserById(payment.user_id);
          const course = await getCourseById(payment.course_id);
          if (user && course) {
            const formattedNaira = `₦${(payment.amount_kobo / 100).toLocaleString('en-NG')}`;
            sendPaymentReceiptEmail(
              user.email,
              user.profile.full_name,
              course.title,
              formattedNaira,
              reference
            ).catch(e => console.error('Failed to send webhook receipt email:', e));
          }
        }
      }
    }

    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    console.error('Paystack webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
  }
}
