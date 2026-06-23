// Summary stat card for the overview dashboard. A label, a large value, and an
// optional sub-line. Matches the site's card styling (white, brand border,
// square corners, display font for the figure).

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
};

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div
      className={`border bg-white px-5 py-4 shadow-sm ${
        accent ? "border-brand-200" : "border-neutral-200"
      }`}
    >
      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </div>
      <div
        className={`mt-1 font-display text-2xl font-bold ${
          accent ? "text-brand-700" : "text-neutral-900"
        }`}
      >
        {value}
      </div>
      {sub ? <div className="mt-0.5 text-xs text-neutral-500">{sub}</div> : null}
    </div>
  );
}
