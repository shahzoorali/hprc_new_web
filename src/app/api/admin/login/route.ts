// POST /api/admin/login  { username, password }
// Authenticates against the admin-users.json file (or legacy ADMIN_PASSWORD
// env var if the file doesn't exist). On success, sets the httpOnly
// admin_session cookie (signed JWT storing the username).
import { NextRequest, NextResponse } from "next/server";

import { authenticateAdmin } from "@/lib/admin-auth";
import { ADMIN_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = typeof body?.username === "string" ? body.username.trim() : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  const authedUsername = await authenticateAdmin(username, password);
  if (!authedUsername) {
    return NextResponse.json({ error: "Incorrect username or password" }, { status: 401 });
  }

  const token = await createSessionToken(authedUsername);
  const res = NextResponse.json({ ok: true, username: authedUsername });
  res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions);
  return res;
}
