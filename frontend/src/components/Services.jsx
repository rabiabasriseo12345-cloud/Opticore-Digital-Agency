import React, { useState, useEffect } from 'react';
import { Search, Target, Share2, Code, PenTool, BarChart3, Check, ArrowRight, Layers } from 'lucide-react';

const iconMap = {
  Search: Search,
  Target: Target,
  Share2: Share2,
  Code: Code,
  PenTool: PenTool,
  BarChart3: BarChart3
};

const defaultServices = [
  {
    id: 'seo',
    icon: 'Search',
    title: 'SEO Services',
    subtitle: 'High Organic Rankings & Traffic',
    category: 'search',
    description: 'Boost your search engine rankings and attract targeted organic traffic through proven optimization techniques, technical audits, and keyword dominance.',
    deliverables: ['Technical SEO Audit', 'Keyword & Competitor Research', 'On-Page & Off-Page Optimization', 'High-Authority Backlink Acquisition'],
    badge: 'Popular'
  },
  {
    id: 'ppc',
    icon: 'Target',
    title: 'Pay-Per-Click Advertising',
    subtitle: 'High-Converting Paid Traffic',
    category: 'search',
    description: 'Generate immediate traffic and high-quality leads with targeted Google Ads, Meta Ads, and social media PPC campaigns engineered for maximum ROAS.',
    deliverables: ['Google Search & Display Ads', 'Meta (Facebook & Instagram) Funnels', 'Audience Retargeting', 'Conversion Rate Tracking'],
    badge: 'High ROI'
  },
  {
    id: 'smm',
    icon: 'Share2',
    title: 'Social Media Marketing',
    subtitle: 'Community Growth & Engagement',
    category: 'growth',
    description: 'Build brand awareness, engage with your audience, and drive conversions across major social channels with trend-focused creatives and viral storytelling.',
    deliverables: ['Social Strategy & Calendar', 'High-Engagement Graphic Design', 'Community Management', 'Influencer Collaborations'],
    badge: 'Growth'
  },
  {
    id: 'web-dev',
    icon: 'Code',
    title: 'Website Development',
    subtitle: 'Modern, Fast & High-Converting',
    category: 'tech',
    description: 'Get a modern, responsive, and SEO-friendly website designed to turn visitors into loyal customers with seamless UX and blazing fast speeds.',
    deliverables: ['Custom React / Modern Web Dev', 'Mobile-First Responsive Layout', 'SEO & Core Web Vitals Optimization', 'Lead Capture Funnels'],
    badge: 'Essential'
  },
  {
    id: 'content',
    icon: 'PenTool',
    title: 'Content Marketing & Copywriting',
    subtitle: 'Persuasive Messaging that Sells',
    category: 'growth',
    description: 'Craft high-converting copy and authority-building content that positions your brand as an industry leader and drives customer decisions.',
    deliverables: ['SEO Blog Articles', 'Sales Copy & Landing Pages', 'Email Marketing Sequences', 'Brand Messaging Guides'],
    badge: 'Creative'
  },
  {
    id: 'analytics',
    icon: 'BarChart3',
    title: 'Analytics & CRO',
    subtitle: 'Conversion Rate Optimization',
    category: 'tech',
    description: 'Turn your existing website traffic into paying clients with in-depth analytics, heatmaps, A/B testing, and friction-free user flows.',
    deliverables: ['Google Analytics 4 Setup', 'Conversion Tracking Architecture', 'A/B Split Testing', 'User Behavior Heatmaps'],
    badge: 'Data-First'
  }
];

export default function Services({ onSelectServiceForQuote }) {
  const [services, setServices] = useState(defaultServices);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          // Merge category tag onto backend items
          const merged = data.data.map((item) => ({
            ...item,
            category: item.id === 'seo' || item.id === 'ppc' ? 'search' : item.id === 'smm' || item.id === 'content' ? 'growth' : 'tech'
          }));
          setServices(merged);
        }
      })
      .catch(() => {
        // Fallback default services
      });
  }, []);

  const filteredServices = activeTab === 'all'
    ? services
    : services.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="section-padding services-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} />
            <span>Core Capabilities</span>
          </div>
          <h2 className="section-title">Our Digital Marketing Services</h2>
          <p className="section-desc">
            We offer a full range of digital marketing solutions designed to build a strong online presence,
            outrank competitors, and generate predictable sales pipelines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="services-filter-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Services ({services.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search & PPC Ads
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
            onClick={() => setActiveTab('growth')}
          >
            Social & Growth
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            Web Dev & Analytics
          </button>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Search;
            return (
              <div key={service.id} className="service-card">
                {service.badge && (
                  <span className="service-card-badge">{service.badge}</span>
                )}

                <div className="service-icon-wrapper">
                  <IconComponent size={28} />
                </div>

                <h3 className="service-title">{service.title}</h3>
                <div className="service-subtitle">{service.subtitle}</div>
                <p className="service-desc">{service.description}</p>

                <ul className="service-deliverables">
                  {service.deliverables.map((item, index) => (
                    <li key={index} className="service-deliverable-item">
                      <Check size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="service-cta-link"
                  style={{ background: 'none', border: 'none', cursor: 'var(--cursor-balloon-pointer)', padding: 0 }}
                  onClick={() => onSelectServiceForQuote(service.title)}
                >
                  <span>Request Custom Strategy</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
