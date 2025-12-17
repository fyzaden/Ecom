'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addDoc(collection(db, 'products'), {
      title,
      price: {
        amount: Number(price),
        currency: 'EUR',
      },
      draft: false,
      stock: 10,
      category: 'general',
      taxRate: 18,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    alert('Product created');
    setTitle('');
    setPrice('');
  };

  return (
    <ProtectedRoute role='Admin'>
      <div className='flex justify-center p-6'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <Button type='submit' className='w-full'>
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
