'use client';

import { Suspense } from 'react';
import Link from 'next/link';

function NotFoundContent() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Not found the page </h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link href='/'>Return to Home</Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
