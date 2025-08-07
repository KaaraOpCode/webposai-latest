import React from 'react';

export const QRDisplay: React.FC<{ methodId: string }> = ({ methodId }) => {
  const label = {
    crypto: 'Scan QR Code',
    'tap-swipe': 'Insert or Tap Card',
    nfc: 'Hold Phone Near Reader',
  }[methodId] || 'Scan Code or Follow Instructions';

  return (
    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
      <div className="text-center">
        <div className="grid grid-cols-8 gap-1 max-w-32 mx-auto mb-4">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
          ))}
        </div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};
