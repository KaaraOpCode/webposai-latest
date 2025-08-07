'use client';
import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { PaymentDetails } from './PaymentDetails';
import { PaymentStatus } from './PaymentStatus';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  borderColor: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'mobile-money',
    name: 'Mobile Money',
    icon: '📱',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'crypto',
    name: 'Crypto Wallet',
    icon: '₿',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    id: 'tap-swipe',
    name: 'Tap or Swipe',
    icon: '💳',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'nfc',
    name: 'NFC Payment',
    icon: '📶',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 'coupons',
    name: 'Promo Coupon',
    icon: '🏷️',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'gifts',
    name: 'Gift Code',
    icon: '🎁',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
];

interface PaymentOptionsProps {
  onPaymentComplete: () => void;
  onCancel: () => void;
  totalAmount: number;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onPaymentComplete,
  onCancel,
  totalAmount
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePay = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentComplete?.();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Payment Options</h2>
            <button
              onClick={onCancel}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2">Total Amount: LSL {totalAmount.toFixed(2)}</p>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100vh-250px)]">
          {/* Left Column */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-1 gap-3">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={selectedMethod === method.id}
                  onSelect={setSelectedMethod}
                  disabled={paymentStatus === 'processing'}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 p-6">
            {selectedMethod ? (
              <div className="space-y-4">
                {paymentStatus !== 'idle' ? (
                  <PaymentStatus status={paymentStatus} />
                ) : (
                  <PaymentDetails methodId={selectedMethod} amount={totalAmount} />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">💳</div>
                  <p>Select a payment method to continue</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button
            onClick={onCancel}
            disabled={paymentStatus === 'processing'}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          {selectedMethod && paymentStatus === 'idle' && (
            <button
              onClick={handlePay}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pay LSL {totalAmount.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
