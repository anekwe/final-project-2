import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-army-dark)] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center space-x-4 mb-6">
              <img src="https://i.ibb.co/mrtDMPDF/p2.png" alt="HopeXavier Logo" className="h-20 md:h-24 object-contain drop-shadow-md" />
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-2xl leading-tight uppercase tracking-wide text-white">
                  HopeXavier First
                </span>
                <span className="text-sm font-medium tracking-widest text-gray-400">
                  Academy
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Raising Future Leaders Through Standard Education. We provide a nurturing environment where students excel academically, morally, and socially.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--color-army-light)] flex items-center justify-center hover:bg-[var(--color-accent-pink)] transition-colors text-white">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--color-army-light)] flex items-center justify-center hover:bg-[var(--color-accent-pink)] transition-colors text-white">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--color-army-light)] flex items-center justify-center hover:bg-[var(--color-accent-pink)] transition-colors text-white">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#about" className="hover:text-[var(--color-accent-pink)] transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-[var(--color-accent-pink)] transition-colors">Our Services</a></li>
              <li><a href="/#news" className="hover:text-[var(--color-accent-pink)] transition-colors">News & Blog</a></li>
              <li><Link to="/apply" className="hover:text-[var(--color-accent-pink)] transition-colors">Apply Now</Link></li>
              <li><Link to="/admin/login" className="hover:text-[var(--color-accent-pink)] transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wide">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>Junior Secondary</li>
              <li>Senior Secondary</li>
              <li>ICT/STEM Lab</li>
              <li>School Bus Service</li>
              <li>Hostel Facilities</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="text-[var(--color-accent-pink)] mr-3 mt-1 flex-shrink-0" />
                <span>Guita Community, Bwarri Area Council.</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[var(--color-accent-pink)] mr-3 flex-shrink-0" />
                <span>08036987095, 08164724449</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[var(--color-accent-pink)] mr-3 flex-shrink-0" />
                <span>hopexavierfirstacademy@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HopeXavier First Academy. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
