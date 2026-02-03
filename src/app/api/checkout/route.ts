import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;
    console.log('Gelen Sepet Ürünleri:', items);

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('STRIKE HATA DETAYI:', error.message);

    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
