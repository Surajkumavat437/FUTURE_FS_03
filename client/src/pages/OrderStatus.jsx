import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock3, CheckCircle2 } from "lucide-react";
import { getOrder } from "../services/orderService";

const stages = ["new", "preparing", "ready", "completed"];
const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      const response = await getOrder(id);
      setOrder(response.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not load this order.");
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!order || order.status === "completed") return undefined;
    const timer = window.setInterval(load, 15000);
    return () => window.clearInterval(timer);
  }, [load, order]);

  return (
    <div className="min-h-screen bg-[#F4F1DE] px-6 pt-32 pb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
        {error ? <div role="alert" className="text-center"><h1 className="text-3xl font-serif text-[#344E41]">Order unavailable</h1><p className="mt-3 text-sm text-red-700">{error}</p></div> : !order ? <p className="text-center py-16 text-[#344E41]/60">Loading order…</p> : <>
          <div className="text-center"><p className="text-[10px] uppercase tracking-[0.3em] text-[#A3B18A] font-bold">Atelier Cozy Bistro</p><h1 className="text-4xl font-serif text-[#344E41] mt-3">Order <span className="italic">status</span></h1><p className="text-sm opacity-60 mt-2">#{order._id.slice(-6).toUpperCase()} · Thanks, {order.customerName}</p></div>
          <div className="grid grid-cols-4 gap-2 mt-10">{stages.map((stage, index) => {
            const done = index <= stages.indexOf(order.status);
            return <div key={stage} className="text-center"><div className={`mx-auto h-10 w-10 rounded-full flex items-center justify-center ${done ? "bg-[#344E41] text-white" : "bg-gray-100 text-gray-400"}`}>{index < stages.indexOf(order.status) ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}</div><p className={`mt-2 text-[9px] sm:text-xs uppercase tracking-wider ${done ? "text-[#344E41] font-bold" : "text-gray-400"}`}>{stage}</p></div>;
          })}</div>
          <p className="text-center mt-7 rounded-xl bg-[#F4F1DE] p-4 text-sm text-[#344E41]">{order.status === "completed" ? "Your order is complete. Enjoy!" : order.status === "ready" ? "Your order is ready." : order.status === "preparing" ? "The kitchen is preparing your order." : "We received your order and will begin shortly."}</p>
          <div className="mt-8 space-y-3 border-b border-[#344E41]/10 pb-5">{order.items.map((item, index) => <div key={`${item.menuItem}-${index}`} className="flex justify-between gap-4 text-sm"><span>{item.quantity} × {item.name}</span><span>₹{(item.price * item.quantity).toFixed(2)}</span></div>)}</div>
          <div className="flex justify-between mt-5 font-serif text-xl text-[#344E41]"><span>Total</span><span>₹{Number(order.total).toFixed(2)}</span></div>
          <p className="text-center mt-8"><Link to="/menu" className="text-xs uppercase tracking-widest font-bold text-[#71805e] border-b border-[#A3B18A] pb-1">Back to Menu</Link></p>
        </>}
      </div>
    </div>
  );
};

export default OrderStatus;
