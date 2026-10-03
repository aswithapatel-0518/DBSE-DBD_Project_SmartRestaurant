const db = require("../config/db");

const Table = {
  getAll: (callback) => {
    const sql = `
      SELECT *
      FROM restaurant_tables
      ORDER BY id ASC
    `;

    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT *
      FROM restaurant_tables
      WHERE id = ?
    `;

    db.query(sql, [id], callback);
  },

  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE restaurant_tables
      SET status = ?
      WHERE id = ?
    `;

    db.query(sql, [status, id], callback);
  },
};

module.exports = Table;