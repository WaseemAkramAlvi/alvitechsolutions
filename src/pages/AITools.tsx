import React from 'react';
import { motion } from 'motion/react';
import {
    FileText,
    Sparkles,
    ArrowRight,
    Wand2,
    Zap,
    Scissors
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/src/lib/utils';

const tools = [
    {
        id: 'cv-builder',
        name: 'AI CV Builder',
        description: 'Create a professional resume with AI-powered content suggestions and real-time preview.',
        icon: FileText,
        color: 'bg-blue-500',
        link: '/cv-builder',
        badge: 'Popular'
    },
    {
        id: 'bg-remover',
        name: 'AI Background Remover',
        description: 'Remove backgrounds from your images instantly using advanced AI models.',
        icon: Scissors,
        color: 'bg-purple-500',
        link: '/ai-tools/bg-remover',
        badge: 'New'
    },
    {
        id: 'content-gen',
        name: 'AI Content Writer',
        description: 'Generate high-quality marketing copy, blog posts, and emails in seconds.',
        icon: Wand2,
        color: 'bg-emerald-500',
        link: '/ai-tools/content-writer',
        badge: 'AI Powered'
    }
];

const AITools = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <Sparkles size={14} />
                            Free AI Toolkit
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-slate-900 mb-6">
                            Supercharge Your Work with <span className="text-primary">AI Tools</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                            We've built a collection of free AI-powered tools to help you work faster and smarter. No registration required.
                        </p>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg",
                                    tool.color
                                )}>
                                    <tool.icon size={32} />
                                </div>

                                {tool.badge && (
                                    <span className="absolute top-8 right-8 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {tool.badge}
                                    </span>
                                )}

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-slate-600 mb-8 leading-relaxed">
                                    {tool.description}
                                </p>

                                <Link
                                    to={tool.link}
                                    className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all"
                                >
                                    Launch Tool
                                    <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature Highlight */}
                    <div className="mt-24 bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
                                    Powered by <span className="text-primary">Advanced AI</span>
                                </h2>
                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                    Our tools leverage the latest models from Hugging Face and Google Gemini to provide you with state-of-the-art performance directly in your browser.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                                        <Zap size={16} className="text-primary" />
                                        <span className="text-sm font-medium">Lightning Fast</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                                        <Sparkles size={16} className="text-primary" />
                                        <span className="text-sm font-medium">High Accuracy</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem]">
                                <div className="space-y-4">
                                    <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                                    <div className="pt-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse" />
                                        <div className="space-y-2 flex-1">
                                            <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                                            <div className="h-2 w-1/4 bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AITools;
