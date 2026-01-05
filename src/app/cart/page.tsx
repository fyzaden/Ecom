'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, increase, decrease } = useCart();

  if (items.length === 0) {
    return (
      <div className='max-w-4xl mx-auto px-6 py-20 text-center'>
        <h2 className='text-xl font-semibold'>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto px-6 py-20'>
      <h1 className='text-2xl font-semibold mb-6'>Shopping Cart</h1>

      <div className='space-y-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between border rounded-lg p-4'
          >
            <div>
              <h3 className='font-medium'>{item.title}</h3>
              <p className='text-sm text-muted-foreground'>
                {item.price.amount} {item.price.currency}
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <Button onClick={() => decrease(item.id)}>-</Button>
              <span className='font-medium'>x{item.quantity}</span>
              <Button onClick={() => increase(item.id)}>+</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
