'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const images = [
  '/hero/Wildberry-smoothie-candle.jpg',
  '/hero/Sunflower-candle.jpg',
  '/hero/Strawberry-latte-candle.jpg',
  // '/hero/Pink days Eye candle.jpg',
  // '/hero/orange cinnamon candle.jpg',
  // '/hero/orange candle.jpg',
  // '/hero/Leaf candle.jpg',
  // '/hero/Ice matcha latte candle.jpg',
  // '/hero/Ice love latte candle.jpg',
  // '/hero/Blueberry waffle candle.jpg',
  // '/hero/Ice latte candle.jpg',
  // '/hero/dessert candle.jpg',
  // '/hero/Chocolate candle.jpg',
  // '/hero/Daisy Candle.jpg',
  // '/hero/coffee candle.jpg',
  // '/hero/Christmas candle.jpg',
  // '/hero/Cheescake de amora candle.jpg',
  // '/hero/Buble christmas candle.jpg',
  // '/hero/Iced vanilla latte candle.jpg',
];
export default function Hero() {
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white'
          : 'bg-gradient-to-br from-neutral-100 via-white to-neutral-200 text-black'
      }`}
    >
      <div className='mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-12 items-center'>
        <div className='space-y-6'>
          <h1 className='text-5xl font-bold leading-tight md:text-5xl'>
            Discover Your <br /> New Style
          </h1>
          <p className='max-w-md text-muted-foreground'>
            Premium products crafted for modern lifestyle.
          </p>

          <Button size='lg'>Shop Now</Button>
        </div>
        <div className='relative h-[420px] rounded-3xl overflow-hidden bg-neutral-100'>
          {images.map((img, i) => (
            <img
              key={img}
              src={img}
              className={`
              absolute inset-0 h-full w-full object-cover transition-opacity duration-700
              ${i === index ? 'opacity-100' : 'opacity-0'}
            `}
            />
          ))}

          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
            {images.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full cursor-pointer transition
                ${i === index ? 'bg-black' : 'bg-white/60'}
              `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
