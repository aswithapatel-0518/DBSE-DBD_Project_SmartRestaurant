const db = require("../config/db");

const OrderItem = {
  getByOrderId: (orderId, callback) => {
    const sql = `
      SELECT
        oi.*,
        mi.name,
        mi.category,
        mi.emoji
      FROM order_items oi
      JOIN menu_items mi
        ON oi.menu_item_id = mi.id
      WHERE oi.order_id = ?
    `;

    db.query(sql, [orderId], callback);
  },

  create: (item, callback) => {
    const sql = `
      INSERT INTO order_items
      (order_id, menu_item_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        item.order_id,
        item.menu_item_id,
        item.quantity,
        item.price,
      ],
      callback
    );
  },
};

module.exports = OrderItem;