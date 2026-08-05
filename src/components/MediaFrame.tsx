import Image from "next/image";

export interface MediaFrameAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string | null;
  kind?: "documentary" | "product" | "illustration" | "texture";
}

export function MediaFrame({
  asset,
  className,
  priority = false,
  sizes,
  ratio = "landscape",
}: {
  asset: MediaFrameAsset | null;
  className?: string;
  priority?: boolean;
  sizes: string;
  ratio?: "landscape" | "portrait" | "square" | "wide";
}) {
  if (!asset) return null;

  return (
    <figure
      className={["media-frame", `media-frame--${ratio}`, className].filter(Boolean).join(" ")}
      data-media-kind={asset.kind ?? "documentary"}
    >
      <div className="media-frame__viewport">
        <Image
          className="media-frame__image"
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          priority={priority}
        />
      </div>
      {asset.caption ? (
        <figcaption className="media-frame__caption t-small">{asset.caption}</figcaption>
      ) : null}
    </figure>
  );
}
