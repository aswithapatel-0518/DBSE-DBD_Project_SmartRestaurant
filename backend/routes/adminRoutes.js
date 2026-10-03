const express = require("express");

const {
  getDashboardSummary,
  getAdminOrders,
} = require("../controllers/adminController");

const router = express.Router();

// Admin dashboard summary
router.get("/dashboard", getDashboardSummary);

// Get all orders
router.get("/orders", getAdminOrders);

module.exports = router;