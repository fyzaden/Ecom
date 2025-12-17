'use client';

import { useAuth } from '@/context/AuthContext';
export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <div className='p-6'>
      {user ? (
        <p>
          Logged in as {user.email} ({user.role})
        </p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
