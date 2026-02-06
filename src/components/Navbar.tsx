'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ShoppingCart, User, Sun, Moon, Laptop, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';

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
    <header className='sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl transition-all duration-300'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-6'>
        <Link
          href='/'
          className='flex items-center gap-2 text-2xl font-bold tracking-tighter transition-transform hover:scale-105'
        >
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20'>
            <span className='text-primary-foreground'>C</span>
          </div>
          <h3 className='text-2xl font-bold tracking-tighter text-neutral-900'>
            Candle<span className='text-neutral-400 font-light'>Dream</span>
          </h3>
        </Link>

        <div className='hidden flex-1 items-center justify-center px-8 md:flex'>
          <div className='relative w-full max-w-md group'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary' />
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder='Search products...'
              className='h-10 w-full rounded-full border-none bg-secondary/50 pl-10 pr-4 text-sm transition-all focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/50'
            />
          </div>
        </div>

        <div className='flex items-center gap-2 sm:gap-4'>
          <nav className='hidden items-center gap-1 md:flex mr-4'>
            {['Shop', 'About'].map((item) => (
              <Link
                key={item}
                href={item === 'Shop' ? '/' : `/${item.toLowerCase()}`}
                className='relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group'
              >
                {item}
                <span className='absolute inset-x-3 bottom-1.5 h-0.5 scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100' />
              </Link>
            ))}

            {user?.role === 'Admin' && (
              <div className='flex items-center gap-1 border-l ml-2 pl-2 border-muted-foreground/20'>
                <Link
                  href='/admin/products'
                  className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary'
                >
                  Inventory
                </Link>
                <Link
                  href='/admin/products/new'
                  className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary'
                >
                  Add Product
                </Link>
              </div>
            )}
          </nav>

          <div className='flex items-center gap-1 sm:gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full hover:bg-secondary'
                >
                  <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                  <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='rounded-2xl'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href='/cart'
              className='relative p-2 hover:bg-secondary rounded-full transition-colors'
            >
              <ShoppingCart className='h-5 w-5' />
              {totalItems > 0 && (
                <span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in'>
                  {totalItems}
                </span>
              )}
            </Link>

            {!loading &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className='ml-2 outline-none transition-opacity hover:opacity-80'>
                    <Avatar className='h-9 w-9 border-2 border-primary/10 shadow-sm'>
                      <AvatarFallback className='bg-primary/5 text-primary'>
                        <User className='h-5 w-5' />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align='end'
                    className='mt-2 w-56 rounded-2xl p-2'
                  >
                    <div className='flex items-center justify-start gap-2 p-2 border-b mb-1'>
                      <div className='flex flex-col space-y-0.5 leading-none text-left'>
                        <p className='text-sm font-semibold capitalize'>
                          {user.email?.split('@')[0]}
                        </p>
                        <p className='truncate text-xs text-muted-foreground'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuItem
                      onClick={() => router.push('/profile')}
                      className='cursor-pointer'
                    >
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push('/orders')}
                      className='cursor-pointer'
                    >
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='text-red-500 focus:bg-red-50 focus:text-red-500 font-medium cursor-pointer'
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className='flex items-center gap-2 pl-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='rounded-full hover:bg-secondary'
                    onClick={() => router.push('/login')}
                  >
                    Log In
                  </Button>
                  <Button
                    size='sm'
                    className='rounded-full px-5 shadow-lg shadow-primary/10'
                    onClick={() => router.push('/signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
}
