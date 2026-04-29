import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'News & Blog', href: '/#news' },
    { name: 'Check Result', href: '/results' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/admin/login');
  };

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-[var(--color-army-base)] py-4 text-white"
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="https://i.ibb.co/mrtDMPDF/p2.png" alt="HopeXavier Logo" className="h-16 md:h-20 object-contain drop-shadow-lg transition-transform hover:scale-105" />
              <div className="flex flex-col">
                <span className={cn("font-bold text-xl md:text-2xl leading-tight uppercase tracking-wide", scrolled ? "text-[var(--color-army-dark)]" : "text-white")}>
                  HopeXavier First
                </span>
                <span className={cn("text-sm md:text-base font-medium tracking-widest", scrolled ? "text-gray-500" : "text-gray-300")}>
                  Academy
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors hover:text-[var(--color-accent-pink)] text-sm uppercase tracking-wide",
                    scrolled ? "text-gray-700" : "text-gray-100"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={handleAdminClick}
                className={cn(
                  "font-medium transition-colors hover:text-[var(--color-accent-pink)] text-sm uppercase tracking-wide",
                  scrolled ? "text-gray-700" : "text-gray-100"
                )}
              >
                ADMIN PORTAL
              </button>
              <Link 
                to="/apply" 
                className="bg-[var(--color-accent-pink)] hover:bg-pink-500 text-white px-6 py-2 rounded-md font-semibold transition-all shadow-md transform hover:-translate-y-0.5 uppercase tracking-wide text-sm"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={cn("p-2", scrolled ? "text-[var(--color-army-dark)]" : "text-white")}
              >
                {isOpen ? <X size={28} className="text-[var(--color-accent-pink)]" /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className={cn(
              "lg:hidden absolute top-full left-0 w-full shadow-lg border-t",
              scrolled ? "bg-white border-gray-100" : "bg-[var(--color-army-dark)] border-gray-700"
            )}>
              <div className="flex flex-col px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm font-medium uppercase tracking-wide hover:bg-[var(--color-army-light)] hover:text-[var(--color-accent-pink)] transition-colors",
                      scrolled ? "text-gray-800" : "text-white"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
                <button 
                  onClick={(e) => {
                    setIsOpen(false);
                    handleAdminClick(e);
                  }}
                  className={cn(
                    "block px-4 py-2 rounded-md justify-start text-left text-sm font-medium uppercase tracking-wide hover:bg-[var(--color-army-light)] hover:text-[var(--color-accent-pink)] transition-colors",
                    scrolled ? "text-gray-800" : "text-white"
                  )}
                >
                  ADMIN PORTAL
                </button>
                <Link 
                  to="/apply" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[var(--color-accent-pink)] text-white px-4 py-3 rounded-md font-bold text-center mt-4 w-full uppercase"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
