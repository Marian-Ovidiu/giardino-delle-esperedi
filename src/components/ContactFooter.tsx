import { a11y, contatti, piede } from "@/content/site";

/**
 * The conversion section — the end of the register, and the only place the
 * site asks for anything.
 *
 * The company does not sell online, so this is not a shop and must never
 * imitate one: no cart, no prices, no stock, no "compra ora". The real
 * conversion is a phone call, an email, a structured availability enquiry, or
 * meeting the company at a fair — and all four are given their own affordance.
 *
 * It stays in the night field: chapter 08 inverts and there is no return to
 * day. The last thing on the site is dark.
 */
export function ContactFooter() {
  return (
    <footer id="contatti" className="contact" data-field="notte">
      <div className="contact__inner field">
        <div className="contact__head">
          <p className="t-label contact__eyebrow">{contatti.label}</p>
          <h2 className="t-d3">{contatti.title}</h2>
          {/* States the constraint immediately. A visitor who expects a shop
              finds out here, not after hunting for a cart. */}
          <p className="t-lead">{contatti.standfirst}</p>
        </div>

        {/* What happens after contact. Answers the question the reader is
            actually asking before they commit to writing. */}
        <ol className="contact__percorso" aria-label="Come funziona">
          {contatti.percorso.map((step) => (
            <li className="percorso" key={step.n}>
              <p className="percorso__n t-num">{step.n}</p>
              <h3 className="percorso__title t-label-lg">{step.title}</h3>
              <p className="percorso__body t-small">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="contact__canali">
          <h3 className="t-label contact__section-label">Canali</h3>
          <ul className="canali">
            {contatti.canali.map((canale) => (
              <li className="canale" key={canale.id} data-primary={canale.primary || undefined}>
                <p className="canale__label t-label">{canale.label}</p>
                <a className={`canale__action ${canale.type}`} href={canale.href}>
                  {canale.action}
                </a>
                <p className="canale__note t-small">{canale.note}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* The in-person channel. Given real space rather than a footnote,
            because for this business it is a genuine route to purchase. */}
        <section className="contact__fiere" aria-labelledby="fiere-title">
          <p className="t-label contact__section-label">{contatti.fiere.label}</p>
          <h3 id="fiere-title" className="t-d4">
            {contatti.fiere.title}
          </h3>
          <p className="t-body">{contatti.fiere.body}</p>
          <p className="contact__fiere-note t-small">{contatti.fiere.note}</p>
        </section>

        <address className="contact__recapiti">
          <p className="t-label contact__section-label">{contatti.recapiti.label}</p>
          {contatti.recapiti.address.map((line) => (
            <p className="t-small contact__address-line" key={line}>
              {line}
            </p>
          ))}
          <ul className="contact__social">
            {contatti.social.map((item) => (
              <li key={item.label}>
                <a className="t-label" href={item.url} target="_blank" rel="noreferrer">
                  {item.label} · {item.handle}
                  <span className="sr-only"> ({a11y.newTab})</span>
                </a>
              </li>
            ))}
          </ul>
        </address>

        <div className="contact__legal t-data">
          <p>{piede.copyright}</p>
          <a href={piede.privacy.href}>{piede.privacy.label}</a>
        </div>
      </div>
    </footer>
  );
}
