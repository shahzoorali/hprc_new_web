// Small status pill for a registration's payment state. Maps the raw
// order_status (NULL = pending, Success/Successful = confirmed, anything else =
// failed) to a labelled, colour-coded chip. Square corners to match the site.

type StatusPillProps = {
  status: string | null;
  isSuccess?: boolean;
};

export function StatusPill({ status, isSuccess }: StatusPillProps) {
  const success = isSuccess ?? (status === "Success" || status === "Successful");

  let label: string;
  let classes: string;

  if (success) {
    label = "Confirmed";
    classes = "bg-green-100 text-green-800 border-green-200";
  } else if (status === null || status === "") {
    label = "Pending";
    classes = "bg-neutral-100 text-neutral-600 border-neutral-200";
  } else {
    label = "Failed";
    classes = "bg-brand-100 text-brand-800 border-brand-200";
  }

  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${classes}`}
    >
      {label}
    </span>
  );
}
