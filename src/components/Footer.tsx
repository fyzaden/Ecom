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
    <footer className='bg-slate-50 border-t border-slate-200 mt-20'>
      <div className='mx-auto max-w-7xl px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-slate-900 tracking-tight italic'>
              CANDLE<span className='text-slate-500 font-light'>SHOP</span>
            </h3>
            <p className='text-sm text-slate-600 leading-relaxed'>
              Handcrafted premium candles designed to bring warmth and peace to
              your home. Every scent tells a story.
            </p>
            <div className='flex gap-4'>
              <Link
                href='#'
                className='text-slate-400 hover:text-slate-900 transition-colors'
              >
                <Instagram className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-slate-400 hover:text-slate-900 transition-colors'
              >
                <Facebook className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-slate-400 hover:text-slate-900 transition-colors'
              >
                <Twitter className='h-5 w-5' />
              </Link>
            </div>
          </div>

          <div>
            <h4 className='font-semibold text-slate-900 mb-4'>Quick Links</h4>
            <ul className='space-y-2 text-sm text-slate-600'>
              <li>
                <Link href='/' className='hover:text-slate-900'>
                  Shop All
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:text-slate-900'>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href='/shipping' className='hover:text-slate-900'>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href='/faq' className='hover:text-slate-900'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-slate-900 mb-4'>Contact Us</h4>
            <ul className='space-y-3 text-sm text-slate-600'>
              <li className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-slate-400' />
                hello@candleshop.com
              </li>
              <li className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 text-slate-400' />
                Istanbul/Turkiye
              </li>
              <li className='flex items-center gap-2'>
                <Phone className='h-4 w-4 text-slate-400' />
                +90 (534) 123-3210
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-slate-900 mb-4'>Join Our Glow</h4>
            <p className='text-sm text-slate-600 mb-4'>
              Subscribe for exclusive offers and scents.
            </p>
            <div className='flex flex-col gap-2'>
              <input
                type='email'
                placeholder='Your email'
                className='px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400'
              />
              <button className='bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-slate-500'>
            © {new Date().getFullYear()} CandleShop. All rights reserved.
          </p>
          <div className='flex gap-6 text-xs text-slate-400'>
            <Link href='#'>Privacy Policy</Link>
            <Link href='#'>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
