// 'use client';

// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Product } from '@/types/product';
// import { useCart } from '@/context/CartContext';
// import { Button } from '@/components/ui/button';

// export default function ProductDetail({ params }: { params: { id: string } }) {
//   const [product, setProduct] = useState<Product | null>(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const ref = doc(db, 'products', params.id);
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         setProduct({
//           id: snap.id,
//           ...(snap.data() as Omit<Product, 'id'>),
//         });
//       }
//     };

//     fetchProduct();
//   }, [params.id]);

//   if (!product) return <p className='p-6'>Loading...</p>;

//   return (
//     <section className='mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-10'>
//       <img
//         src={product.images?.[0]}
//         alt={product.title}
//         className='rounded-lg'
//       />

//       <div className='space-y-4'>
//         <h1 className='text-2xl font-semibold'>{product.title}</h1>
//         <p className='text-muted-foreground'>{product.description}</p>

//         <p className='text-xl font-bold'>
//           {product.price.amount} {product.price.currency}
//         </p>

//         <Button
//           onClick={() =>
//             addToCart({
//               id: product.id,
//               title: product.title,
//               price: product.price.amount,
//               image: product.images?.[0],
//               quantity: 1,
//             })
//           }
//         >
//           Add to Cart
//         </Button>
//       </div>
//     </section>
//   );
// }
