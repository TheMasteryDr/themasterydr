import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getCourseById, getCouponByCode, createPaymentTransaction } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required to initiate enrollment.' }, { status: 401 });
    }

    const { course_id, coupon_code } = await req.json();
    if (!course_id) {
      return NextResponse.json({ error: 'Course ID is required.' }, { status: 400 });
    }

    const course = await getCourseById(course_id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    }

    // Determine final price in Kobo
    let finalAmountKobo = course.price_kobo;
    let appliedCoupon = null;

    if (coupon_code) {
      const coupon = await getCouponByCode(coupon_code);
      if (coupon) {
        appliedCoupon = coupon;
        if (coupon.discount_type === 'percentage') {
          const discount = Math.round((finalAmountKobo * coupon.discount_value) / 100);
          finalAmountKobo = Math.max(0, finalAmountKobo - discount);
        } else {
          finalAmountKobo = Math.max(0, finalAmountKobo - coupon.discount_value);
        }
      }
    }

    const reference = `TMD_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // Persist initialized transaction
    await createPaymentTransaction({
      reference,
      user_id: user.id,
      user_email: user.email,
      course_id: course.id,
      course_title: course.title,
      amount_kobo: finalAmountKobo,
    });

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const callbackUrl = `${appUrl}/checkout/verify?reference=${reference}`;

    // If live Paystack secret key is configured and not default placeholder, initialize via Paystack API
    if (paystackSecret && !paystackSecret.includes('sample')) {
      const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${paystackSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amount: finalAmountKobo, // Paystack expects amount in Kobo
          reference,
          callback_url: callbackUrl,
          metadata: {
            user_id: user.id,
            course_id: course.id,
            coupon_id: appliedCoupon?.id,
          },
        }),
      });

      const paystackData = await paystackRes.json();
      if (paystackData.status && paystackData.data?.authorization_url) {
        return NextResponse.json({
          authorization_url: paystackData.data.authorization_url,
          reference,
          amount_kobo: finalAmountKobo,
        });
      }
    }

    // Simulated sandbox checkout authorization URL for zero-config immediate testing
    const simulatedAuthUrl = `/checkout/verify?reference=${reference}&mock=true`;

    return NextResponse.json({
      authorization_url: simulatedAuthUrl,
      reference,
      amount_kobo: finalAmountKobo,
      is_mock: true,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({ error: 'Failed to initialize payment.' }, { status: 500 });
  }
}
