const Table = require("../models/tableModel");

// ===============================
// GET ALL TABLES
// ===============================

const getAllTables = (req, res) => {
  Table.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch tables",
        error: err.message,
      });
    }

    res.json({
      success: true,
      tables: results,
    });
  });
};

// ===============================
// GET TABLE BY ID
// ===============================

const getTableById = (req, res) => {
  const { id } = req.params;

  Table.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch table",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    res.json({
      success: true,
      table: results[0],
    });
  });
};

// ===============================
// UPDATE TABLE STATUS
// ===============================

const updateTableStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Available",
    "Reserved",
    "Occupied",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid table status",
    });
  }

  Table.updateStatus(id, status, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update table status",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    res.json({
      success: true,
      message: "Table status updated successfully",
    });
  });
};

module.exports = {
  getAllTables,
  getTableById,
  updateTableStatus,
};