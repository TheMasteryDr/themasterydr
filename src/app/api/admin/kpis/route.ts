import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getAdminKPIs } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles.includes('super_admin')) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const kpis = await getAdminKPIs();
    return NextResponse.json({ success: true, kpis });
  } catch (error) {
    console.error('Admin KPI error:', error);
    return NextResponse.json({ error: 'Failed to retrieve metrics.' }, { status: 500 });
  }
}
