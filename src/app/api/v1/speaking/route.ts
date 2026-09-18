import { NextRequest, NextResponse } from 'next/server';
import { db, hasLiveDatabase, speakingRequests } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation
    const required = ['fullName', 'organization', 'email', 'phone', 'eventName', 'eventType', 'eventDate', 'eventLocation', 'proposedTopic'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const applicationCode = `SPK-${new Date().getFullYear()}-${randomSuffix}`;
    const id = `spk-${Date.now()}-${randomSuffix}`;

    const record = {
      id,
      applicationCode,
      fullName: body.fullName,
      organization: body.organization,
      email: body.email,
      phone: body.phone,
      eventName: body.eventName,
      eventType: body.eventType,
      eventDate: new Date(body.eventDate),
      eventLocation: body.eventLocation,
      isVirtual: Boolean(body.isVirtual),
      audienceSize: body.audienceSize || '100 - 500',
      demographic: body.demographic || '',
      proposedTopic: body.proposedTopic,
      eventTheme: body.eventTheme || '',
      keyObjectives: body.keyObjectives || '',
      duration: body.duration || '60 mins',
      budgetRange: body.budgetRange || 'Standard Honorarium',
      travelProvision: body.travelProvision || '',
      websiteSocial: body.websiteSocial || '',
      invitationLetterUrl: body.invitationLetterUrl || null,
      status: 'new',
      adminNotes: 'Application received via website portal.',
    };

    if (hasLiveDatabase && db) {
      await db.insert(speakingRequests).values(record);
    }

    return NextResponse.json({
      success: true,
      applicationCode,
      message: 'Speaking invitation successfully submitted. Our team will review and contact you within 48 hours.',
    }, { status: 201 });
  } catch (err: any) {
    console.error('Speaking API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
