import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { UserWithProfile, UserRole } from './types';
import { findUserByEmail, findUserById } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'the_mastery_dr_super_secret_jwt_key_gain_mastery_2026_ultra_secure'
);
const COOKIE_NAME = 'mastery_session';

export interface SessionPayload {
  userId: string;
  email: string;
  fullName: string;
  roles: UserRole[];
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserWithProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session?.userId) return null;

  return findUserById(session.userId);
}

export async function setSessionCookie(user: UserWithProfile) {
  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    fullName: user.profile.full_name,
    roles: user.roles,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function hasRole(user: UserWithProfile | null, requiredRole: UserRole): boolean {
  if (!user) return false;
  if (user.roles.includes('super_admin')) return true; // Super admin possesses all privileges
  return user.roles.includes(requiredRole);
}
