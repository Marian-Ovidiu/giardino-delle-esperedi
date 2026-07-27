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
 * The protagonist ingredient, and the ONLY cultivation the client has
 * confirmed. Farina, Maisette, Maissini and Birra all descend from it. The
 * Amaro's provenance is unknown and must not be attributed to it — nor to any
 * other company cultivation. Do not reintroduce "every product descends from
 * it": it is still not true, just for a different reason than before.
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
  /**
   * Net contents as printed, one entry per size on the shelf. Empty where the
   * client has not confirmed any — never filled with a placeholder or a dash.
   */
  formats: readonly string[];
  /**
   * Additional register rows, rendered generically in declaration order.
   *
   * This is the extension point. Style, strength, IBU, ingredients — anything
   * the client later confirms — is added here and appears in the layout with
   * no change to the component or the CSS. Nothing may be added speculatively:
   * an absent row is the correct rendering of an unknown fact.
   */
  specs?: readonly Spec[];
  /** What the product is transformed from. */
  origin: Origin;
  /** How complete the factual record is. Drives the card's rendered state. */
  status: RecordStatus;
}

export interface Spec {
  label: string;
  value: string;
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
 * The ONLY cultivation the client has confirmed is the Mais Rosso Ottofile.
 *
 * An `"orto-botanico"` value existed here until 2026-07-27 and has been
 * removed deliberately. It came from the company's own public website, which
 * describes an orto botanico aziendale supplying the Amaro's herbs — and the
 * client has since told us that claim is not something we can stand behind.
 * The enum member is gone rather than left unused, so it cannot be reattached
 * to a product by autocomplete. If the client ever confirms it, add it back
 * with the confirmation on file.
 */
export type Origin = "mais" | "da-verificare";

/** Human-readable origin labels, for the register's provenance column. */
export const origins: Record<Origin, string> = {
  mais: "Mais Rosso Ottofile",
  /*
   * Neutral by construction: it records the absence of a confirmation and
   * claims nothing about who grows, sources or transforms the product.
   *
   * "Produzione del Giardino" was the alternative on the table. Rejected:
   * "produzione" reads as "made by", and who performs the transformation is
   * one of the things we explicitly do not know. A register is allowed to say
   * it does not know something — that is what makes the rest of it credible.
   */
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
    formats: ["500 g"],
    origin: "mais",
    status: "completo",
  },
  {
    id: "maisette",
    name: "Maisette",
    definition: "Gallette di Mais Rosso Ottofile Integrale",
    formats: ["120 g"],
    origin: "mais",
    status: "completo",
  },
  {
    id: "maissini",
    name: "Maissini",
    definition: "Grissini di mais, prodotti con farina di Mais Rosso Ottofile",
    // Net weight not confirmed by the client. The row is omitted rather than
    // dashed: a dash in a format field reads as "no format".
    formats: [],
    origin: "mais",
    status: "parziale",
  },
  {
    id: "birra",
    name: "Birra",
    /*
     * Client-confirmed: brewed with the company's own Mais Rosso Ottofile, and
     * therefore a full member of the maize family rather than an outlier.
     *
     * The definition leads with the raw material, exactly like the other four,
     * because the protagonist is the maize and not the brewery. Deliberately
     * ABSENT and not to be added without written confirmation: the brewing
     * style (never "IPA", "Blonde", "Amber" or "Lager"), the strength, the IBU,
     * the ingredient list, and any mention of who brews it. When any of those
     * are confirmed they go in `specs` below and render with no code change.
     */
    definition: "Prodotta con il Mais Rosso Ottofile coltivato in azienda",
    formats: ["0,33 L", "0,75 L"],
    origin: "mais",
    status: "completo",
  },
  {
    id: "amaro",
    name: "Amaro del Dottore",
    /*
     * The product and its name are confirmed. NOTHING about its provenance is.
     *
     * This card previously read "Prodotto con le erbe officinali dell'orto
     * botanico aziendale, coltivate con agricoltura simbiotica" — sourced from
     * the company's own public website. The client has since confirmed that
     * the only cultivation we can stand behind is the Mais Rosso Ottofile, so
     * that sentence asserted four things we cannot support: which botanicals
     * are in it, who grows them, that they come from the company, and how they
     * are farmed.
     *
     * The replacement claims nothing. Do not reintroduce, in any wording:
     * "orto botanico", "erbe officinali", "coltivate in azienda", "botaniche
     * aziendali", or a farming method. Unknown too, and equally not to be
     * invented: the botanicals, the transformer, the format, the strength, the
     * ingredients and the infusion method. There is a test guarding this.
     *
     * When the composition arrives it goes in `formats` and `specs` below and
     * renders with no change to any component or stylesheet.
     */
    definition: "L'amaro botanico della collezione del Giardino",
    formats: [],
    origin: "da-verificare",
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
