import Link from "next/link";

// Sidebar link to the custom "Import results" admin view.
export function ImportResultsNavLink() {
  return (
    <Link
      className="nav__link"
      href="/admin/import-results"
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--base, 8px)",
        textDecoration: "none",
      }}
    >
      <span className="nav__link-label">Import results</span>
    </Link>
  );
}
