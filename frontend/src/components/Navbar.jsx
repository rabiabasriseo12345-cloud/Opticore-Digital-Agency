import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, Phone, Mail } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Frameworks', href: '#frameworks' },
    { name: 'Process', href: '#process' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <a href="#hero" className="brand-link">
            <img src="/logo.png" alt="Opticore Digitals Logo" className="brand-logo-img" />
            <div className="brand-title">
              Opticore<span>Digitals</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links-desktop">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="nav-item-link">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions on Right */}
          <div className="navbar-actions">
            <button
              type="button"
              id="nav-quote-btn"
              className="btn btn-white nav-cta-btn"
              onClick={onOpenQuote}
            >
              <Sparkles size={16} style={{ color: 'var(--primary)' }} />
              <span>REQUEST QUOTE</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Horizontal Quick Navigation Bar (Pages names ALWAYS visible on mobile) */}
      <div className="mobile-quick-nav">
        <div className="mobile-quick-nav-track">
          {navItems.map((item) => (
            <a
              key={`quick-${item.name}`}
              href={item.href}
              className="mobile-quick-link"
              onClick={handleLinkClick}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* Full Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span style={{ fontWeight: '800', color: '#ffffff', fontSize: '1.2rem' }}>
                Opticore Menu
              </span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <ul className="mobile-drawer-links">
              {navItems.map((item) => (
                <li key={`drawer-${item.name}`}>
                  <a
                    href={item.href}
                    className="mobile-drawer-item"
                    onClick={handleLinkClick}
                  >
                    <span>{item.name}</span>
                    <ArrowRight size={16} />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-footer">
              <button
                type="button"
                className="btn btn-white"
                style={{ width: '100%', padding: '12px', marginBottom: '14px' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
              >
                <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                <span>REQUEST CUSTOM QUOTE</span>
              </button>

              <div style={{ fontSize: '13px', color: '#cfe2ff', textAlign: 'center' }}>
                📞 Call: <a href="tel:+923019714441" style={{ color: '#ffffff', fontWeight: 'bold' }}>+92 301 9714441</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
