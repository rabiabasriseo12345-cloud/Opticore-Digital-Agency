import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Kelly John',
    role: 'Founder & CEO, FinTech Pro',
    rating: 5,
    text: 'Opticore Digitals helped us improve our search engine rankings and increase organic traffic through their professional SEO services. Highly recommended!',
    metric: '+240% Organic Traffic'
  },
  {
    id: 2,
    name: 'Anaz Rehman',
    role: 'Managing Director, RetailHub',
    rating: 5,
    text: 'It was a great experience. Their digital marketing solutions helped us generate qualified leads through PPC and social media campaigns with high ROAS.',
    metric: '5.2x PPC ROAS'
  },
  {
    id: 3,
    name: 'William Stark',
    role: 'Head of Operations, Stark Logistics',
    rating: 5,
    text: 'We saw a noticeable improvement in our online presence. Their SEO and marketing strategies are practical, result-oriented, and remarkably effective.',
    metric: '3x Lead Pipeline'
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(defaultTestimonials);

  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setReviews(data.data);
        }
      })
      .catch(() => {
        // Fallback default
      });
  }, []);

  return (
    <section id="testimonials" className="section-padding testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge badge-white">
            <MessageSquareQuote size={14} style={{ color: '#00d2ff' }} />
            <span>Social Proof</span>
          </div>
          <h2 className="section-title title-white">What Our Clients Say</h2>
          <p className="section-desc desc-white">
            Real experiences and measurable outcomes from businesses scaling their bottom line with our digital marketing solutions.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="star-rating">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} fill="#ffc107" stroke="#ffc107" />
                ))}
              </div>

              <p className="testimonial-text">"{item.text}"</p>

              <div className="testimonial-author-box">
                <div className="author-info">
                  <h4>{item.name}</h4>
                  <p>{item.role || item.company}</p>
                </div>
                {item.metric && (
                  <span className="result-badge">{item.metric}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
