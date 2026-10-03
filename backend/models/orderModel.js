const db = require("../config/db");

const Order = {
  getAll: (callback) => {
    const sql = `
      SELECT
        o.*,
        rt.table_number
      FROM orders o
      LEFT JOIN restaurant_tables rt
        ON o.table_id = rt.id
      ORDER BY o.created_at DESC
    `;

    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT
        o.*,
        rt.table_number
      FROM orders o
      LEFT JOIN restaurant_tables rt
        ON o.table_id = rt.id
      WHERE o.id = ?
    `;

    db.query(sql, [id], callback);
  },

  create: (order, callback) => {
    const sql = `
      INSERT INTO orders
      (
        order_number,
        user_id,
        table_id,
        customer_name,
        customer_phone,
        total_amount,
        payment_method,
        status,
        instructions
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        order.order_number,
        order.user_id || null,
        order.table_id || null,
        order.customer_name,
        order.customer_phone || null,
        order.total_amount,
        order.payment_method || "Cash",
        order.status || "New",
        order.instructions || "",
      ],
      callback
    );
  },

  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE orders
      SET status = ?
      WHERE id = ?
    `;

    db.query(sql, [status, id], callback);
  },
};

module.exports = Order;