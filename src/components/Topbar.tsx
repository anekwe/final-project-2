import { Phone, Mail } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="bg-[var(--color-army-dark)] text-white text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-2 h-auto md:h-10">
        
        {/* Left Side */}
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div className="flex items-center space-x-2">
            <Phone size={14} className="text-[var(--color-accent-pink)]" />
            <span>08036987095, 08164724449</span>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Mail size={14} className="text-[var(--color-accent-pink)]" />
          <span>hopexavierfirstacademy@gmail.com</span>
        </div>

        {/* Right Side (Marquee) */}
        <div className="w-full md:w-1/3 overflow-hidden text-[var(--color-accent-pink)] font-semibold flex items-center">
          <div className="marquee overflow-hidden whitespace-nowrap animate-[marquee_15s_linear_infinite]">
            Admission Ongoing 2026/2027 | HOPEXAVIER FIRST ACADEMY | GUITA COMMUNITY | BWARRI AREA COUNCIL
          </div>
        </div>
      </div>
    </div>
  );
}
