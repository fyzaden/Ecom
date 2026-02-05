import { render, screen } from '@testing-library/react';
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
      { id: '1', title: 'Laptop', price: 1000, quantity: 1 },
      { id: '2', title: 'Mouse', price: 50, quantity: 2 },
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
});
