'use client';

import React, { useState } from 'react';
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Coffee', price: 3.5 },
  { id: 2, name: 'Sandwich', price: 5.0 },
  { id: 3, name: 'Salad', price: 4.25 },
  { id: 4, name: 'Juice', price: 2.75 },
];

export default function DemoPOSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutMsg, setCheckoutMsg] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      return found
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
    setCheckoutMsg(null);
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    setCart([]);
    setCheckoutMsg('✅ Checkout successful! Thank you for your purchase.');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-10">
          Point of Sale (POS) Demo
        </h1>

        {/* Products Section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Available Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md transition p-6 flex flex-col items-center text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-300 font-medium mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Section */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={checkout}
                disabled={cart.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </>
          )}
        </section>

        {checkoutMsg && (
          <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 p-4 rounded-lg text-center font-semibold">
            {checkoutMsg}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
