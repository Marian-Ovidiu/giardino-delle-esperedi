import Image from "next/image";
import { media, type MediaKey } from "@/content/media";

/**
 * A plate in the register.
 *
 * Takes a slot key, never a path. Empty slots render nothing — no gap, no
 * broken image, no placeholder box — so a missing asset degrades to the
 * typographic composition rather than to a defect.
 *
 * ── The three patterns (docs/art-review-immagini.md §9) ──────────────────
 *
 * `lastra`    8:5, large, bleeds off the right viewport edge. The high
 *             photographic moment. Legal in chapters 02, 05 and 07 only, one
 *             per chapter, ≤20% off-screen (art-direction §7.4.1). Its rarity
 *             is its value.
 *
 * `reperto`   1:1, small, a specimen card. Desktop and tablet only — square
 *             assets are dropped on mobile (§8.5).
 *
 * `campitura` The image as the ground of a whole section, behind everything.
 *             Decorative and `aria-hidden`: a ground is not a citable plate,
 *             so it carries no caption.
 *
 * Every variant renders a file authored at the ratio it is displayed at.
 * There is no CSS re-cropping: §8.4 makes `object-fit: cover` on a box of a
 * different ratio a defect, so `reperto` reads a real 1:1 derivative and
 * `campitura` a real wide one.
 */
export type PiastraVariant = "lastra" | "reperto" | "campitura";

export function Piastra({
  slot,
  variant = "lastra",
  className,
  priority = false,
  sizes,
}: {
  slot: MediaKey;
  variant?: PiastraVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const asset = media[slot];
  if (!asset) return null;

  const classes = ["piastra", `piastra--${variant}`, className].filter(Boolean).join(" ");

  // A ground is not a plate: no figure, no caption, no annotation, no
  // accessible name. It is texture the section is printed on.
  if (variant === "campitura") {
    return (
      <div className={classes} aria-hidden="true">
        <Image
          src={asset.src}
          alt=""
          width={asset.width}
          height={asset.height}
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="piastra__img"
        />
      </div>
    );
  }

  const decorative = asset.alt === "";
  const defaultSizes =
    variant === "reperto"
      ? "(max-width: 767px) 0px, 320px"
      : "(max-width: 767px) 100vw, (max-width: 1279px) 80vw, 60vw";

  return (
    <figure className={classes} data-status={asset.status}>
      <div className="piastra__frame">
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes ?? defaultSizes}
          priority={priority}
          className="piastra__img"
          aria-hidden={decorative || undefined}
        />
      </div>

      {/* The "Immagine provvisoria" annotation was printed here until
          2026-07-29 and was removed at the client's request. `data-status`
          survives on the figure, so a provisional plate is still findable in
          the DOM and in the registry — it just no longer says so on the page.
          The caption below is now the only thing describing the picture, which
          is why it must describe THIS picture and not the one it replaced. */}
      {asset.caption && (
        <figcaption className="piastra__caption t-small">{asset.caption}</figcaption>
      )}
    </figure>
  );
}
