import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { QuantitySelector } from '@/components/common/QuantitySelector';

export function CartDrawer() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    total, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle open/close animations
  useEffect(() => {
    if (drawerRef.current && overlayRef.current && contentRef.current) {
      if (isCartOpen) {
        // Open animation
        document.body.style.overflow = 'hidden';
        
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(drawerRef.current, {
          x: '0%',
          duration: 0.4,
          ease: 'power3.out'
        });

        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.05,
            delay: 0.2,
            ease: 'power2.out'
          }
        );
      } else {
        // Close animation
        gsap.to(drawerRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in'
        });
        
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.in',
          onComplete: () => {
            document.body.style.overflow = '';
          }
        });
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleRemove = (productId: string, size: string, color: string) => {
    // Animate removal
    const itemElement = document.querySelector(`[data-cart-item="${productId}-${size}-${color}"]`);
    if (itemElement) {
      gsap.to(itemElement, {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          removeFromCart(productId, size, color);
        }
      });
    } else {
      removeFromCart(productId, size, color);
    }
  };

  const shipping = subtotal > 500 ? 0 : 25;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-[70] ${isCartOpen ? '' : 'pointer-events-none'}`}
        style={{ opacity: 0 }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--noir-border)]">
          <div className="flex items-center gap-3">
            <FiShoppingBag size={22} />
            <h2 className="font-display text-xl">Your Cart</h2>
            <span className="text-sm text-[var(--noir-gray)]">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[var(--noir-light-gray)] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <FiShoppingBag size={64} className="text-[var(--noir-border)] mb-4" />
              <h3 className="font-display text-xl mb-2">Your cart is empty</h3>
              <p className="text-[var(--noir-gray)] text-sm mb-6">
                Discover our collection and add items to your cart
              </p>
              <Link
                to="/shop"
                onClick={handleClose}
                className="btn-primary"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  data-cart-item={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={handleClose}
                    className="w-24 h-32 flex-shrink-0 bg-[var(--noir-light-gray)] overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={handleClose}
                        className="font-medium text-sm hover:text-[var(--noir-gray)] transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => handleRemove(item.product.id, item.size, item.color)}
                        className="p-1 text-[var(--noir-gray)] hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <p className="text-sm text-[var(--noir-gray)] mt-1">
                      {item.color} / {item.size}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => 
                          updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                        }
                        onDecrease={() => 
                          updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                        }
                        size="sm"
                      />

                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--noir-border)] p-6 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--noir-gray)]">Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--noir-gray)]">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              {subtotal < 500 && (
                <p className="text-xs text-[var(--noir-gray)]">
                  Free shipping on orders over $500
                </p>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--noir-border)]">
                <span className="font-medium">Total</span>
                <span className="font-display text-xl">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/cart"
              onClick={handleClose}
              className="btn-primary w-full"
            >
              View Cart & Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={handleClose}
              className="w-full py-3 text-sm font-medium tracking-wider uppercase text-[var(--noir-gray)] hover:text-[var(--noir-black)] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
