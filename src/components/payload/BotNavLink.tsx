import Link from "next/link";

// Payload sidebar link to the event help bot dashboard (/admin/bot), which lives
// in the (manage) route group alongside the registrations screens.
export function BotNavLink() {
  return (
    <Link
      className="nav__link"
      href="/admin/bot"
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--base, 8px)",
        textDecoration: "none",
      }}
    >
      <span className="nav__link-label">Event help bot</span>
    </Link>
  );
}
