import { Coffee, Pizza, Cake, Beer, Utensils, Sparkles } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Items", icon: <Sparkles size={16} /> },
  { id: "coffee", label: "Roasts", icon: <Coffee size={16} /> },
  { id: "snacks", label: "Small Bites", icon: <Pizza size={16} /> },
  { id: "meals", label: "Main Course", icon: <Utensils size={16} /> },
  { id: "desserts", label: "Sweets", icon: <Cake size={16} /> },
  { id: "drinks", label: "Cellar", icon: <Beer size={16} /> },
];

const MenuCategory = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full py-8">
      {/* Container for Horizontal Scroll on Mobile */}
      <div className="flex items-center justify-center overflow-x-auto no-scrollbar pb-4">
        <div className="flex items-center gap-3 px-4">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full 
                  text-[11px] uppercase tracking-[0.2em] font-bold 
                  transition-all duration-500 border whitespace-nowrap
                  ${
                    isActive
                      ? "bg-[#C2410C] border-[#C2410C] text-white shadow-[0_10px_30px_rgba(194,65,12,0.3)] scale-105"
                      : "bg-[#161412] border-white/5 text-[#7A6F66] hover:border-[#C2410C]/40 hover:text-white"
                  }
                `}
              >
                {/* Icon is only visible when active or on desktop for cleaner look */}
                <span className={`transition-transform duration-500 ${isActive ? "scale-110 rotate-0" : "scale-100 opacity-60"}`}>
                  {category.icon}
                </span>
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Subtle Divider with Glow */}
      <div className="max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#C2410C]/20 to-transparent mt-4"></div>
    </div>
  );
};

export default MenuCategory;