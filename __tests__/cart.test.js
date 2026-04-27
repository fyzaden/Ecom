import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/context/CartContext';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CartContext Critical Logic Tests', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const mockProduct = {
    id: 'prod_1',
    title: 'Test Item',
    price: 100,
    stripeProductId: 'st_1',
    stripePriceId: 'sp_1',
  };

  test('should increment quantity when same item is added twice', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items[0].quantity).toBe(2);
  });

  test('should remove item when quantity is decreased below 1 (Critical Case)', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.decrease('prod_1');
    });

    expect(result.current.items).toHaveLength(0);
  });
});
