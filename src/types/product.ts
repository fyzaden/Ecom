export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  serialNumber: string;
  price: {
    amount: number;
    currency: string;
  };
  stripeProductId?: string;
  stripePriceId?: string;
  taxRate: number;
  images?: string[];
  stock: number;
  draft: boolean;
  discount?: {
    rate: number;
  };
  createdAt: any;
  updatedAt: any;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image?: string;
  stripePriceId: string;
  quantity: number;
  userId?: string;
}

export interface User {
  id: string;
  role: 'Admin' | 'Customer' | 'SuperAdmin';
  email: string;
  address?: {
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
}
