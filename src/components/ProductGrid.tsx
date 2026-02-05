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
import toast, { Toaster } from 'react-hot-toast';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
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

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!favorites[id]) toast.success('Liked! ❤️');
  };

  const handleAddToCart = (product: Product) => {
    const finalPrice = product.discount?.rate
      ? product.price.amount * (1 - product.discount.rate / 100)
      : product.price.amount;

    addToCart({
      id: product.id!,
      productId: product.id!,
      title: product.title,
      price: finalPrice,
      image: product.images?.[0] || '',
      stripePriceId: product.stripePriceId || '',
      quantity: 1,
    });
    toast.success(`${product.title} added to cart! 🛍️`, {
      style: { borderRadius: '12px', background: '#171717', color: '#fff' },
    });
  };
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <p className='px-6 py-10 animate-pulse text-neutral-400'>
        Discovering scents...
      </p>
    );

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <Toaster position='bottom-right' />

      <h2 className='mb-10 text-3xl font-bold tracking-tight text-gray-900'>
        {search ? `Results for "${search}"` : 'Featured Collection'}
      </h2>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {filteredProducts.map((product) => {
          const mainImage = product.images?.[0];
          const hoverImage = product.images?.[1];

          const hasDiscount = product.discount && product.discount.rate > 0;
          const discountedPrice = hasDiscount
            ? (
                product.price.amount *
                (1 - product.discount!.rate / 100)
              ).toFixed(2)
            : product.price.amount;

          return (
            <div key={product.id} className='group relative'>
              <Card
                className='border-none bg-transparent shadow-none transition-all duration-300'
                onMouseEnter={() => setHovered(product.id!)}
                onMouseLeave={() => setHovered(null)}
              >
                <CardContent className='p-0 relative'>
                  <div className='relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-neutral-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1'>
                    {hasDiscount && (
                      <div className='absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg'>
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
                        className='h-full w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110'
                      />
                    </Link>

                    <div className='absolute bottom-5 left-0 right-0 flex justify-center gap-2 px-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
                      <button
                        onClick={() => toggleFavorite(product.id!)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 active:scale-90 ${favorites[product.id!] ? 'text-red-500' : 'text-neutral-600'}`}
                      >
                        <Heart
                          className='h-5 w-5'
                          fill={
                            favorites[product.id!] ? 'currentColor' : 'none'
                          }
                        />
                      </button>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className='flex flex-1 items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all hover:bg-black active:scale-95'
                      >
                        <ShoppingCart className='h-4 w-4' />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className='mt-5 space-y-2 px-2'>
                    <div className='flex flex-col'>
                      <span className='text-[10px] uppercase tracking-widest text-neutral-400 font-bold'>
                        {product.brand}
                      </span>
                      <h3 className='text-base font-semibold text-neutral-900 truncate'>
                        <Link href={`/products/${product.id}`}>
                          {product.title}
                        </Link>
                      </h3>
                    </div>

                    <p className='text-xs text-neutral-500 line-clamp-2 leading-relaxed font-light'>
                      {product.description}
                    </p>

                    <div className='flex items-baseline gap-2 pt-1'>
                      <span className='text-lg font-bold text-neutral-900'>
                        {discountedPrice} {product.price.currency}
                      </span>
                      {hasDiscount && (
                        <span className='text-sm text-neutral-400 line-through font-light'>
                          {product.price.amount} {product.price.currency}
                        </span>
                      )}
                    </div>

                    {product.stock <= 5 && product.stock > 0 && (
                      <div className='flex items-center gap-1.5 pt-1'>
                        <span className='h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse' />
                        <span className='text-[10px] font-bold text-orange-500 uppercase tracking-tighter'>
                          Limited Stock: {product.stock} left
                        </span>
                      </div>
                    )}
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
