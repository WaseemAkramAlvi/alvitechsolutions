import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.svg';

type NavbarProps = {
  onOpenOrderModal: (service?: string) => void;
};

const Navbar = ({ onOpenOrderModal }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavLinkClick = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 print:hidden',
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
          <img src={logo} alt="AlviTech Solutions" className="h-10 w-auto group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavLinkClick(link.href.slice(1))}
              className={cn(
                'text-sm font-medium transition-colors',
                isHome ? 'text-slate-600 hover:text-primary' : 'text-slate-600 hover:text-primary'
              )}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/ai-tools"
            className={cn(
              "flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all active:scale-95",
              location.pathname.startsWith('/ai-tools') || location.pathname === '/cv-builder'
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
            )}
          >
            <Sparkles size={16} className={location.pathname.startsWith('/ai-tools') || location.pathname === '/cv-builder' ? "animate-pulse" : ""} />
            Free AI Tools
          </Link>
          <Link
            to="/cv-builder"
            className={cn(
              "flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all active:scale-95",
              location.pathname === '/cv-builder'
                ? "bg-secondary text-white shadow-lg shadow-secondary/25"
                : "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/25"
            )}
          >
            <FileText size={16} className={location.pathname === '/cv-builder' ? "animate-pulse" : ""} />
            CV Making
          </Link>
          <button
            onClick={() => onOpenOrderModal('Website Design')}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { handleNavLinkClick(link.href.slice(1))(e as any); setIsMobileMenuOpen(false); }}
                  className="text-lg font-medium text-slate-600 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/ai-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-lg font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors py-3 rounded-xl border border-primary/20 hover:border-primary shadow-sm"
              >
                <Sparkles size={20} />
                Free AI Tools
              </Link>
              <Link
                to="/cv-builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-lg font-bold text-secondary bg-secondary/10 hover:bg-secondary hover:text-white transition-colors py-3 rounded-xl border border-secondary/20 hover:border-secondary shadow-sm"
              >
                <FileText size={20} />
                CV Making
              </Link>
              <button
                onClick={() => onOpenOrderModal('Website Design')}
                className="bg-primary text-white px-6 py-3 rounded-xl text-center font-bold w-full"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
