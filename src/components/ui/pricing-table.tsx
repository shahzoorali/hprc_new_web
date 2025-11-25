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
    <div className="group/table overflow-hidden rounded-2xl border border-brand-100/80 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-200">
      <div className="border-b border-brand-100 bg-gradient-to-r from-brand-50/80 to-brand-50/40 px-6 py-4">
        <h3 className="text-base font-bold text-brand-900">{heading}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-50 text-sm">
          <thead className="bg-brand-50/40 text-left text-xs uppercase tracking-wider text-brand-700 font-semibold">
            <tr>
              <th className="px-6 py-3.5">Particulars</th>
              <th className="px-6 py-3.5">Price</th>
              {hasGst ? <th className="px-6 py-3.5">GST</th> : null}
              {hasTotal ? <th className="px-6 py-3.5 font-semibold text-brand-800">Total</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50/60 bg-white">
            {rows.map((row, idx) => (
              <tr 
                key={row.label}
                className="transition-colors duration-200 hover:bg-brand-50/30"
              >
                <td className="px-6 py-4 font-medium text-brand-900">{row.label}</td>
                <td className="px-6 py-4 text-gray-700">{row.price}</td>
                {hasGst ? <td className="px-6 py-4 text-gray-600">{row.gst ?? "—"}</td> : null}
                {hasTotal ? (
                  <td className="px-6 py-4 font-semibold text-brand-800">
                    {row.total ?? "—"}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
