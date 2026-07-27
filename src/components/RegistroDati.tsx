import type { DataRow } from "@/content/site";

/**
 * The registry table — label/value pairs, the specimen-card artefact that makes
 * the page read as a record rather than a brochure.
 *
 * Semantics: this is a description list, not a <table>. Each row is a term and
 * its definition; there are no columns to navigate and no header row, so <dl>
 * is the honest element and screen readers announce the pairing correctly.
 *
 * Values are DM Mono with tabular numerals so they align vertically down the
 * column (art-direction §3.9).
 */
export function RegistroDati({ rows }: { rows: readonly DataRow[] }) {
  if (rows.length === 0) return null;

  return (
    <dl className="registro">
      {rows.map((row) => (
        <div key={row.label} className="registro__riga">
          <dt className="t-label registro__etichetta">{row.label}</dt>
          <dd className="t-data-lg registro__valore">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
