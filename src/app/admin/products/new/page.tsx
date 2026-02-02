'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadImages = async (files: FileList) => {
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      uploaded.push(data.url);
    }

    setImages((prev) => [...prev, ...uploaded]);
  };

  const submit = async () => {
    if (!title || !price) {
      alert('Title and price required');
      return;
    }

    setLoading(true);

    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        images,
      }),
    });

    setLoading(false);

    setTitle('');
    setDescription('');
    setPrice('');
    setImages([]);

    alert('Product created with Stripe');
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
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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

        <Button onClick={submit} disabled={loading}>
          Create Product
        </Button>
      </div>
    </ProtectedRoute>
  );
}
