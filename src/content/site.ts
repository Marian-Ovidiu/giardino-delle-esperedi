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
 *   · `biologico` is a protected term (EU Reg. 2018/848). The Amaro line ships
 *     in its certification-free form until the client confirms otherwise.
 *   · `senza glutine` must never appear.
 */

import { company, products } from "./facts";

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
      "Il Giardino delle Esperidi la semina, la raccoglie e la trasforma a Cherasco, in un'oasi protetta tra Langhe e Cuneese.",
    ],
    data: [
      { label: "Specie", value: "Mais" },
      { label: "Varietà", value: "Ottofile · Albese" },
      { label: "Appellativo", value: "il mais del Re" },
      { label: "Località", value: "Cherasco (CN), Piemonte" },
      { label: "File di chicchi", value: "8" },
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
      "Il soprannome «mais del Re» accompagna ancora oggi la varietà. Il Giardino delle Esperidi ne racconta l'origine come una disposizione di semina attribuita a Vittorio Emanuele II.",
    ],
    data: [
      { label: "Fonte", value: "tradizione aziendale" },
      { label: "Appellativo", value: "il mais del Re" },
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
      "Il Giardino delle Esperidi dichiara di adottare il metodo dell'agricoltura simbiotica.",
      "La filiera aziendale comprende semina, raccolta e trasformazione.",
    ],
    data: [
      { label: "Metodo dichiarato", value: "agricoltura simbiotica" },
      { label: "Filiera", value: "semina · raccolta · trasformazione" },
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
      "Dalla stessa varietà nascono tre referenze: farina, gallette e grissini.",
    ],
    data: [
      { label: "Molitura", value: "a pietra" },
      { label: "Tipo", value: "integrale" },
      { label: "Varietà", value: "Ottofile · Albese" },
      { label: "Formato", value: "500 g" },
    ],
    caption: "Farina macinata a pietra.",
    railFact: "macinata a pietra, integrale",
  },
  {
    n: "07",
    id: "referenze",
    title: "Tre referenze",
    standfirst: "Tre referenze dal Mais Rosso Ottofile.",
    body: ["Non una gamma. Tre."],
    data: [],
    railFact: "Maisette · Maissini · Farina di Mais Rosso",
  },
  {
    n: "08",
    id: "custodia",
    title: "Custodia",
    standfirst: "Il nome dell'azienda è la descrizione del lavoro.",
    body: [],
    data: [],
    railFact: "ninfe della sera e della luce dorata dei tramonti",
  },
] as const;

/** Chapter 07 product cards, joined to the verified factual record. */
export const referenze = products.map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, "0"),
  note:
    p.id === "maisette"
      ? "Gallette di Mais Rosso Ottofile Integrale, 120 g."
      : p.id === "maissini"
        ? "Grissini di mais prodotti con farina di Mais Rosso Ottofile."
        : "Ottofile Integrale varietà Albese, macinata a pietra, 500 g.",
  // Only the flour carries the polenta note.
  extra:
    p.id === "farina"
      ? "Per polenta: tradizionale, minimo 60 minuti di cottura, oppure col Bimby."
      : null,
}));

/**
 * Amaro del Dottore — annex, outside the register.
 *
 * NOTE: the client's own wording is "coltivate con agricoltura biologica e
 * simbiotica". `biologico` is protected under EU Reg. 2018/848 and requires
 * certification plus a control-body code. No certification is on record, so we
 * ship the certification-free wording. Restore `biologica` only on written
 * client confirmation. See docs/content-plan.md §8.2.
 */
export const allegato = {
  label: "Allegato · fuori registro",
  name: "Amaro del Dottore",
  body: "Fuori dal mais. Prodotto con le erbe officinali dell'orto botanico aziendale, coltivate con agricoltura simbiotica.",
} as const;

/** Chapter 08 — the single chromatic event. */
export const custodia = {
  label: "Scheda 08/08",
  display: ["Custodire", "qualcosa", "di dorato"],
  body: [
    "Il Giardino delle Esperidi è il frutteto di Hera. Vi cresce un boschetto di meli che producono mele d'oro, e alle Esperidi è affidato il compito di curarlo e di custodirlo.",
    "Le Esperidi sono le ninfe della sera e della luce dorata dei tramonti, chiamate così per la loro posizione immaginata nel lontano ovest dove tramonta il Sole.",
  ],
  close:
    "Il nome dell'azienda è la descrizione del lavoro. Un frutto d'oro quasi perduto, e qualcuno che lo tiene in vita seminandolo ogni anno.",
  final: "Il registro resta aperto",
} as const;

export const cta = {
  label: "Richiedi disponibilità",
  href: "#contatti",
} as const;

export const contatti = {
  label: "Contatti",
  title: "Scrivere al Giardino",
  standfirst: "Per disponibilità e informazioni sulle tre referenze.",
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
    "Registro del Mais Rosso Ottofile Integrale, varietà Albese: otto file di chicchi e una varietà a rischio di estinzione. Maisette, Maissini e Farina di Mais Rosso.",
} as const;
