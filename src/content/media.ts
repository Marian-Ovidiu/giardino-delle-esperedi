/**
 * OTTO — media registry.
 *
 * THE ONLY PLACE IMAGE FILES ARE NAMED. Components receive a key, never a
 * path. Replacing an asset — a provisional plate swapped for the real
 * photograph — is an edit to this file and nothing else: no component, no
 * layout, no CSS, no copy.
 *
 * Every entry declares its intrinsic size, so the reserved space is identical
 * whether the slot holds a provisional plate, a definitive photograph, or
 * nothing at all. The page never reflows when an asset is replaced.
 *
 * ── What these images are ────────────────────────────────────────────────
 * Narrative, not documentary. They are material studies that set a register
 * and a rhythm. They are NOT records of this company's fields, harvests,
 * equipment or people, and nothing in the alt text or captions may suggest
 * they are.
 *
 * ── Hard prohibitions ────────────────────────────────────────────────────
 * No generated image may depict: a named person; this company's actual land,
 * buildings or equipment; a process this company is said to perform; or a
 * historical document. Those require real photography or nothing at all.
 * A cob whose rows could be counted is also forbidden — the eight-row fact is
 * asserted by code that counts, never by a model that guesses
 * (see docs/asset-plan.md, reconciliation of 2026-07-27).
 */

/** `provvisorio` plates are annotated as such in the interface. */
export type MediaStatus = "provvisorio" | "definitivo";

export interface MediaAsset {
  /** Path under `public/`. */
  src: string;
  /**
   * Italian alt text. Describes what is visible and nothing more — never the
   * provenance, the owner, the place or the process.
   */
  alt: string;
  /** Visible caption, or `null` for a purely atmospheric plate. */
  caption: string | null;
  width: number;
  height: number;
  status: MediaStatus;
  /** Provenance, for docs/assets-manifest.md. */
  source: string;
}

/**
 * Slots. A slot may hold `null`: the section then renders without a plate and
 * without a gap, so the site is never broken by a missing asset.
 */
export type MediaKey =
  | "re-materia"
  | "campo-terra"
  | "campo-coltura"
  | "pietra-macina"
  | "pietra-farina"
  | "atmosfera-luce";

export const media: Record<MediaKey, MediaAsset | null> = {
  /*
   * ch02 — Il mais del Re.
   * NOT a historical document and not a portrait: both are forbidden. A dry
   * material study stands in for the age of the variety without depicting an
   * event, a person or a decree that we would be inventing.
   */
  "re-materia": {
    src: "/images/generated/piastre/re-materia.avif",
    alt: "Brattee secche di mais su fondo chiaro, in luce radente.",
    caption: "Brattee secche.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  /*
   * ch05 — Il campo. Soil and cultivation, as material rather than as
   * landscape: a recognisable field would read as "their field", which is
   * exactly the implication that is not permitted.
   */
  "campo-terra": {
    src: "/images/generated/piastre/campo-terra.avif",
    alt: "Terra arata asciutta, dettaglio ravvicinato delle zolle.",
    caption: "Terra.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  "campo-coltura": {
    src: "/images/generated/piastre/campo-coltura.avif",
    alt: "Steli secchi controluce, senza orizzonte né edifici.",
    caption: "Steli.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  /* ch06 — La pietra. Stone surface and flour, both pure material. */
  "pietra-macina": {
    src: "/images/generated/piastre/pietra-macina.avif",
    alt: "Superficie di pietra da macina, scanalature in luce radente.",
    caption: "Pietra.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  "pietra-farina": {
    src: "/images/generated/piastre/pietra-farina.avif",
    alt: "Macro di farina di mais, grana visibile.",
    caption: "Farina, macinata a pietra.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  /* Atmosphere. No caption: it carries rhythm, not information. */
  "atmosfera-luce": {
    src: "/images/generated/piastre/atmosfera-luce.avif",
    alt: "",
    caption: null,
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — atmospheric plate",
  },
};

/** Annotation shown on any plate that is not yet the definitive photograph. */
export const provisionalNote = "Immagine provvisoria";
