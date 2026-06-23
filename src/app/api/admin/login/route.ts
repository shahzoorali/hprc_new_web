// POST /api/admin/login  { password }
// Compares the submitted password to ADMIN_PASSWORD (server env). On success,
// sets the httpOnly admin_session cookie (signed JWT) and returns { ok: true }.
// The client redirects to ?next after a successful response.

import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions);
  return res;
}
