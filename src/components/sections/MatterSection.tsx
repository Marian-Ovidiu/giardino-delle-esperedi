import { MediaFrame, type MediaFrameAsset } from "@/components/MediaFrame";
import { RegistroDati, type DataRow } from "@/components/RegistroDati";
import { SectionShell } from "@/components/SectionShell";

export interface MatterContent {
  eyebrow: string;
  title: string;
  body: readonly string[];
  facts: readonly DataRow[];
  link: { label: string; href: string };
}

export function MatterSection({
  content,
  cobMedia,
  flourMedia,
}: {
  content: MatterContent;
  cobMedia: MediaFrameAsset;
  flourMedia: MediaFrameAsset;
}) {
  return (
    <SectionShell id="il-mais" eyebrow={content.eyebrow} title={content.title} className="matter">
      <MediaFrame
        asset={cobMedia}
        className="matter__cob reveal"
        ratio="portrait"
        sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 55vw, 58vw"
      />
      <div className="matter__copy reveal">
        {content.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <RegistroDati rows={content.facts} />
        <a className="text-link" href={content.link.href}>
          {content.link.label}
        </a>
      </div>

      <div className="matter__signature reveal" aria-hidden="true">
        <span className="matter__eight">8</span>
        <span className="matter__kernels">
          {Array.from({ length: 8 }, (_, index) => (
            <i key={index} />
          ))}
        </span>
      </div>

      <MediaFrame
        asset={flourMedia}
        className="matter__flour reveal"
        ratio="landscape"
        sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 44vw, 42vw"
      />
    </SectionShell>
  );
}
