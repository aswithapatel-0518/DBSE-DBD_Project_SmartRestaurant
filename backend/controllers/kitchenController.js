const Kitchen = require("../models/kitchenModel");
const Order = require("../models/orderModel");

// ===============================
// GET ACTIVE KITCHEN ORDERS
// ===============================

const getKitchenOrders = (req, res) => {
  Kitchen.getActiveOrders((err, orders) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch kitchen orders",
        error: err.message,
      });
    }

    res.json({
      success: true,
      orders,
    });
  });
};

// ===============================
// GET ITEMS FOR A KITCHEN ORDER
// ===============================

const getKitchenOrderItems = (req, res) => {
  const { orderId } = req.params;

  Kitchen.getOrderItems(orderId, (err, items) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch kitchen order items",
        error: err.message,
      });
    }

    res.json({
      success: true,
      orderItems: items,
    });
  });
};

// ===============================
// UPDATE KITCHEN ORDER STATUS
// ===============================

const updateKitchenOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "New",
    "Accepted",
    "Preparing",
    "Ready",
    "Served",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status",
    });
  }

  Order.updateStatus(id, status, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update kitchen order status",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Kitchen order status updated successfully",
    });
  });
};

module.exports = {
  getKitchenOrders,
  getKitchenOrderItems,
  updateKitchenOrderStatus,
};