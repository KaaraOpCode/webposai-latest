'use client';
import React, { useState } from 'react';
import { Product } from '@/app/types';
import { Table } from '@/components/Market/Table';
import { MarketHeader } from '@/components/Market/MarketHeader';

const availableProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 29.99, stock: 50, category: 'Electronics', status: 'active' },
  { id: '2', name: 'Cotton T-Shirt', price: 19.99, stock: 30, category: 'Clothing', status: 'active' },
  { id: '3', name: 'Bluetooth Speaker', price: 59.99, stock: 25, category: 'Electronics', status: 'active' },
  { id: '4', name: 'Notebook', price: 4.99, stock: 100, category: 'Stationery', status: 'active' },
  { id: '5', name: 'Organic Apple', price: 1.5, stock: 80, category: 'Groceries', status: 'active' },
];

const categories = ['Clothing', 'Electronics', 'Groceries', 'Stationery'];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Filter products based on search text and category filter
  const filteredProducts = availableProducts.filter(p => {
    const matchText =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
    const matchCat = !filterCategory || p.category === filterCategory;
    return matchText && matchCat;
  });

  // Order Insights Calculations
  const totalItems = filteredProducts.reduce((sum, product) => sum + product.stock, 0);

  const averagePrice =
    filteredProducts.length > 0
      ? (filteredProducts.reduce((sum, product) => sum + product.price, 0) / filteredProducts.length).toFixed(2)
      : '0.00';

  const categoryCounts = filteredProducts.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.stock;
    return acc;
  }, {});

  return (
    <main className="h-screen flex flex-col bg-gray-50">
      <MarketHeader />
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 min-h-0">
        {/* Left column: Order Records with Search & Filter */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col min-h-0">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Order Records</h2>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <input
                type="text"
                placeholder="Search orders by name or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="p-2 border rounded text-sm"
              />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <Table products={filteredProducts} />
          </div>
        </div>

        {/* Right column: Order Insights */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col min-h-0 p-4">
          <h2 className="text-xl font-semibold mb-4">Order Insights</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Total Stock Items Available:</strong> {totalItems}</p>
            <p><strong>Average Price:</strong> LSL {averagePrice}</p>
            <div>
              <strong>Category Breakdown (stock count):</strong>
              <ul className="list-disc list-inside ml-5">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <li key={cat}>
                    {cat}: {count}
                  </li>
                ))}
                {filteredProducts.length === 0 && <li>No products found</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
