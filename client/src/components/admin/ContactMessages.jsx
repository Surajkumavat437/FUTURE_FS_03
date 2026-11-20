import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Trash2, Mail, User, Clock } from "lucide-react";

const ContactMessages = ({ onUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { data } = await api.get("/contact", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        });
        if (isMounted) {
          setMessages(data.data || []);
          setLoading(false);
        }
      } catch (err) {
        if (!api.isCancel?.(err)) {
          console.error("Inquiry fetch error:", err);
          setLoading(false);
        }
      }
    };

    fetchMessages();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Archiving this inquiry will remove it from the live view. Proceed?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await api.delete(`/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => prev.filter(item => item._id !== id));
      if (onUpdate) onUpdate();
    } catch (err) {
      alert("Archive failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="p-10 text-center font-serif italic text-[#A3B18A]">Retrieving guest notes...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-[#A3B18A]/10 pb-4">
        <h3 className="text-2xl font-serif italic text-[#344E41]">Guest Inquiries</h3>
        <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">{messages.length} Messages</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg) => (
          <div key={msg._id} className="bg-white rounded-[2rem] border border-[#A3B18A]/10 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all">
            <div className="md:w-56 bg-[#FDFCF0] p-6 border-r border-[#A3B18A]/5">
              <div className="h-10 w-10 rounded-xl bg-[#344E41] flex items-center justify-center text-[#F4F1DE] mb-3">
                <User size={18} />
              </div>
              <h4 className="font-serif text-[#1B2A22]">{msg.name}</h4>
              <a href={`mailto:${msg.email}`} className="text-[10px] text-[#588157] flex items-center gap-1 mt-2">
                <Mail size={12} /> {msg.email}
              </a>
            </div>
            <div className="flex-1 p-6 relative">
              <button onClick={() => handleDelete(msg._id)} className="absolute top-6 right-6 text-stone-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
              <div className="flex items-center gap-2 text-[#A3B18A] text-[10px] uppercase font-bold mb-3">
                <Clock size={12} /> {new Date(msg.createdAt).toLocaleDateString()}
              </div>
              <p className="text-[#344E41] text-sm italic font-light leading-relaxed">"{msg.message}"</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-20 text-[#A3B18A] italic font-serif opacity-50">
            No inquiries at this time.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;