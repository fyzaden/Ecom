'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  const { items, increase, decrease, remove } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            priceId: item.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(
          'Payment process could not be initiated. Please try again.',
        );
      }

      const data = await res.json();
      router.push(data.url);
    } catch (err) {
      console.error(err);

      setError(
        'Payment processing failed. Please check your internet connection.',
      );
    }
  };

  if (items.length === 0) {
    return (
      <div className='max-w-4xl mx-auto px-6 py-20 text-center'>
        <h2 className='text-xl font-semibold'>
          Your cart is currently empty 🛒
        </h2>
        <Button className='mt-6' onClick={() => router.push('/')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <section className='mx-auto max-w-4xl px-6 py-16'>
      <h1 className='mb-8 text-2xl font-semibold'>Your Cart</h1>

      {error && (
        <div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex justify-between items-center'>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className='font-bold underline ml-2'
          >
            Close
          </button>
        </div>
      )}

      <div className='space-y-6'>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm'
          >
            <div className='flex items-center gap-4'>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className='h-24 w-24 rounded object-cover'
                />
              )}
              <div>
                <h3 className='font-medium'>{item.title}</h3>
                <p className='text-sm text-muted-foreground'>{item.price} $</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => decrease(item.id)}
                >
                  {' '}
                  −{' '}
                </Button>
                <span className='w-6 text-center'>{item.quantity}</span>
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => increase(item.id)}
                >
                  {' '}
                  +{' '}
                </Button>
              </div>
              <Button
                variant='ghost'
                className='text-red-500'
                onClick={() => remove(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-10 flex items-center justify-between border-t pt-6'>
        <p className='text-lg font-semibold'>Toplam</p>
        <p className='text-xl font-bold'>
          {totalPrice.toLocaleString('tr-TR')} $
        </p>
      </div>

      <div className='mt-8 flex justify-end gap-4 items-center'>
        <Button
          size='lg'
          onClick={handleCheckout}
          className='px-12 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105 active:scale-95'
        >
          Proceed to Checkout
        </Button>
      </div>
    </section>
  );
}
