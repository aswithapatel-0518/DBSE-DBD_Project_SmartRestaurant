const Order = require("../models/orderModel");

// ===============================
// GET ALL ORDERS
// ===============================

const getAllOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: err.message,
      });
    }

    res.json({
      success: true,
      orders: results,
    });
  });
};

// ===============================
// GET ORDER BY ID
// ===============================

const getOrderById = (req, res) => {
  const { id } = req.params;

  Order.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch order",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order: results[0],
    });
  });
};

// ===============================
// CREATE ORDER
// ===============================

const createOrder = (req, res) => {
  const {
    order_number,
    user_id,
    table_id,
    customer_name,
    customer_phone,
    total_amount,
    payment_method,
    instructions,
  } = req.body;

  if (
    !order_number ||
    !customer_name ||
    total_amount === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Order number, customer name and total amount are required",
    });
  }

  Order.create(
    {
      order_number,
      user_id,
      table_id,
      customer_name,
      customer_phone,
      total_amount,
      payment_method,
      instructions,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to create order",
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        orderId: result.insertId,
      });
    }
  );
};

// ===============================
// UPDATE ORDER STATUS
// ===============================

const updateOrderStatus = (req, res) => {
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
        message: "Failed to update order status",
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
      message: "Order status updated successfully",
    });
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};