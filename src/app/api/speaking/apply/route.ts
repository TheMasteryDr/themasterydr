import { NextResponse } from 'next/server';
import { createSpeakingRequest } from '@/lib/db';
import { sendSpeakingRequestReceived } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      'full_name', 'organization', 'email', 'phone_number',
      'event_name', 'event_type', 'event_date', 'event_location',
      'expected_audience_size', 'proposed_topic', 'expected_duration', 'budget_range'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Field '${field}' is required.` }, { status: 400 });
      }
    }

    const speakingReq = await createSpeakingRequest({
      full_name: body.full_name,
      organization: body.organization,
      email: body.email,
      phone_number: body.phone_number,
      event_name: body.event_name,
      event_type: body.event_type,
      event_date: body.event_date,
      event_location: body.event_location,
      is_virtual: Boolean(body.is_virtual),
      expected_audience_size: body.expected_audience_size,
      audience_demographic: body.audience_demographic || 'General Audience',
      proposed_topic: body.proposed_topic,
      event_theme: body.event_theme || '',
      speech_objective: body.speech_objective || '',
      expected_duration: body.expected_duration,
      budget_range: body.budget_range,
      travel_hospitality_notes: body.travel_hospitality_notes || '',
      organization_url: body.organization_url || '',
      additional_info: body.additional_info || '',
      brief_attachment_url: body.brief_attachment_url || '',
    });

    // Send confirmation email to applicant
    sendSpeakingRequestReceived(
      speakingReq.email,
      speakingReq.full_name,
      speakingReq.event_name,
      speakingReq.application_code
    ).catch(e => console.error('Failed to dispatch speaking confirmation email:', e));

    return NextResponse.json({
      success: true,
      application_code: speakingReq.application_code,
      message: 'Speaking application submitted successfully.',
    }, { status: 201 });
  } catch (error) {
    console.error('Speaking application error:', error);
    return NextResponse.json({ error: 'Failed to process speaking application.' }, { status: 500 });
  }
}
