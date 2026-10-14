import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';

export default function RoiCalculator({ onOpenQuote }) {
  const [budget, setBudget] = useState(2500);
  const [industry, setIndustry] = useState('b2b');

  // Multiplier by industry
  const industryMultipliers = {
    b2b: { roi: 4.8, cpl: 45, label: 'B2B Services & SaaS' },
    ecommerce: { roi: 5.4, cpl: 28, label: 'E-commerce & Retail' },
    local: { roi: 4.2, cpl: 35, label: 'Local Services & Healthcare' },
    realestate: { roi: 4.6, cpl: 60, label: 'Real Estate & High-Ticket' }
  };

  const selectedConfig = industryMultipliers[industry] || industryMultipliers.b2b;
  const estimatedRevenue = Math.round(budget * selectedConfig.roi);
  const estimatedLeads = Math.round(budget / selectedConfig.cpl);
  const estimatedImpressions = Math.round(budget * 65).toLocaleString();

  return (
    <section className="section-padding roi-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge badge-white">
            <Calculator size={14} style={{ color: '#00d2ff' }} />
            <span>Interactive ROI Simulator</span>
          </div>
          <h2 className="section-title title-white">Calculate Your Estimated Growth</h2>
          <p className="section-desc desc-white">
            See how much revenue and lead volume your marketing budget could unlock with Opticore Digitals'
            proven data-driven frameworks.
          </p>
        </div>

        <div className="roi-card">
          {/* Controls */}
          <div className="roi-controls">
            <div className="slider-group">
              <label>
                <span>Monthly Marketing Budget</span>
                <span>${budget.toLocaleString()} / mo</span>
              </label>
              <input
                type="range"
                min="500"
                max="20000"
                step="250"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="range-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                <span>$500</span>
                <span>$10,000</span>
                <span>$20,000+</span>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ color: '#e2e8f0', fontSize: '15px' }}>Your Business Category</label>
              <select
                className="select-control"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="b2b">B2B Services & Technology</option>
                <option value="ecommerce">E-Commerce & Online Stores</option>
                <option value="local">Local Businesses & Medical/Dental</option>
                <option value="realestate">Real Estate & High-Ticket Services</option>
              </select>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '16px', fontSize: '13.5px', color: '#cbd5e1' }}>
              💡 <em>Based on Opticore Digitals historical 12-month client benchmark averages across paid search, SEO, and social funnels.</em>
            </div>
          </div>

          {/* Results Box */}
          <div className="roi-results-box">
            <div className="roi-result-metric">
              <div className="roi-result-label">Projected Monthly Revenue Generated</div>
              <div className="roi-result-big">${estimatedRevenue.toLocaleString()}</div>
              <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '700' }}>
                ~ {selectedConfig.roi}x Average ROAS
              </span>
            </div>

            <div className="roi-submetrics-grid">
              <div className="submetric-item">
                <h4>{estimatedLeads.toLocaleString()}+</h4>
                <p>Est. Qualified Leads</p>
              </div>

              <div className="submetric-item">
                <h4>{estimatedImpressions}</h4>
                <p>Est. Targeted Reach</p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '24px' }}
              onClick={onOpenQuote}
            >
              <span>Unlock This Custom Campaign Plan</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
