'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'Admin';
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }

    if (!loading && user && role && user.role !== role) {
      router.push('/');
    }
  }, [user, loading, role, router]);

  if (loading || !user) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    );
  }

  return <>{children}</>;
}
