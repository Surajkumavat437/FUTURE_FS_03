import { Plus } from "lucide-react";
import { useCart } from "../../context/CartContext"; // 1. Import the hook we created

const MenuCard = ({ item }) => {
  // 2. Extract the addToBag function from our Context
  const { addToBag } = useCart();

  return (
    <div className="group relative flex items-center gap-6 py-6 px-6 rounded-[2rem] transition-all duration-700 hover:bg-white/60 backdrop-blur-md border border-[#A3B18A]/10 hover:border-[#A3B18A]/40 hover:shadow-[0_30px_60px_-20px_rgba(52,78,65,0.1)]">
      
      {/* Image Container */}
      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-inner transition-transform duration-1000 group-hover:scale-105">
        <img 
          loading="lazy"
          src={item.image || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300"} 
          alt={item.name}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300";
          }}
        />
        <div className="absolute inset-0 bg-[#344E41]/10 opacity-40 group-hover:opacity-0 transition-opacity duration-700"></div>
      </div>

      {/* Item Info */}
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-col">
            <h3 className="text-xl font-serif text-[#344E41] tracking-tight transition-colors duration-500 group-hover:text-[#3A5A40]">
              {item.name}
            </h3>
            <span className="text-[7px] uppercase tracking-[0.4em] text-[#A3B18A] font-black mt-1">
              {item.category || "Premium Selection"}
            </span>
          </div>

          <div className="flex flex-col items-end">
             <div className="flex items-center text-lg font-serif text-[#344E41]">
                <span className="text-[10px] mr-1 text-[#D4AF37] italic font-sans">₹</span>
                {item.price}
             </div>
             <span className="text-[8px] text-[#A3B18A] opacity-0 group-hover:opacity-100 transition-opacity duration-700 italic">Excl. taxes</span>
          </div>
        </div>
        
        <div className="w-8 h-[1px] bg-[#D4AF37]/30 mb-4 group-hover:w-full transition-all duration-1000 ease-in-out"></div>
        
        <div className="flex justify-between items-center">
          <p className="text-[13px] text-[#588157] font-light leading-relaxed max-w-[75%] italic line-clamp-2">
            {item.description || "Delicately balanced flavors, hand-poured with precision."}
          </p>
          
          {/* 3. Updated Button: Added the onClick handler */}
          <button 
            onClick={() => addToBag(item)} 
            className="relative flex items-center justify-center h-11 w-11 rounded-full bg-[#344E41] text-[#F4F1DE] shadow-xl overflow-hidden transition-all duration-500 hover:bg-[#D4AF37] hover:scale-110 active:scale-90"
          >
            <Plus size={18} strokeWidth={2} className="relative z-10" />
            
            {/* Shine Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>
        </div>
      </div>

      {/* Ornament */}
      <div className="absolute top-4 right-6 w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[300%] shadow-[0_0_10px_#D4AF37]"></div>
    </div>
  );
};

export default MenuCard;