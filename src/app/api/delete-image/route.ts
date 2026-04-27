import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const urls: string[] = body.urls;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'Invalid urls' }, { status: 400 });
    }

    await Promise.all(urls.map((url) => del(url)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete image error:', error);

    return NextResponse.json(
      { error: 'Failed to delete images' },
      { status: 500 },
    );
  }
}
