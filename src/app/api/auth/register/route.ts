import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/db';
import { hashPassword, setSessionCookie } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { full_name, email, password, phone_number } = await req.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: 'Full name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const password_hash = await hashPassword(password);
    const newUser = await createUser({
      email,
      password_hash,
      full_name,
      phone_number,
      roles: ['student'],
    });

    // Set secure HTTP-only session cookie
    await setSessionCookie(newUser);

    // Dispatch welcome email asynchronously
    sendWelcomeEmail(email, full_name).catch(e => console.error('Failed to send welcome email:', e));

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.profile.full_name,
        roles: newUser.roles,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 });
  }
}
