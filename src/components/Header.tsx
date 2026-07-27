import { nav } from "@/content/site";

export function Header() {
  return (
    <header className="site-header field">
      <p className="site-header__wordmark t-label-lg">{nav.wordmark}</p>
      <p className="site-header__meta t-data">{nav.meta}</p>
      <a className="site-header__link t-label" href={nav.link.href}>
        {nav.link.label}
      </a>
    </header>
  );
}
