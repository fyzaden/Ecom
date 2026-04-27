import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  console.log('Incoming GET request', req);

  return NextResponse.json(
    { user: { name: 'John', email: 'john@gmail.com' } },
    { status: 200 },
  );
}

export async function POST(req: Request): Promise<NextResponse> {
  console.log('Incoming POST request', req);

  return NextResponse.json(
    { user: { name: 'John', email: 'john@gmail.com' } },
    { status: 200 },
  );
}

export async function DELETE(req: Request): Promise<NextResponse> {
  console.log('Incoming DELETE request', req);

  return NextResponse.json({ status: 200 });
}
