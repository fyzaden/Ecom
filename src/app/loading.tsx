import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <h2 className='mb-8 text-2xl font-semibold'>Featured Products</h2>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='overflow-hidden border-none shadow-none'>
            <CardContent className='p-0 space-y-4'>
              <div className='h-44 rounded-md bg-neutral-200' />
              <div className='h-4 w-3/4 rounded bg-neutral-200' />
              <div className='h-3 w-1/2 rounded bg-neutral-200' />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
