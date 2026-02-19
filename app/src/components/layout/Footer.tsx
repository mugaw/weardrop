import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Men', href: '/shop?category=men' },
      { label: 'Women', href: '/shop?category=women' },
      { label: 'Accessories', href: '/shop?category=accessories' },
      { label: 'Sale', href: '/shop?filter=sale' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Sustainability', href: '#' }
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Size Guide', href: '#' }
    ]
  };

  return (
    <footer className="bg-[var(--noir-black)] text-white">
      {/* Main Footer */}
      <div className="section-padding section-y">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-display text-2xl tracking-wider">NOIR ATELIER</h2>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Timeless elegance meets modern sophistication. Crafted with precision, 
              designed for those who appreciate the art of refined dressing.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--noir-black)] transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--noir-black)] transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--noir-black)] transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a 
                href="mailto:hello@noiratelier.com" 
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <FiMail size={16} />
                <span>hello@noiratelier.com</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <FiPhone size={16} />
                <span>+1 (234) 567-890</span>
              </a>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <FiMapPin size={16} />
                <span>New York, NY</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} NOIR ATELIER. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-white/40 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-white/40 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-white/40 hover:text-white transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
