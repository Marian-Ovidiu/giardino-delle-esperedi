import { MediaFrame, type MediaFrameAsset } from "@/components/MediaFrame";

export interface ProductItem {
  id: string;
  name: string;
  specification: string | null;
  description: string;
  note?: string | null;
  specs: readonly { label: string; value: string }[];
  href: string;
}

export interface ProductsContent {
  eyebrow: string;
  title: string;
  introduction: string;
  ctaLabel: string;
  items: readonly ProductItem[];
}

function ProductCard({
  product,
  media,
  ctaLabel,
}: {
  product: ProductItem;
  media: MediaFrameAsset | null;
  ctaLabel: string;
}) {
  return (
    <article className="product-card reveal" data-product={product.id}>
      <div className="product-card__media">
        {media ? (
          <MediaFrame
            asset={media}
            ratio="portrait"
            sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1279px) 38vw, 36vw"
          />
        ) : (
          <div className="product-card__media-empty" aria-hidden="true">
            <span>{product.name}</span>
          </div>
        )}
      </div>
      <div className="product-card__body">
        {product.specification ? (
          <p className="product-card__specification t-label">{product.specification}</p>
        ) : null}
        <h3 className="product-card__name t-display-3">{product.name}</h3>
        <p className="product-card__description t-body">{product.description}</p>
        {product.note ? <p className="product-card__note t-small">{product.note}</p> : null}

        {product.specs.length > 0 ? (
          <dl className="product-card__facts">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="t-label">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <a className="text-link product-card__cta" href={product.href}>
          {ctaLabel}
          <span className="sr-only"> — {product.name}</span>
        </a>
      </div>
    </article>
  );
}

export function ProductsSection({
  content,
  media,
}: {
  content: ProductsContent;
  media: Partial<Record<string, MediaFrameAsset | null>>;
}) {
  return (
    <section
      id="prodotti"
      className="products-section"
      aria-labelledby="products-title"
      data-section
    >
      <div className="products-section__inner layout-grid">
        <header className="products-section__heading reveal">
          <p className="section__eyebrow t-label">{content.eyebrow}</p>
          <h2 id="products-title" className="section__title t-display-2">
            {content.title}
          </h2>
          <p className="products-section__intro t-lead">{content.introduction}</p>
        </header>

        <div className="product-grid">
          {content.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              media={media[product.id] ?? null}
              ctaLabel={content.ctaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
