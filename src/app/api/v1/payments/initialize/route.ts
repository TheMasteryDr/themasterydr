import { NextRequest, NextResponse } from 'next/server';
import { SEED_COURSES } from '@/lib/data/seed-data';
import { db, hasLiveDatabase, payments } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { courseSlug, email, fullName, couponCode } = await req.json();

    if (!courseSlug || !email) {
      return NextResponse.json({ error: 'Course slug and student email are required' }, { status: 400 });
    }

    const course = SEED_COURSES.find(c => c.slug === courseSlug);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    let finalPrice = course.price;
    // Coupon logic
    if (couponCode && couponCode.toUpperCase() === 'MASTERY20') {
      finalPrice = finalPrice * 0.8; // 20% off
    } else if (couponCode && couponCode.toUpperCase() === 'GROWTH50') {
      finalPrice = finalPrice * 0.5; // 50% off
    }

    const reference = `TMD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // If course is free or 100% discounted:
    if (course.isFree || finalPrice <= 0) {
      return NextResponse.json({
        success: true,
        isFree: true,
        reference,
        redirectUrl: `/dashboard/course/${course.slug}`,
        message: 'Successfully enrolled in free masterclass.',
      });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const amountInKobo = Math.round(finalPrice * 100);

    // If live Paystack key is configured, initialize with Paystack API
    if (paystackSecret && !paystackSecret.includes('sample')) {
      const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          reference,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/institute/checkout/verify?reference=${reference}&slug=${course.slug}`,
          metadata: {
            courseId: course.id,
            courseSlug: course.slug,
            fullName,
          },
        }),
      });

      const paystackData = await paystackRes.json();
      if (!paystackData.status) {
        return NextResponse.json({ error: paystackData.message || 'Payment initialization failed' }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        isFree: false,
        reference,
        authorizationUrl: paystackData.data.authorization_url,
        accessCode: paystackData.data.access_code,
      });
    }

    // Otherwise, in development / sandbox mode without live keys:
    return NextResponse.json({
      success: true,
      isFree: false,
      isSandbox: true,
      reference,
      amount: finalPrice,
      callbackUrl: `/institute/checkout/verify?reference=${reference}&slug=${course.slug}`,
      message: 'Paystack Sandbox initialized. Use simulated verification.',
    });
  } catch (err: any) {
    console.error('Payment Init Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
