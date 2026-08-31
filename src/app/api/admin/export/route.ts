// Payload-session-guarded CSV export proxy. Verifies the Payload session, forwards the
// filters to PHP export.php with the server token, and streams the CSV back so
// the download stays on the authenticated origin.
import { NextRequest, NextResponse } from "next/server";

import { isCmsAuthenticated } from "@/lib/cms-auth";

export async function GET(req: NextRequest) {
  if (!(await isCmsAuthenticated())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const sp = req.nextUrl.searchParams;
  const event = sp.get("event");
  if (event !== "nq" && event !== "ec") {
    return new NextResponse("Bad request", { status: 400 });
  }

  const base = process.env.PAYMENT_API_BASE;
  const apiToken = process.env.ADMIN_API_TOKEN;
  if (!base || !apiToken) {
    return new NextResponse("Server not configured", { status: 500 });
  }

  // Forward the supported filters only.
  const params = new URLSearchParams({ event });
  for (const key of ["status", "q", "from", "to"]) {
    const v = sp.get(key);
    if (v) params.set(key, v);
  }

  const url = `${base.replace(/\/$/, "")}/api/admin/export.php?${params.toString()}`;
  const upstream = await fetch(url, {
    headers: { "X-Admin-Token": apiToken },
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Export failed", { status: upstream.status || 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        upstream.headers.get("Content-Disposition") ||
        `attachment; filename="${event}_registrations.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
