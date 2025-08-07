// components/Market/ProductList.tsx
'use client';
import { Product } from '@/app/types';
import { ProductCard } from './ProductCard';

export function ProductList({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={() => onAddToCart(product)} />
      ))}
    </div>
  );
}