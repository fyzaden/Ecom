'use client';

import { useCart } from '@/context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const ref = doc(db, 'products', params.id);
  const snap = await getDoc(ref);
  const { addToCart } = useCart();

  if (!snap.exists()) {
    return <div className='p-10'>Product not found</div>;
  }

  const product = snap.data();

  return (
    <div className='mx-auto max-w-4xl p-10 grid md:grid-cols-2 gap-10'>
      <img
        src={product.images?.[0]}
        className='rounded-lg'
        alt={product.title}
      />

      <div>
        <h1 className='text-2xl font-semibold'>{product.title}</h1>
        <p className='mt-2 text-muted-foreground'>
          {product.price.amount} {product.price.currency}
        </p>
        <button
          className='mt-6 px-6 py-2 bg-primary text-white rounded'
          onClick={() =>
            addToCart({
              id: params.id,
              title: product.title,
              price: product.price.amount,
              image: product.images?.[0],
              quantity: 1,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
