// Product type
export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  imageUrl?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'customer';
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Order {
  id: string;
  userId: string;
  paymentMethod?: string;
  products: OrderItem[];
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface OrderItem {
  id: string;              // product id
  name: string;
  price: number;
  quantity: number;
  stock?: number;
  category?: string;
  status?: string;
}


// Category type
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// PaymentMethod type
export interface PaymentMethod {
  id: string;
  name: string;
  icon: string; // Emoji or icon as string (e.g., '💳', '🏦')
  bgColor: string; // Tailwind color class like 'bg-white'
  borderColor: string; // Tailwind border color class like 'border-gray-300'
}
