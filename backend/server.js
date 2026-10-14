// ==========================================
// Opticore Digitals - Express.js Backend Server
// Built according to Node.js & Express.js Course (Zubitech)
// ==========================================

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');

// Import Custom Middlewares from middleware/ directory
const requestLogger = require('./middleware/logger');
const { validateContact, validateQuote } = require('./middleware/validator');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

// Import Supabase Database Client
const supabase = require('./config/supabase');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------------------------------
// 1. MIDDLEWARE PIPELINE (Slide 29 & 30)
// ------------------------------------------

// Built-in Middleware: JSON Body Parser (Slide 27)
app.use(express.json());

// Third-party Middleware: CORS (Slide 37)
// Frontend ka link (http://localhost:5173) yahan connect kiya hai taake dono apas mein baat kar sakein:
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Custom Request Logger Middleware (Slide 29)
app.use(requestLogger);

// ------------------------------------------
// 2. DATA (In-memory storage - Slide 39)
// (Database abhi nahi use kiya, simple arrays use kiye hain)
// ------------------------------------------
let contactInquiries = [];
let quoteRequests = [];

const servicesData = [
  {
    id: 'seo',
    icon: 'Search',
    title: 'SEO Services',
    subtitle: 'Organic Visibility & High Rankings',
    description: 'Boost your search engine rankings and attract targeted organic traffic through proven optimization techniques, technical audits, and keyword dominance.',
    deliverables: ['Technical SEO Audit', 'Keyword & Competitor Research', 'On-Page & Off-Page Optimization', 'High-Authority Backlink Acquisition'],
    badge: 'Popular'
  },
  {
    id: 'ppc',
    icon: 'Target',
    title: 'Pay-Per-Click Advertising',
    subtitle: 'High-Converting Paid Traffic',
    description: 'Generate immediate traffic and high-quality leads with targeted Google Ads, Meta Ads, and social media PPC campaigns engineered for maximum ROAS.',
    deliverables: ['Google Search & Display Ads', 'Meta (Facebook & Instagram) Funnels', 'Audience Retargeting', 'Conversion Rate Tracking'],
    badge: 'High ROI'
  },
  {
    id: 'smm',
    icon: 'Share2',
    title: 'Social Media Marketing',
    subtitle: 'Community Growth & Engagement',
    description: 'Build brand awareness, engage with your audience, and drive conversions across major social channels with trend-focused creatives and viral storytelling.',
    deliverables: ['Social Strategy & Calendar', 'High-Engagement Graphic Design', 'Community Management', 'Influencer Collaborations'],
    badge: 'Growth'
  },
  {
    id: 'web-dev',
    icon: 'Code',
    title: 'Website Development',
    subtitle: 'Modern, Fast & High-Converting',
    description: 'Get a modern, responsive, and SEO-friendly website designed to turn visitors into loyal customers with seamless UX and blazing fast speeds.',
    deliverables: ['Custom React / Modern Web Dev', 'Mobile-First Responsive Layout', 'SEO & Core Web Vitals Optimization', 'Lead Capture Funnels'],
    badge: 'Essential'
  },
  {
    id: 'content',
    icon: 'PenTool',
    title: 'Content Marketing & Copywriting',
    subtitle: 'Persuasive Messaging that Sells',
    description: 'Craft high-converting copy and authority-building content that positions your brand as an industry leader and drives customer decisions.',
    deliverables: ['SEO Blog Articles', 'Sales Copy & Landing Pages', 'Email Marketing Sequences', 'Brand Messaging Guides'],
    badge: 'Creative'
  },
  {
    id: 'analytics',
    icon: 'BarChart3',
    title: 'Analytics & CRO',
    subtitle: 'Conversion Rate Optimization',
    description: 'Turn your existing website traffic into paying clients with in-depth analytics, heatmaps, A/B testing, and friction-free user flows.',
    deliverables: ['Google Analytics 4 Setup', 'Conversion Tracking Architecture', 'A/B Split Testing', 'User Behavior Heatmaps'],
    badge: 'Data-First'
  }
];

const frameworksData = [
  {
    id: 'aida',
    title: 'AIDA Marketing Model',
    tagline: 'Attention → Interest → Desire → Action',
    description: 'We use the AIDA framework to capture attention, build interest, create desire, and drive customer action through strategic campaigns.'
  },
  {
    id: 'funnel',
    title: 'Full Funnel Strategy',
    tagline: 'TOFU → MOFU → BOFU Acceleration',
    description: 'Our funnel-based approach targets customers at every stage, from awareness to conversion, ensuring consistent lead generation.'
  },
  {
    id: 'data-driven',
    title: 'Data-Driven Marketing',
    tagline: 'Telemetry → Experimentation → Scale',
    description: 'We analyze real-time data, track unit economics, and continuously optimize campaigns to maximize ROI.'
  }
];

const testimonialsData = [
  {
    id: 1,
    name: 'Kelly John',
    role: 'Founder & CEO, FinTech Pro',
    rating: 5,
    text: 'Opticore Digitals helped us improve our search engine rankings and increase organic traffic by 240% through their professional SEO services. Highly recommended!',
    metric: '+240% Organic Traffic'
  },
  {
    id: 2,
    name: 'Anaz Rehman',
    role: 'Managing Director, RetailHub',
    rating: 5,
    text: 'It was a great experience. Their digital marketing solutions helped us generate qualified leads through PPC and social media campaigns with an astonishing 5.2x ROAS.',
    metric: '5.2x PPC ROAS'
  },
  {
    id: 3,
    name: 'William Stark',
    role: 'Head of Operations, Stark Logistics',
    rating: 5,
    text: 'We saw a noticeable improvement in our online presence. Their SEO and marketing strategies are practical, result-oriented, and extremely effective.',
    metric: '3x Lead Pipeline'
  }
];

const processData = [
  {
    step: '01',
    icon: 'Search',
    title: 'Research & Strategy',
    summary: 'Discovery & Competitor Intelligence',
    description: 'We analyze your market, competitors, and target audience to build a powerful custom marketing strategy.'
  },
  {
    step: '02',
    icon: 'Lightbulb',
    title: 'Campaign Planning',
    summary: 'Tailored Multi-Channel Roadmap',
    description: 'Our experts create tailored SEO, social media, and advertising campaigns designed for maximum brand visibility.'
  },
  {
    step: '03',
    icon: 'PlayCircle',
    title: 'Execution & Launch',
    summary: 'Precision Deployment & Creatives',
    description: 'We launch and manage campaigns while continuously optimizing performance to ensure maximum ROI.'
  },
  {
    step: '04',
    icon: 'LineChart',
    title: 'Performance Tracking',
    summary: 'Analytics & Continuous Scaling',
    description: 'Detailed analytics and reports help us measure success, improve campaigns, and scale your business growth.'
  }
];

const statsData = {
  // Numeric targets for animated count-up counters
  counters: [
    {
      id: 'clients',
      target: 250,
      prefix: '',
      suffix: '+',
      label: 'Satisfied Global Clients',
      sublabel: 'Verified B2B & B2C brands'
    },
    {
      id: 'campaigns',
      target: 1200,
      prefix: '',
      suffix: '+',
      label: 'Campaigns Successfully Delivered',
      sublabel: 'SEO, Meta, PPC & web solutions'
    },
    {
      id: 'retention',
      target: 98,
      prefix: '',
      suffix: '%',
      label: 'Client Retention Rate',
      sublabel: 'Consistent long-term ROI'
    },
    {
      id: 'adspend',
      target: 3.5,
      decimals: 1,
      prefix: '$',
      suffix: 'M+',
      label: 'Profitable Ad Spend Managed',
      sublabel: 'High-converting ad funnels'
    }
  ],
  // Legacy string values for backwards compatibility
  clientsServed: '250+',
  campaignsDelivered: '1,200+',
  avgRoiMultiplier: '4.8x',
  adSpendManaged: '$3.5M+',
  retentionRate: '98%'
};

// ------------------------------------------
// 3. REST API ROUTES (Slide 23 & 24)
// ------------------------------------------

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Opticore Digitals Express API is running'
  });
});

// GET /api/services - Read all services (Slide 23)
app.get('/api/services', (req, res) => {
  res.status(200).json({ success: true, data: servicesData });
});

// GET /api/frameworks - Read marketing frameworks
app.get('/api/frameworks', (req, res) => {
  res.status(200).json({ success: true, data: frameworksData });
});

// GET /api/testimonials - Read client reviews
app.get('/api/testimonials', (req, res) => {
  res.status(200).json({ success: true, data: testimonialsData });
});

// GET /api/stats - Read agency metrics
app.get('/api/stats', (req, res) => {
  res.status(200).json({ success: true, data: statsData });
});

// GET /api/process - Read marketing 4-phase execution process
app.get('/api/process', (req, res) => {
  res.status(200).json({ success: true, data: processData });
});

// POST /api/contact - Create a new contact inquiry (Slide 27 & 39)
app.post('/api/contact', validateContact, async (req, res) => {
  const { name, email, phone, service, budget, message } = req.body;

  const newInquiry = {
    id: Date.now(),
    name,
    email,
    phone: phone || 'N/A',
    service: service || 'SEO Services',
    budget: budget || 'Flexible',
    message,
    createdAt: new Date().toISOString()
  };

  // In-memory array push for instant access and demo (Slide 39)
  contactInquiries.push(newInquiry);

  // Insert into Supabase database table if configured
  if (supabase) {
    try {
      await supabase.from('contact_inquiries').insert([{
        name,
        email,
        phone: phone || 'N/A',
        service: service || 'SEO Services',
        budget: budget || 'Flexible',
        message
      }]);
      console.log(`[Supabase DB] Saved inquiry from ${name} to 'contact_inquiries' table`);
    } catch (dbErr) {
      console.error('[Supabase Error]:', dbErr.message);
    }
  }

  console.log(`[Contact Form Received] From: ${name} (${email})`);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your consultation request has been received.',
    inquiry: newInquiry
  });
});

// POST /api/quote - Create a new quote request (Slide 27)
app.post('/api/quote', validateQuote, async (req, res) => {
  const { name, email, phone, company, services, monthlyBudget, timeframe, notes } = req.body;

  const newQuote = {
    id: Date.now(),
    name,
    email,
    phone: phone || 'N/A',
    company: company || 'N/A',
    services: services || [],
    monthlyBudget: monthlyBudget || 'Not specified',
    timeframe: timeframe || 'Immediately',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  // In-memory array push
  quoteRequests.push(newQuote);

  // Insert into Supabase database table if configured
  if (supabase) {
    try {
      await supabase.from('quote_requests').insert([{
        name,
        email,
        phone: phone || 'N/A',
        company: company || 'N/A',
        services: services || [],
        monthly_budget: monthlyBudget || 'Not specified',
        timeframe: timeframe || 'Immediately',
        notes: notes || ''
      }]);
      console.log(`[Supabase DB] Saved quote from ${name} to 'quote_requests' table`);
    } catch (dbErr) {
      console.error('[Supabase Error]:', dbErr.message);
    }
  }

  console.log(`[Quote Request Received] From: ${name} (${company})`);

  return res.status(201).json({
    success: true,
    message: 'Your quote request has been submitted successfully!',
    quote: newQuote
  });
});

// GET /api/inquiries - Read all received inquiries (Supabase + In-Memory Fallback)
app.get('/api/inquiries', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return res.status(200).json({ success: true, count: data.length, data });
      }
    } catch (dbErr) {
      console.error('[Supabase Read Error]:', dbErr.message);
    }
  }

  return res.status(200).json({
    success: true,
    count: contactInquiries.length,
    data: contactInquiries
  });
});

// GET /api/quotes - Read all received quote requests (Supabase + In-Memory Fallback)
app.get('/api/quotes', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return res.status(200).json({ success: true, count: data.length, data });
      }
    } catch (dbErr) {
      console.error('[Supabase Read Error]:', dbErr.message);
    }
  }

  return res.status(200).json({
    success: true,
    count: quoteRequests.length,
    data: quoteRequests
  });
});

// ------------------------------------------
// 3.5 CHATBOT AI ASSISTANT ENDPOINT (100% English)
// ------------------------------------------
const chatKnowledgeBase = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'salam', 'morning', 'afternoon', 'help'],
    reply: 'Hello! 👋 I am the Opticore Digitals AI Assistant. How can I help you grow your business today? Feel free to ask about our SEO, Meta Ads, custom web design, or pricing packages!',
    suggestions: ['🚀 Services Overview', '💰 Pricing & Quotes', '📈 SEO Strategies', '📞 Contact Agency']
  },
  {
    keywords: ['service', 'services', 'offer', 'offers', 'solutions', 'what do you do', 'provide'],
    reply: 'We provide 6 high-impact digital marketing services engineered for rapid business growth:\n\n1. 🔍 SEO Services (Google 1st-page rankings & organic growth)\n2. 🎯 Meta & Google PPC Advertising (High-ROAS paid funnels)\n3. 📱 Social Media Marketing (Account management & viral creative content)\n4. 💻 Website Development (Blazing-fast modern web applications)\n5. ✍️ Content Marketing & Copywriting (High-converting storytelling)\n6. 📊 Analytics & CRO (Conversion rate optimization & deep attribution)',
    suggestions: ['💰 Request Custom Quote', '🔍 SEO Details', '📱 Meta Ads Offers', '📞 Book Free Call']
  },
  {
    keywords: ['seo', 'search engine', 'google rank', 'ranking', 'backlink', 'backlinks', 'keywords', 'organic'],
    reply: 'Our SEO service dominates search engine results through deep technical audits, competitor keyword mapping, on-page optimization, and authoritative backlink acquisition. Our clients experience an average 240% boost in high-intent organic traffic within 90 days!',
    suggestions: ['💰 SEO Pricing', '💼 Other Services', '📞 Speak with SEO Expert']
  },
  {
    keywords: ['meta', 'facebook', 'fb', 'insta', 'instagram', 'social media', 'smm', 'paid ads', 'ppc', 'ad', 'ads'],
    reply: 'We build high-converting Meta (Facebook & Instagram) and Google ad funnels optimized for maximum Return On Ad Spend (ROAS). We handle end-to-end creative production, lookalike audience targeting, A/B split testing, and retargeting campaigns.',
    suggestions: ['💰 Request Ad Strategy', '📈 Calculate Growth ROI', '📞 Contact Agency']
  },
  {
    keywords: ['price', 'pricing', 'rate', 'rates', 'cost', 'fee', 'package', 'packages', 'budget', 'quote', 'estimate', 'how much'],
    reply: 'Our pricing is completely customized to match your growth goals and scale. We provide starter audit packages, monthly growth retainers, and full-funnel enterprise marketing. You can open our interactive Quote Calculator right now to pick your desired services!',
    action: 'open_quote',
    actionText: '📋 Open Quote Calculator',
    suggestions: ['📋 Open Quote Form', '📈 Try ROI Calculator', '📞 Free Consultation']
  },
  {
    keywords: ['contact', 'phone', 'call', 'email', 'number', 'address', 'office', 'location', 'reach', 'talk'],
    reply: 'You can reach the Opticore Digitals team directly:\n\n📞 Phone: +1 (555) 234-5678\n📧 Email: info@opticoredigitals.com\n📍 Office: 120 Innovation Way, Suite 400\n🕒 Hours: Monday - Friday: 9:00 AM - 6:00 PM EST\n\nOr submit a consultation inquiry directly on our website form below!',
    suggestions: ['📋 Request a Quote', '💼 View Services', '📞 Call Now']
  },
  {
    keywords: ['framework', 'aida', 'funnel', 'strategy', 'process', 'how it works'],
    reply: 'We deploy proven marketing methodologies:\n\n1. 🎯 AIDA Framework (Attention ➔ Interest ➔ Desire ➔ Action)\n2. 🔄 4-Stage Lifecycle Funnel (Awareness ➔ Consideration ➔ Conversion ➔ Retention)\n3. 📊 Data-Driven Engine (Continuous optimization with closed-loop attribution)',
    suggestions: ['💼 View Frameworks', '💰 Custom Strategy', '📞 Talk to Team']
  },
  {
    keywords: ['cat', 'robot', 'who are you', 'what are you', 'mascot', 'avatar', 'name'],
    reply: 'I am the Opticore Digitals AI Mascot Assistant! 🤖🐱 You can toggle between RoboMarketer and DigiCat anytime using the mascot switch button in the header!',
    suggestions: ['💼 What services do you offer?', '💰 Quote & Pricing', '📞 Contact Details']
  }
];

app.post('/api/chat', (req, res) => {
  const { message = '' } = req.body;
  const cleanMsg = message.toLowerCase().trim();

  if (!cleanMsg) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  // Find matching knowledge item
  let matchedItem = chatKnowledgeBase.find(item => 
    item.keywords.some(kw => cleanMsg.includes(kw))
  );

  let reply = '';
  let suggestions = ['🚀 Services Overview', '💰 Pricing & Quotes', '📈 SEO Strategies', '📞 Contact Agency'];
  let action = null;
  let actionText = null;

  if (matchedItem) {
    reply = matchedItem.reply;
    suggestions = matchedItem.suggestions || suggestions;
    action = matchedItem.action || null;
    actionText = matchedItem.actionText || null;
  } else {
    // Helpful English fallback
    reply = "I'm here to help you explore Opticore Digitals! You can ask me about our SEO rankings, Meta & Google Ads, custom web design, or customized pricing packages. What would you like to know?";
  }

  return res.status(200).json({
    success: true,
    reply,
    suggestions,
    action,
    actionText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
});

// ------------------------------------------
// 4. CATCH-ALL 404 HANDLER (Slide 36)
// ------------------------------------------
app.use(notFoundHandler);

// ------------------------------------------
// 5. GLOBAL ERROR HANDLER (Slide 35)
// ------------------------------------------
app.use(globalErrorHandler);

// ------------------------------------------
// 6. START SERVER (Slide 21)
// ------------------------------------------
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Opticore Express Server running!`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`===============================================`);
});
