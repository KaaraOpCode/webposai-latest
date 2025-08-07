'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const baseStyles =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantStyles: Record<string, string> = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  outline: 'border border-gray-300 hover:bg-gray-100 focus:ring-gray-400',
  ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-400',
  link: 'underline text-blue-600 hover:text-blue-800 focus:ring-blue-500',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const variantClass = variantStyles[variant] || variantStyles.default;
    const sizeClass = sizeStyles[size] || sizeStyles.md;

    const classes = `${baseStyles} ${variantClass} ${sizeClass} ${className}`.trim();

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = 'Button';

export default Button;
