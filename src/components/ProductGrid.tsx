'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get('q')?.toLowerCase() || '';
  const { addToCart } = useCart();

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

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {filteredProducts.map((product) => {
          const mainImage = product.images?.[0];
          const hoverImage = product.images?.[1];

          return (
            <div key={product.id}>
              <Card
                className='group overflow-hidden cursor-pointer'
                onMouseEnter={() => setHovered(product.id!)}
                onMouseLeave={() => setHovered(null)}
              >
                <CardContent className='p-4 space-y-3'>
                  <Link href={`/products/${product.id}`}>
                    <div className='relative aspect-square w-full overflow-hidden rounded-md bg-neutral-100'>
                      {mainImage && (
                        <img
                          src={
                            hovered === product.id && hoverImage
                              ? hoverImage
                              : mainImage
                          }
                          alt={product.title}
                          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                      )}
                    </div>
                  </Link>{' '}
                  <div className='flex justify-between opacity-0 group-hover:opacity-100 transition'>
                    <button className='rounded-full bg-white p-2 shadow'>
                      <Heart className='h-4 w-4' />
                    </button>

                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          productId: product.id,
                          title: product.title,
                          price: product.price.amount,
                          image: product.images?.[0],
                          stripePriceId: product.stripePriceId || '',
                          quantity: 1,
                        })
                      }
                      className='flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium shadow'
                    >
                      <ShoppingCart className='h-4 w-4' />
                      Add
                    </button>
                  </div>{' '}
                  <div className='space-y-1'>
                    <h3 className='font-medium line-clamp-1'>
                      {product.title}
                    </h3>

                    <p className='font-semibold'>
                      {product.price.amount} {product.price.currency}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
