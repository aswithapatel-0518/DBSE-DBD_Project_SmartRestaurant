const express = require("express");

const {
  getAllTables,
  getTableById,
  updateTableStatus,
} = require("../controllers/tableController");

const router = express.Router();

// GET all tables
router.get("/", getAllTables);

// GET table by ID
router.get("/:id", getTableById);

// UPDATE table status
router.put("/:id/status", updateTableStatus);

module.exports = router;