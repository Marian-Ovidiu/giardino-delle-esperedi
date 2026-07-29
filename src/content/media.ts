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
 * Two kinds now live here, and the `src` path says which is which.
 *
 * `/images/generated/piastre/…` — narrative, not documentary. Material studies
 * that set a register and a rhythm. They are NOT records of this company's
 * fields, harvests, equipment or people, and nothing in the alt text or
 * captions may suggest they are.
 *
 * They carry `status: "provvisorio"`, which is now BOOKKEEPING ONLY. Until
 * 2026-07-29 the interface printed "Immagine provvisoria" beside every one of
 * them; the client removed it. The status still drives `data-status` on the
 * figure and still marks what has to be replaced, but nothing on the page says
 * so any more — so the alt text and the caption are the ONLY thing left
 * stopping a generated plate from being read as evidence. They carry the whole
 * weight now, and the rule above them is no longer a formality.
 *
 * `/images/foto/…` — the client's OWN photographs, from the 2026 brochure and
 * presentation letter, cropped and graded by scripts/build-brand.mjs. These
 * are documentary, and they are the only images on the site that may show the
 * real packaging. Their captions may name the object; they still may not name
 * the place, the owner, the process or a person, because a caption cannot
 * carry a claim the register has not verified.
 *
 * ── Hard prohibitions ────────────────────────────────────────────────────
 * No generated image may depict: a named person; this company's actual land,
 * buildings or equipment; a process this company is said to perform; or a
 * historical document. Those require real photography or nothing at all.
 * A cob whose rows could be counted is also forbidden — the eight-row fact is
 * asserted by code that counts, never by a model that guesses
 * (see docs/asset-plan.md, reconciliation of 2026-07-27).
 *
 * The prohibition is on GENERATED images and it stays exactly as written. A
 * real photograph of the real variety may show a countable cob, because there
 * the count is a fact rather than a guess.
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
   * ch01 — La varietà. CAMPITURA: the variety itself as the ground of the
   * chapter that introduces it. Replaced the generated soil study on
   * 2026-07-28 with the client's own photograph of the harvested cobs.
   *
   * A CAMPITURA is the ONE pattern where a full frame of red maize is legal
   * without an Art Director decision: it renders at ≤0.08 opacity in
   * `multiply`, so the 0–25° chroma the §9.5 grade preserves is crushed long
   * before it can touch the `--chicco` budget of §4.4. Every other real
   * photograph on file is either a saturated kernel frame or a labelled pack,
   * and both need a decision this file cannot take — see
   * docs/brand-alignment.md §4.
   */
  "varieta-campitura": {
    src: "/images/foto/pannocchie-cover.avif",
    alt: "",
    caption: null,
    width: 2000,
    height: 1250,
    status: "definitivo",
    source:
      "Fotografia del cliente (lettera di presentazione, 2026) — 538×593 originale, ritaglio 8:5, grade §9.5, upscale lanczos3 a 2000×1250",
  },

  /*
   * ch02 — Il mais del Re. LASTRA, bleeding off the right edge (§7.4.1).
   * NOT a historical document and not a portrait: both are forbidden. A dry
   * material study carries the age of the variety without depicting an event.
   */
  "re-materia": {
    /*
     * PROVA 2026-07-29 — was re-materia.avif.
     *
     * The trial source is 2048×2048, i.e. 1:1. That IS one of the two ratios
     * §8 permits, but it is the REPERTO ratio, and this slot is a lastra: the
     * declared 1600×1000 below is deliberately not changed to match it, so the
     * frame stays 8:5 and object-fit: cover centre-crops the square. Roughly a
     * fifth is lost off the top and the same off the bottom — what renders is
     * the middle band, not the picture as generated. Changing the declaration
     * would turn a bleeding lastra into a reperto, which is an Art Director
     * call and not a media-registry one.
     *
     * Also a 2.8 MB PNG against the 187 KB AVIF it replaces: fine to look at,
     * not to ship. Filename carries no version because the client renamed it
     * deliberately — but overwriting a served path in place is what made the
     * browser hold the previous generation for four hours (Cache-Control
     * max-age=14400 on /_next/image). Next iteration gets a new name.
     */
    src: "/images/generated/piastre/re-materia-test.png",
    // Rewritten 2026-07-29 with the trial image: it is a whole cob with the
    // husk opened, not the dry bracts the previous plate showed. A caption
    // that describes a different picture is the one thing a register may not
    // print.
    alt: "Pannocchia di mais rosso con le brattee aperte, su fondo chiaro, in luce radente.",
    caption: "Pannocchia.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — material study, editorial plate",
  },

  /* ch04 — Quasi estinto. REPERTO, a real 1:1 cut from the master. */
  "quasi-estinto-reperto": {
    /*
     * PROVA 2026-07-29 — was atmosfera-luce-1x1.avif. Same trial source as the
     * mobile slot below, because a plate that changed on phones and not on
     * desktop is confusing rather than deliberate.
     *
     * The source is 3:2 and this slot is 1:1, so object-fit: cover keeps the
     * middle two thirds and drops a sixth off each side — a heavier crop than
     * the mobile slot's 6%. The declared 1200×1200 stays: §8.5 gives ch04 the
     * reperto ratio above 768px and that is not a media-registry decision.
     */
    src: "/images/generated/piastre/atmosfera-luce.png",
    alt: "Pianta di mais con una pannocchia rossa fra le brattee, su fondo chiaro.",
    caption: "Pianta.",
    width: 1200,
    height: 1200,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — atmospheric plate, prova 2026-07-29",
  },

  /*
   * ch04 on mobile. §8.5 drops every 1:1 plate below 768px — but dropping the
   * RATIO is not the same as dropping the IMAGE, and the first implementation
   * confused the two: mobile simply lost a picture. This is the same subject
   * in the permitted 8:5, so the chapter keeps its visual on every device.
   */
  "quasi-estinto-mobile": {
    /*
     * PROVA 2026-07-29 — was atmosfera-luce.avif.
     *
     * Source is 2016×1344, i.e. 3:2. Not one of the two ratios §8 permits, but
     * close to 8:5: object-fit: cover trims about 6% off the top and the same
     * off the bottom, against the 20% a square source loses. The declared
     * 1600×1000 stays, so the reserved space and the page rhythm do not move.
     *
     * 2.0 MB PNG against the 47 KB AVIF it replaces — 43×. Fine for judging
     * the picture, not for shipping; the ship version goes back through
     * scripts/build-piastre.mjs for the 8:5 crop and the AVIF encode.
     *
     * This slot is MOBILE ONLY (<768px). ch04 on desktop and tablet renders
     * the 1:1 reperto above, which is untouched — so this swap is invisible
     * unless you look at a phone width.
     */
    src: "/images/generated/piastre/atmosfera-luce.png",
    alt: "Pianta di mais con una pannocchia rossa fra le brattee, su fondo chiaro.",
    caption: "Pianta.",
    width: 1600,
    height: 1000,
    status: "provvisorio",
    source: "Higgsfield nano_banana_pro — atmospheric plate, prova 2026-07-29",
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
   * THE SWAP art-review-immagini.md §0-bis C WAS WRITTEN FOR. That section
   * shipped the generated crumb study as an explicitly provisional stand-in —
   * "la fotografia collettiva definitiva delle confezioni la sostituirà nello
   * stesso slot senza modifiche al layout" — and this is that photograph, from
   * the client's own 2026 brochure. It is the only slot on the site where real
   * packaging may appear, and the only one where §9.6's ban on packaging,
   * labels and text inside a frame is lifted, because a register that never
   * shows the jar is not a register of these products.
   *
   * Still non-enumerable, as §0-bis C requires: the packs overlap, run off
   * three edges, and cannot be counted into a range.
   *
   * DECLARED LIMITS, both unchanged by the swap:
   *   · Maisotti and La Maisèra do not appear — the composition predates one
   *     and excludes the other.
   *   · The kernel bed at the foot of the source is cropped away, but the
   *     packaging's own terracotta band sits inside the 0–25° window the §9.5
   *     grade holds at full saturation: 18,6% of the frame, ≈15% of a
   *     1440×900 viewport against the 2% ceiling of §4.4. The mitigation §4.4
   *     prescribes — the rail's active row reverts to `--inchiostro` in this
   *     chapter — is a CSS change and therefore an Art Director call. It is
   *     open. See docs/brand-alignment.md §4.
   */
  "referenze-collettiva": {
    src: "/images/foto/referenze-confezioni.avif",
    alt: "Confezioni di gallette di mais, monoporzioni e un vasetto di farina, sovrapposte.",
    caption: "Le confezioni.",
    width: 1600,
    height: 1000,
    status: "definitivo",
    source:
      "Fotografia del cliente (brochure 2026) — 908×908 originale, ritaglio 8:5, grade §9.5, upscale lanczos3 a 1600×1000",
  },
};
