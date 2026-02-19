import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { navLinks } from '@/data/products';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate header on mount
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.4, ease: 'power3.out' }
        );
        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in'
        });
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors link-underline ${
                    isActive(link.href)
                      ? 'text-[var(--noir-black)]'
                      : 'text-[var(--noir-gray)] hover:text-[var(--noir-black)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 -translate-x-1/2"
            >
              <h1 className="font-display text-xl md:text-2xl tracking-wider">
                NOIR ATELIER
              </h1>
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.slice(3).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors link-underline ${
                      isActive(link.href)
                        ? 'text-[var(--noir-black)]'
                        : 'text-[var(--noir-gray)] hover:text-[var(--noir-black)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Icons */}
              <div className="flex items-center gap-3 md:gap-4">
                <button 
                  className="p-2 hover:bg-[var(--noir-light-gray)] rounded-full transition-colors"
                  aria-label="Search"
                >
                  <FiSearch size={20} />
                </button>
                
                <button 
                  className="hidden md:block p-2 hover:bg-[var(--noir-light-gray)] rounded-full transition-colors"
                  aria-label="Account"
                >
                  <FiUser size={20} />
                </button>
                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:bg-[var(--noir-light-gray)] rounded-full transition-colors"
                  aria-label="Open cart"
                >
                  <FiShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--noir-black)] text-white text-xs flex items-center justify-center rounded-full">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[60] bg-white translate-x-full md:hidden"
      >
        <div className="flex flex-col h-full section-padding py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-display text-xl tracking-wider">NOIR ATELIER</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display text-[var(--noir-black)] hover:text-[var(--noir-gray)] transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="mt-auto pt-8 border-t border-[var(--noir-border)]">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-[var(--noir-gray)]">
                <FiUser size={18} />
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[55] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
