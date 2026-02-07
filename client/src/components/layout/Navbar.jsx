import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Coffee, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totals } = useCart();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "AI Guide", path: "/ai" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 z-[100] w-full bg-[#F4F1DE] border-b border-[#A3B18A]/30 py-4 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3 z-[110]">
          <div className="bg-[#344E41] p-2 rounded-lg shadow-md">
            <Coffee className="w-5 h-5 text-[#F4F1DE]" strokeWidth={2} />
          </div>
          <span className="text-xl font-serif tracking-tight text-[#344E41] font-bold">
            Cozy <span className="italic font-light text-[#A3B18A]">Bistro.</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 ${
                    isActive ? "text-[#344E41]" : "text-[#344E41]/50 hover:text-[#344E41]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions Section */}
        <div className="flex items-center gap-4 z-[110]">
          
          {/* UPDATED: Shopping Bag Link to /cart */}
          <NavLink 
            to="/cart" 
            onClick={closeMenu}
            className="relative text-[#344E41] hover:text-[#A3B18A] transition-all p-2 active:scale-90"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            
            {/* Notification Dot */}
            {totals.count > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#D4AF37] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-300">
                {totals.count}
              </span>
            )}
          </NavLink>
          
          <NavLink
            to="/reservation" 
            onClick={closeMenu}
            className="hidden sm:block bg-[#344E41] px-6 py-2.5 rounded-full text-[9px] uppercase tracking-widest font-bold text-[#F4F1DE] hover:bg-[#A3B18A] transition-all active:scale-95"
          >
            Book Now
          </NavLink>

          {/* Toggle Mobile Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#344E41] text-[#F4F1DE] transition-transform active:scale-90"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* CLEAN MOBILE SIDEBAR */}
        <div 
          className={`
            fixed inset-0 bg-[#F4F1DE] z-[105] lg:hidden transition-transform duration-500 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full w-full px-10 pt-32 pb-12">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black mb-8 border-b border-[#A3B18A]/20 pb-4">
              Navigation
            </p>
            
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  onClick={closeMenu}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-3xl font-serif tracking-tight transition-all duration-300 ${
                      isActive ? "text-[#344E41] italic pl-4 border-l-2 border-[#D4AF37]" : "text-[#344E41]/30"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-[#A3B18A]/20">
               <div className="space-y-4">
                  <p className="text-[#344E41]/60 text-xs font-serif italic">Open Daily: 08:00 — 22:00</p>
                  <NavLink 
                    to="/reservation"
                    onClick={closeMenu}
                    className="block w-full text-center bg-[#344E41] text-[#F4F1DE] py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg"
                  >
                    Make a Reservation
                  </NavLink>
               </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;