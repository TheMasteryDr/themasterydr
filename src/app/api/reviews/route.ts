import { NextResponse } from 'next/server';
import { createReview, getApprovedReviews } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const reviews = await getApprovedReviews(category);
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.author_name || !data.review_text || !data.category) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const newReview = await createReview({
      author_name: data.author_name.trim(),
      author_role: data.author_role?.trim() || 'Student & Builder',
      reviewer_email: data.reviewer_email?.trim(),
      category: data.category,
      course_id: data.course_id,
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      review_text: data.review_text.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted for moderation.',
      review: newReview,
    }, { status: 201 });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
