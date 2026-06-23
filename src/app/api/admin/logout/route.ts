// POST /api/admin/logout — clears the admin_session cookie and returns ok.

import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionCookieOptions } from "@/lib/admin-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return res;
}
