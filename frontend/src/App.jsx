import React, { useState } from 'react';
import TopTicker from './components/TopTicker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRibbon from './components/StatsRibbon';
import Services from './components/Services';
import MiddleOffersTicker from './components/MiddleOffersTicker';
import Frameworks from './components/Frameworks';
import Process from './components/Process';
import RoiCalculator from './components/RoiCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';
import PinkBalloonCursor from './components/PinkBalloonCursor';
import Chatbot from './components/Chatbot';

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenQuote = (serviceName = '') => {
    setSelectedService(serviceName || '');
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setSelectedService('');
  };

  return (
    <div className="app-container">
      {/* Loose Floating Shocking Pink Balloon Sketch Cursor */}
      <PinkBalloonCursor />

      {/* Sticky Header */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Prominent Full-Width Announcement Strip (Pati) directly below Header */}
      <TopTicker />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenQuote={() => handleOpenQuote()} />

        {/* Live Metrics Ribbon */}
        <StatsRibbon />

        {/* Core Services Section */}
        <Services onSelectServiceForQuote={(srv) => handleOpenQuote(srv)} />

        {/* Middle Running Service Offers Strip (Darmian Wali Pati) */}
        <MiddleOffersTicker />

        {/* Interactive Frameworks Section (AIDA, Funnel, Data-Driven) */}
        <Frameworks />

        {/* Digital Marketing Process (4 Steps) */}
        <Process />

        {/* Interactive Growth & ROI Calculator */}
        <RoiCalculator onOpenQuote={() => handleOpenQuote()} />

        {/* Why Choose Opticore Digitals */}
        <WhyChooseUs />

        {/* Client Testimonials Section */}
        <Testimonials />

        {/* Working Consultation Contact Section */}
        <ContactSection />
      </main>

      {/* Multi-column Footer */}
      <Footer />

      {/* Interactive Request Quote Modal Popup */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialService={selectedService}
      />

      {/* Floating AI Marketing Assistant Chatbot (Robot / Cat) */}
      <Chatbot onOpenQuote={handleOpenQuote} />
    </div>
  );
}

export default App;
