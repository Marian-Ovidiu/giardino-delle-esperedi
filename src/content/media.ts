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
  | "varieta-campitura"
  | "re-materia"
  | "quasi-estinto-reperto"
  | "quasi-estinto-mobile"
  | "campo-coltura"
  | "pietra-campitura"
  | "pietra-farina"
  | "referenze-collettiva";

export const media: Record<MediaKey, MediaAsset | null> = {
  /*
   * ch01 — La varietà. CAMPITURA: soil as the ground the variety comes from.
   * Real 2000×1250 derivative, not the 8:5 plate stretched — §8.4.
   */
  "varieta-campitura": {
    src: "/images/generated/piastre/campo-terra-cover.avif",
    alt: "",
    caption: null,
    width: 2000,
    height: 1250,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, cover derivative",
  },

  /*
   * ch02 — Il mais del Re. LASTRA, bleeding off the right edge (§7.4.1).
   * NOT a historical document and not a portrait: both are forbidden. A dry
   * material study carries the age of the variety without depicting an event.
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

  /* ch04 — Quasi estinto. REPERTO, a real 1:1 cut from the master. */
  "quasi-estinto-reperto": {
    src: "/images/generated/piastre/atmosfera-luce-1x1.avif",
    alt: "Polvere sospesa in una lama di luce radente.",
    caption: "Luce.",
    width: 1200,
    height: 1200,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — atmospheric plate, 1:1 derivative",
  },

  /*
   * ch04 on mobile. §8.5 drops every 1:1 plate below 768px — but dropping the
   * RATIO is not the same as dropping the IMAGE, and the first implementation
   * confused the two: mobile simply lost a picture. This is the same subject
   * in the permitted 8:5, so the chapter keeps its visual on every device.
   */
  "quasi-estinto-mobile": {
    src: "/images/generated/piastre/atmosfera-luce.avif",
    alt: "Polvere sospesa in una lama di luce radente.",
    caption: "Luce.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — atmospheric plate, 8:5 derivative",
  },

  /* ch05 — Il campo. LASTRA. Deliberately no horizon and no buildings: a
     recognisable field would read as "their field". */
  "campo-coltura": {
    src: "/images/generated/piastre/campo-coltura.avif",
    alt: "Steli secchi controluce, senza orizzonte né edifici.",
    caption: "Steli.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  /* ch06 — La pietra. CAMPITURA: the chapter is printed on the stone. */
  "pietra-campitura": {
    src: "/images/generated/piastre/pietra-macina-cover.avif",
    alt: "",
    caption: null,
    width: 2000,
    height: 1250,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, cover derivative",
  },

  /* ch06 — the single object of the chapter, the outcome of the stone. */
  "pietra-farina": {
    src: "/images/generated/piastre/pietra-farina.avif",
    alt: "Macro di farina di mais, grana visibile.",
    // NOT "Farina, macinata a pietra." — that attaches a verified process to a
    // provisional, generic plate, which is the one thing these images may not
    // do. The caption names the material and stops.
    caption: "Farina.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  /*
   * ch07 — Le referenze. LASTRA opening the only product chapter on the site.
   *
   * This is a COLLECTIVE composition and it is deliberately NON-ENUMERABLE:
   * the pieces overlap and cannot be counted. That is the point. A composition
   * in which three objects can be counted would restate "Non una gamma. Tre."
   * — the false claim just removed from the copy. The catalogue holds five
   * references, two of which are liquids that cannot be shown without
   * inventing a bottle.
   *
   * DECLARED LIMIT: this is not a packshot and does not stand in for one.
   * Birra and Amaro do not appear. When the definitive collective photograph
   * of the packaging exists it replaces this entry in place, and the layout
   * does not move. See docs/art-review-immagini.md §0-bis C.
   */
  "referenze-collettiva": {
    src: "/images/generated/piastre/referenze-collettiva.avif",
    alt: "Farina, briciole e frammenti di sfoglia e grissini sparsi su carta.",
    caption: "Materia.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — collective material study, editorial plate",
  },
};

/** Annotation shown on any plate that is not yet the definitive photograph. */
export const provisionalNote = "Immagine provvisoria";
