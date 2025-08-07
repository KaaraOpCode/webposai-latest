import React from 'react';
import { PaymentMethod } from '@/app/types';
interface Props {
  method: PaymentMethod
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export const PaymentMethodCard: React.FC<Props> = ({
  method,
  isSelected,
  onSelect,
  disabled,
}) => (
  <button
    onClick={() => onSelect(method.id)}
    disabled={disabled}
    className={`flex items-center justify-between p-4 rounded-lg border transition-all w-full text-left
      ${method.bgColor} ${method.borderColor}
      ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{method.icon}</span>
      <span className="font-medium text-gray-900">{method.name}</span>
    </div>

    {isSelected && (
      <span className="text-blue-500 text-xl">✔️</span>
    )}
  </button>
);
