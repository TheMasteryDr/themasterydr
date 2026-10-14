import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateSpeakingRequestStatus } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles.includes('super_admin')) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id, status, note } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required.' }, { status: 400 });
    }

    const updated = await updateSpeakingRequestStatus(id, status, note);
    return NextResponse.json({ success: true, speaking_request: updated });
  } catch (error) {
    console.error('Admin speaking update error:', error);
    return NextResponse.json({ error: 'Status update failed.' }, { status: 500 });
  }
}
