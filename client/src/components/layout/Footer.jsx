import { Link } from "react-router-dom";
import { Coffee, Instagram, Twitter, Facebook, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    // Background: Deep Moss (#344E41) for a grounded, prestigious finish
    <footer className="bg-[#344E41] pt-28 pb-12 px-8 relative overflow-hidden">
      
      {/* Decorative High-Fashion Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#A3B18A]/30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Identity Section */}
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="p-3 bg-[#A3B18A]/10 rounded-2xl border border-[#A3B18A]/20 transition-all duration-700 group-hover:bg-[#A3B18A]/20">
                <Coffee className="text-[#F4F1DE] w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#F4F1DE] font-serif text-2xl tracking-tighter">
                  Atelier <span className="italic font-light">Cozy.</span>
                </span>
                <span className="text-[7px] uppercase tracking-[0.6em] text-[#A3B18A] font-black">Reserve Estate</span>
              </div>
            </Link>
            <p className="text-[#A3B18A] text-lg leading-relaxed font-serif italic max-w-sm opacity-80">
              "Where the ancient art of the whisk meets the modern precision of the roast."
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <Icon key={idx} className="text-[#A3B18A] hover:text-[#D4AF37] cursor-pointer w-5 h-5 transition-all duration-500 hover:-translate-y-1" strokeWidth={1.5} />
              ))}
            </div>
          </div>

          {/* Navigation - Column 1 */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black">Discovery</h4>
            <ul className="space-y-4">
              {['Menu', 'AI Guide', 'Our Story', 'Boutique'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'AI Guide' ? '/ai' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-[#F4F1DE]/60 hover:text-[#F4F1DE] transition-all duration-500 text-sm font-light tracking-wide flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all duration-500"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours - Column 2 */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black">Atelier Hours</h4>
            <div className="text-[#F4F1DE]/60 text-sm font-light space-y-4 tracking-wide">
              <div className="flex justify-between border-b border-[#A3B18A]/10 pb-2">
                <span>Mon — Fri</span>
                <span className="text-[#F4F1DE]">08:00 — 22:00</span>
              </div>
              <div className="flex justify-between border-b border-[#A3B18A]/10 pb-2">
                <span>Sat — Sun</span>
                <span className="text-[#F4F1DE]">09:00 — 23:00</span>
              </div>
              <p className="pt-2 italic text-[#A3B18A] text-xs">Closed on Full Moon Observance.</p>
            </div>
          </div>

          {/* Back to Top - Column 3 */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-start">
             <button 
              onClick={scrollToTop}
              className="group relative p-8 bg-transparent border border-[#A3B18A]/30 rounded-full hover:border-[#D4AF37] transition-all duration-700 overflow-hidden"
            >
              <ArrowUp className="text-[#F4F1DE] group-hover:text-[#D4AF37] w-5 h-5 relative z-10 transition-transform duration-500 group-hover:-translate-y-1" />
              <div className="absolute inset-0 bg-[#A3B18A]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>

        {/* Bottom Bar: The Legal Signature */}
        <div className="pt-12 border-t border-[#A3B18A]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#A3B18A] text-[9px] uppercase tracking-[0.4em] font-bold">
            © 2026 Atelier Cozy. <span className="text-[#D4AF37]/40 mx-2">✦</span> Handcrafted Digital Experience
          </p>
          <div className="flex gap-10 text-[9px] uppercase tracking-[0.4em] text-[#A3B18A] font-bold">
            <span className="hover:text-[#F4F1DE] cursor-pointer transition-colors underline-offset-8 hover:underline">Privacy</span>
            <span className="hover:text-[#F4F1DE] cursor-pointer transition-colors underline-offset-8 hover:underline">Terms</span>
            <span className="hover:text-[#F4F1DE] cursor-pointer transition-colors underline-offset-8 hover:underline">Cookies</span>
          </div>
        </div>
      </div>

      {/* Background Typography Decoration */}
      <div className="absolute bottom-[-2rem] left-0 right-0 flex justify-center opacity-[0.02] pointer-events-none">
        <span className="text-[15vw] font-serif italic text-white whitespace-nowrap">Botanical Excellence</span>
      </div>
    </footer>
  );
};

export default Footer;