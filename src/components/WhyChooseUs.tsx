import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Headphones, Zap } from 'lucide-react';

const stats = [
  { label: 'Projects Delivered', value: 100, suffix: '+', icon: Award },
  { label: 'Client Satisfaction', value: 95, suffix: '%', icon: Users },
  { label: 'Support Availability', value: 24, suffix: '/7', icon: Headphones },
  { label: 'Development Speed', value: 40, suffix: '% Faster', icon: Zap },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 md:mb-8">
              Why Businesses <span className="text-primary">Choose AlviTech</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed">
              We don't just write code; we build strategic assets for your business. Our focus is on creating value through automation and superior user experiences.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {[
                'Expert team with 10+ years of experience',
                'Cutting-edge technology stack (React, Node, Cloud)',
                'Agile development methodology',
                'Transparent communication and reporting'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} className="md:w-3.5 md:h-3.5" />
                  </div>
                  <span className="font-medium text-slate-700 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Check = ({ size, strokeWidth, className }: { size: number, strokeWidth: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default WhyChooseUs;
