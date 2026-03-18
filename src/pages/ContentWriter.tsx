import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Wand2,
    Copy,
    Check,
    ChevronLeft,
    Loader2,
    Sparkles,
    Type,
    Layout,
    Mail,
    Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';

// Initialize AI client conditionally when needed

const ContentWriter = () => {
    const [prompt, setPrompt] = useState('');
    const [type, setType] = useState('blog');
    const [tone, setTone] = useState('professional');
    const [result, setResult] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateContent = async () => {
        if (!prompt) return;

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setResult("Error: Delivery of content failed because the Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
            return;
        }

        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey });
            const fullPrompt = `Write a ${tone} ${type} about: "${prompt}". Make it engaging and high-quality.`;
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: fullPrompt,
            });
            setResult(response.text || '');
        } catch (error) {
            console.error("Generation failed:", error);
            setResult("Generation failed. Please try again or check your API key.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const contentTypes = [
        { id: 'blog', name: 'Blog Post', icon: Type },
        { id: 'email', name: 'Email', icon: Mail },
        { id: 'social', name: 'Social Media', icon: Share2 },
        { id: 'ad', name: 'Ad Copy', icon: Layout }
    ];

    const tones = ['Professional', 'Creative', 'Friendly', 'Urgent', 'Informative'];

    return (
        <div className="bg-slate-50 h-full">

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Link to="/ai-tools" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4">
                            <ChevronLeft size={18} />
                            <span className="text-sm font-medium">Back to AI Tools</span>
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900">
                            AI Content <span className="text-primary">Writer</span>
                        </h1>
                        <p className="text-slate-600 mt-2">Generate high-quality copy for any purpose in seconds.</p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Controls */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <div className="space-y-6">
                                    {/* Content Type */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">Content Type</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {contentTypes.map((t) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setType(t.id)}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                                                        type === t.id
                                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                            : "bg-slate-50 text-slate-600 border-slate-100 hover:border-primary/30"
                                                    )}
                                                >
                                                    <t.icon size={16} />
                                                    {t.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tone */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">Tone of Voice</label>
                                        <div className="flex flex-wrap gap-2">
                                            {tones.map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTone(t.toLowerCase())}
                                                    className={cn(
                                                        "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                                                        tone === t.toLowerCase()
                                                            ? "bg-slate-900 text-white border-slate-900"
                                                            : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-300"
                                                    )}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Prompt */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">What should I write about?</label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="e.g. A welcome email for new subscribers to our business automation service..."
                                            rows={5}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={generateContent}
                                        disabled={isGenerating || !prompt}
                                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-50 active:scale-95"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 size={20} />
                                                Generate Content
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Result */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={18} className="text-primary" />
                                        <span className="font-bold text-slate-900">AI Generated Content</span>
                                    </div>
                                    {result && (
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
                                        >
                                            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                            {copied ? 'Copied!' : 'Copy Text'}
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 p-8 overflow-y-auto min-h-[400px]">
                                    {result ? (
                                        <div className="prose prose-slate max-w-none">
                                            <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{result}</p>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                                                <Wand2 size={32} />
                                            </div>
                                            <p className="font-medium">Your AI-generated content will appear here.</p>
                                            <p className="text-xs mt-2">Fill in the details on the left to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContentWriter;
