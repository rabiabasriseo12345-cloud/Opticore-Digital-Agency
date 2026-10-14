import React from 'react';

export default function TopTicker() {
  const tickerItems = [
    '🚀 Grow Your Business with Data-Driven Marketing',
    '✦',
    'Performance-Driven Digital Marketing Agency in Lahore',
    '✦',
    '📞 Call / WhatsApp: +92 301 9714441',
    '✦',
    '✉️ info@opticoredigitals.com',
    '✦',
    '⭐ 150+ Clients Scaled & 4.8x Average ROI',
    '✦',
    '🎯 Get Free Digital Marketing Consultation Today!',
    '✦'
  ];

  return (
    <div className="top-ticker-wrapper">
      <div className="ticker-track">
        <div className="ticker-content">
          {tickerItems.map((item, idx) => (
            <span key={`track1-${idx}`} className="ticker-text">
              {item}
            </span>
          ))}
        </div>
        <div className="ticker-content" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <span key={`track2-${idx}`} className="ticker-text">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
