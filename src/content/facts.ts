import type { SourceId } from "./sources";

export type FactStatus =
  | "client-confirmed"
  | "document-confirmed"
  | "historical"
  | "contradictory"
  | "requested"
  | "not-publishable";

export interface Fact<T> {
  value: T;
  source: readonly SourceId[];
  sourceDate: string | null;
  status: FactStatus;
  approvedBy: string | null;
  public: boolean;
  notes: readonly string[];
}

export type CommercialState = "active" | "inactive" | "pending";
export type ProductId = "farina" | "maisera" | "maisette" | "maissini" | "maisotti";

export interface ProductFacts {
  id: ProductId;
  order: Fact<number>;
  name: Fact<string>;
  commercialState: Fact<CommercialState>;
  specification: Fact<string | null>;
  style: Fact<string | null>;
  strength: Fact<string | null>;
  definition: Fact<string>;
  formats: Fact<readonly string[]>;
  ingredients: Fact<readonly string[]>;
  allergens: Fact<readonly string[]>;
  process: Fact<string | null>;
  packaging: Fact<string | null>;
  sensoryNote: Fact<string | null>;
}

const clientApproval = "Cliente — brief 2026-08-05";
const leadApproval = "Brand Redesign Lead — master plan 2026-08-05";

function fact<T>(value: T, record: Omit<Fact<T>, "value">): Fact<T> {
  return { value, ...record };
}

const clientConfirmed = <T>(value: T, notes: readonly string[] = []) =>
  fact(value, {
    source: ["clientBrief20260805", "redesignMasterPlan20260805"],
    sourceDate: "2026-08-05",
    status: "client-confirmed",
    approvedBy: clientApproval,
    public: true,
    notes,
  });

const masterApproved = <T>(
  value: T,
  source: readonly SourceId[],
  sourceDate: string,
  notes: readonly string[] = [],
) =>
  fact(value, {
    source: [...source, "redesignMasterPlan20260805"],
    sourceDate,
    status: "document-confirmed",
    approvedBy: leadApproval,
    public: true,
    notes,
  });

const omitted = <T>(
  value: T,
  status: Extract<FactStatus, "historical" | "contradictory" | "requested" | "not-publishable">,
  source: readonly SourceId[],
  sourceDate: string | null,
  notes: readonly string[],
) =>
  fact(value, {
    source,
    sourceDate,
    status,
    approvedBy: null,
    public: false,
    notes,
  });

export const brandFacts = {
  publicName: clientConfirmed("Mais Rosso Co.", ["Unico brand commerciale pubblico"]),
  kind: masterApproved(
    "Piccola azienda agricola piemontese",
    ["presentationLetter20260506"],
    "2026-05-06",
  ),
  legalEntity: omitted(
    "Az. Agr. Giordano Matteo",
    "requested",
    ["presentationLetter20260506"],
    "2026-05-06",
    ["Verificare ragione sociale completa, sede e dati fiscali prima del go-live"],
  ),
} as const;

export const grainFacts = {
  publicName: clientConfirmed("Mais Rosso Ottofile varietà Albese"),
  shortName: clientConfirmed("Mais Rosso Ottofile"),
  variety: clientConfirmed("Albese"),
  origin: masterApproved(
    "Antico mais piemontese",
    ["piedmontMaizeResearch200410", "presentationLetter20260506"],
    "2026-05-06",
  ),
  rows: masterApproved(
    8,
    ["piedmontMaizeResearch200410", "presentationLetter20260506"],
    "2026-05-06",
    ["La pannocchia dispone tipicamente i chicchi su otto file"],
  ),
  kernelShape: masterApproved(
    "Vitreo · arrotondato",
    ["piedmontMaizeResearch200410", "presentationLetter20260506"],
    "2026-05-06",
  ),
  kernelColor: masterApproved(
    "Arancio bruciato · bordeaux",
    ["presentationLetter20260506"],
    "2026-05-06",
  ),
  recovery: masterApproved(
    "Riportato in coltivazione dopo la diffusione degli ibridi ad alta resa",
    ["piedmontMaizeResearch200410", "presentationLetter20260506"],
    "2026-05-06",
    ["Non attribuisce a Mais Rosso Co. un recupero esclusivo"],
  ),
} as const;

export const territoryFacts = {
  fields: clientConfirmed("Ai piedi di Cherasco", ["Localizzazione dei campi, non sede legale"]),
  sowing: clientConfirmed("In primavera · indicativamente a maggio", [
    "Il periodo resta indicativo",
  ]),
  harvest: clientConfirmed("Indicativamente a settembre", [
    "Non implica una modalità di raccolta specifica",
  ]),
  availability: clientConfirmed("Legata all'andamento dell'annata", [
    "Non equivale a catalogo stagionale",
  ]),
} as const;

export const supplyChainFacts = {
  cultivation: clientConfirmed("Coltiviamo direttamente il Mais Rosso Ottofile nei nostri campi", [
    "Direttamente qualifica soltanto la coltivazione",
  ]),
  selection: clientConfirmed("Selezioniamo la materia prima destinata alle diverse ricette"),
  partners: clientConfirmed(
    "Quando una lavorazione richiede competenze dedicate, ci affidiamo a partner specializzati",
    ["Non pubblicare nomi o località dei partner salvo obblighi normativi"],
  ),
  responsibility: clientConfirmed("Seguiamo qualità, ricette e prodotto finale", [
    "Responsabilità editoriale di Mais Rosso Co. sul risultato finale",
  ]),
  stoneMilling: clientConfirmed("Macinata a pietra", [
    "La macinazione è conto terzi",
    "Non specificare il tipo di pietra, il mulino o la località",
  ]),
} as const;

export const contactFacts = {
  email: fact("giordano.matteo@outlook.com", {
    source: ["presentationLetter20260506", "redesignMasterPlan20260805"],
    sourceDate: "2026-05-06",
    status: "document-confirmed",
    approvedBy: leadApproval,
    public: true,
    notes: ["Recapito di sviluppo; riconfermare l'uso consumer prima del go-live"],
  }),
  phone: fact("338 286 6127", {
    source: ["priceBrochure20250910", "redesignMasterPlan20260805"],
    sourceDate: "2025-09-10",
    status: "document-confirmed",
    approvedBy: leadApproval,
    public: true,
    notes: ["Riconfermare come numero pubblico prima del go-live"],
  }),
  phoneHref: fact("tel:+393382866127", {
    source: ["priceBrochure20250910", "redesignMasterPlan20260805"],
    sourceDate: "2025-09-10",
    status: "document-confirmed",
    approvedBy: leadApproval,
    public: true,
    notes: ["Riconfermare come numero pubblico prima del go-live"],
  }),
  instagramHandle: fact("mais_rosso_company", {
    source: ["priceBrochure20250910", "redesignMasterPlan20260805"],
    sourceDate: "2025-09-10",
    status: "document-confirmed",
    approvedBy: leadApproval,
    public: true,
    notes: ["Verificare URL e titolarità prima del go-live"],
  }),
  instagramUrl: fact("https://www.instagram.com/mais_rosso_company/", {
    source: ["priceBrochure20250910", "redesignMasterPlan20260805"],
    sourceDate: "2025-09-10",
    status: "document-confirmed",
    approvedBy: leadApproval,
    public: true,
    notes: ["Verificare URL e titolarità prima del go-live"],
  }),
  privacyUrl: omitted(null, "requested", ["clientBrief20260805"], "2026-08-05", [
    "Non usare URL appartenenti alla denominazione precedente",
  ]),
  legalAddress: omitted(null, "requested", ["clientBrief20260805"], "2026-08-05", [
    "I campi ai piedi di Cherasco non sono una sede legale",
  ]),
  vatNumber: omitted(null, "requested", ["clientBrief20260805"], "2026-08-05", [
    "Dato necessario prima del go-live",
  ]),
} as const;

const activeProduct = clientConfirmed<CommercialState>("active");

export const productFacts: readonly ProductFacts[] = [
  {
    id: "farina",
    order: clientConfirmed(1),
    name: masterApproved(
      "Farina di Mais Rosso Ottofile integrale",
      ["presentationLetter20260506", "flourLabel20250228"],
      "2026-05-06",
    ),
    commercialState: activeProduct,
    specification: masterApproved("Varietà Albese", ["presentationLetter20260506"], "2026-05-06"),
    style: omitted(null, "not-publishable", ["clientBrief20260805"], "2026-08-05", [
      "Campo non pertinente alla farina",
    ]),
    strength: omitted(null, "not-publishable", ["clientBrief20260805"], "2026-08-05", [
      "Campo non pertinente alla farina",
    ]),
    definition: masterApproved(
      "Dal mais coltivato nei nostri campi, una farina integrale macinata a pietra e confezionata sottovuoto in vaso di vetro.",
      ["presentationLetter20260506", "flourLabel20250228"],
      "2026-05-06",
    ),
    formats: masterApproved(
      ["500 g"],
      ["presentationLetter20260506", "flourLabel20250228"],
      "2026-05-06",
    ),
    ingredients: omitted([], "requested", ["flourLabel20250228"], "2025-02-28", [
      "Serve la scheda corrente definitiva",
    ]),
    allergens: omitted([], "requested", ["flourLabel20250228"], "2025-02-28", [
      "Non dedurre claim gluten free dal silenzio del record",
    ]),
    process: clientConfirmed("Integrale · macinata a pietra"),
    packaging: masterApproved(
      "Vaso in vetro sottovuoto",
      ["presentationLetter20260506", "flourLabel20250228"],
      "2026-05-06",
    ),
    sensoryNote: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Nessuna nota necessaria alla scheda P0",
    ]),
  },
  {
    id: "maisera",
    order: clientConfirmed(2),
    name: masterApproved("La Maisèra 8file", ["maiseraLabel20260728"], "2026-07-28"),
    commercialState: activeProduct,
    specification: masterApproved(
      "Birra agricola al Mais Rosso Ottofile “Albese”",
      ["maiseraLabel20260728"],
      "2026-07-28",
    ),
    style: masterApproved("Bière de Garde · Farmhouse", ["maiseraLabel20260728"], "2026-07-28"),
    strength: masterApproved("7% vol", ["maiseraLabel20260728"], "2026-07-28"),
    definition: masterApproved(
      "Una Bière de Garde — Farmhouse non filtrata. Il Mais Rosso Ottofile coltivato nei nostri campi è un ingrediente caratterizzante della ricetta.",
      ["maiseraLabel20260728", "clientBrief20260805"],
      "2026-08-05",
    ),
    formats: clientConfirmed(
      ["33 cl"],
      ["Un ulteriore formato indicato dal cliente resta omesso finché non confermato"],
    ),
    ingredients: masterApproved(
      [
        "Acqua",
        "Malto d'orzo",
        "Farina integrale di Mais Rosso Ottofile “Albese”",
        "Luppolo",
        "Lievito",
      ],
      ["maiseraLabel20260728"],
      "2026-07-28",
    ),
    allergens: masterApproved(
      ["Cereali contenenti glutine"],
      ["maiseraLabel20260728"],
      "2026-07-28",
    ),
    process: clientConfirmed("Birrificata e confezionata con un partner specializzato"),
    packaging: omitted(null, "requested", ["maiseraLabel20260728"], "2026-07-28", [
      "Serve un packshot corrente ad alta risoluzione",
    ]),
    sensoryNote: masterApproved(
      "Calda e rustica, con note di tostato, crosta di pane e un leggero richiamo al miele.",
      ["maiseraLabel20260728"],
      "2026-07-28",
    ),
  },
  {
    id: "maisette",
    order: clientConfirmed(3),
    name: masterApproved("Maisette", ["presentationLetter20260506"], "2026-05-06"),
    commercialState: activeProduct,
    specification: masterApproved(
      "Gallette di Mais Rosso Ottofile integrale, varietà Albese",
      ["presentationLetter20260506"],
      "2026-05-06",
    ),
    style: omitted(null, "not-publishable", ["clientBrief20260805"], "2026-08-05", [
      "Campo non pertinente alle gallette",
    ]),
    strength: omitted(null, "not-publishable", ["clientBrief20260805"], "2026-08-05", [
      "Campo non pertinente alle gallette",
    ]),
    definition: masterApproved(
      "Gallette ottenute dal Mais Rosso Ottofile coltivato nei nostri campi, nel formato da 120 g e in monoporzione da 18 g.",
      ["presentationLetter20260506"],
      "2026-05-06",
    ),
    formats: masterApproved(
      ["120 g", "Monoporzione 18 g"],
      ["presentationLetter20260506"],
      "2026-05-06",
    ),
    ingredients: omitted([], "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Serve l'etichetta corrente definitiva",
    ]),
    allergens: omitted([], "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Non usare claim gluten free",
    ]),
    process: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Non dichiarare una trasformazione interna",
    ]),
    packaging: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Serve il pack corrente definitivo",
    ]),
    sensoryNote: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Nessuna nota necessaria alla scheda P0",
    ]),
  },
  {
    id: "maissini",
    order: clientConfirmed(4),
    name: masterApproved("Maissini", ["presentationLetter20260506"], "2026-05-06"),
    commercialState: activeProduct,
    specification: masterApproved(
      "Grissini con farina di Mais Rosso Ottofile varietà Albese",
      ["presentationLetter20260506", "priceBrochure20250910"],
      "2026-05-06",
    ),
    style: omitted(null, "not-publishable", ["clientBrief20260805"], "2026-08-05", [
      "Campo non pertinente ai grissini",
    ]),
    strength: omitted(null, "not-publishable", ["clientBrief20260805"], "2026-08-05", [
      "Campo non pertinente ai grissini",
    ]),
    definition: masterApproved(
      "Una ricetta da forno con farina di Mais Rosso Ottofile. Contiene frumento e malto d'orzo.",
      ["presentationLetter20260506", "priceBrochure20250910"],
      "2026-05-06",
    ),
    formats: omitted(["200 g"], "requested", ["priceBrochure20250910"], "2025-09-10", [
      "Verificare sul pack corrente prima della pubblicazione",
    ]),
    ingredients: omitted([], "requested", ["priceBrochure20250910"], "2025-09-10", [
      "Serve l'etichetta corrente definitiva",
    ]),
    allergens: masterApproved(
      ["Frumento", "Malto d'orzo"],
      ["priceBrochure20250910", "presentationLetter20260506"],
      "2026-05-06",
    ),
    process: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Non dichiarare un forno aziendale",
    ]),
    packaging: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Serve il pack corrente definitivo",
    ]),
    sensoryNote: omitted(null, "requested", ["presentationLetter20260506"], "2026-05-06", [
      "Nessuna nota necessaria alla scheda P0",
    ]),
  },
  {
    id: "maisotti",
    order: omitted(
      5,
      "contradictory",
      ["clientBrief20260805", "presentationLetter20260506"],
      "2026-08-05",
      ["Non assegnare un ordine pubblico finché lo stato non è risolto"],
    ),
    name: omitted(
      "Maisotti",
      "contradictory",
      ["clientBrief20260805", "presentationLetter20260506"],
      "2026-08-05",
      ["Presenza documentale recente, stato commerciale da confermare"],
    ),
    commercialState: omitted(
      "pending",
      "contradictory",
      ["clientBrief20260805", "presentationLetter20260506"],
      "2026-08-05",
      ["Chiedere una conferma binaria prima della pubblicazione"],
    ),
    specification: omitted(null, "contradictory", ["clientBrief20260805"], "2026-08-05", [
      "Nessun teaser o placeholder pubblico",
    ]),
    style: omitted(null, "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    strength: omitted(null, "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    definition: omitted("", "contradictory", ["clientBrief20260805"], "2026-08-05", [
      "Non riattivare il copy storico",
    ]),
    formats: omitted([], "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    ingredients: omitted([], "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    allergens: omitted([], "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    process: omitted(null, "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    packaging: omitted(null, "contradictory", ["clientBrief20260805"], "2026-08-05", []),
    sensoryNote: omitted(null, "contradictory", ["clientBrief20260805"], "2026-08-05", []),
  },
] as const;
