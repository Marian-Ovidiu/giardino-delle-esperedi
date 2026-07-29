/**
 * OTTO — content layer.
 *
 * Final Italian copy from docs/content-plan.md. Every factual assertion here is
 * traceable to src/content/facts.ts or docs/discovery.md.
 *
 * AUTHORING RULE: registry labels are written here in normal case and
 * uppercased in CSS via `text-transform`. Never author them in caps — screen
 * readers spell out all-caps strings letter by letter.
 *
 * See docs/content-plan.md §8 for the regulatory record. In short:
 *   · No nutrition or health claims anywhere. (EU Reg. 1924/2006 — the variety's
 *     properties in literature are not a claim about the finished product.)
 *   · `biologico` is a protected term (EU Reg. 2018/848) and appears nowhere.
 *     The Amaro's provenance sentence, which carried it, has been removed
 *     entirely: the only confirmed cultivation is the Mais Rosso Ottofile.
 *   · `senza glutine` must never appear.
 */

import { company, grain, origins, products } from "./facts";

export interface DataRow {
  label: string;
  value: string;
}

export interface Chapter {
  /** Two-digit register number, used by the rail and the scheda label. */
  n: string;
  /** Anchor id / section id. */
  id: string;
  title: string;
  /** Occhiello — the single-line standfirst. */
  standfirst: string;
  /** Body paragraphs. */
  body: readonly string[];
  data: readonly DataRow[];
  /** Image caption, doubles as the basis for alt text. */
  caption?: string;
  /** One-line summary shown when the rail mark expands. */
  railFact: string;
}

export const nav = {
  wordmark: company.name,
  meta: "Cherasco (CN)",
  link: { label: "Contatti", href: "#contatti" },
  skipLink: "Vai al contenuto",
} as const;

export const hero = {
  /** Bodoni, bottom-left. The final word is clipped by the viewport edge. */
  display: "Mais Rosso Ottofile Integrale",
  /** The word CSS must clip — it does not fit, and that is the point. */
  clippedWord: "Integrale",
  meta: "Varietà Albese · Cherasco (CN) · Registro · 8 schede",
} as const;

export const chapters: readonly Chapter[] = [
  {
    n: "01",
    id: "varieta",
    title: "La varietà",
    standfirst: "Mais Rosso Ottofile, varietà Albese.",
    body: [
      "Una varietà dell'Albese tra quelle a maggior rischio di estinzione in Piemonte.",
      // Was "la semina, la raccoglie e la trasforma". Same three verbs, now
      // with the three process facts the client states in writing: in purezza,
      // a mano, al sole.
      "L'azienda la semina in purezza, la raccoglie a mano e la essicca al sole, a Cherasco, in un'oasi protetta tra Langhe e Cuneese.",
    ],
    data: [
      { label: "Specie", value: "Mais" },
      { label: "Varietà", value: "Ottofile · Albese" },
      { label: "Appellativo", value: "il mais del Re" },
      { label: "Località", value: "Cherasco (CN), Piemonte" },
      { label: "File di chicchi", value: "8" },
      { label: "Colore del chicco", value: grain.kernel.color },
      { label: "Stato", value: "a rischio di estinzione" },
    ],
    railFact: "Mais Rosso Ottofile, varietà Albese",
  },
  {
    n: "02",
    id: "mais-del-re",
    title: "Il mais del Re",
    standfirst: "Una tradizione aziendale lo lega a Vittorio Emanuele II.",
    body: [
      // The attribution is the whole point of this sentence and it stays. The
      // brochure and the letter both tell the story as history — "fu Re
      // Vittorio Emanuele II ad imporne la semina" — and the site does not.
      // Pollenzo and the hills sit INSIDE the attributed clause, where they
      // are part of what the company recounts rather than part of the record.
      "Il soprannome «mais del Re» accompagna ancora oggi la varietà. L'azienda ne racconta l'origine come una disposizione di semina attribuita a Vittorio Emanuele II, sulle colline piemontesi e nella tenuta di Pollenzo.",
    ],
    data: [
      { label: "Fonte", value: "tradizione aziendale" },
      { label: "Appellativo", value: "il mais del Re" },
      // The name in Piedmontese, as the company writes it. A name, not a claim.
      { label: "In piemontese", value: grain.dialectName },
      { label: "Coltivato in", value: "Piemonte" },
      { label: "Fino a", value: "metà del secolo scorso" },
    ],
    caption: "Brattee secche.",
    railFact: "tradizione aziendale: il mais del Re",
  },
  {
    n: "03",
    id: "otto-file",
    title: "Otto file",
    standfirst: "Esattamente otto. Non sette, non dieci.",
    body: [
      "La pannocchia dell'Ottofile porta otto file di chicchi dalla forma arrotondata.",
      "Il numero dà il nome alla varietà e dà la struttura a questa pagina: otto colonne, otto schede. La riga a sinistra conta — otto segni per scheda, sessantaquattro in tutto.",
    ],
    data: [
      { label: "File di chicchi", value: "8" },
      { label: "Chicco", value: "tondo" },
      { label: "Sezione", value: "trasversale" },
    ],
    caption: "Sezione trasversale. Otto file.",
    railFact: "esattamente otto file di chicchi tondi",
  },
  {
    n: "04",
    id: "quasi-estinto",
    title: "Quasi estinto",
    standfirst: "Tra le varietà a maggior rischio di estinzione in Piemonte.",
    body: [
      "Coltivata in Piemonte fino alla metà del secolo scorso, è iscritta nel Registro delle Varietà da Conservazione dal 2007.",
      "Una varietà a rischio non resta viva in un archivio: resta viva se viene seminata.",
    ],
    data: [
      { label: "Stato", value: "a rischio di estinzione" },
      { label: "Ultima diffusione", value: "metà del XX secolo" },
      { label: "Registro", value: "Varietà da Conservazione · 2007" },
    ],
    caption: "Un chicco.",
    railFact: "Registro delle Varietà da Conservazione · 2007",
  },
  {
    n: "05",
    id: "il-campo",
    title: "Il campo",
    standfirst: "Agricoltura simbiotica.",
    body: [
      "L'azienda dichiara di adottare il metodo dell'agricoltura simbiotica.",
      // The letter's own words, and the most useful commercial fact in it:
      // there is no warehouse behind this, so the range moves with the year.
      "La filiera va dalla semina alla confezione, senza intermediari. La disponibilità è legata al raccolto.",
    ],
    data: [
      { label: "Metodo dichiarato", value: "agricoltura simbiotica" },
      {
        label: "Filiera",
        value: "semina · raccolta a mano · essiccazione al sole · trasformazione",
      },
      { label: "Intermediari", value: "nessuno, dal campo alla confezione" },
      { label: "Ambiente", value: "oasi protetta tra Langhe e Cuneese" },
    ],
    caption: "Semente.",
    railFact: "metodo e filiera dichiarati dall'azienda",
  },
  {
    n: "06",
    id: "la-pietra",
    title: "La pietra",
    standfirst: "Macinata a pietra. Integrale.",
    body: [
      "La Farina di Mais Rosso è integrale e macinata a pietra.",
      // Was "farina, gallette e grissini" — written when the site held three
      // maize references and false the day Maisotti and La Maisèra arrived.
      // No number: the sentence lists transformations, and the list is open.
      "Dalla stessa varietà nascono farina, gallette, grissini, biscotti e birra.",
    ],
    data: [
      { label: "Molitura", value: "a pietra" },
      { label: "Tipo", value: "integrale" },
      { label: "Varietà", value: "Ottofile · Albese" },
      { label: "Formato", value: "500 g" },
      // The jar is on the label and it is the reason the flour keeps its
      // colour on a shelf. A fact about the packaging, not a virtue.
      { label: "Confezione", value: "vasetto in vetro sottovuoto" },
    ],
    caption: "Farina macinata a pietra.",
    railFact: "macinata a pietra, integrale",
  },
  {
    n: "07",
    id: "referenze",
    // Count-free, and it keeps the noun-phrase pattern of every other chapter.
    // Also the longest single word (REFERENZE) still fits the mobile column at
    // --type-d2 40px: "TRASFORMAZIONI" did not, and overflowed the document.
    title: "Le referenze",
    standfirst: "Una terra sola. Una materia prima principale. Lavorazioni diverse.",
    body: [
      // Previously named the orto botanico as the Amaro's source. Removed:
      // the only cultivation the client can confirm is the Mais Rosso.
      "Il Mais Rosso Ottofile è la materia prima principale dell'azienda. Ogni scheda dichiara da che cosa nasce, e dove l'origine non è ancora confermata la scheda lo dice.",
      // The nomenclature fact the packaging makes obvious and the site never
      // said: the maize line has its own mark. Company name and brand name are
      // two different things, and the register should not blur them.
      "Le referenze di mais escono con il marchio Mais Rosso Co. I prezzi sono quelli del listino aziendale; l'acquisto passa dall'azienda.",
      "Il catalogo è aperto. Alcune schede sono ancora parziali.",
    ],
    data: [],
    railFact: "le referenze dell'azienda, dal mais in avanti",
  },
  {
    n: "08",
    id: "custodia",
    title: "Custodia",
    // Was "Il nome dell'azienda è la descrizione del lavoro." — the sentence
    // that made the whole chapter depend on the name. See docs/nome-transizione.md.
    standfirst: "Iscritta in un registro dal 2007, viva perché ancora seminata.",
    body: [],
    data: [],
    railFact: "una varietà da conservazione, ancora in campo",
  },
] as const;

/**
 * Chapter 07 register entries, joined to the verified factual record.
 *
 * Derived entirely from `products` — adding a product to facts.ts adds it here
 * and to the rendered register with no other change. Nothing in this file may
 * depend on how many entries there are.
 */
export const referenze = products.map((p, i) => ({
  ...p,
  /** Ordinal only. NEVER "01/03" — the total is not part of the concept. */
  index: String(i + 1).padStart(2, "0"),
  originLabel: origins[p.origin],
  /**
   * What the reference is for, one line, from `facts.ts`.
   *
   * This used to be a hard-coded polenta note on the flour, with a cooking
   * time that three client sources gave three different values for. It is now
   * a field on the product, so a use arrives with the product instead of with
   * a condition in this file — and stays absent where nothing is on record.
   */
  extra: p.use ?? null,
  /**
   * Pre-addressed enquiry, so the reader never composes a cold email.
   * Built from `company.email` rather than `cta.href`: `cta` is declared
   * further down this module and referencing it here would be a TDZ error.
   */
  href: `mailto:${company.email}?subject=${encodeURIComponent(
    `Richiesta disponibilità — ${p.name}`,
  )}`,
}));

/** Labels for the register. Status is about the RECORD, not the product. */
export const catalogo = {
  entryLabel: "Referenza",
  originLabel: "Origine",
  /**
   * "Formato", not "Peso netto": the catalogue holds both mass (500 g) and
   * volume (33 cl), and labelling a volume as a weight is simply wrong.
   * "Formato" is already the term used in chapter 06's register rows.
   */
  formatLabel: "Formato",
  /** Rendered where no verified description exists. Never a fabricated one. */
  inPreparazione: "Scheda in preparazione.",
  status: {
    completo: null,
    parziale: "Scheda parziale",
    // No badge: the description slot already reads "Scheda in preparazione.",
    // and the dashed rule marks the row. Printing it twice, 90px apart, just
    // looked like a bug.
    "in-preparazione": null,
  },
} as const;

/**
 * Chapter 08 — the single chromatic event.
 *
 * REWRITTEN 2026-07-29. This chapter used to be the Hesperides myth: Hera's
 * orchard, the golden apples, the nymphs of the evening, closing on "il nome
 * dell'azienda è la descrizione del lavoro". The client is changing the name
 * and the domain, so the chapter can no longer rest on what the name means.
 *
 * It now rests on the one thing that does not change with the name: the
 * variety is a conservation variety, and a conservation variety survives only
 * as long as someone keeps sowing it. Every assertion below is already on the
 * record in chapters 01, 04 and 05 — the 2007 registration, semina in purezza,
 * raccolta a mano, essiccazione al sole, disponibilità legata al raccolto.
 * Nothing new is claimed, and nothing here depends on the company being called
 * anything in particular.
 *
 * `display` holds three lines of ~9 characters. That is a type constraint, not
 * a style: longer lines break the t-d1 setting at 390px. See
 * docs/nome-transizione.md.
 */
export const custodia = {
  label: "Scheda 08/08",
  display: ["Custodire", "vuol dire", "seminare"],
  body: [
    "Una varietà da conservazione non si difende in un archivio. Il registro ne fissa il nome, la data e la descrizione; la varietà resta viva soltanto finché ogni anno qualcuno la rimette nel terreno.",
    "L'Ottofile dell'Albese è arrivata fin qui così: seminata in purezza, raccolta a mano, essiccata al sole, un raccolto per volta. La disponibilità è legata al raccolto — quello che c'è è quello che il campo ha dato.",
  ],
  close:
    "Questo non è un catalogo. È il registro di una varietà che esiste ancora perché continua a essere seminata.",
  final: "Il registro resta aperto",
} as const;

export const cta = {
  label: "Richiedi disponibilità",
  href: "#contatti",
} as const;

/**
 * A pre-structured enquiry. This is the closest the site comes to a form, and
 * deliberately so: there is no shop, no cart, no backend and no data
 * collection. The reader's own mail client holds everything.
 *
 * The blank fields are prompts, not claims — they ask for information rather
 * than promising anything about price, stock, shipping or turnaround.
 */
const richiestaBody = ["Referenze di interesse:", "", "Quantità:", "", "Nome e recapito:", ""].join(
  "\n",
);

/**
 * The conversion section.
 *
 * FACTUAL BOUNDARY — the company does NOT sell online. Real conversion is a
 * phone call, an email, an availability enquiry, or buying in person at a
 * fair. Nothing here may state a response time, a shipping option, a minimum
 * order, a price, a collection point or a fair date: none of those are on
 * record. What the copy describes is the shape of the conversation, not its
 * outcome.
 */
export const contatti = {
  label: "Contatti",
  /** Plain on purpose: after eight chapters of register, the commercial
      moment answers the reader's actual question in three words. */
  title: "Come acquistare",
  standfirst:
    "L'azienda non vende online. Le referenze si richiedono direttamente all'azienda, oppure si acquistano di persona alle fiere.",

  /** What happens after contact. Describes the exchange, promises nothing. */
  percorso: [
    {
      n: "01",
      title: "Scrivi o telefona",
      body: "Indica quali referenze ti interessano e in che quantità.",
    },
    {
      n: "02",
      title: "Ricevi le disponibilità",
      body: "L'azienda risponde con le disponibilità aggiornate e le modalità di acquisto.",
    },
    {
      n: "03",
      title: "Vi accordate",
      body: "Quantità e modalità si definiscono direttamente con l'azienda.",
    },
  ],

  /** Three distinct channels. The enquiry is primary — it is the real one. */
  canali: [
    {
      id: "disponibilita",
      label: "Richiesta disponibilità",
      action: "Richiedi disponibilità",
      note: "Messaggio già impostato con i campi da compilare.",
      // Archivo: an action label is interactive text, never Bodoni (§3.6).
      type: "t-lead",
      href: `mailto:${company.email}?subject=${encodeURIComponent(
        "Richiesta disponibilità",
      )}&body=${encodeURIComponent(richiestaBody)}`,
      primary: true,
      external: false,
    },
    {
      id: "telefono",
      label: "Telefono",
      action: "338 286 6127",
      note: "Per parlare direttamente con l'azienda.",
      // DM Mono owns numerals absolutely (§3.7.4). Bodoni is a defect here.
      type: "t-num",
      href: company.phoneHref,
      primary: false,
      external: false,
    },
    {
      id: "email",
      label: "Email",
      action: company.email,
      note: "Per domande, informazioni e collaborazioni.",
      // Archivo, and it wraps: 43 characters of Bodoni at 32px broke the grid.
      type: "t-lead",
      href: `mailto:${company.email}`,
      primary: false,
      external: false,
    },
  ],

  /** The in-person channel. No dates on record, and none are invented. */
  fiere: {
    label: "Di persona",
    title: "Le fiere",
    body: "L'azienda porta le sue referenze alle fiere a cui partecipa: è l'occasione per vedere i prodotti e parlare direttamente con chi li coltiva.",
    // Deliberately not "calendario in aggiornamento", which would imply a
    // calendar exists somewhere. It simply is not published here.
    note: "Il calendario non è ancora pubblicato su questo sito. Per sapere dove trovare l'azienda, scrivi o segui i canali social.",
  },

  /** Trust block: a real address, a real name, a real phone. */
  recapiti: {
    label: "Recapiti",
    address: [company.name, company.kind, "12062 Cherasco (CN), Piemonte"],
  },

  email: company.email,
  phoneDisplay: "338 286 6127",
  phoneHref: company.phoneHref,
  address: [company.name, company.kind, "12062 Cherasco (CN), Piemonte"],
  social: [
    {
      label: "Instagram",
      handle: company.social.instagram.handle,
      url: company.social.instagram.url,
    },
    { label: "Facebook", handle: company.social.facebook.handle, url: company.social.facebook.url },
  ],
} as const;

export const piede = {
  // P. IVA is not in the record. An Italian commercial site normally must
  // display it (D.Lgs. 70/2003 art. 7). Requested from the client; the slot
  // stays empty rather than being invented. See docs/content-plan.md §8.
  copyright: `© ${new Date().getFullYear()} ${company.name} · ${company.kind} · Cherasco (CN)`,
  privacy: {
    label: "Privacy Policy",
    href: "https://www.giardino-delle-esperidi.com/privacy-policy/",
  },
} as const;

export const a11y = {
  railLabel: "Indice del registro",
  railMark: (n: string, title: string) => `Scheda ${n} — ${title}`,
  email: `Scrivi a ${company.name}`,
  phone: `Telefona a ${company.name}`,
  newTab: "si apre in una nuova scheda",
} as const;

export const meta = {
  title: "Il Giardino delle Esperidi — Mais Rosso Ottofile, varietà Albese",
  description:
    "Registro del Mais Rosso Ottofile Integrale, varietà Albese: otto file di chicchi, seminato in purezza, raccolto a mano ed essiccato al sole a Cherasco. Farina, Maisette, Maissini, Maisotti e la birra agricola La Maisèra 8file.",
} as const;
