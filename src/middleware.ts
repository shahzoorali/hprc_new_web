// Gate all /admin pages behind the admin session cookie. Runs on the Edge
// runtime; session verification uses `jose` (Edge-compatible).
//
// /admin/login is always allowed (otherwise you could never reach the form).
// Every other /admin path requires a valid admin_session cookie; missing or
// invalid -> redirect to /admin/login?next=<original path>.
import { NextRequest, NextResponse } from "next/server";

import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // The login page and its POST handler must stay reachable while logged out.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
