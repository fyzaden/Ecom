import { Card, CardContent } from '@/components/ui/card';

export default function ProductGrid() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <h2 className='mb-8 text-2xl font-semibold'>Featured Products</h2>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className='p-4'>
              <div className='h-40 rounded-md bg-gray-100' />
              <h3 className='mt-4 font-medium'>Product Name</h3>
              <p className='text-sm text-muted-foreground'>€99.00</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
