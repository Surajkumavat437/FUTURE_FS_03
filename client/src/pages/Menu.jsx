import { useEffect, useState, useMemo } from "react";
import { getMenuItems } from "../services/menuService";
import MenuCard from "../components/menu/MenuCard";
import {
  UtensilsCrossed,
  Loader2,
  Search,
  X,
  ChefHat,
  ReceiptIndianRupee,
} from "lucide-react";
import Fuse from "fuse.js";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "all",
  "Coffee",
  "Tea",
  "Drinks",
  "Snacks",
  "Meals",
  "Desserts",
];

const Menu = () => {
  // ERROR FIXED: Moved useNavigate inside the component
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const { cart, totals } = useCart();

  const fetchMenu = async (category) => {
    setLoading(true);
    try {
      const res = await getMenuItems(category === "all" ? "" : category);
      setMenuItems(res.data);
    } catch (error) {
      console.error("Failed to fetch menu", error);
      setError("Failed to load menu. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(selectedCategory);
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return menuItems;
    const fuse = new Fuse(menuItems, {
      keys: ["name", "description", "category"],
      threshold: 0.3,
    });
    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, menuItems]);

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#344E41] pt-28 pb-20 selection:bg-[#A3B18A] selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      <section className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#344E41]/5 border border-[#344E41]/10 text-[#344E41] text-[9px] tracking-[0.4em] uppercase font-bold mb-2">
            <ChefHat size={12} className="text-[#A3B18A]" strokeWidth={2.5} />
            The Culinary Atelier
          </div>

          <h1 className="text-4xl md:text-6xl font-serif leading-tight tracking-tight text-[#344E41]">
            Curated{" "}
            <span className="italic font-light text-[#A3B18A]">Flavors</span> &{" "}
            <br className="hidden md:block" />
            <span className="text-[#344E41]">Seasonal</span> Selections
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-12 relative">
          <div className="relative flex items-center">
            <Search
              className="absolute left-5 text-[#A3B18A]"
              size={16}
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search our kitchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#A3B18A]/30 rounded-xl py-4 px-12 text-sm text-[#344E41] placeholder:text-[#A3B18A]/60 focus:outline-none focus:border-[#344E41] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 p-1 hover:bg-[#A3B18A]/10 rounded-full text-[#A3B18A]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory(category);
                setSearchQuery("");
              }}
              className={`px-7 py-2.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border
                ${
                  selectedCategory === category
                    ? "bg-[#344E41] border-[#344E41] text-[#F4F1DE] shadow-lg"
                    : "bg-white border-[#A3B18A]/20 text-[#344E41]/60 hover:border-[#344E41] hover:text-[#344E41]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2
              className="w-10 h-10 animate-spin text-[#A3B18A]"
              strokeWidth={1.5}
            />
            <p className="mt-4 font-serif italic text-[#588157] text-sm tracking-widest">
              Preparing the table...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <div
                  key={item._id}
                  className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <MenuCard item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-white/40 rounded-3xl border border-dashed border-[#A3B18A]/40">
                <UtensilsCrossed
                  className="mx-auto h-10 w-10 text-[#A3B18A]/40 mb-4"
                  strokeWidth={1}
                />
                <p className="text-[#344E41] font-serif italic text-xl">
                  We couldn't find "{searchQuery}" in our kitchen today.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Floating Summary - Linked to Cart Page */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-[90] w-80 bg-white/80 backdrop-blur-xl border border-[#A3B18A]/30 p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(52,78,65,0.2)] animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#344E41] p-2 rounded-full">
                <ReceiptIndianRupee size={16} className="text-[#F4F1DE]" />
              </div>
              <h3 className="font-serif text-[#344E41] text-lg italic">
                Current Order
              </h3>
            </div>

            <div className="flex justify-between items-end mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#344E41]">
                Subtotal
              </span>
              <span className="text-2xl font-serif text-[#344E41]">
                ₹{totals.subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="group relative w-full bg-[#344E41] text-[#F4F1DE] py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:bg-[#A3B18A]"
            >
              <span className="relative z-10">View Full Bill</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        )}

        {/* Bottom Note */}
        <div className="mt-24 text-center">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#A3B18A] font-bold">
            Atelier Cozy <span className="mx-2 opacity-30">|</span> Est. 2026
          </p>
        </div>
      </section>
    </div>
  );
};

export default Menu;
