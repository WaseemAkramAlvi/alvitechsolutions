import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import WhyChooseUs from '../components/WhyChooseUs';
import CVBuilderPromo from '../components/CVBuilderPromo';
import CTA from '../components/CTA';
import Contact from '../components/Contact';
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Services />
        <CVBuilderPromo />
        <WhyChooseUs />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <CTA />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
