import { BrandMark } from "@/components/BrandMark";

export interface ContactContent {
  eyebrow: string;
  title: string;
  body: string;
  support: string;
  primaryCta: { label: string; href: string };
  professional: {
    title: string;
    body: string;
    cta: { label: string; href: string };
  };
}

export interface FooterContent {
  description: string;
  links: readonly { label: string; href: string }[];
  contactLinks?: readonly { label: string; href: string; external?: boolean }[];
  legal?: readonly string[] | null;
  copyright: string;
}

export function ContactFooter({
  contact,
  footer,
}: {
  contact: ContactContent;
  footer: FooterContent;
}) {
  return (
    <footer id="contatti" className="contact" data-field="inverse">
      <div className="contact__inner layout-grid">
        <section className="contact__primary reveal" aria-labelledby="contact-title">
          <p className="section__eyebrow t-label">{contact.eyebrow}</p>
          <h2 id="contact-title" className="t-display-2">
            {contact.title}
          </h2>
          <p className="t-lead">{contact.body}</p>
          <a className="button button--inverse" href={contact.primaryCta.href}>
            {contact.primaryCta.label}
          </a>
          <p className="contact__support t-small">{contact.support}</p>
        </section>

        <section className="contact__professional reveal" aria-labelledby="professional-title">
          <p className="t-label">Per professionisti</p>
          <h3 id="professional-title" className="t-display-3">
            {contact.professional.title}
          </h3>
          <p className="t-body">{contact.professional.body}</p>
          <a className="text-link text-link--inverse" href={contact.professional.cta.href}>
            {contact.professional.cta.label}
          </a>
        </section>

        <div className="footer-brand">
          <a href="#inizio" aria-label="Mais Rosso Co. — torna all'inizio">
            <BrandMark />
          </a>
          <p>{footer.description}</p>
        </div>

        <nav className="footer-nav" aria-label="Navigazione nel piè di pagina">
          <ul>
            {footer.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {footer.contactLinks?.length ? (
          <address className="footer-contacts">
            {footer.contactLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
                {link.external ? (
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                ) : null}
              </a>
            ))}
          </address>
        ) : null}

        <div className="footer-legal t-small">
          {footer.legal?.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
