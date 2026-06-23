// Usage: node scripts/add-admin-user.mjs <username> <password>
// Appends a new user (or updates an existing one) in admin-users.json in the
// project root. Run on the server after git pull; never commit the output file.

import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "..", "admin-users.json");

const [, , username, password] = process.argv;
if (!username || !password) {
  console.error("Usage: node scripts/add-admin-user.mjs <username> <password>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
crypto.scrypt(password, Buffer.from(salt, "hex"), 32, (err, key) => {
  if (err) throw err;
  const hash = `${salt}:${key.toString("hex")}`;

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    // file doesn't exist yet — start fresh
  }

  const existing = users.findIndex((u) => u.username.toLowerCase() === username.toLowerCase());
  if (existing >= 0) {
    users[existing].hash = hash;
    console.log(`Updated password for user: ${username}`);
  } else {
    users.push({ username, hash });
    console.log(`Added user: ${username}`);
  }

  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
  console.log(`Saved to ${FILE}`);
  console.log(`Total users: ${users.map((u) => u.username).join(", ")}`);
});
