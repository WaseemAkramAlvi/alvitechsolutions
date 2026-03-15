import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Settings, 
  Users, 
  BarChart3, 
  Brain,
  Cpu,
  FileUser,
  Palette,
  Video,
  Megaphone,
  FileSpreadsheet
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
    title: 'Digital Marketing',
    description: 'Strategic online marketing to grow your brand presence and reach more customers.',
    icon: Megaphone,
    color: 'bg-rose-500',
  },
  {
    title: 'Graphics Designing',
    description: 'Creative visual designs, logos, and branding materials that make your business stand out.',
    icon: Palette,
    color: 'bg-pink-500',
  },
  {
    title: 'Video Editing',
    description: 'Professional video editing and production for social media, ads, and corporate use.',
    icon: Video,
    color: 'bg-red-500',
  },
  {
    title: 'ERP & CRM Systems',
    description: 'Integrated systems to streamline your business workflow and customer relations.',
    icon: Settings,
    color: 'bg-purple-500',
  },
  {
    title: 'CV Making',
    description: 'Professional resume and CV writing services to help you land your dream job.',
    icon: FileUser,
    color: 'bg-emerald-500',
  },
  {
    title: 'Office Work Solutions',
    description: 'Expert solutions for Word, Excel, and PowerPoint tasks to boost your productivity.',
    icon: FileSpreadsheet,
    color: 'bg-orange-500',
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
