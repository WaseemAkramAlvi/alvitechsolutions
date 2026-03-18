import React from 'react';
import { Rocket, Twitter, Linkedin, Github, Facebook, Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 print:hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block mb-6 group">
              <div className="bg-white p-3 rounded-2xl inline-flex group-hover:scale-105 transition-transform shadow-lg shadow-white/5">
                <img src={logo} alt="AlviTech Solutions" className="h-8 w-auto" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-8">
              We build custom web applications that automate business processes and increase profit. Your partner in digital transformation.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Web & AI Apps</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">IoT Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Graphics & Video</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">CV & Office Work</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <span>0307-5579807</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>Rahim Yar Khan, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />
                <span>info@alvitech.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-6">Subscribe to get the latest tech insights and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary-dark transition-colors">
                <Rocket size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} AlviTech Solutions. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
