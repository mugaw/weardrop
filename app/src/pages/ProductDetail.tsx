import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiHeart, FiShare2, FiTruck, FiRefreshCw, FiShield, FiChevronRight, FiCheck } from 'react-icons/fi';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { QuantitySelector } from '@/components/common/QuantitySelector';
import { Price } from '@/components/common/Price';
import { Badge } from '@/components/common/Badge';
import { ProductGrid } from '@/components/product/ProductGrid';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const productRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const product = products.find(p => p.id === id);
  
  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // Initialize selections
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
    }
  }, [product]);

  // Page entrance animation
  useEffect(() => {
    if (product && imageRef.current && detailsRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          imageRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
        );

        tl.fromTo(
          detailsRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        );
      });

      return () => ctx.revert();
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 section-padding text-center">
        <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
        <p className="text-[var(--noir-gray)] mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    setIsAddingToCart(true);
    
    // Add to cart
    addToCart(product, quantity, selectedSize, selectedColor);
    
    // Animate button
    gsap.to('.add-to-cart-btn', {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setIsAddingToCart(false);
        setIsCartOpen(true);
      }
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pt-20" ref={productRef}>
      {/* Breadcrumbs */}
      <div className="section-padding py-4 border-b border-[var(--noir-border)]">
        <nav className="flex items-center gap-2 text-sm text-[var(--noir-gray)]">
          <Link to="/" className="hover:text-[var(--noir-black)] transition-colors">Home</Link>
          <FiChevronRight size={14} />
          <Link to="/shop" className="hover:text-[var(--noir-black)] transition-colors">Shop</Link>
          <FiChevronRight size={14} />
          <Link 
            to={`/shop?category=${product.category}`} 
            className="hover:text-[var(--noir-black)] transition-colors capitalize"
          >
            {product.category}
          </Link>
          <FiChevronRight size={14} />
          <span className="text-[var(--noir-black)] line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="section-padding py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div ref={imageRef} className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-[var(--noir-light-gray)] relative overflow-hidden">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isSale && <Badge variant="sale">Sale</Badge>}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-24 flex-shrink-0 bg-[var(--noir-light-gray)] overflow-hidden border-2 transition-colors ${
                      activeImage === index 
                        ? 'border-[var(--noir-black)]' 
                        : 'border-transparent hover:border-[var(--noir-border)]'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div ref={detailsRef} className="space-y-6">
            {/* Header */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--noir-gray)]">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl mt-2 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <Price 
                  price={product.price} 
                  originalPrice={product.originalPrice}
                  size="lg"
                />
                
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-[var(--noir-gray)]">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[var(--noir-gray)] leading-relaxed">
              {product.description}
            </p>

            {/* SKU */}
            <p className="text-sm text-[var(--noir-gray)]">
              SKU: {product.sku}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase mb-3">
                  Color: <span className="font-normal normal-case">{selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[var(--noir-black)] scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium tracking-wider uppercase">
                    Size: <span className="font-normal normal-case">{selectedSize}</span>
                  </h3>
                  <button className="text-sm text-[var(--noir-gray)] underline hover:text-[var(--noir-black)]">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-12 px-4 border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-[var(--noir-black)] text-white border-[var(--noir-black)]'
                          : 'border-[var(--noir-border)] hover:border-[var(--noir-black)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase mb-3">Quantity</h3>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => Math.min(q + 1, 10))}
                onDecrease={() => setQuantity(q => Math.max(q - 1, 1))}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || isAddingToCart}
                className="add-to-cart-btn flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? (
                  <span className="flex items-center gap-2">
                    <FiCheck size={18} /> Added to Cart
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex items-center gap-4 pt-2">
              <button className="flex items-center gap-2 text-sm text-[var(--noir-gray)] hover:text-[var(--noir-black)] transition-colors">
                <FiHeart size={18} />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-[var(--noir-gray)] hover:text-[var(--noir-black)] transition-colors">
                <FiShare2 size={18} />
                <span>Share</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--noir-border)]">
              {[
                { icon: FiTruck, text: 'Free Shipping over $500' },
                { icon: FiRefreshCw, text: '30-Day Returns' },
                { icon: FiShield, text: 'Secure Checkout' }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="text-center">
                  <Icon className="mx-auto mb-2 text-[var(--noir-gray)]" size={24} />
                  <span className="text-xs text-[var(--noir-gray)]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="section-padding section-y border-t border-[var(--noir-border)]">
          <h2 className="font-display text-2xl md:text-3xl mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
