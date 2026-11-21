import { NextResponse } from 'next/server';

type LoginRequest = { email?: string; password?: string };
type LoginResult = { token?: string; error?: string };

export async function POST(request: Request) {
  const credentials = (await request.json()) as LoginRequest;
  if (!credentials.email || !credentials.password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      cache: 'no-store',
    });
    const result = (await response.json()) as LoginResult;
    if (!response.ok || !result.token) {
      return NextResponse.json(
        { error: result.error || 'Unable to sign in.' },
        { status: response.status || 401 },
      );
    }

    const nextResponse = NextResponse.json({ token: result.token });
    nextResponse.cookies.set('venuze_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return nextResponse;
  } catch {
    return NextResponse.json(
      { error: 'The sign-in service is unavailable. Please try again.' },
      { status: 502 },
    );
  }
}
