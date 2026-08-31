import Link from "next/link";

// Rendered inside Payload's admin sidebar (admin.components.afterNavLinks).
// The registrations dashboard is not a Payload collection — it reads the PHP
// payment API — so it needs an explicit link to be reachable from the CMS nav.
export function RegistrationsNavLink() {
  return (
    <Link
      className="nav__link"
      href="/admin/registrations"
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--base, 8px)",
        textDecoration: "none",
      }}
    >
      <span className="nav__link-label">Event registrations</span>
    </Link>
  );
}
