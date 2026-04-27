import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import cvSample from '../assets/CV_sample.png';

const CVBuilderPromo = () => {
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
                                <FileText size={14} />
                                Free Tool for Visitors
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-6 leading-tight">
                                Build Your Professional <span className="text-primary">CV in Minutes</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Stand out from the crowd with our free, professional CV builder. Designed to help you land your dream job with a high-impact resume.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    'Real-time live preview',
                                    'Professional ATS-friendly templates',
                                    'Easy to use editor',
                                    'Download as PDF instantly'
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 size={20} className="text-primary" />
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/cv-builder"
                                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                Start Building for Free
                                <ArrowRight size={20} />
                            </Link>
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
                                    alt="CV Builder Preview"
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
                                        <div className="text-slate-900 font-bold">100% Free</div>
                                        <div className="text-slate-500 text-sm">No registration required</div>
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
