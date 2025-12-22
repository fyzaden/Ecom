'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <ProtectedRoute role='Admin'>
      <div className='p-6 space-y-8'>
        <div>
          <h1 className='text-3xl font-semibold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage your store products and content
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm font-medium'>
                Total Products
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>12</div>
              <p className='text-xs text-muted-foreground'>Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm font-medium'>
                Stock Status
              </CardTitle>
              <LayoutDashboard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>Healthy</div>
              <p className='text-xs text-muted-foreground'>
                No low-stock alerts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm font-medium'>Revenue</CardTitle>
              <span className='text-muted-foreground'>€</span>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>—</div>
              <p className='text-xs text-muted-foreground'>
                Stripe coming soon
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Create a new product and upload images
              </p>
              <Link href='/admin/products/new'>
                <Button className='w-full'>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  Create Product
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Edit or delete existing products
              </p>
              <Link href='/admin/products'>
                <Button variant='outline' className='w-full'>
                  View Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
