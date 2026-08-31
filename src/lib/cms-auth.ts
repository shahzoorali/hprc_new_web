// Authentication for the registrations dashboard, backed by Payload's users.
//
// The dashboard lives outside the Payload admin UI (its own route group with
// its own root layout, so it keeps the site's Tailwind styling), but it shares
// Payload's session cookie. One login covers both: sign in at /admin, and the
// registrations screens are authenticated too.
//
// This replaced the previous bespoke auth — ADMIN_PASSWORD, admin-users.json,
// a hand-rolled scrypt store and a jose-signed cookie verified in middleware.
import config from "@payload-config";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import "server-only";

import type { User } from "@/payload-types";

// Resolve the signed-in CMS user from the request cookies, or null.
export async function getCmsUser(): Promise<User | null> {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await nextHeaders() });
  return (user as User | null) ?? null;
}

// For pages: resolve the user or bounce to Payload's login, returning here
// afterwards. Never returns null.
export async function requireCmsUser(returnTo: string): Promise<User> {
  const user = await getCmsUser();
  if (!user) {
    redirect(`/admin/login?redirect=${encodeURIComponent(returnTo)}`);
  }
  return user;
}

// For route handlers: a plain boolean check, so the caller can return a 401
// instead of issuing a redirect a fetch() cannot follow usefully.
export async function isCmsAuthenticated(): Promise<boolean> {
  return (await getCmsUser()) !== null;
}
