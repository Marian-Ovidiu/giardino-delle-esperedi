"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, INVERSION, MS, SEC, registerEases } from "@/lib/motion";

type ChapterProgress = { progress: number; active: boolean };

export function ExperienceMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    registerEases(gsap, CustomEase);

    const root = document.documentElement;
    const custody = document.querySelector<HTMLElement>("[data-field-section='notte']");
    const custodyScene = document.querySelector<HTMLElement>("[data-custody-pin]");

    root.dataset.experience = "enhanced";
    root.dataset.field = "giorno";
    root.dataset.railField = "giorno";
    if (custody) custody.dataset.field = "giorno";

    let touchLabelTimer: number | undefined;
    const railListeners = new AbortController();

    const context = gsap.context(() => {
      const kernels = Array.from(document.querySelectorAll<HTMLElement>("[data-kernel-index]"));
      const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-scheda]"));
      const marks = gsap.utils.toArray<HTMLElement>(".chapter--custody__mark");
      const chapterProgress = new Map<number, ChapterProgress>();
      const previousStates = Array.from({ length: 64 }, () => "pending");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let signatureComplete = false;

      // Forward, 1120ms: the rail turns gold one step ahead of the field —
      // the index knows before the page does — and the marks land last.
      const inversion = gsap.timeline({ paused: true });
      if (custody) {
        inversion
          .set(root, { attr: { "data-rail-field": "notte" } }, INVERSION.railAt)
          .set([root, custody], { attr: { "data-field": "notte" } }, INVERSION.fieldAt)
          .fromTo(
            marks,
            { clipPath: "inset(50%)" },
            { clipPath: "inset(0%)", duration: SEC.base, ease: EASE.registro },
            INVERSION.marksAt,
          );
      }

      // Reverse, 480ms: an undo, not a rewind. Built as its own timeline so
      // every observable duration stays in the vocabulary. Gold leaves first.
      const revert = gsap.timeline({
        paused: true,
        onStart: () => root.setAttribute("data-inversion", "reversing"),
        onComplete: () => root.removeAttribute("data-inversion"),
      });
      if (custody) {
        revert
          .to(
            marks,
            { clipPath: "inset(50%)", duration: SEC.fast, ease: EASE.uscita },
            INVERSION.reverse.marksAt,
          )
          .set([root, custody], { attr: { "data-field": "giorno" } }, INVERSION.reverse.fieldAt)
          .set(root, { attr: { "data-rail-field": "giorno" } }, INVERSION.reverse.railAt);
      }

      const setSignature = (complete: boolean) => {
        if (!custody || signatureComplete === complete) return;
        signatureComplete = complete;

        // Reduced motion: PRESERVED and instantaneous. Everything changes at
        // 0ms together and the destination is pixel-identical. Removing or
        // softening the inversion here would be a defect, not an
        // accommodation — it is the one thing the colour system exists for.
        if (prefersReducedMotion) {
          inversion.pause();
          revert.pause();
          root.removeAttribute("data-inversion");
          root.dataset.railField = complete ? "notte" : "giorno";
          root.dataset.field = complete ? "notte" : "giorno";
          custody.dataset.field = complete ? "notte" : "giorno";
          gsap.set(marks, { clipPath: complete ? "inset(0%)" : "inset(50%)" });
          return;
        }

        if (complete) {
          revert.pause();
          root.removeAttribute("data-inversion");
          inversion.play();
        } else {
          inversion.pause();
          revert.restart();
        }
      };

      const cover = document.querySelector<HTMLElement>(".rail__cover");
      let previousRead = -1;

      const syncRail = () => {
        kernels.forEach((kernel, index) => {
          const chapter = Math.floor(index / 8);
          const withinChapter = index % 8;
          const chapterState = chapterProgress.get(chapter);
          const filled = chapterState
            ? Math.floor(Math.max(0, Math.min(1, chapterState.progress)) * 8)
            : 0;
          const state =
            withinChapter < filled ? (chapterState?.active ? "active" : "completed") : "pending";

          if (previousStates[index] !== state) {
            kernel.dataset.state = state;
            previousStates[index] = state;
          }
        });

        // The cover counts schede READ, not the scheda you are in: a row only
        // counts once all eight of its kernels are filled. This is why the
        // cover reads 08/08 exactly when kernel 64 lands and the field
        // inverts — the two are the same event, so "the record is complete"
        // is never asserted early.
        let read = 0;
        for (let chapter = 0; chapter < 8; chapter += 1) {
          const start = chapter * 8;
          let filled = true;
          for (let offset = 0; offset < 8; offset += 1) {
            if (previousStates[start + offset] === "pending") {
              filled = false;
              break;
            }
          }
          if (filled) read += 1;
        }
        if (cover && read !== previousRead) {
          cover.textContent = `${String(read).padStart(2, "0")}/08`;
          previousRead = read;
        }

        // The count is the event: palette state can only follow kernel 64.
        // Asymmetric thresholds latch the FIELD only — the kernels above stay
        // a pure function of scroll. Without this, one scroll notch at the
        // boundary replays the site's only chromatic event as a strobe.
        const custodyProgress = chapterProgress.get(7)?.progress ?? 0;
        if (!signatureComplete && custodyProgress >= INVERSION.arm) {
          setSignature(true);
        } else if (signatureComplete && custodyProgress < INVERSION.release) {
          setSignature(false);
        }
      };

      const updateChapter = (chapter: number, progress: number, active: boolean) => {
        chapterProgress.set(chapter, { progress, active });
        syncRail();
      };

      chapters.forEach((section) => {
        const chapter = Number.parseInt(section.dataset.scheda ?? "0", 10) - 1;
        chapterProgress.set(chapter, { progress: 0, active: false });

        // Chapter 08 owns the only pin and is wired separately below.
        if (chapter === 7) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onEnter: () => updateChapter(chapter, 0, true),
          onEnterBack: ({ progress }) => updateChapter(chapter, progress, true),
          onUpdate: ({ progress, isActive }) => updateChapter(chapter, progress, isActive),
          onLeaveBack: () => updateChapter(chapter, 0, false),
          onLeave: () => updateChapter(chapter, 1, false),
        });
      });

      if (custody && custodyScene) {
        if (prefersReducedMotion) {
          // Unpinned, but still SCROLL-DRIVEN on the same top/bottom geometry
          // as every other chapter, so kernels 57–64 fill across chapter 08
          // and the 64th still fires the event. Firing on section entry would
          // flip the page to night while chapter 07 still filled the screen —
          // which is exactly the 2.99:1 hazard — and would jump eight kernels
          // in one step, diverging from the motion-on rail.
          ScrollTrigger.create({
            trigger: custody,
            start: "top top",
            end: "bottom bottom",
            onEnter: () => updateChapter(7, 0, true),
            onEnterBack: ({ progress }) => updateChapter(7, progress, true),
            onUpdate: ({ progress, isActive }) => updateChapter(7, progress, isActive),
            onLeaveBack: () => updateChapter(7, 0, false),
            onLeave: () => updateChapter(7, 1, false),
          });
        } else {
          ScrollTrigger.create({
            trigger: custodyScene,
            start: "top top",
            /*
             * The pin costs a full extra screen of scroll on every device
             * (GSAP inserts a spacer of exactly `end - start`). On a phone
             * that is 800px of page for one held moment, on top of a page
             * already fighting its own length — so mobile holds for half a
             * viewport. The inversion still fires on kernel 64 and the moment
             * is still held; it is held for less scroll.
             */
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 0.5 : 1)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => updateChapter(7, 0, true),
            onEnterBack: ({ progress }) => updateChapter(7, progress, true),
            onUpdate: ({ progress, isActive }) => updateChapter(7, progress, isActive),
            onLeaveBack: () => updateChapter(7, 0, false),
            onLeave: () => updateChapter(7, 1, false),
          });
        }
      }

      document.querySelectorAll<HTMLAnchorElement>(".rail__link").forEach((link) => {
        link.addEventListener(
          "click",
          () => {
            const label = document.querySelector<HTMLElement>(".rail__touch-label");
            const title = link.querySelector<HTMLElement>(".rail__panel-title")?.textContent;
            if (!label || !title || window.matchMedia("(min-width: 768px)").matches) return;

            window.clearTimeout(touchLabelTimer);
            label.textContent = title;
            label.dataset.visible = "true";
            touchLabelTimer = window.setTimeout(() => {
              delete label.dataset.visible;
              label.textContent = "";
            }, MS.slow);
          },
          { signal: railListeners.signal },
        );
      });

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-motion='hero-title'] .hero__title-line > span",
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: SEC.base,
            stagger: SEC.stagger,
            ease: EASE.registro,
          },
        );

        chapters.forEach((section) => {
          const rows = section.querySelectorAll(".registro__riga");
          if (rows.length === 0) return;

          gsap.fromTo(
            rows,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: SEC.base,
              stagger: SEC.stagger,
              ease: EASE.registro,
              scrollTrigger: {
                trigger: section,
                start: "top 76%",
                once: true,
              },
            },
          );
        });
      });

      syncRail();
      ScrollTrigger.refresh();

      return () => motion.revert();
    });

    return () => {
      window.clearTimeout(touchLabelTimer);
      railListeners.abort();
      context.revert();
      root.dataset.field = "giorno";
      delete root.dataset.railField;
      delete root.dataset.experience;
      if (custody) custody.dataset.field = "notte";
    };
  }, []);

  return null;
}
