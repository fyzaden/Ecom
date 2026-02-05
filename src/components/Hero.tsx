'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';

const images = [
  '/hero/Wildberry-smoothie-candle.jpg',
  '/hero/Sunflower-candle.jpg',
  '/hero/Strawberry-latte-candle.jpg',
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative overflow-hidden bg-white'>
      <div className='relative mx-auto max-w-7xl px-6 py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center'>
        <div className='flex flex-col items-start space-y-8 animate-in fade-in slide-in-from-left duration-1000'>
          <div className='inline-flex items-center gap-2 rounded-full border border-neutral-100 bg-neutral-50 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-neutral-500'>
            <Sparkles className='h-3 w-3' />
            Hand-Poured Excellence
          </div>

          <h1 className='text-6xl md:text-7xl font-bold leading-[1.1] tracking-tighter text-neutral-900'>
            Elevate Your <br />
            <span className='text-neutral-400 italic font-serif'>
              Daily Ritual
            </span>
          </h1>

          <p className='max-w-md text-lg text-neutral-500 leading-relaxed font-light'>
            Artisanal candles crafted with organic soy wax and premium botanical
            oils. Designed to turn your space into a sanctuary.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Button
              size='lg'
              className='rounded-full h-14 px-10 text-base bg-black hover:bg-neutral-800 transition-all shadow-xl shadow-black/10'
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
            >
              Explore Collection
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>

            <Button
              size='lg'
              variant='outline'
              className='rounded-full h-14 px-10 text-base border-neutral-200 hover:bg-neutral-50 transition-colors'
              onClick={() => router.push('/about')}
            >
              Our Story
            </Button>
          </div>
        </div>

        <div className='relative group'>
          <div className='absolute -inset-4 bg-neutral-100 rounded-[3rem] blur-2xl transition-colors group-hover:bg-neutral-200/50' />

          <div className='relative h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]'>
            {images.map((img, i) => (
              <div
                key={img}
                className={`absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out
                ${i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
                `}
              >
                <img
                  src={img}
                  alt='Premium Candle'
                  className='h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
              </div>
            ))}

            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10'>
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full
                  ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}
                `}
                />
              ))}
            </div>

            <div className='absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl hidden md:block animate-pulse'>
              <p className='text-[10px] font-bold uppercase tracking-tighter text-neutral-400'>
                Natural
              </p>
              <p className='text-sm font-bold text-neutral-900'>100% Soy Wax</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
