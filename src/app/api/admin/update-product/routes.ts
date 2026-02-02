import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(req: Request) {
  const body = await req.json();

  const {
    productId,
    title,
    description,
    price,
    stripeProductId,
    stripePriceId,
  } = body;

  // 1️⃣ Stripe Product update
  await stripe.products.update(stripeProductId, {
    name: title,
    description,
  });

  // 2️⃣ Yeni price oluştur
  const newPrice = await stripe.prices.create({
    product: stripeProductId,
    unit_amount: price * 100,
    currency: 'try',
  });

  // 3️⃣ Firestore update
  await updateDoc(doc(db, 'products', productId), {
    title,
    description,
    price: { amount: price, currency: '₺' },
    stripePriceId: newPrice.id,
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
