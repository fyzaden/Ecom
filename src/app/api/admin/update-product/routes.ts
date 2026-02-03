import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productId, title, description = '', price, stripeProductId } = body;

    if (!productId || !stripeProductId || !price || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    await stripe.products.update(stripeProductId, {
      name: title,
      description: description,
    });

    const newPrice = await stripe.prices.create({
      product: stripeProductId,
      unit_amount: Math.round(Number(price) * 100),
      currency: 'usd',
    });

    const productRef = doc(db, 'products', productId);

    await updateDoc(productRef, {
      title,
      description,
      price: {
        amount: Number(price),
        currency: '$',
      },
      stripePriceId: newPrice.id,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, newPriceId: newPrice.id });
  } catch (error: any) {
    console.error('Update Error Details:', error.message);
    return NextResponse.json(
      { error: error.message || 'Update failed' },
      { status: 500 },
    );
  }
}
