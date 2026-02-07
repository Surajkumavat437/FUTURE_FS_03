import AIChatBox from "../components/ai/AIChatBox";
import { Sparkles, ShieldCheck, Zap, BrainCircuit, Bot, ArrowRight, Coffee, Microscope } from "lucide-react";

const AIAssistant = () => {
  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-24 pb-12 px-6 relative overflow-hidden">
      
      {/* Dynamic Background Glassmorphism */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#A3B18A]/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#344E41]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header: More Compact & Elegant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#344E41] text-[#A3B18A] text-[9px] tracking-[0.4em] uppercase font-black">
              <Bot size={12} /> Digital Concierge
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-[#344E41] leading-none">
              The <span className="italic font-light text-[#A3B18A]">Palate</span> Engine
            </h1>
          </div>
          <p className="text-[#344E41]/60 font-serif italic text-lg lg:text-right max-w-md lg:ml-auto">
            A neural approach to the perfect cup. Discuss origins, chemical profiles, or curated pairings.
          </p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Command Center (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Feature Card 1 */}
            <div className="group p-6 bg-[#344E41] rounded-[2rem] text-[#F4F1DE] transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/10 rounded-xl text-[#A3B18A]">
                  <Microscope size={20} />
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
              <h4 className="text-xl font-serif mb-2">Extraction Lab</h4>
              <p className="text-xs text-[#F4F1DE]/60 leading-relaxed font-light">
                Ask about TDS levels, grind distributions, or water chemistry for your home brew.
              </p>
            </div>

            {/* Quick Prompt Cards */}
            <div className="grid grid-cols-2 gap-4">
               <button className="p-5 bg-white/60 border border-[#344E41]/5 rounded-3xl text-left hover:bg-white transition-all group">
                  <Coffee size={16} className="text-[#A3B18A] mb-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#344E41]">Bean Finder</span>
               </button>
               <button className="p-5 bg-white/60 border border-[#344E41]/5 rounded-3xl text-left hover:bg-white transition-all group">
                  <Zap size={16} className="text-[#A3B18A] mb-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#344E41]">Fast Guide</span>
               </button>
            </div>

            {/* Trust Banner */}
            <div className="flex items-center gap-4 p-6 bg-[#A3B18A]/10 rounded-[2rem] border border-[#A3B18A]/20">
              <ShieldCheck className="text-[#344E41]/40" size={20} />
              <p className="text-[9px] uppercase tracking-widest font-bold text-[#344E41]/60">
                Encrypted Neural Link <br />
                <span className="text-[#A3B18A]">Data Private</span>
              </p>
            </div>
          </div>

          {/* Right: The Chat Canvas (8 Cols) */}
          <div className="lg:col-span-8 relative">
             {/* Floating UI Elements for Polish */}
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#344E41] rounded-3xl rotate-12 -z-10 opacity-5" />
             
             <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] p-2 border border-white/50 shadow-[0_30px_70px_-20px_rgba(52,78,65,0.1)]">
                <AIChatBox />
             </div>
          </div>

        </div>

        {/* Minimal Footer */}
        <div className="mt-12 flex justify-between items-center opacity-30 px-4">
           <div className="h-px flex-1 bg-[#344E41]" />
           <p className="text-[8px] uppercase tracking-[0.8em] font-black text-[#344E41] px-8">
             MMXXVI Atelier
           </p>
           <div className="h-px flex-1 bg-[#344E41]" />
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;