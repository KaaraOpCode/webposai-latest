'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/app/types';
import { PaymentOptions } from '@/components/Payment/PaymentOptions';
import { MarketHeader } from '@/components/Market/MarketHeader';
import { ProductList } from '@/components/Market/ProductList';
import { Cart, CartItem } from '@/components/Market/Cart';

const availableProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 29.99, stock: 50, category: 'Electronics', status: 'active' },
  { id: '2', name: 'Cotton T-Shirt', price: 19.99, stock: 30, category: 'Clothing', status: 'active' },
  { id: '3', name: 'Bluetooth Speaker', price: 59.99, stock: 25, category: 'Electronics', status: 'active' },
  { id: '4', name: 'Notebook', price: 4.99, stock: 100, category: 'Stationery', status: 'active' },
  { id: '5', name: 'Organic Apple', price: 1.5, stock: 80, category: 'Groceries', status: 'active' },
];

const categories = ['Clothing', 'Electronics', 'Groceries', 'Stationery', 'Toys'];

export default function MarketPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { ...product, quantity: 1, cartIndex: Date.now() }];
    });
  };

  const updateQuantity = (cartIndex: number, qty: number) => {
    if (qty <= 0) return removeFromCart(cartIndex);
    setCartItems(prev => prev.map(i => (i.cartIndex === cartIndex ? { ...i, quantity: qty } : i)));
  };

  const removeFromCart = (cartIndex: number) => {
    setCartItems(prev => prev.filter(i => i.cartIndex !== cartIndex));
  };

  // Calculate pricing details
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = 0.1; // 10% discount
  const discountAmount = subtotal * discountRate;
  const vatRate = 0.15; // 15% VAT
  const vatAmount = (subtotal - discountAmount) * vatRate;
  const totalAmount = subtotal - discountAmount + vatAmount;

  const filteredProducts = availableProducts.filter(p => {
    const matchText = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
    const matchCat = !filterCategory || p.category === filterCategory;
    return matchText && matchCat;
  });

  useEffect(() => {
    if (paymentCompleted) {
      const timer = setTimeout(() => setPaymentCompleted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentCompleted]);

  const handleReceiptOption = (option: string) => {
    // Close receipt modal on any option click
    setShowReceiptModal(false);
    // You can add your logic here for print/email/qr
    console.log(`Receipt option selected: ${option}`);
  };

  return (
    <>
      <main className="h-screen flex flex-col bg-gray-50">
        <MarketHeader />

        <div className="flex-1 grid grid-cols-2 gap-4 p-4 min-h-0">
          {/* Products Panel */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-3">Product Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Search products..."
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
            <div className="flex-1 p-4 overflow-y-auto">
              <ProductList products={filteredProducts} onAddToCart={addToCart} />
            </div>
          </div>

          {/* Cart Panel */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Current Order</h2>
            </div>
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeFromCart}
              subtotal={subtotal}
              discountAmount={discountAmount}
              vatAmount={vatAmount}
              totalAmount={totalAmount}
              onProcessPayment={() => setShowPaymentOptions(true)}
            />
          </div>
        </div>
      </main>

      {/* Payment Dialog */}
      {showPaymentOptions && (
        <PaymentOptions
          totalAmount={totalAmount}
          onCancel={() => setShowPaymentOptions(false)}
          onPaymentComplete={() => {
            setCartItems([]);
            setShowPaymentOptions(false);
            setShowReceiptModal(true);
            setPaymentCompleted(true);
          }}
        />
      )}

      {/* Receipt Options Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">How would you like to receive your receipt?</h2>
            <div className="grid gap-3">
              <button
                onClick={() => handleReceiptOption('print')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Print Receipt
              </button>
              <button
                onClick={() => handleReceiptOption('email')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Email Receipt
              </button>
              <button
                onClick={() => handleReceiptOption('qr')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Generate QR Code
              </button>
              <button
                onClick={() => handleReceiptOption('none')}
                className="text-gray-600 underline hover:text-gray-800"
              >
                No Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
