import React from 'react';
import { motion } from 'motion/react';
import { BriefcaseBusiness, ArrowRight, CheckCircle2 } from 'lucide-react';
import cvSample from '../assets/CV_sample.png';

const CVBuilderPromo = () => {
    const handleViewPackages = () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                <BriefcaseBusiness size={14} />
                                Built for Business Owners
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-6 leading-tight">
                                Build a High-Converting <span className="text-primary">Business Presence</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                From websites to branding and digital campaigns, we help businesses and client-facing teams launch a premium online presence that wins trust and drives sales.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    'Conversion-focused website design',
                                    'Brand strategy for client trust',
                                    'Mobile-first UI for all devices',
                                    'Fast delivery with clear milestones'
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 size={20} className="text-primary" />
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={handleViewPackages}
                                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                View Business Packages
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-3xl shadow-2xl">
                                <img
                                    src={cvSample}
                                    alt="Business project preview"
                                    className="rounded-2xl w-full h-auto shadow-lg"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <div className="text-slate-900 font-bold">Client Ready</div>
                                        <div className="text-slate-500 text-sm">Designed for growth-focused businesses</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CVBuilderPromo;
