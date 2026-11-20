import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Calendar, Users, Clock, Trash2, CheckCircle2, RotateCw, XCircle } from "lucide-react";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (signal = null) => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await api.get("/reservations", {
        headers: { Authorization: `Bearer ${token}` },
        signal: signal
      });
      setReservations(data.data || []);
      setLoading(false);
    } catch (err) {
      if (!api.isCancel?.(err)) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const startFetching = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const { data } = await api.get("/reservations", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        });
        if (!ignore) {
          setReservations(data.data || []);
          setLoading(false);
        }
      } catch (err) {
        if (!api.isCancel?.(err) && !ignore) {
          setLoading(false);
        }
      }
    };

    startFetching();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.patch(`/reservations/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(prev => prev.map(res => res._id === id ? { ...res, status } : res));
    } catch (err) {
      alert("Action failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Archive this reservation record?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(prev => prev.filter(res => res._id !== id));
    } catch (err) {
      alert("Removal failed.");
    }
  };

  if (loading) return <div className="p-20 text-center font-serif italic text-[#A3B18A]">Opening Ledger...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between border-b border-[#A3B18A]/20 pb-6">
        <div>
          <h3 className="text-xl font-serif italic text-[#344E41]">Table Bookings</h3>
          <p className="text-[#588157] text-[10px] uppercase tracking-widest font-bold mt-1">Daily Reservations</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => loadData()} className="p-2 text-[#A3B18A] hover:text-[#344E41] transition-all active:rotate-180 duration-500">
            <RotateCw size={16} />
          </button>
          <span className="bg-[#A3B18A]/10 text-[#344E41] px-4 py-1 rounded-full text-[10px] font-black border border-[#A3B18A]/20">
            {reservations.length} RECORDS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((res) => (
          <div key={res._id} className="bg-white rounded-[2rem] border border-[#A3B18A]/10 p-6 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className={`absolute top-4 right-4 h-2 w-2 rounded-full animate-pulse ${
              res.status === 'confirmed' ? 'bg-green-500' : res.status === 'cancelled' ? 'bg-red-500' : 'bg-[#D4AF37]'
            }`}></div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-serif text-lg text-[#344E41] leading-tight truncate">{res.name}</h4>
                  <span className={`text-[8px] uppercase px-2 py-0.5 rounded-full font-bold ${
                    res.status === 'confirmed' ? 'bg-green-100 text-green-700' : res.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {res.status || 'pending'}
                  </span>
                </div>
                <p className="text-[#A3B18A] text-[10px] uppercase tracking-[0.2em] font-bold truncate">{res.email}</p>
              </div>
              <div className="grid grid-cols-1 gap-3 border-y border-[#A3B18A]/10 py-4">
                <div className="flex items-center space-x-2 text-xs text-[#344E41]">
                  <Calendar size={14} className="opacity-40" />
                  <span>{res.date ? new Date(res.date).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#344E41]">
                  <Clock size={14} className="opacity-40" />
                  <span>{res.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#344E41]">
                  <Users size={14} className="opacity-40" />
                  <span>{res.guests} Guests</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {res.status !== 'confirmed' && (
                    <button onClick={() => handleUpdateStatus(res._id, 'confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Confirm">
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                  {res.status !== 'cancelled' && (
                    <button onClick={() => handleUpdateStatus(res._id, 'cancelled')} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Cancel">
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
                <button onClick={() => handleDelete(res._id)} className="text-stone-300 hover:text-red-400 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;