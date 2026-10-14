import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { dbStore } from '@/lib/db';
import { AssignmentSubmission } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { assignment_id, submission_text, attachment_url } = await req.json();
    if (!assignment_id || (!submission_text && !attachment_url)) {
      return NextResponse.json({ error: 'Submission text or attachment is required.' }, { status: 400 });
    }

    const submission: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignment_id,
      user_id: user.id,
      student_name: user.profile.full_name,
      submission_text,
      attachment_url,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    };

    // Remove old submission if re-submitting
    dbStore.submissions = dbStore.submissions.filter(s => !(s.assignment_id === assignment_id && s.user_id === user.id));
    dbStore.submissions.push(submission);

    return NextResponse.json({
      success: true,
      submission,
      message: 'Assignment submitted successfully for instructor review.',
    });
  } catch (error) {
    console.error('Assignment submission error:', error);
    return NextResponse.json({ error: 'Failed to submit assignment.' }, { status: 500 });
  }
}
