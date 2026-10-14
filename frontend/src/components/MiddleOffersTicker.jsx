import React from 'react';

export default function MiddleOffersTicker() {
  const offersList = [
    '🔍 Complete SEO Optimization & Google #1 Page Ranking',
    '✦',
    '📱 Social Media Accounts Handling & Daily Content Management',
    '✦',
    '🎯 High-ROAS Meta Ads (Facebook & Instagram) Targeted Campaigns',
    '✦',
    '🚀 Google Search & PPC Ads for Instant Qualified Leads',
    '✦',
    '💻 Modern Responsive Website Development & Landing Pages',
    '✦',
    '🎁 Limited Time: Free Digital Marketing & SEO Audit Included!',
    '✦',
    '📈 24/7 Conversion Tracking & Transparent Weekly Reports',
    '✦'
  ];

  return (
    <div className="middle-ticker-wrapper">
      <div className="middle-ticker-track">
        <div className="middle-ticker-content">
          {offersList.map((item, idx) => (
            <span key={`offer1-${idx}`} className="middle-ticker-item">
              {item}
            </span>
          ))}
        </div>
        <div className="middle-ticker-content" aria-hidden="true">
          {offersList.map((item, idx) => (
            <span key={`offer2-${idx}`} className="middle-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
