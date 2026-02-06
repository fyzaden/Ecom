'use client';

import React from 'react';
import { Heart, ShieldCheck, Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className='bg-white text-neutral-900'>
      <section className='mx-auto max-w-3xl px-6 py-24 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold tracking-tighter mb-8'>
          The Art of{' '}
          <span className='italic font-serif text-neutral-400'>
            Slow Living
          </span>
        </h1>
        <p className='text-lg text-neutral-500 leading-relaxed font-light'>
          At{' '}
          <span className='font-bold text-black uppercase tracking-widest'>
            Candle Dream
          </span>
          , we believe that a candle is more than just a light source; it is an
          invitation to pause, breathe, and find peace in the present moment.
        </p>
      </section>

      <section className='mx-auto max-w-5xl px-6 py-12 grid md:grid-cols-2 gap-16 items-center'>
        <div className='rounded-[2rem] overflow-hidden shadow-xl'>
          <img
            src='/hero/Wildberry-smoothie-candle.jpg'
            alt='Crafting process'
            className='w-full h-[500px] object-cover'
          />
        </div>
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold'>Our Story</h2>
          <p className='text-neutral-600 leading-relaxed'>
            Founded in 2024 in Konya, our journey began with a simple passion:
            to create the cleanest, most fragrant, and most beautiful candles
            possible. What started in a small kitchen has grown into a boutique
            studio, but our hands-on approach remains the same.
          </p>
          <p className='text-neutral-600 leading-relaxed'>
            Every candle in our collection is meticulously handcrafted. We pour
            in small batches to ensure that every scent tells a story and every
            flame burns with perfection.
          </p>
        </div>
      </section>

      <section className='bg-neutral-50 py-24 mt-12'>
        <div className='mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-12 text-center'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='p-4 bg-white rounded-full shadow-sm'>
              <Leaf className='h-6 w-6' />
            </div>
            <h3 className='font-bold uppercase tracking-widest text-sm'>
              Eco-Friendly
            </h3>
            <p className='text-sm text-neutral-500'>
              We use only 100% natural soy wax and lead-free cotton wicks.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-4'>
            <div className='p-4 bg-white rounded-full shadow-sm'>
              <Heart className='h-6 w-6' />
            </div>
            <h3 className='font-bold uppercase tracking-widest text-sm'>
              Handcrafted
            </h3>
            <p className='text-sm text-neutral-500'>
              Each piece is individually poured and finished by hand in our
              studio.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-4'>
            <div className='p-4 bg-white rounded-full shadow-sm'>
              <ShieldCheck className='h-6 w-6' />
            </div>
            <h3 className='font-bold uppercase tracking-widest text-sm'>
              Premium Quality
            </h3>
            <p className='text-sm text-neutral-500'>
              Only the finest botanical oils for a clean and long-lasting scent.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
