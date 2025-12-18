export default function Hero() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-20'>
      <div className='grid gap-10 md:grid-cols-2 items-center'>
        <div>
          <h1 className='text-4xl font-bold leading-tight md:text-5xl'>
            Discover Your <br /> New Style
          </h1>
          <p className='mt-4 text-muted-foreground'>
            Premium products crafted for modern lifestyle.
          </p>

          <button className='mt-6 rounded-md bg-black px-6 py-3 text-white'>
            Shop Now
          </button>
        </div>
        <div className='h-[400px] rounded-xl bg-gray-100'></div>
      </div>
    </section>
  );
}
