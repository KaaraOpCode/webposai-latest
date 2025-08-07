// components/Market/CartItemCard.tsx
'use client';
import { CartItem } from './Cart';

export function CartItemCard({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button onClick={onDecrement} className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold">-</button>
          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button onClick={onIncrement} className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold">+</button>
        </div>
        <div className="flex-1 mx-4">
          <span className="text-gray-900 text-sm font-medium">{item.name}</span>
        </div>
        <button onClick={onRemove} className="text-red-600 hover:text-red-800 text-xs px-2 py-1">Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border p-2 rounded-lg text-sm flex justify-between">
          <span className="text-gray-600">Unit Price</span>
          <span>LSL {item.price.toFixed(2)}</span>
        </div>
        <div className="border p-2 rounded-lg text-sm flex justify-between">
          <span className="text-gray-600">Line Total</span>
          <span>LSL {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
