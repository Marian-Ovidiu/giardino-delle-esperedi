import Image from "next/image";
import { media, provisionalNote, type MediaKey } from "@/content/media";

/**
 * A plate in the register.
 *
 * Takes a slot key, never a path. If the slot is empty it renders nothing —
 * no gap, no broken image, no placeholder box — so a missing asset degrades
 * to the typographic composition rather than to a defect.
 *
 * The frame is 8:5 per the art direction and its height comes from the
 * declared intrinsic size, so the reserved space is identical for a
 * provisional plate and the definitive photograph that replaces it. Swapping
 * one for the other cannot move the layout.
 *
 * Provisional plates are annotated as provisional. A register that shows a
 * stand-in without saying so is making a claim it has not earned; the
 * annotation disappears on its own when the status flips to `definitivo`.
 */
export function Piastra({
  slot,
  className,
  priority = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
}: {
  slot: MediaKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const asset = media[slot];
  if (!asset) return null;

  const decorative = asset.alt === "";

  return (
    <figure className={["piastra", className].filter(Boolean).join(" ")} data-status={asset.status}>
      <div className="piastra__frame">
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          priority={priority}
          className="piastra__img"
          aria-hidden={decorative || undefined}
        />
      </div>

      {(asset.caption || asset.status === "provvisorio") && (
        <figcaption className="piastra__caption t-small">
          {asset.caption}
          {asset.status === "provvisorio" && (
            <span className="piastra__nota t-label">{provisionalNote}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
