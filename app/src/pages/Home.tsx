import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Testimonials } from '@/components/home/Testimonials';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate hero image
      tl.fromTo(
        heroImageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
      );

      // Animate hero content
      tl.fromTo(
        heroContentRef.current?.children || [],
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Get featured and best seller products
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);
  const saleItems = products.filter(p => p.isSale).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen min-h-[600px] overflow-hidden"
      >
        {/* Hero Background Image */}
        <div 
          ref={heroImageRef}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
            alt="NOIR ATELIER Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div 
          ref={heroContentRef}
          className="relative h-full flex flex-col items-center justify-center text-center text-white section-padding"
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            New Collection 2024
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6">
            Timeless<br />Elegance
          </h1>
          <p className="text-base md:text-lg max-w-md mb-8 text-white/90">
            Discover our curated collection of refined essentials, 
            crafted for the modern sophisticate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="btn-primary bg-white text-[var(--noir-black)] hover:bg-white/90">
              Shop Now
            </Link>
            <Link to="/shop?filter=new" className="btn-outline border-white text-white hover:bg-white hover:text-[var(--noir-black)]">
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-px h-12 bg-current mx-auto" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-y section-padding">
        <SectionTitle 
          title="Shop by Category" 
          subtitle="Curated Collections"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { 
              name: 'Women', 
              image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
              href: '/shop?category=women'
            },
            { 
              name: 'Men', 
              image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
              href: '/shop?category=men'
            },
            { 
              name: 'Accessories', 
              image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
              href: '/shop?category=accessories'
            }
          ].map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-display text-2xl md:text-3xl mb-2">{category.name}</h3>
                  <span className="inline-flex items-center gap-2 text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <FiArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-y section-padding bg-[var(--noir-cream)]">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle 
            title="New Arrivals" 
            subtitle="Just In"
            align="left"
            className="mb-0"
          />
          <Link 
            to="/shop?filter=new" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase hover:text-[var(--noir-gray)] transition-colors"
          >
            View All <FiArrowRight size={16} />
          </Link>
        </div>
        
        <ProductGrid products={newArrivals} columns={4} />
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/shop?filter=new" 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase"
          >
            View All <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="NOIR ATELIER Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative section-padding text-center text-white max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 block">Our Philosophy</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Crafted with Intention
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Each piece in our collection is thoughtfully designed and meticulously crafted 
            using the finest materials. We believe in creating garments that not only look 
            beautiful but feel exceptional to wear.
          </p>
          <Link 
            to="/about" 
            className="btn-outline border-white text-white hover:bg-white hover:text-[var(--noir-black)]"
          >
            Discover Our Story
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-y section-padding">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle 
            title="Best Sellers" 
            subtitle="Most Loved"
            align="left"
            className="mb-0"
          />
          <Link 
            to="/shop" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase hover:text-[var(--noir-gray)] transition-colors"
          >
            View All <FiArrowRight size={16} />
          </Link>
        </div>
        
        <ProductGrid products={bestSellers} columns={4} />
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Sale Section */}
      {saleItems.length > 0 && (
        <section className="section-y section-padding bg-[var(--noir-black)] text-white">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle 
              title="Sale" 
              subtitle="Limited Time"
              align="left"
              className="mb-0 [&_h2]:text-white"
            />
            <Link 
              to="/shop?filter=sale" 
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-white/70 hover:text-white transition-colors"
            >
              View All <FiArrowRight size={16} />
            </Link>
          </div>
          
          <ProductGrid products={saleItems} columns={4} />
        </section>
      )}

      {/* Newsletter */}
      <section className="section-y section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <SectionTitle 
            title="Join the Inner Circle" 
            subtitle="Newsletter"
            className="mb-8"
          />
          <p className="text-[var(--noir-gray)] mb-8">
            Subscribe to receive exclusive offers, early access to new collections, 
            and style inspiration delivered to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-[var(--noir-border)] focus:outline-none focus:border-[var(--noir-black)] transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-[var(--noir-gray)] mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 section-padding border-t border-[var(--noir-border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: 'Free Shipping', desc: 'On orders over $500' },
            { title: 'Easy Returns', desc: '30-day return policy' },
            { title: 'Secure Payment', desc: '100% secure checkout' },
            { title: '24/7 Support', desc: 'Dedicated support' }
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-[var(--noir-gray)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
