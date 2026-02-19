import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'sale' | 'default' | 'outOfStock';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className = ''
}: BadgeProps) {
  const variantClasses = {
    new: 'bg-[var(--noir-black)] text-white',
    sale: 'bg-red-600 text-white',
    default: 'bg-[var(--noir-light-gray)] text-[var(--noir-black)]',
    outOfStock: 'bg-[var(--noir-gray)] text-white'
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-3 py-1
        text-xs font-medium tracking-wider uppercase
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
