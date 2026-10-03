const db = require("../config/db");

// ===============================
// ADMIN DASHBOARD SUMMARY
// ===============================

const getDashboardSummary = (req, res) => {
  const queries = {
    users: "SELECT COUNT(*) AS count FROM users",
    menuItems: "SELECT COUNT(*) AS count FROM menu_items",
    orders: "SELECT COUNT(*) AS count FROM orders",
    activeOrders: `
      SELECT COUNT(*) AS count
      FROM orders
      WHERE status IN ('New', 'Accepted', 'Preparing', 'Ready')
    `,
    revenue: `
      SELECT COALESCE(SUM(total_amount), 0) AS total
      FROM orders
      WHERE status = 'Served'
    `,
    tables: `
      SELECT
        COUNT(*) AS total,
        SUM(status = 'Available') AS available,
        SUM(status = 'Reserved') AS reserved,
        SUM(status = 'Occupied') AS occupied
      FROM restaurant_tables
    `,
  };

  const results = {};

  db.query(queries.users, (err, usersResult) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard users",
        error: err.message,
      });
    }

    results.users = usersResult[0].count;

    db.query(queries.menuItems, (err, menuResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch dashboard menu",
          error: err.message,
        });
      }

      results.menuItems = menuResult[0].count;

      db.query(queries.orders, (err, ordersResult) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard orders",
            error: err.message,
          });
        }

        results.orders = ordersResult[0].count;

        db.query(queries.activeOrders, (err, activeResult) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to fetch active orders",
              error: err.message,
            });
          }

          results.activeOrders = activeResult[0].count;

          db.query(queries.revenue, (err, revenueResult) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failed to fetch revenue",
                error: err.message,
              });
            }

            results.revenue = revenueResult[0].total;

            db.query(queries.tables, (err, tableResult) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "Failed to fetch table statistics",
                  error: err.message,
                });
              }

              results.tables = tableResult[0];

              res.json({
                success: true,
                dashboard: results,
              });
            });
          });
        });
      });
    });
  });
};


// ===============================
// GET ALL ADMIN ORDERS
// ===============================

const getAdminOrders = (req, res) => {
  const sql = `
    SELECT
      o.*,
      rt.table_number
    FROM orders o
    LEFT JOIN restaurant_tables rt
      ON o.table_id = rt.id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch admin orders",
        error: err.message,
      });
    }

    res.json({
      success: true,
      orders: results,
    });
  });
};

module.exports = {
  getDashboardSummary,
  getAdminOrders,
};