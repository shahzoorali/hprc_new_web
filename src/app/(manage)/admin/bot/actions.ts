"use server";

// Server actions for the /admin/bot dashboard. Each re-checks the CMS session
// and writes an audit row for anything that touches personal data or controls.
import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { getPayload } from "payload";

import { getCmsUser } from "@/lib/cms-auth";
import { BOT_ID, invalidateGuard } from "@/lib/tsec-bot/store";

async function requireUser() {
  const user = await getCmsUser();
  if (!user) throw new Error("Not signed in");
  return user;
}

type AuditAction =
  | "open_chat"
  | "reveal_pii"
  | "save_review"
  | "reopen_review"
  | "kill_switch"
  | "set_cap";

export async function audit(action: AuditAction, target: string) {
  const user = await requireUser();
  const payload = await getPayload({ config });
  await payload.create({ collection: "bot-audit", data: { action, user: user.email, target } });
}

export async function setPaused(formData: FormData) {
  const user = await requireUser();
  const paused = formData.get("paused") === "on";
  const payload = await getPayload({ config });
  await payload.updateGlobal({ slug: "bot-settings", data: { paused } });
  await payload.create({
    collection: "bot-audit",
    data: { action: "kill_switch", user: user.email, target: paused ? "paused" : "live" },
  });
  invalidateGuard();
  revalidatePath("/admin/bot");
}

export async function setCap(formData: FormData) {
  const user = await requireUser();
  const cap = Math.max(0, Math.min(500, Number(formData.get("dailyCapUsd")) || 0));
  const payload = await getPayload({ config });
  await payload.updateGlobal({ slug: "bot-settings", data: { dailyCapUsd: cap } });
  await payload.create({
    collection: "bot-audit",
    data: { action: "set_cap", user: user.email, target: `$${cap}` },
  });
  invalidateGuard();
  revalidatePath("/admin/bot");
}

const STATUSES = ["planned", "fixed", "wontfix", "fine"] as const;
const FIX_KINDS = ["data", "prompt", "feature", "none"] as const;

export async function saveReview(formData: FormData) {
  const user = await requireUser();
  const clusterKey = String(formData.get("clusterKey") ?? "");
  const status = String(formData.get("status") ?? "");
  const fixKind = String(formData.get("fixKind") ?? "");
  if (!clusterKey || !STATUSES.includes(status as (typeof STATUSES)[number]))
    throw new Error("Invalid review");

  const payload = await getPayload({ config });
  const data = {
    bot: BOT_ID,
    clusterKey,
    topic: String(formData.get("topic") ?? "").slice(0, 120),
    status: status as (typeof STATUSES)[number],
    fixKind: FIX_KINDS.includes(fixKind as (typeof FIX_KINDS)[number])
      ? (fixKind as (typeof FIX_KINDS)[number])
      : undefined,
    note: String(formData.get("note") ?? "").slice(0, 2000),
    idealAnswer: String(formData.get("idealAnswer") ?? "").slice(0, 4000),
    reviewedBy: user.email,
    reviewedAt: new Date().toISOString(),
  };
  const existing = await payload.find({
    collection: "bot-reviews",
    where: { and: [{ bot: { equals: BOT_ID } }, { clusterKey: { equals: clusterKey } }] },
    limit: 1,
    depth: 0,
  });
  if (existing.docs[0])
    await payload.update({ collection: "bot-reviews", id: existing.docs[0].id, data });
  else await payload.create({ collection: "bot-reviews", data });
  await payload.create({
    collection: "bot-audit",
    data: { action: "save_review", user: user.email, target: `${clusterKey} → ${status}` },
  });
  revalidatePath("/admin/bot/review");
}

export async function reopenReview(formData: FormData) {
  const user = await requireUser();
  const clusterKey = String(formData.get("clusterKey") ?? "");
  const payload = await getPayload({ config });
  await payload.delete({
    collection: "bot-reviews",
    where: { and: [{ bot: { equals: BOT_ID } }, { clusterKey: { equals: clusterKey } }] },
    overrideAccess: true,
  });
  await payload.create({
    collection: "bot-audit",
    data: { action: "reopen_review", user: user.email, target: clusterKey },
  });
  revalidatePath("/admin/bot/review");
}
