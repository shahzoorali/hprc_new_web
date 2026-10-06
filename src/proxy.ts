import { NextResponse, type NextRequest } from "next/server";

// Passes the requested path to the (manage) root layout, which has no access to
// the URL itself, so its login redirect can bring the user back to the page they
// asked for (e.g. /admin/bot/review) instead of always /admin/registrations.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-hprc-path", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/admin/registrations/:path*", "/admin/bot/:path*"],
};
