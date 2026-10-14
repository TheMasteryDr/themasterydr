import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';
import { verifyPassword, setSessionCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user || !user.password_hash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Set secure HTTP-only session cookie
    await setSessionCookie(user);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.profile.full_name,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed. Please try again.' }, { status: 500 });
  }
}
