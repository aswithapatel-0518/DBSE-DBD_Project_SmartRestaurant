const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tableRoutes = require("./routes/tableRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const kitchenRoutes = require("./routes/kitchenRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// USER ROUTES
// ===============================

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("Smart Restaurant Backend is running!");
});

// ===============================
// DATABASE TEST ROUTE
// ===============================

app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 AS test", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "MySQL database connected successfully!",
      result,
    });
  });
});

// ===============================
// START SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});