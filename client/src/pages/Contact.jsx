import { useState } from "react";
import { Send, LifeBuoy, ArrowRight, ShieldCheck, Clock } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState("idle"); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "Service Experience",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // ... logic stays the same ...
    setTimeout(() => setStatus("success"), 1500); // Simulated for demo
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#F4F1DE] flex items-center justify-center px-6">
        <div className="bg-[#344E41] p-16 rounded-[3rem] text-center space-y-6 max-w-lg shadow-2xl border border-[#A3B18A]/20">
          <ShieldCheck className="text-[#A3B18A] w-16 h-16 mx-auto mb-4" />
          <h3 className="text-3xl font-serif text-[#F4F1DE]">Issue Logged.</h3>
          <p className="text-[#F4F1DE]/70 font-serif italic">Your ticket has been prioritized. Our management will contact you directly to resolve this.</p>
          <button onClick={() => setStatus("idle")} className="text-[#A3B18A] uppercase tracking-widest text-[10px] font-bold border-b border-[#A3B18A] pb-1">Submit Another Report</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Updated Title: Problem Solving Focus */}
        <div className="mb-16 space-y-4">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black">Support & Resolution</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#344E41] leading-tight">
            How can we <br /> <span className="italic text-[#A3B18A]">make it right?</span>
          </h1>
          <p className="text-[#588157] font-serif italic text-lg opacity-80 max-w-xl">
            Experience an issue? Tell us what happened. Our guest relations team investigates every report within 12 hours.
          </p>
        </div>

        {/* The Card: Colors have been "Pushed" for contrast */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(52,78,65,0.3)] border border-[#344E41]/10">
          
          {/* Left Sidebar: Dark Forest Green */}
          <div className="lg:col-span-4 bg-[#344E41] p-10 md:p-14 text-[#F4F1DE] flex flex-col justify-between relative overflow-hidden">
            {/* Background Icon Decoration */}
            <LifeBuoy className="absolute -bottom-10 -left-10 w-40 h-40 opacity-5 rotate-12" />
            
            <div className="relative z-10 space-y-12">
              <LifeBuoy className="text-[#A3B18A]" size={32} />
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-[#A3B18A] text-[9px] uppercase tracking-[0.3em] font-black">Our Guarantee</h3>
                  <p className="font-serif italic text-xl leading-relaxed">
                    Every guest deserves a <span className="text-[#A3B18A]">flawless</span> experience. If we missed the mark, we will fix it.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[#A3B18A]">
                   <Clock size={20} />
                   <span className="text-xs font-bold uppercase tracking-widest">12-Hour Response Time</span>
                </div>
              </div>
            </div>

            <p className="relative z-10 text-[9px] uppercase tracking-widest opacity-40">Guest Relations Dept.</p>
          </div>

          {/* Right Side: Darker Sage/Stone (Prevents "collapsing" into Cream bg) */}
          <div className="lg:col-span-8 bg-[#DAD5BE] p-10 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group border-b border-[#344E41]/30 pb-2 focus-within:border-[#344E41] transition-all">
                  <label className="text-[9px] uppercase tracking-widest text-[#344E41]/60 font-black">Your Name</label>
                  <input 
                    name="name" 
                    required 
                    onChange={handleChange} 
                    className="w-full bg-transparent pt-2 text-[#344E41] focus:outline-none text-lg font-serif italic placeholder:text-[#344E41]/20"
                    placeholder="Guest Name"
                  />
                </div>
                <div className="group border-b border-[#344E41]/30 pb-2 focus-within:border-[#344E41] transition-all">
                  <label className="text-[9px] uppercase tracking-widest text-[#344E41]/60 font-black">Contact Email</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    className="w-full bg-transparent pt-2 text-[#344E41] focus:outline-none text-lg font-serif italic placeholder:text-[#344E41]/20"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="group border-b border-[#344E41]/30 pb-2 focus-within:border-[#344E41] transition-all">
                <label className="text-[9px] uppercase tracking-widest text-[#344E41]/60 font-black">Nature of Issue</label>
                <select 
                  name="issueType" 
                  onChange={handleChange}
                  className="w-full bg-transparent pt-2 text-[#344E41] focus:outline-none appearance-none cursor-pointer font-serif italic text-lg"
                >
                  <option>Service Experience</option>
                  <option>Quality of Fare</option>
                  <option>Reservation Discrepancy</option>
                  <option>Billing Inquiry</option>
                  <option>Other Concerns</option>
                </select>
              </div>

              <div className="group border-b border-[#344E41]/30 pb-2 focus-within:border-[#344E41] transition-all">
                <label className="text-[9px] uppercase tracking-widest text-[#344E41]/60 font-black">Detailed Description</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  required 
                  onChange={handleChange} 
                  className="w-full bg-transparent pt-2 text-[#344E41] focus:outline-none resize-none text-lg font-serif italic placeholder:text-[#344E41]/20"
                  placeholder="Tell us what happened so we can assist you..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "sending"}
                className="inline-flex items-center gap-6 bg-[#344E41] text-[#F4F1DE] px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#3E5C4D] shadow-xl hover:shadow-[#344E41]/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {status === "sending" ? "Logging Issue..." : "Submit Report"}
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;