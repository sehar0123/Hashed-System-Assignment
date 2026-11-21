import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get('venuze_token')?.value) {
    return NextResponse.json({ error: 'Please sign in to view your dashboard.' }, { status: 401 });
  }

  return NextResponse.json({
    user: { name: 'Eve' },
    stats: { savedVenues: 0, bookings: 0, messages: 0 },
    savedVenues: [],
  });
}
