import { publicBrand, publicGrain, publicTerritory } from "./selectors";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: publicBrand.name,
    description: `${publicBrand.name} coltiva il ${publicGrain.name} nei campi ${publicTerritory.fields.toLowerCase()} e ne segue le trasformazioni in una gamma di prodotti.`,
  } as const;
}

export const organizationJsonLd = buildOrganizationJsonLd();

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
