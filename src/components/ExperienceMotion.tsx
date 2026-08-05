"use client";

import { useEffect } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export function ExperienceMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

    if (reducedMotion || saveData || !("IntersectionObserver" in window)) {
      root.dataset.motion = "reduced";
      return () => {
        delete root.dataset.motion;
      };
    }

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    revealNodes.forEach((node) => {
      node.dataset.reveal = "pending";
    });
    root.dataset.motion = "enhanced";

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.dataset.reveal = "visible";
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    revealNodes.forEach((node) => revealObserver.observe(node));

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section][id]"));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) root.dataset.currentSection = current.target.id;
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      revealNodes.forEach((node) => delete node.dataset.reveal);
      delete root.dataset.motion;
      delete root.dataset.currentSection;
    };
  }, []);

  return null;
}
