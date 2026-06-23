// Admin session cookie: a short-lived JWT signed with ADMIN_SESSION_SECRET.
// Shared by the middleware (Edge runtime) and the login/logout route handlers.
// `jose` is Edge-compatible, so this module is safe to import from middleware.
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "admin_session";
const SESSION_HOURS = 12;

function secretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

// Mint a signed session token (subject "admin", 12h expiry).
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());
}

// Verify a session token. Returns true only for a valid, unexpired admin token.
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.sub === "admin";
  } catch {
    return false;
  }
}

// Cookie options shared by login (set) and logout (clear).
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_HOURS * 60 * 60,
};
