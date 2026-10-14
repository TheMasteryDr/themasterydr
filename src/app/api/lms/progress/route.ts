import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { setLessonProgress, issueCertificate } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lesson_id, course_id, is_completed } = await req.json();
    if (!lesson_id || !course_id) {
      return NextResponse.json({ error: 'lesson_id and course_id are required' }, { status: 400 });
    }

    const percentage = await setLessonProgress(user.id, lesson_id, course_id, Boolean(is_completed));

    // If course reaches 100% completion, issue verifiable certificate
    let certificate = null;
    if (percentage === 100) {
      certificate = await issueCertificate(user.id, course_id, user.profile.full_name);
    }

    return NextResponse.json({
      success: true,
      progress_percentage: percentage,
      certificate,
    });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
