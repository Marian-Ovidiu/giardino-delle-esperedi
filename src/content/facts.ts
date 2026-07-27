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

/**
 * The protagonist ingredient — the principal raw material, NOT the only one.
 * The Amaro comes from the orto botanico, and nothing on record says what the
 * Birra is made from. Do not reintroduce "every product descends from it".
 */
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

export type ProductId = "farina" | "maisette" | "maissini" | "birra" | "amaro";

export interface Product {
  id: ProductId;
  /** Commercial name as printed on current packaging. */
  name: string;
  /**
   * Factual product definition. `null` where nothing is on record.
   * NEVER fill this in to make a card look complete.
   */
  definition: string | null;
  /** Net weight as printed. `null` where the client has not confirmed one. */
  format: string | null;
  /** What the product is transformed from. */
  origin: Origin;
  /** How complete the factual record is. Drives the card's rendered state. */
  status: RecordStatus;
}

/**
 * Completeness of the factual record, not of the product.
 * `in-preparazione` means we hold no verified description at all — the card
 * renders as a reserved slot rather than being quietly omitted or padded out.
 */
export type RecordStatus = "completo" | "parziale" | "in-preparazione";

/**
 * What a product is transformed FROM.
 *
 * NOT every product descends from the maize. The Amaro is made from officinal
 * herbs grown in the company's own orto botanico, and nothing on record says
 * what the Birra is brewed from. Asserting a maize origin for either would be
 * an invention.
 */
export type Origin = "mais" | "orto-botanico" | "da-verificare";

/** Human-readable origin labels, for the register's provenance column. */
export const origins: Record<Origin, string> = {
  mais: "Mais Rosso Ottofile",
  "orto-botanico": "Orto botanico aziendale",
  "da-verificare": "Da verificare",
};

/**
 * The catalogue.
 *
 * DELIBERATELY COUNT-AGNOSTIC. Nothing in the design, the copy or the layout
 * may depend on `products.length`. The range has already changed once —
 * "Non una gamma. Tre." shipped as a factual claim and was false — and it may
 * change again. Adding an entry here is the only step required to add a
 * product to the site.
 *
 * Client-confirmed packaging is authoritative over the outdated public
 * website. Maissini are GRISSINI (breadsticks) — never a gallette format.
 */
export const products: readonly Product[] = [
  {
    id: "farina",
    name: "Farina di Mais Rosso",
    definition: "Ottofile Integrale varietà Albese, macinata a pietra",
    format: "500 g",
    origin: "mais",
    status: "completo",
  },
  {
    id: "maisette",
    name: "Maisette",
    definition: "Gallette di Mais Rosso Ottofile Integrale",
    format: "120 g",
    origin: "mais",
    status: "completo",
  },
  {
    id: "maissini",
    name: "Maissini",
    definition: "Grissini di mais, prodotti con farina di Mais Rosso Ottofile",
    // Net weight not confirmed by the client. The row is omitted rather than
    // dashed: a dash in a weight field reads as "no weight".
    format: null,
    origin: "mais",
    status: "parziale",
  },
  {
    id: "birra",
    name: "Birra",
    // Nothing is on record: not the style, not the grain bill, not the format,
    // not whether it uses the company's own maize. Left null on purpose.
    definition: null,
    format: null,
    origin: "da-verificare",
    status: "in-preparazione",
  },
  {
    id: "amaro",
    name: "Amaro del Dottore",
    // The client's own wording is "coltivate con agricoltura biologica e
    // simbiotica". `biologico` is protected under EU Reg. 2018/848 and needs
    // certification plus a control-body code, which is not on record — so the
    // certification-free wording ships. See docs/content-plan.md §8.2.
    definition:
      "Prodotto con le erbe officinali dell'orto botanico aziendale, coltivate con agricoltura simbiotica",
    format: null,
    origin: "orto-botanico",
    status: "parziale",
  },
] as const;

/** The myth behind the company name, as the company itself tells it. */
export const myth = {
  garden: "il frutteto di Hera",
  fruit: "mele d'oro",
  nymphs: "ninfe della sera e della luce dorata dei tramonti",
  place: "il lontano ovest dove tramonta il Sole",
} as const;
