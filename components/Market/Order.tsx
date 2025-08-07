'use client';

import { useState, useEffect } from 'react';
import { PaymentOptions } from '@/components/Payment/PaymentOptions';
import { Cart, CartItem } from '@/components/Market/Cart';

interface OrderProps {
  onPaymentComplete?: () => void;
}

export function Order({ onPaymentComplete }: OrderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Example item to test display
    {
        cartIndex: 0,
        name: 'Sample Product',
        price: 50,
        quantity: 2,
        id: '',
        stock: 0,
        category: '',
        status: ''
    },
  ]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const updateQuantity = (cartIndex: number, qty: number) => {
    if (qty <= 0) return removeFromCart(cartIndex);
    setCartItems(prev =>
      prev.map(i =>
        i.cartIndex === cartIndex ? { ...i, quantity: qty } : i
      )
    );
  };

  const removeFromCart = (cartIndex: number) => {
    setCartItems(prev => prev.filter(i => i.cartIndex !== cartIndex));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * 0.1;
  const vatAmount = (subtotal - discountAmount) * 0.15;
  const totalAmount = subtotal - discountAmount + vatAmount;

  useEffect(() => {
    if (paymentCompleted) {
      const timer = setTimeout(() => setPaymentCompleted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentCompleted]);

  const handleReceiptOption = (option: string) => {
    setShowReceiptModal(false);
    console.log(`Receipt option selected: ${option}`);
  };

  return (
    <>
      <div className="flex flex-col h-full">
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

      {showPaymentOptions && (
        <PaymentOptions
          totalAmount={totalAmount}
          onCancel={() => setShowPaymentOptions(false)}
          onPaymentComplete={() => {
            setCartItems([]);
            setShowPaymentOptions(false);
            setShowReceiptModal(true);
            setPaymentCompleted(true);
            onPaymentComplete?.();
          }}
        />
      )}

      {showReceiptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">How would you like to receive your receipt?</h2>
            <div className="grid gap-3">
              {['print', 'email', 'qr', 'none'].map(option => (
                <button
                  key={option}
                  onClick={() => handleReceiptOption(option)}
                  className={`px-4 py-2 rounded text-white ${
                    option === 'print'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : option === 'email'
                      ? 'bg-green-600 hover:bg-green-700'
                      : option === 'qr'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'text-gray-600 underline hover:text-gray-800'
                  }`}
                >
                  {option === 'none' ? 'No Receipt' : `${option.charAt(0).toUpperCase() + option.slice(1)} Receipt`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
