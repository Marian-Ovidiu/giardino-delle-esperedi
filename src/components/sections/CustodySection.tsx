import { MediaFrame, type MediaFrameAsset } from "@/components/MediaFrame";

export interface CustodyContent {
  eyebrow: string;
  title: string;
  body: readonly string[];
  cta: { label: string; href: string };
}

export function CustodySection({
  content,
  media,
}: {
  content: CustodyContent;
  media: MediaFrameAsset;
}) {
  return (
    <section
      id="custodia"
      className="custody"
      aria-labelledby="custody-title"
      data-section
      data-field="inverse"
    >
      <div className="custody__inner layout-grid">
        <div className="custody__copy reveal">
          <p className="section__eyebrow t-label">{content.eyebrow}</p>
          <h2 id="custody-title" className="t-display-2">
            {content.title}
          </h2>
          {content.body.map((paragraph) => (
            <p className="t-body" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <a className="button button--inverse" href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
        <MediaFrame
          asset={media}
          className="custody__media reveal"
          ratio="portrait"
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 42vw, 42vw"
        />
      </div>
    </section>
  );
}
