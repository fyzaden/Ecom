import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Candle Dream',
  description: 'Mini E-commerce app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider>
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>

              <main className='min-h-screen'>{children}</main>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>

        <Footer />
      </body>
    </html>
  );
}
