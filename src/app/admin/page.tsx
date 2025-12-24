'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStock, setLowStock] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, 'products'));

      setTotalProducts(snapshot.size);

      const hasLowStock = snapshot.docs.some((doc) => doc.data().stock < 5);

      setLowStock(hasLowStock);
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute role='Admin'>
      <div className='p-6 space-y-6'>
        <div>
          <h1 className='text-3xl font-semibold'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage your store products and content
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>{totalProducts}</p>
              <p className='text-sm text-muted-foreground'>Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>
                {lowStock ? 'Low stock ⚠️' : 'Healthy ✅'}
              </p>
              <p className='text-sm text-muted-foreground'>
                {lowStock
                  ? 'Some products are running low'
                  : 'No low-stock alerts'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>TL —</p>
              <p className='text-sm text-muted-foreground'>
                Stripe coming soon
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <p className='text-sm text-muted-foreground'>
                Create a new product and upload images
              </p>
              <Button
                className='w-full'
                onClick={() => router.push('/admin/products/new')}
              >
                Create Product
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <p className='text-sm text-muted-foreground'>
                Edit or delete existing products
              </p>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => router.push('/admin/products')}
              >
                View Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
