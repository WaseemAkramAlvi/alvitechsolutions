import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen Web Solutions
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            Transform Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Custom Web Apps</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            We build powerful web systems, <strong>AI-driven applications</strong>, and <strong>IoT solutions</strong>. We also provide professional <strong>Graphics Design</strong>, <strong>Video Editing</strong>, <strong>Digital Marketing</strong>, and <strong>Office Work</strong> solutions to help your business excel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/20 group"
            >
              Get Free Consultation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
            >
              <Play size={20} fill="currentColor" />
              View Our Work
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Scalable Tech
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
                    Grow Your Business
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
