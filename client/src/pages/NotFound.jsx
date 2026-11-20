import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#344E41]/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10 animate-in fade-in zoom-in duration-700">
        {/* Animated Icon Container */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full scale-150 blur-xl animate-pulse"></div>
          <div className="relative h-24 w-24 bg-white border border-[#A3B18A]/20 rounded-full flex items-center justify-center shadow-2xl mx-auto">
            <Ghost size={48} className="text-[#344E41] animate-bounce" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-8xl font-serif italic text-[#1B2A22] tracking-tighter">404</h1>
          <h2 className="text-xl font-serif text-[#344E41] italic">Lost in the Atelier...</h2>
          <p className="text-sm text-[#A3B18A] font-medium leading-relaxed max-w-xs mx-auto">
            It seems the page you are looking for has been moved or doesn't exist in our current collection.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-white border border-[#A3B18A]/30 text-[#344E41] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FDFCF0] transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-[#344E41] text-[#F4F1DE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1B2A22] transition-all shadow-xl active:scale-95"
          >
            <Home size={14} />
            <span>Home Base</span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-[9px] uppercase tracking-[0.4em] text-[#A3B18A] font-black pt-12">
          Cozy Bistro • Crafted with Excellence
        </p>
      </div>
    </div>
  );
};

export default NotFound;