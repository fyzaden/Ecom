'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const list: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));

      setProducts(list);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product: Product) => {
    if (!product.id) return;

    const ok = confirm('Are you sure you want to delete this product?');
    if (!ok) return;

    if (product.images?.length) {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: product.images }),
      });
    }

    await deleteDoc(doc(db, 'products', product.id));

    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleUpdate = async (product: Product) => {
    if (!product.id) return;

    await updateDoc(doc(db, 'products', product.id), {
      title: product.title,
      category: product.category,
      price: product.price,
      updatedAt: new Date(),
    });

    alert('Product updated');
  };

  if (loading) return <p className='p-6'>Loading...</p>;

  return (
    <ProtectedRoute role='Admin'>
      <div className='p-6 space-y-4'>
        <h1 className='text-2xl font-semibold'>Products</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {products.map((product, index) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>
                  <Input
                    value={product.title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setProducts((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, title: value } : p,
                        ),
                      );
                    }}
                  />
                </CardTitle>
              </CardHeader>

              <CardContent className='space-y-3'>
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className='w-full h-40 object-cover rounded'
                  />
                )}

                <Input
                  type='number'
                  value={product.price.amount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setProducts((prev) =>
                      prev.map((p, i) =>
                        i === index
                          ? {
                              ...p,
                              price: { ...p.price, amount: value },
                            }
                          : p,
                      ),
                    );
                  }}
                />

                <Input
                  value={product.category}
                  onChange={(e) => {
                    const value = e.target.value;
                    setProducts((prev) =>
                      prev.map((p, i) =>
                        i === index ? { ...p, category: value } : p,
                      ),
                    );
                  }}
                />

                <div className='flex gap-2'>
                  <Button size='sm' onClick={() => handleUpdate(product)}>
                    Update
                  </Button>

                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
