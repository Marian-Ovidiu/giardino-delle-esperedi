import { MediaFrame, type MediaFrameAsset } from "@/components/MediaFrame";
import { RegistroDati, type DataRow } from "@/components/RegistroDati";
import { SectionShell } from "@/components/SectionShell";

export interface ResponsibilityStep {
  title: string;
  body: string;
}

export interface FieldContent {
  eyebrow: string;
  title: string;
  body: readonly string[];
  facts: readonly DataRow[];
  transformations: {
    eyebrow: string;
    title: string;
    body: string;
    steps: readonly ResponsibilityStep[];
  };
  link: { label: string; href: string };
}

export function FieldSection({
  content,
  fieldMedia,
  harvestMedia,
}: {
  content: FieldContent;
  fieldMedia: MediaFrameAsset;
  harvestMedia: MediaFrameAsset;
}) {
  return (
    <SectionShell
      id="dal-campo"
      eyebrow={content.eyebrow}
      title={content.title}
      className="field-story"
    >
      <MediaFrame
        asset={fieldMedia}
        className="field-story__landscape reveal"
        ratio="wide"
        sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 64px), calc(100vw - 128px)"
      />

      <div className="field-story__copy reveal">
        {content.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <RegistroDati rows={content.facts} className="field-story__facts reveal" />

      <MediaFrame
        asset={harvestMedia}
        className="field-story__harvest reveal"
        ratio="portrait"
        sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 42vw, 34vw"
      />

      <div className="field-story__transformations reveal">
        <p className="section__eyebrow t-label">{content.transformations.eyebrow}</p>
        <h3 className="t-display-3">{content.transformations.title}</h3>
        <p className="t-body">{content.transformations.body}</p>
        <ol className="responsibilities">
          {content.transformations.steps.map((step, index) => (
            <li key={step.title}>
              <span className="responsibilities__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <a className="text-link" href={content.link.href}>
          {content.link.label}
        </a>
      </div>
    </SectionShell>
  );
}
