import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  return (
    <section id="hero" className="hero-wrapper">
      {/* Background radial glows */}
      <div className="hero-bg-glow-1"></div>
      <div className="hero-bg-glow-2"></div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Text Content */}
          <div className="hero-content">
            {/* Subtitle from original code */}
            <h3 className="hero-subtitle">
              Grow Your Business with Data-Driven Marketing
            </h3>

            <h1>
              Performance-Driven Digital Marketing Agency in Lahore
            </h1>

            <p>
              Opticore Digitals helps businesses scale faster through data-driven digital marketing strategies.
              Our expert team specializes in search engine optimization (SEO), paid advertising, social media marketing,
              and high-converting web solutions.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-white" id="hero-consultation-btn">
                <span>GET FREE CONSULTATION</span>
                <ArrowRight size={18} />
              </a>

              <button
                type="button"
                className="btn btn-outline-white"
                id="hero-quote-btn"
                onClick={onOpenQuote}
              >
                <Sparkles size={18} />
                <span>REQUEST CUSTOM QUOTE</span>
              </button>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-item-icon" />
                <span>Google & Meta Certified</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-item-icon" />
                <span>150+ Brands Scaled</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-item-icon" />
                <span>Transparent Analytics</span>
              </div>
            </div>
          </div>

          {/* Right Visual Floating Dashboard Card */}
          <div className="hero-visual-card">
            <div className="hero-card-header">
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '700' }}>
                  Opticore Growth Hub
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>Real-time Client Impact</p>
              </div>
              <div className="live-badge">
                <div className="pulse-dot"></div>
                <span>LIVE TELEMETRY</span>
              </div>
            </div>

            <div className="stats-card-list">
              <div className="stat-metric-box">
                <div>
                  <div className="stat-metric-title">Search Engine Organic Traffic</div>
                  <div className="stat-metric-value">+284.6%</div>
                </div>
                <div className="stat-metric-change">
                  <TrendingUp size={16} /> +12.4k MoM
                </div>
              </div>

              <div className="stat-metric-box">
                <div>
                  <div className="stat-metric-title">PPC Advertising ROAS</div>
                  <div className="stat-metric-value">5.2x</div>
                </div>
                <div className="stat-metric-change">
                  <TrendingUp size={16} /> Industry Top 1%
                </div>
              </div>

              <div className="stat-metric-box">
                <div>
                  <div className="stat-metric-title">Customer Acquisition Cost (CAC)</div>
                  <div className="stat-metric-value">-38.2%</div>
                </div>
                <div className="stat-metric-change" style={{ color: '#00d2ff' }}>
                  <TrendingUp size={16} /> Optimized
                </div>
              </div>

              <div className="stat-metric-box">
                <div>
                  <div className="stat-metric-title">Average Qualified Leads / Mo</div>
                  <div className="stat-metric-value">1,450+</div>
                </div>
                <div className="stat-metric-change">
                  <ShieldCheck size={16} /> Verified Leads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
