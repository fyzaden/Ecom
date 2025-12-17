'use client';

import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <nav className='"w-full border-b'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Link href='/' className='font-semibold text-lg'>
          Ecom
        </Link>

        <div className='flex items-center gap-4'>
          {!loading && !user && (
            <>
              <Link href='/login'>
                <Button variant='ghost'>Login</Button>
              </Link>
              <Link href='/signup'>
                <Button>Sign up</Button>
              </Link>
            </>
          )}

          {!loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end'>
                <div className='px-3 py-2 text-sm text-muted-foreground'>
                  {user.email}
                </div>

                {user.role === 'Admin' && (
                  <DropdownMenuItem asChild>
                    <Link href='/admin'>Admin Panel</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
