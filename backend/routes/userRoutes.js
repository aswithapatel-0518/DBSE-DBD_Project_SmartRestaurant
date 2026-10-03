const express = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// Login route MUST come before /:id
router.post("/login", loginUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Create/register user
router.post("/", createUser);

module.exports = router;