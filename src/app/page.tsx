import Hero from '@/components/Hero';
import ProductGridServer from '@/components/ProductGridServer';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={null}>
        <ProductGridServer />
      </Suspense>
    </div>
  );
}
