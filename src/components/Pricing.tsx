import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: '30,000',
    currency: 'PKR',
    description: 'Perfect for small businesses and specific project needs.',
    features: [
      '1 Web Application (30k)',
      'IoT Project + Dashboard (30k)',
      'Web + Custom Chatbot (50k)',
      'Mobile Responsive',
      'Basic Analytics',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Business',
    price: '70,000',
    currency: 'PKR',
    description: 'Ideal for growing companies needing advanced automation and integration.',
    features: [
      'Everything in Starter',
      'Advanced Business Logic',
      'Third-party Integrations',
      'Custom ERP/CRM Modules',
      '6 Months Support',
      'Priority Development',
    ],
    cta: 'Choose Business',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '100,000',
    currency: 'PKR',
    description: 'Tailored AI solutions and complex systems for large organizations.',
    features: [
      'Custom AI Models',
      'Large Scale IoT Networks',
      'Dedicated Project Manager',
      'On-premise Deployment',
      'Lifetime Support',
      'SLA Guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the package that best fits your business needs. All plans include our core quality guarantee.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative flex flex-col h-full transition-all duration-300",
                plan.popular 
                  ? "bg-slate-900 text-white shadow-2xl lg:scale-105 z-10" 
                  : "bg-white text-slate-900 border border-slate-200"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3 md:mb-4">
                  <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? "text-primary font-bold ml-1" : "text-primary font-bold ml-1"}>{plan.currency}</span>
                  <span className={plan.popular ? "text-slate-400 text-sm ml-1" : "text-slate-500 text-sm ml-1"}>Starting</span>
                </div>
                <p className={cn("text-xs md:text-sm leading-relaxed", plan.popular ? "text-slate-400" : "text-slate-500")}>
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shrink-0",
                      plan.popular ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    )}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-xs md:text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all active:scale-95",
                plan.popular
                  ? "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}>
                {plan.cta}
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
