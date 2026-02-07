import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, Leaf } from "lucide-react";
import { getAIRecommendation } from "../../services/aiService";

const AIChatBox = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to the Atelier. I am your digital concierge. How may I guide your palate today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newHistory = [...messages, userMessage]; 
    
    setMessages(newHistory);
    setInput("");
    setIsTyping(true);

    try {
      const response = await getAIRecommendation(newHistory); 
      setMessages(prev => [...prev, { role: "assistant", content: response.reply }]);
    } catch (error) {
      console.error("Concierge Service Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "My apologies, the connection is momentarily disrupted. Shall we try again?" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] w-full bg-[#FAF9F6] rounded-[3rem] border border-[#344E41]/10 shadow-2xl overflow-hidden relative">
      
      {/* Header: Atelier Style */}
      <div className="p-8 border-b border-[#344E41]/5 bg-[#344E41] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#A3B18A]/20 rounded-2xl border border-[#A3B18A]/30 text-[#A3B18A]">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[#F4F1DE] font-serif tracking-wide text-lg">Atelier Concierge</h3>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3B18A] animate-pulse" />
                <p className="text-[9px] text-[#F4F1DE]/50 uppercase tracking-[0.2em] font-bold">Palate Neural Link</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              
              {/* Avatar Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 shadow-sm
                ${msg.role === "user" 
                  ? "bg-[#344E41] border-[#344E41] text-[#F4F1DE]" 
                  : "bg-white border-[#A3B18A]/30 text-[#344E41]"}`}>
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Bubble */}
              <div className={`p-5 rounded-[2rem] text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
                msg.role === "user" 
                  ? "bg-[#344E41] text-[#F4F1DE] rounded-tr-none" 
                  : "bg-white text-[#344E41] border border-[#344E41]/5 rounded-tl-none font-serif italic"
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start items-center gap-3 animate-in fade-in duration-500">
            <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[10px] text-[#344E41]/40 uppercase tracking-widest font-black italic">Consulting the archives...</span>
          </div>
        )}
        <div ref={scrollRef} className="h-4" />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-8 bg-[#344E41] border-t border-[#344E41]/5 shrink-0">
        <div className="relative flex items-center group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your desired flavor profile..."
            className="w-full bg-[#F4F1DE]/50 border border-[#344E41]/10 rounded-full px-8 py-5 text-sm text-[#344E41] focus:outline-none focus:border-[#344E41] focus:bg-white transition-all placeholder:text-[#344E41]/30 italic font-serif"
          />
          <button 
            type="submit" 
            className="absolute right-2 p-4 bg-[#344E41] hover:bg-[#3E5C4D] text-[#F4F1DE] rounded-full transition-all shadow-lg active:scale-90 group-hover:rotate-[-10deg]"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBox;