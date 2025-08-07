import React from 'react';

export const PaymentInstructions: React.FC<{ methodId: string; amount: number }> = ({ methodId, amount }) => {
  const dollar = `$${amount.toFixed(2)}`;
  const instructions: Record<string, string[]> = {
    'mobile-money': [
      'Dial *123# on your mobile phone',
      `Enter merchant code: 12345`,
      `Enter amount: ${dollar}`,
      'Confirm transaction'
    ],
    'crypto': [
      'Open your crypto wallet app',
      'Scan the QR code above',
      'Confirm transaction details',
      'Send payment'
    ],
    'tap-swipe': [
      'Insert card into reader',
      'Or tap contactless card',
      'Enter PIN if required',
      'Wait for confirmation'
    ],
    'nfc': [
      'Unlock your phone',
      'Hold near NFC reader',
      'Authenticate if required',
      'Wait for confirmation'
    ],
    'coupons': [
      'Enter coupon code',
      'Verify balance',
      'Apply to transaction',
      'Complete payment'
    ],
    'gifts': [
      'Enter gift card code',
      'Verify balance',
      'Apply to transaction',
      'Complete payment'
    ],
  };

  const current = instructions[methodId] || ['Scan code or follow instructions'];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        {current.map((step, idx) => (
          <li key={idx}>• {step}</li>
        ))}
      </ul>
    </div>
  );
};
