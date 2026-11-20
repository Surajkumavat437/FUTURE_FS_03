const mongoose = require("mongoose");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItems");

const createOrder = async (req, res) => {
  try {
    const { customerName, phone, serviceType, tableNumber, items } = req.body;
    if (!customerName?.trim() || !phone?.trim()) {
      return res.status(400).json({ message: "Name and phone are required." });
    }
    if (!["pickup", "table"].includes(serviceType)) {
      return res.status(400).json({ message: "Choose pickup or table service." });
    }
    if (serviceType === "table" && !tableNumber?.trim()) {
      return res.status(400).json({ message: "Table number is required for table service." });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const normalized = new Map();
    for (const item of items) {
      const id = String(item.menuItem || item._id || "");
      const quantity = Number(item.quantity);
      if (!mongoose.isValidObjectId(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return res.status(400).json({ message: "The cart contains an invalid item or quantity." });
      }
      normalized.set(id, (normalized.get(id) || 0) + quantity);
    }
    const menuItems = await MenuItem.find({ _id: { $in: [...normalized.keys()] }, isAvailable: true });
    if (menuItems.length !== normalized.size) {
      return res.status(400).json({ message: "One or more items are unavailable. Refresh the menu and try again." });
    }

    const orderItems = menuItems.map((item) => ({
      menuItem: item._id,
      name: item.name,
      price: item.price,
      quantity: normalized.get(String(item._id)),
    }));
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const serviceCharge = subtotal > 0 ? 25 : 0;
    const order = await Order.create({
      customerName: customerName.trim(), phone: phone.trim(), serviceType,
      tableNumber: serviceType === "table" ? tableNumber.trim() : undefined,
      items: orderItems, subtotal, tax, serviceCharge, total: subtotal + tax + serviceCharge,
    });
    return res.status(201).json({ data: order });
  } catch (error) {
    console.error("Order creation failed:", error);
    return res.status(500).json({ message: "Unable to place your order right now." });
  }
};

const getOrder = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Order not found." });
    const order = await Order.findById(req.params.id).select("-phone");
    if (!order) return res.status(404).json({ message: "Order not found." });
    return res.json({ data: order });
  } catch (error) {
    console.error("Order lookup failed:", error);
    return res.status(500).json({ message: "Unable to load order status." });
  }
};

const listOrders = async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(200);
    return res.json({ data: orders });
  } catch (error) {
    console.error("Order queue failed:", error);
    return res.status(500).json({ message: "Unable to load the order queue." });
  }
};

const updateOrderStatus = async (req, res) => {
  const nextStatus = { new: "preparing", preparing: "ready", ready: "completed" };
  if (!nextStatus[req.body.status]) return res.status(400).json({ message: "Invalid order status." });
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Order not found." });
    const currentOrder = await Order.findById(req.params.id);
    if (!currentOrder) return res.status(404).json({ message: "Order not found." });
    if (nextStatus[currentOrder.status] !== req.body.status) {
      return res.status(409).json({ message: "Orders must move through each stage in sequence." });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    return res.json({ data: order });
  } catch (error) {
    console.error("Order status update failed:", error);
    return res.status(500).json({ message: "Unable to update order status." });
  }
};

module.exports = { createOrder, getOrder, listOrders, updateOrderStatus };
