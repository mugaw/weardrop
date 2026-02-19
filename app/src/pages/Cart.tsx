import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiTrash2, FiArrowLeft, FiShoppingBag, FiTruck, FiShield } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { QuantitySelector } from '@/components/common/QuantitySelector';

export function Cart() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    total 
  } = useCart();

  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const finalTotal = total + tax;

  const handleRemove = (productId: string, size: string, color: string) => {
    const key = `${productId}-${size}-${color}`;
    const element = itemRefs.current.get(key);
    
    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: -50,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          removeFromCart(productId, size, color);
        }
      });
    } else {
      removeFromCart(productId, size, color);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      gsap.to('.cart-item', {
        opacity: 0,
        x: -50,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => {
          clearCart();
        }
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <FiShoppingBag className="mx-auto mb-6 text-[var(--noir-border)]" size={80} />
          <h1 className="font-display text-3xl md:text-4xl mb-4">Your Cart is Empty</h1>
          <p className="text-[var(--noir-gray)] mb-8">
            Discover our collection and add items to your cart
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            <FiArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="section-padding py-8 border-b border-[var(--noir-border)]">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-sm text-[var(--noir-gray)] hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="section-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const key = `${item.product.id}-${item.size}-${item.color}`;
              
              return (
                <div
                  key={key}
                  ref={(el) => {
                    if (el) itemRefs.current.set(key, el);
                  }}
                  className="cart-item flex gap-6 p-4 border border-[var(--noir-border)]"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-28 h-36 flex-shrink-0 bg-[var(--noir-light-gray)] overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-medium hover:text-[var(--noir-gray)] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-[var(--noir-gray)] mt-1">
                          {item.color} / {item.size}
                        </p>
                        <p className="text-sm text-[var(--noir-gray)] mt-0.5">
                          SKU: {item.product.sku}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleRemove(item.product.id, item.size, item.color)}
                        className="p-2 text-[var(--noir-gray)] hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
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

                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-[var(--noir-gray)]">
                            ${item.product.price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue Shopping */}
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[var(--noir-gray)] hover:text-[var(--noir-black)] transition-colors"
            >
              <FiArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-[var(--noir-border)] p-6 space-y-6">
              <h2 className="font-display text-xl">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--noir-gray)]">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[var(--noir-gray)]">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[var(--noir-gray)]">Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {subtotal < 500 && (
                  <p className="text-xs text-[var(--noir-gray)]">
                    Add ${(500 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[var(--noir-border)]">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-2xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full btn-primary py-4">
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-xs text-[var(--noir-gray)] mb-3">We accept</p>
                <div className="flex items-center justify-center gap-3">
                  {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                    <span 
                      key={method}
                      className="px-2 py-1 bg-[var(--noir-light-gray)] text-xs"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: FiTruck, text: 'Free shipping over $500' },
                { icon: FiShield, text: 'Secure checkout' }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-[var(--noir-gray)]">
                  <Icon size={18} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
