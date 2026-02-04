'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CartPage() {
  const { items, increase, decrease, remove } = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className='min-h-screen bg-white' />;
  }
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;

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
        throw new Error('Checkout failed');
      }

      const data = await res.json();
      router.push(data.url);
    } catch (err) {
      console.error(err);
      alert('Checkout error');
    }
  };

  if (items.length === 0) {
    return (
      <div className='max-w-4xl mx-auto px-6 py-20 text-center'>
        <h2 className='text-xl font-semibold'>Your cart is empty 🛒</h2>
        <Button className='mt-6' onClick={() => router.push('/')}>
          Continue Shopping
        </Button>
      </div>
    );
  }
  return (
    <section className='mx-auto max-w-4xl px-6 py-16'>
      <h1 className='mb-8 text-2xl font-semibold'>Your Cart</h1>

      <div className='space-y-6'>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between gap-4 rounded-lg border'
          >
            <div className='flex items-center gap-4'>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className='h-40 w-40 rounded object-cover'
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
                  −
                </Button>

                <span className='w-6 text-center'>{item.quantity}</span>

                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => increase(item.id)}
                >
                  +
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
        <p className='text-lg font-semibold'>Total</p>
        <p className='text-xl font-bold'>
          {totalPrice.toLocaleString('en-EN')} $
        </p>
      </div>

      <div className='mt-8 flex justify-end'>
        <Button
          size='lg'
          onClick={handleCheckout}
          className='px-12 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105 active:scale-95'
        >
          Checkout
        </Button>
      </div>
    </section>
  );
}
