import React from 'react';
import { Coffee, MessageSquare, Calendar, TrendingUp } from "lucide-react";

const StatsOverview = ({ menuCount, messageCount, reservationCount }) => {
  const stats = [
    { label: 'Offerings', value: menuCount, icon: <Coffee className="h-4 w-4" />, color: 'bg-[#A3B18A]' },
    { label: 'Inquiries', value: messageCount, icon: <MessageSquare className="h-4 w-4" />, color: 'bg-[#588157]' },
    { label: 'Bookings', value: reservationCount, icon: <Calendar className="h-4 w-4" />, color: 'bg-[#344E41]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-[#A3B18A]/20 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#A3B18A]">{stat.label}</p>
            <p className="text-3xl font-serif text-[#344E41]">{stat.value}</p>
          </div>
          <div className={`${stat.color} p-4 rounded-2xl text-[#F4F1DE] shadow-lg group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;