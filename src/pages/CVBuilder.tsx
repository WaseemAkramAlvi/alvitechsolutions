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
    FileText
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

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

interface CVData {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    experiences: Experience[];
    educations: Education[];
    skills: string[];
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
        skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Python']
    });

    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const previewRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 no-print">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4">
                            <ChevronLeft size={18} />
                            <span className="text-sm font-medium">Back to Home</span>
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900">
                            Professional <span className="text-primary">CV Builder</span>
                        </h1>
                        <p className="text-slate-600 mt-2">Create a high-impact resume in minutes.</p>
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

                {/* Tabs for Mobile */}
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
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional Summary</label>
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
                    </div>

                    {/* Preview Side */}
                    <div className={cn(
                        "sticky top-24",
                        activeTab === 'edit' ? "hidden lg:block" : "block"
                    )}>
                        <div
                            id="cv-preview"
                            ref={previewRef}
                            className="bg-white shadow-2xl rounded-none md:rounded-lg overflow-hidden min-h-[1122px] w-full max-w-[794px] mx-auto print:shadow-none print:m-0 print:rounded-none"
                        >
                            {/* CV Header */}
                            <div className="bg-slate-900 text-white p-12">
                                <h1 className="text-4xl font-bold mb-4 tracking-tight uppercase">{data.name}</h1>
                                <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-primary" />
                                        <span>{data.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-primary" />
                                        <span>{data.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-primary" />
                                        <span>{data.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-12 space-y-10">
                                {/* Summary */}
                                {data.summary && (
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mb-4">Summary</h2>
                                        <p className="text-slate-600 leading-relaxed text-sm">{data.summary}</p>
                                    </section>
                                )}

                                {/* Experience */}
                                {data.experiences.length > 0 && (
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
                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mb-6">Education</h2>
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
                                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mb-4">Skills</h2>
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
                            </div>
                        </div>

                        <div className="mt-6 text-center text-slate-400 text-xs no-print">
                            Tip: Use Chrome's "Save as PDF" feature in the print dialog for best results.
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .min-h-screen { padding: 0 !important; margin: 0 !important; }
          #cv-preview { 
            box-shadow: none !important; 
            margin: 0 !important; 
            width: 100% !important;
            max-width: none !important;
            border: none !important;
          }
          @page {
            margin: 0;
            size: auto;
          }
        }
      `}</style>
        </div>
    );
};

export default CVBuilder;
