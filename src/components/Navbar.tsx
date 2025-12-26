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
import { ShoppingCart, User, Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { setTheme } = useTheme();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className='border-b'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Link href='/' className='font-semibold text-lg tracking-tight'>
          Ecom
        </Link>

        <nav className='hidden md:flex gap-6 text-sm'>
          <Link href='/' className='hover:opacity-70'>
            Shop
          </Link>
          <Link href='/' className='hover:opacity-70'>
            Collections
          </Link>
          <Link href='/' className='hover:opacity-70'>
            About
          </Link>

          {user?.role === 'Admin' && (
            <Link
              href='/admin'
              className='text-primary font-medium hover:opacity-70'
            >
              Admin
            </Link>
          )}
        </nav>

        <div className='flex items-center gap-4'>
          <Link href='/cart' className='relative'>
            <ShoppingCart className='h-5 w-5' />
            <span className='absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white'>
              0
            </span>
          </Link>

          {!loading && !user && (
            <div className='flex gap-2'>
              <Button variant='ghost' onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button onClick={() => router.push('/signup')}>Sign up</Button>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className='mr-2 h-4 w-4' /> Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className='mr-2 h-4 w-4' /> Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Laptop className='mr-2 h-4 w-4' /> System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && !user && (
            <div className='flex gap-2'>
              <Button variant='ghost' onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button onClick={() => router.push('/signup')}>Sign up</Button>
            </div>
          )}

          {!loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarFallback>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end'>
                <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
