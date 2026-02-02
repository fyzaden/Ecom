'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import AddToCartButton from '@/components/AddToCartButton';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const ref = doc(db, 'products', id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProduct({
          id: snap.id,
          ...(snap.data() as Omit<Product, 'id'>),
        });
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className='p-6'>Loading...</p>;
  if (!product) return <p className='p-6'>Product not found</p>;

  return (
    <section className='mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-10'>
      <img
        src={product.images?.[0]}
        alt={product.title}
        className='rounded-lg'
      />

      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold'>{product.title}</h1>
        <p className='text-muted-foreground'>{product.description}</p>

        <p className='text-xl font-bold'>
          {product.price.amount} {product.price.currency}
        </p>

        <AddToCartButton product={product} />
      </div>
    </section>
  );
}
