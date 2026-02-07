import { Coffee, Award, Users, Globe, ArrowDownRight, Sparkles } from "lucide-react";

const stats = [
  { label: "Direct Trade", value: "12+", icon: <Globe size={18} /> },
  { label: "Master Roasters", value: "04", icon: <Users size={18} /> },
  { label: "Global Awards", value: "18", icon: <Award size={18} /> },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-32 pb-20 px-6 overflow-hidden">
      {/* Texture Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-10"></div>

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-44">
          
          {/* Text Content: 7 Columns */}
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-[#344E41] text-[#F4F1DE] text-[9px] tracking-[0.5em] uppercase font-bold shadow-lg">
              <Sparkles size={12} className="text-[#A3B18A]" />
              The Atelier Philosophy
            </div>

            <h1 className="text-7xl md:text-[6.5rem] font-serif text-[#344E41] leading-[0.85] tracking-tighter">
              Artisan <br /> 
              <span className="italic font-light text-[#A3B18A] ml-12">Intelligence.</span>
            </h1>

            <p className="text-[#344E41]/70 text-2xl font-serif italic max-w-2xl leading-relaxed">
              "We don’t just harvest beans; we capture the character of the soil and the precision of the flame."
            </p>

            {/* Stats: Glassmorphic Row */}
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-[#344E41]/10">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-[#A3B18A]">
                    {stat.icon}
                    <span className="text-[10px] uppercase tracking-widest font-black text-[#344E41]/40">{stat.label}</span>
                  </div>
                  <p className="text-4xl font-serif text-[#344E41]">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Composition: 5 Columns */}
          <div className="lg:col-span-5 relative">
            {/* Background Decorative Frame */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#A3B18A]/10 rounded-full blur-3xl"></div>
            
            {/* Primary Image Card */}
            <div className="relative z-30 w-full aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070" 
                alt="Roasting Process" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#344E41]/60 to-transparent"></div>
            </div>

            {/* Floating Secondary Image (The "Cool" UI Factor) */}
            <div className="absolute -bottom-12 -left-20 z-40 w-56 h-72 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white hidden md:block animate-float">
               <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1887" 
                alt="The Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* The Feature Set */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Ethical Sourcing", tag: "Nature" },
            { title: "Scientific Roast", tag: "Alchemy" },
            { title: "Creative Space", tag: "Atelier" }
          ].map((item, idx) => (
            <div key={idx} className="group relative p-1 bg-white/30 rounded-[3rem] transition-all hover:bg-[#344E41]">
              <div className="bg-white rounded-[2.8rem] p-10 h-full transition-all group-hover:translate-y-[-8px] group-hover:shadow-xl">
                 <span className="text-[#A3B18A] font-black text-[9px] uppercase tracking-[0.4em]">{item.tag}</span>
                 <h3 className="text-3xl font-serif text-[#344E41] mt-2 mb-4 group-hover:text-[#A3B18A] transition-colors">{item.title}</h3>
                 <p className="text-sm text-[#344E41]/60 leading-relaxed italic">
                   Refining the sensory experience through meticulously curated processes.
                 </p>
                 <ArrowDownRight className="mt-8 text-[#344E41]/20 group-hover:text-[#344E41] transition-all group-hover:translate-x-2" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default About;