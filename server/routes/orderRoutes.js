const express = require("express");
const { createOrder, getOrder, listOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", createOrder);
router.get("/:id", getOrder);
router.get("/", protect, listOrders);
router.patch("/:id/status", protect, updateOrderStatus);

module.exports = router;
