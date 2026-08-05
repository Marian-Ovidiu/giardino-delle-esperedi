export interface DataRow {
  label: string;
  value: string;
}

/** A semantic term/value list shared by narrative and product sections. */
export function RegistroDati({
  rows,
  className,
}: {
  rows: readonly DataRow[];
  className?: string;
}) {
  if (rows.length === 0) return null;

  return (
    <dl className={["facts-list", className].filter(Boolean).join(" ")}>
      {rows.map((row) => (
        <div key={row.label} className="facts-list__row">
          <dt className="facts-list__term t-label">{row.label}</dt>
          <dd className="facts-list__value t-data">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
