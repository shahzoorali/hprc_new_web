// User credential store backed by a JSON file on the server.
// File path is read from ADMIN_USERS_FILE env var (default: admin-users.json
// in the project root). Each entry: { username, hash } where hash is a
// scrypt-derived hex string produced by the add-admin-user script.
//
// Falls back gracefully to the legacy single-password mode if the file does
// not exist and ADMIN_PASSWORD is set — so existing installs keep working
// until you create the file.
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import "server-only";

interface AdminUser {
  username: string;
  hash: string; // "salt:derivedKey" both hex-encoded
}

function usersFilePath(): string {
  return process.env.ADMIN_USERS_FILE ?? path.join(process.cwd(), "admin-users.json");
}

function loadUsers(): AdminUser[] | null {
  try {
    const raw = fs.readFileSync(usersFilePath(), "utf8");
    return JSON.parse(raw) as AdminUser[];
  } catch {
    return null;
  }
}

// Derive a key from a password + hex salt using scrypt.
async function deriveKey(password: string, saltHex: string): Promise<string> {
  const salt = Buffer.from(saltHex, "hex");
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 32, (err, key) => {
      if (err) reject(err);
      else resolve(key.toString("hex"));
    });
  });
}

// Verify a submitted password against a stored "saltHex:keyHex" hash.
async function verifyHash(password: string, storedHash: string): Promise<boolean> {
  const [saltHex, keyHex] = storedHash.split(":");
  if (!saltHex || !keyHex) return false;
  try {
    const derived = await deriveKey(password, saltHex);
    // Constant-time comparison via timingSafeEqual.
    return crypto.timingSafeEqual(Buffer.from(derived, "hex"), Buffer.from(keyHex, "hex"));
  } catch {
    return false;
  }
}

// Authenticate a username + password. Returns the username on success, null on
// failure. Falls back to the legacy ADMIN_PASSWORD env var if no users file
// exists yet (username is ignored in that mode).
export async function authenticateAdmin(
  username: string,
  password: string,
): Promise<string | null> {
  const users = loadUsers();

  if (!users) {
    // Legacy single-password fallback.
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) return null;
    return username || "admin";
  }

  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return null;
  if (!(await verifyHash(password, user.hash))) return null;
  return user.username;
}
