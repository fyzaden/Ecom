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
  taxRate: number;
  images: string[];
  category: string;
  stock: number;
  draft: boolean;
  discount?: {
    rate: number;
  };
  craetedAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  userId?: string;
}

export interface User {
  id: string;
  role: 'Admin ' | 'Customer' | 'SuperAdmin';
  email: string;
  address?: {
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
}
