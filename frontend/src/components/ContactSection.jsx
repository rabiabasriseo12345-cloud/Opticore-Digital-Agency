import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { submitContactInquiry } from '../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'SEO Services',
    budget: '$1,000 - $3,000 / mo',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const result = await submitContactInquiry(formData);
      if (result.success) {
        setStatus({
          loading: false,
          success: true,
          error: ''
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'SEO Services',
          budget: '$1,000 - $3,000 / mo',
          message: ''
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Unable to send message. Please verify your connection or try again shortly.'
      });
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">Schedule Your Free Consultation</h2>
          <p className="section-desc">
            Ready to outpace your competitors and scale predictable revenue? Speak directly with our senior growth strategists.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left: Contact Info */}
          <div className="contact-info-panel">
            <div>
              <h3>Let's Discuss Your Growth Goals</h3>
              <p>
                Whether you need complete SEO dominance, high-ROAS paid ads, or a brand new conversion-engineered website,
                we are here to help your brand accelerate.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-row">
                  <div className="contact-detail-icon">
                    <MapPin size={22} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Headquarters</h4>
                    <p>G.T Road, Staff Houses, Engineering University Lahore, 39161</p>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-detail-icon">
                    <Mail size={22} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Direct Email</h4>
                    <a href="mailto:info@opticoredigitals.com">info@opticoredigitals.com</a>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-detail-icon">
                    <Phone size={22} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Phone & WhatsApp</h4>
                    <a href="tel:+923019714441">+92 301 9714441</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock size={20} style={{ color: '#00d2ff', flexShrink: 0 }} />
              <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
                <strong>Average Response Time:</strong> Under 2 hours during business days (Mon–Sat: 9am – 6pm PKT).
              </div>
            </div>
          </div>

          {/* Right: Working Contact Form */}
          <div className="contact-form-panel">
            <h3 className="form-title">Send Us a Message</h3>
            <p className="form-subtitle">Fill in your requirements below for a customized audit.</p>

            {status.success && (
              <div className="alert-box alert-success">
                <CheckCircle2 size={20} />
                <span>
                  Thank you! Your inquiry was sent to Opticore Digitals. Our team will review your project and get back to you shortly!
                </span>
              </div>
            )}

            {status.error && (
              <div className="alert-box alert-error">
                <AlertCircle size={20} />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} id="contact-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="e.g. Kelly John"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Business Email *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="kelly@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder="+92 300 1234567"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-service">Primary Service Needed</label>
                  <select
                    id="contact-service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="SEO Services">SEO Services</option>
                    <option value="Pay-Per-Click Advertising">Pay-Per-Click Advertising</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Content Marketing & Copywriting">Content Marketing & Copywriting</option>
                    <option value="Analytics & CRO">Analytics & CRO</option>
                    <option value="Full Omnichannel Growth Package">Full Omnichannel Growth Package</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-budget">Estimated Monthly Budget</label>
                <select
                  id="contact-budget"
                  name="budget"
                  className="form-select"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="Under $1,000 / mo">Under $1,000 / mo</option>
                  <option value="$1,000 - $3,000 / mo">$1,000 - $3,000 / mo</option>
                  <option value="$3,000 - $7,500 / mo">$3,000 - $7,500 / mo</option>
                  <option value="$7,500+ / mo">$7,500+ / mo (Enterprise Scale)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Project Details / Goals *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your website, target market, current challenges, and goals..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '15px' }}
                disabled={status.loading}
                id="contact-submit-btn"
              >
                {status.loading ? (
                  <span>Sending Consultation Request...</span>
                ) : (
                  <>
                    <span>SUBMIT CONSULTATION REQUEST</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
