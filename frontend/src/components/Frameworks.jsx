import React, { useState } from 'react';
import { Compass, CheckCircle, ArrowRight } from 'lucide-react';

const frameworks = [
  {
    id: 'aida',
    title: 'AIDA Marketing Model',
    tagline: 'Attention → Interest → Desire → Action',
    description: 'We utilize the proven AIDA psychological framework to methodically convert ice-cold traffic into loyal high-value clients.',
    steps: [
      { step: 'A', name: 'Attention', text: 'Scroll-stopping ad creatives, search dominance, and thumb-stopping hooks that break user inertia.' },
      { step: 'I', name: 'Interest', text: 'Engaging, solution-oriented copy that highlights customer pain points and builds immediate curiosity.' },
      { step: 'D', name: 'Desire', text: 'Social proof, client case studies, and undeniable ROI demonstrations that cultivate strong intent.' },
      { step: 'A', name: 'Action', text: 'Frictionless call-to-actions, conversion-optimized landing pages, and urgency triggers.' }
    ]
  },
  {
    id: 'funnel',
    title: 'Full Funnel Strategy',
    tagline: 'TOFU → MOFU → BOFU Acceleration',
    description: 'Our omnichannel funnel strategy targets prospects at every single touchpoint of their decision-making lifecycle.',
    steps: [
      { step: 'TOFU', name: 'Top of Funnel (Awareness)', text: 'Broad reach through informative SEO blog posts, high-reach viral reels, and Google display ads.' },
      { step: 'MOFU', name: 'Middle of Funnel (Consideration)', text: 'Targeted lead magnets, comparison guides, dynamic retargeting, and email nurturing sequences.' },
      { step: 'BOFU', name: 'Bottom of Funnel (Decision)', text: 'High-intent search ads, personalized consultations, limited-time proposals, and custom quotes.' }
    ]
  },
  {
    id: 'data-driven',
    title: 'Data-Driven Marketing',
    tagline: 'Telemetry → Experimentation → Scale',
    description: 'No guesswork. We rely strictly on real-time empirical data, conversion attribution models, and unit economics.',
    steps: [
      { step: '01', name: 'Precision Telemetry', text: 'Server-side conversion tracking, Google Analytics 4, heatmaps, and call attribution tracking.' },
      { step: '02', name: 'Rapid Multivariate Testing', text: 'Weekly A/B testing of angles, hooks, ad creatives, audience demographics, and landing page elements.' },
      { step: '03', name: 'Aggressive Profitable Scaling', text: 'Allocating ad spend ruthlessly to top-performing cohorts while eliminating wasted marketing dollars.' }
    ]
  }
];

export default function Frameworks() {
  const [activeId, setActiveId] = useState('aida');
  const currentFramework = frameworks.find((f) => f.id === activeId) || frameworks[0];

  return (
    <section id="frameworks" className="section-padding frameworks-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>Methodology</span>
          </div>
          <h2 className="section-title">Our Proven Digital Marketing Frameworks</h2>
          <p className="section-desc">
            At Opticore Digitals, we don’t rely on guessing games. We execute battle-tested marketing frameworks designed
            to attract the right audience, build lasting trust, and convert visitors into loyal customers.
          </p>
        </div>

        {/* Framework Selector Buttons */}
        <div className="frameworks-nav">
          {frameworks.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`framework-nav-btn ${activeId === f.id ? 'active' : ''}`}
              onClick={() => setActiveId(f.id)}
            >
              {f.title}
            </button>
          ))}
        </div>

        {/* Active Framework Showcase Box */}
        <div className="framework-display-card">
          <div className="framework-info-header">
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
              {currentFramework.tagline}
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', marginBottom: '10px' }}>
              {currentFramework.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              {currentFramework.description}
            </p>
          </div>

          <div className="framework-steps-grid">
            {currentFramework.steps.map((st, i) => (
              <div key={i} className="framework-step-card">
                <span className="step-indicator">{st.step}</span>
                <h4 className="step-name">{st.name}</h4>
                <p className="step-text">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
