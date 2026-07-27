/**
 * OTTO — motion constants.
 *
 * SINGLE SOURCE OF TRUTH for timing, shared between CSS and GSAP.
 *
 * The art direction permits exactly three durations (160/320/640ms) and three
 * easings. CSS consumes them as custom properties from styles/tokens.css; JS
 * consumes them from here. The two must not drift, so the values live in one
 * place and `registerEases()` mirrors the CSS curves into GSAP CustomEase.
 *
 * A timing literal anywhere else in the codebase is a defect.
 */

import type gsapType from "gsap";

/** Milliseconds — for setTimeout, attributes, and anything DOM-facing. */
export const MS = {
  /** Tactile feedback: hover, focus, small state changes. */
  fast: 160,
  /** Standard transition: reveals, indexing, chapter marks. */
  base: 320,
  /** Structural: the night inversion, large compositional moves. */
  slow: 640,
  /** Stagger step. Never more than 8 items (art-direction §12). */
  stagger: 40,
} as const;

/** Seconds — GSAP's unit. Derived, so the two can never disagree. */
export const SEC = {
  fast: MS.fast / 1000,
  base: MS.base / 1000,
  slow: MS.slow / 1000,
  stagger: MS.stagger / 1000,
} as const;

/**
 * Easing curves, as control points. These MUST match the cubic-bezier values
 * in styles/tokens.css exactly.
 */
export const EASE_POINTS = {
  /** Default. Decisive arrival, no bounce. */
  registro: "0.2,0.8,0.2,1",
  /** Exits only. */
  uscita: "0.6,0,0.8,0.2",
  /** Chapter 08 inversion only — nowhere else. */
  inversione: "0.83,0,0.17,1",
} as const;

/** GSAP ease names, once registered. */
export const EASE = {
  registro: "registro",
  uscita: "uscita",
  inversione: "inversione",
} as const;

/**
 * The chapter-08 inversion offsets.
 * The rail turns gold one step (160ms) AHEAD of the field — the index knows
 * before the page does. Art-direction §12.6.
 */
export const INVERSION = {
  /**
   * FORWARD — 1120ms. Rail leads, field follows, marks land last.
   * The 800ms offset is a sequencing start time, not a duration; it is legal
   * because 800 = 5 × 160, i.e. on the lattice (motion-spec §5.1).
   */
  railAt: 0,
  fieldAt: SEC.fast,
  marksAt: 0.8,
  total: 0.8 + SEC.base,

  /**
   * REVERSE — 480ms, and NOT the forward timeline played backwards.
   *
   * Order mirrors forward (marks → field → rail), but each step is its own
   * vocabulary duration rather than a scaled rate. A fractional timeScale
   * would yield 91/183/366ms — none of which are in the vocabulary — and
   * would play `registro` backwards where `uscita` exists for exits.
   *
   * Gold must leave before the ground does: `--esperide` on any ground other
   * than `--notte` is a defect. And from t=320ms the failing 2.99:1 pair
   * (--pietra-testo on --notte) is off screen.
   */
  reverse: {
    marksAt: 0,
    fieldAt: SEC.fast,
    railAt: SEC.base,
    total: SEC.base + SEC.fast,
  },

  /**
   * DEAD-BAND. Kernel 64 lands at pin progress 0.875. A symmetric trigger
   * would let one scroll notch replay the site's only chromatic event as a
   * strobe. Release is held one kernel lower — every threshold here is one
   * eighth of something.
   *
   * The kernels themselves stay a pure function of scroll and unfill
   * immediately; only the FIELD latches. A reader who scrolls up 20px sees
   * kernel 64 unfill on a still-night page, which is correct: the mark reads
   * position, the field is a state that has been entered.
   */
  arm: 0.875,
  release: 0.75,
} as const;

let registered = false;

/**
 * Mirror the CSS easing curves into GSAP. Idempotent — safe to call from any
 * component that needs them.
 */
export function registerEases(
  gsap: typeof gsapType,
  CustomEase: { create: (n: string, d: string) => unknown },
) {
  if (registered) return;
  for (const [name, points] of Object.entries(EASE_POINTS)) {
    CustomEase.create(name, points);
  }
  registered = true;
  void gsap;
}
