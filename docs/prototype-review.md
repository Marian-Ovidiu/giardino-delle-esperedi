# Focused prototype review

**Project:** Il Giardino delle Esperidi  
**Gate:** Phase 6  
**Date:** 2026-07-26  
**Final verdict:** `GO PHASE 7`

## Signature prologue review amendment — 2026-07-26

The former single-frame Impronta transition was replaced, after a new focused gate, by the deterministic WebGL2 sequence documented in `docs/signature-motion.md`. The reviewed checkpoints are `000`, `012`, `024`, `039`, `052`, `068`, `084` and `100` at 1440×1000, 768×900 and 390×844. Integrated evidence lives in `docs/captures/signature-landing/`.

### Independent reviews

- **Motion Designer — FINAL GO.** The seven-stage arc reads as one causal gesture. Forward/reverse render hashes match at every checkpoint on all three viewports. Wind is progress-driven, the cob camera holds from `0.34–0.44`, and pointer input is a true camera orbit hard-gated during the two contemplation intervals.
- **Art Director — FINAL GO CREATIVO.** The real-page integration keeps text dominant at every checkpoint. `024` retains controlled tension, `039–084` remain subordinate to chapters 01–02, and `exit` is clean before the chapter-03 proof.
- **Brand and Content Strategist — GO.** No runtime copy, product hierarchy, weight or claim changed. The signature and all static states are decorative, `aria-hidden`, captionless and carry empty alt text.
- **Creative Frontend Lead — FINAL GO TECNICO.** The fixed canvas adds no document height; three approved exports serve four absolute fallback placements without CLS. Final LOD preserves eight lanes at 3/4/6 depths; camera depth is responsive and pointer RAF stops outside the semantic story range.

### Asset gate

The Art Director marked all three transparent fallback exports `APPROVED SHIP`: no source rectangle is visible, and dispersion, plant and eight-incision states retain one material language. They are used as four section backgrounds because the incision export also performs the short chapter-03 release. Combined runtime payload: 21,316 bytes.

### Signature gate decision

> `FINAL GO`

No redesign was introduced: typography, palette, content, eight-column layout and all eight chapters remain unchanged.

## Prototype scope

The reviewed prototype contained only the agreed proof points:

- navigation and the fixed `Riga Ottava` rail;
- the unnumbered cover/hero;
- the first material transition;
- chapter 01, `La varietà`;
- one product presentation, `Farina di Mais Rosso`;
- the 64-kernel signature system;
- the approved Higgsfield `Impronta Otto` asset in context.

Reference captures were produced at 1440×1000, 768×900 and 390×844 in both motion-active and reduced-motion modes. Captures are reproducible with `npm run shots`; local outputs live in `docs/captures/` and are intentionally gitignored.

## Independent review — Brand and Content Strategist

### What worked

- Ingredient-first hierarchy was clear and the current Farina name/500 g format were correct.
- Unverified coordinates and the unsafe chemical-input/origin claims were absent.
- The imprint communicated eight without pretending to be botanical evidence.

### What weakened the concept

- `Integrale` was over-clipped on narrow screens.
- The Farina definition/weight were repeated.
- `Una varietà, trasformata` and the large `03` were generic or ambiguous.
- The prototype contact target was initially missing.

### Required changes and resolution

- The mobile cover was explicitly re-composed on three lines; the commercial name is now legible.
- Duplicate product copy was removed.
- The line became `Otto file, poi la pietra` and the counter became `Referenza 03/03`.
- Contact became a working mail link during the prototype and a real `#contatti` target in the full page.
- The royal provenance was qualified as company tradition; the conservation copy now uses the official 2007 register fact.

## Independent review — Motion and Interaction Designer

### What worked

- The rail rendered 8×8 actual kernel nodes and remained reversible.
- Reduced motion retained the full composition and count.
- No parallax, scroll hijacking, gratuitous pinning or decorative video was introduced.

### What weakened the concept

- The first pass used generic vertical text translation and reserved 640 ms outside chapter 08.
- CSS easing strings were not guaranteed to parse in GSAP.
- A single prototype-wide progress value falsely crossed unmounted chapters and six anchors were dead.
- Kernel state changes were unnecessarily rewritten on every scroll update.

### Required changes and resolution

- Hero and registry reveal only through `clip-path`, 320 ms, with 40 ms stagger.
- The exact register curve is registered through GSAP `CustomEase`.
- Triggers begin at 24% viewport entry.
- Prototype rail state was mapped only to mounted chapters; absent links were removed from the accessibility tree. Phase 7 restores all eight real targets.
- Kernel DOM writes occur only when a state changes; normal state colour uses 160 ms and reduced motion uses 0 ms.

## Independent review — Creative Frontend Lead

### What worked

- Server Components remained the default and motion stayed in one client island.
- Fonts are local, `next/image` has intrinsic dimensions and the generated asset is static at runtime.
- Semantics, skip link, focus treatment and responsive composition were sound.

### What weakened the concept

- The first product proof was too close to a generic luxury catalogue.
- Global overflow clipping could hide defects.
- Mobile metadata fell below 10 px.
- Browser checks and active-motion evidence were initially incomplete.

### Required changes and resolution

- An eight-cell provenance matrix tied the product record back to Ottofile.
- Global overflow clipping was removed; Playwright verifies actual document width.
- Mobile UI text returned to the documented minimum.
- Local font input is compiled by Next into WOFF2 delivery assets.
- Production build, active-motion captures and a real Playwright suite were completed.

## Final review — Art Director

### Approved

- The cover reads as a registry frontispiece, not a landing page.
- Chapter 01 works without false photography: the data record acts as specimen plate.
- Product record, rail, matrix and controlled 01→07 jump passed the swap test.
- Motion language and reduced-motion parity follow the Bible.
- `Impronta Otto` is conceptually authentic and superior to the rejected cob generations.

### Final blocking issue

The first web derivative retained a visibly lighter 8:5 perimeter, reading as a centred image card rather than an imprint in the page. The Art Director issued `NO-GO PHASE 7` on this single point.

### Acceptance fix

`scripts/extract-impronta-relief.mjs` now performs a deterministic high-pass extraction:

- broad paper illumination is removed;
- approved groove geometry is unchanged;
- no generative edit is introduced;
- no artificial contrast boost is applied;
- output retains alpha and weighs 87,085 bytes.

The Art Director rechecked all three reduced-motion viewports and confirmed that the 8:5 perimeter is no longer traceable while all eight grooves remain legible.

## Gate decision

> `GO PHASE 7`

The prototype establishes the binding grammar for the full implementation. The eight-cell product matrix remains a rare device and must not be repeated as decoration. Each remaining chapter must introduce a distinct composition without degenerating into repeated `Scheda` templates.
