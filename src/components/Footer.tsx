import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-neutral-50 border-t border-neutral-200 mt-20'>
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold tracking-tighter text-neutral-900'>
              E<span className='text-neutral-400 font-light'>COM</span>
            </h3>
            <p className='text-sm text-neutral-500 leading-relaxed italic'>
              "Handcrafted premium candles designed to bring warmth and peace to
              your home. Every scent tells a story."
            </p>
            <div className='flex gap-5'>
              <Link
                href='#'
                className='text-neutral-400 hover:text-black transition-all hover:scale-110'
              >
                <Instagram className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-neutral-400 hover:text-black transition-all hover:scale-110'
              >
                <Facebook className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-neutral-400 hover:text-black transition-all hover:scale-110'
              >
                <Twitter className='h-5 w-5' />
              </Link>
            </div>
          </div>

          <div>
            <h4 className='font-bold text-xs uppercase tracking-widest text-neutral-900 mb-6'>
              Shop
            </h4>
            <ul className='space-y-3 text-sm text-neutral-600'>
              <li>
                <Link href='/' className='hover:text-black transition-colors'>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-black transition-colors'
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link href='/' className='hover:text-black transition-colors'>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='hover:text-black transition-colors'
                >
                  Common Questions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-xs uppercase tracking-widest text-neutral-900 mb-6'>
              Contact Us
            </h4>
            <ul className='space-y-4 text-sm text-neutral-600'>
              <li className='flex items-center gap-3'>
                <Mail className='h-4 w-4 text-neutral-400' />
                <span>hello@ecomstudio.com</span>
              </li>
              <li className='flex items-center gap-3'>
                <MapPin className='h-4 w-4 text-neutral-400' />
                <span>Istanbul, Turkiye</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='h-4 w-4 text-neutral-400' />
                <span>+90 (534) 123 3210</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-xs uppercase tracking-widest text-neutral-900 mb-6'>
              Join Our Glow
            </h4>
            <p className='text-sm text-neutral-500 mb-4'>
              Subscribe for exclusive offers and new scent drops.
            </p>
            <div className='flex flex-col gap-3'>
              <input
                type='email'
                placeholder='your@email.com'
                className='px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all'
              />
              <button className='bg-black text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/10'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className='mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6'>
          <p className='text-[10px] uppercase tracking-widest text-neutral-400'>
            © {new Date().getFullYear()} Ecom Studio. Handcrafted in Turkiye.
          </p>
          <div className='flex gap-8 text-[10px] uppercase tracking-widest text-neutral-400 font-medium'>
            <Link href='#' className='hover:text-black transition-colors'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-black transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
