import React from 'react';
import { Award, CheckCircle, ArrowRight, ShieldCheck, Users, BarChart } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      title: 'Data-Driven Digital Marketing Strategies',
      desc: 'Campaigns engineered on telemetry, analytics, and consumer intent rather than intuition.'
    },
    {
      title: 'Experienced SEO & Marketing Experts',
      desc: 'Certified Google Ads, Meta, and SEO veterans managing your growth pipelines.'
    },
    {
      title: 'Transparent Reporting & Analytics',
      desc: '24/7 client portal access and weekly transparent ROI reviews with zero vanity metrics.'
    },
    {
      title: 'Focus on Real Business Growth',
      desc: 'Our single benchmark is your bottom line—revenue generated, qualified pipeline, and profit.'
    }
  ];

  return (
    <section id="why-us" className="section-padding why-us-section">
      <div className="container">
        <div className="why-us-grid">
          {/* Left Column: Image with overlay badge */}
          <div className="why-us-img-box">
            <img
              src="/about-img.jpg"
              alt="Opticore Digitals Marketing Team"
              className="why-us-main-img"
            />
            <div className="why-us-floating-badge">
              <div className="badge-icon-circle">
                <Award size={26} />
              </div>
              <div>
                <div className="badge-text-title">8+ Years</div>
                <div className="badge-text-sub">Performance Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="why-us-content">
            <div className="section-badge">
              <ShieldCheck size={14} />
              <span>Why Opticore Digitals</span>
            </div>

            <h2 className="section-title">Why Choose Opticore Digitals?</h2>

            <p>
              Opticore Digitals is a results-driven digital marketing agency dedicated to helping businesses
              scale profitably online. Our data-driven strategies, experienced team, and innovative marketing solutions
              help brands outpace competition, generate dependable leads, and achieve long-term market dominance.
            </p>

            <ul className="pillars-list">
              {pillars.map((item, idx) => (
                <li key={idx} className="pillar-item">
                  <div className="pillar-check">✔</div>
                  <div>
                    <div style={{ color: 'var(--navy-800)', fontWeight: '700' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn btn-primary" id="why-consultation-btn">
              <span>GET FREE CONSULTATION</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
