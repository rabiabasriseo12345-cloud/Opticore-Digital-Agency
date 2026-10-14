import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, CheckCircle2, TrendingUp } from 'lucide-react';

/**
 * Animated Counter Component
 * Counts from 0 to target number with smooth easing when in viewport
 */
function CounterItem({ icon: Icon, target, prefix = '', suffix = '', decimals = 0, label, sublabel, isVisible }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const duration = 2200; // 2.2 seconds animation
    let animId = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = easeProgress * target;

      setCurrentValue(val);

      if (progress < 1) {
        animId = requestAnimationFrame(animateCount);
      } else {
        setCurrentValue(target);
      }
    };

    animId = requestAnimationFrame(animateCount);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, target]);

  const displayFormatted = () => {
    if (decimals > 0) {
      return currentValue.toFixed(decimals);
    }
    // Format integer with commas (e.g. 1,200)
    return Math.floor(currentValue).toLocaleString();
  };

  return (
    <div className="stats-ribbon-card">
      <div className="stats-card-top">
        <div className="stats-icon-box">
          <Icon size={24} />
        </div>
        <div className="stats-number">
          {prefix}{displayFormatted()}{suffix}
        </div>
      </div>
      <div className="stats-label">{label}</div>
      {sublabel && <div className="stats-sublabel">{sublabel}</div>}
    </div>
  );
}

export default function StatsRibbon() {
  const [counters, setCounters] = useState([
    {
      id: 'clients',
      icon: Users,
      target: 250,
      prefix: '',
      suffix: '+',
      decimals: 0,
      label: 'Satisfied Global Clients',
      sublabel: 'Active & returning brands'
    },
    {
      id: 'campaigns',
      icon: Award,
      target: 1200,
      prefix: '',
      suffix: '+',
      decimals: 0,
      label: 'Campaigns Delivered',
      sublabel: 'SEO, Meta, PPC & web growth'
    },
    {
      id: 'retention',
      icon: CheckCircle2,
      target: 98,
      prefix: '',
      suffix: '%',
      decimals: 0,
      label: 'Client Retention Rate',
      sublabel: 'Proven long-term trust'
    },
    {
      id: 'adspend',
      icon: TrendingUp,
      target: 3.5,
      prefix: '$',
      suffix: 'M+',
      decimals: 1,
      label: 'Profitable Ad Spend Managed',
      sublabel: 'High-converting ad funnels'
    }
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger counter animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch from Express backend
  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data && data.data && data.data.counters) {
          const iconMap = {
            clients: Users,
            campaigns: Award,
            retention: CheckCircle2,
            adspend: TrendingUp
          };

          const mapped = data.data.counters.map(item => ({
            ...item,
            icon: iconMap[item.id] || Users
          }));
          setCounters(mapped);
        }
      })
      .catch(() => {
        // Fallback to default animated values
      });
  }, []);

  return (
    <section ref={sectionRef} className="stats-ribbon" id="metrics-strip">
      <div className="container">
        <div className="stats-ribbon-grid">
          {counters.map((item) => (
            <CounterItem
              key={item.id}
              icon={item.icon}
              target={item.target}
              prefix={item.prefix}
              suffix={item.suffix}
              decimals={item.decimals || 0}
              label={item.label}
              sublabel={item.sublabel}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
