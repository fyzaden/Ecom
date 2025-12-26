import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Ecom',
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
          <ThemeProvider>
            <Navbar />
            <main className='min-h-screen'>{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
