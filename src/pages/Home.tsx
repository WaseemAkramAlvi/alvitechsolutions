import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import WhyChooseUs from '../components/WhyChooseUs';
import CTA from '../components/CTA';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';

type HomeProps = {
  onOpenOrderModal: (service?: string) => void;
};

const Home = ({ onOpenOrderModal }: HomeProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero onOpenOrderModal={onOpenOrderModal} />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Pricing onOpenOrderModal={onOpenOrderModal} />
      <FAQ />
      <CTA onOpenOrderModal={onOpenOrderModal} />
      <Contact />
    </div>
  );
};

export default Home;
