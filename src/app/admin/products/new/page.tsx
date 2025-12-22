'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    setImages((prev) => [...prev, data.url]);
  };

  const submit = async () => {
    await addDoc(collection(db, 'products'), {
      title,
      price: { amount: Number(price), currency: 'EUR' },
      images,
      category: 'general',
      stock: 10,
      draft: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    alert('Product created');
  };

  return (
    <ProtectedRoute role='Admin'>
      <div className='p-6 space-y-4 max-w-md'>
        <Input placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
        <Input
          type='number'
          placeholder='Price'
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type='file'
          onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
        />

        <div className='flex gap-2'>
          {images.map((img) => (
            <img key={img} src={img} className='w-20 h-20 rounded' />
          ))}
        </div>

        <Button onClick={submit}>Create</Button>
      </div>
    </ProtectedRoute>
  );
}
