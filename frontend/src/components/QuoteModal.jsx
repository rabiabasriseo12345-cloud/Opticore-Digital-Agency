import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { submitQuoteRequest } from '../services/api';

const availableServices = [
  'SEO Services',
  'Pay-Per-Click Advertising',
  'Social Media Marketing',
  'Website Development',
  'Content Marketing & Copywriting',
  'Analytics & CRO'
];

export default function QuoteModal({ isOpen, onClose, initialService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    monthlyBudget: '$2,000 - $5,000 / mo',
    timeframe: 'Immediately (within 1-2 weeks)',
    notes: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.includes(initialService) ? prev.services : [...prev.services, initialService]
      }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const toggleService = (srv) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(srv)
        ? prev.services.filter((s) => s !== srv)
        : [...prev.services, srv]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const result = await submitQuoteRequest(formData);
      if (result.success) {
        setStatus({ loading: false, success: true, error: '' });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Failed to submit quote request. Please try again.'
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--navy-800)' }}>
            Request a Custom Strategy Quote
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Tell us about your brand and required services. We will prepare an in-depth scope and pricing breakdown.
        </p>

        {status.success ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--navy-800)', marginBottom: '8px' }}>
              Quote Request Submitted!
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '24px' }}>
              Thank you, {formData.name}! Our business development director is reviewing your requirements and will send your proposal within 24 hours.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setStatus({ loading: false, success: false, error: '' });
                onClose();
              }}
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {status.error && (
              <div className="alert-box alert-error">
                <AlertCircle size={20} />
                <span>{status.error}</span>
              </div>
            )}

            <div className="form-grid-2">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kelly John"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  className="form-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+92 300 0000000"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Service Checkboxes */}
            <div className="form-group">
              <label>Select Services Needed (Multi-select)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginTop: '6px' }}>
                {availableServices.map((srv) => {
                  const isChecked = formData.services.includes(srv);
                  return (
                    <label
                      key={srv}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        background: isChecked ? 'rgba(13, 110, 253, 0.08)' : 'var(--bg-surface-alt)',
                        border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        cursor: 'var(--cursor-balloon-pointer)',
                        fontWeight: isChecked ? '600' : 'normal',
                        color: isChecked ? 'var(--primary)' : 'var(--text-main)'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleService(srv)}
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <span>{srv}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Target Monthly Budget</label>
                <select
                  className="form-select"
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                >
                  <option value="Under $1,000 / mo">Under $1,000 / mo</option>
                  <option value="$1,000 - $2,500 / mo">$1,000 - $2,500 / mo</option>
                  <option value="$2,500 - $5,000 / mo">$2,500 - $5,000 / mo</option>
                  <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                  <option value="$10,000+ / mo">$10,000+ / mo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Desired Timeframe</label>
                <select
                  className="form-select"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                >
                  <option value="Immediately (within 1-2 weeks)">Immediately (within 1-2 weeks)</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Exploring options / Next quarter">Exploring options / Next quarter</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Additional Notes or Questions</label>
              <textarea
                rows={3}
                placeholder="Share any specific websites, competitors, or campaign targets..."
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
              disabled={status.loading}
            >
              {status.loading ? 'Submitting Request...' : (
                <>
                  <Send size={16} /> Submit Custom Quote Request
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
