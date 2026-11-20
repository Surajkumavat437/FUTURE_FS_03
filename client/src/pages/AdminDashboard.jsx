import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, MessageSquare, Calendar, ClipboardList, LogOut, Menu as MenuIcon, X } from "lucide-react";
import api from "../services/api";

import MenuManager from "../components/admin/MenuManager";
import ContactMessages from "../components/admin/ContactMessages";
import ReservationList from "../components/admin/ReservationList";
import OrderQueue from "../components/admin/OrderQueue";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [counts, setCounts] = useState({ menu: 0, messages: 0, reservations: 0, orders: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [menuRes, msgRes, resRes, orderRes] = await Promise.all([
        api.get("/menu"),
        api.get("/contact", config),
        api.get("/reservations", config),
        api.get("/orders", config),
      ]);
      setCounts({
        menu: menuRes.data.data?.length || 0,
        messages: msgRes.data.data?.length || 0,
        reservations: resRes.data.data?.length || 0,
        orders: orderRes.data.data?.length || 0,
      });
    } catch (err) {
      console.error("Stats refresh failed", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [menuRes, msgRes, resRes, orderRes] = await Promise.all([
          api.get("/menu"),
          api.get("/contact", config),
          api.get("/reservations", config),
          api.get("/orders", config),
        ]);

        if (isMounted) {
          setCounts({
            menu: menuRes.data.data?.length || 0,
            messages: msgRes.data.data?.length || 0,
            reservations: resRes.data.data?.length || 0,
            orders: orderRes.data.data?.length || 0,
          });
        }
      } catch (err) {
        console.error("Data load failed", err);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [activeTab]); // Fetches fresh counts whenever the tab changes

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const tabs = [
    { id: "menu", label: "Menu", icon: <Coffee className="h-5 w-5" /> },
    { id: "messages", label: "Inquiries", icon: <MessageSquare className="h-5 w-5" /> },
    { id: "reservations", label: "Bookings", icon: <Calendar className="h-5 w-5" /> },
    { id: "orders", label: "Orders", icon: <ClipboardList className="h-5 w-5" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#FDFCF8] text-[#344E41] overflow-hidden pt-[72px]">
      
      {/* MOBILE ADMIN HEADER */}
      <div className="md:hidden fixed top-[72px] left-0 right-0 z-[120] flex items-center justify-between p-4 bg-[#344E41] text-[#F4F1DE] shadow-md h-16">
        <h2 className="font-serif italic text-xl">Atelier Admin</h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed md:relative top-0 left-0 h-full w-64 bg-[#344E41] text-[#F4F1DE]
            transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 transition duration-300 ease-in-out
            flex flex-col z-[110] border-r border-white/10
          `}
        >
          <div className="hidden md:block p-8 border-b border-white/10">
            <p className="text-[10px] tracking-widest uppercase opacity-50 mb-1">Management</p>
            <h2 className="text-2xl font-serif italic">Atelier</h2>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-4 rounded-2xl transition-all ${
                  activeTab === tab.id ? "bg-[#A3B18A] text-[#344E41] font-bold shadow-lg" : "hover:bg-white/5 opacity-80"
                }`}
              >
                {tab.icon}
                <span className="text-xs uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-white/10">
            <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-3 text-red-300 border border-red-300/20 rounded-xl hover:bg-red-500/10 transition-all text-xs uppercase font-bold">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
          <div className="p-6 md:p-12 max-w-7xl w-full mx-auto">
            
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl font-serif capitalize flex items-center gap-4">
                {activeTab}
                <span className="text-xl md:text-3xl italic font-light opacity-30">Management</span>
              </h1>
            </header>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Menu Items", val: counts.menu, icon: <Coffee />, col: "text-emerald-700" },
                { label: "Inquiries", val: counts.messages, icon: <MessageSquare />, col: "text-blue-700" },
                { label: "Reservations", val: counts.reservations, icon: <Calendar />, col: "text-orange-700" },
                { label: "Orders", val: counts.orders, icon: <ClipboardList />, col: "text-violet-700" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#344E41]/5">
                  <div className={`p-3 w-fit rounded-xl bg-gray-50 ${stat.col}`}>{stat.icon}</div>
                  <div className="mt-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-black mb-2">{stat.label}</p>
                    <p className="text-4xl font-serif text-[#1B2A22]">{stat.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTENT AREA */}
            <section className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-[#344E41]/5 p-8 md:p-12 min-h-[70vh]">
              {activeTab === "menu" && <MenuManager onUpdate={handleRefresh} />}
              {activeTab === "messages" && <ContactMessages onUpdate={handleRefresh} />}
              {activeTab === "reservations" && <ReservationList onUpdate={handleRefresh} />}
              {activeTab === "orders" && <OrderQueue />}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
