import React from 'react';

interface PaymentDetailsProps {
  methodId: string;
  amount: number;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  methodId,
  amount
}) => {
  const getMethodName = (id: string) => {
    const methods: Record<string, string> = {
      'mobile-money': 'Mobile Money',
      'crypto': 'Cryptocurrency',
      'tap-swipe': 'Tap / Swipe Card',
      'nfc': 'NFC Payment',
      'coupons': 'Promo Coupon',
      'gifts': 'Gift Code'
    };
    return methods[id] || 'Payment Method';
  };

  const getInstructions = (methodId: string) => {
    switch (methodId) {
      case 'mobile-money':
        return [
          'Dial *123# on your mobile phone',
          'Enter merchant code: 12345',
          `Enter amount: LSL ${amount.toFixed(2)}`,
          'Confirm transaction with PIN'
        ];
      case 'crypto':
        return [
          'Open your crypto wallet app',
          'Scan the QR code below',
          'Confirm transaction details',
          'Send payment'
        ];
      case 'tap-swipe':
        return [
          'Insert card into reader',
          'Or tap contactless card',
          'Enter PIN if required',
          'Wait for confirmation'
        ];
      case 'nfc':
        return [
          'Unlock your phone',
          'Hold near NFC reader',
          'Authenticate if required',
          'Wait for confirmation'
        ];
      case 'coupons':
        return [
          'Enter coupon code below',
          'Verify discount amount',
          'Apply to transaction',
          'Complete remaining payment'
        ];
      case 'gifts':
        return [
          'Enter gift card code',
          'Verify available balance',
          'Apply to transaction',
          'Complete payment'
        ];
      default:
        return ['Follow the instructions provided', 'Complete the payment process'];
    }
  };

  const getIcon = (methodId: string) => {
    const icons: Record<string, string> = {
      'mobile-money': '📱',
      'crypto': '₿',
      'tap-swipe': '💳',
      'nfc': '📶',
      'coupons': '🏷️',
      'gifts': '🎁'
    };
    return icons[methodId] || '💳';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">{getIcon(methodId)}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{getMethodName(methodId)}</h3>
        <p className="text-2xl font-bold text-green-600">
          LSL {amount.toFixed(2)}
        </p>
      </div>

      {/* QR Code / Visual Display */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="text-center">
          <div className="grid grid-cols-8 gap-1 max-w-32 mx-auto mb-4">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} border border-gray-200`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            {methodId === 'crypto' ? 'Scan QR Code with Wallet' : 
             methodId === 'tap-swipe' ? 'Insert or Tap Card Below' :
             methodId === 'nfc' ? 'Hold Phone Near Reader' :
             methodId === 'mobile-money' ? 'Use Code Above for USSD' :
             'Scan Code or Follow Instructions'}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {getInstructions(methodId).map((instruction, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">{index + 1}.</span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>

      {/* Input field for codes/coupons */}
      {(methodId === 'coupons' || methodId === 'gifts') && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter {methodId === 'coupons' ? 'Coupon' : 'Gift Card'} Code:
          </label>
          <input
            type="text"
            placeholder={`Enter ${methodId === 'coupons' ? 'coupon' : 'gift card'} code`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );
};
