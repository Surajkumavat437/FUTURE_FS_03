import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, Coffee, IndianRupee, Edit2 } from "lucide-react";
import api from '../../services/api';

const MenuManager = ({ onUpdate }) => { 
  const [menuItems, setMenuItems] = useState([]);
  const emptyForm = { name: '', price: '', category: 'Coffee', description: '', ingredients: '', allergens: '', dietaryTags: '', flavorNotes: '', caffeineLevel: 'unknown', crossContactNotes: '', ingredientInfoComplete: false };
  const [formData, setFormData] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // For images, we need the root URL (VITE_API_URL minus '/api')
  const API_ROOT = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, '');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadInitialData = async () => {
      try {
        const { data } = await api.get("/menu", {
          signal: controller.signal
        });
        if (isMounted) {
          setMenuItems(data.data || []);
        }
      } catch (err) {
        if (!api.isCancel?.(err)) console.error("Initial load failed:", err);
      }
    };

    loadInitialData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const refreshList = async () => {
    try {
      const { data } = await api.get("/menu");
      setMenuItems(data.data || []);
      if (onUpdate) onUpdate(); 
    } catch (err) {
      console.error("List refresh failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    ['ingredients', 'allergens', 'dietaryTags', 'flavorNotes'].forEach(field => data.append(field, formData[field]));
    data.append('caffeineLevel', formData.caffeineLevel);
    data.append('crossContactNotes', formData.crossContactNotes);
    data.append('ingredientInfoComplete', String(formData.ingredientInfoComplete));
    
    if (image) {
      data.append('image', image);
    }

    try {
      await api.post("/menu", data, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert("Offering successfully curated.");
      setFormData(emptyForm);
      setImage(null);
      refreshList(); 
    } catch (err) { 
      alert("Submission error: " + (err.response?.data?.message || err.message)); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this offering from the collection?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await api.delete(`/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      refreshList();
    } catch (err) {
      alert("Removal failed: " + (err.response?.data?.message || "Unauthorized"));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-700">
      
      {/* LEFT SIDE: Creation Form */}
      <div className="lg:col-span-1">
        <form onSubmit={handleSubmit} className="space-y-5 sticky top-10 bg-white p-8 rounded-[2.5rem] border border-[#A3B18A]/10 shadow-sm">
          <div className="space-y-1 mb-6 text-center">
            <h3 className="text-xl font-serif italic text-[#344E41]">Curate Offering</h3>
            <p className="text-[9px] uppercase tracking-widest text-[#A3B18A] font-bold">New Boutique Item</p>
          </div>
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Item Name" 
              value={formData.name} 
              className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-sm font-light italic" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
            
            <div className="flex gap-4">
              <div className="relative w-1/2">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A3B18A]" />
                <input 
                  type="number" 
                  placeholder="Price" 
                  value={formData.price} 
                  className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 pl-9 rounded-2xl outline-none text-sm font-light" 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  required 
                />
              </div>
              
              <select 
                value={formData.category} 
                className="w-1/2 bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-[10px] uppercase tracking-widest font-bold text-[#344E41] appearance-none cursor-pointer" 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Drinks">Drinks</option>
                <option value="Snacks">Snacks</option>
                <option value="Meals">Meals</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            <textarea 
              placeholder="Flavor profile..." 
              value={formData.description} 
              className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl h-28 outline-none text-sm font-light italic resize-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A3B18A]">Menu details (comma separated)</p>
            {[
              ['ingredients', 'Ingredients'], ['allergens', 'Allergens'],
              ['dietaryTags', 'Dietary tags (vegan, vegetarian, gluten-free)'], ['flavorNotes', 'Flavor notes']
            ].map(([field, label]) => <input key={field} value={formData[field]} placeholder={label} className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-sm" onChange={e => setFormData({ ...formData, [field]: e.target.value })} />)}
            <select value={formData.caffeineLevel} className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl" onChange={e => setFormData({ ...formData, caffeineLevel: e.target.value })}>
              <option value="unknown">Caffeine: unknown</option><option value="none">Caffeine-free</option><option value="low">Low caffeine</option><option value="moderate">Moderate caffeine</option><option value="high">High caffeine</option>
            </select>
            <input value={formData.crossContactNotes} placeholder="Cross-contact notes (optional)" className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-sm" onChange={e => setFormData({ ...formData, crossContactNotes: e.target.value })} />
            <label className="flex gap-2 items-center text-xs text-[#344E41]"><input type="checkbox" checked={formData.ingredientInfoComplete} onChange={e => setFormData({ ...formData, ingredientInfoComplete: e.target.checked })} />Ingredient and allergen details verified complete</label>

            <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#A3B18A]/20 rounded-2xl cursor-pointer hover:bg-[#D4AF37]/5 transition-all group">
              <ImageIcon className="h-5 w-5 mr-3 text-[#A3B18A] group-hover:text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#588157] truncate max-w-[150px]">
                {image ? image.name : "Attach Visual"}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          <button type="submit" className="w-full bg-[#1B2A22] text-[#D4AF37] py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#344E41] transition-all shadow-xl flex items-center justify-center group cursor-pointer">
            <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" /> 
            Commit to Menu
          </button>
        </form>
      </div>

      {/* RIGHT SIDE: Visual Inventory */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between border-b border-[#A3B18A]/10 pb-6">
          <h3 className="text-2xl font-serif italic text-[#344E41]">Active Collection</h3>
          <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1 rounded-full text-[10px] font-black tracking-widest">
            {menuItems.length} OBJECTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map(item => (
            <div key={item._id} className="group bg-white p-6 rounded-[2.5rem] border border-[#A3B18A]/10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="flex items-center space-x-6 relative z-10">
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#FDFCF0] border border-[#A3B18A]/10">
                   <img 
                     src={item.image?.startsWith('http') ? item.image : `${API_ROOT}${item.image}`} 
                     alt={item.name} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                     onError={(e) => { 
                       e.target.onerror = null; 
                       if (e.target.src !== "https://placehold.co/150?text=Atelier") {
                         e.target.src = "https://placehold.co/150?text=Atelier";
                       }
                     }}
                   />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-[#1B2A22] text-xl leading-tight mb-2">{item.name}</h4>
                  <div className="flex items-center space-x-3">
                    <span className="text-[#D4AF37] text-sm font-serif italic font-bold">₹{item.price}</span>
                    <span className="h-1 w-1 bg-stone-200 rounded-full"></span>
                    <span className="text-stone-400 text-[9px] uppercase tracking-[0.2em] font-black">{item.category}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-50 flex justify-end space-x-2">
                <button 
                  onClick={() => navigate(`/admin/edit-menu/${item._id}`)}
                  className="p-2 text-stone-300 hover:text-[#344E41] transition-colors cursor-pointer"
                >
                  <Edit2 size={16}/>
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-stone-300 hover:text-red-500 transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {menuItems.length === 0 && (
            <div className="col-span-full text-center py-32 flex flex-col items-center justify-center space-y-6">
              <div className="h-20 w-20 rounded-full border border-dashed border-[#A3B18A]/30 flex items-center justify-center bg-white">
                <Coffee className="h-8 w-8 text-[#A3B18A]/30" />
              </div>
              <p className="italic font-serif text-[#A3B18A] text-lg">The collection is currently uncurated.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
