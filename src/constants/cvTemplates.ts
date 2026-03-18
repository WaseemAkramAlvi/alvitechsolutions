import {
    Briefcase,
    Code,
    Database,
    Palette,
    TrendingUp,
    DollarSign,
    Stethoscope,
    GraduationCap,
    Scale,
    Building2,
    Users,
    PenTool,
    Utensils,
    Home,
    Dumbbell,
    Camera,
    Heart,
    ShieldCheck,
    Truck,
    HardHat
} from 'lucide-react';

export interface CVTemplate {
    id: string;
    name: string;
    profession: string;
    icon: any;
    color: string;
    fontFamily: string;
    layout: 'classic' | 'modern' | 'sidebar' | 'creative';
    description: string;
}

export const CV_TEMPLATES: CVTemplate[] = [
    {
        id: 'software-eng',
        name: 'Tech Minimalist',
        profession: 'Software Engineer',
        icon: Code,
        color: '#0ea5e9',
        fontFamily: 'font-mono',
        layout: 'modern',
        description: 'Clean, code-inspired layout emphasizing technical skills and GitHub projects.'
    },
    {
        id: 'data-science',
        name: 'Analytical Pro',
        profession: 'Data Scientist',
        icon: Database,
        color: '#6366f1',
        fontFamily: 'font-sans',
        layout: 'sidebar',
        description: 'Structured layout with dedicated sections for tools, languages, and research.'
    },
    {
        id: 'designer',
        name: 'Creative Portfolio',
        profession: 'Graphic Designer',
        icon: Palette,
        color: '#ec4899',
        fontFamily: 'font-sans',
        layout: 'creative',
        description: 'Bold typography and visual hierarchy to showcase your design aesthetic.'
    },
    {
        id: 'marketing',
        name: 'Growth Hacker',
        profession: 'Marketing Manager',
        icon: TrendingUp,
        color: '#f59e0b',
        fontFamily: 'font-sans',
        layout: 'modern',
        description: 'Focuses on metrics, KPIs, and campaign success stories.'
    },
    {
        id: 'sales',
        name: 'Deal Closer',
        profession: 'Sales Executive',
        icon: DollarSign,
        color: '#10b981',
        fontFamily: 'font-sans',
        layout: 'classic',
        description: 'Professional and results-driven, highlighting revenue targets and achievements.'
    },
    {
        id: 'project-mgr',
        name: 'Agile Leader',
        profession: 'Project Manager',
        icon: Briefcase,
        color: '#8b5cf6',
        fontFamily: 'font-sans',
        layout: 'sidebar',
        description: 'Emphasizes leadership, methodology, and cross-functional coordination.'
    },
    {
        id: 'medical',
        name: 'Clinical Standard',
        profession: 'Doctor',
        icon: Stethoscope,
        color: '#ef4444',
        fontFamily: 'font-serif',
        layout: 'classic',
        description: 'Traditional and authoritative, perfect for medical CVs and certifications.'
    },
    {
        id: 'nurse',
        name: 'Caregiver Pro',
        profession: 'Nurse',
        icon: Heart,
        color: '#f43f5e',
        fontFamily: 'font-sans',
        layout: 'modern',
        description: 'Clean and organized, focusing on patient care and specialized training.'
    },
    {
        id: 'educator',
        name: 'Academic Mentor',
        profession: 'Teacher',
        icon: GraduationCap,
        color: '#3b82f6',
        fontFamily: 'font-serif',
        layout: 'classic',
        description: 'Clear hierarchy for education history, publications, and teaching philosophy.'
    },
    {
        id: 'finance',
        name: 'Fiscal Expert',
        profession: 'Accountant',
        icon: Building2,
        color: '#475569',
        fontFamily: 'font-sans',
        layout: 'classic',
        description: 'Precise and professional, emphasizing compliance and financial reporting.'
    },
    {
        id: 'legal',
        name: 'Legal Counsel',
        profession: 'Lawyer',
        icon: Scale,
        color: '#1e293b',
        fontFamily: 'font-serif',
        layout: 'classic',
        description: 'Formal and sophisticated, tailored for law firms and corporate legal roles.'
    },
    {
        id: 'hr',
        name: 'People First',
        profession: 'HR Manager',
        icon: Users,
        color: '#d946ef',
        fontFamily: 'font-sans',
        layout: 'sidebar',
        description: 'Warm and approachable, highlighting recruitment and culture building.'
    },
    {
        id: 'writer',
        name: 'Editorial Edge',
        profession: 'Content Writer',
        icon: PenTool,
        color: '#14b8a6',
        fontFamily: 'font-serif',
        layout: 'modern',
        description: 'Focuses on readability and storytelling, perfect for copywriters.'
    },
    {
        id: 'chef',
        name: 'Culinary Master',
        profession: 'Chef',
        icon: Utensils,
        color: '#f97316',
        fontFamily: 'font-sans',
        layout: 'creative',
        description: 'Visual and dynamic, highlighting kitchen experience and specialties.'
    },
    {
        id: 'real-estate',
        name: 'Property Pro',
        profession: 'Real Estate Agent',
        icon: Home,
        color: '#06b6d4',
        fontFamily: 'font-sans',
        layout: 'modern',
        description: 'Modern and trustworthy, focusing on sales history and market expertise.'
    },
    {
        id: 'fitness',
        name: 'Active Coach',
        profession: 'Fitness Trainer',
        icon: Dumbbell,
        color: '#fbbf24',
        fontFamily: 'font-sans',
        layout: 'creative',
        description: 'High-energy layout focusing on certifications and client results.'
    },
    {
        id: 'photographer',
        name: 'Visual Artist',
        profession: 'Photographer',
        icon: Camera,
        color: '#000000',
        fontFamily: 'font-sans',
        layout: 'sidebar',
        description: 'Minimalist layout that lets your portfolio links and equipment shine.'
    },
    {
        id: 'security',
        name: 'Safety First',
        profession: 'Security Specialist',
        icon: ShieldCheck,
        color: '#1e40af',
        fontFamily: 'font-sans',
        layout: 'classic',
        description: 'Solid and reliable, emphasizing training and risk management.'
    },
    {
        id: 'logistics',
        name: 'Supply Chain Pro',
        profession: 'Logistics Manager',
        icon: Truck,
        color: '#4d7c0f',
        fontFamily: 'font-sans',
        layout: 'modern',
        description: 'Efficient layout focusing on operations and distribution success.'
    },
    {
        id: 'construction',
        name: 'Site Expert',
        profession: 'Civil Engineer',
        icon: HardHat,
        color: '#7c2d12',
        fontFamily: 'font-sans',
        layout: 'classic',
        description: 'Practical and structured, highlighting project scale and technical specs.'
    }
];
