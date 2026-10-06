// Thumbs up / down on one bot answer. POST { sessionId, turnId, rating: "up" | "down" | null }
// The sessionId must match the turn's, so a visitor can only rate their own chat.
import { NextResponse } from "next/server";

import { rateTurn } from "@/lib/tsec-bot/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { sessionId?: unknown; turnId?: unknown; rating?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const rating = body.rating === "up" || body.rating === "down" ? body.rating : null;
  if (
    typeof body.sessionId !== "string" ||
    typeof body.turnId !== "string" ||
    !/^[a-f0-9]{24}$/i.test(body.turnId)
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  try {
    const ok = await rateTurn(body.turnId, body.sessionId, rating);
    return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
  } catch (err) {
    console.error("tsec-bot rate failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
