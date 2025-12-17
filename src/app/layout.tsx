import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

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
    <html lang='en'>
      <body>
        <AuthProvider>
          <Navbar />
          <main className='min-h-screen'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
