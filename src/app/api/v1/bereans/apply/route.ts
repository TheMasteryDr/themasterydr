import { NextRequest, NextResponse } from 'next/server';
import { db, hasLiveDatabase, bereansApplications } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.phone || !body.whyJoin) {
      return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `ber-app-${Date.now()}-${randomNum}`;

    const record = {
      id,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      occupation: body.occupation || 'Professional',
      whyJoin: body.whyJoin,
      booksReadRecently: body.booksReadRecently || 'None specified',
      commitmentAgreement: Boolean(body.commitmentAgreement),
      status: 'new',
      adminNotes: 'Application submitted via website.',
    };

    if (hasLiveDatabase && db) {
      await db.insert(bereansApplications).values(record);
    }

    return NextResponse.json({
      success: true,
      message: 'Your application to The Bereans has been submitted for screening.',
    }, { status: 201 });
  } catch (err: any) {
    console.error('Bereans API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
