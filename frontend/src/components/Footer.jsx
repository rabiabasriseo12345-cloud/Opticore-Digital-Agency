import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="/logo.png"
                alt="Opticore Digitals Logo"
                style={{ width: '45px', height: '45px', borderRad: '50%', background: '#fff', padding: '3px' }}
              />
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                Opticore<span style={{ color: '#00d2ff' }}>Digitals</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              Opticore Digitals partners with ambitious businesses to deliver scalable growth through data-driven marketing,
              omnichannel acquisition funnels, and high-converting digital strategies.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="footer-col-title">Contact Info</h4>
            <div className="footer-contact-item">
              <strong style={{ color: '#ffffff' }}>Email:</strong><br />
              <a href="mailto:info@opticoredigitals.com" style={{ color: '#cbd5e1' }}>info@opticoredigitals.com</a>
            </div>
            <div className="footer-contact-item">
              <strong style={{ color: '#ffffff' }}>Headquarters:</strong><br />
              <span>G.T Road, Staff Houses, Engineering University Lahore, 39161</span>
            </div>
            <div className="footer-contact-item">
              <strong style={{ color: '#ffffff' }}>Phone:</strong><br />
              <a href="tel:+923019714441" style={{ color: '#cbd5e1' }}>+92 301 9714441</a>
            </div>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#hero">Home</a></li>
              <li className="footer-link-item"><a href="#why-us">About Us</a></li>
              <li className="footer-link-item"><a href="#services">Services</a></li>
              <li className="footer-link-item"><a href="#frameworks">Marketing Models</a></li>
              <li className="footer-link-item"><a href="#process">Our Process</a></li>
              <li className="footer-link-item"><a href="#testimonials">Reviews</a></li>
              <li className="footer-link-item"><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Social Presence */}
          <div>
            <h4 className="footer-col-title">Connect With Us</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: '1.6' }}>
              Follow our social channels for data-backed growth breakdowns and marketing tips.
            </p>
            <div className="footer-social-links">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="Twitter"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-outline-white"
              style={{ marginTop: '24px', padding: '8px 16px', fontSize: '13px' }}
            >
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 Opticore Digitals | Performance-Driven Digital Marketing Agency. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#hero" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#hero" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#hero" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
