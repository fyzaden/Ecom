import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartPage from '@/app/cart/page';
import { useCart } from '@/context/CartContext';

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CartPage Calculation & UI Tests', () => {
  test('should calculate total price correctly for multiple items', () => {
    const itemsWithPrices = [
      { id: '1', title: 'Candle', price: 1000, quantity: 1 },
      { id: '2', title: 'Wax', price: 50, quantity: 2 },
    ];

    useCart.mockReturnValue({
      items: itemsWithPrices,
      increase: jest.fn(),
      decrease: jest.fn(),
      remove: jest.fn(),
    });

    render(<CartPage />);

    const totalElement = screen.getByText(/1,100/i);
    expect(totalElement).toBeInTheDocument();
  });

  test('should display empty cart message when items array is empty', () => {
    useCart.mockReturnValue({
      items: [],
    });

    render(<CartPage />);

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  test('should call checkout API with correct data when button is clicked', async () => {
    const items = [
      {
        id: '1',
        title: 'Product A',
        price: 100,
        quantity: 1,
        stripePriceId: 'sp_1',
      },
    ];
    useCart.mockReturnValue({
      items,
      increase: jest.fn(),
      decrease: jest.fn(),
      remove: jest.fn(),
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ url: 'https://stripe.com/checkout' }),
      }),
    );

    render(<CartPage />);

    const checkoutBtn = screen.getByRole('button', { name: /checkout/i });
    fireEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/checkout',
        expect.any(Object),
      );
    });
  });
});
