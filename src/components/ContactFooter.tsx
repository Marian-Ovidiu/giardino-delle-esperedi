import { a11y, contatti, piede } from "@/content/site";

export function ContactFooter() {
  return (
    <footer id="contatti" className="contact" data-field="notte">
      <div className="contact__inner field">
        <div className="contact__head">
          <p className="t-label">{contatti.label}</p>
          <h2 className="t-d3">{contatti.title}</h2>
          <p className="t-body">{contatti.standfirst}</p>
        </div>
        <address className="contact__details">
          <a className="contact__email t-body" href={`mailto:${contatti.email}`}>
            <span className="sr-only">{a11y.email}: </span>
            {contatti.email}
          </a>
          <a className="contact__phone t-data-lg" href={contatti.phoneHref}>
            <span className="sr-only">{a11y.phone}: </span>
            {contatti.phoneDisplay}
          </a>
          <p className="contact__address t-small">{contatti.address.join(" · ")}</p>
        </address>
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
        <div className="contact__legal t-data">
          <p>{piede.copyright}</p>
          <a href={piede.privacy.href}>{piede.privacy.label}</a>
        </div>
      </div>
    </footer>
  );
}
