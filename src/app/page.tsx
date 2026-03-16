'use client';

import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Hero />

      <Suspense fallback={<p className='px-6 py-10'>Loading products...</p>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
