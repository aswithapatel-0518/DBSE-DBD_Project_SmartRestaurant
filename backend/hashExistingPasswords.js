const bcrypt = require("bcrypt");
const db = require("./config/db");

async function hashExistingPasswords() {
  db.query("SELECT id, password FROM users", async (err, users) => {
    if (err) {
      console.error("Failed to fetch users:", err.message);
      return;
    }

    try {
      for (const user of users) {
        // Skip passwords that are already bcrypt hashes
        if (
          typeof user.password === "string" &&
          user.password.startsWith("$2")
        ) {
          continue;
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        db.query(
          "UPDATE users SET password = ? WHERE id = ?",
          [hashedPassword, user.id],
          (updateErr) => {
            if (updateErr) {
              console.error(
                `Failed to update user ${user.id}:`,
                updateErr.message
              );
            }
          }
        );
      }

      console.log("Existing passwords have been converted to bcrypt hashes.");

      setTimeout(() => {
        db.end();
      }, 1000);
    } catch (error) {
      console.error("Password hashing failed:", error.message);
      db.end();
    }
  });
}

hashExistingPasswords();