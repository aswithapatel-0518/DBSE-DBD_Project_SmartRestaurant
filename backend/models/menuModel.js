const db = require("../config/db");

const Menu = {
  getAll: (callback) => {
    const sql = "SELECT * FROM menu_items ORDER BY id ASC";
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM menu_items WHERE id = ?";
    db.query(sql, [id], callback);
  },

  create: (item, callback) => {
    const sql = `
      INSERT INTO menu_items
      (name, category, price, rating, emoji, description, popular, vegetarian)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        item.name,
        item.category,
        item.price,
        item.rating || 0,
        item.emoji || "",
        item.description || "",
        item.popular || false,
        item.vegetarian || false,
      ],
      callback
    );
  },

  update: (id, item, callback) => {
    const sql = `
      UPDATE menu_items
      SET name = ?,
          category = ?,
          price = ?,
          rating = ?,
          emoji = ?,
          description = ?,
          popular = ?,
          vegetarian = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        item.name,
        item.category,
        item.price,
        item.rating || 0,
        item.emoji || "",
        item.description || "",
        item.popular || false,
        item.vegetarian || false,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM menu_items WHERE id = ?";
    db.query(sql, [id], callback);
  },
  findOrCreate: (item, callback) => {
    const findSql = `
      SELECT id
      FROM menu_items
      WHERE name = ?
      LIMIT 1
    `;

    db.query(findSql, [item.name], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length > 0) {
        return callback(null, results[0].id);
      }

      const insertSql = `
        INSERT INTO menu_items
        (
          name,
          category,
          price,
          rating,
          emoji,
          description,
          popular,
          vegetarian
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          item.name,
          item.category,
          item.price,
          item.rating || 0,
          item.emoji || "",
          item.description || "",
          item.popular || false,
          item.vegetarian || false,
        ],
        (insertErr, result) => {
          if (insertErr) {
            return callback(insertErr);
          }

          callback(null, result.insertId);
        }
      );
    });
  },
};

module.exports = Menu;