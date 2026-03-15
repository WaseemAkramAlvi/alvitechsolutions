import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Settings, 
  Users, 
  BarChart3, 
  Package, 
  Truck,
  Brain,
  Cpu
} from 'lucide-react';

const services = [
  {
    title: 'Custom Web Development',
    description: 'Bespoke web applications tailored to your unique business requirements and goals.',
    icon: Code2,
    color: 'bg-blue-500',
  },
  {
    title: 'AI Applications',
    description: 'Smart AI-driven solutions to automate complex tasks and provide intelligent insights.',
    icon: Brain,
    color: 'bg-indigo-600',
  },
  {
    title: 'IoT Solutions',
    description: 'Connecting hardware and software for real-time monitoring and smart device control.',
    icon: Cpu,
    color: 'bg-cyan-500',
  },
  {
    title: 'ERP Systems',
    description: 'Integrated enterprise resource planning systems to streamline your entire business workflow.',
    icon: Settings,
    color: 'bg-purple-500',
  },
  {
    title: 'CRM Systems',
    description: 'Powerful customer relationship management tools to boost sales and client satisfaction.',
    icon: Users,
    color: 'bg-indigo-500',
  },
  {
    title: 'Automation Dashboards',
    description: 'Real-time data visualization and process automation to make informed decisions.',
    icon: BarChart3,
    color: 'bg-emerald-500',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Comprehensive Solutions for <span className="text-primary">Modern Businesses</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            We provide end-to-end development services to help you automate your business processes and scale efficiently.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${service.color} rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <service.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
