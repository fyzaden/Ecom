import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import ProductGridClient from './ProductGridClient';

export default async function ProductGridServer() {
  const q = query(collection(db, 'products'), where('draft', '==', false));
  const snapshot = await getDocs(q);

  const products: Product[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, 'id'>),
  }));

  return <ProductGridClient products={products} />;
}
