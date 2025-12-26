'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get('q')?.toLowerCase() || '';

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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className='px-6'>Loading products...</p>;

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <h2 className='mb-8 text-2xl font-semibold'>
        {search ? `Results for "${search}"` : 'Featured Products'}
      </h2>

      {filteredProducts.length === 0 && (
        <p className='text-muted-foreground'>No products found.</p>
      )}

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {filteredProducts.map((product) => {
          const mainImage = product.images?.[0];
          const hoverImage = product.images?.[1];

          return (
            <Card
              key={product.id}
              className='group overflow-hidden'
              onMouseEnter={() => setHovered(product.id!)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardContent className='p-4 space-y-3'>
                <div className='relative h-44 w-full overflow-hidden rounded-md bg-neutral-100'>
                  {mainImage && (
                    <img
                      src={
                        hovered === product.id && hoverImage
                          ? hoverImage
                          : mainImage
                      }
                      alt={product.title}
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
