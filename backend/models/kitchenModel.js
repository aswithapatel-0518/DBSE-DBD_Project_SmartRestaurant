const db = require("../config/db");

const Kitchen = {
  // GET ACTIVE KITCHEN ORDERS
  getActiveOrders: (callback) => {
    const sql = `
      SELECT
        o.*,
        rt.table_number
      FROM orders o
      LEFT JOIN restaurant_tables rt
        ON o.table_id = rt.id
      WHERE o.status IN ('New', 'Accepted', 'Preparing', 'Ready')
      ORDER BY o.created_at ASC
    `;

    db.query(sql, callback);
  },

  // GET ITEMS FOR A KITCHEN ORDER
  getOrderItems: (orderId, callback) => {
    const sql = `
      SELECT
        oi.id,
        oi.order_id,
        oi.menu_item_id,
        oi.quantity,
        oi.price,
        mi.name,
        mi.category,
        mi.emoji
      FROM order_items oi
      JOIN menu_items mi
        ON oi.menu_item_id = mi.id
      WHERE oi.order_id = ?
      ORDER BY oi.id ASC
    `;

    db.query(sql, [orderId], callback);
  },
};

module.exports = Kitchen;