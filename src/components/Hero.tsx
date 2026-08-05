import { BrandMark } from "@/components/BrandMark";
import { MediaFrame, type MediaFrameAsset } from "@/components/MediaFrame";

export interface HeroContent {
  eyebrow: string;
  title: string;
  lead: string;
  range: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  seasonalNote?: string | null;
}

export function Hero({ content, media }: { content: HeroContent; media: MediaFrameAsset }) {
  return (
    <section id="inizio" className="hero" aria-labelledby="hero-title" data-section>
      <div className="hero__inner layout-grid">
        <div className="hero__copy">
          <p className="hero__eyebrow t-label">{content.eyebrow}</p>
          <h1 id="hero-title" className="hero__title t-display-1">
            {content.title === "Mais Rosso Co." ? <BrandMark /> : content.title}
          </h1>
          <p className="hero__lead t-lead">{content.lead}</p>
          <p className="hero__range t-body">{content.range}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={content.primaryCta.href}>
              {content.primaryCta.label}
            </a>
            <a className="button button--secondary" href={content.secondaryCta.href}>
              {content.secondaryCta.label}
            </a>
          </div>
          {content.seasonalNote ? (
            <p className="hero__season t-small">{content.seasonalNote}</p>
          ) : null}
        </div>

        <MediaFrame
          asset={media}
          className="hero__media"
          priority
          ratio="portrait"
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 58vw, 58vw"
        />
      </div>
    </section>
  );
}
