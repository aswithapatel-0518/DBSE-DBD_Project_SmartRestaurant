const db = require("../config/db");

const User = {
  getAll: (callback) => {
    const sql = `
      SELECT id, name, email, role, created_at
      FROM users
    `;

    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT id, name, email, role, created_at
      FROM users
      WHERE id = ?
    `;

    db.query(sql, [id], callback);
  },

  getByEmail: (email, callback) => {
    // Password is intentionally included here ONLY
    // because the backend needs it for login verification.
    const sql = `
      SELECT id, name, email, password, role, created_at
      FROM users
      WHERE email = ?
    `;

    db.query(sql, [email], callback);
  },

  create: (user, callback) => {
    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user.name,
        user.email,
        user.password,
        user.role || "customer",
      ],
      callback
    );
  },
};

module.exports = User;