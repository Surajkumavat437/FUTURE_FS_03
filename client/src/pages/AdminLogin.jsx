import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Lock, User, Coffee, ArrowRight } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', formData);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed: Server did not return a valid session.');
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data?.message || 'Unauthorized Access');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#344E41]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#A3B18A]/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/50 shadow-[0_30px_70px_-20px_rgba(52,78,65,0.1)]">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#344E41] rounded-3xl mb-6 shadow-xl shadow-[#344E41]/20">
              <Coffee className="text-[#A3B18A]" size={28} />
            </div>
            <h1 className="text-3xl font-serif text-[#344E41] mb-2">Welcome Back</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#A3B18A]">Administrative Link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#344E41]/30 group-focus-within:text-[#344E41] transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
                  required
                  className="w-full bg-white/60 border border-[#344E41]/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#A3B18A]/50 transition-all text-sm"
                  onChange={handleChange}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#344E41]/30 group-focus-within:text-[#344E41] transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-white/60 border border-[#344E41]/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#A3B18A]/50 transition-all text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#344E41] text-[#F4F1DE] rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#1B2A22] transition-all shadow-lg shadow-[#344E41]/20 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Initialize Dashboard"}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <p className="mt-8 text-center text-[8px] uppercase tracking-[0.5em] text-[#344E41]/30">
            Secure Neural Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;