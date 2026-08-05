import {
  getPublicProducts,
  publicBrand,
  publicContacts,
  publicGrain,
  publicSupplyChain,
  publicTerritory,
  type PublicProduct,
} from "./selectors";

export interface DataRow {
  label: string;
  value: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

interface MailtoOptions {
  subject: string;
  body?: string;
  email?: string;
}

export function buildMailto({
  subject,
  body,
  email = publicContacts.email,
}: MailtoOptions): string {
  const query = new URLSearchParams({ subject });

  if (body) {
    query.set("body", body);
  }

  return `mailto:${email}?${query.toString()}`;
}

const consumerRequestBody = [
  "Buongiorno,",
  "vorrei informazioni sulla disponibilità di:",
  "",
  "Prodotto:",
  "Quantità indicativa:",
  "",
  "Grazie.",
].join("\n");

const professionalRequestBody = [
  "Buongiorno,",
  "sono [nome] di [attività].",
  "Vorrei informazioni su:",
  "",
  "Referenze:",
  "Quantità indicative:",
  "",
  "Grazie.",
].join("\n");

const availabilityCta = {
  label: "Verifica disponibilità",
  href: "#contatti",
} as const;

export const navigation = {
  items: [
    { label: "Il mais", href: "#il-mais" },
    { label: "Dal campo", href: "#dal-campo" },
    { label: "Prodotti", href: "#prodotti" },
    { label: "Contatti", href: "#contatti" },
  ],
  cta: availabilityCta,
  openLabel: "Apri il menu",
  closeLabel: "Chiudi il menu",
  ariaLabel: "Navigazione principale",
} as const;

export const heroContent = {
  eyebrow: publicBrand.kind,
  title: publicBrand.name,
  lead: `Coltiviamo direttamente il ${publicGrain.name} nei campi ${publicTerritory.fields.replace(/^A/, "a")}. Ne selezioniamo la materia prima e seguiamo qualità, ricette e prodotto finale.`,
  range:
    "Farina, gallette, grissini e birra agricola: lavorazioni diverse intorno allo stesso mais.",
  primaryCta: { label: "Scopri i prodotti", href: "#prodotti" },
  secondaryCta: availabilityCta,
  seasonalNote: "Semina in primavera · raccolta indicativamente a settembre",
} as const;

export const matterContent = {
  eyebrow: "La materia prima",
  title: "Rosso nel chicco, Ottofile nella pannocchia",
  body: [
    `Il ${publicGrain.name} è un ${publicGrain.origin.toLowerCase()}. La granella è ${publicGrain.kernelShape.toLowerCase()}, con un colore tra l'arancio bruciato e il bordeaux. La pannocchia dispone tipicamente i chicchi su otto file.`,
    `${publicGrain.recovery}. Oggi questa varietà è il centro del lavoro di ${publicBrand.name}.`,
  ],
  facts: [
    { label: "Origine", value: publicGrain.origin },
    { label: "Chicco", value: publicGrain.kernelShape },
    { label: "Colore", value: publicGrain.kernelColor },
    { label: "Pannocchia", value: "Tipicamente otto file" },
  ],
  link: { label: "Vedi cosa ne nasce", href: "#prodotti" },
} as const;

export const fieldContent = {
  eyebrow: "Il campo",
  title: "Ai piedi di Cherasco, secondo il ritmo dell'annata",
  body: [
    "I nostri campi si trovano ai piedi di Cherasco. La semina avviene in primavera, indicativamente a maggio; il raccolto arriva indicativamente a settembre.",
    "Superficie e quantità cambiano di anno in anno. Anche la disponibilità dei prodotti segue l'andamento dell'annata.",
  ],
  facts: [
    { label: "Territorio", value: publicTerritory.fields },
    { label: "Semina", value: publicTerritory.sowing },
    { label: "Raccolta", value: publicTerritory.harvest },
    { label: "Disponibilità", value: publicTerritory.availability },
  ],
  transformations: {
    eyebrow: "Le trasformazioni",
    title: "Coltiviamo qui. Seguiamo ogni trasformazione.",
    body: `${publicSupplyChain.cultivation} e selezioniamo la materia prima. ${publicSupplyChain.partners}. ${publicSupplyChain.responsibility}.`,
    steps: [
      {
        title: "Coltiviamo",
        body: "Il Mais Rosso Ottofile cresce nei nostri campi, dalla semina al raccolto.",
      },
      {
        title: "Selezioniamo",
        body: "Scegliamo la materia prima destinata alle diverse ricette.",
      },
      {
        title: "Lavoriamo con competenze dedicate",
        body: "La macinazione a pietra e le altre trasformazioni necessarie vengono affidate a partner specializzati.",
      },
      {
        title: "Seguiamo",
        body: `Qualità, ricette e prodotto finale restano sotto la responsabilità di ${publicBrand.name}.`,
      },
    ],
  },
  link: { label: "Scopri i prodotti", href: "#prodotti" },
} as const;

function productRequestHref(productName: string): string {
  return buildMailto({
    subject: `Disponibilità — ${productName}`,
    body: consumerRequestBody.replace("Prodotto:", `Prodotto: ${productName}`),
  });
}

function productSpecs(product: PublicProduct): readonly DataRow[] {
  if (product.id === "farina") {
    return [
      ...product.formats.map((value) => ({ label: "Formato", value })),
      ...(product.process ? [{ label: "Lavorazione", value: product.process }] : []),
      ...(product.packaging ? [{ label: "Confezione", value: product.packaging }] : []),
    ];
  }

  if (product.id === "maisera") {
    return [
      ...(product.style ? [{ label: "Stile", value: product.style }] : []),
      ...product.formats.map((value) => ({ label: "Formato", value })),
      ...(product.strength ? [{ label: "Gradazione", value: product.strength }] : []),
      ...(product.ingredients.length > 0
        ? [{ label: "Ingredienti", value: product.ingredients.join(" · ") }]
        : []),
      ...(product.allergens.length > 0
        ? [{ label: "Contiene", value: product.allergens.join(" · ") }]
        : []),
    ];
  }

  if (product.id === "maisette") {
    return [
      ...(product.formats.length > 0
        ? [{ label: "Formati", value: product.formats.join(" · ") }]
        : []),
      { label: "Materia prima", value: "Mais Rosso Ottofile integrale" },
    ];
  }

  return [
    { label: "Legame con il mais", value: "Con farina di Mais Rosso Ottofile" },
    ...(product.allergens.length > 0
      ? [{ label: "Contiene", value: product.allergens.join(" · ") }]
      : []),
  ];
}

const publicProductItems = getPublicProducts().map((product) => ({
  id: product.id,
  name: product.name,
  specification: product.specification,
  description: product.definition,
  note: [product.sensoryNote, product.process].filter(Boolean).join(" ") || undefined,
  specs: productSpecs(product),
  href: productRequestHref(product.name),
}));

export const productsContent = {
  eyebrow: "I prodotti",
  title: "L'Ottofile, in lavorazioni diverse",
  introduction:
    "Una gamma costruita intorno alla stessa materia prima, con ricette e ingredienti diversi. Dal chicco alla farina, dalle gallette ai grissini, fino alla birra agricola.",
  ctaLabel: availabilityCta.label,
  items: publicProductItems,
} as const;

export const custodyContent = {
  eyebrow: "La continuità",
  title: "Il campo non produce sempre allo stesso modo",
  body: [
    "Coltivare una varietà significa misurarsi con ogni annata. Seminiamo in primavera e raccogliamo indicativamente a settembre; quantità e disponibilità cambiano con il campo.",
    "Per noi custodire il Mais Rosso Ottofile significa continuare a coltivarlo e portarlo in prodotti concreti, da conoscere e scegliere.",
  ],
  cta: availabilityCta,
} as const;

const consumerMailto = buildMailto({
  subject: `Disponibilità prodotti ${publicBrand.name}`,
  body: consumerRequestBody,
});

const professionalMailto = buildMailto({
  subject: `Informazioni professionali — ${publicBrand.name}`,
  body: professionalRequestBody,
});

export const contactContent = {
  eyebrow: "Informazioni e disponibilità",
  title: "Quale prodotto ti interessa?",
  body: "Indica il prodotto e la quantità di interesse. Possiamo verificare la disponibilità legata all'annata e darti le informazioni utili.",
  support: "Nella richiesta indica prodotto e quantità di interesse.",
  primaryCta: { label: availabilityCta.label, href: consumerMailto },
  professional: {
    title: "Informazioni per la tua attività",
    body: "Se lavori nella ristorazione, in una gastronomia o in un negozio, indica la tua attività, le referenze e le quantità di interesse.",
    cta: { label: "Richiedi informazioni professionali", href: professionalMailto },
  },
} as const;

export const footerContent = {
  description: `${publicGrain.name}, coltivato ai piedi di Cherasco.`,
  links: navigation.items,
  contactLinks: [
    { label: "Email", href: `mailto:${publicContacts.email}` },
    { label: "Telefono", href: publicContacts.phoneHref },
    { label: "Instagram", href: publicContacts.instagramUrl },
  ],
  legal: null,
  copyright: `© 2026 ${publicBrand.name}`,
} as const;

export const metaContent = {
  title: "Mais Rosso Co. | Mais Rosso Ottofile ai piedi di Cherasco",
  description:
    "Mais Rosso Co. coltiva il Mais Rosso Ottofile varietà Albese ai piedi di Cherasco e ne segue farina, gallette, grissini e birra agricola.",
  openGraph: {
    title: "Mais Rosso Co. — Mais Rosso Ottofile varietà Albese",
    description:
      "Un mais piemontese riconoscibile, coltivato ai piedi di Cherasco e trasformato in una gamma concreta.",
  },
} as const;

export const pageContent = {
  navigation,
  hero: heroContent,
  matter: matterContent,
  field: fieldContent,
  products: productsContent,
  custody: custodyContent,
  contact: contactContent,
  footer: footerContent,
} as const;
