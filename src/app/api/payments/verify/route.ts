import { NextResponse } from 'next/server';
import { getPaymentByReference, markPaymentSuccess, findUserById, getCourseById } from '@/lib/db';
import { sendPaymentReceiptEmail } from '@/lib/email';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');
    const isMock = searchParams.get('mock') === 'true';

    if (!reference) {
      return NextResponse.json({ error: 'Transaction reference is required.' }, { status: 400 });
    }

    const payment = await getPaymentByReference(reference);
    if (!payment) {
      return NextResponse.json({ error: 'Transaction reference not found in system records.' }, { status: 404 });
    }

    // Idempotency: if already marked success, return existing confirmed state
    if (payment.status === 'success') {
      return NextResponse.json({
        success: true,
        already_verified: true,
        course_id: payment.course_id,
        reference: payment.reference,
      });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    let verifiedSuccess = false;
    let channel = 'card';

    // Verify against Paystack API if live credentials present
    if (paystackSecret && !paystackSecret.includes('sample') && !isMock) {
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecret}`,
        },
      });

      const verifyData = await verifyRes.json();
      if (verifyData.status && verifyData.data.status === 'success') {
        // Confirm amount matches expected course fee in kobo
        if (Number(verifyData.data.amount) >= Number(payment.amount_kobo)) {
          verifiedSuccess = true;
          channel = verifyData.data.channel || 'paystack';
        } else {
          return NextResponse.json({ error: 'Transaction amount mismatch.' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: 'Paystack transaction could not be verified as successful.' }, { status: 400 });
      }
    } else {
      // In development/test mock mode, verify successfully
      verifiedSuccess = true;
      channel = 'sandbox_test';
    }

    if (verifiedSuccess) {
      // Strictly server-side unlock & enrollment
      const updatedPayment = await markPaymentSuccess(reference, channel);
      const user = await findUserById(payment.user_id);
      const course = await getCourseById(payment.course_id);

      // Dispatch automated receipt email
      if (user && course) {
        const formattedNaira = `₦${(payment.amount_kobo / 100).toLocaleString('en-NG')}`;
        sendPaymentReceiptEmail(
          user.email,
          user.profile.full_name,
          course.title,
          formattedNaira,
          reference
        ).catch(e => console.error('Failed to send receipt email:', e));
      }

      return NextResponse.json({
        success: true,
        course_id: payment.course_id,
        reference: payment.reference,
        payment: updatedPayment,
      });
    }

    return NextResponse.json({ error: 'Verification failed.' }, { status: 400 });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Internal error during payment verification.' }, { status: 500 });
  }
}
