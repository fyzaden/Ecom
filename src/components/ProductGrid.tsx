'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('draft', '==', false));

      const snapshot = await getDocs(q);

      const list: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));

      setProducts(list);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p className='px-6'>Loading products...</p>;
  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <h2 className='mb-8 text-2xl font-semibold'>Featured Products</h2>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {products.map((product) => {
          const images = product.images || [];
          const currentIndex = activeImage[product.id!] ?? 0;

          return (
            <Card key={product.id} className='group overflow-hidden'>
              <CardContent className='p-4 space-y-3'>
                <div className='relative h-44 w-full overflow-hidden rounded-md bg-neutral-100'>
                  {images[currentIndex] && (
                    <img
                      src={images[currentIndex]}
                      alt={product.title}
                      className='h-full w-full object-cover transition-all duration-300'
                    />
                  )}
                </div>
                {images.length > 1 && (
                  <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setActiveImage((prev) => ({
                            ...prev,
                            [product.id!]: i,
                          }))
                        }
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          currentIndex === i ? 'bg-black' : 'bg-black/30'
                        }`}
                      />
                    ))}
                  </div>
                )}

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
