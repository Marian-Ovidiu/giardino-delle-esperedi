import {
  ConservationChapter,
  CustodyChapter,
  EightRowsChapter,
  FieldChapter,
  ProductsChapter,
  RoyalChapter,
  StoneChapter,
} from "@/components/Chapters";
import { ContactFooter } from "@/components/ContactFooter";
import { ExperienceMotion } from "@/components/ExperienceMotion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImprontaTransition } from "@/components/ImprontaTransition";
import { RigaOttava } from "@/components/RigaOttava";
import { Scheda } from "@/components/Scheda";
import { chapters, nav } from "@/content/site";

export default function Home() {
  return (
    <>
      <a className="skip-link t-label" href="#contenuto">
        {nav.skipLink}
      </a>
      <RigaOttava />
      <ImprontaTransition />
      <Header />
      <main id="contenuto" data-prologue-story>
        <Hero />
        <Scheda chapter={chapters[0]} />
        <RoyalChapter />
        <EightRowsChapter />
        <ConservationChapter />
        <FieldChapter />
        <StoneChapter />
        <ProductsChapter />
        <CustodyChapter />
      </main>
      <ContactFooter />
      <ExperienceMotion />
    </>
  );
}
