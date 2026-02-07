import { Coffee, Sparkles, Bot, ChevronRight, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#F4F1DE] text-[#344E41] font-sans selection:bg-[#A3B18A] selection:text-white overflow-x-hidden">
      
      {/* Paper Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-50"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        {/* Background Image: Balanced with a soft fade */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/coffee2.png" 
            alt="Bistro Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1DE] via-[#F4F1DE]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-9xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Side: Modern Bistro Typography */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-md border border-[#A3B18A]/30 px-5 py-1.5 rounded-full shadow-sm">
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
              <span className="text-[#3A5A40] text-[9px] font-black tracking-[0.4em] uppercase">
                The Reserve Experience 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight text-[#344E41]">
              Crafting the Art <br />
              <span className="italic font-light text-[#A3B18A]">of the Everyday</span> <br />
              <span className="md:pl-16">Moment.</span>
            </h1>

            <p className="text-[#588157] text-base md:text-lg max-w-md leading-relaxed font-light italic opacity-90">
              Escape into a space where artisanal flavors meet intentional design. 
              From the first pour to the final bite, excellence is our only standard.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/menu"
                className="group relative inline-flex items-center justify-center rounded-xl bg-[#344E41] px-8 py-4 text-[#F4F1DE] font-bold transition-all hover:bg-[#3A5A40] hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="text-[10px] uppercase tracking-[0.2em]">View the Menu</span>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/reservation"
                className="inline-flex items-center justify-center rounded-xl border border-[#344E41]/20 bg-white/40 backdrop-blur-xl px-8 py-4 text-[#344E41] font-bold transition-all hover:bg-white/80"
              >
                <span className="text-[10px] uppercase tracking-[0.2em]">Book a Table</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Featured Card */}
          <div className="hidden lg:flex justify-end">
            <div className="w-full max-w-sm aspect-[4/5] relative group">
              <div className="absolute inset-0 bg-[#A3B18A] rounded-[3rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000"></div>

              <div className="relative h-full overflow-hidden border-[8px] border-white rounded-[3rem] shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <img
                    src="/images/coffee2.png" 
                    alt="Artisan Craft"
                    className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#344E41]/80 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                  <div className="bg-[#F4F1DE] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                    <ChefHat className="h-5 w-5 text-[#344E41]" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-4">
                    <p className="text-white text-2xl font-serif italic leading-snug">
                      "A masterclass in modern bistro hospitality."
                    </p>
                    <div className="h-px w-12 bg-[#D4AF37]"></div>
                    <span className="text-white/70 text-[9px] tracking-[0.3em] uppercase font-black">
                      Epicurean Review 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-white/30 relative py-24 border-y border-[#A3B18A]/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center text-center mb-16 space-y-3">
            <span className="text-[#D4AF37] text-[9px] tracking-[0.6em] uppercase font-black">Our Foundation</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#344E41]">
              The Pillars of <span className="italic text-[#A3B18A]">Cozy.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Coffee />,
                title: "Artisan Roasts",
                desc: "Direct-trade beans selected for clarity and depth, roasted in small batches.",
              },
              {
                icon: <ChefHat />,
                title: "Local Kitchen",
                desc: "Menus inspired by the season, using ingredients from local heritage farms.",
              },
              {
                icon: <Sparkles />,
                title: "Curated Space",
                desc: "An atmosphere designed for slow mornings and intimate evening conversations.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-10 rounded-3xl bg-white border border-[#A3B18A]/10 transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <div className="text-[#344E41] mb-8 w-12 h-12 flex items-center justify-center bg-[#F4F1DE] rounded-xl transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif text-[#344E41] mb-4">{feature.title}</h3>
                <p className="text-[#588157] leading-relaxed text-sm font-light italic opacity-80">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer Teaser */}
      <footer className="py-16 text-center">
         <p className="text-[9px] uppercase tracking-[0.5em] text-[#A3B18A] font-bold">
            Atelier Cozy Bistro <span className="mx-4 text-[#D4AF37]">✦</span> Boutique Hospitality
         </p>
      </footer>
    </div>
  );
};

export default Home;