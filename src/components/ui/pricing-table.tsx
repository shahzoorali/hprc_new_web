export type PricingRow = {
  label: string;
  price: string;
  gst?: string;
  total?: string;
};

type PricingTableProps = {
  heading: string;
  rows: PricingRow[];
};

export function PricingTable({ heading, rows }: PricingTableProps) {
  const hasGst = rows.some((row) => row.gst);
  const hasTotal = rows.some((row) => row.total);

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-[var(--shadow-elevated)]">
      <div className="border-b border-brand-100 bg-brand-50 px-6 py-4">
        <h3 className="text-lg font-semibold text-brand-900">{heading}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-100 text-sm text-gray-700">
          <thead className="bg-gray-50/60 text-left text-xs uppercase tracking-widest text-brand-600">
            <tr>
              <th className="px-6 py-3 font-semibold">Particulars</th>
              <th className="px-6 py-3 font-semibold">Price</th>
              {hasGst ? <th className="px-6 py-3 font-semibold">GST</th> : null}
              {hasTotal ? <th className="px-6 py-3 font-semibold">Total</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50 bg-white">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-6 py-4 font-medium text-brand-900">{row.label}</td>
                <td className="px-6 py-4">{row.price}</td>
                {hasGst ? <td className="px-6 py-4">{row.gst ?? "—"}</td> : null}
                {hasTotal ? <td className="px-6 py-4">{row.total ?? "—"}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
