import React, { useState, useEffect } from 'react';
import { GitBranch, Search, Lightbulb, PlayCircle, LineChart } from 'lucide-react';

const iconMap = {
  Search,
  Lightbulb,
  PlayCircle,
  LineChart
};

const defaultProcessSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Research & Strategy',
    summary: 'Discovery & Competitor Intelligence',
    description: 'We analyze your market, competitors, and target audience to build a powerful custom marketing strategy.'
  },
  {
    step: '02',
    icon: Lightbulb,
    title: 'Campaign Planning',
    summary: 'Tailored Multi-Channel Roadmap',
    description: 'Our experts create tailored SEO, social media, and advertising campaigns designed for maximum brand visibility.'
  },
  {
    step: '03',
    icon: PlayCircle,
    title: 'Execution & Launch',
    summary: 'Precision Deployment & Creatives',
    description: 'We launch and manage campaigns while continuously optimizing performance to ensure maximum ROI.'
  },
  {
    step: '04',
    icon: LineChart,
    title: 'Performance Tracking',
    summary: 'Analytics & Continuous Scaling',
    description: 'Detailed analytics and reports help us measure success, improve campaigns, and scale your business growth.'
  }
];

export default function Process() {
  const [steps, setSteps] = useState(defaultProcessSteps);

  useEffect(() => {
    fetch('http://localhost:5000/api/process')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
          const mapped = data.data.map(item => ({
            ...item,
            icon: iconMap[item.icon] || Search
          }));
          setSteps(mapped);
        }
      })
      .catch(() => {
        // Fallback to defaultProcessSteps
      });
  }, []);

  return (
    <section id="process" className="section-padding process-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <GitBranch size={14} />
            <span>Workflow & Execution</span>
          </div>
          <h2 className="section-title">Our Digital Marketing Process</h2>
          <p className="section-desc">
            We follow a proven, data-driven 4-phase process designed to deliver measurable business growth,
            higher qualified traffic, and scalable lead generation.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="process-card">
                <div className="process-step-num">{item.step}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Icon size={20} style={{ color: 'var(--primary)' }} />
                  <h3 className="process-title" style={{ margin: 0 }}>{item.title}</h3>
                </div>
                <div className="process-summary">{item.summary}</div>
                <p className="process-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
