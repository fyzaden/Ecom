'use client';

export default function CheckoutPage() {
  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={() => alert('clicked')}
        style={{ padding: 20, background: 'red', color: 'white' }}
      >
        TEST BUTTON
      </button>
    </div>
  );
}

// 'use client';

// import { useCart } from '@/context/CartContext';
// import { Button } from '@/components/ui/button';

// export default function CheckoutPage() {
//   const { items } = useCart();
//   const handleCheckout = async () => {
//     console.log('CHECKOUT CLICKED');

//     console.log('CART ITEMS:', items);

//     const res = await fetch('/api/checkout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         items: items.map((item) => ({
//           priceId: item.stripePriceId,
//           quantity: item.quantity,
//         })),
//       }),
//     });

//     const data = await res.json();
//     console.log('CHECKOUT RESPONSE:', data);

//     if (data.url) {
//       window.location.href = data.url;
//     }
//   };

//   return (
//     <div className='max-w-2xl mx-auto p-8'>
//       <h1 className='text-2xl font-semibold mb-6'>Checkout</h1>

//       <Button
//         className='w-full'
//         onClick={() => alert('clicked')}
//         disabled={items.length === 0}
//       >
//         Pay with Stripe
//       </Button>
//     </div>
//   );
// }
