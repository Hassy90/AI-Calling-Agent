import React from 'react'
import Navbar from './LandingPage/Navbar';
import Hero from './LandingPage/Hero';
import About from './LandingPage/About';
import FeaturedSection from './LandingPage/Feature';
import Services from './LandingPage/Service';
import Testimonials from './LandingPage/Testimonal';
import ContactUs from './LandingPage/ContactUs';
import Footer from './LandingPage/Footer';
import PricingSection from './LandingPage/subscription';
import PricingDetailsSection from './LandingPage/PricingSection';
import CalculatorSection from './LandingPage/CalculatorSection';
import QuoteSection from './LandingPage/QuoteSection';
import AICallAgentSection from './LandingPage/AICallAgentSection';
import PriceSection from './LandingPage/PriceSection';
import SavingsSection from './LandingPage/SavingsSection';


export default function Home() {
  return (
    <div>
      <>
        {/* Navbar at the top */}
        <Navbar />
        <main>
          <section id="home">
          <Hero/>
          </section>
          <section id="about">
            <About/>
          </section>
          <section id="feature">
            <FeaturedSection/>
          </section>
          {/* <section id="subscribtion">
            <PricingSection/>
          </section> */}
          {/* <section id="pricing">
            <PricingDetailsSection/>
          </section> */}

          <section id="ai-call-agent">
            <AICallAgentSection/>
          </section>

            <section id="price">
            <PriceSection/>
          </section>

          <section id="savings">
            <SavingsSection/>
          </section>

          {/* <section id="calculator">
            <CalculatorSection/>
          </section> */}

          <section id="quote">
            <QuoteSection/>
          </section>

          <section id="service">
            <Services/>
          </section>
          <section id="testimonal">
            <Testimonials/>
          </section>
          <section id="contactus">
            <ContactUs/>
          </section>
        </main>
         <Footer/>
      </>
    </div>
  );
};
