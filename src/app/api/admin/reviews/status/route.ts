import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateReviewStatus } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles.includes('super_admin')) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id, status, is_featured } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Review ID and status are required.' }, { status: 400 });
    }

    const updated = await updateReviewStatus(id, status, is_featured);
    return NextResponse.json({ success: true, review: updated });
  } catch (error) {
    console.error('Admin review moderation error:', error);
    return NextResponse.json({ error: 'Moderation action failed.' }, { status: 500 });
  }
}
