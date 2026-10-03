const Menu = require("../models/menuModel");

// ===============================
// GET ALL MENU ITEMS
// ===============================

const getAllMenuItems = (req, res) => {
  Menu.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch menu items",
        error: err.message,
      });
    }

    res.json({
      success: true,
      menuItems: results,
    });
  });
};

// ===============================
// GET MENU ITEM BY ID
// ===============================

const getMenuItemById = (req, res) => {
  const { id } = req.params;

  Menu.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch menu item",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      menuItem: results[0],
    });
  });
};

// ===============================
// CREATE MENU ITEM
// ===============================

const createMenuItem = (req, res) => {
  const {
    name,
    category,
    price,
    rating,
    emoji,
    description,
    popular,
    vegetarian,
  } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, category and price are required",
    });
  }

  Menu.create(
    {
      name,
      category,
      price,
      rating,
      emoji,
      description,
      popular,
      vegetarian,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to create menu item",
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Menu item created successfully",
        menuItemId: result.insertId,
      });
    }
  );
};

// ===============================
// UPDATE MENU ITEM
// ===============================

const updateMenuItem = (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    price,
    rating,
    emoji,
    description,
    popular,
    vegetarian,
  } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, category and price are required",
    });
  }

  Menu.update(
    id,
    {
      name,
      category,
      price,
      rating,
      emoji,
      description,
      popular,
      vegetarian,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to update menu item",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Menu item not found",
        });
      }

      res.json({
        success: true,
        message: "Menu item updated successfully",
      });
    }
  );
};

// ===============================
// DELETE MENU ITEM
// ===============================

const deleteMenuItem = (req, res) => {
  const { id } = req.params;

  Menu.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete menu item",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  });
};

// ===============================
// FIND OR CREATE MENU ITEM
// ===============================
// Used when a customer actually
// orders a food item.
//
// If the food already exists in MySQL,
// its ID is returned.
//
// If it does not exist,
// ONLY THAT ORDERED FOOD is inserted.
//
// ===============================

const findOrCreateMenuItem = (req, res) => {
  const {
    name,
    category,
    price,
    rating,
    emoji,
    description,
    popular,
    vegetarian,
  } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, category and price are required",
    });
  }

  Menu.findOrCreate(
    {
      name,
      category,
      price,
      rating,
      emoji,
      description,
      popular,
      vegetarian,
    },
    (err, menuItemId) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to find or create menu item",
          error: err.message,
        });
      }

      res.json({
        success: true,
        message: "Menu item ready for order",
        menuItemId,
      });
    }
  );
};

// ===============================
// EXPORT CONTROLLERS
// ===============================

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  findOrCreateMenuItem,
};