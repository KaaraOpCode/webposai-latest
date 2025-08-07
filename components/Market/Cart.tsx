'use client';

import { CartItemCard } from './CartItemCard';
import Button from '@/components/ui/Button';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  quantity: number;
  cartIndex: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  totalAmount: number;
  onProcessPayment: () => void;
}

export function Cart({
  cartItems,
  updateQuantity,
  removeItem,
  subtotal,
  discountAmount,
  vatAmount,
  totalAmount,
  onProcessPayment,
}: CartProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <svg
          className="w-16 h-16 mb-4 text-yellow-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18M9 21V9m6 12V5m3 0H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2z"
          />
        </svg>
        <p className="text-gray-600 text-lg font-medium">
          No items in the till yet. Awaiting your next order!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {cartItems.map(item => (
          <CartItemCard
            key={item.cartIndex}
            item={item}
            onIncrement={() => updateQuantity(item.cartIndex, item.quantity + 1)}
            onDecrement={() => updateQuantity(item.cartIndex, item.quantity - 1)}
            onRemove={() => removeItem(item.cartIndex)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>LSL {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount:</span>
          <span>- LSL {discountAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>VAT (15%):</span>
          <span>+ LSL {vatAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
          <span>Grand Total:</span>
          <span>LSL {totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <span>Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>

        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={cartItems.length === 0}
          onClick={onProcessPayment}
        >
          Process Payment
        </Button>
      </div>
    </>
  );
}
