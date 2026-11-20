import { useCallback, useEffect, useState } from "react";
import { Clock3, RefreshCw } from "lucide-react";
import { getOrders, updateOrderStatus } from "../../services/orderService";

const stages = ["new", "preparing", "ready", "completed"];
const nextStage = { new: "preparing", preparing: "ready", ready: "completed" };
const money = (value) => `₹${Number(value).toFixed(2)}`;

const OrderQueue = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    try {
      const response = await getOrders({ headers: { Authorization: `Bearer ${token}` } });
      setOrders(response.data.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
    const timer = window.setInterval(loadOrders, 15000);
    return () => window.clearInterval(timer);
  }, [loadOrders]);

  const advance = async (order) => {
    const status = nextStage[order.status];
    if (!status) return;
    setBusyId(order._id);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await updateOrderStatus(order._id, status, { headers: { Authorization: `Bearer ${token}` } });
      setOrders((current) => current.map((item) => item._id === order._id ? response.data.data : item));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update order status.");
    } finally {
      setBusyId("");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div><h2 className="text-2xl font-serif">Order Queue</h2><p className="text-sm opacity-60 mt-1">Move each order through the service stages.</p></div>
        <button onClick={loadOrders} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#344E41]/10 text-xs uppercase tracking-wider"><RefreshCw size={14} /> Refresh</button>
      </div>
      {error && <p role="alert" className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</p>}
      {loading ? <p className="py-10 text-center opacity-60">Loading orders…</p> : orders.length === 0 ? <p className="py-10 text-center opacity-60">No orders yet.</p> : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order._id} className="rounded-2xl border border-[#344E41]/10 p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="font-serif text-xl">{order.customerName} <span className="text-sm opacity-50">· #{order._id.slice(-6).toUpperCase()}</span></p>
                  <p className="text-xs uppercase tracking-widest text-[#71805e] mt-1">{order.serviceType === "table" ? `Table ${order.tableNumber}` : "Pickup"} · {order.phone} · {new Date(order.createdAt).toLocaleString()}</p></div>
                <span className="px-3 py-1 rounded-full bg-[#A3B18A]/20 text-xs font-bold uppercase tracking-wider">{order.status}</span>
              </div>
              <div className="grid sm:grid-cols-[1fr_auto] gap-4 mt-5">
                <ul className="space-y-1 text-sm">{order.items.map((item, index) => <li key={`${item.menuItem}-${index}`}>{item.quantity} × {item.name} <span className="opacity-50">({money(item.price * item.quantity)})</span></li>)}</ul>
                <div className="sm:text-right"><p className="font-serif text-xl">{money(order.total)}</p><p className="text-xs opacity-50">{money(order.subtotal)} + tax + service</p></div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#344E41]/10 pt-4">
                <div className="flex gap-1" aria-label={`Order stage: ${order.status}`}>{stages.map((stage) => <span key={stage} className={`rounded-full px-2 py-1 text-[9px] uppercase tracking-wide ${stages.indexOf(stage) <= stages.indexOf(order.status) ? "bg-[#344E41] text-white" : "bg-gray-100 text-gray-400"}`}>{stage}</span>)}</div>
                {nextStage[order.status] ? <button disabled={busyId === order._id} onClick={() => advance(order)} className="inline-flex items-center gap-2 rounded-xl bg-[#344E41] text-white px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50"><Clock3 size={14} /> Mark {nextStage[order.status]}</button> : <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Complete</span>}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderQueue;
