import React from 'react';

interface CustomBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
  size?: 'sm' | 'md';
}

export function CustomBadge({ children, variant = 'primary', size = 'md' }: CustomBadgeProps) {
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-accent-100 text-accent-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1',
  };

  return (
    <span className={`inline-flex items-center rounded-lg ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
