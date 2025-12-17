'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p className='p-6'>Loading...</p>;

  return (
    <div className='p-6 space-y-4'>
      {user ? (
        <>
          <p>
            Logged in as <b>{user.email}</b> ({user.role})
          </p>

          {user.role === 'Admin' && (
            <Link href='/admin'>
              <Button>Go to Admin</Button>
            </Link>
          )}
        </>
      ) : (
        <>
          <p>Not logged in</p>

          <div className='flex gap-4'>
            <Link href='/login'>
              <Button variant='outline'>Login</Button>
            </Link>

            <Link href='/signup'>
              <Button>Sign up</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
