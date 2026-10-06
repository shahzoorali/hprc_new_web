"use client";

import { useRouter } from "next/navigation";

// Asks before showing unmasked personal data; the page logs the reveal.
export function RevealButton({ href, revealed }: { href: string; revealed: boolean }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (revealed) return router.push(href);
        if (
          window.confirm(
            "Show unmasked phone numbers, emails and IDs in this chat? This is recorded in the audit log.",
          )
        ) {
          router.push(href);
        }
      }}
      className={`border px-3 py-1.5 text-xs font-semibold ${revealed ? "border-neutral-300 bg-white text-neutral-700" : "border-amber-400 bg-amber-50 text-amber-800"}`}
    >
      {revealed ? "Mask personal data" : "Show personal data"}
    </button>
  );
}
