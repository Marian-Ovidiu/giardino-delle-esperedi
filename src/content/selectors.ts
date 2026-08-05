import {
  brandFacts,
  contactFacts,
  grainFacts,
  productFacts,
  supplyChainFacts,
  territoryFacts,
  type Fact,
  type ProductId,
} from "./facts";

export const PUBLIC_FACT_STATUSES = ["client-confirmed", "document-confirmed"] as const;

type PublicFactStatus = (typeof PUBLIC_FACT_STATUSES)[number];
type PublishableFact<T> = Fact<T> & { public: true; status: PublicFactStatus };

export function isPublicFact<T>(record: Fact<T>): record is PublishableFact<T> {
  return (
    record.public && PUBLIC_FACT_STATUSES.some((allowedStatus) => allowedStatus === record.status)
  );
}

export function readPublicFact<T>(record: Fact<T>): T | null {
  return isPublicFact(record) ? record.value : null;
}

export function requirePublicFact<T>(record: Fact<T>, label: string): T {
  const value = readPublicFact(record);

  if (value === null) {
    throw new Error(`Il fatto richiesto non è pubblicabile: ${label}`);
  }

  return value;
}

export type PublicProductId = Exclude<ProductId, "maisotti">;

export interface PublicProduct {
  id: PublicProductId;
  order: number;
  name: string;
  specification: string | null;
  style: string | null;
  strength: string | null;
  definition: string;
  formats: readonly string[];
  ingredients: readonly string[];
  allergens: readonly string[];
  process: string | null;
  packaging: string | null;
  sensoryNote: string | null;
}

function isPublicProductId(id: ProductId): id is PublicProductId {
  return id !== "maisotti";
}

export function getPublicProducts(): readonly PublicProduct[] {
  return productFacts
    .filter(
      (product) =>
        isPublicProductId(product.id) &&
        readPublicFact(product.commercialState) === "active" &&
        readPublicFact(product.order) !== null &&
        readPublicFact(product.name) !== null &&
        readPublicFact(product.definition) !== null,
    )
    .map((product) => ({
      id: product.id as PublicProductId,
      order: requirePublicFact(product.order, `${product.id}.order`),
      name: requirePublicFact(product.name, `${product.id}.name`),
      specification: readPublicFact(product.specification),
      style: readPublicFact(product.style),
      strength: readPublicFact(product.strength),
      definition: requirePublicFact(product.definition, `${product.id}.definition`),
      formats: readPublicFact(product.formats) ?? [],
      ingredients: readPublicFact(product.ingredients) ?? [],
      allergens: readPublicFact(product.allergens) ?? [],
      process: readPublicFact(product.process),
      packaging: readPublicFact(product.packaging),
      sensoryNote: readPublicFact(product.sensoryNote),
    }))
    .sort((left, right) => left.order - right.order);
}

export const publicBrand = {
  name: requirePublicFact(brandFacts.publicName, "brand.publicName"),
  kind: requirePublicFact(brandFacts.kind, "brand.kind"),
} as const;

export const publicGrain = {
  name: requirePublicFact(grainFacts.publicName, "grain.publicName"),
  shortName: requirePublicFact(grainFacts.shortName, "grain.shortName"),
  variety: requirePublicFact(grainFacts.variety, "grain.variety"),
  origin: requirePublicFact(grainFacts.origin, "grain.origin"),
  rows: requirePublicFact(grainFacts.rows, "grain.rows"),
  kernelShape: requirePublicFact(grainFacts.kernelShape, "grain.kernelShape"),
  kernelColor: requirePublicFact(grainFacts.kernelColor, "grain.kernelColor"),
  recovery: requirePublicFact(grainFacts.recovery, "grain.recovery"),
} as const;

export const publicTerritory = {
  fields: requirePublicFact(territoryFacts.fields, "territory.fields"),
  sowing: requirePublicFact(territoryFacts.sowing, "territory.sowing"),
  harvest: requirePublicFact(territoryFacts.harvest, "territory.harvest"),
  availability: requirePublicFact(territoryFacts.availability, "territory.availability"),
} as const;

export const publicSupplyChain = {
  cultivation: requirePublicFact(supplyChainFacts.cultivation, "supplyChain.cultivation"),
  selection: requirePublicFact(supplyChainFacts.selection, "supplyChain.selection"),
  partners: requirePublicFact(supplyChainFacts.partners, "supplyChain.partners"),
  responsibility: requirePublicFact(supplyChainFacts.responsibility, "supplyChain.responsibility"),
  stoneMilling: requirePublicFact(supplyChainFacts.stoneMilling, "supplyChain.stoneMilling"),
} as const;

export const publicContacts = {
  email: requirePublicFact(contactFacts.email, "contacts.email"),
  phone: requirePublicFact(contactFacts.phone, "contacts.phone"),
  phoneHref: requirePublicFact(contactFacts.phoneHref, "contacts.phoneHref"),
  instagramHandle: requirePublicFact(contactFacts.instagramHandle, "contacts.instagramHandle"),
  instagramUrl: requirePublicFact(contactFacts.instagramUrl, "contacts.instagramUrl"),
} as const;
