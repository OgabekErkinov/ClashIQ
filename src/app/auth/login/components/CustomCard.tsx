import React from 'react';

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function CustomCard({ children, className = '', onClick, hover = false }: CustomCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 ${
        hover ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}