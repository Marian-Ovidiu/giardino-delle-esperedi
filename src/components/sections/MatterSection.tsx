import { MediaFrame, type MediaFrameAsset } from "@/components/MediaFrame";
import { SectionShell } from "@/components/SectionShell";

export interface MatterContent {
  eyebrow: string;
  title: string;
  body: readonly string[];
}

export function MatterSection({
  content,
  cobMedia,
}: {
  content: MatterContent;
  cobMedia: MediaFrameAsset;
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
      </div>
    </SectionShell>
  );
}
