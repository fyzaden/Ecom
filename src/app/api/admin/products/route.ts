import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const stripeProduct = await stripe.products.create({
    name: body.title,
    description: body.description,
  });

  const stripePrice = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: body.price * 100,
    currency: 'try',
  });

  await addDoc(collection(db, 'products'), {
    title: body.title,
    description: body.description,
    price: {
      amount: body.price,
      currency: '₺',
    },
    images: body.images || [],
    stripeProductId: stripeProduct.id,
    stripePriceId: stripePrice.id,
    draft: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return NextResponse.json({ success: true });
}
