'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function ProductGridClient({ products }: { products: any[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <h2 className='mb-8 text-2xl font-semibold'>Featured Products</h2>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {products.map((product) => {
          const mainImage = product.images?.[0];
          const hoverImage = product.images?.[1];

          return (
            <Card
              key={product.id}
              className='group overflow-hidden'
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardContent className='p-4 space-y-3'>
                <div className='relative h-44 overflow-hidden rounded-md bg-neutral-100'>
                  {mainImage && (
                    <img
                      src={
                        hovered === product.id && hoverImage
                          ? hoverImage
                          : mainImage
                      }
                      className='h-full w-full object-cover transition-all duration-300'
                    />
                  )}
                </div>

                <div>
                  <h3 className='font-medium truncate'>{product.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {product.price.amount} {product.price.currency}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
