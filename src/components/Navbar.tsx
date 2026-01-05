'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
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
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { setTheme } = useTheme();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  const { items } = useCart();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams();
    if (value) params.set('q', value);
    router.push(`/?${params.toString()}`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Link
          href='/'
          className='flex items-center gap-2 font-semibold text-lg'
        >
          <span className='rounded-md bg-primary px-2 py-1 text-primary-foreground'>
            E
          </span>
          Ecom
        </Link>
        <div className='hidden md:flex items-center relative'>
          <Search className='absolute left-3 h-4 w-4 text-muted-foreground' />
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder='Search products...'
            className='pl-9 w-56'
          />
        </div>

        <nav className='hidden md:flex gap-6 text-sm'>
          <Link href='/admin' className='hover:text-primary'>
            Dashboard
          </Link>
          <Link href='/' className='hover:text-primary transition'>
            Shop
          </Link>

          <Link href='/' className='hover:text-primary transition'>
            About
          </Link>

          {user?.role === 'Admin' && (
            <>
              <Link href='/admin/products' className='hover:text-primary'>
                Products
              </Link>
              <Link href='/admin/products/new' className='hover:text-primary'>
                Add Product
              </Link>
            </>
          )}
        </nav>

        <div className='flex items-center gap-3'>
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

          <Link href='/cart' className='relative'>
            <ShoppingCart className='h-5 w-5' />

            {totalItems > 0 && (
              <span className='absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                {totalItems}
              </span>
            )}
          </Link>

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
