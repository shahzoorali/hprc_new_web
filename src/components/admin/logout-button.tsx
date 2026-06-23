"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Posts to the logout route then sends the user back to the login page.
export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
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
