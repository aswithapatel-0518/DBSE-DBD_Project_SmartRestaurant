const express = require("express");

const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  findOrCreateMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

// GET all menu items
router.get("/", getAllMenuItems);

// GET menu item by ID
router.get("/:id", getMenuItemById);

// CREATE menu item
router.post("/", createMenuItem);

// FIND OR CREATE menu item
// Used only when a customer actually orders it
router.post("/find-or-create", findOrCreateMenuItem);

// UPDATE menu item
router.put("/:id", updateMenuItem);

// DELETE menu item
router.delete("/:id", deleteMenuItem);

module.exports = router;