import React from 'react';
import { useFadeInUp } from '@/hooks/useScrollAnimation';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  showLine?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
  showLine = false
}: SectionTitleProps) {
  const titleRef = useFadeInUp<HTMLDivElement>(0);

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div 
      ref={titleRef}
      className={`${alignClasses[align]} ${className}`}
    >
      {subtitle && (
        <span className="block text-xs font-medium tracking-[0.2em] uppercase text-[var(--noir-gray)] mb-3">
          {subtitle}
        </span>
      )}
      
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--noir-black)]">
        {title}
      </h2>
      
      {showLine && (
        <div className={`mt-6 flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <div className="w-16 h-px bg-[var(--noir-black)]" />
        </div>
      )}
    </div>
  );
}

export default SectionTitle;
