import { Card, CardContent } from '@/components/ui/card';

export default function ProductGridSkeleton() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <div className='mb-8 h-8 w-48 rounded bg-slate-200 animate-pulse' />

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='rounded-xl border border-slate-100 p-4 space-y-4 shadow-sm'
          >
            <div className='h-48 w-full rounded-lg bg-slate-200 animate-pulse' />

            <div className='space-y-2'>
              <div className='h-4 w-3/4 rounded bg-slate-200 animate-pulse' />
              <div className='h-4 w-1/2 rounded bg-slate-200 animate-pulse' />
            </div>

            <div className='h-10 w-full rounded bg-slate-100 animate-pulse pt-4' />
          </div>
        ))}
      </div>
    </section>
  );
}
