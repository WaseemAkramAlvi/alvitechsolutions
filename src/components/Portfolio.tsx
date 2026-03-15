import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Logistics Management Dashboard',
    category: 'Logistics',
    description: 'A comprehensive real-time tracking and management system for a global logistics firm.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Smart Factory IoT System',
    category: 'IoT & Automation',
    description: 'Real-time sensor monitoring and predictive maintenance for industrial manufacturing.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'AI Predictive Analytics',
    category: 'Artificial Intelligence',
    description: 'Machine learning models for sales forecasting and customer behavior analysis.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Inventory Management Software',
    category: 'Retail',
    description: 'Smart inventory tracking with automated reordering and multi-warehouse support.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Success Stories</span>
            </h2>
            <p className="text-lg text-slate-600">
              Explore some of the custom web applications we've built for our clients across various industries.
            </p>
          </div>
          <a href="#" className="text-primary font-bold flex items-center gap-2 hover:underline">
            View All Projects <ExternalLink size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-primary text-sm font-bold uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6">
                  {project.description}
                </p>
                <button className="text-slate-900 font-bold flex items-center gap-2 group/btn">
                  View Case Study
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper component for ArrowRight since it's used in Portfolio
const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

export default Portfolio;
