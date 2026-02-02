import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, images } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: 'Title and price required' },
        { status: 400 },
      );
    }

    // 1️⃣ Stripe Product
    const stripeProduct = await stripe.products.create({
      name: title,
      description,
      images,
    });

    // 2️⃣ Stripe Price
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(Number(price) * 100),
      currency: 'try',
    });

    // 3️⃣ Firestore
    await addDoc(collection(db, 'products'), {
      title,
      description,
      images,
      price: {
        amount: Number(price),
        currency: '₺',
      },
      category: 'candle',
      stock: 10,
      draft: false,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
