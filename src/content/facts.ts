/**
 * Verified factual record for Il Giardino delle Esperidi.
 *
 * SINGLE SOURCE OF TRUTH. Every claim here is traceable to the company's own
 * public site or to client-confirmed packaging (see docs/discovery.md §2–3).
 *
 * Nothing may be added to this file that is not verified. No formats, weights,
 * certifications, awards, statistics or prices beyond what is recorded here.
 *
 * ── 2026-07-28 · brand alignment ─────────────────────────────────────────
 * Rebuilt against the client's own 2026 materials: the priced brochure, the
 * presentation letter, and the printed label of La Maisèra 8file. Those three
 * are now the authority on nomenclature, formats, prices and commercial
 * detail; the project documentation stays the authority on layout and art
 * direction. Full record in docs/brand-alignment.md.
 *
 * The note that used to stand here — that the 18 g monoporzione and the tubo
 * were superseded data from the old public website — was itself out of date.
 * Both are printed in the 2026 priced brochure. They are back, as FORMATS of
 * Maisette and never as separate products.
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
      /*
       * Updated 2026-07-28 from the back page of the priced brochure, which
       * prints the handle beside the QR code. The old
       * `il_giardino_delle_esperidi` is superseded.
       */
      handle: "mais_rosso_company",
      url: "https://www.instagram.com/mais_rosso_company/",
    },
    facebook: {
      handle: "GiardinodelleEsperidiShop",
      url: "https://www.facebook.com/GiardinodelleEsperidiShop",
    },
  },
} as const;

/**
 * The protagonist ingredient, and the ONLY cultivation the client has
 * confirmed. Every product currently in the catalogue descends from it.
 *
 * That is true again only because the Amaro left the catalogue on 2026-07-29.
 * Do not write it into the copy as a standing claim: it is a fact about the
 * present range, not a rule about the company, and the next product whose
 * provenance is unconfirmed makes it false again.
 */
export const grain = {
  name: "Mais Rosso Ottofile",
  fullName: "Mais Rosso Ottofile Integrale",
  variety: "Albese",
  nickname: "il mais del Re",
  /** As the company tells it, in Piedmontese. Presentation letter, 2026. */
  dialectName: "la melia du re",
  /** The brand printed on the maize line's packaging. Not the company name. */
  brand: "Mais Rosso Co.",
  /** Exactly eight — the structural fact the whole design is built on. */
  rows: 8,
  kernel: {
    shape: "arrotondata",
    /* The client's own description, presentation letter 2026. More precise
       than the "arancio" it replaces, and it is a colour, not a claim. */
    color: "tra l'arancio bruciato e il bordeaux",
  },
  /**
   * The cultivation steps the client states in writing. Process facts, not
   * adjectives — and the reason "coltivato con cura" appears nowhere.
   * NOT included and not to be added: the yield, the hectares, the sowing
   * date, and the named associations and universities the letter also lists
   * (see docs/brand-alignment.md §5 — third parties are not ours to name).
   */
  process: {
    sowing: "seminato in purezza",
    harvest: "raccolto a mano",
    drying: "essiccato al sole",
  },
} as const;

export type ProductId = "farina" | "maisette" | "maissini" | "maisotti" | "birra";

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
   * What it is for, in one line. The brochure's own answer, stripped of its
   * adjectives: "perfette come snack o base per spalmabili" becomes "al
   * naturale, o come base per spalmabili".
   *
   * Absent where the client says nothing. It renders in the small register
   * line under the definition — the slot the polenta note already used, which
   * was hard-coded to the flour before this field existed.
   */
  use?: string;
  /**
   * Net contents as printed, one entry per size on the shelf. Empty where the
   * client has not confirmed any — never filled with a placeholder or a dash.
   */
  formats: readonly string[];
  /**
   * Additional register rows, rendered generically in declaration order.
   *
   * This is the extension point, and 2026-07-28 is what it was built for:
   * style, strength, packaging, quantitative ingredient declarations, allergen
   * notes and PRICES all arrived at once and all render here with no change to
   * the component or the CSS.
   *
   * On prices. They appear because the client publishes them in a priced
   * brochure, and they are set in the same voice as a net weight — a row in a
   * register, never an offer. There is no cart, no "Compra", no availability
   * statement and no shipping. Deleting the price row must never break
   * anything; nothing may be built that assumes one exists.
   *
   * `label` is the React key, so two rows may not share one.
   *
   * Nothing may be added speculatively: an absent row is the correct
   * rendering of an unknown fact.
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
 * described an orto botanico aziendale supplying the herbs of the Amaro del
 * Dottore — and the client has since told us that claim is not something we
 * can stand behind. The Amaro itself left the catalogue on 2026-07-29; the
 * ban outlives it and applies to any future botanical product.
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
 *
 * ── The gluten line, and why it is drawn here ────────────────────────────
 * The presentation letter calls Maisette "senza glutine per natura" and the
 * letter's opening calls the maize itself "naturalmente privo di glutine".
 * REFUSED, and not negotiable: `senza glutine` is a regulated statement that
 * requires a verified analysis below 20 ppm on the finished product, and a
 * leaflet asserting it is not that analysis. It is also dangerous in this
 * particular range — Maissini carry wheat flour and barley malt, Maisotti
 * carry wheat flour, and the beer's own label reads "prodotto con cereali
 * contenenti glutine". A gluten-free claim anywhere near these five would be
 * read across all of them.
 *
 * The allergen rows below go the other way, and only where the printed
 * ingredient list supports them. Their ABSENCE on Maisette and on the Farina
 * is not a statement: it means no ingredient list for those two is on file.
 * Nobody may infer, or add, a gluten-free claim from that silence.
 * TODO(cliente): analisi glutine su Maisette e Farina, se si vuole dichiarare
 * qualcosa. Fino ad allora la riga resta assente in entrambe le direzioni.
 */
export const products: readonly Product[] = [
  {
    id: "farina",
    name: "Farina di Mais Rosso",
    definition: "Ottofile Integrale varietà Albese, macinata a pietra",
    /*
     * TODO(cliente): tempo di cottura della polenta. Tre fonti, tre numeri —
     * la brochure 2026 dice 30 minuti, la lettera di presentazione ne dice 40,
     * il vecchio sito pubblico diceva "minimo 60". Il registro non pubblica un
     * dato che si contraddice da solo: la riga tace finché il cliente non
     * sceglie. Le sei porzioni sono invece confermate e non contraddette.
     */
    use: "Per la polenta: sei porzioni da un vasetto.",
    formats: ["500 g"],
    specs: [
      // The jar is the product's distinguishing detail, and it is a physical
      // fact printed on the label, not a sustainability claim.
      { label: "Confezione", value: "vasetto in vetro sottovuoto" },
      { label: "Prezzo", value: "1 pz € 5,50 · 2 pz € 10,00" },
    ],
    origin: "mais",
    status: "completo",
  },
  {
    id: "maisette",
    name: "Maisette",
    definition: "Gallette di Mais Rosso Ottofile Integrale",
    use: "Al naturale, o come base per spalmabili.",
    /*
     * Two formats, one product. The 18 g monoporzione is a FORMAT of Maisette
     * and never a separate entry: the priced brochure sets it under the same
     * heading, and splitting it would inflate the range by one.
     */
    formats: ["120 g", "18 g"],
    specs: [
      { label: "Confezione", value: "tubo da 120 g · monoporzione salva freschezza da 18 g" },
      { label: "Prezzo", value: "1 pz € 3,90 · 3 pz € 9,90" },
      { label: "Prezzo monoporzione", value: "50 pz € 45,00" },
    ],
    origin: "mais",
    status: "completo",
  },
  {
    id: "maissini",
    name: "Maissini",
    definition: "Grissini di mais, prodotti con farina di Mais Rosso Ottofile",
    use: "Per l'aperitivo e per il cestino del pane.",
    // 200 g, printed in the 2026 priced brochure. The weight was unknown when
    // this record was written and the row was omitted rather than dashed; it
    // is now on file, and the record is complete.
    formats: ["200 g"],
    specs: [
      { label: "Prezzo", value: "1 pz € 3,90 · 3 pz € 9,90" },
      // From the printed ingredient list. Stated, not implied — and it is the
      // exact counterweight to the refused "senza glutine".
      { label: "Allergeni", value: "contiene glutine (frumento, orzo)" },
    ],
    origin: "mais",
    status: "completo",
  },
  {
    id: "maisotti",
    name: "Maisotti",
    /*
     * ADDED 2026-07-28. The product existed on the client's shelf and in their
     * priced brochure and appeared nowhere on this site — the single largest
     * factual gap the brand review found.
     */
    definition: "Biscotti con farina integrale di Mais Rosso Ottofile e miele",
    use: "Per la colazione e la merenda. Reggono l'inzuppo.",
    formats: ["250 g"],
    specs: [
      // A quantitative ingredient declaration off the printed list. It is the
      // most concrete thing that can be said about this biscuit, and it is not
      // a nutrition claim: it declares how much maize is in it, nothing more.
      { label: "Mais Rosso", value: "26,7%" },
      { label: "Prezzo", value: "1 pz € 5,50 · 2 pz € 10,00" },
      { label: "Allergeni", value: "contiene glutine (frumento), uova, latte" },
    ],
    origin: "mais",
    status: "completo",
  },
  {
    id: "birra",
    /*
     * RENAMED 2026-07-28. The site called it "Birra". The bottle calls it
     * LA MAISÈRA · 8file, and the label is the authority on a product's name.
     * The letter records where the name comes from: `maisèra` is Piedmontese
     * for the granary, the room where the maize is kept.
     *
     * What the printed label now puts ON the record, and what stays OFF it:
     *   ON  — style (Bière de Garde, farmhouse), 33 cl, 7% vol., the tasting
     *         note, the natural sediment, the gluten statement.
     *   OFF — the IBU, which is nowhere; the full ingredient list, because a
     *         register entry is not a spec sheet; and above all the contract
     *         brewery printed in the small type, which is not this company's
     *         name and does not go on this company's site.
     *
     * The definition still leads with the maize. The protagonist is the field.
     */
    name: "La Maisèra 8file",
    definition: "Birra agricola al Mais Rosso Ottofile varietà Albese, coltivato in azienda",
    use: "Da tavola. Formaggi stagionati, brasati, polenta.",
    /*
     * 33 cl, as printed on the label on file. The presentation letter says the
     * beer is bottled at 75 cl, which contradicts the bottle itself; the label
     * wins, because it is the physical artefact and because the 7% vol. below
     * is measured on it. The site previously listed both 0,33 L and 0,75 L and
     * now lists one — a deliberate reduction, not an oversight.
     * TODO(cliente): esiste davvero un formato da 75 cl? Se sì servono
     * l'etichetta e il grado alcolico di quel formato, che può differire.
     */
    formats: ["33 cl"],
    specs: [
      // Printed on the label. The unverified styles stay banned: there is a
      // test, and "Bière de Garde" passes it because it is on the bottle.
      { label: "Stile", value: "Bière de Garde · farmhouse" },
      { label: "Alcool", value: "7% vol." },
      { label: "Note", value: "tostato, pane, miele leggero" },
      { label: "In bottiglia", value: "contiene deposito naturale" },
      { label: "Allergeni", value: "prodotta con cereali contenenti glutine" },
    ],
    origin: "mais",
    status: "completo",
  },
  /*
   * "Amaro del Dottore" was carried here as a partial record until 2026-07-29,
   * when the client confirmed it is no longer in the catalogue. The TODO that
   * stood open on this entry — «fa parte della gamma? Se no, questa voce esce
   * dal registro» — is answered, and the entry is out.
   *
   * Worth keeping, because the first instinct was right for the wrong reason:
   * it appeared in none of the 2026 materials and the letter counted the range
   * as five, so it looked superseded. It was kept anyway on the evidence of a
   * bottle standing on a table in the client's own brochure photograph. That
   * was the correct call at the time — a real product is not deleted because a
   * maize brochure omits it — and it took an answer from the client, not more
   * inference from photographs, to settle it.
   *
   * `Origin["da-verificare"]` and `status: "parziale"` survive with no product
   * using them. They are deliberate: the register's ability to declare that it
   * does not know something is what makes the rest of it credible, and the
   * next partial record must not have to reinvent it.
   */
] as const;

/*
 * The Hesperides myth was recorded here — Hera's orchard, the golden apples,
 * the nymphs of the evening — and chapter 08 was built on it.
 *
 * Removed 2026-07-29. The client is changing the company name and the domain
 * and has accepted losing the garden narrative with them. Until the new name
 * exists the current one stays wherever it identifies the company — footer,
 * recapiti, email domain, privacy policy, wordmark — and nowhere does the site
 * draw meaning from it. Do not reintroduce the myth, the golden fruit, the
 * nymphs, or any reading of "Giardino" and "Esperidi" as words rather than as
 * a name. There is a test guarding this.
 *
 * See docs/nome-transizione.md.
 */
