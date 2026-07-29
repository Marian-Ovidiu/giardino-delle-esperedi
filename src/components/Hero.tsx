import { hero } from "@/content/site";
import { StaticProloguePlate } from "@/components/StaticProloguePlate";

export function Hero() {
  return (
    <section className="hero field" aria-labelledby="titolo-principale">
      <StaticProloguePlate state="dispersion" />
      <p className="hero__meta t-data">{hero.meta}</p>
      <div className="hero__display" data-motion="hero-title">
        {/* One .hero__title-line per line: the outer span is the clipping
            window the GSAP reveal wipes through, the inner one is what moves.
            Three of them now, not two — see the note on hero.lines. */}
        <h1 id="titolo-principale" className="t-d0">
          {hero.lines.map((line) => (
            <span className="hero__title-line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
