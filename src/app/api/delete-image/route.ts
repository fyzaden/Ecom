import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { urls } = await req.json();

  if (!urls || !Array.isArray(urls)) {
    return NextResponse.json({ error: 'No urls provided' }, { status: 400 });
  }

  try {
    await Promise.all(urls.map((url) => del(url)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
