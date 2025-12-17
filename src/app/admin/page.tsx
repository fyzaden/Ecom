'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <ProtectedRoute role='Admin'>
      <div className='p-6 space-y-4'>
        <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>

        <Link href='/admin/products/new'>
          <Button>Create New Product</Button>
        </Link>
      </div>
    </ProtectedRoute>
  );
}
