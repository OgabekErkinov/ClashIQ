import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function CustomInput({
  label,
  error,
  icon,
  className = '',
  ...props
}: CustomInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 rounded-xl border-2 ${
            error ? 'border-error-500' : 'border-gray-200'
          } focus:outline-none focus:border-primary-500 transition-colors ${
            icon ? 'pl-12' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-error-500">{error}</p>
      )}
    </div>
  );
}
