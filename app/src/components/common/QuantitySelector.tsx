import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md'
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  return (
    <div className="flex items-center border border-[var(--noir-border)]">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${sizeClasses[size]} flex items-center justify-center transition-colors hover:bg-[var(--noir-light-gray)] disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <FiMinus size={iconSizes[size]} />
      </button>
      
      <span className={`${sizeClasses[size]} flex items-center justify-center font-medium min-w-[2.5rem]`}>
        {quantity}
      </span>
      
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${sizeClasses[size]} flex items-center justify-center transition-colors hover:bg-[var(--noir-light-gray)] disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        <FiPlus size={iconSizes[size]} />
      </button>
    </div>
  );
}

export default QuantitySelector;
