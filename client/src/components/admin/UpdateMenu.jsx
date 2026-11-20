import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, IndianRupee, ImageIcon } from "lucide-react";
import api from '../../services/api';

const UpdateMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Coffee', description: '', ingredients: '', allergens: '', dietaryTags: '', flavorNotes: '', caffeineLevel: 'unknown', crossContactNotes: '', ingredientInfoComplete: false });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await api.get(`/menu/${id}`);
        setFormData({
          name: data.data.name,
          price: data.data.price,
          category: data.data.category,
          description: data.data.description
          ,ingredients: (data.data.ingredients || []).join(', '),
          allergens: (data.data.allergens || []).join(', '),
          dietaryTags: (data.data.dietaryTags || []).join(', '),
          flavorNotes: (data.data.flavorNotes || []).join(', '),
          caffeineLevel: data.data.caffeineLevel || 'unknown',
          crossContactNotes: data.data.crossContactNotes || '',
          ingredientInfoComplete: Boolean(data.data.ingredientInfoComplete)
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed", err);
        navigate('/admin/dashboard');
      }
    };
    fetchItem();
  }, [id, navigate]);

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
    if (image) data.append('image', image);

    try {
      await api.put(`/menu/${id}`, data, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert("Offering updated successfully.");
      navigate('/admin/dashboard');
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="p-20 text-center font-serif italic text-[#A3B18A]">Loading Boutique Data...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-6 lg:p-12 font-sans text-[#344E41]">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#A3B18A] mb-8 hover:text-[#344E41] transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to Collection
      </button>

      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-serif italic text-[#344E41]">Modify Offering</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#A3B18A] font-bold mt-2">Inventory Editor</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-black/5 border border-[#A3B18A]/10 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A] ml-2">Item Identity</label>
            <input 
              type="text" 
              value={formData.name} 
              className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-sm italic"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
            
            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A] ml-2">Valuation</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3B18A]" />
                  <input 
                    type="number" 
                    value={formData.price} 
                    className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 pl-10 rounded-2xl outline-none text-sm"
                    onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              
              <div className="w-1/2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A] ml-2">Classification</label>
                <select 
                  value={formData.category} 
                  className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-[10px] uppercase tracking-widest font-black text-[#344E41] cursor-pointer"
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
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A] ml-2">Flavor Profile</label>
              <textarea 
                value={formData.description} 
                className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl h-32 outline-none text-sm italic resize-none"
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A] ml-2">Ingredients and dietary details (comma separated)</label>
              {[
                ['ingredients', 'Ingredients'], ['allergens', 'Allergens'],
                ['dietaryTags', 'Dietary tags (vegan, vegetarian, gluten-free)'], ['flavorNotes', 'Flavor notes']
              ].map(([field, label]) => <input key={field} value={formData[field]} placeholder={label} className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-sm" onChange={e => setFormData({ ...formData, [field]: e.target.value })} />)}
              <select value={formData.caffeineLevel} className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl" onChange={e => setFormData({ ...formData, caffeineLevel: e.target.value })}>
                <option value="unknown">Caffeine: unknown</option><option value="none">Caffeine-free</option><option value="low">Low caffeine</option><option value="moderate">Moderate caffeine</option><option value="high">High caffeine</option>
              </select>
              <input value={formData.crossContactNotes} placeholder="Cross-contact notes (optional)" className="w-full bg-[#FDFCF0]/50 border border-[#A3B18A]/20 p-4 rounded-2xl outline-none text-sm" onChange={e => setFormData({ ...formData, crossContactNotes: e.target.value })} />
              <label className="flex gap-2 items-center text-xs text-[#344E41]"><input type="checkbox" checked={formData.ingredientInfoComplete} onChange={e => setFormData({ ...formData, ingredientInfoComplete: e.target.checked })} />Ingredient and allergen details verified complete</label>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A] ml-2">Visual Update (Optional)</label>
              <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-[#A3B18A]/20 rounded-2xl cursor-pointer hover:bg-[#A3B18A]/5 transition-all group">
                <ImageIcon className="h-6 w-6 mr-3 text-[#A3B18A]" />
                <span className="text-[10px] uppercase tracking-widest font-black text-[#588157]">
                  {image ? image.name : "Replace Existing Asset"}
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#1B2A22] text-[#D4AF37] py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-[#344E41] transition-all shadow-xl flex items-center justify-center group cursor-pointer">
            <Save className="h-4 w-4 mr-2" /> 
            Sync Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
