import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

type HeroProps = {
  onOpenOrderModal: (service?: string) => void;
};

const Hero = ({ onOpenOrderModal }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-secondary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-slate-200/50 border border-white/70">
            <Sparkles size={14} />
            Premium Digital Services
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Transform Your Business with Modern Digital Solutions
          </h1>

          <p className="text-lg text-slate-700 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            We create modern websites, branding, and digital experiences that help businesses grow faster, look premium, and convert more customers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button
              onClick={() => onOpenOrderModal('Website Design')}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full font-extrabold flex items-center justify-center gap-3 hover:opacity-95 transition-all hover:shadow-2xl shadow-primary/20 group"
            >
              Order Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto bg-white text-slate-900 px-10 py-4 rounded-full font-extrabold flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
            >
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Conversion Focused
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Mobile First
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden sm:block"
        >
          {/* Mockup Illustration */}
          <div className="relative z-10 glass rounded-3xl p-3 md:p-4 shadow-2xl border-white/40">
            <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-[4/3] relative">
              {/* Dashboard UI Simulation */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="w-24 md:w-32 h-3 md:h-4 bg-slate-700 rounded-full" />
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-slate-700 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="h-16 md:h-24 bg-primary/20 rounded-xl border border-primary/30 p-3 flex flex-col justify-between">
                    <span className="text-[8px] md:text-[10px] text-primary/70 font-bold uppercase tracking-wider">Projects</span>
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-primary">120+</div>
                      <div className="text-[7px] md:text-[9px] text-primary/60">Completed</div>
                    </div>
                  </div>
                  <div className="h-16 md:h-24 bg-slate-800 rounded-xl p-3 flex flex-col justify-between">
                    <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clients</span>
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-white">85+</div>
                      <div className="text-[7px] md:text-[9px] text-slate-500">Worldwide</div>
                    </div>
                  </div>
                  <div className="h-16 md:h-24 bg-slate-800 rounded-xl p-3 flex flex-col justify-between">
                    <span className="text-[8px] md:text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Growth</span>
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-emerald-400">+120%</div>
                      <div className="text-[7px] md:text-[9px] text-slate-500">This Year</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-slate-800/50 rounded-xl p-3 md:p-4 relative">
                  {/* Growth label */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[7px] md:text-[9px] font-bold px-2 py-0.5 rounded-full">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 7L3.5 2.5L5.5 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Growth Dashboard
                  </div>

                  {/* Bars - strictly upward */}
                  <div className="w-full h-full flex items-end gap-1 md:gap-2">
                    {[20, 32, 45, 56, 68, 80, 92].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 + 1, duration: 0.4 }}
                          className="text-[8px] md:text-[10px] text-primary font-bold mb-0.5"
                        >
                          {h}%
                        </motion.span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                          className="w-full bg-primary/40 rounded-t-sm"
                        />
                      </div>
                    ))}
                  </div>

                  {/* SVG Trend Line Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 280 120"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <motion.polyline
                      points="20,115 60,100 100,82 140,62 180,42 220,24 260,8"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Dots at each data point */}
                    {[
                      [20, 115], [60, 100], [100, 82], [140, 62], [180, 42], [220, 24], [260, 8]
                    ].map(([x, y], i) => (
                      <motion.circle
                        key={i}
                        cx={x} cy={y} r="3"
                        fill="#10b981"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + i * 0.2, duration: 0.3 }}
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements - Hidden on small mobile */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass p-3 md:p-4 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-[8px] md:text-[10px] text-slate-500 uppercase font-bold">Automation</div>
                <div className="text-xs md:text-sm font-bold">Process Optimized</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass p-3 md:p-4 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="text-xl md:text-2xl font-bold text-primary">+120%</div>
            <div className="text-[10px] md:text-xs text-slate-500 font-medium">Efficiency Growth</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
