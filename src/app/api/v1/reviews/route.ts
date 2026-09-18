import { NextRequest, NextResponse } from 'next/server';
import { db, hasLiveDatabase, reviews } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.comment || !body.rating) {
      return NextResponse.json({ error: 'Review text and rating are required' }, { status: 400 });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `rev-${Date.now()}-${randomNum}`;

    const record = {
      id,
      category: body.category || 'personal_brand',
      reviewerName: body.reviewerName?.trim() || 'Anonymous Reader',
      reviewerEmail: body.reviewerEmail || null,
      reviewerTitle: body.reviewerTitle || 'Community Member',
      rating: Number(body.rating) || 5,
      comment: body.comment,
      status: 'pending', // Requires admin approval before public listing
      isFeatured: false,
    };

    if (hasLiveDatabase && db) {
      await db.insert(reviews).values(record);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback. Your review has been submitted for moderation and will appear publicly once approved.',
    }, { status: 201 });
  } catch (err: any) {
    console.error('Review API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
