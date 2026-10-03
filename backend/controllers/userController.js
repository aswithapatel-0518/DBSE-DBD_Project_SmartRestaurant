const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// ============================================================
// GET ALL USERS
// Password is NEVER returned
// ============================================================
const getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: err.message,
      });
    }

    res.json({
      success: true,
      users: results,
    });
  });
};

// ============================================================
// GET USER BY ID
// Password is NEVER returned
// ============================================================
const getUserById = (req, res) => {
  const { id } = req.params;

  User.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch user",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: results[0],
    });
  });
};

// ============================================================
// CREATE USER
// Password is hashed before storing in MySQL
// ============================================================
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  try {
    // Check whether email already exists
    User.getByEmail(email, async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to check existing user",
          error: err.message,
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      User.create(
        {
          name,
          email,
          password: hashedPassword,
          role: role || "customer",
        },
        (createErr, result) => {
          if (createErr) {
            return res.status(500).json({
              success: false,
              message: "Failed to create user",
              error: createErr.message,
            });
          }

          res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: result.insertId,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Password hashing failed",
      error: error.message,
    });
  }
};

// ============================================================
// LOGIN USER
// Password is verified using bcrypt
// ============================================================
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  User.getByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Login failed",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // NEVER send password to frontend
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      };

      res.json({
        success: true,
        message: "Login successful",
        user: safeUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Password verification failed",
      });
    }
  });
};

// ============================================================
// EXPORTS
// ============================================================
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};