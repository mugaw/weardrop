import React from 'react';

interface PriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showStrike?: boolean;
  className?: string;
}

export function Price({
  price,
  originalPrice,
  currency = '$',
  size = 'md',
  showStrike = true,
  className = ''
}: PriceProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const originalSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const formatPrice = (amount: number) => {
    return `${currency}${amount.toLocaleString()}`;
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${sizeClasses[size]} font-medium ${hasDiscount ? 'text-red-600' : ''}`}>
        {formatPrice(price)}
      </span>
      
      {hasDiscount && showStrike && (
        <span className={`${originalSizeClasses[size]} text-[var(--noir-gray)] line-through`}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}

export default Price;
