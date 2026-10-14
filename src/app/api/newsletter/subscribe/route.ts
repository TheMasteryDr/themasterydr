import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    await subscribeNewsletter(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
