import { ContactFooter } from "@/components/ContactFooter";
import { ExperienceMotion } from "@/components/ExperienceMotion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CustodySection } from "@/components/sections/CustodySection";
import { MatterSection } from "@/components/sections/MatterSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { brandMedia } from "@/content/media";
import {
  contactContent,
  custodyContent,
  footerContent,
  heroContent,
  matterContent,
  navigation,
  productsContent,
} from "@/content/site";
import { organizationJsonLd, serializeJsonLd } from "@/content/structured-data";

const productMedia = {
  farina: brandMedia.products.farina,
  maisera: brandMedia.products.laMaisera,
  maisette: brandMedia.products.maisette,
  maissini: brandMedia.products.maissini,
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <Header content={navigation} />
      <main id="contenuto">
        <Hero content={heroContent} media={brandMedia.hero} />
        <MatterSection content={matterContent} cobMedia={brandMedia.matterCob} />
        <ProductsSection content={productsContent} media={productMedia} />
        <CustodySection content={custodyContent} media={brandMedia.custody} />
      </main>
      <ContactFooter contact={contactContent} footer={footerContent} />
      <ExperienceMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
      />
    </>
  );
}
