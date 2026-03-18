import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
    Plus,
    Trash2,
    Download,
    Printer,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Wrench,
    ChevronLeft,
    Layout,
    FileText,
    Sparkles,
    Loader2,
    Search,
    Globe,
    Link2,
    Github,
    Linkedin,
    Twitter,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { CV_TEMPLATES, CVTemplate } from '@/src/constants/cvTemplates';

interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
}

interface Education {
    id: string;
    school: string;
    degree: string;
    year: string;
}

interface SocialLink {
    id: string;
    platform: string;
    url: string;
}

interface CustomSection {
    id: string;
    title: string;
    items: string[];
}

interface CVData {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    experiences: Experience[];
    educations: Education[];
    skills: string[];
    socialLinks: SocialLink[];
    customSections: CustomSection[];
}

const CVBuilder = () => {
    const [data, setData] = useState<CVData>({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+92 300 1234567',
        address: 'Rahim Yar Khan, Pakistan',
        summary: 'Experienced professional with a strong background in web development and business automation. Passionate about creating efficient solutions that drive growth.',
        experiences: [
            {
                id: '1',
                company: 'AlviTech Solutions',
                role: 'Senior Developer',
                duration: '2022 - Present',
                description: 'Leading the development of custom ERP and CRM systems for various clients.'
            }
        ],
        educations: [
            {
                id: '1',
                school: 'University of Engineering and Technology',
                degree: 'BS Computer Science',
                year: '2018 - 2022'
            }
        ],
        skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Python'],
        socialLinks: [
            { id: '1', platform: 'LinkedIn', url: 'linkedin.com/in/johndoe' },
            { id: '2', platform: 'GitHub', url: 'github.com/johndoe' }
        ],
        customSections: [
            { id: '1', title: 'Languages', items: ['English (Fluent)', 'Urdu (Native)', 'German (Basic)'] }
        ]
    });

    const [view, setView] = useState<'selection' | 'editor'>('selection');
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>(CV_TEMPLATES[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    const categories = ['All', ...new Set(CV_TEMPLATES.map(t => t.profession.split(' ')[0]))];

    const filteredTemplates = CV_TEMPLATES.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.profession.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.profession.startsWith(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const selectedTemplate = CV_TEMPLATES.find(t => t.id === selectedTemplateId) || CV_TEMPLATES[0];

    const handleSelectTemplate = (id: string) => {
        setSelectedTemplateId(id);
        setView('editor');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const enhanceText = async (text: string, type: 'summary' | 'experience', id?: string) => {
        if (!text) return;

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            console.error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
            alert("AI features are currently unavailable because the API key is missing.");
            return;
        }

        const ai = new GoogleGenAI({ apiKey });

        const loadingId = id || type;
        setIsEnhancing(loadingId);

        try {
            const prompt = type === 'summary'
                ? `Rewrite this professional summary to be more impactful and professional: "${text}"`
                : `Rewrite this job description to be more achievement-oriented and professional: "${text}"`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });

            const enhancedText = response.text || text;

            if (type === 'summary') {
                setData(prev => ({ ...prev, summary: enhancedText }));
            } else if (id) {
                setData(prev => ({
                    ...prev,
                    experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, description: enhancedText } : exp)
                }));
            }
        } catch (error) {
            console.error("AI Enhancement failed:", error);
        } finally {
            setIsEnhancing(null);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const addExperience = () => {
        setData({
            ...data,
            experiences: [
                ...data.experiences,
                { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }
            ]
        });
    };

    const removeExperience = (id: string) => {
        setData({
            ...data,
            experiences: data.experiences.filter(exp => exp.id !== id)
        });
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        setData({
            ...data,
            experiences: data.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        });
    };

    const addEducation = () => {
        setData({
            ...data,
            educations: [
                ...data.educations,
                { id: Date.now().toString(), school: '', degree: '', year: '' }
            ]
        });
    };

    const removeEducation = (id: string) => {
        setData({
            ...data,
            educations: data.educations.filter(edu => edu.id !== id)
        });
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setData({
            ...data,
            educations: data.educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        });
    };

    const addSkill = (skill: string) => {
        if (skill && !data.skills.includes(skill)) {
            setData({ ...data, skills: [...data.skills, skill] });
        }
    };

    const removeSkill = (skill: string) => {
        setData({ ...data, skills: data.skills.filter(s => s !== skill) });
    };

    const addSocialLink = () => {
        setData({
            ...data,
            socialLinks: [...data.socialLinks, { id: Date.now().toString(), platform: '', url: '' }]
        });
    };

    const removeSocialLink = (id: string) => {
        setData({
            ...data,
            socialLinks: data.socialLinks.filter(link => link.id !== id)
        });
    };

    const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
        setData({
            ...data,
            socialLinks: data.socialLinks.map(link => link.id === id ? { ...link, [field]: value } : link)
        });
    };

    const addCustomSection = () => {
        setData({
            ...data,
            customSections: [...data.customSections, { id: Date.now().toString(), title: 'New Section', items: [] }]
        });
    };

    const removeCustomSection = (id: string) => {
        setData({
            ...data,
            customSections: data.customSections.filter(sec => sec.id !== id)
        });
    };

    const updateCustomSectionTitle = (id: string, title: string) => {
        setData({
            ...data,
            customSections: data.customSections.map(sec => sec.id === id ? { ...sec, title } : sec)
        });
    };

    const addCustomSectionItem = (sectionId: string, item: string) => {
        if (!item) return;
        setData({
            ...data,
            customSections: data.customSections.map(sec =>
                sec.id === sectionId ? { ...sec, items: [...sec.items, item] } : sec
            )
        });
    };

    const removeCustomSectionItem = (sectionId: string, itemIndex: number) => {
        setData({
            ...data,
            customSections: data.customSections.map(sec =>
                sec.id === sectionId ? { ...sec, items: sec.items.filter((_, i) => i !== itemIndex) } : sec
            )
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {view === 'selection' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Selection Header */}
                        <div className="text-center max-w-3xl mx-auto">
                            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6">
                                <ChevronLeft size={18} />
                                <span className="text-sm font-medium">Back to Home</span>
                            </Link>
                            <h1 className="text-4xl md:text-7xl font-bold font-display text-slate-900 mb-6 tracking-tight">
                                Pick Your <span className="text-primary">Perfect Style</span>
                            </h1>
                            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                                Choose from 20+ professionally crafted templates designed to pass ATS filters and impress hiring managers.
                            </p>
                        </div>

                        {/* Filters & Search */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                                            selectedCategory === cat
                                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-4 py-3 text-sm outline-none focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Template Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredTemplates.map((template, index) => (
                                <motion.div
                                    key={template.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer flex flex-col"
                                    onClick={() => handleSelectTemplate(template.id)}
                                >
                                    {/* Template Preview Mockup */}
                                    <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden p-6">
                                        <div className="w-full h-full bg-white shadow-2xl rounded-sm origin-top group-hover:scale-[1.02] transition-transform duration-700 flex">
                                            {/* Sidebar Mockup */}
                                            {template.layout === 'sidebar' && (
                                                <div className="w-1/3 h-full bg-slate-900 flex flex-col p-2 space-y-2">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 mx-auto" />
                                                    <div className="h-1 w-full bg-white/10 rounded-full" />
                                                    <div className="h-1 w-2/3 bg-white/10 rounded-full" />
                                                    <div className="mt-auto space-y-1">
                                                        <div className="h-0.5 w-full bg-white/5 rounded-full" />
                                                        <div className="h-0.5 w-full bg-white/5 rounded-full" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Main Mockup Area */}
                                            <div className="flex-1 flex flex-col">
                                                {/* Header Mockup */}
                                                <div className="h-12 w-full p-3" style={{ backgroundColor: template.layout === 'creative' ? template.color : 'transparent' }}>
                                                    <div className={cn("h-2 w-1/2 rounded-full", template.layout === 'creative' ? "bg-white/40" : "bg-slate-200")} />
                                                    <div className={cn("h-1 w-1/3 mt-1 rounded-full", template.layout === 'creative' ? "bg-white/20" : "bg-slate-100")} />
                                                </div>

                                                {/* Body Mockup */}
                                                <div className="p-3 space-y-3">
                                                    <div className="space-y-1">
                                                        <div className="h-1.5 w-1/4 bg-slate-200 rounded-full" style={{ backgroundColor: template.color + '40' }} />
                                                        <div className="h-1 w-full bg-slate-50 rounded-full" />
                                                        <div className="h-1 w-full bg-slate-50 rounded-full" />
                                                        <div className="h-1 w-3/4 bg-slate-50 rounded-full" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="h-1.5 w-1/4 bg-slate-200 rounded-full" style={{ backgroundColor: template.color + '40' }} />
                                                        <div className="h-1 w-full bg-slate-50 rounded-full" />
                                                        <div className="h-1 w-full bg-slate-50 rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                whileHover={{ scale: 1, opacity: 1 }}
                                                className="w-16 h-16 bg-primary text-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/40"
                                            >
                                                <Plus size={32} />
                                            </motion.div>
                                            <p className="text-white font-black text-xl tracking-tight uppercase italic">Use Template</p>
                                            <p className="text-white/60 text-xs mt-3 font-medium leading-relaxed">{template.description}</p>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-8 bg-white mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl",
                                                "bg-primary"
                                            )} style={{ backgroundColor: template.color }}>
                                                <template.icon size={24} />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{template.layout}</p>
                                                <div className="flex gap-1 justify-end">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{template.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{template.profession}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-300">
                                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No templates found</h3>
                                <p className="text-slate-500">Try adjusting your search or category filters.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                    className="mt-6 text-primary font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <>
                        {/* Editor View */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 no-print">
                            <div>
                                <button
                                    onClick={() => setView('selection')}
                                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4"
                                >
                                    <ChevronLeft size={18} />
                                    <span className="text-sm font-medium">Change Template</span>
                                </button>
                                <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900">
                                    Editing <span className="text-primary">{selectedTemplate.name}</span>
                                </h1>
                                <p className="text-slate-600 mt-2">Tailored for {selectedTemplate.profession} professionals.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handlePrint}
                                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                                >
                                    <Printer size={18} />
                                    Print / Save PDF
                                </button>
                            </div>
                        </div>

                        {/* Template Quick Switcher (Mini) */}
                        <div className="mb-8 no-print overflow-x-auto pb-2 scrollbar-hide">
                            <div className="flex gap-2">
                                {CV_TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplateId(t.id)}
                                        className={cn(
                                            "flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                                            selectedTemplateId === t.id
                                                ? "bg-primary text-white border-primary shadow-md"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-primary/30"
                                        )}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex md:hidden bg-white rounded-xl p-1 mb-6 border border-slate-200 no-print">
                            <button
                                onClick={() => setActiveTab('edit')}
                                className={cn(
                                    "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                                    activeTab === 'edit' ? "bg-primary text-white" : "text-slate-600"
                                )}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={cn(
                                    "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                                    activeTab === 'preview' ? "bg-primary text-white" : "text-slate-600"
                                )}
                            >
                                Preview
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            {/* Editor Side */}
                            <div className={cn(
                                "space-y-8 no-print",
                                activeTab === 'preview' ? "hidden lg:block" : "block"
                            )}>
                                {/* Personal Info */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
                                            <input
                                                type="text"
                                                value={data.address}
                                                onChange={(e) => setData({ ...data, address: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional Summary</label>
                                            <button
                                                onClick={() => enhanceText(data.summary, 'summary')}
                                                disabled={isEnhancing === 'summary'}
                                                className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded-lg transition-all disabled:opacity-50"
                                            >
                                                {isEnhancing === 'summary' ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                                AI Enhance
                                            </button>
                                        </div>
                                        <textarea
                                            value={data.summary}
                                            onChange={(e) => setData({ ...data, summary: e.target.value })}
                                            rows={4}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                                <Briefcase size={20} />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-900">Experience</h2>
                                        </div>
                                        <button
                                            onClick={addExperience}
                                            className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {data.experiences.map((exp) => (
                                            <div key={exp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                                                <button
                                                    onClick={() => removeExperience(exp.id)}
                                                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <input
                                                        placeholder="Company Name"
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                    />
                                                    <input
                                                        placeholder="Role / Title"
                                                        value={exp.role}
                                                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                    />
                                                </div>
                                                <input
                                                    placeholder="Duration (e.g. 2020 - 2022)"
                                                    value={exp.duration}
                                                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary mb-4"
                                                />
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</label>
                                                    <button
                                                        onClick={() => enhanceText(exp.description, 'experience', exp.id)}
                                                        disabled={isEnhancing === exp.id}
                                                        className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded-lg transition-all disabled:opacity-50"
                                                    >
                                                        {isEnhancing === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                                        AI Enhance
                                                    </button>
                                                </div>
                                                <textarea
                                                    placeholder="Key responsibilities and achievements..."
                                                    value={exp.description}
                                                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                    rows={3}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary resize-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                                <GraduationCap size={20} />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-900">Education</h2>
                                        </div>
                                        <button
                                            onClick={addEducation}
                                            className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {data.educations.map((edu) => (
                                            <div key={edu.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                                                <button
                                                    onClick={() => removeEducation(edu.id)}
                                                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <input
                                                        placeholder="School / University"
                                                        value={edu.school}
                                                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                    />
                                                    <input
                                                        placeholder="Degree / Field of Study"
                                                        value={edu.degree}
                                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                    />
                                                </div>
                                                <input
                                                    placeholder="Year (e.g. 2018 - 2022)"
                                                    value={edu.year}
                                                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                            <Wrench size={20} />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Skills</h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {data.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2"
                                            >
                                                {skill}
                                                <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                                                    <Trash2 size={12} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            id="skill-input"
                                            placeholder="Add a skill (e.g. React)"
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    addSkill(e.currentTarget.value);
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                const input = document.getElementById('skill-input') as HTMLInputElement;
                                                addSkill(input.value);
                                                input.value = '';
                                            }}
                                            className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                                <Globe size={20} />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-900">Social Links</h2>
                                        </div>
                                        <button
                                            onClick={addSocialLink}
                                            className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {data.socialLinks.map((link) => (
                                            <div key={link.id} className="flex gap-3 items-center group">
                                                <input
                                                    placeholder="Platform (e.g. LinkedIn)"
                                                    value={link.platform}
                                                    onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                                                    className="w-1/3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                />
                                                <input
                                                    placeholder="URL / Username"
                                                    value={link.url}
                                                    onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                />
                                                <button
                                                    onClick={() => removeSocialLink(link.id)}
                                                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Sections */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                                <Layout size={20} />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-900">Custom Sections</h2>
                                        </div>
                                        <button
                                            onClick={addCustomSection}
                                            className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        {data.customSections.map((sec) => (
                                            <div key={sec.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                                                <button
                                                    onClick={() => removeCustomSection(sec.id)}
                                                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                                <div className="mb-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Section Title</label>
                                                    <input
                                                        placeholder="e.g. Languages, Hobbies, Certifications"
                                                        value={sec.title}
                                                        onChange={(e) => updateCustomSectionTitle(sec.id, e.target.value)}
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-primary"
                                                    />
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Items</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {sec.items.map((item, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="bg-white text-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-200 flex items-center gap-2"
                                                            >
                                                                {item}
                                                                <button onClick={() => removeCustomSectionItem(sec.id, idx)} className="hover:text-red-500">
                                                                    <Trash2 size={12} />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input
                                                        id={`custom-input-${sec.id}`}
                                                        placeholder="Add item..."
                                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                addCustomSectionItem(sec.id, e.currentTarget.value);
                                                                e.currentTarget.value = '';
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const input = document.getElementById(`custom-input-${sec.id}`) as HTMLInputElement;
                                                            addCustomSectionItem(sec.id, input.value);
                                                            input.value = '';
                                                        }}
                                                        className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Preview Side */}
                            <div className={cn(
                                "sticky top-24",
                                activeTab === 'edit' ? "hidden lg:block" : "block"
                            )}>
                                <div
                                    id="cv-preview"
                                    ref={previewRef}
                                    className={cn(
                                        "bg-white shadow-2xl rounded-none md:rounded-lg overflow-hidden min-h-[1122px] w-full max-w-[794px] mx-auto print:shadow-none print:m-0 print:rounded-none",
                                        selectedTemplate.fontFamily
                                    )}
                                >
                                    {/* Template Layouts */}
                                    {selectedTemplate.layout === 'sidebar' ? (
                                        <div className="flex min-h-[1122px]">
                                            {/* Sidebar */}
                                            <div className="w-1/3 bg-slate-900 text-white p-8 space-y-8">
                                                <div className="text-center">
                                                    <h1 className="text-2xl font-bold mb-2 uppercase tracking-tight">{data.name}</h1>
                                                    <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-white/10 pb-2">Contact</h3>
                                                    <div className="space-y-3 text-[11px] text-slate-300">
                                                        <div className="flex items-center gap-2">
                                                            <Mail size={12} className="text-primary" />
                                                            <span className="break-all">{data.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Phone size={12} className="text-primary" />
                                                            <span>{data.phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin size={12} className="text-primary" />
                                                            <span>{data.address}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {data.socialLinks.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-white/10 pb-2">Social</h3>
                                                        <div className="space-y-3 text-[11px] text-slate-300">
                                                            {data.socialLinks.map((link) => (
                                                                <div key={link.id} className="flex items-center gap-2">
                                                                    <Link2 size={12} className="text-primary" />
                                                                    <span className="break-all">{link.platform}: {link.url}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {data.skills.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-white/10 pb-2">Skills</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {data.skills.map((skill) => (
                                                                <span key={skill} className="bg-white/10 px-2 py-1 rounded text-[10px] font-medium">{skill}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {data.educations.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-white/10 pb-2">Education</h3>
                                                        <div className="space-y-4">
                                                            {data.educations.map((edu) => (
                                                                <div key={edu.id}>
                                                                    <p className="font-bold text-xs">{edu.degree}</p>
                                                                    <p className="text-[10px] text-slate-400">{edu.school}</p>
                                                                    <p className="text-[10px] text-primary mt-1">{edu.year}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {data.customSections.map((sec) => (
                                                    <div key={sec.id} className="space-y-4">
                                                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-white/10 pb-2">{sec.title}</h3>
                                                        <div className="space-y-2">
                                                            {sec.items.map((item, idx) => (
                                                                <p key={idx} className="text-[11px] text-slate-300">{item}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Main Content */}
                                            <div className="flex-1 p-12 space-y-10">
                                                <section>
                                                    <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mb-4">Summary</h2>
                                                    <p className="text-slate-600 leading-relaxed text-sm">{data.summary}</p>
                                                </section>

                                                <section>
                                                    <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mb-6">Experience</h2>
                                                    <div className="space-y-8">
                                                        {data.experiences.map((exp) => (
                                                            <div key={exp.id}>
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <h3 className="font-bold text-slate-900">{exp.role}</h3>
                                                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">{exp.company}</p>
                                                                    </div>
                                                                    <span className="text-[10px] font-bold text-slate-500">{exp.duration}</span>
                                                                </div>
                                                                <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    ) : selectedTemplate.layout === 'creative' ? (
                                        <div>
                                            <div className="p-12 text-center" style={{ backgroundColor: selectedTemplate.color }}>
                                                <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">{data.name}</h1>
                                                <div className="flex justify-center gap-6 text-white/80 text-xs font-bold uppercase tracking-widest">
                                                    <span>{data.email}</span>
                                                    <span>•</span>
                                                    <span>{data.phone}</span>
                                                </div>
                                                {data.socialLinks.length > 0 && (
                                                    <div className="flex justify-center gap-4 mt-4 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                                        {data.socialLinks.map((link) => (
                                                            <span key={link.id}>{link.platform}: {link.url}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-12 grid grid-cols-12 gap-12">
                                                <div className="col-span-8 space-y-12">
                                                    <section>
                                                        <h2 className="text-2xl font-black text-slate-900 uppercase italic mb-6" style={{ color: selectedTemplate.color }}>Experience</h2>
                                                        <div className="space-y-10">
                                                            {data.experiences.map((exp) => (
                                                                <div key={exp.id} className="relative pl-6 border-l-4" style={{ borderColor: selectedTemplate.color }}>
                                                                    <div className="mb-2">
                                                                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                                                        <p className="font-black text-sm uppercase tracking-wider" style={{ color: selectedTemplate.color }}>{exp.company}</p>
                                                                        <p className="text-xs font-bold text-slate-400 mt-1">{exp.duration}</p>
                                                                    </div>
                                                                    <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                </div>

                                                <div className="col-span-4 space-y-12">
                                                    <section>
                                                        <h2 className="text-lg font-black text-slate-900 uppercase italic mb-4" style={{ color: selectedTemplate.color }}>Skills</h2>
                                                        <div className="flex flex-wrap gap-2">
                                                            {data.skills.map((skill) => (
                                                                <span key={skill} className="bg-slate-900 text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider">{skill}</span>
                                                            ))}
                                                        </div>
                                                    </section>

                                                    <section>
                                                        <h2 className="text-lg font-black text-slate-900 uppercase italic mb-4" style={{ color: selectedTemplate.color }}>Education</h2>
                                                        <div className="space-y-6">
                                                            {data.educations.map((edu) => (
                                                                <div key={edu.id}>
                                                                    <p className="font-bold text-sm text-slate-900">{edu.degree}</p>
                                                                    <p className="text-xs text-slate-500">{edu.school}</p>
                                                                    <p className="text-[10px] font-bold mt-1" style={{ color: selectedTemplate.color }}>{edu.year}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>

                                                    {data.customSections.map((sec) => (
                                                        <section key={sec.id}>
                                                            <h2 className="text-lg font-black text-slate-900 uppercase italic mb-4" style={{ color: selectedTemplate.color }}>{sec.title}</h2>
                                                            <div className="space-y-2">
                                                                {sec.items.map((item, idx) => (
                                                                    <p key={idx} className="text-sm text-slate-600">{item}</p>
                                                                ))}
                                                            </div>
                                                        </section>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Default / Modern / Classic Layout */}
                                            <div className={cn(
                                                "p-12",
                                                selectedTemplate.layout === 'modern' ? "bg-slate-50 border-b-8" : "bg-white border-b-2",
                                            )} style={{ borderColor: selectedTemplate.color }}>
                                                <h1 className="text-4xl font-bold mb-4 tracking-tight uppercase" style={{ color: selectedTemplate.layout === 'modern' ? selectedTemplate.color : '#0f172a' }}>{data.name}</h1>
                                                <div className="flex flex-wrap gap-6 text-slate-500 text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Mail size={14} style={{ color: selectedTemplate.color }} />
                                                        <span>{data.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={14} style={{ color: selectedTemplate.color }} />
                                                        <span>{data.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={14} style={{ color: selectedTemplate.color }} />
                                                        <span>{data.address}</span>
                                                    </div>
                                                </div>
                                                {data.socialLinks.length > 0 && (
                                                    <div className="flex flex-wrap gap-4 mt-4 text-slate-400 text-xs font-medium">
                                                        {data.socialLinks.map((link) => (
                                                            <div key={link.id} className="flex items-center gap-2">
                                                                <Link2 size={12} style={{ color: selectedTemplate.color }} />
                                                                <span>{link.platform}: {link.url}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-12 space-y-10">
                                                {/* Summary */}
                                                {data.summary && (
                                                    <section>
                                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 w-fit pb-1 mb-4" style={{ borderColor: selectedTemplate.color }}>Summary</h2>
                                                        <p className="text-slate-600 leading-relaxed text-sm">{data.summary}</p>
                                                    </section>
                                                )}

                                                {/* Experience */}
                                                {data.experiences.length > 0 && (
                                                    <section>
                                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 w-fit pb-1 mb-6" style={{ borderColor: selectedTemplate.color }}>Experience</h2>
                                                        <div className="space-y-8">
                                                            {data.experiences.map((exp) => (
                                                                <div key={exp.id}>
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <div>
                                                                            <h3 className="font-bold text-slate-900">{exp.role}</h3>
                                                                            <p className="font-bold text-xs uppercase tracking-wider" style={{ color: selectedTemplate.color }}>{exp.company}</p>
                                                                        </div>
                                                                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{exp.duration}</span>
                                                                    </div>
                                                                    <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Education */}
                                                {data.educations.length > 0 && (
                                                    <section>
                                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 w-fit pb-1 mb-6" style={{ borderColor: selectedTemplate.color }}>Education</h2>
                                                        <div className="space-y-6">
                                                            {data.educations.map((edu) => (
                                                                <div key={edu.id} className="flex justify-between items-start">
                                                                    <div>
                                                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                                                        <p className="text-slate-600 text-sm">{edu.school}</p>
                                                                    </div>
                                                                    <span className="text-xs font-bold text-slate-500">{edu.year}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Skills */}
                                                {data.skills.length > 0 && (
                                                    <section>
                                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 w-fit pb-1 mb-4" style={{ borderColor: selectedTemplate.color }}>Skills</h2>
                                                        <div className="flex flex-wrap gap-2">
                                                            {data.skills.map((skill) => (
                                                                <span
                                                                    key={skill}
                                                                    className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {/* Custom Sections */}
                                                {data.customSections.map((sec) => (
                                                    <section key={sec.id}>
                                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 w-fit pb-1 mb-4" style={{ borderColor: selectedTemplate.color }}>{sec.title}</h2>
                                                        <div className="grid md:grid-cols-2 gap-2">
                                                            {sec.items.map((item, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedTemplate.color }} />
                                                                    {item}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 text-center text-slate-400 text-xs no-print">
                                    Tip: Use Chrome's "Save as PDF" feature in the print dialog for best results.
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body { 
              background: white !important; 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          .min-h-screen { 
              padding: 0 !important; 
              margin: 0 !important; 
              background: transparent !important;
          }
          #cv-preview { 
            box-shadow: none !important; 
            margin: 0 !important; 
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            padding: 0 !important;
          }
          /* Ensure backgrounds print correctly */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            margin: 0;
            size: A4 portrait;
          }
        }
      `}</style>
        </div>
    );
};

export default CVBuilder;
