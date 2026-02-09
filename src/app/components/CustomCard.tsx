import React from 'react';

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  variant? : string;
  onClick?: () => void;
  hover?: boolean;
}

export function CustomCard({ children, className = '', variant = '', onClick, hover = false }: CustomCardProps) {
  return (
    <div
      className={`${!className && 'bg-white'} rounded-xl shadow-md p-6 ${
        hover ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''} 
        ${className}`} data-variant = { variant }
      onClick={onClick}
    >
      {children}
    </div>
  );
}