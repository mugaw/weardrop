import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Product } from '@/types';
import { Price } from '@/components/common/Price';
import { Badge } from '@/components/common/Badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with default size and color
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0]?.name || '';
    
    addToCart(product, 1, defaultSize, defaultColor);
    setIsCartOpen(true);
    
    // Animate the card
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className="product-card group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="product-image aspect-fashion relative bg-[var(--noir-light-gray)]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isSale && <Badge variant="sale">Sale</Badge>}
          </div>
          
          {/* Quick Add Button */}
          <div className="quick-add">
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 bg-[var(--noir-black)] text-white text-sm font-medium tracking-wider uppercase hover:bg-[var(--noir-gray)] transition-colors"
            >
              Quick Add
            </button>
          </div>
          
          {/* Second Image on Hover */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} - alternate view`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>
        
        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="font-body text-sm font-medium text-[var(--noir-black)] group-hover:text-[var(--noir-gray)] transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <Price 
            price={product.price} 
            originalPrice={product.originalPrice}
            size="sm"
          />
          
          {/* Color Options */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.slice(0, 4).map((color, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-[var(--noir-border)]"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-[var(--noir-gray)] ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
