// ==========================================
// Opticore Digitals - Unified API Client
// Supports both:
// 1. Localhost Express Backend (with Middlewares & Logger for Sir's demo)
// 2. Vercel Cloud Production (Direct HTTPS connection to Supabase Cloud Database)
// ==========================================

const SUPABASE_URL = 'https://xfsdzqyqmeclsakvmvgp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2WQb1SYFdb8ILccF9RERAw_eVvBLW8A';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

/**
 * Submit Quote Request
 * Localhost: Calls Express Backend -> Supabase
 * Vercel / Cloud: Calls Supabase Cloud Database REST API directly
 */
export async function submitQuoteRequest(formData) {
  // If running locally on laptop, call Express backend first (shows logger & validator for Sir)
  if (isLocalhost) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, message: data.message };
      }
    } catch (backendErr) {
      console.warn('Local backend unreachable, connecting directly to Supabase Cloud DB:', backendErr);
    }
  }

  // Cloud / Vercel fallback: Direct HTTPS call to Supabase Cloud Database
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/quote_requests`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'N/A',
        company: formData.company || 'N/A',
        services: formData.services || [],
        monthly_budget: formData.monthlyBudget || 'Not specified',
        timeframe: formData.timeframe || 'Immediately',
        notes: formData.notes || ''
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Supabase submission failed');
    }

    return {
      success: true,
      message: 'Your quote request has been submitted successfully!'
    };
  } catch (cloudErr) {
    console.error('Submission error:', cloudErr);
    throw new Error('Could not submit quote. Please check your internet connection.');
  }
}

/**
 * Submit Contact Inquiry
 * Localhost: Calls Express Backend -> Supabase
 * Vercel / Cloud: Calls Supabase Cloud Database REST API directly
 */
export async function submitContactInquiry(formData) {
  if (isLocalhost) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, message: data.message };
      }
    } catch (backendErr) {
      console.warn('Local backend unreachable, connecting directly to Supabase Cloud DB:', backendErr);
    }
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'N/A',
        service: formData.service || 'SEO Services',
        budget: formData.budget || 'Flexible',
        message: formData.message
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Supabase submission failed');
    }

    return {
      success: true,
      message: 'Thank you! Your consultation request has been received.'
    };
  } catch (cloudErr) {
    console.error('Contact error:', cloudErr);
    throw new Error('Could not send message. Please check your internet connection.');
  }
}

/**
 * Send AI Chatbot Message
 * Localhost: Calls Express Backend /api/chat
 * Vercel / Cloud: Built-in English Marketing AI assistant
 */
export async function sendChatMessage(query) {
  if (isLocalhost) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (backendErr) {
      console.warn('Local backend chat unreachable, using client marketing knowledge:', backendErr);
    }
  }

  // Client-side English Marketing AI (Vercel Cloud Support)
  const q = (query || '').toLowerCase();
  let reply = "Hello! 👋 I am the Opticore Digitals AI Assistant. How can I help you grow your business today? Feel free to ask about our SEO, Meta Ads, custom web design, or pricing packages!";
  let suggestions = ['💡 Services Overview', '💰 Pricing & Quotes', '📈 SEO Strategies', '📞 Contact Agency'];
  let action = null;
  let actionText = null;

  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('quote') || q.includes('budget')) {
    reply = "Our tailored growth programs typically start at $1,000/month for dedicated SEO or Meta advertising campaigns. Custom enterprise solutions and full-funnel web development are scoped individually. Would you like a custom quote?";
    suggestions = ['Get a Quote Now', 'What includes in SEO?', 'Can we schedule a call?'];
    action = 'open_quote_modal';
    actionText = 'Request Strategy Quote';
  } else if (q.includes('seo') || q.includes('rank') || q.includes('google') || q.includes('traffic')) {
    reply = "Our SEO framework covers comprehensive technical site audits, keyword intent research, high-authority backlink outreach, and on-page optimization. We focus on ranking commercial keywords that drive paying clients.";
    suggestions = ['What about PPC?', 'View Case Studies', 'Request SEO Audit'];
  } else if (q.includes('ad') || q.includes('meta') || q.includes('facebook') || q.includes('instagram') || q.includes('ppc')) {
    reply = "We craft full-funnel paid ad campaigns across Google Search & Meta (Facebook/Instagram). Our methodology utilizes dynamic creative testing, retargeting funnels, and ROAS-focused budget allocation.";
    suggestions = ['How fast do ads deliver?', 'Explore PPC Pricing', 'Request Strategy Quote'];
    action = 'open_quote_modal';
    actionText = 'Get PPC Strategy';
  } else if (q.includes('web') || q.includes('site') || q.includes('development') || q.includes('design')) {
    reply = "We engineer modern, high-speed, conversion-focused websites using React, clean component systems, and responsive design. Every page is optimized for both speed and lead conversion.";
    suggestions = ['Website Pricing', 'Technology Stack', 'Request Custom Quote'];
    action = 'open_quote_modal';
    actionText = 'Scope a Website';
  } else if (q.includes('contact') || q.includes('call') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
    reply = "You can consult directly with our strategists! Send us an inquiry through our consultation form below or email us at info@opticoredigitals.com.";
    suggestions = ['Go to Contact Form', 'Request a Quote', 'Ask about services'];
    action = 'scroll_to_contact';
    actionText = 'Consult Our Strategists';
  }

  return {
    success: true,
    reply,
    suggestions,
    action,
    actionText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
