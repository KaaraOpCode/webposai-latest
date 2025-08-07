import React from 'react';

interface Props {
  status: 'idle' | 'processing' | 'success' | 'error';
}

export const PaymentStatus: React.FC<Props> = ({ status }) => {
  if (status === 'processing') {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-blue-600 font-medium">Processing payment...</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-600 font-medium">Payment Successful!</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to main screen...</p>
      </div>
    );
  }

  return null;
};
