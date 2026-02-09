import React from 'react';

interface CustomAvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CustomAvatar({ name, src, size = 'md' }: CustomAvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const getInitials = (name: string) => {
     if (!name) return "U";
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const colors = [
    'bg-primary-500',
    'bg-accent-500',
    'bg-success-500',
    'bg-warning-500',
  ];

  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full ${colors[colorIndex]} flex items-center justify-center text-white`}
    >
      {getInitials(name)}
    </div>
  );
}
