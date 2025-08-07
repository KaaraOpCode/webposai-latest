
// components/Market/ProductCard.tsx
'use client';
import { Product } from '@/app/types';
import Button from '@/components/ui/Button';

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  return (
    <div
      className="border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow bg-gray-50 cursor-pointer"
      onClick={onAdd}
    >
      <h3 className="font-semibold text-gray-800 mb-1 text-sm">{product.name}</h3>
      <div className="text-xs text-gray-600 mb-2">
        <p>{product.category} • Stock: {product.stock}</p>
        <p className="text-lg font-medium text-gray-800">LSL {product.price.toFixed(2)}</p>
      </div>
      <Button className="w-full px-3 py-1 text-sm">Add to Till</Button>
    </div>
  );
}
