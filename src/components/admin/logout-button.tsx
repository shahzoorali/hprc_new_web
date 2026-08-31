"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Ends the Payload session and returns to the CMS login. Payload's REST API is
// mounted at /cms-api (not the default /api) — see payload.config.ts.
export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/cms-api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:opacity-50"
    >
      {loading ? "…" : "Log out"}
    </button>
  );
}
