'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, increase, decrease, remove } = useCart();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className='max-w-4xl mx-auto px-6 py-20 text-center'>
        <h2 className='text-xl font-semibold'>Your cart is empty 🛒</h2>
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
                <p className='text-sm text-muted-foreground'>{item.price} ₺</p>
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
          {totalPrice.toLocaleString('tr-TR')} ₺
        </p>
      </div>

      <div className='mt-6 text-right'>
        <Button size='lg'>Checkout</Button>
      </div>
    </section>
  );
}
