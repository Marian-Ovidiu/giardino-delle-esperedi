"use client";

import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/BrandMark";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface HeaderContent {
  items: readonly NavigationItem[];
  cta: NavigationItem;
  openLabel: string;
  closeLabel: string;
  ariaLabel: string;
}

export function Header({ content }: { content: HeaderContent }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function closeMenu({ restoreFocus = false }: { restoreFocus?: boolean } = {}) {
    const menu = menuRef.current;
    if (!menu?.open) return;

    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    menu.dataset.closing = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimerRef.current = setTimeout(
      () => {
        menu.open = false;
        delete menu.dataset.closing;
        if (restoreFocus) menu.querySelector<HTMLElement>("summary")?.focus();
      },
      reducedMotion ? 0 : 180,
    );
  }

  return (
    <header className="site-header" data-header>
      <div className="site-header__inner layout-grid">
        <a className="site-header__brand" href="#inizio" aria-label="Mais Rosso Co. — inizio">
          <BrandMark />
        </a>

        <nav className="site-header__nav" aria-label={content.ariaLabel}>
          <ul>
            {content.items.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="button button--primary site-header__cta" href={content.cta.href}>
          {content.cta.label}
        </a>

        <details
          className="site-header__menu"
          ref={menuRef}
          onToggle={(event) => {
            if (!event.currentTarget.open) delete event.currentTarget.dataset.closing;
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeMenu({ restoreFocus: true });
            }
          }}
        >
          <summary
            onClick={(event) => {
              if (menuRef.current?.open) {
                event.preventDefault();
                closeMenu();
              }
            }}
          >
            <span className="site-header__menu-open">{content.openLabel}</span>
            <span className="site-header__menu-close">{content.closeLabel}</span>
            <span className="site-header__menu-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </summary>
          <nav aria-label={content.ariaLabel}>
            <ul>
              {content.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => closeMenu()}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="button button--primary"
              href={content.cta.href}
              onClick={() => closeMenu()}
            >
              {content.cta.label}
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
