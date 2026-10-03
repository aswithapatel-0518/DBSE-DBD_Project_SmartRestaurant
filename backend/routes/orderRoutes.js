const express = require("express");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// GET all orders
router.get("/", getAllOrders);

// GET order by ID
router.get("/:id", getOrderById);

// CREATE order
router.post("/", createOrder);

// UPDATE order status
router.put("/:id/status", updateOrderStatus);

module.exports = router;