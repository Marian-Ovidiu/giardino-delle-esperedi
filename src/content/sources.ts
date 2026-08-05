/**
 * Stable references used by the factual record.
 *
 * A source proves where a value came from. It does not, by itself, approve
 * that value for publication; publication is controlled by each Fact.
 */
export const sources = {
  clientBrief20260805: {
    id: "client-brief-2026-08-05",
    title: "Decisioni definitive del cliente",
    sourceDate: "2026-08-05",
    kind: "client-decision",
    locator: "Brief di redesign",
  },
  redesignMasterPlan20260805: {
    id: "redesign-master-plan-2026-08-05",
    title: "Mais Rosso Co. — Redesign master plan",
    sourceDate: "2026-08-05",
    kind: "project-ruling",
    locator: "docs/redesign/00-redesign-master-plan.md",
  },
  presentationLetter20260506: {
    id: "presentation-letter-2026-05-06",
    title: "Lettera di presentazione Mais Rosso Co.",
    sourceDate: "2026-05-06",
    kind: "client-document",
    locator: "MaisRosso_Lettera_Presentazione 1.pdf",
  },
  maiseraLabel20260728: {
    id: "maisera-label-2026-07-28",
    title: "Etichetta La Maisèra 8file",
    sourceDate: "2026-07-28",
    kind: "product-label",
    locator: "WhatsApp Image 2026-07-28 at 09.55.23.jpeg",
  },
  priceBrochure20250910: {
    id: "price-brochure-2025-09-10",
    title: "Brochure Mais Rosso Co. con prezzi",
    sourceDate: "2025-09-10",
    kind: "client-document",
    locator: "MAIS ROSSO brochure con prezzi.pdf",
  },
  flourLabel20250228: {
    id: "flour-label-2025-02-28",
    title: "Etichetta farina 500 g, revisione ok",
    sourceDate: "2025-02-28",
    kind: "product-label",
    locator: "PDF etichetta farina, revisione 2025-02-28",
  },
  piedmontMaizeResearch200410: {
    id: "piedmont-maize-research-2004-10",
    title: "Gli antichi mais del Piemonte",
    sourceDate: "2004-10-01",
    kind: "external-publication",
    locator: "mais-piemontesi.pdf, p. 68",
  },
} as const;

export type SourceId = keyof typeof sources;
export type SourceRef = (typeof sources)[SourceId];
