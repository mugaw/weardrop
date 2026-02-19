import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

// Context
import { CartProvider } from '@/contexts/CartContext';

// Pages
import { Home } from '@/pages/Home';
import { Shop } from '@/pages/Shop';
import { ProductDetail } from '@/pages/ProductDetail';
import { Cart } from '@/pages/Cart';
import { About } from '@/pages/About';
import { Blog } from '@/pages/Blog';
import { BlogDetail } from '@/pages/BlogDetail';
import { Contact } from '@/pages/Contact';
import { FAQ } from '@/pages/FAQ';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return null;
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const pageRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  return <div ref={pageRef}>{children}</div>;
}

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Setup ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
      once: true
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <CartDrawer />
          
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* 404 Fallback */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen pt-32 section-padding text-center">
                      <h1 className="font-display text-4xl mb-4">404</h1>
                      <p className="text-[var(--noir-gray)] mb-8">Page not found</p>
                      <a href="/" className="btn-primary">Go Home</a>
                    </div>
                  } 
                />
              </Routes>
            </PageTransition>
          </main>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
