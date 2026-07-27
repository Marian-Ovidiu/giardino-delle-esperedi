import { hero } from "@/content/site";
import { StaticProloguePlate } from "@/components/StaticProloguePlate";

export function Hero() {
  return (
    <section className="hero field" aria-labelledby="titolo-principale">
      <StaticProloguePlate state="dispersion" />
      <p className="hero__meta t-data">{hero.meta}</p>
      <div className="hero__display" data-motion="hero-title">
        <h1 id="titolo-principale" className="t-d0">
          <span className="hero__title-line">
            <span>Mais Rosso</span>
          </span>
          <span className="hero__title-line hero__title-line--wide">
            <span>
              <span className="hero__title-word">Ottofile</span>{" "}
              <em className="hero__title-word hero__title-word--clipped">{hero.clippedWord}</em>
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
