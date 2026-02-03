import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductGridClient from './ProductGridClient';

export default async function ProductGridServer() {
  const q = query(collection(db, 'products'), where('draft', '==', false));
  await new Promise((r) => setTimeout(r, 2000));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      images: data.images ?? [],
      description: data.description,
      draft: data.draft,
      stock: data.stock,
      price: {
        amount: data.price.amount,
        currency: data.price.currency,
      },
    };
  });

  return <ProductGridClient products={products} />;
}
