# Phase 3 — Art Direction Bible

**Project:** Il Giardino delle Esperidi — sito vetrina
**Concept:** **OTTO — Registro di una varietà superstite**
**Author:** Art Director
**Date:** 2026-07-26
**Status:** LOCKED

## 2026-07-26 amendment — signature background

The approved landing page remains unchanged. `Dalla dispersione al registro`, documented in `docs/signature-motion.md`, is a fixed decorative background beneath the Hero and chapters 01–02; it releases at the entrance of chapter 03 and is absent thereafter.

This is the only authorised exception to the following rules:

- it adds one unpinned ScrollTrigger that reads real section positions and adds no page height;
- perspective, differential parallax and oblique field lines are allowed inside its canvas only;
- filled `--chicco` kernels may appear outside the rail only in this background;
- partial `--chicco` opacity is allowed only at the locked `.28 / .22 / .18` responsive envelope;
- `mix-blend-mode: multiply` is limited to this decorative layer and its static equivalents;
- pointer depth is permitted only for fine pointers without reduced motion, within yaw ±0.35° and pitch ±0.20°;
- the final eight paper incisions freeze at `#otto-file top 76%`, fade to zero by `top top` and may not overlap the chapter’s eight-cell proof.

The layer is fixed, `aria-hidden`, outside `main`, `pointer-events: none` and beneath the paper texture and all content. Reduced-motion, Save-Data, no-JS and runtime failures use four absolute decorative placements made from the three approved AVIF exports; none adds height or semantic content.

No exception propagates into chapters 04–08. Red backgrounds, red gradients, glow, blur, random physics, video, cursor followers and additional pinned scenes remain forbidden. Chapter 08 remains the only field-level chromatic inversion and forces the signature to zero opacity.

---

## How to read this document

This document is the law of the project. The Frontend Lead implements directly from it. The Motion Designer specifies against it. The Content Strategist writes into it.

- Every number here is a decision, not a suggestion. If a number is absent, it has not been decided and must be escalated to me — it must **not** be invented.
- Where I write "defect", I mean the build is rejected at the Phase 6 or Phase 8 gate. Not "we'll fix it later".
- `[DA VERIFICARE]` marks any content claim not present in `src/content/facts.ts` or `docs/discovery.md`. It may not ship until verified.
- §19 (*How to detect dilution*) is the acceptance test. If you are unsure whether something is allowed, run the check in §19 rather than asking.

---

## 1. Selected concept

**The site is not an advertisement. It is a record.**

A seed-bank card. A herbarium sheet. A registry entry for an organism — *Mais Rosso Ottofile Integrale, varietà Albese* — that was nearly deleted from the world, kept open by the people who grow it. Il Giardino delle Esperidi are not celebrating tradition; they are the registrars, and the file is still open.

Every fact in `facts.ts` is registry data: variety, locality, morphology (eight rows), status (at risk of extinction), provenance (a royal decree), process (stone-milled). The brand's thin fact set is not a limitation to be padded — it is the entire content model. A registry is *supposed* to be terse.

**Register:** sober, exact, quietly monumental. Museum vitrine label, not farm shop. Evidence in place of adjectives.

**Warmth arrives exactly once.** Chapters 01–07 are immutable bone paper. Chapter 08 — *Custodia*, the Hesperides myth — inverts the entire page to night and gold. It is the only chromatic event on the site and it is spent on the brand's single best paragraph. Withholding warmth for seven chapters is what makes the eighth land.

### 1.1 The three locked invariants (carried from Phase 2 §Carried into Phase 3)

These are not open for revision by anyone, at any stage, for any reason.

> **INVARIANT 1 — The 8 system is arithmetic, not thematic.**
> Eight columns at every breakpoint. An 8px base unit. Eight chapters. Eight rail marks holding eight kernels each — 64 kernels, one pannocchia. 8:5 image crops. 160/320/640ms motion. **Non-multiples are defects.** Not "inconsistencies" — defects.

> **INVARIANT 2 — `--chicco` never fills anything.**
> Index only. Under 2% pixel coverage of any viewport. Never a background, never a button, never a gradient stop, never a tint, never at partial opacity. **The first violation kills the entire colour argument**, and with it the reason we are not a warm-yellow food site.

> **INVARIANT 3 — There is exactly one chromatic event.**
> Chapter 08 and its footer are the only dark field on the site. If a second dark section appears anywhere — a dark hero, a dark product band, a dark CTA strip — chapter 08 is dead and so is the concept. There is no "small dark accent section". There is one.

### 1.2 Cover and chapter structure

The hero is a non-numbered registry cover. The rail is present at `00/08`, but
no kernel fills while the cover is in view. The eight numbered chapters begin
at `#varieta`; the first kernel activates on entry and the 64th closes
`#custodia`. **The eight-chapter count is locked.**

| # | Working name | Carries |
|---|---|---|
| 01 | `LA VARIETÀ` | Subject, locality and specimen data. |
| 02 | `IL MAIS DEL RE` | The company-reported royal provenance. |
| 03 | `OTTO FILE` | The morphology, proven structurally rather than by generated photography. |
| 04 | `QUASI ESTINTO` | At risk; entered in the official conservation register in 2007. |
| 05 | `IL CAMPO` | The company-declared symbiotic method and internal supply chain. |
| 06 | `LA PIETRA` | Stone milling. |
| 07 | `TRE REFERENZE` | Maisette, Maissini and Farina di Mais Rosso. |
| 08 | `CUSTODIA` | The myth. Night. Gold. Footer and contacts sit inside this field. |

*Amaro del Dottore* and the polenta recipes are **not** chapters. They live in chapter 07 as subordinate registry entries or they do not appear at all. Discovery §5.6 records that recipes currently outrank products; they will not do so here.

---

## 2. Design principles

Seven principles. Each is stated as a rule that can be violated, so that it can be checked. Each has a detection method in §19.

**P1 — Nothing centres.**
No `text-align: center`. No element horizontally centred in the viewport. No `justify-content: center` on any container holding text. Everything hangs on a declared left axis. *Violation is visible in a grep.*

**P2 — Every measurement is a multiple of 8.**
Margins, paddings, gaps, line-heights, rule lengths, component dimensions, motion durations. The only exemptions are declared in §6.1 and there are four of them. *Violation is measurable in DevTools.*

**P3 — Column 8 is empty and stays empty.**
The reserved void is the discipline that makes the page read as a document rather than a layout. Only `--chicco` rule marks may enter it, and only in the two chapters listed in §5.5. *Violation is visible with a single overlay rect.*

**P4 — Colour is an instrument used once.**
Seven hex values ship. Chapters 01–07 are one background. Chapter 08 is the other. Nothing in between, nothing tinted, nothing alternating. *Violation is a count of distinct colours in the compiled CSS.*

**P5 — Type does not fade in.**
No element on this site animates `opacity` from 0 combined with `transform: translateY`. Text is revealed by a mask travelling along the baseline, or it is simply present. *Violation is visible in one scroll pass.*

**P6 — Evidence outranks adjective.**
Display type is reserved for verifiable facts and proper nouns. *Eccellenza, passione, autentico, genuino, unico* may not be set in Bodoni at any size. If they appear at all, they appear at body size and the Content Strategist has argued for each one. *Violation is a grep of rendered text.*

**P7 — Nothing has a fill, a radius, a blur or an icon.**
Zero `border-radius` other than 0. Zero `box-shadow` with blur > 0. Zero filled buttons. Zero cards. Zero SVG icons, icon fonts or emoji. The page is printed matter; printed matter has none of these. *Violation is a grep.*

---

## 3. Typography

Three faces, three voices, no fourth. **History** (Bodoni Moda) · **institution** (Archivo) · **evidence** (DM Mono).

### 3.1 The faces and why each is here

| Role | Family | Licence | Axes shipped |
|---|---|---|---|
| Display | **Bodoni Moda** | Google Fonts, SIL OFL 1.1 | variable `wght` 400–900, `opsz` 6–96; roman + italic |
| Text / UI / labels | **Archivo** | Google Fonts, SIL OFL 1.1 | variable `wght` 100–900, `wdth` 62.5–125; roman only |
| Data / meta / numerals | **DM Mono** | Google Fonts, SIL OFL 1.1 (Colophon) | static 300, 400; roman only |

**Bodoni Moda** — Bodoni was the printer to the court of Parma. The neoclassical didone *is* the typographic voice of a nineteenth-century Italian state document, which is what a royal decree on the sowing of maize actually was. The hairlines are not editorial prettiness; they are the reason we can set a heritage-agriculture site without it becoming a warm-serif food brand. At `opsz 96` the thin strokes read **engraved**.

**Archivo** — a grotesque drawn for signage and printed matter. The neutral, unemotional hand of the registrar. Its `wdth` axis is load-bearing, not decorative: registry labels are set at `wdth 125`, 10px, uppercase, `0.16em` tracking, producing a specimen-card label that no fixed-width grotesque can produce. If the `wdth` axis is not used, Archivo has no reason to be here and I will ask why it was chosen.

**DM Mono** — the catalogue number. Coordinates, weights, dates, the `08/08`, chapter numerals. Nothing else.

### 3.2 Font loading

- Self-hosted via `next/font/local` (or `next/font/google` with `display: 'swap'`). No external font requests at runtime.
- Subsets: `latin` + `latin-ext`. Italian requires à è é ì ò ù ù — covered by `latin`.
- Files shipped: Bodoni Moda variable roman, Bodoni Moda variable italic, Archivo variable roman, DM Mono 300, DM Mono 400. **Five files. Combined budget ≤ 250 KB.**
- Preloaded: Bodoni Moda variable roman, Archivo variable roman. Not preloaded: Bodoni italic, both DM Mono weights.
- `font-display: swap`. Fallback metrics adjusted (`size-adjust`, `ascent-override`) so CLS from swap is **0.00**.
- Exposed as CSS custom properties: `--font-display`, `--font-text`, `--font-data`.

### 3.3 Type scale — desktop (≥ 1280px)

All line-heights are stated in **px** and are multiples of 8, so successive blocks stay on the baseline grid. Font sizes are not required to be multiples of 8; line-heights are.

| Token | Face | Size | Line-height | `wght` | `wdth` | `opsz` | Tracking | Case |
|---|---|---|---|---|---|---|---|---|
| `--type-d0` | Bodoni | `9.2vw`, clamp `[96px, 208px]` | `0.88` (ratio — see §3.7) | 400 | — | 96 | `-0.015em` | UPPER |
| `--type-d1` | Bodoni | 96px | 88px | 400 | — | auto (96) | `-0.012em` | UPPER |
| `--type-d2` | Bodoni | 72px | 72px | 400 | — | auto (72) | `-0.010em` | UPPER |
| `--type-d3` | Bodoni | 48px | 56px | 500 | — | auto (48) | `-0.005em` | Sentence |
| `--type-d4` | Bodoni | 32px | 40px | 500 | — | auto (32) | `0` | Sentence |
| `--type-lead` | Archivo | 24px | 40px | 300 | 100 | — | `-0.005em` | Sentence |
| `--type-body` | Archivo | 18px | 32px | 400 | 100 | — | `0` | Sentence |
| `--type-small` | Archivo | 15px | 24px | 400 | 100 | — | `0.005em` | Sentence |
| `--type-label` | Archivo | 10px | 16px | 600 | **125** | — | `0.16em` | UPPER |
| `--type-label-lg` | Archivo | 12px | 16px | 500 | **125** | — | `0.14em` | UPPER |
| `--type-data` | DM Mono | 11px | 16px | 400 | — | — | `0.04em` | UPPER |
| `--type-data-lg` | DM Mono | 14px | 24px | 400 | — | — | `0.02em` | as written |
| `--type-num` | DM Mono | 32px | 40px | 300 | — | — | `-0.01em` | — |
| `--type-num-lg` | DM Mono | 64px | 64px | 300 | — | — | `-0.02em` | — |

### 3.4 Type scale — tablet (768–1279px)

Only display sizes change. `--type-lead`, `--type-body`, `--type-small`, `--type-label`, `--type-label-lg`, `--type-data`, `--type-data-lg` are **identical to desktop**. This is deliberate: labels and data are specimen-card artefacts and are the same physical size on every device.

| Token | Size | Line-height |
|---|---|---|
| `--type-d0` | `9.6vw` | `0.88` |
| `--type-d1` | 72px | 72px |
| `--type-d2` | 56px | 64px |
| `--type-d3` | 40px | 48px |
| `--type-d4` | 32px | 40px |
| `--type-num` | 32px | 40px |
| `--type-num-lg` | 56px | 56px |

### 3.5 Type scale — mobile (< 768px)

| Token | Size | Line-height | Notes |
|---|---|---|---|
| `--type-d0` | `9vw` | `0.88` | Tuned to keep the legal viewport clip band; see §7.3. |
| `--type-d1` | 48px | 48px | |
| `--type-d2` | 40px | 48px | |
| `--type-d3` | 32px | 40px | |
| `--type-d4` | 32px | 40px | Bodoni never falls below its 32px floor. |
| `--type-lead` | 20px | 32px | |
| `--type-body` | 16px | 24px | |
| `--type-small` | 14px | 24px | |
| `--type-label` | 10px | 16px | **unchanged** |
| `--type-label-lg` | 12px | 16px | **unchanged** |
| `--type-data` | 11px | 16px | **unchanged** |
| `--type-data-lg` | 14px | 24px | **unchanged** |
| `--type-num` | 24px | 32px | |
| `--type-num-lg` | 48px | 48px | |

### 3.6 Which face does what — exhaustively

| Element | Face | Token |
|---|---|---|
| Hero headline (`MAIS ROSSO / OTTOFILE INTEGRALE`) | Bodoni | `--type-d0` |
| Chapter titles | Bodoni | `--type-d2` (desktop) |
| Pull statements inside a chapter | Bodoni | `--type-d3` |
| Chapter-08 myth quotation | Bodoni **Italic** | `--type-d3`, `wght 500` |
| Product names (Maisette / Maissini / Farina di Mais Rosso) | Bodoni | `--type-d3` |
| **Company wordmark** | **Archivo**, `wdth 125`, `wght 500` | `--type-label-lg` |
| Lead paragraph | Archivo | `--type-lead` |
| Body copy | Archivo | `--type-body` |
| Captions, image credits | Archivo | `--type-small` |
| Registry labels (`VARIETÀ`, `LOCALITÀ`, `STATO`) | Archivo `wdth 125` | `--type-label` |
| Navigation / rail panel chapter name | Archivo `wdth 125` | `--type-label` |
| Links, interactive text | Archivo | `--type-body` |
| Registry values, formats (`120 g`, `500 g`) | DM Mono | `--type-data-lg` |
| Top-right meta strip | DM Mono | `--type-data` |
| Chapter numerals (`03`) | DM Mono | `--type-num` |
| The `08/08` / `64` counters | DM Mono | `--type-num-lg` |

**The wordmark is Archivo, not Bodoni.** This is an argument, not an oversight: the registrar's name is set by the registrar's hand. Bodoni is reserved for the *variety* — the thing being recorded. The company is the institution; the maize is the subject. Setting the company name in Bodoni would invert the entire premise.

### 3.7 Bodoni rules — where it is NOT allowed

Bodoni Moda is **forbidden** in all of the following. Each is independently a defect.

1. **At any computed `font-size` below 32px.** No exceptions. Bodoni's `opsz` axis reaches 6, and we never go there. The effective range on this site is 32–96.
2. **For any paragraph, caption, list item or run of continuous prose** longer than 3 lines. Bodoni sets statements, never text.
3. **For labels, navigation, buttons, links, form inputs, form labels, error messages, or any UI chrome.**
4. **For numerals, weights, dates, coordinates, counts or measurements.** DM Mono owns numerals absolutely. `08/08` is never Bodoni. `120 g` is never Bodoni.
5. **At `wght` ≥ 600.** The permitted weights are exactly 400 and 500. 400 at ≥ 72px; 500 at 32–71px, to compensate for optical thinning. Nothing else.
6. **On `--notte` below `wght 500`.** Hairlines disappear on dark grounds. On night, Bodoni's minimum weight is 500 at any size below 96px.
7. **With `font-optical-sizing` disabled.** `font-optical-sizing: auto` is the default and is correct. Manual `opsz` overrides are sanctioned in exactly one place: `--type-d0` in chapter 01, pinned to `opsz 96` so the hero hairlines stay engraved at every viewport.
8. **In the rail, in the hover panel, in the footer contact block, or in the cookie notice.**

`--type-d0`'s line-height is expressed as a unitless ratio (`0.88`) rather than px because the size is fluid. This is the **only** unitless line-height on the site and it is exempt from P2.

### 3.8 Italic policy

**Only Bodoni Moda has an italic. Archivo italic and DM Mono italic do not ship and may not be synthesised** (`font-synthesis: none` is set globally).

Bodoni italic is permitted in exactly three cases:

1. The **chapter-08 myth quotation** — the verbatim Hesperides passage. This is the one italic display block on the site.
2. **Vernacular Italian terms being defined on first use** — *pannocchia*, *agricoltura simbiotica*, *macinata a pietra*, *il mais del Re*. First occurrence only; subsequent occurrences are roman.
3. **Latin binomials**, should any appear.

Italic is **never** used for emphasis, never for a subheading, never for a caption, never for a product name, never in body copy for tone. Emphasis in body copy is achieved by moving the sentence, not by tilting it.

### 3.9 Measure and hyphenation

- Body measure target **58–66 characters**, hard maximum **68**. Enforced by `max-width: 592px` (74 × 8) on desktop and tablet.
- `hyphens: manual`. Automatic hyphenation is off — a registry does not break words.
- `hanging-punctuation: first last` where supported. Opening quotes, hyphens and bullets hang outside the measure.
- `text-wrap: pretty` on body; `text-wrap: balance` on `--type-d3` and `--type-d4` only. Never on `--type-d0`/`d1`/`d2` — those line-break by hand.
- Widows and orphans: single-word last lines in body copy are a defect. Fixed with a non-breaking space in the content layer, never with CSS.
- `font-variant-numeric: tabular-nums` on every DM Mono element. Registry values must align vertically.

---

## 4. Colour system

### 4.1 The tokens

**The site ships exactly seven hex values. An eighth is a defect.** Derived values must be `rgba()` or `color-mix()` of one of the seven, never a new hex.

```css
:root {
  /* — day field: chapters 01–07 — */
  --carta:         #E9E3D6;  /* unbleached laid paper — the base of 7 of 8 chapters */
  --inchiostro:    #16150F;  /* warm near-black ink — all primary text on day */
  --pietra-testo:  #625D4D;  /* secondary text on day only — see §4.3 */
  --pietra:        #8C8779;  /* rules, hairlines, disabled, non-text marks; secondary TEXT on night only */
  --chicco:        #B23A16;  /* the kernel's true red-orange — INDEX ONLY, ≤2% coverage */

  /* — night field: chapter 08 + footer — */
  --notte:         #0D0B08;  /* night */
  --esperide:      #D9A441;  /* Hesperides gold — on --notte only, nowhere else */
}
```

**The yellow decision, restated.** We do not use "corn yellow" — an abstraction of the crop, applied by convention (discovery §5.4). We use the *measured* colour of this specific kernel, `--chicco`, the way a scientific plate uses a colour chip: as index, never as decoration. Gold exists once, at night, because the company is named after *"le ninfe della sera e della luce dorata dei tramonti"*. Neither colour is a brand surface.

### 4.2 Semantic aliases

Components consume aliases, never raw tokens. The night inversion works by re-pointing the aliases on a single attribute — nothing else changes.

```css
:root,
[data-field="giorno"] {
  --campo:        var(--carta);       /* page field */
  --testo:        var(--inchiostro);  /* primary text */
  --testo-2:      var(--pietra-testo);/* secondary text */
  --rigo:         var(--pietra);      /* 1px structural rule */
  --rigo-forte:   var(--inchiostro);  /* 1px emphatic rule, max 2 per chapter */
  --indice:       var(--chicco);      /* index marks, active kernel row, focus ring */
}

[data-field="notte"] {
  --campo:        var(--notte);
  --testo:        var(--carta);
  --testo-2:      var(--pietra);
  --rigo:         rgba(233, 227, 214, 0.24);   /* --carta @ 24% */
  --rigo-forte:   var(--carta);
  --indice:       var(--esperide);
}
```

`data-field` is set on `<html>`. It has exactly two values. There is no third field.

### 4.3 Contrast ratios — computed, not estimated

| Foreground | Ground | Ratio | Verdict |
|---|---|---|---|
| `--inchiostro` #16150F | `--carta` #E9E3D6 | **14.31 : 1** | AAA at all sizes. Primary day text. |
| `--pietra-testo` #625D4D | `--carta` | **5.15 : 1** | AA at all sizes. Secondary day text, min 15px. |
| `--chicco` #B23A16 | `--carta` | **4.68 : 1** | AA normal text. Legal as text, subject to Invariant 2. |
| `--pietra` #8C8779 | `--carta` | **2.80 : 1** | **FAILS.** Non-text only on day. |
| `--carta` | `--notte` #0D0B08 | **15.37 : 1** | AAA. Primary night text. |
| `--esperide` #D9A441 | `--notte` | **8.74 : 1** | AAA. The myth quotation. |
| `--pietra` #8C8779 | `--notte` | **5.48 : 1** | AA at all sizes. Secondary night text. |
| `--pietra-testo` #625D4D | `--notte` | **2.99 : 1** | **FAILS.** Day only. |
| `--chicco` #B23A16 | `--notte` | **3.29 : 1** | Fails normal text. Irrelevant — `--chicco` does not exist at night. |

Two rules follow and both are load-bearing:

- **`--pietra` is never text on `--carta`.** It is rules, hairlines, disabled states and non-text marks. This is a Phase 3 amendment to the Phase 2 colour note, made for WCAG AA. `--pietra-testo` was added to carry secondary text on day.
- **`--pietra-testo` is never used on `--notte`,** and `--pietra` becomes the night secondary text colour. The two stone tones swap roles across the inversion. This is why the aliases in §4.2 exist.

Focus ring: `--indice` — 4.68:1 on day, 8.74:1 on night. Both clear the 3:1 non-text minimum comfortably.

`::selection` is `background: var(--testo); color: var(--campo);` on both fields. It is **not** `--chicco`. Selection is a browser fill, and Invariant 2 has no exception for browser fills — this is precisely where the rule leaks in practice.

### 4.4 Invariant 2 in practice — the `--chicco` budget

At the reference viewport **1440 × 900 = 1,296,000 px²**, the total `--chicco` pixel budget is **25,920 px² (2%)**. This budget counts *both* UI marks and saturated kernel pixels inside imagery, summed within any single viewport of scroll position.

#### Legal use

| Use | Area | % of viewport |
|---|---|---|
| The active chapter's 8 rail kernels (8 × 4×4px) | 128 px² | 0.010% |
| Chapter numeral `03` in DM Mono 32px, `--chicco` | ≈ 1,220 px² | 0.094% |
| Eight 2px × 143px index rules in the reserved void, chapter 03 | 2,288 px² | 0.177% |
| Focus ring: 1px outline, offset 4px, on a 592 × 32px link | 1,248 px² | 0.096% |
| Hover underline on **one** link at a time (592 × 1px) | 592 px² | 0.046% |
| A specimen image's real kernel chroma surviving the hue mask, where the kernel occupies ≤ 18% of a 592 × 370px 8:5 frame | ≈ 39,400 px² | **3.04% — OVER BUDGET** |

The last row is the case that actually breaks the rule in practice, and it is why the budget counts imagery. **Mitigation:** an image whose saturated kernel area exceeds **1.6% of the viewport (20,736 px²)** may not be placed in the same viewport as any `--chicco` UI mark, and the image must be scaled or re-cropped until it fits. In practice this means: on the chapter where a full-frame kernel macro appears, the rail's active row reverts to `--inchiostro`. The rail is subordinate to the budget; the budget is not subordinate to the rail.

#### Illegal use — each one a defect

1. `background-color: var(--chicco)` — anywhere, at any size, at any opacity.
2. `--chicco` as any gradient stop.
3. `--chicco` as the text colour of any paragraph, lead, caption or label.
4. A `--chicco` underline on every link. *(Arithmetically it fits — 8 links × 592 × 1px = 4,736 px² = 0.37%. It is still illegal, because it makes `--chicco` a **state colour** rather than an index. Invariant 2 is a semantic rule with an arithmetic floor, not the reverse.)*
5. A `--chicco` divider between every registry row. That is `--pietra`'s job.
6. All eight rail rows in `--chicco` simultaneously. Only the **active** chapter's row is `--chicco`; completed chapters are `--inchiostro`; pending are outlined `--pietra`.
7. `--chicco` at any opacity below 100%, or in any `color-mix()`. It is index or it is absent. There are no tints.
8. `--chicco` inside the night field. It does not exist there.
9. `--chicco` on the cookie notice, the 404 page, the privacy page, or any surface not enumerated in this document.

### 4.5 The one chromatic event

- Chapters 01–07 have **identical** backgrounds: `--carta`, flat, no tonal variation, no alternating bands, no section tinting, no gradient, no vignette. A "slightly darker section for rhythm" is a defect.
- Chapter 08 inverts to `--notte` and holds. The footer sits inside the same field. **The last thing on the site is dark.** There is no return to day.
- The inversion is triggered by the **64th kernel** filling. Not by scroll percentage, not by an IntersectionObserver on the section — by the count reaching 64. The count and the event are the same thing.
- Sequence and timing are specified in §12.6.

---

## 5. Grid

### 5.1 The system

**Eight columns at every breakpoint. The grid never becomes four. It never becomes twelve. It never becomes a flex row.**

This is not stubbornness — it is Invariant 1. The number eight is the concept; the moment the grid drops to four on mobile, the site is a layout with an eight theme rather than a document built out of eight, and the jury reads that in two seconds.

Implementation is `display: grid; grid-template-columns: repeat(8, 1fr); column-gap: var(--gutter);`. **Column widths are computed by `1fr` and are therefore exempt from P2.** Only gutters, margins, rail widths and spacing tokens must be multiples of 8. A reviewer who flags a 143px column has misread this document.

### 5.2 Breakpoints

Three, at exactly these values. No others.

| Name | Range | Design target |
|---|---|---|
| Mobile | `< 768px` | 390 × 844 |
| Tablet | `768px – 1279px` | 768 × 900 |
| Desktop | `≥ 1280px` | 1440 × 1000 |
| *(Cap)* | `≥ 1664px` | field stops growing — see §5.4 |

### 5.3 Geometry per breakpoint

The field begins immediately after the rail. **There is no right padding: column 8 *is* the right margin.**

| | Mobile (390) | Tablet (768) | Desktop (1440) |
|---|---|---|---|
| Rail width | **40px** | **48px** | **64px** |
| Left pad (rail → field) | 16px | 24px | 64px |
| Right pad | **0** | **0** | **0** |
| Field width | 334px | 696px | 1312px |
| Gutter | **8px** | **16px** | **24px** |
| Column width (computed) | 34.75px | 73px | 143px |
| Text axis | **column 1** | column 2 | column 2 |
| Body span | cols 1–7 | cols 2–6 | cols 2–5 |
| Body rendered width | 291px | 429px | 644px → capped 592px |
| Measure | ≈ 40 char | ≈ 50 char | ≈ 62 char |
| Facts span | full-width table, cols 1–7 | cols 2–7, below body | **cols 6–7**, beside body |
| **Reserved void** | **col 8 (34.75px)** | **col 8 (73px)** | **col 8 (143px)** |

**On mobile the text axis moves from column 2 to column 1.** Holding it at column 2 would cost 42px of a 390px screen for no structural gain. The display overhang (§7.2) then hangs left of column 1 into the 16px pad — which is exactly what that pad exists for.

### 5.4 Wide viewports

`field-width: min(100vw - (rail + left-pad), 1536px)`.

The cap engages at **1664px** viewport width. Above it, the field stops growing and **stays pinned to the left**, immediately after the rail. All surplus space accrues to the right, beyond column 8.

At 1920px: rail 64 + pad 64 + field 1536 = 1664, leaving **256px of surplus**. Total right void = column 8 (192px) + 256px = **448px**. The page becomes more asymmetric, not more centred. **The field is never centred in the viewport.** A `margin: 0 auto` on the field container is a defect.

Exception: `--type-d0` in the hero is measured against `100vw`, not against the capped field, because it must clip against the *viewport* edge (§7.3). It is the only element exempt from the cap.

### 5.5 Column roles

| Column | Contains |
|---|---|
| 1 | Display-type optical overhang. Chapter numerals (`--type-num-lg`), which may clip left behind the rail. **Body copy never starts in column 1** — except on mobile, where the axis moves here. |
| 2 | The text axis. Everything hangs here. |
| 2–5 (desktop) | Body copy, lead paragraphs, product entries. |
| 6–7 (desktop) | The persistent registry column: label (`--type-label`, Archivo `wdth 125`) over value (`--type-data-lg`, DM Mono), separated by a 1px `--rigo` rule. |
| 8 | **The reserved void. Empty on every chapter, at every breakpoint.** |

`--chicco` rule marks may enter column 8 in exactly two chapters: **03 (`OTTO FILE`)**, where eight 2px index rules mark the eight rows, and **05 (`ESTINZIONE`)**, where a single 2px rule marks the status. Nowhere else, ever. No text, no image, no border, no background may occupy column 8 at any breakpoint.

### 5.6 The left rail — exact geometry

The rail is `position: fixed; left: 0; top: 0; height: 100vh; z-index: 100;` and is present at **every** scroll position on **every** breakpoint, including mobile. It has no background — the field shows through. It is separated from the field by a 1px `--rigo` line at its right edge, full viewport height.

The navigation block inside it is an **8 × 8 matrix of kernels — 64 kernels, one pannocchia.**

| | Mobile | Tablet | Desktop |
|---|---|---|---|
| Rail width | 40px | 48px | 64px |
| Kernel size | 2 × 2px | 3 × 3px | **4 × 4px** |
| Horizontal pitch (cell) | 4px | 6px | **8px** |
| Row width (8 cells) | 32px | 48px | **64px** |
| Row band height (hit target) | 40px | 40px | **40px** |
| Nav block | 40 × 320px | 48 × 320px | **64 × 320px** |
| Block position | fixed, vertically centred: `top: 50vh; transform: translateY(-160px)` | same | same |

On desktop the nav block is exactly **64px wide** and each kernel sits centred in an **8px cell** — the rail is literally the 8px unit multiplied by eight in both axes. Kernel left edges fall at x = 2, 10, 18, 26, 34, 42, 50, 58.

The 40px row band gives each chapter a **64 × 40px hit target** — above the 40px accessibility minimum — while the kernels themselves stay 4px. The kernel row is optically centred in its band (top offset 18px); **this optical centring is exempt from P2**, as is the 4px kernel size (see §6.1).

Vertical centring of the rail is permitted because **the rail is chrome, not composition.** P1 governs content on the horizontal axis. This is the only vertically centred element on the site.

#### Kernel states

| State | Day | Night (ch 08) |
|---|---|---|
| Pending | 1px `--pietra` outline, no fill | 1px `rgba(233,227,214,0.24)` outline |
| Filled (chapter completed) | solid `--inchiostro` | solid `--esperide` |
| Active chapter's filled kernels | solid `--chicco` | solid `--esperide` |

Fill logic: kernel *n* of chapter *c* fills when scroll progress within chapter *c* passes *n*/8. Chapter progress runs from the chapter's top edge meeting the viewport top to its bottom edge meeting the viewport bottom. **It is fully reversible** — scrolling up unfills.

#### Hover panel (desktop only, `@media (hover: hover) and (pointer: fine)`)

- Expands rightward from the hovered row: **384 × 64px** (48 × 8 and 8 × 8), `--carta` ground, 1px `--pietra` border, `border-radius: 0`, no shadow, `z-index: 110`.
- Contents, left to right on a 16px inner pad: chapter number in DM Mono 11px `--pietra-testo`, a 1px `--pietra` vertical rule, chapter name in Archivo `wdth 125` 10px `0.16em` caps, chapter fact in Archivo 15px.
  Example: `03 │ OTTO FILE │ esattamente otto file di chicchi tondi`
- Reveal: `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, **320ms**, register curve. Dismiss: **320ms**, exit curve.
- **It animates `clip-path`, not `width`.** Animating `width` is a defect (§12.7).
- The panel does not exist on tablet or mobile.

#### Keyboard

The rail is a `<nav aria-label="Capitoli">` containing an ordered list of eight anchors. Tab order runs 01→08. Focus-visible: 1px `--indice` outline, 4px offset, zero radius, applied to the 64 × 40px band. The hover panel opens on focus exactly as on hover.

---

## 6. Spacing

### 6.1 The scale

The base unit is **8px**. Large steps follow Fibonacci multiples of the unit, so the rhythm **accelerates** rather than stepping evenly — the page opens up as it descends into a chapter and snaps shut between chapters.

```css
:root {
  --space-0:   0;
  --space-1:   8px;    /*  1 × 8  */
  --space-2:   16px;   /*  2 × 8  */
  --space-3:   24px;   /*  3 × 8  */
  --space-5:   40px;   /*  5 × 8  */
  --space-8:   64px;   /*  8 × 8  */
  --space-13:  104px;  /* 13 × 8  */
  --space-21:  168px;  /* 21 × 8  */
  --space-34:  272px;  /* 34 × 8  */
}
```

Tokens are named by Fibonacci index, so the rule is legible from the name. **There is no 32px, no 48px, no 80px and no 128px in the layout scale.** Their absence is what makes the rhythm audible.

**Rule of application:**
- **Layout spacing** — margins between blocks, section padding, gaps between grid children, distance between a heading and its body — must come from the token set. A raw `32px` margin between two blocks is a defect.
- **Component-internal spacing** — padding inside the rail panel, inset of a registry row — may be any multiple of 8 not in the token set, provided it is a multiple of 8.

**Exemptions from P2 — there are exactly four, and no fifth may be added:**

1. **4px** — kernel size and the mobile kernel pitch. The kernel is half the unit because a kernel is not a layout object.
2. **0.5px** — hairline rules at ≥ 2dppx (§10.2).
3. **Optical offsets** in `em` on display type (§7.2), which are per-glyph and sub-pixel by nature.
4. **`1fr` column widths** and the optical centring of the kernel row in its 40px band (18px).

### 6.2 Applied rhythm

| Relationship | Desktop | Tablet | Mobile |
|---|---|---|---|
| Chapter top padding | `--space-21` (168) | `--space-13` (104) | `--space-8` (64) |
| Chapter bottom padding | `--space-21` (168) | `--space-13` (104) | `--space-8` (64) |
| Chapter number → chapter title | `--space-3` (24) | 24 | 16 |
| Chapter title → lead | `--space-5` (40) | 40 | 24 |
| Lead → body | `--space-5` (40) | 40 | 24 |
| Between body paragraphs | `--space-3` (24) | 24 | 24 |
| Body → image | `--space-8` (64) | 64 | 40 |
| Image → caption | `--space-2` (16) | 16 | 16 |
| Between registry rows | `--space-2` (16) + 1px rule | 16 | 16 |
| Registry label → value | `--space-1` (8) | 8 | 8 |
| Wordmark from viewport top | `--space-5` (40) | 40 | 24 |
| Footer block separation | `--space-13` (104) | 104 | 64 |

### 6.3 Baseline grid

Everything sits on an **8px vertical baseline grid.** All line-heights (§3.3–3.5) are multiples of 8, so successive text blocks stay on grid automatically. Where an element breaks the grid — an image whose intrinsic height is not a multiple of 8 — it is corrected with a compensating margin from the token set, never with a fractional value.

Verification: `background-image: repeating-linear-gradient(to bottom, rgba(178,58,22,0.18) 0 1px, transparent 1px 8px)` toggled on `<body>` during QA. Every baseline must land on a line.

---

## 7. Composition

### 7.1 Alignment logic

- **One hard left axis per breakpoint**: the start of column 2 (desktop, tablet) or column 1 (mobile). Body copy, labels, registry entries, captions and product entries all hang on it.
- **`text-align: center` appears zero times.** `text-align: right` appears in exactly two places: the DM Mono values in the registry column (desktop, right-aligned to the column-7 edge) and the top-right meta strip in chapter 01.
- **No element is horizontally centred in the viewport.** No `margin-inline: auto`. No `place-items: center`. The only centring on the site is the kernel row inside the rail (§5.6) and the rail block's vertical position.
- Vertically, blocks are top-aligned within their grid row. `align-items: center` on a grid row containing text is a defect.

### 7.2 Optical alignment

**This is where implementations dilute the concept most reliably, and §19.13 exists to catch it.**

Bodoni caps set at 72–208px carry meaningful left sidebearing. If the display line's *bounding box* is aligned to the text axis, the display type will sit 4–8px right of the body copy below it and the page will look mechanically aligned rather than typeset. **The stems must align, not the boxes.**

Implementation: each display heading carries a hand-set `--optical-offset` custom property applied as `margin-left: var(--optical-offset)`. Default `-0.04em`. Starting values by initial glyph:

| Initial glyph | Offset |
|---|---|
| `M`, `N`, `H`, `I`, `E`, `F`, `L`, `B`, `P`, `R`, `D` | `-0.030em` |
| `T`, `Z` | `-0.020em` |
| `O`, `C`, `G`, `Q`, `S` | `-0.045em` |
| `A`, `V`, `W`, `Y` | `-0.055em` |
| `J` | `-0.015em` |

These are starting values. The Frontend Lead verifies by screenshot: **the leftmost inked pixel of the display line and the leftmost inked pixel of the first body line must agree within 1px.**

Punctuation hangs (`hanging-punctuation: first last`). Where unsupported, opening quotation marks in the myth quotation are hung manually with a negative `text-indent` of `-0.42em`.

### 7.3 The hero clip — "clipped by the right edge"

The hero headline is set on **two lines**, `white-space: nowrap` on line 2:

```
MAIS ROSSO
OTTOFILE INTEGRALE
```

Line 2 overflows the right **viewport** edge. This is the concept made physical: *the variety barely fits in the world.*

**The spec is the clip band, not the font size.** The font size is an implementation detail tuned per breakpoint until the band is met.

- **Legal clip: between 4% and 16% of line 2's total advance width falls outside the viewport.** Below 4% it reads as a rendering accident. Above 16% it becomes illegible and reads as a bug.
- **At least the first three glyphs of the final word must remain visible.** `INTEGRALE` must never be reduced to `I`.
- Implemented values: `9vw` mobile, `9.6vw` tablet, `9.2vw` desktop, `9.8vw` from 1664px. These were measured at all five QA widths; the percentages are recorded in `docs/final-qa.md`.
- Implementation: `overflow-x: clip` on the hero `<section>`. **Never `overflow: hidden` on `<body>` or `<html>`. Never a horizontal scrollbar.** `document.documentElement.scrollWidth` must equal `clientWidth` at every viewport (§19.18).
- Line 1 (`MAIS ROSSO`) does **not** clip. Only one line is cut.
- The clip survives on mobile. It is the concept, not a desktop flourish.

### 7.4 Where clipping is legal elsewhere

Clipping is a signature gesture and signatures are devalued by repetition. It is legal in exactly three further cases:

1. **Specimen images bleeding off the right viewport edge** — permitted in chapters 02, 05 and 07 only, **at most one image per chapter**, with **no more than 20% of the image width off-screen**. Desktop and tablet only; on mobile these images sit inside the field (§13.7).
2. **Chapter numerals** (`--type-num-lg`, DM Mono 64px) hanging off the **left** edge, clipped by the rail. Maximum **40%** of the numeral's width obscured. This reads as a page edge, which is correct for a document.
3. **The chapter-08 myth quotation** may clip at the right by **0–8%**. This is optional and requires my sign-off before it ships.

Clipping is **never** legal: at the bottom of the viewport for text; on any product name, format, weight or price; on the wordmark; on any registry value; on any navigation element; or to conceal an overflow bug.

### 7.5 Asymmetry

- The reserved void (column 8) is the primary asymmetry generator and it is structural, not stylistic. It is present at every breakpoint. See P3 and §19.10.
- The rail sits hard left; the field's surplus accrues hard right (§5.4). The page has weight on the left and air on the right, always.
- Content **never** alternates left/right between sections. There is no zig-zag. A registry does not zig-zag.
- Vertical position within a chapter varies: the registry column (cols 6–7) may begin at any multiple of 8 below the chapter title, and should not begin at the same offset in two consecutive chapters. This is the only permitted "rhythm" variation.

### 7.6 Chapter 01 — the hero, fixed composition

The first three seconds. Full `--carta` field. No image background, no video, no centred stack, **no button, no scroll hint, no tagline**.

| Position | Content | Type |
|---|---|---|
| Top-left, column 2, 40px from top | `IL GIARDINO DELLE ESPERIDI` | Archivo `wdth 125`, `--type-label-lg` |
| Top-right, right-aligned to column 7 edge, 40px from top | `VARIETÀ ALBESE · CHERASCO (CN) · SCHEDA 08/08` | DM Mono, `--type-data` |
| Bottom-left, hanging on the text axis, 104px from bottom | `MAIS ROSSO` / `OTTOFILE INTEGRALE` (line 2 clipped) | Bodoni, `--type-d0`, `opsz 96` |
| Centre-right, columns 5–7 | One specimen image: a single pannocchia, cross-sectioned, showing exactly eight rows, on paper, one hard shadow. 8:5. | — |
| Left rail | Eight marks. Row 01's kernels filling. | — |
| Column 8 | Empty. | — |

**[DA VERIFICARE]** — Phase 2 proposed geographic coordinates (`44°38′N 7°51′E`) in the meta strip. Coordinates are **not** in `facts.ts` and are not verified by discovery. They may not ship until the Content Strategist verifies them against a citable source. Until then the meta strip runs without them, as written above.

---

## 8. Image cropping

**Two ratios exist on this site.** A third is a defect.

| Ratio | Value | Master delivery | Use |
|---|---|---|---|
| **8:5** | 1.600 | 2560 × 1600 | Every landscape asset. The default. |
| **1:1** | 1.000 | 1600 × 1600 | Detail plates: kernels, flour, grain, husk, silk. Desktop and tablet only. |

**Portrait is forbidden**, with exactly one exception: the chapter-07 flour-fall video loop, which is **5:8 (0.625)** — the site's single vertical asset, and the site's single video (§12.8). One vertical moment, once.

Rules of the crop:

1. **The subject occupies ≤ 38% of the frame's area.** Museum object, not hero shot.
2. **The subject's centroid sits on an eighth-line** — x = 1/8, 3/8, 5/8 or 7/8 of the frame width. **Never at 4/8.** Nothing is centred, including inside the photograph.
3. **Minimum void: at least 24% of the frame width separates the subject's bounding box from the nearest frame edge on at least two sides.**
4. Frames are **never** cropped further in CSS to a new ratio. `object-fit: cover` with a non-native aspect box is a defect — the master is delivered at the ratio it is displayed at.
5. On mobile, **1:1 assets are dropped entirely.** Only 8:5 survives (§13.6).
6. No borders, no frames, no keylines, no `border-radius`, no CSS shadow. The image's own baked shadow (§9.4) does all the mounting work, and because the photographic ground *is* `--carta`, the image has no visible edge on three sides.

---

## 9. Photographic direction

**Specimen plate, not food photography.** This section doubles as generation guidance for Higgsfield and as the rejection checklist at the asset gate.

### 9.1 Camera

- **Exactly two camera attitudes exist on the site**: perpendicular plan view (0° from vertical), and **22.5° from vertical** — deliberately half of 45°, because 45° is the stock product-photography angle and this is not product photography.
- Lens character: **90–100mm macro equivalent, f/8.** Full depth of field. **Everything in the frame is in focus.**
- **Bokeh is forbidden. Shallow depth of field is forbidden. Focus falloff is forbidden.** This is a scan, not a photograph. Blur is the single fastest way to make this look like every other food site.
- No lens distortion, no vignette, no tilt, no Dutch angle, no handheld feel.

### 9.2 Light

- **Exactly one source.** No fill, no bounce, no reflector, no rim, no kicker, no background light, no practical.
- **Elevation 70°. Azimuth 135°** — the light comes from upper-left and travels down-right.
- Apparent source size ≈ **8°** — small and hard. A bare instrument, not a softbox.
- **Colour temperature 5600K, neutral, CRI-accurate. No warm cast.** This is daylight through north glass. **Golden-hour light is forbidden in chapters 01–07** — we gave up VESPERO precisely so that gold means something in chapter 08.
- Chapter 08 imagery, if any: **2700K**, `--esperide` as the only highlight, and **at most one image in the entire chapter.** If it is not exceptional, chapter 08 runs on typography alone, which is stronger.

### 9.3 Ground

- The photographic ground **is** `--carta` #E9E3D6 — a physical uncoated 120gsm laid paper. Chain lines visible at grazing angle. The image and the page share a substrate, so images have no visible edge.
- Paper fills the frame edge to edge. No table, no surface behind, no environment, no depth cue other than the shadow.
- No gradient across the ground. No vignette. Even illumination corner to corner within 4%.

### 9.4 Shadow

One shadow. Stated precisely, because "hard shadow" is not a specification:

- **Direction:** down-right, **45° in plan** (the projection of a 70°/135° source).
- **Length:** 0.35 × the object's height above the ground.
- **Penumbra:** ≤ 3px at 2560px master width. Effectively a cut edge.
- **Density:** core at **62% opacity of `--inchiostro`** over `--carta`, falling linearly to 0% across the final 18% of its length.
- **No contact-shadow halo. No ambient occlusion glow. No second shadow. No reflected bounce in the shadow.**
- More than one shadow in a frame is an automatic rejection.

### 9.5 Grade

Applied identically to every asset, so mixed provenance becomes invisible — this is the direct fix for discovery §4's *"inconsistent lighting, colour and crop, no treatment system"*.

1. **Black point lifted to 6% IRE** — RGB floor 15,15,15. **Never 0.** A scan has no true black.
2. **White ceiling 94%** — RGB 240. **Never clipped.**
3. **Contrast curve: linear.** No S-curve, no film emulation, no LUT, no "cinematic" grade.
4. **Global saturation 35%**, with a hue mask on **0–25°** (the kernel red-orange) held at **100%**. The kernel is the only saturated thing on the site.
5. **Grain: monochrome, 8% opacity, ~1.4px grain size at 2560px width.** The same grain plate on every asset, applied after grade.
6. Output: AVIF primary + WebP fallback, `quality 82`, via `next/image` with explicit dimensions and correct `sizes`.

### 9.6 What is NEVER photographed

Each entry is an automatic rejection at the asset gate.

- **People.** Faces, bodies, silhouettes, and **any body part including hands.** Not one hand. Not a hand out of focus. Not a hand at the frame edge.
- **Packaging** of any kind — real, invented, blank, mocked, or implied. No boxes, bags, tubes, labels, seals or bands.
- **Any text, glyph, label, sticker, stamp, print, watermark or writing inside the frame.** Not a single character.
- **Plated or styled food.** No dishes, no polenta on a plate, no arranged gallette.
- **Props:** cutlery, crockery, boards, baskets, cloths, napkins, jars, bottles, sacks, twine, string.
- **Materials:** wood, burlap, hessian, linen, jute, slate, chalkboard, terracotta, marble, concrete, rustic tabletops of any kind.
- **Landscape:** fields, rows of plants, sky, horizon, sun, sunbeams, sunlight through leaves, soil in situ, farm buildings, machinery.
- **Atmosphere:** water droplets, condensation, steam, smoke, dust in air, flour clouds in air *(except the one sanctioned video loop)*.
- **Anything wet, glossy, oiled, or with specular highlights.**
- **Motion blur** of any kind.
- **Multiple objects of the same type arranged decoratively** — a row of three cobs, a fan of gallette, a scatter styled into a shape.
- **Any bilaterally symmetric composition.** Symmetry is the signature of stock.

### 9.7 The required asset set

Ten stills, one loop. Each 8:5 unless marked.

| # | Asset | Ratio | Chapter |
|---|---|---|---|
| 1 | Whole pannocchia, husk removed, plan view | 8:5 | 01 or 03 |
| 2 | **Cross-section showing exactly eight rows** | 8:5 | 01 (hero), 03 |
| 3 | Loose kernels, scattered, ≤ 12 kernels | 1:1 | 03 |
| 4 | Stone-ground flour, low pile, 22.5° | 8:5 | 07 |
| 5 | A broken gallette, single fragment | 1:1 | 07 |
| 6 | Grissini fragments, ≤ 3 pieces | 8:5 | 07 |
| 7 | Dried husk, single leaf | 1:1 | 05 |
| 8 | Corn silk, single strand cluster | 1:1 | 05 or 06 |
| 9 | Millstone fragment, plan view | 8:5 | 07 |
| 10 | The bone paper substrate itself (texture plate) | 8:5 | grain source |
| 11 | Flour falling — video loop | **5:8** | 07 |

### 9.8 Rejection triggers — automatic, no discussion

- **Kernel count ≠ 8** in any cross-section. This is the concept; a nine-row cross-section is a lie on the page.
- Waxy, over-smooth or plastic kernel surfaces.
- Impossible specular highlights.
- Mushy, repeating or tiling kernel/grain geometry.
- Any glyph, mark or text in frame.
- More than one shadow, or a shadow whose direction contradicts the 135° azimuth.
- Saturation present outside the 0–25° hue mask.
- HDR flatness — shadows that are lifted *and* highlights that are compressed.
- Any item from §9.6.
- Lighting that does not match the rest of the set.

A weak asset is never forced into the layout. **The layout changes, the asset is regenerated, or typography carries the moment instead.**

---

## 10. Texture and material language

Uncoated 120gsm laid paper, letterpress bite, no gloss anywhere. Three technical layers and no fourth.

### 10.1 Paper grain

- **Implementation:** an inline SVG `feTurbulence` encoded as a `data:` URI, used as `background-image`. No network request. **Budget ≤ 4 KB.**
  ```
  <filter id="g">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="8" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  ```
  `seed="8"` is not arbitrary.
- **Applied as:** a `::after` on `<body>`, `position: fixed; inset: 0; pointer-events: none; z-index: 90;`
- **Day:** `mix-blend-mode: multiply; opacity: 0.045;`
- **Night:** `mix-blend-mode: screen; opacity: 0.030;`
- **Mobile:** `opacity: 0.035` (day) — low-DPI rendering exaggerates noise.
- **Never animated. Never scrolls.** It is fixed, because paper does not move relative to the ink on it.

### 10.2 Chain lines (laid paper)

The moment the 8px unit becomes literally visible in the substrate.

- **Vertical chain lines:** 1px `--inchiostro` at **1.5% opacity**, pitch **24px**.
- **Horizontal laid wires:** 1px `--inchiostro` at **1.0% opacity**, pitch **8px**.
- Implemented as two `repeating-linear-gradient` declarations on the same fixed `::after`. **These are the only two gradients permitted on the entire site** (§18.5).
- **Day only.** Chain lines are removed at the inversion in 0ms — they are paper, and there is no paper at night.

### 10.3 Letterpress bite

Display type only, at `font-size` ≥ 48px only.

```css
text-shadow:
   0.5px 0 0 rgba(22, 21, 15, 0.55),
  -0.5px 0 0 rgba(22, 21, 15, 0.55);
```

- **No Y offset. No blur. No colour other than `--inchiostro`.** This thickens the stem edge by a half pixel and reads as ink spread into fibre.
- **Night: no bite.** `text-shadow: none`. Night type is *emitted*, not printed. This is the material argument for why the inversion feels like a different world rather than a colour swap.
- **Disabled below 768px** — 0.5px shadows on small type muddy low-DPI rendering.
- `filter: drop-shadow()` is forbidden site-wide. `box-shadow` on type is forbidden site-wide.

### 10.4 Shadows generally

**Zero `box-shadow` declarations with a blur radius > 0 exist in the entire stylesheet.** `box-shadow` with blur 0 is permitted for 1px inset keylines only. The only shadow on the site is the one baked into each photographic asset (§9.4), which is image data, not CSS.

### 10.5 References

Karl Blossfeldt's botanical plates. Seed-bank record cards. Kew herbarium sheets. Fondazione Prada catalogues. Muji product cards. Swiss pharmaceutical packaging inserts. Nineteenth-century Italian state gazettes.

**Nothing rustic. No wood, no burlap, no chalkboard, no hand-lettering, no farmhouse, no "artisanal" texture.**

---

## 11. Shape language

### 11.1 Corners

**`border-radius: 0` everywhere. Zero exceptions.** Not on images, not on inputs, not on the rail, not on the hover panel, not on focus rings, not on the cookie notice, not on the video element. A single non-zero radius anywhere on the site is a defect (§19.7).

### 11.2 Rules and strokes

**Exactly three rule weights exist.** A fourth is a defect.

| Weight | Colour | Use | Limit |
|---|---|---|---|
| 1px | `--rigo` (`--pietra` / `rgba(carta,.24)`) | Structural dividers, registry row separators, the rail's right edge, column separators | unlimited |
| 1px | `--rigo-forte` (`--inchiostro` / `--carta`) | Emphatic division — the top of a chapter, the head of the registry column | **max 2 per chapter** |
| 2px | `--indice` (`--chicco` / `--esperide`) | Index marks | **chapters 03 and 05 only**, subject to §4.4 |

- Hairlines are true **1px at 1dppx and 0.5px at ≥ 2dppx**, via `@media (min-resolution: 2dppx)`. Never `border-width: thin`. Never scaled with the layout.
- **Rule lengths are always a multiple of 8, or exactly one full column/field span.** A 137px rule is a defect.
- Rules are always horizontal or vertical. **No diagonals anywhere on the site.**

### 11.3 Marks

- **The kernel** — a 4 × 4px square (3 × 3 tablet, 2 × 2 mobile). The site's only repeated mark. It appears in the rail and nowhere else.
- **The registration mark** — a 16 × 16px cross of 1px `--esperide` strokes with a 4px centre gap. It appears **exactly four times on the entire site**, at the four corners of the chapter-08 field, and nowhere else. It is a printer's mark and it earns its place by being rare.
- No other marks, bullets, dingbats, dividers, ornaments or glyph decorations exist. List items use a 1px `--rigo` rule, not a bullet.

### 11.4 Icons

**The site ships zero icons.** No SVG icon set, no icon font, no emoji, no glyph substitutes.

- No arrows, chevrons, carets, hamburgers, close crosses, play triangles, external-link marks, download marks, chat bubbles, pins or magnifiers.
- Social links are **text**: `INSTAGRAM` and `FACEBOOK` in Archivo `wdth 125`, `--type-label`, `0.16em`.
- The video has no play button (it autoplays or it is a still — §12.8).
- Menu on mobile: there is no menu. The rail *is* the navigation, at every breakpoint.

### 11.5 Interactive elements

- **There are no filled buttons.** There are no buttons at all in the visual sense.
- Interactive text: `--testo`, with a 1px `--rigo` underline at `text-underline-offset: 8px`, `text-decoration-thickness: 1px`. On hover/focus the underline becomes 1px `--indice` over **160ms**. Nothing moves, nothing scales, nothing lifts.
- `:focus-visible`: 1px `--indice` outline, `outline-offset: 4px`, `border-radius: 0`. Applied to every focusable element without exception. The focus ring is designed, not default.
- **No cards.** **No element on the site has a `background-color` different from its parent's**, with exactly two exceptions: the rail hover panel (`--carta`, so it can sit over an image) and the chapter-08 field (`--notte`). A third is a defect (§19.9).
- Form fields, if any ship: 1px `--rigo` bottom border only. No box, no fill, no radius, no shadow.

---

## 12. Motion rules

I set the boundaries here. **The Motion Designer owns the choreography inside them.** Anything not permitted below is not available to be choreographed.

### 12.1 Duration vocabulary

**Exactly four durations exist: 0ms, 160ms, 320ms, 640ms.** All are multiples of 8 × 20. A duration of 200ms, 250ms, 300ms, 400ms or 500ms is a defect (§19.5).

| Duration | Use |
|---|---|
| **0ms** | Reduced-motion state changes. Chain-line removal at inversion. Discrete kernel flips. |
| **160ms** | Hover in, focus, kernel fill, rule colour change, underline colour change. |
| **320ms** | Element register (mask reveal), rail panel expand/dismiss, image mount, hover out. |
| **640ms** | Chapter-08 inversion. Nothing else uses 640ms. |

Hover in **160ms**, hover out **320ms** — fast in, slightly slower out.

### 12.2 Easing

**Exactly three curves plus `linear`.** A fourth curve is a defect.

```css
--ease-registro:   cubic-bezier(0.20, 0.80, 0.20, 1.00);  /* default: things register */
--ease-uscita:     cubic-bezier(0.60, 0.00, 0.80, 0.20);  /* exit only */
--ease-inversione: cubic-bezier(0.83, 0.00, 0.17, 1.00);  /* chapter 08 only */
```

- **`--ease-registro`** is the default for everything. Short, slightly abrupt — a card being seated in a drawer. Nothing eases in decoratively; things *register*.
- **`--ease-uscita`** is used only for elements leaving: the rail hover panel dismissing. Nothing else.
- **`--ease-inversione`** is used exactly once, on the night inversion. A hard ease-in-out: the world *changes state*, it does not glide.
- **`linear`** is permitted **only** for scroll-linked properties, where the driver is scroll position and not time.

**No spring. No overshoot. No bounce. No elastic. No `back` easing. Any `cubic-bezier` with a y-value outside `[0, 1]` is a defect** (§19.6).

### 12.3 Stagger

- Stagger step: **40ms** (5 × 8). No other stagger value.
- **Maximum 8 items in a chain** — 280ms total tail. A ninth staggered item is a defect, and it is also thematically wrong.

### 12.4 Scroll-linked vs triggered

**Scroll-linked (position-driven, reversible, `linear`, no duration):**

- **The rail kernel fill. This is the only continuous scroll-linked motion on the site.**
- Nothing else. Full stop.

**Triggered once (time-driven, fires on entry, never re-fires on scroll-back):**

- Text mask reveal, at **24% viewport entry**.
- Image mount, at **24% viewport entry**.
- The chapter-08 inversion, at the 64th kernel.

**Forbidden entirely:**

- **Parallax.** On anything. Images, text, backgrounds, the rail. Depth is not part of this story — a document is flat.
- `scroll-snap-type` of any value.
- Scroll hijacking, scroll-jacked "slides", momentum overrides beyond Lenis's declared config.
- Anything animating purely because it entered the viewport and could.

### 12.5 Text reveal

**Fade-up is forbidden.** `transform: translateY` on any text element is a defect. This is the single clearest tell of a template and it is the gesture the concept was built to avoid.

Text is revealed by a **mask travelling along the baseline grid**:

```
clip-path: inset(0 0 100% 0)  →  inset(0 0 0 0)
```

- Per line. **320ms.** `--ease-registro`. **40ms** stagger, max 8 lines.
- `opacity` stays at **1** throughout. The text does not fade; it is uncovered.
- The mask travels downward, so a line is revealed from its cap-height to its baseline — the direction a letterpress platen would lift.
- Body paragraphs reveal as a single block, not per line. Only display type reveals per line.

### 12.6 Chapter 08 — the inversion

The one moment the site is remembered for. Its sequence is fixed here; the Motion Designer may refine within it but may not restructure it.

| t | Event | Duration | Easing |
|---|---|---|---|
| 0ms | **The rail turns gold.** Filled kernels `--inchiostro` → `--esperide`. For 160ms the rail is the only changed thing on a bone-paper page. | 160ms | `--ease-registro` |
| 160ms | `data-field` flips to `notte`. `--campo`, `--testo`, `--testo-2`, `--rigo`, `--indice` all transition. **Only `background-color` and `color` transition. Nothing moves. Nothing fades. Nothing scales.** | 640ms | `--ease-inversione` |
| 160ms | Chain lines removed. | **0ms** | — |
| 160ms | Grain plate switches `multiply` → `screen`, 0.045 → 0.030. | 640ms | `--ease-inversione` |
| 160ms | Letterpress bite removed from all display type. | 0ms | — |
| 800ms | The four registration marks appear at the field corners, `--esperide`, 1px. | 320ms | `--ease-registro` |

- **Trigger:** the 64th kernel filling. Not a scroll percentage, not an IntersectionObserver ratio. The count *is* the event.
- **The pin:** chapter 08 is the **only** pinned section on the site, pinned for **100vh of scroll**, no more.
- **Reversibility:** scrolling back up reverses the inversion on the same timings, in reverse order. The rail turns back last.
- The myth quotation is set in Bodoni **Italic**, `wght 500`, `--type-d3` (48/56), `--esperide`, `max-width: 592px`, columns 2–5. It is the only italic display block and the only paragraph ever set in `--esperide`.
- The footer sits inside the same night field. `--carta` text, `--pietra` labels. **No return to day.**

### 12.7 Hard limits

- **Pinned sections: maximum 1.** It is chapter 08. A second pin is a defect.
- **Scroll-linked continuous animations: maximum 1.** It is the rail fill.
- **Videos: maximum 1** (§12.8).
- **Animatable properties: `transform`, `opacity`, `clip-path`, and the CSS custom properties driving `color`/`background-color` at the inversion. Nothing else.** Animating `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `font-size`, `letter-spacing` or any layout property is a defect. (The rail hover panel therefore animates `clip-path`, not `width`.)
- **`transform: translateY` on text: forbidden** (§12.5).
- **`transform: scale` on hover: forbidden** anywhere on the site.
- Every GSAP timeline is created inside `gsap.context()` and reverted on unmount. Every scroll trigger is registered client-side only.
- **Lenis config:** `lerp: 0.1`, `smoothWheel: true`, **`smoothTouch: false`** — touch scrolling is never smoothed. Disabled entirely under reduced motion.
- **Performance floor:** no animation may drop below **55fps** on a 2020 mid-range Android at 390px. If it does, **it is cut, not optimised.**
- Motion must never delay the user reading the thing they came for. Nothing on first paint is hidden waiting for a trigger.

---

## 12.8 Video rules

**Video is permitted in exactly one place on the entire site: chapter 06 (`LA PIETRA`), one loop, flour falling. A second video anywhere is a defect.**

| Constraint | Value |
|---|---|
| Count | 1 |
| Location | Chapter 06 only |
| Ratio | **5:8 portrait** — the site's only vertical asset |
| Max duration | **6.4s** (8 × 0.8) |
| Max file size | **2.4 MB** |
| Codecs | AV1 primary, H.264 fallback |
| Attributes | `muted`, `playsInline`, `loop`, `preload="none"` |
| Poster | The 8:5→5:8 still of the same frame, graded identically per §9.5 |
| Autoplay | Only when ≥ 50% in viewport, only when `prefers-reduced-motion` is not `reduce` |
| Off-screen | Paused via IntersectionObserver |
| Loop point | Seamless — first and last frame identical within 2% RMS |
| Grade | Identical to the stills. Same black lift, same 35% desaturation, same 8% grain. |

**Never:** full-bleed. A background. Behind text. In the hero. With sound. With controls. With a play button (there are no icons). With a "click to play" overlay. Autoplaying with audio-ready markup.

**Never on mobile.** Below 768px the `<video>` element is not rendered at all — the poster still is rendered as an `<img>`, permanently. There is no connection-speed logic, no "wifi-only" branch, no user toggle. The decision is made here and it is final.

---

## 13. Mobile adaptations

Not "it stacks". These are the actual decisions.

1. **The grid stays 8 columns.** It does not become 4. Column width at 390px is 34.75px, gutter 8px. This is Invariant 1 and it is not negotiable for viewport economy.
2. **The rail stays**, at 40px, fixed, with all 64 kernels. It is the navigation at every breakpoint — there is no hamburger, no drawer, no bottom bar. The kernel becomes 2 × 2px on a 4px pitch; the row band stays 40px, so the hit target stays 40 × 40px.
3. **The text axis moves from column 2 to column 1.** Display overhang goes into the 16px left pad.
4. **Column 8 survives as the reserved void** — 34.75px of empty right margin. It is not reclaimed. The asymmetry is the point and it survives at 390px.
5. **The registry column becomes a full-width table**, spanning columns 1–7, below the body. Label left (Archivo `wdth 125`, 10px, `0.16em`), value right-aligned (DM Mono 14px, tabular), 1px `--rigo` between rows, 40px row height. **It does not become cards. It does not stack value-under-label. It does not become an accordion.**
6. **Only 8:5 images survive.** All 1:1 detail plates are dropped on mobile — not scaled, not cropped, dropped. One ratio, one rhythm. 8:5 images span columns 1–7.
7. **Edge-bleeding images are pulled inside the field.** The only clip on mobile is the hero headline.
8. **Video → poster still, permanently** (§12.8).
9. **The rail hover panel does not exist.** Tap navigates immediately; the chapter name appears as an Archivo `wdth 125` 10px label at the head of the rail for 640ms, then clears.
10. **The chapter-08 inversion survives in full.** It is the reason the site exists, and it is not a desktop-only reward.
11. **Letterpress bite is disabled** below 768px. **Grain drops to 0.035.** Chain-line pitches are unchanged (24px / 8px).
12. **No hover states exist.** Every `:hover` rule is wrapped in `@media (hover: hover) and (pointer: fine)`. Nothing depends on hover to be discoverable.
13. **Chapter padding drops from 168px to 64px** — a 2.6× compression, not a proportional scale. The page gets denser, not smaller.
14. **Labels and data do not scale.** `--type-label`, `--type-label-lg`, `--type-data` and `--type-data-lg` are the same px size on a 390px phone as on a 1920px display. They are specimen-card artefacts; a specimen card's label does not resize.
15. **Body measure lands at ≈ 40 characters.** This is accepted. Widening it would require killing the void, and the void outranks the measure.

---

## 14. Reduced-motion adaptations

`prefers-reduced-motion: reduce` is **not** a degraded experience. Transforms and scroll-linked movement stop; composition, colour, hierarchy and *narrative* remain. **A reader with this setting on must not be able to tell they got the lesser version** — and §19.15 is the test that proves it.

| Element | Reduced-motion behaviour |
|---|---|
| **Text mask reveal** | **Off.** Text is present at full opacity from first paint. Nothing wipes, nothing fades. The composition already does the work — that is why the composition was designed first. |
| **Image mount** | Off. Images are present from first paint. |
| **The rail** | **Preserved, discrete.** The kernel fill becomes stepped rather than continuous: kernels flip state instantly (0ms) as their scroll threshold is crossed. **The 64-kernel count is fully intact.** The signature interaction loses its animation, not its meaning — and the meaning was always the count, never the tween. |
| **Chapter 08 inversion** | **PRESERVED, INSTANTANEOUS.** The page still goes to night and gold at the 64th kernel. The change happens in 0ms instead of 640ms. It is not removed. It is not softened. It is not replaced by a static dark section that was always dark. **Removing the inversion under reduced motion is a defect, not an accommodation** — the inversion is a *state*, not a motion, and Invariant 3 does not have a reduced-motion exemption. |
| **The 160ms rail lead** | Collapses to 0ms. Rail and field change together. |
| **The pin** | Removed. Chapter 08 becomes a normal-flow full-height section; the inversion fires on entry. |
| **Registration marks** | Present immediately, no reveal. |
| **Hover states** | Colour changes only, 0ms. No transition. |
| **Video** | Never autoplays. Poster still is shown. **No controls are added** — there are no icons on this site, and adding a play button to satisfy reduced motion would break §11.4. The still is the experience. |
| **Lenis** | Disabled entirely. Native scroll. |
| **Grain, chain lines, letterpress bite** | Unaffected. They never animated. |

**Implementation requirement:** a single `@media (prefers-reduced-motion: reduce)` block for CSS, plus **`gsap.matchMedia()` around every timeline**. A blanket `* { animation: none !important; transition: none !important; }` is a defect — it would kill the inversion's colour transition semantics and it is exactly the "animations off" shortcut this section exists to prevent.

---

## 15. Accessibility floor

Not a separate concern from art direction — the contrast ratios in §4.3 were chosen, not discovered.

- `lang="it"` on `<html>`. Alt text in Italian.
- One `<h1>` — the hero headline. Heading levels never skipped for visual reasons; `--type-d2` may be applied to an `<h3>`.
- Landmarks: `<header>`, `<nav aria-label="Capitoli">` (the rail), `<main>`, eight `<section>`, `<footer>`.
- All body text meets **WCAG AA** (§4.3). Primary text is AAA on both fields.
- Every interactive element is keyboard-reachable with the designed focus ring (§11.5). Rail tab order 01→08.
- Decorative images `alt=""`. Meaningful images carry real Italian alt text describing the specimen, e.g. *"Sezione di pannocchia di Mais Rosso Ottofile: otto file di chicchi tondi."*
- Hit targets ≥ 40 × 40px, including the rail rows.
- No content conveyed by colour alone. The rail communicates position by fill state (filled/outlined), not only by hue — which is why completed kernels are solid `--inchiostro` rather than a lighter tint.
- `font-synthesis: none` globally. No faux bold, no faux italic.
- The site is fully readable and navigable with CSS animation disabled and JavaScript disabled (the rail degrades to a static anchor list; chapter 08 renders as night from server-side markup).

---

## 16. Z-index scale

Exactly five values. A sixth is a defect.

```
  0   content
 10   sticky chapter heads (if any ship)
 90   grain + chain lines overlay
100   the rail
110   the rail hover panel
```

No `z-index: 9999`. No `z-index: 1` scattered through components.

---

## 17. Content constraints inherited from the fact set

Restated here because art direction that outruns the facts is a liability, not a flourish.

- **Nothing may be asserted that is not in `src/content/facts.ts` or `docs/discovery.md` §2–3.**
- The superseded product range — *Monoporzione 30 × 18 g, Tubo 12 × 120 g, Multipack 6 × 18 g* — is **forbidden data** and may not reappear in copy, alt text, structured data or design placeholders.
- Products: **Maisette** (Gallette, 120 g), **Maissini** (Grissini — never a gallette format, no confirmed weight), **Farina di Mais Rosso** (500 g, macinata a pietra). No other format, weight, variant, certification, award, statistic or price exists.
- **Maissini's format is `null`.** The layout omits the entire weight row. It must not render a dash or fabricate a value; omission is the only unambiguous treatment until the client confirms the printed net weight.
- The three products are **not** three equal feature cards. They are three registry entries in chapter 07, subordinate to the ingredient, presented without packshots (discovery §8 records that pack photography is unavailable — and a registry presents objects and specifications, not packaging).
- *Amaro del Dottore* and the polenta recipes must not compete with the maize narrative. Recipes currently outrank products on the live site (discovery §5.6); here they are subordinate registry entries in chapter 07 or they do not appear.

---

## 18. Forbidden elements — the kill list

Enumerated, project-specific, non-negotiable. Each entry is independently a rejection at the Phase 6 or Phase 8 gate.

1. **Centred text of any kind.** `text-align: center` appears zero times.
2. **Fade-up on entry.** `translateY` + `opacity` on any text element.
3. **`border-radius` ≠ 0**, anywhere, including images, inputs, video and the cookie notice.
4. **`box-shadow` with blur > 0**, anywhere. `filter: drop-shadow()`, anywhere.
5. **Gradients** — `linear-gradient`, `radial-gradient`, `conic-gradient` — **except** the two `repeating-linear-gradient` declarations drawing the chain lines (§10.2).
6. **Icons.** Zero SVG icons, zero icon fonts, zero emoji, zero glyph substitutes.
7. **Buttons with a background fill.** Any filled, bordered-box or pill-shaped control.
8. **Cards.** Any element whose `background-color` differs from its parent's, except the rail hover panel and the chapter-08 field.
9. **`--chicco` as a fill, background, gradient stop, tint, partial opacity, state colour, or above 2% viewport coverage.** *(Invariant 2.)*
10. **A second dark section.** Chapter 08 and its footer are the only night. *(Invariant 3.)*
11. **A second video.**
12. **Any yellow that is not `--esperide`**, and **`--esperide` on any ground other than `--notte`.**
13. **Bodoni below 32px**; Bodoni for body, labels, UI or numerals; **Bodoni at `wght` ≥ 600**; Bodoni with `font-optical-sizing` disabled.
14. **Archivo italic and DM Mono italic.** Synthesised italic anywhere.
15. **A fourth typeface** — including icon fonts, a system sans used deliberately, or a "temporary" placeholder that ships.
16. **Parallax**, on anything.
17. **`scroll-snap`**, scroll hijacking, scroll-jacked slides, and any pinned section beyond the single chapter-08 pin.
18. **Spring, overshoot, bounce or elastic easing.** Any `cubic-bezier` with y outside `[0, 1]`.
19. **Any duration other than 0 / 160 / 320 / 640ms.**
20. **Spacing values outside the token set** (layout) **or not divisible by 8** (component-internal), excepting the four declared exemptions (§6.1).
21. **Any grid that is not 8 columns**, at any breakpoint.
22. **Photography of people, hands, packaging, plated food, fields, sky, wood, burlap, or anything in §9.6.**
23. **Golden-hour light in chapters 01–07.**
24. **Stock compositions** — bilateral symmetry, three equal items in a row, flat-lay with props, "hero shot" framing.
25. **Three equal feature cards for the three products.**
26. **Hero buttons, scroll hints, "scopri di più", chevrons, mouse-wheel graphics, animated down-arrows.**
27. **Purple, indigo, teal, or any colour outside the seven declared hexes** and their `rgba()` derivations.
28. **`Inter`, `Geist`, or any system sans as a visible face.**
29. **Marketing adjectives set in display type.** *Eccellenza, passione, autentico, genuino, unico* in Bodoni at any size. If one appears at `--type-d3` or above, I reject the build outright.
30. **Loading spinners, skeleton shimmer, progress bars, percentage counters.**
31. **A cookie notice, privacy page or 404 styled outside this document.** They are part of the site, not exempt from it.
32. **Decorative animation with no narrative job.** If you cannot state the sentence an animation is speaking, it is decoration and it is cut.
33. **A ninth chapter, a merged chapter, or chapter 08 in any position but last.**
34. **The superseded product range** (§17).

---

## 19. How to detect dilution

Concrete checks. A reviewer runs these and *proves* the concept has been weakened — no argument, no taste, no negotiation. Checks 1–15 are mechanical. Check 16 is the only subjective one, and it outranks all the others.

**19.1 — Spacing divisibility.**
In DevTools, read every computed `margin`, `padding`, `gap`, `row-gap` and `column-gap` on every element. **Any non-zero value not divisible by 8 is a defect** — excluding only the four exemptions in §6.1. Zero tolerance. This is the check that catches "we just nudged it 6px".
```js
[...document.querySelectorAll('*')].flatMap(e=>{const s=getComputedStyle(e);
return ['marginTop','marginBottom','marginLeft','marginRight','paddingTop','paddingBottom','paddingLeft','paddingRight','rowGap','columnGap']
.map(p=>[e,p,parseFloat(s[p])||0])}).filter(([,,v])=>v && v%8)
```

**19.2 — Colour census.**
Extract every distinct colour in the compiled CSS. **More than 7 distinct hex values (plus `rgba()`/`color-mix()` derivations of those 7, plus `transparent` and `currentColor`) means a colour has been invented.** Defect.

**19.3 — `--chicco` coverage.**
Screenshot each chapter at 1440 × 900. Count pixels within ΔE 6 of `#B23A16`, divide by 1,296,000. **If > 2%, Invariant 2 is broken and the colour argument is dead.** Count imagery, not just UI.

**19.4 — Dark-section count.**
Screenshot the full page at 1440 width. Compute mean relative luminance per 100vh band. **Exactly one contiguous run of bands may fall below L = 0.05. Two runs means Invariant 3 is broken and the concept is dead.**

**19.5 — Duration census.**
`grep -rE "duration|transition" src/` — every value must resolve to 0, 160ms, 320ms or 640ms (or 0.16/0.32/0.64s). **A single `0.3s` is a defect.**

**19.6 — Easing census.**
`grep -rE "cubic-bezier|ease|Power|Back|Elastic|Bounce" src/` — only the three declared curves and `linear` may appear. **Any y-value outside `[0,1]`, or any GSAP `back`/`elastic`/`bounce` ease, is a defect.**

**19.7 — Radius census.**
`grep -rn "border-radius\|rounded" src/` — every occurrence must resolve to 0. **One `rounded-sm` is a defect.**

**19.8 — Shadow census.**
`grep -rn "box-shadow\|drop-shadow" src/` — every `box-shadow` must have blur 0. **`drop-shadow` must not appear at all.**

**19.9 — Card census.**
For every element, compare its computed `background-color` to its parent's. **More than two elements differ (the rail hover panel, the chapter-08 field) means cards have crept in.** Defect.

**19.10 — Column-8 void test.**
Overlay a rect at the column-8 bounds for the full document height. **Any rendered ink inside it that is not a 2px `--chicco` rule in chapter 03 or 05 is a defect.** Screenshot-diff friendly; automate it in Playwright.

**19.11 — Kernel count.**
Scroll to the bottom. Count filled kernels. **If ≠ 64, the count is broken and the signature interaction is a lie.** Also verify: the inversion fired on the 64th, not on a section boundary.

**19.12 — Crop ratio census.**
For every `<img>` and `<video>`, compute `naturalWidth / naturalHeight`. **Every value must be 1.600 ± 0.005, 1.000 ± 0.005, or — for the single video — 0.625 ± 0.005.** Anything else is a defect. On mobile, no 1.000 may be present.

**19.13 — Optical alignment.**
Screenshot any chapter head. Sample the leftmost inked pixel column of the display line and of the first body line beneath it. **They must agree within 1px.** If the display line sits 4–8px to the right, its *bounding box* was aligned instead of its stems, and §7.2 was skipped. **This is the most common dilution on this project and the hardest to argue away once measured.**

**19.14 — Typeface audit.**
```js
new Set([...document.querySelectorAll('*')].map(e=>getComputedStyle(e).fontFamily))
```
**Exactly three families plus declared fallbacks.** Then: any element with computed Bodoni at `font-size` < 32px is a defect; any `font-style: italic` on a non-Bodoni element is a defect; any Bodoni at `font-weight` ≥ 600 is a defect.

**19.15 — Reduced-motion parity.**
Emulate `prefers-reduced-motion: reduce`. Screenshot chapters 01 and 08 **at rest**. **The screenshots must be pixel-identical to the motion-on versions at rest.** If any element is missing, mis-positioned, at a different opacity, or if chapter 08 is not night, then reduced motion was implemented as "animations off" rather than designed — and §14 was ignored. Defect.

**19.16 — The swap test.**
Take any full-viewport screenshot, remove the wordmark, and ask: *could this be another food brand's page with the logo swapped?* **If yes for any chapter, that chapter is dead and I kill it.** This is the only subjective check and it outranks all fifteen above. A page can pass every arithmetic check and still fail this one — that is what dilution actually looks like at the end.

**19.17 — Adjective audit.**
`grep -riE "eccellenza|passione|autentic|genuin|unic" src/content/` — each occurrence must be justified by the Content Strategist. **None may be set in Bodoni. Any at `--type-d3` or above is an immediate rejection.**

**19.18 — Horizontal overflow.**
At 390, 768, 1280, 1440 and 1920: `document.documentElement.scrollWidth === document.documentElement.clientWidth` must be **true at all five**. The hero clip must be achieved with `overflow-x: clip` on the section — **not** by letting the page scroll. A horizontal scrollbar is a defect, not a feature.

**19.19 — Grid column count.**
`getComputedStyle(field).gridTemplateColumns.split(' ').length` must be **8** at 390, 768, 1280, 1440 and 1920. **A 4 anywhere means Invariant 1 was traded for convenience.**

**19.20 — Baseline grid.**
Toggle the 8px baseline overlay (§6.3). **Every text baseline must land on a line.** More than two off-grid baselines per chapter is a defect.

---

## 20. Approval gates

- **Asset gate** — every Higgsfield batch is reviewed against §9.6 and §9.8 before any asset enters the layout. Rejected assets are regenerated or the moment is carried by typography. A weak asset is never forced in.
- **Phase 6, prototype** — §19.1–19.14 and §19.18–19.20 run mechanically. §19.16 runs by eye, on every chapter.
- **Phase 8, final QA** — all of §19, plus §14's reduced-motion parity and the five-viewport overflow check.

Chapter 08 is **not negotiable**. Phase 2 records the bet explicitly: *"The bet we are making is that a single withheld gold moment hits harder than sustained gold. If chapter 08 is executed at anything less than full commitment, we will have been wrong."* If it arrives underweight — a slightly darker section, a gold accent, an inversion that fades rather than changes state — I reject the build, and the correct response is to fix chapter 08, not to soften the rest of the site to match it.
