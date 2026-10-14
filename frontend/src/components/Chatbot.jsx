import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, FileText, ArrowRight 
} from 'lucide-react';

/**
 * Opticore Smart AI Marketing Chatbot (100% English)
 * 
 * Features:
 * - Dual Mascot: Toggle between AI Robot 🤖 (RoboMarketer) & DigiCat 🐱
 * - 100% English Knowledge Base & Conversation
 * - Quick Suggestion Chips for 1-click answers
 * - Interactive action button: Triggers the "Request Quote" modal
 * - Connects to Express backend POST /api/chat with instant client fallback
 */
export default function Chatbot({ onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mascot, setMascot] = useState('robot'); // 'robot' or 'cat'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your Opticore Digitals AI Assistant. 👋\n\nHow can I help you grow your business today? Feel free to ask about our SEO services, Meta Ads, custom web design, or pricing packages!",
      timestamp: 'Just now',
      suggestions: ['🚀 Services Overview', '💰 Pricing & Quotes', '📈 SEO Strategies', '📞 Contact Agency']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Mascot switch toggle
  const toggleMascot = () => {
    setMascot(prev => (prev === 'robot' ? 'cat' : 'robot'));
  };

  // Client-side fallback knowledge base (100% English)
  const getFallbackReply = (text) => {
    const clean = text.toLowerCase();

    if (clean.includes('hello') || clean.includes('hi') || clean.includes('hey') || clean.includes('greetings')) {
      return {
        reply: "Hello! 👋 Welcome to Opticore Digitals. How can I help you scale your business today?",
        suggestions: ['🚀 Services Overview', '💰 Pricing & Quotes', '📈 SEO Strategies', '📞 Contact Agency']
      };
    }

    if (clean.includes('service') || clean.includes('offer') || clean.includes('what do you do')) {
      return {
        reply: "We provide 6 high-impact digital marketing services:\n\n1. 🔍 SEO Services (Google 1st-page rankings)\n2. 🎯 Meta & Google PPC Ads (High-ROAS paid funnels)\n3. 📱 Social Media Marketing (Account management & viral creatives)\n4. 💻 Custom Website Development (Modern, blazing-fast React apps)\n5. ✍️ Content Marketing & Copywriting\n6. 📊 Analytics & CRO (Conversion rate optimization)",
        suggestions: ['💰 Request Custom Quote', '🔍 SEO Details', '📱 Meta Ads Offers', '📞 Book Free Call']
      };
    }

    if (clean.includes('seo') || clean.includes('ranking') || clean.includes('google')) {
      return {
        reply: "Our SEO services dominate search rankings through deep technical audits, competitor keyword mapping, on-page optimization, and authoritative backlink acquisition. Our clients see an average 240% increase in high-intent organic traffic!",
        suggestions: ['💰 SEO Pricing', '💼 Other Services', '📞 Speak with SEO Expert']
      };
    }

    if (clean.includes('meta') || clean.includes('facebook') || clean.includes('instagram') || clean.includes('ppc') || clean.includes('ad')) {
      return {
        reply: "We build high-converting Meta (Facebook & Instagram) and Google ad funnels optimized for maximum Return On Ad Spend (ROAS). Everything from creative design and audience targeting to retargeting is managed by our experts!",
        suggestions: ['💰 Request Ad Strategy', '📈 Growth Calculator', '📞 Contact Agency']
      };
    }

    if (clean.includes('price') || clean.includes('pricing') || clean.includes('rate') || clean.includes('cost') || clean.includes('budget') || clean.includes('quote')) {
      return {
        reply: "Our pricing is tailored to your business scale and goals. We offer flexible plans ranging from starter audits to full-funnel enterprise growth. Click below to customize your quote!",
        action: 'open_quote',
        actionText: '📋 Open Quote Form',
        suggestions: ['📋 Open Quote Form', '📈 Try ROI Calculator', '📞 Free Consultation']
      };
    }

    if (clean.includes('contact') || clean.includes('phone') || clean.includes('email') || clean.includes('address') || clean.includes('office')) {
      return {
        reply: "You can reach Opticore Digitals directly:\n\n📞 Phone: +1 (555) 234-5678\n📧 Email: info@opticoredigitals.com\n📍 Office: 120 Innovation Way, Suite 400\n🕒 Hours: Mon - Fri: 9:00 AM - 6:00 PM EST\n\nOr submit a consultation inquiry directly on our website form!",
        suggestions: ['📋 Request a Quote', '💼 View Services', '📞 Call Now']
      };
    }

    return {
      reply: "I can answer questions regarding our digital marketing services, SEO strategies, Meta Ads, and custom pricing packages. How can I help you?",
      suggestions: ['🚀 Services Overview', '💰 Pricing & Quotes', '📈 SEO Strategies', '📞 Contact Agency']
    };
  };

  // Send message handler
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!response.ok) throw new Error('Backend responded with error');

      const data = await response.json();

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: data.reply,
            suggestions: data.suggestions || [],
            action: data.action,
            actionText: data.actionText,
            timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
    } catch {
      // Graceful instant fallback
      setTimeout(() => {
        const fallback = getFallbackReply(query);
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: fallback.reply,
            suggestions: fallback.suggestions || [],
            action: fallback.action,
            actionText: fallback.actionText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 450);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (action) => {
    if (action === 'open_quote' && onOpenQuote) {
      onOpenQuote();
    }
  };

  return (
    <div className="chatbot-root">
      {/* 1. Floating Launch Button & Tooltip (Bottom-Right) */}
      {!isOpen && (
        <div className="chatbot-launcher-container">
          {showTooltip && (
            <div className="chatbot-speech-bubble" onClick={() => setIsOpen(true)}>
              <span>Need help? Ask our {mascot === 'robot' ? 'AI Robot' : 'DigiCat'}! 👋</span>
              <button 
                type="button" 
                className="speech-close-btn" 
                onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              >
                <X size={12} />
              </button>
            </div>
          )}

          <button
            type="button"
            className="chatbot-launcher-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Marketing Assistant"
            title="Chat with AI Assistant"
          >
            {/* Mascot Icon */}
            {mascot === 'robot' ? (
              <div className="mascot-robot-icon">
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <rect x="6" y="10" width="24" height="20" rx="6" fill="#0d6efd" stroke="#ffffff" strokeWidth="2"/>
                  {/* Antenna */}
                  <line x1="18" y1="10" x2="18" y2="4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="18" cy="4" r="3" fill="#ffdd00"/>
                  {/* Eyes */}
                  <circle cx="13" cy="18" r="3.5" fill="#ffffff"/>
                  <circle cx="13" cy="18" r="1.8" fill="#012970"/>
                  <circle cx="23" cy="18" r="3.5" fill="#ffffff"/>
                  <circle cx="23" cy="18" r="1.8" fill="#012970"/>
                  {/* Cheerful Mouth */}
                  <path d="M 14 24 Q 18 27 22 24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
                  {/* Ears */}
                  <rect x="2" y="16" width="4" height="8" rx="2" fill="#3d8bfd"/>
                  <rect x="30" y="16" width="4" height="8" rx="2" fill="#3d8bfd"/>
                </svg>
              </div>
            ) : (
              <div className="mascot-cat-icon">
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  {/* Cat Face */}
                  <ellipse cx="18" cy="20" rx="13" ry="11" fill="#ff69b4" stroke="#ffffff" strokeWidth="2"/>
                  {/* Cat Ears */}
                  <polygon points="8,14 12,5 17,11" fill="#ff1493" stroke="#ffffff" strokeWidth="1.5"/>
                  <polygon points="19,11 24,5 28,14" fill="#ff1493" stroke="#ffffff" strokeWidth="1.5"/>
                  {/* Inner Ears */}
                  <polygon points="10,13 13,8 15,12" fill="#ffffff"/>
                  <polygon points="21,12 23,8 26,13" fill="#ffffff"/>
                  {/* Eyes */}
                  <circle cx="13" cy="19" r="2.8" fill="#012970"/>
                  <circle cx="14" cy="18" r="1" fill="#ffffff"/>
                  <circle cx="23" cy="19" r="2.8" fill="#012970"/>
                  <circle cx="24" cy="18" r="1" fill="#ffffff"/>
                  {/* Cute Nose & Mouth */}
                  <polygon points="17,22 19,22 18,23.5" fill="#ffffff"/>
                  <path d="M 16 24 Q 18 26 20 24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Whiskers */}
                  <line x1="6" y1="20" x2="11" y2="21" stroke="#ffffff" strokeWidth="1.2"/>
                  <line x1="6" y1="23" x2="11" y2="23" stroke="#ffffff" strokeWidth="1.2"/>
                  <line x1="25" y1="21" x2="30" y2="20" stroke="#ffffff" strokeWidth="1.2"/>
                  <line x1="25" y1="23" x2="30" y2="23" stroke="#ffffff" strokeWidth="1.2"/>
                </svg>
              </div>
            )}

            {/* Pulsing notification dot */}
            {hasUnread && <span className="chatbot-unread-dot" />}
          </button>
        </div>
      )}

      {/* 2. Interactive Chat Window Modal */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-container">
                {mascot === 'robot' ? (
                  <div className="header-mascot-badge robot">🤖</div>
                ) : (
                  <div className="header-mascot-badge cat">🐱</div>
                )}
                <span className="online-status-pulse" />
              </div>
              <div>
                <div className="chatbot-name-row">
                  <h4 className="chatbot-title">
                    {mascot === 'robot' ? 'RoboMarketer' : 'DigiCat'}
                  </h4>
                  <span className="ai-badge">AI Assistant</span>
                </div>
                <p className="chatbot-status-text">Opticore Digitals • Online</p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              {/* Mascot Switcher Toggle */}
              <button
                type="button"
                className="mascot-toggle-btn"
                onClick={toggleMascot}
                title={`Switch to ${mascot === 'robot' ? 'Cute Cat 🐱' : 'AI Robot 🤖'}`}
              >
                {mascot === 'robot' ? '🐱 Cat' : '🤖 Robot'}
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Subheader Badge */}
          <div className="chatbot-lang-bar">
            <span>✨ Ask anything about our digital marketing services!</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="chatbot-messages-body">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="chat-bot-mini-avatar">
                    {mascot === 'robot' ? '🤖' : '🐱'}
                  </div>
                )}
                
                <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <p className="chat-text" style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  
                  {/* Action button inside bot response (e.g. Open Quote) */}
                  {msg.action === 'open_quote' && (
                    <button
                      type="button"
                      className="chat-action-btn"
                      onClick={() => handleActionClick(msg.action)}
                    >
                      <FileText size={15} />
                      <span>{msg.actionText || 'Open Quote Form'}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  <span className="chat-timestamp">{msg.timestamp}</span>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="chat-suggestions-container">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="suggestion-chip"
                          onClick={() => handleSendMessage(sug)}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Animated Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble-row bot-row">
                <div className="chat-bot-mini-avatar">
                  {mascot === 'robot' ? '🤖' : '🐱'}
                </div>
                <div className="chat-bubble bot-bubble typing-bubble">
                  <div className="typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input-field"
              placeholder="Ask anything... (e.g. services, rates, SEO)"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="chatbot-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
