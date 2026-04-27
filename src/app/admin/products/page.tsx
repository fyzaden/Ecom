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

  const uploadImage = async (file: File, index: number) => {
    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: fd,
    });

    const data = await res.json();
    setProducts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, images: [...(p.images || []), data.url] } : p,
      ),
    );

    await updateDoc(doc(db, 'products', products[index].id!), {
      images: [...(products[index].images || []), data.url],
      updatedAt: new Date(),
    });
  };

  const removeImage = async (productIndex: number, imageUrl: string) => {
    const product = products[productIndex];

    await fetch('/api/delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: [imageUrl] }),
    });

    const updatedImages = (product.images ?? []).filter(
      (img) => img !== imageUrl,
    );

    setProducts((prev) =>
      prev.map((p, i) =>
        i === productIndex ? { ...p, images: updatedImages } : p,
      ),
    );

    await updateDoc(doc(db, 'products', product.id!), {
      images: updatedImages,
      updatedAt: new Date(),
    });
  };

  const handleDelete = async (product: Product) => {
    if (!product.id) return;

    if (!confirm('Delete product?')) return;

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
      description: product.description,
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
                <div className='flex flex-wrap gap-2'>
                  {product.images?.map((img) => (
                    <div key={img} className='relative'>
                      <img
                        src={img}
                        className='w-20 h-20 object-cover rounded'
                      />
                      <button
                        onClick={() => removeImage(index, img)}
                        className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <Input
                  type='file'
                  multiple
                  onChange={(e) => {
                    if (!e.target.files) return;
                    Array.from(e.target.files).forEach(uploadImage);
                  }}
                />

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
