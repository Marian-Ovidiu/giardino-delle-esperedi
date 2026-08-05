import type { ReactNode } from "react";

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className,
  headingLevel = 2,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const headingId = `${id}-title`;
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <section
      id={id}
      className={["section", className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
      data-section
    >
      <div className="section__inner layout-grid">
        <header className="section__heading reveal">
          <p className="section__eyebrow t-label">{eyebrow}</p>
          <Heading id={headingId} className="section__title t-display-2">
            {title}
          </Heading>
        </header>
        {children}
      </div>
    </section>
  );
}
