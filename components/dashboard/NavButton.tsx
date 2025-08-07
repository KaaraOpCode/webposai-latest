'use client';
import { FC } from 'react';

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  variant?: 'default' | 'danger';
  onClick?: () => void;
}

const NavButton: FC<NavButtonProps> = ({ icon: Icon, label, variant = 'default', onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      variant === 'danger'
        ? 'text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20'
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }`}
  >
    <Icon size={18} />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default NavButton;
