"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Filter controls for a registrations list. Reads current values from the URL
// and pushes updates back as query params (the server component re-renders with
// the new filters). Search is debounced so typing doesn't spam navigation.
export function FilterBar({ exportHref }: { exportHref: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const status = searchParams.get("status") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  // Keep the local search box in sync if the URL changes externally.
  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  // Debounce free-text search.
  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (q === current) return;
    const t = setTimeout(() => updateParam("q", q), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const exportWithFilters = `${exportHref}${exportHref.includes("?") ? "&" : "?"}${searchParams.toString()}`;

  return (
    <div className="flex flex-wrap items-end gap-3 border border-neutral-200 bg-white p-4">
      <label className="text-xs font-medium text-neutral-600">
        Status
        <select
          value={status}
          onChange={(e) => updateParam("status", e.target.value)}
          className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="">All</option>
          <option value="success">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </label>

      <label className="text-xs font-medium text-neutral-600">
        Search
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, email, mobile, club"
          className="mt-1 block w-56 border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
        />
      </label>

      <label className="text-xs font-medium text-neutral-600">
        From
        <input
          type="date"
          value={from}
          onChange={(e) => updateParam("from", e.target.value)}
          className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
        />
      </label>

      <label className="text-xs font-medium text-neutral-600">
        To
        <input
          type="date"
          value={to}
          onChange={(e) => updateParam("to", e.target.value)}
          className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
        />
      </label>

      <div className="ml-auto flex gap-2">
        {(status || q || from || to) && (
          <button
            type="button"
            onClick={() => router.push(pathname)}
            className="border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 hover:border-brand-300 hover:text-brand-700"
          >
            Clear
          </button>
        )}
        <a
          href={exportWithFilters}
          className="bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Download CSV
        </a>
      </div>
    </div>
  );
}
