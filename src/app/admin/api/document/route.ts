// Session-guarded document proxy. Verifies the admin cookie, then fetches the
// uploaded file from PHP document.php with the server-only token and streams it
// back. Keeps the PHP token (and the DB host) off the browser.
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifySessionToken(token))) { // returns username or null
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const event = req.nextUrl.searchParams.get("event");
  const file = req.nextUrl.searchParams.get("file");
  if ((event !== "nq" && event !== "ec") || !file) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const base = process.env.PAYMENT_API_BASE;
  const apiToken = process.env.ADMIN_API_TOKEN;
  if (!base || !apiToken) {
    return new NextResponse("Server not configured", { status: 500 });
  }

  const url = `${base.replace(/\/$/, "")}/api/admin/document.php?event=${event}&file=${encodeURIComponent(file)}`;
  const upstream = await fetch(url, {
    headers: { "X-Admin-Token": apiToken },
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Document unavailable", { status: upstream.status || 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") || "application/octet-stream",
      "Cache-Control": "private, no-store",
    },
  });
}
