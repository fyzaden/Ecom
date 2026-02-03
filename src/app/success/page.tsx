'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className='flex min-h-[80vh] items-center justify-center px-4'>
      <div className='max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200 border border-slate-100 text-center transition-all animate-in fade-in zoom-in duration-500'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50'>
          <CheckCircle2 className='h-12 w-12 text-green-500' />
        </div>

        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
          Order Successful!
        </h1>
        <p className='mt-4 text-slate-600 leading-relaxed'>
          Great choice! Your payment has been successfully processed, and your
          order is now being prepared.
        </p>

        <div className='mt-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 flex flex-col gap-2'>
          <p className='flex items-center gap-2'>
            <span>📧</span> A confirmation email has been sent to you.
          </p>
          <p className='flex items-center gap-2'>
            <span>📦</span> Your tracking number will be shared soon.
          </p>
        </div>

        <div className='mt-10 flex flex-col gap-3'>
          <Button
            onClick={() => router.push('/')}
            className='w-full h-12 text-md font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2'
          >
            <ShoppingBag className='h-5 w-5' />
            Continue Shopping
          </Button>

          <Button
            variant='ghost'
            onClick={() => router.push('/orders')}
            className='w-full h-12 text-slate-500 hover:text-slate-900 flex items-center justify-center gap-2'
          >
            View Order Details
            <ArrowRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
