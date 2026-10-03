const OrderItem = require("../models/orderItemModel");

// ===============================
// GET ITEMS FOR AN ORDER
// ===============================

const getOrderItems = (req, res) => {
  const { orderId } = req.params;

  OrderItem.getByOrderId(orderId, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch order items",
        error: err.message,
      });
    }

    res.json({
      success: true,
      orderItems: results,
    });
  });
};

// ===============================
// CREATE ORDER ITEM
// ===============================

const createOrderItem = (req, res) => {
  const {
    order_id,
    menu_item_id,
    quantity,
    price,
  } = req.body;

  if (
    !order_id ||
    !menu_item_id ||
    !quantity ||
    price === undefined
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Order ID, menu item ID, quantity and price are required",
    });
  }

  OrderItem.create(
    {
      order_id,
      menu_item_id,
      quantity,
      price,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to create order item",
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Order item created successfully",
        orderItemId: result.insertId,
      });
    }
  );
};

module.exports = {
  getOrderItems,
  createOrderItem,
};