import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { Trash2, ArrowLeft, Plus, Minus, ReceiptText } from "lucide-react";

const Cart = () => {
  const { cart, addToBag, decreaseQuantity, removeFromBag, totals } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F1DE] flex flex-col items-center justify-center pt-20">
        <h2 className="text-3xl font-serif text-[#344E41] mb-4">Your bag is empty</h2>
        <NavLink to="/menu" className="text-[#A3B18A] uppercase tracking-widest text-xs font-bold border-b border-[#A3B18A]">Back to Menu</NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-[#A3B18A]/20 pb-8">
          <div>
            <NavLink to="/menu" className="flex items-center gap-2 text-[#A3B18A] text-[10px] uppercase tracking-widest font-bold mb-4">
              <ArrowLeft size={14} /> Continue Browsing
            </NavLink>
            <h1 className="text-5xl font-serif text-[#344E41]">Review <span className="italic font-light">Order</span></h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A3B18A] font-bold">Atelier Cozy Bistro</p>
            <p className="text-[10px] text-[#344E41]/60 font-serif">Table Service • Est. 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Itemized List */}
          <div className="lg:col-span-7 space-y-8">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-6 group">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-white">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex-grow py-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-serif text-[#344E41]">{item.name}</h3>
                    <span className="font-serif text-[#344E41]">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold mb-4">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white rounded-full px-2 py-1 shadow-sm border border-[#A3B18A]/10">
                      <button onClick={() => decreaseQuantity(item._id)} className="p-1 hover:text-[#D4AF37] transition-colors"><Minus size={14} /></button>
                      <span className="text-xs font-bold text-[#344E41] w-4 text-center">{item.quantity}</span>
                      <button onClick={() => addToBag(item)} className="p-1 hover:text-[#D4AF37] transition-colors"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromBag(item._id)} className="text-[#344E41]/30 hover:text-red-400 transition-colors">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: The "Bill" Receipt */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(52,78,65,0.1)] border border-[#A3B18A]/20 relative overflow-hidden">
              {/* Decorative Receipt Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-[#F4F1DE] rounded-b-full"></div>
              
              <div className="flex items-center gap-2 mb-8 justify-center pt-2">
                <ReceiptText size={18} className="text-[#D4AF37]" />
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#344E41]">Final Invoice</h2>
              </div>

              <div className="space-y-4 border-b border-dashed border-[#A3B18A]/30 pb-6 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#344E41]/60 font-serif italic">Subtotal</span>
                  <span className="text-[#344E41] font-serif">₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#344E41]/60 font-serif italic">GST (5%)</span>
                  <span className="text-[#344E41] font-serif">₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#344E41]/60 font-serif italic">Service Charge</span>
                  <span className="text-[#344E41] font-serif">₹{totals.serviceCharge.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#344E41]">Total Amount</span>
                <span className="text-4xl font-serif text-[#344E41]">₹{totals.total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-[#344E41] text-[#F4F1DE] py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] hover:text-[#344E41] transition-all duration-500 shadow-xl active:scale-[0.98]">
                Place Order
              </button>
              
              <p className="text-[8px] text-center mt-6 text-[#A3B18A] uppercase tracking-widest font-medium">
                Thank you for choosing Atelier Cozy
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;