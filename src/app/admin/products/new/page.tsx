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
  const [uploading, setUploading] = useState(false);

  const uploadImages = async (files: FileList) => {
    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const submit = async () => {
    if (!title || !price) {
      alert('Title and Price are required');
      return;
    }

    await addDoc(collection(db, 'products'), {
      title,
      price: { amount: Number(price), currency: '₺' },
      images,
      category: 'candle',
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
        <h1 className='text-2xl font-semibold'>Add New Product</h1>

        <Input
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <Input
          type='number'
          placeholder='Price'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <Input
          type='file'
          multiple
          accept='image/*'
          onChange={(e) => e.target.files && uploadImages(e.target.files)}
        />
        {uploading && <p className='text-sm'>Uploading images...</p>}

        <div className='flex gap-2'>
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt='product'
              className='w-20 h-20 object-cover rounded border'
            />
          ))}
        </div>

        <Button onClick={submit} disabled={uploading}>
          Create Product
        </Button>
      </div>
    </ProtectedRoute>
  );
}
