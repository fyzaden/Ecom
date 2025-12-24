'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Package, AlertTriangle, PlusCircle, LayoutGrid } from 'lucide-react';
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
      <div className='mx-auto max-w-7xl p-6 space-y-10'>
        <div>
          <h1 className='text-4xl tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground mt-2'>
            Manage your products, inventory and content
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='hover:shadow-lg transition'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Total Products</CardTitle>
              <Package className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold'>{totalProducts}</p>
              <p className='text-sm text-muted-foreground'>Active products</p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Stock Status</CardTitle>
              <AlertTriangle
                className={`h-5 w-5 ${
                  lowStock ? 'text-red-500' : 'text-green-500'
                }`}
              />
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>
                {lowStock ? 'Low stock ' : 'Healthy '}
              </p>
              <p className='text-sm text-muted-foreground'>
                {lowStock ? 'Some products are running low' : 'No alerts'}
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Revenue</CardTitle>
              <LayoutGrid className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-semibold'>₺ —</p>
              <p className='text-sm text-muted-foreground'>
                Stripe integration coming soon
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='bg-gradient-to-br from-black to-neutral-800 text-white hover:shadow-lg transition'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <PlusCircle className='h-5 w-5' />
                Create Product
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm opacity-80'>
                Add a new product with images and pricing
              </p>
              <Button
                className='w-full bg-white text-black hover:bg-neutral-200'
                onClick={() => router.push('/admin/products/new')}
              >
                New Product
              </Button>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <LayoutGrid className='h-5 w-5' />
                Manage Products
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm text-muted-foreground'>
                Edit, update and remove existing products
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
