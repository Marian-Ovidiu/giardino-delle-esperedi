export type MediaKind = "documentary" | "product" | "illustration" | "texture";

export interface BrandMediaAsset {
  src: string;
  alt: string;
  caption: string | null;
  width: number;
  height: number;
  kind: MediaKind;
  source: string;
  sourceDate: string | null;
  rights: "client-authorized";
  crop: string;
  verification: readonly string[];
}

const hero: BrandMediaAsset = {
  src: "/images/brand/hero-pannocchie.avif",
  alt: "Due mani reggono cinque pannocchie di mais rosso appena raccolte.",
  caption: "Mais Rosso Ottofile, raccolto in pannocchia.",
  width: 1920,
  height: 1280,
  kind: "documentary",
  source: "Materiale fotografico cliente/IMG_6427.JPG",
  sourceDate: null,
  rights: "client-authorized",
  crop: "3:2 centrale; mani e pannocchie preservate",
  verification: [
    "soggetto visibile verificato",
    "persona non identificata",
    "luogo non attribuito",
  ],
};

const matterCob: BrandMediaAsset = {
  src: "/images/brand/materia-pannocchia.avif",
  alt: "Pannocchie di mais rosso tagliate, con chicchi e file visibili.",
  caption: "La forma del chicco e la disposizione tipica in otto file.",
  width: 1440,
  height: 960,
  kind: "documentary",
  source: "Materiale fotografico cliente/IMG_6378.JPG",
  sourceDate: null,
  rights: "client-authorized",
  crop: "3:2 centrale",
  verification: ["soggetto visibile verificato", "nessuna attribuzione di processo"],
};

const matterFlour: BrandMediaAsset = {
  src: "/images/brand/chicchi-farina.avif",
  alt: "Chicchi di mais rosso accanto a farina gialla in palette di legno.",
  caption: "Dal chicco alla farina integrale.",
  width: 1440,
  height: 960,
  kind: "documentary",
  source: "Materiale fotografico cliente/IMG_6380.JPG",
  sourceDate: null,
  rights: "client-authorized",
  crop: "3:2 centrale; chicchi e farina preservati",
  verification: ["soggetto visibile verificato", "non documenta il luogo di macinazione"],
};

const field: BrandMediaAsset = {
  src: "/images/brand/campo-maturo.avif",
  alt: "Un campo di mais maturo visto tra gli steli e le foglie.",
  caption: "Il mais verso la fine del ciclo in campo.",
  width: 1920,
  height: 1080,
  kind: "documentary",
  source: "Materiale fotografico cliente/Mais rosso/UYIO1755.JPG",
  sourceDate: null,
  rights: "client-authorized",
  crop: "16:9 centrale; suolo e chioma preservati",
  verification: ["soggetto visibile verificato", "paesaggio e località non attribuiti dall'alt"],
};

const harvest: BrandMediaAsset = {
  src: "/images/brand/raccolto-cassette.avif",
  alt: "Cassette piene di pannocchie di mais rosso viste dall'alto.",
  caption: "Il raccolto varia con ogni annata.",
  width: 1200,
  height: 1500,
  kind: "documentary",
  source: "Materiale fotografico cliente/Mais rosso/IMG_5097.JPG",
  sourceDate: null,
  rights: "client-authorized",
  crop: "4:5 verticale; più cassette preservate",
  verification: ["soggetto visibile verificato", "la quantità non è presentata come dato annuale"],
};

const laMaisera: BrandMediaAsset = {
  src: "/images/brand/maisera-etichetta.webp",
  alt: "Etichetta più recente della birra La Maisèra 8file.",
  caption: "La Maisèra 8file · etichetta corrente.",
  width: 572,
  height: 280,
  kind: "product",
  source: "WhatsApp Image 2026-07-28 at 09.55.23.jpeg",
  sourceDate: "2026-07-28",
  rights: "client-authorized",
  crop: "originale completo, nessun upscale",
  verification: ["etichetta corrente verificata", "non è un packshot della bottiglia"],
};

export const brandMedia = {
  hero,
  matterCob,
  matterFlour,
  field,
  harvest,
  custody: harvest,
  products: {
    farina: matterFlour,
    laMaisera,
    maisette: null,
    maissini: null,
  },
} as const satisfies {
  hero: BrandMediaAsset;
  matterCob: BrandMediaAsset;
  matterFlour: BrandMediaAsset;
  field: BrandMediaAsset;
  harvest: BrandMediaAsset;
  custody: BrandMediaAsset;
  products: {
    farina: BrandMediaAsset | null;
    laMaisera: BrandMediaAsset | null;
    maisette: BrandMediaAsset | null;
    maissini: BrandMediaAsset | null;
  };
};
