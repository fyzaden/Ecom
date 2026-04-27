'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price.amount,
      image: product.images?.[0],
      quantity: 1,
      stripePriceId: product.stripePriceId || '',
    });
  };

  return (
    <Button onClick={handleAdd} className='w-full'>
      Add to Cart
    </Button>
  );
}
