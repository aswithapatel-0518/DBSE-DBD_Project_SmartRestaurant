const express = require("express");

const {
  getKitchenOrders,
  getKitchenOrderItems,
  updateKitchenOrderStatus,
} = require("../controllers/kitchenController");

const router = express.Router();

// Get all active kitchen orders
router.get("/", getKitchenOrders);

// Get items belonging to one kitchen order
router.get("/:orderId/items", getKitchenOrderItems);

// Update kitchen order status
router.put("/:id/status", updateKitchenOrderStatus);

module.exports = router;