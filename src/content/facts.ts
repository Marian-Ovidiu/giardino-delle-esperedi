/**
 * Verified factual record for Il Giardino delle Esperidi.
 *
 * SINGLE SOURCE OF TRUTH. Every claim here is traceable to the company's own
 * public site or to client-confirmed packaging (see docs/discovery.md §2–3).
 *
 * Nothing may be added to this file that is not verified. No formats, weights,
 * certifications, awards, statistics or prices beyond what is recorded here.
 * The old public website lists a superseded product range (18g monoporzione,
 * tubo, multipack) — that data is obsolete and must not be reintroduced.
 */

export const company = {
  name: "Il Giardino delle Esperidi",
  kind: "Azienda agricola",
  town: "Cherasco",
  province: "CN",
  postalCode: "12062",
  region: "Piemonte",
  /** The company's own description of its setting. */
  setting: "un'oasi protetta tra Langhe e Cuneese",
  email: "amministrazione@giardino-delle-esperidi.com",
  phone: "3382866127",
  phoneHref: "tel:+393382866127",
  social: {
    instagram: {
      handle: "il_giardino_delle_esperidi",
      url: "https://www.instagram.com/il_giardino_delle_esperidi/",
    },
    facebook: {
      handle: "GiardinodelleEsperidiShop",
      url: "https://www.facebook.com/GiardinodelleEsperidiShop",
    },
  },
} as const;

/** The hero ingredient. Every product descends from it. */
export const grain = {
  name: "Mais Rosso Ottofile",
  fullName: "Mais Rosso Ottofile Integrale",
  variety: "Albese",
  nickname: "il mais del Re",
  /** Exactly eight — the structural fact the whole design is built on. */
  rows: 8,
  kernel: {
    shape: "arrotondata",
    color: "arancio",
  },
} as const;

export type ProductId = "maisette" | "maissini" | "farina";

export interface Product {
  id: ProductId;
  /** Commercial name as printed on current packaging. */
  name: string;
  /** Factual product definition. No marketing language. */
  definition: string;
  /** Net weight as printed. `null` where the client has not confirmed one. */
  format: string | null;
}

/**
 * Client-confirmed packaging, authoritative over the outdated public website.
 * Maissini are GRISSINI (breadsticks) — never a gallette format.
 */
export const products: readonly Product[] = [
  {
    id: "maisette",
    name: "Maisette",
    definition: "Gallette di Mais Rosso Ottofile Integrale",
    format: "120 g",
  },
  {
    id: "maissini",
    name: "Maissini",
    definition: "Grissini di mais, prodotti con farina di Mais Rosso Ottofile",
    format: null,
  },
  {
    id: "farina",
    name: "Farina di Mais Rosso",
    definition: "Ottofile Integrale varietà Albese, macinata a pietra",
    format: "500 g",
  },
] as const;

/** The myth behind the company name, as the company itself tells it. */
export const myth = {
  garden: "il frutteto di Hera",
  fruit: "mele d'oro",
  nymphs: "ninfe della sera e della luce dorata dei tramonti",
  place: "il lontano ovest dove tramonta il Sole",
} as const;
