const express = require("express");

const {
  getOrderItems,
  createOrderItem,
} = require("../controllers/orderItemController");

const router = express.Router();

router.get("/:orderId", getOrderItems);
router.post("/", createOrderItem);

module.exports = router;