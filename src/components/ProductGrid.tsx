'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState, Suspense } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import AddToCartButton from '@/components/AddToCartButton';

function ProductGridContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const searchParams = useSearchParams();
  const search = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('draft', '==', false),
        );
        const snapshot = await getDocs(q);
        const list: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        }));
        setProducts(list);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const isCurrentlyFavorite = !!favorites[id];
    const newFavoriteStatus = !isCurrentlyFavorite;

    setFavorites((prev) => ({ ...prev, [id]: newFavoriteStatus }));

    if (newFavoriteStatus) {
      toast.dismiss();
      toast.success('Liked! ❤️', {
        id: `fav-${id}`,
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search),
  );

  if (loading)
    return (
      <p className='px-6 py-10 animate-pulse text-neutral-400'>
        Discovering scents...
      </p>
    );

  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
      {filteredProducts.map((product) => {
        const mainImage = product.images?.[0];
        const hoverImage = product.images?.[1];
        const hasDiscount = product.discount && product.discount.rate > 0;
        const discountedPrice = hasDiscount
          ? (product.price.amount * (1 - product.discount!.rate / 100)).toFixed(
              2,
            )
          : product.price.amount;

        return (
          <div key={product.id} className='group relative'>
            <Card
              className='border-none bg-transparent shadow-none transition-all duration-300'
              onMouseEnter={() => setHovered(product.id!)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardContent className='p-0 relative'>
                <div className='relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-neutral-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 cursor-pointer'>
                  {hasDiscount && (
                    <div className='absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest'>
                      -{product.discount?.rate}%
                    </div>
                  )}

                  <Link href={`/products/${product.id}`}>
                    <img
                      src={
                        hovered === product.id && hoverImage
                          ? hoverImage
                          : mainImage
                      }
                      alt={product.title}
                      className='h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110'
                    />
                  </Link>

                  <div className='absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2 px-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
                    <button
                      type='button'
                      onClick={(e) => handleToggleFavorite(e, product.id!)}
                      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 active:scale-90 z-30 ${favorites[product.id!] ? 'text-red-500' : 'text-neutral-600'}`}
                    >
                      <Heart
                        className='h-5 w-5'
                        fill={favorites[product.id!] ? 'currentColor' : 'none'}
                      />
                    </button>

                    <div className='flex-1 z-30 cursor-pointer'>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>

                <div className='mt-5 space-y-2 px-2'>
                  <span className='text-[10px] uppercase tracking-widest text-neutral-400 font-bold'>
                    {product.brand}
                  </span>
                  <h3 className='text-base font-semibold text-neutral-900 truncate'>
                    <Link
                      href={`/products/${product.id}`}
                      className='cursor-pointer hover:underline'
                    >
                      {product.title}
                    </Link>
                  </h3>
                  <div className='flex items-baseline gap-2 pt-1'>
                    <span className='text-lg font-bold text-neutral-900'>
                      {discountedPrice} {product.price.currency}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <Toaster position='bottom-right' />
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <ProductGridContent />
      </Suspense>
    </section>
  );
}
