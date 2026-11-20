import api from "./api";

export const createOrder = (order) => api.post("/orders", order);
export const getOrder = (id) => api.get(`/orders/${id}`);
export const getOrders = (config) => api.get("/orders", config);
export const updateOrderStatus = (id, status, config) => api.patch(`/orders/${id}/status`, { status }, config);
