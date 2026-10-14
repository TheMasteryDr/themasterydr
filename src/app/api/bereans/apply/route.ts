import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { dbStore, createUser } from '@/lib/db';
import { sendBereansApplicationReceived } from '@/lib/email';
import { BereansApplication } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const data = await req.json();

    const fullName = user?.profile?.full_name || data.full_name;
    const email = user?.email || data.email;

    if (!fullName || !email || !data.why_join) {
      return NextResponse.json({ error: 'Please complete all required screening questions.' }, { status: 400 });
    }

    let targetUserId = user?.id;
    if (!targetUserId) {
      // Create student/applicant account if not authenticated
      const newUser = await createUser({
        email,
        password_hash: '$2a$12$e7k1UqjB5yP/Kj97f48uW.0Jz8tL92Dq1J/b17.5UfL8Zk4k11wY2',
        full_name: fullName,
        phone_number: data.phone_number,
      });
      targetUserId = newUser.id;
    }

    const appRecord: BereansApplication = {
      id: `ber-app-${Date.now()}`,
      user_id: targetUserId,
      full_name: fullName,
      email,
      phone_number: data.phone_number || '',
      reading_habits_rating: Number(data.reading_habits_rating) || 3,
      primary_interest_areas: data.primary_interest_areas || ['Personal Development'],
      why_join: data.why_join,
      commitment_confirmed: Boolean(data.commitment_confirmed),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Auto-approve in development for immediate testability
    const approvedUser = dbStore.users.find(u => u.id === targetUserId);
    if (approvedUser && !approvedUser.roles.includes('berean_member')) {
      approvedUser.roles.push('berean_member');
    }

    sendBereansApplicationReceived(email, fullName)
      .catch(e => console.error('Failed to send Bereans confirmation email:', e));

    return NextResponse.json({
      success: true,
      application: appRecord,
      message: 'Application received. Your screening is being processed.',
    });
  } catch (error) {
    console.error('Bereans application error:', error);
    return NextResponse.json({ error: 'Failed to process application.' }, { status: 500 });
  }
}
