# Phase 4 — Motion & Interaction Specification

**Project:** Il Giardino delle Esperidi — sito vetrina
**Concept:** OTTO — *Registro di una varietà superstite*
**Author:** Motion & Interaction Designer
**Date:** 2026-07-27
**Status:** AUTHORITATIVE. Supersedes the motion sign-offs recorded in `docs/final-qa.md` §2 and `docs/signature-motion.md` "Approval record", neither of which I wrote.

---

## 0. How to read this document

This is a **ratification and correction pass**, not a greenfield spec. The motion was implemented before this document existed. Everything below describes what the site's motion **must** be; §14 itemises every point where the shipped code differs from that, marked `RATIFIED`, `CORRECT THIS` or `REJECT`.

`docs/art-direction.md` is law. Where this document is silent, the art direction governs. Where this document adds a number the art direction did not decide, that number is escalated to the Art Director and marked `[AD RULING]`.

Nothing here is production code.

---

## 1. The interaction concept — one paragraph

**The record fills as you read it, and it is complete exactly once.** The whole page's motion serves a single sentence, and every animated thing on the site is a clause in it. The rail is not a progress bar and not navigation chrome — it is the register accruing evidence: eight schede, eight marks each, sixty-four kernels, one pannocchia. Reading *is* the act of registration; the marks are the receipt. Nothing on the page moves to be pleasant, and nothing moves to announce a section. There is exactly one payoff, and it is not a transition — it is a **state change**: when the sixty-fourth kernel lands, the file is closed and the page becomes the thing the file was always about. The count and the event are the same thing, which is why the site has no scroll-percentage anything, anywhere. Everything else — the registry rows uncovering, the hero line uncovering, the panel clipping open — is the same gesture at a smaller scale: **a card being seated in a drawer**. If an animation cannot be stated as a clause of that sentence, it is decoration and it is cut.

**Corollary, load-bearing:** *prose is present; evidence registers.* Body copy, standfirsts and chapter titles do not animate at all. Only the things that are **data** — registry rows, the rail, the counter, the hero identifier line — move, and they move by being uncovered, never by arriving. This is the rule that keeps the site off the endless-fade-up template, and it is why seven of eight chapters have almost no motion in them.

---

## 2. The one interaction people remember

`La Riga Ottava` and the inversion are not two interactions. They are one interaction with a payoff. The rail is the mechanism; chapter 08 is what the mechanism is for. Judge every motion decision on this site by whether it makes the sixty-fourth kernel land harder.

---

## 3. `La Riga Ottava` — the rail, in full

### 3.1 Fill unit, and why

**The fill unit is one kernel = one eighth of a chapter's scroll length.** Not one pixel of a continuous bar, not a tween per kernel — a discrete flip, eight times per chapter.

The unit is a kernel because the concept is arithmetic, not a percentage. A continuous fill would be a progress bar wearing a costume, and a progress bar tells the reader *how far through the page* they are. A stepped count tells them *how much of the record is on file*, which is the only claim the site is making. §18.30 forbids percentage counters and progress bars; the rail escapes that ban precisely because it counts completed evidence in whole units, not elapsed distance.

The flip itself is not instantaneous ink. The kernel's `background-color` and `border-color` transition over **160ms, `--ease-registro`**. That is the smallest duration in the vocabulary and it is the one the art direction assigns to "kernel fill" (§12.1). The step is discrete; the ink is tactile.

| | Mobile (<768) | Tablet (768–1279) | Desktop (≥1280) |
|---|---|---|---|
| Rail width | 40px | 48px | 64px |
| Kernel | 2 × 2px | 3 × 3px | 4 × 4px |
| Cell pitch | 4px | 6px | 8px |
| Row band (hit target) | 40 × 40px | 48 × 40px | 64 × 40px |
| Nav block | 40 × 320px | 48 × 320px | 64 × 320px |

### 3.2 Drive

**Scroll-position-driven, `linear`, no duration, fully reversible.** This is the site's only continuous scroll-linked animation (§12.4, §12.7) and no second one may be added.

- Chapter progress runs from the chapter's **top edge meeting the viewport top** to its **bottom edge meeting the viewport bottom**. In ScrollTrigger terms: `start: "top top"`, `end: "bottom bottom"`.
- Kernel *n* (0-indexed) of chapter *c* is filled when `floor(clamp(progress, 0, 1) × 8) > n`.
- Chapter 08 is driven from its pin instead: progress 0→1 across the 100vh pin. Kernel 64 therefore lands at pin progress **0.875**.
- State per kernel is one of three, and it is written to `data-state`, never to a class list:

| State | Day | Night |
|---|---|---|
| `pending` | 1px `--pietra` outline, no fill | 1px `rgba(233,227,214,0.24)` outline |
| `completed` | solid `--inchiostro` | solid `--esperide` |
| `active` (the chapter you are in) | solid `--chicco` | solid `--esperide` |

Only the active chapter's row is `--chicco`. All eight rows in `--chicco` simultaneously is a defect (§4.4 illegal use 6).

**Reversal.** Scrolling up unfills, kernel by kernel, on the identical thresholds. There is no easing on the reversal and no hysteresis on the *kernels* — the count must be a pure function of scroll position, or §19.11 cannot be verified. (Hysteresis applies to the **field inversion only**; see §5.2.)

### 3.3 The live counter

The rail head carries a DM Mono readout, `00/08` → `08/08`, vertically set, `--testo-2`.

- It counts **schede READ** — a row counts only when all eight of its kernels are filled.
- It changes **discretely, 0ms**. A counter must never tween. A tweened counter is an odometer, and an odometer is a progress bar.
- Because it counts completed rows, it reaches `08/08` **in the same frame kernel 64 lands and the field inverts**. The count, the readout and the event are one thing. This is the single most important property of the component and it must never drift: if the readout can ever say `08/08` before the inversion, the site has asserted that the record is complete while it is still open, and the closing line — *Il registro resta aperto* — is contradicted by the interface.
- It may never display a percentage, a fraction of kernels (`57/64`), or the chapter currently in view.

### 3.4 Hover panel — desktop only

Gated on `@media (hover: hover) and (pointer: fine)`. Does not exist at tablet or mobile, at any pointer type.

- Geometry: **384 × 64px** (48 × 8 and 8 × 8), `--carta` ground, 1px `--pietra` border, radius 0, no shadow, `z-index: 110`, expanding rightward from the hovered row.
- Reveal: `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, **320ms, `--ease-registro`**.
- Dismiss: `inset(0)` → `inset(0 100% 0 0)`, **320ms, `--ease-uscita`**. This is the only place `--ease-uscita` appears on the site.
- It animates `clip-path`. Animating `width` is a defect (§12.7).
- It is `pointer-events: none` and `aria-hidden`; the accessible name lives on the anchor. The panel is a visual expansion of the link, not a tooltip and not a menu.
- Contents, left to right on a 16px inner pad: number (DM Mono 11px), 1px `--pietra` rule, name (Archivo `wdth 125`, 10px, `0.16em` caps), fact (Archivo 15px). Microcopy is fixed in `content-plan.md` "Rail microcopy".

### 3.5 Focus and keyboard — full operability

The rail is a `<nav aria-label="Indice del registro">` containing an ordered list of eight anchors. This is the entire navigation of the site at every breakpoint. It must therefore be operable with a keyboard alone, with no exceptions and no compromises.

- **Tab order 01 → 08**, DOM order, no `tabindex` above 0.
- **The panel opens on `:focus-visible` exactly as on hover**, same 320ms, same curve. A keyboard user must never receive less information than a mouse user.
- **Focus ring:** 1px `--indice` outline, `outline-offset: 4px`, radius 0, applied to the 40px-tall band — not to the 4px kernel. **0ms.** The focus ring never animates in. A focus ring that eases is a focus ring that lags, and lag on a focus ring is an accessibility defect, not a flourish.
- Activation (Enter / click / tap) is a same-document anchor jump. `scroll-behavior` is `auto`, i.e. **instant**. Smooth-scrolling a keyboard user 12 viewport heights is motion sickness with no narrative job, and it would also be the site's second scroll-linked behaviour. Seating is instant; the rail then resolves to the destination chapter's state on the next scroll tick.
- The skip link (`Vai al contenuto`) precedes the rail and is the first tab stop.
- Hit target ≥ 40 × 40px on every breakpoint, including mobile (§15).

### 3.6 What kernel 64 triggers

Kernel 64 filling is the **only** trigger for the inversion. Not a scroll percentage. Not an IntersectionObserver ratio. Not a section boundary. It triggers, in one frame:

1. the rail counter reading `08/08`;
2. the inversion timeline (§5).

Nothing else on the site is allowed to observe kernel 64.

---

## 4. Per-section motion — all eleven sections

Stated exhaustively, including the sections where the correct answer is **nothing**. Most of this table says nothing, and that is the specification, not an omission.

| Section | What moves | Timing | Why / why not |
|---|---|---|---|
| `nav` (site-header) | **Nothing.** | — | It does not hide on scroll, does not shrink, does not gain a background. A letterhead does not move when you turn the page. It inverts with the field in ch08 and that is its only state change. |
| `hero` | The display line only: 2 lines, mask `clip-path: inset(0 0 100% 0)` → `inset(0)`. Rail row 01 begins seating. | **320ms**, `--ease-registro`, **40ms** stagger. Total 360ms. Plays on load, not on a scroll trigger. | The identifier registers once, at the top of the file, and the page is then still. No parallax, no scroll hint, no image mount, no button — there is nothing else in the hero to animate. Opacity stays at 1 throughout: the text is uncovered, never faded (§12.5). |
| `ch01`–`ch07` | Registry rows only: per-row mask reveal. | **320ms**, `--ease-registro`, **40ms** stagger, max 8 rows, fired at **`top 76%`** (24% viewport entry), **`once: true`** — never re-fires on scroll-back. | *Prose is present; evidence registers.* Chapter titles, standfirsts and body paragraphs do **not** animate. They are set, they are on the grid, they are legible at first paint. A chapter that announces itself is a slide; a chapter that is simply there is a page. |
| `ch04` (`Quasi estinto`) | Nothing additional. | — | The pivot chapter is paced by **scroll length**, not by a mechanic: more scroll for less content. Adding motion to the emptiest composition on the site would fill the void the composition exists to create. |
| `ch06` (`La pietra`) | Nothing. No video ships. | — | See §11. |
| `ch07` (`Tre referenze`) | Registry rows as above. | as above | Three entries seat with the same indexing motion as every other registry block. They are not three cards and they must not stagger as a group — that would read as a product grid revealing. |
| `ch08` (`Custodia`) | The inversion (§5). The four registration marks. | §5 | The myth quotation does **not** mask-reveal. After a full-field chromatic inversion, a text wipe is noise on top of the loudest moment on the site. The type is present; the world changes around it. |
| `contatti` | **Nothing.** | — | The only conversion on the site is never gated behind an animation, never revealed on scroll, and never delayed. It is present the moment it is on screen. |
| `piede` | **Nothing.** | — | Legal text does not perform. |
| Rail | §3, at every scroll position | §3 | |
| Prologue | §6 | §6 | |

**Image mount.** §12.4 provides for an image mount at 24% entry. **No photography ships in the current build** — there is not one `<img>` or `<video>` in the content layer. There is therefore no image-mount motion in this spec. If specimen imagery is added later, it mounts by `clip-path: inset(0 0 100% 0)` → `inset(0)`, **320ms**, `--ease-registro`, at `top 76%`, `once`, and **never by opacity and never by transform**.

---

## 5. The chapter-08 inversion — frame by frame

### 5.1 Forward

Trigger: kernel 64 fills. One pinned section, 100vh of pin, `pinSpacing: true`, `anticipatePin: 1`. This is the site's only pin and a second is a defect.

| t (ms) | Event | Duration | Easing | Property class |
|---:|---|---:|---|---|
| **0** | `data-rail-field` → `notte`. The 64 filled kernels go `--inchiostro`/`--chicco` → `--esperide`. For 160ms the rail is the only changed thing on a bone-paper page — the index knows before the page does. | 160 | `--ease-registro` | paint |
| **160** | `data-field` → `notte` on `<html>` and on the chapter-08 section. `--campo`, `--testo`, `--testo-2`, `--rigo`, `--rigo-forte`, `--indice` all re-point. **Only `background-color` and `color` transition. Nothing moves, nothing fades, nothing scales.** | 640 | `--ease-inversione` | paint |
| **160** | Chain lines removed. | **0** | — | discrete |
| **160** | Grain plate blend `multiply` → `screen`. | **0** (blend-mode cannot tween) | — | discrete |
| **160** | Grain plate opacity, day value → night value. | 640 | `--ease-inversione` | composite |
| **160** | Letterpress bite removed from all display type. | **0** | — | discrete |
| **800** | The four registration marks reveal at the field corners, `--esperide`, 1px, `clip-path: inset(50%)` → `inset(0%)` — a printer's cross drawing itself from its own centre. | 320 | `--ease-registro` | composite |
| **1120** | End. | | | |

**Ruling on the 800ms offset — RATIFIED, and it is not a defect.**

§12.1 governs **durations**. 800ms here is not a duration; it is a **start time**, and every duration inside the timeline (160 / 0 / 640 / 320) is in the vocabulary. Three further reasons, each independently sufficient:

1. **The art direction sets it itself.** §12.6's table has a `t = 800ms` row. Reading §12.1 as forbidding it puts the art direction in contradiction with itself, and the more specific clause wins.
2. **It is on the lattice.** 800 = 5 × 160 = 100 × 8. The total, 1120 = 7 × 160, is likewise. A sequencing offset that is a whole multiple of the base duration is not an escape from the system — it *is* the system, extended in the only direction a timeline can extend.
3. **It is a designed handoff, not a gap.** The field transition runs 160 → 800. The marks therefore begin **in the exact frame the field lands**. 800 is not "a bit later"; it is "when the world has finished changing". Move it to 640 and the marks appear over a field still in transit; move it to 960 and there is a dead beat where nothing is happening and the reader assumes it is over.

**The general rule, stated so it cannot be re-litigated:** *sequencing offsets are exempt from §12.1 provided they are whole multiples of 160ms.* An offset of 700ms, 750ms or 850ms is a defect. 160 / 320 / 480 / 640 / 800 / 960 / 1120 are the only legal ones, and a timeline needing an eighth of them is a timeline that has become a film.

### 5.2 The dead-band — required, currently missing

`content-plan.md` §6/ch08 is explicit: *"The inversion must never be reversible mid-chapter by scrolling up a few pixels — flicker at the boundary would destroy the one chromatic event."* Kernel 64 lands at pin progress 0.875. With a symmetric trigger, one scroll notch above that threshold reverses a 1120ms timeline, and the next notch replays it. That is the exact failure the content plan forbids and it is currently unguarded.

**Specification:**

- **Arm (forward):** pin progress ≥ **0.875** — kernel 64 fills. Unchanged. The count is still the event.
- **Release (reverse):** pin progress < **0.750** — i.e. kernel 62 unfills. A **one-kernel dead-band**, 12.5% of the pin, 12.5vh of scroll.
- The *kernels themselves* remain a pure function of scroll and continue to unfill immediately at their own thresholds (§3.2). Only the **field state** latches. Both facts must hold simultaneously: a reader who scrolls up 20px sees kernel 64 unfill on a still-night page, which is correct — the mark is a live reading of position, the field is a state that has been entered.
- The dead-band is one kernel because every threshold on this site is one eighth of something.

### 5.3 Reverse — the asymmetry, and its rationale

**Reversal is not the forward timeline played backwards.** It is an undo, and it is bounded by an accessibility hazard rather than by taste.

**The hazard, measured.** While the field is `notte` and the viewport is showing chapters 01–07, `--pietra-testo` (#625D4D) renders on `--notte` (#0D0B08) at **2.99:1** — a WCAG AA failure (§4.3). That pairing must never be legible on screen. Every millisecond of the return is a millisecond of that pairing. §12.6's "reverses on the same timings" was written before that ratio was computed, and it loses to §4.3.

**Specification — total 480ms, every value on the lattice:**

| t (ms) | Event | Duration | Easing |
|---:|---|---:|---|
| **0** | Registration marks clip out, `inset(0%)` → `inset(50%)`. Gold must leave before the ground does: `--esperide` on any ground other than `--notte` is a defect (§18.12). | 160 | `--ease-uscita` |
| **160** | `data-field` → `giorno`. Field, grain opacity, chain lines, letterpress bite all return. | **160**, not 640 | `--ease-inversione` |
| **320** | `data-rail-field` → `giorno`. **The rail turns back last** (§12.6). | 160 | `--ease-registro` |
| **480** | End. Failing contrast pair is off screen from t = 320ms. | | |

Order is the reverse of forward (marks → field → rail), per §12.6. The **rate** is not scaled; each step is a vocabulary duration. Implementation requires a CSS hook so the field's `transition-duration` is `--dur-1` while reversing and `--dur-3` while playing forward — a `data-inversion="reversing"` attribute on `<html>` is sufficient and is a discrete, 0ms state.

**Why not a fractional `timeScale`.** Scaling the forward timeline by 1.75× produces observable durations of 91ms, 183ms and 366ms. None of those is 0, 160, 320 or 640. §19.5's grep passes because there is no literal in the source, but §19.5 is a proxy for §12.1, and §12.1 is about what the reader sees. A rate multiplier is a duration multiplier. It also plays `--ease-registro` backwards on the marks, where the art direction has an exit curve specifically for elements leaving.

**Why not 0ms.** Instant reversal would be legal (§14 establishes the state may change in 0ms) and would remove the hazard entirely — but with the dead-band in §5.2 the reversal is now a deliberate act, and a deliberate act that snaps reads as a bug. 480ms is fast enough to be safe and slow enough to be intentional.

### 5.4 What the inversion may never do

- Fade. Crossfade. Dissolve. Wipe. Slide. Scale. Blur.
- Move any element by so much as one pixel.
- Animate any property other than `background-color`, `color`, `opacity` (grain only) and `clip-path` (marks only).
- Fire on a section boundary, an IntersectionObserver ratio, or a scroll percentage.
- Be softened, shortened or removed under reduced motion (§10).
- Return to day. There is no return to day after chapter 08 — `contatti` and `piede` are inside the same field.

---

## 6. The prologue — ruling

### 6.1 The ruling: **KEEP, BOUND, AND NEVER EXTEND.**

I was asked to judge a scroll-linked WebGL kernel field that arrived during implementation and was not in my brief. Two things must be said before the judgement.

First, **it is no longer an invention** — the Art Director's 2026-07-26 amendment authorises it explicitly, as a named exception to seven separate rules, and `docs/signature-motion.md` records a "Motion Designer: FINAL GO" that **I did not give**. That sign-off is void; this section replaces it. But the layer itself has been through the law and the law changed to admit it, so my question is not "may it exist" — it is "does it serve the concept, and under what constraints".

Second, my default on a decorative full-document background layer is **cut it**. §18.32 exists for exactly this and the burden of proof is on the layer.

**It clears the bar. Here is the argument, and it is narrow.**

It is not parallax and not a particle field. It is a **deterministic state machine driven by absolute scroll position**, with six named stages — `dispersione` → `attrazione` → `pannocchia` → `pianta` → `campo` → `registro` — and those stages are not moods. They are the narrative of chapters 01–03 restated in geometry: **isolated kernels are near-extinction; deterministic attraction into eight rows is custody; the final flattening into eight paper incisions is the record**. It ends by *becoming evidence* and then removing itself. It says exactly the same sentence the rail says, in the register of the substrate rather than the register of the index, and it stops the moment chapter 03 proves the eight typographically — because from that point on the page has literal proof and no longer needs an analogy.

Three properties make it survivable where an ambient background would not:

1. **It has an ending.** It releases to zero opacity at `#otto-file top top` and is suspended for chapters 04–08. A decorative layer that runs for the whole document is atmosphere; one that ends when its argument is finished is a prologue.
2. **It is a pure function of `scrollY`.** No time base, no physics, no runtime randomness, fixed PRNG seed. Wind is driven by progress, not by a clock. Reverse scrolling reconstructs identical state — verified: 0 → 0.272 → 0.513 → 1.0 and back through the same values with no drift. It cannot fight the user's scroll because it has no state of its own to fight with.
3. **It cannot be mistaken for content.** `position: fixed; z-index: 0; pointer-events: none; contain: strict; aria-hidden="true"`, outside `<main>`, adds no document height, never wins a hit test, beneath the paper texture, the content, the header and the rail.

**But it is the largest dilution risk on this site**, because it is the one element on the page that a competitor's site could also have. §19.16 — the swap test — is the check it must keep passing, and it passes only for as long as the rules in §6.2 hold. The moment it drifts warmer, louder, longer or into a second location, it becomes a generic WebGL hero background and it takes the whole concept with it. It is kept on those terms and no others.

### 6.2 Governing rules

**Opacity — the ceiling is absolute.**

| Stage | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| `dispersione` / `attrazione` | 0.28 | 0.22 | 0.18 |
| `pannocchia` / `pianta` | 0.18 | 0.14 | 0.12 |
| `campo` / `registro` | 0.30 | 0.26 | 0.22 |

**0.30 is the ceiling anywhere, at any stage, on any viewport.** Opacity changes are scroll-linked and `linear` — they are position-driven, so they carry no duration and no easing. Each crossfade **completes on a stage boundary**, not across it: 0.30 → 0.34 lands on `pannocchia`; 0.56 → 0.60 lands on `campo`. The layer never changes brightness while it is also changing shape.

**Stage boundaries** (renderer progress, and they are not open to adjustment without re-measuring §6.3):
`dispersione` < 0.12 · `attrazione` < 0.34 · `pannocchia` < 0.44 · `pianta` < 0.60 · `campo` < 0.76 · `registro` ≥ 0.76.

**Scroll mapping** — three piecewise segments onto real content stops, never onto an artificial scroll track:
`hero top → #varieta top` = 0 → 0.34 · `#varieta → #mais-del-re` = 0.34 → 0.60 · `#mais-del-re → #otto-file top 76%` = 0.60 → 1.0.

**Release — the most important rule in this section.** Progress freezes at 1.0 at `#otto-file top 76%`. Layer opacity then falls **linearly to zero** by `#otto-file top top`, at which point the renderer is **suspended**, not merely transparent: pointer RAF cancelled, no draw calls, no WebGL work. It does not return in chapters 04–08 and it is forced to zero opacity in the night field. **A prologue that is still rendering at chapter 08 is a defect**, not a performance issue — the inversion must be the only thing on the page that is doing anything.

**Pointer depth.** Fine pointers only, and only without `prefers-reduced-motion`. Camera orbit capped at **±0.35° yaw, ±0.20° pitch** — a figure chosen to be below the threshold at which a reader can tell it is happening, which is the only reason it is permitted at all. It is hard-gated during the `pannocchia` hold (0.34–0.44) and the flattening (≥ 0.76): at the two moments the layer is making a claim, it holds absolutely still. Pointer input may **never** alter scroll progress, may never exceed the caps, and **must return to centre within 160ms of pointer leave** (§14, item 12).

**What it may never do**, each independently a defect:

1. Exceed 0.30 opacity, at any stage, on any viewport.
2. Render at any scroll position outside `hero top → #otto-file top top`.
3. Appear in chapters 04–08, in the night field, or behind `contatti` / `piede`.
4. Enter column 8. Its viewport spans columns 1–7 and the reserved void survives beneath it.
5. Render above the paper texture, the content, the header or the rail. It is `z-index: 0` and it stays there.
6. Receive pointer events, focus, or an accessible name.
7. Add document height, alter `scrollHeight`, or shift `scrollY` on init, resize, context loss or restore.
8. Introduce a time base. No clock, no idle drift, no ambient float, no autonomous motion of any kind. If the reader stops scrolling, the layer stops.
9. Contain `--chicco` above the declared opacity envelope, or in aggregate above the §4.4 budget.
10. Use blur, glow, bloom, vignette, tint, or a second blend mode. `mix-blend-mode: multiply` and `filter: saturate(0.92)` are the whole treatment.
11. Attempt more than one context restore.
12. Grow a fourth static plate, a fifth stage, or a second instance anywhere on the site.

### 6.3 The contrast obligation the amendment created

`mix-blend-mode: multiply` at up to 0.30 darkens the paper ground. Dark text gains contrast; **`--pietra-testo` (#625D4D, 5.15:1 on clean `--carta`) loses it.** Chapters 01–03 carry `--testo-2` in standfirsts, registry values and captions, directly over this layer.

**Required, blocking:** at each of the eight internal checkpoints (`000`, `012`, `024`, `039`, `052`, `068`, `084`, `100`) and all three reference viewports, sample the darkest composited ground pixel beneath any `--testo-2` run and compute the ratio. **It must remain ≥ 4.5:1.** If any checkpoint fails, the fix is the layer's opacity ceiling, not the text colour — the type is law and the decoration is not.

This check does not exist in `docs/final-qa.md` and it must exist before launch.

### 6.4 §19.15 is broken by the layer, and needs an Art Director carve-out `[AD RULING]`

§19.15 requires reduced-motion and motion-on screenshots to be **pixel-identical at rest**. With the prologue they never can be: motion-on paints a WebGL field; reduced motion paints four AVIF plates at different placements. The amendment authorised the fallback without amending the check, so §19.15 currently fails by construction and will keep failing.

**Proposed resolution, for the Art Director to ratify:** §19.15 parity is measured on **content only** — type, grid, rules, marks, registry, rail state and field colour. The decorative prologue layer is excluded from the diff, on the condition that the static plates sit **inside the same opacity envelope** (§6.2) so the *page* reads at the same weight in both modes. Reduced motion still loses no composition, no hierarchy and no narrative — which is what §14 actually protects.

---

## 7. Hover and focus states — the whole vocabulary

`@media (hover: hover) and (pointer: fine)` wraps every `:hover` rule without exception. Nothing on the site depends on hover to be discoverable.

| Target | In | Out | Property |
|---|---|---|---|
| Interactive text (links, CTA, email, phone, social) | underline `--rigo` → `--indice`, **160ms**, `--ease-registro` | **320ms**, `--ease-uscita` | `text-decoration-color` |
| Rail hover panel | **320ms**, `--ease-registro` | **320ms**, `--ease-uscita` | `clip-path` |
| Rail kernel (state change, not hover) | **160ms**, `--ease-registro` | same | `background-color`, `border-color` |
| Focus ring, all elements | **0ms** | **0ms** | `outline` |

Fast in, slower out — 160 in, 320 out (§12.1). **Nothing scales, nothing lifts, nothing shadows, nothing translates.** `transform: scale` on hover is forbidden site-wide.

**Interactive text must carry a persistent 1px `--rigo` underline at `text-underline-offset: 8px`, `text-decoration-thickness: 1px`, in the resting state** (§11.5). The hover state changes its colour; it does not create it. A link that is only identifiable on hover fails WCAG 1.4.1 and is invisible to touch. See §14, item 4 — this is currently missing entirely and it is a launch blocker.

---

## 8. Mobile motion — does the signature survive at 40px?

**Yes, and the argument is that the signature was never the animation.**

At 390px the rail is 40px — 10.3% of the screen. Inside it, eight 2 × 2px kernels on a 4px pitch, 32px of marks, in a 40px row band. On a 3× display a kernel is six device pixels: a legible mark, not a smudge. What the reader sees is a column of sixty-four dots on the left edge of every screen, filling as they read. That is the entire concept, and it is *more* present on mobile than on desktop, because at 390px the rail is proportionally three times the share of the viewport it occupies at 1440px.

What actually carries a rail is **the count, its permanence, and its position** — a fixed left edge that never scrolls away. None of those is a function of kernel size. The desktop version has a hover panel; the mobile version does not, and the mobile version is not thereby the lesser one, because the panel was never where the meaning lived.

**Cut on mobile:**

- The hover panel. Entirely, at ≤ 1279px. There is no hover on touch and a tap-held tooltip is a worse lie than no tooltip.
- Prologue pointer depth (fine pointers only), and prologue opacity drops one envelope step to 0.18 / 0.12 / 0.22.
- Letterpress bite (< 768px), so the display type has no per-glyph state to maintain.
- Video. There is none, and if one is ever added it is not rendered below 768px at all (§12.8).

**Replaced, not removed:**

- The panel's job is taken by **two** things. First, the **tap label**: on tapping a rail mark, the chapter name appears vertically at the head of the rail, Archivo `wdth 125` 10px, revealed by `clip-path: inset(0 0 100% 0)` → `inset(0)` over **160ms** `--ease-registro`, held, and cleared at **640ms** total. It is confirmation of a navigation the reader has already committed to — which is the honest touch equivalent of a hover preview, and it must be `--testo`, never `--chicco` (§14, item 5). Second, the **live counter**, which on mobile is doing the panel's work permanently: it is always on screen, always saying how much of the record is on file.
- Chapter padding compresses 168 → 64px, so the same eight kernels fill across a shorter chapter. The rail moves *faster* on mobile. This is correct: a denser page should register faster.

**Preserved in full, non-negotiable:**

- All 64 kernels. The count is never reduced, aggregated or hidden.
- The 40 × 40px hit target.
- **The chapter-08 inversion, complete, with the pin.** It is the reason the site exists and it is not a desktop reward. On mobile the 64 gold kernels against black are the payoff for the entire scroll and they must be visible.
- The hero display mask reveal and the registry row reveals.

---

## 9. Performance budget

**Runs on the compositor:** `clip-path` (hero lines, registry rows, rail panel, registration marks, tap label), `opacity` (grain plate, prologue layer). Nothing else is animated in the DOM.

**Runs on paint, deliberately and once:** `background-color` and `color` at the inversion, plus the rail kernels' 160ms colour flips. A full-document repaint is expensive and this site pays for exactly one, at 640ms, on the single moment it was designed around. Sixteen kernels changing colour at 160ms is a trivially small repaint area.

**Runs on the GPU, outside the DOM:** the prologue. Exactly three draw calls, DPR capped 1.5 / 1.25 / 1, framebuffer ≤ 4.2 megapixels and ≤ 4096px per dimension, field LOD 48 / 32 / 24 plants preserving all eight lanes, suspended outside its scroll range and when `document.visibilityState !== "visible"`.

**Never animated, anywhere:** `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `font-size`, `letter-spacing`, `line-height`, `border-width`, `box-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`, `background-image`, `scrollTop`. Also never: `translateY` on text, `scale` on hover, and any property on `<body>` or `<html>` other than the two inversion colours and the grain's opacity.

**Trigger budget.** ≤ 20 ScrollTriggers on the document: 7 chapter fill triggers + 1 chapter-08 pin + 1 prologue + ≤ 8 `once` registry reveals (self-killing). One pin. One continuous scroll-linked animation. One `gsap.matchMedia()`.

**Cleanup expectations — all four are mandatory and all four are currently met:**

1. Every timeline is created inside a single `gsap.context()` and the context is `revert()`ed on unmount.
2. `gsap.matchMedia()` wraps every reduced-motion-conditional timeline and is `revert()`ed.
3. Every DOM listener is registered with an `AbortController` signal and aborted on unmount; every `setTimeout` is cleared.
4. The prologue kills its ScrollTrigger, disconnects its `ResizeObserver` and `IntersectionObserver`, cancels its RAF, releases WebGL buffers / programs / VAOs, and removes its global handle.

Unmount must restore `data-field` to a defined value. A component teardown that leaves the document in `notte` is a defect.

**Floor:** no animation may drop below **55fps** on a 2020 mid-range Android at 390px. If it does, **it is cut, not optimised** (§12.7). The prologue is the only candidate for that cut and it is the layer with the least to lose.

**First paint:** nothing the reader came for is hidden waiting for a trigger. Any initial hidden state (hero clip, registration marks) must be established **before first paint** by a render-blocking mechanism, never in a layout effect that runs after the server HTML has painted (§14, item 6).

---

## 10. Reduced motion — the composed alternative

`prefers-reduced-motion: reduce` is a different composition of the same narrative, not the same page with the animations switched off. A blanket `* { animation: none !important; transition: none !important; }` is a defect — it would kill the inversion's colour semantics, which is the one thing §14 of the art direction exists to protect.

| Element | Reduced-motion behaviour |
|---|---|
| Hero display line | **Off.** Present, full opacity, from first paint. |
| Registry rows | **Off.** Present from first paint. |
| **The rail** | **Preserved, discrete.** Kernels flip at **0ms** as their thresholds are crossed. Fill logic, thresholds and the 64-count are byte-identical to the motion-on version. The signature loses its tween, not its meaning — and the meaning was always the count. |
| **The counter** | **Preserved, identical.** It was always 0ms. |
| **Chapter-08 inversion** | **PRESERVED, INSTANTANEOUS.** Rail, field, grain, chain lines, bite and registration marks all change at **0ms**, together. The 160ms rail lead collapses to 0. The destination is pixel-identical. Removing, softening, or replacing it with a section that was always dark is a defect, not an accommodation. |
| **The inversion trigger** | **Still kernel 64.** The chapter-08 fill must remain scroll-driven (`top top` → `bottom bottom` on the unpinned section) so kernels 57–64 fill across the chapter and the 64th still fires the event. Firing on section entry is wrong and is a §19.15 parity failure — see §14, item 2. |
| **The pin** | Removed. Chapter 08 becomes a normal-flow 240svh section. |
| Registration marks | Present at the corners immediately, no clip reveal. |
| Rail hover panel | Opens on hover/focus with **0ms** clip. Content and geometry unchanged. |
| Tap label | 0ms in, still held 640ms, still cleared. A hold is not motion. |
| Hover states | Colour changes only, 0ms. |
| **The prologue** | Renderer switches to `static`, canvas `display: none`, no WebGL context created, no ScrollTrigger registered, no pointer listener attached. Four absolute AVIF plates take over as section backgrounds at `z-index: 0` — dispersion (hero), plant (ch01), incisions (ch02), incisions with a masked release (ch03) — `aria-hidden`, `alt=""`, no intrinsic height, no CLS, inside the §6.2 opacity envelope. The prologue's *argument* survives as four still plates; only its animation is gone. Save-Data and no-JS take the same path. |
| Grain, chain lines, letterpress bite | Unaffected. They never animated. |
| Scroll | Native, as it already is. |

**Test (§19.15, as amended by §6.4):** emulate reduce, screenshot chapters 01 and 08 at rest, diff against motion-on with the decorative layer excluded. Content, grid, colour and rail state must be identical. If any element is missing, mis-positioned, at a different opacity, or if chapter 08 is not night, reduced motion was implemented as "animations off".

---

## 11. Video

**No video ships.** The single sanctioned loop (§12.8) is not in the build and its chapter carries typography and the data column instead — which is the stronger outcome and should stay. If a video is ever added: chapter 06 only, one only, 5:8, ≤ 6.4s, ≤ 2.4MB, `muted` `playsInline` `loop` `preload="none"`, poster required, autoplay only at ≥ 50% in viewport and only without `prefers-reduced-motion`, paused off-screen via IntersectionObserver, not rendered at all below 768px, no controls, no play button, never behind text, never full-bleed.

---

## 12. Implementation checklist

Timing and easing:

- [ ] Every duration in compiled CSS and in JS resolves to 0 / 160 / 320 / 640ms. No literal timing value exists outside `src/lib/motion.ts` and `src/styles/tokens.css`.
- [ ] Every sequencing offset is a whole multiple of 160ms.
- [ ] No runtime `timeScale` other than 1 (§5.3).
- [ ] Exactly three `cubic-bezier` curves plus `linear`. No y outside [0,1]. No GSAP `back` / `elastic` / `bounce`.
- [ ] `--ease-uscita` appears on exits only: panel dismiss, hover-out, marks clipping out on reverse.
- [ ] `--ease-inversione` appears on the inversion and nowhere else.
- [ ] `linear` appears only on scroll-linked properties.

The rail:

- [ ] 64 kernels present in the DOM at first paint, before JS.
- [ ] Fill is `floor(progress × 8)` per chapter, `top top` → `bottom bottom`, fully reversible, no hysteresis on the kernels.
- [ ] Scrolling to the bottom leaves exactly 64 filled (§19.11).
- [ ] Counter counts completed rows, changes at 0ms, reads `08/08` in the same frame as the inversion.
- [ ] Panel animates `clip-path`, opens on `:focus-visible`, is `aria-hidden`, does not exist ≤ 1279px.
- [ ] Tab order 01 → 08; focus ring 1px `--indice`, 4px offset, 0ms, on the 40px band.
- [ ] Hit target ≥ 40 × 40px at 390 / 768 / 1440.

The inversion:

- [ ] Trigger is kernel 64 and nothing else. Grep for `progress >`, `IntersectionObserver` and section-boundary triggers near chapter 08 returns nothing.
- [ ] Forward: 0 / 160 / 800, total 1120ms, durations 160 / 640 / 320.
- [ ] Dead-band: arms at 0.875, releases below 0.750. Oscillating one scroll notch at the boundary produces zero field changes.
- [ ] Reverse: 480ms, marks → field → rail, all vocabulary durations.
- [ ] Nothing moves, fades, scales or blurs at any point of either direction.
- [ ] Exactly one pin, exactly 100vh, `pinSpacing: true`.

The prologue:

- [ ] Zero draw calls and zero RAF outside `hero top → #otto-file top top`.
- [ ] Opacity never exceeds 0.30.
- [ ] `scrollHeight` identical with the layer present and absent, at all five QA widths.
- [ ] Forward and reverse render hashes identical at all eight checkpoints.
- [ ] §6.3 contrast sampling passes at ≥ 4.5:1 at every checkpoint and viewport.
- [ ] Pointer returns to centre in ≤ 160ms; gated 0.34–0.44 and ≥ 0.76.

Reduced motion:

- [ ] No blanket `!important` animation kill.
- [ ] `gsap.matchMedia()` around every conditional timeline.
- [ ] The inversion fires on kernel 64, not on section entry.
- [ ] §19.15 content-only diff is clean for chapters 01 and 08.

Lifecycle:

- [ ] `gsap.context().revert()`, `matchMedia().revert()`, `AbortController.abort()`, `clearTimeout`, `ScrollTrigger.kill()`, WebGL teardown — all on unmount.
- [ ] `data-field` is restored to a defined value on teardown.
- [ ] No horizontal scrollbar at 390 / 768 / 1280 / 1440 / 1920 (§19.18).

---

## 13. Failure modes — how you know the motion is wrong

Each of these means the motion has failed, regardless of what any check says.

1. **The counter reaches `08/08` before the field inverts.** The interface has declared the record closed while it is open. This one is fatal to the concept, not merely to the motion.
2. **The field flickers at the chapter-08 boundary.** A reader nudging the scroll wheel replays the site's only chromatic event as a strobe. Explicitly forbidden by `content-plan.md`.
3. **Anything fades up.** One `opacity: 0` + `translateY` on a text element and the site is a template with a good grid.
4. **A second thing is continuously scroll-linked.** The rail stops being the mechanism and becomes one effect among several.
5. **A second pin.** The chapter-08 interruption stops being an interruption.
6. **The prologue is still visible at chapter 04.** It has become a background instead of a prologue, and §19.16 fails.
7. **The prologue drifts when the reader stops scrolling.** It has acquired a time base and become ambient decoration.
8. **The inversion moves something.** Any translation, scale or blur turns a change of state into a transition, and the art direction rejects the build.
9. **Reduced motion loses the night.** The reader with the setting on has been given a different site.
10. **A reader can tell that pointer depth exists.** The cap has been exceeded.
11. **Reading is delayed by anything.** Text hidden at first paint waiting for a trigger, a scroll-jack, a smooth-scroll on a rail jump.
12. **Any hover state scales, lifts or shadows.**
13. **The rail is only legible on desktop.** The signature has become a desktop flourish.
14. **You cannot state the sentence an animation is speaking.** Cut it.

---

## 14. Deviations found in the shipped implementation

Itemised against what I would have specified. Verdicts are binding.

---

**1. No dead-band on the inversion — `CORRECT THIS`. Launch blocker.**
`setSignature` toggles on `previousStates[63] !== "pending"`, a symmetric threshold at pin progress 0.875. One scroll notch above it reverses a 1120ms timeline; the next replays it. `content-plan.md` §6/ch08 forbids exactly this. **Change:** latch the field state. Arm at ≥ 0.875 (kernel 64, unchanged — the count is still the event). Release only below **0.750**. Kernels continue to unfill immediately at their own thresholds; only the field latches. See §5.2.

**2. Reduced-motion inversion fires on section entry, not on kernel 64 — `CORRECT THIS`. Launch blocker.**
The reduced-motion branch creates a trigger with `start: "top bottom"` and `onEnter: () => updateChapter(7, 1, false)`. Chapter 08's top meeting the viewport *bottom* means the page goes night while **chapter 07 still fills the screen** — the reader watches the previous chapter invert, and chapters 01–07 render on `--notte` where `--pietra-testo` is 2.99:1. It also fills kernels 57–64 in one jump, so §19.11 and §19.15 both diverge from the motion-on build. **Change:** keep the reduced-motion branch scroll-driven — `start: "top top"`, `end: "bottom bottom"`, same `floor(progress × 8)` fill — and let kernel 64 fire the event as it does everywhere else. Only the pin and the durations differ under reduced motion; the trigger never does.

**3. Reversal runs at a fractional `timeScale` of 1.75× — `CORRECT THIS`.**
The accessibility reasoning is correct and I adopt it: the 2.99:1 transit is real and §12.6's "same timings" loses to §4.3. The mechanism is wrong. `1120 / 640 = 1.75` produces observable durations of **91ms, 183ms and 366ms**, none of which is in the vocabulary; §19.5's grep passes only because the value is computed rather than written. It also plays `--ease-registro` backwards on the marks, where `--ease-uscita` exists for elements leaving. **Change:** replace with the 480ms lattice reverse in §5.3 — marks out 0/160ms/`uscita`, field at 160/160ms/`inversione`, rail at 320/160ms/`registro`. Requires a `data-inversion="reversing"` hook so the field's `transition-duration` is `--dur-1` on the way back. Net result is *faster* than today and entirely legal.

**4. No hover, focus or resting state on any interactive text — `REJECT`. Launch blocker.**
There is not one `text-decoration` rule, not one link `:hover`, and not one 160ms colour transition on any link, CTA, email, phone or social item on the site. §11.5 requires a persistent 1px `--rigo` underline at `text-underline-offset: 8px` with a `--indice` hover/focus state over 160ms; `content-plan.md` requires the `Richiedi disponibilità` CTA to carry a rule beneath it and the contact links to underline on hover. As shipped, the only conversion on the site is visually indistinguishable from body copy — a WCAG 1.4.1 failure and a straightforward usability one. **Change:** implement §7's table in full. The resting underline is not optional; the hover state changes its colour, it does not create it.

**5. Mobile tap label is `--chicco` — `REJECT`.**
`.rail__touch-label { color: var(--indice) }` makes `--chicco` the text colour of a UI label, which §4.4 illegal-use 3 forbids outright and which turns the index colour into a **state colour** — the precise failure mode Invariant 2 was written to prevent. **Change:** `color: var(--testo)`. The label's job is confirmation, not indexing.

**6. Initial hidden states are established after first paint — `CORRECT THIS`.**
`ExperienceMotion` sets `data-experience="enhanced"` (which applies `clip-path: inset(50%)` to the registration marks) and flips chapter 08 from its server-rendered `notte` to `giorno` inside a `useLayoutEffect`. Both run after the server HTML has painted. On slow hydration the reader can see chapter 08 in night before it is earned, and the hero line can paint, re-clip and replay. §12.7: *nothing on first paint is hidden waiting for a trigger* — and equally, nothing already painted may be retracted. **Change:** set `data-experience` and the day field from a small render-blocking inline script in `<head>`, so CSS owns the initial state and GSAP only plays it. If that is not shipped, drop the hero reveal entirely — the composition already carries the hero.

**7. Grain is extinguished at night instead of switching to `screen` — `CORRECT THIS`.**
`html[data-field="notte"] body::before { opacity: 0 }`. §12.6 specifies the grain plate switches `multiply` → `screen` and steps to its night value over 640ms; §10.1 makes the material argument that night type is *emitted* rather than printed, which requires a substrate to be emitted onto. Setting it to zero leaves chapter 08 as a flat black plane and loses the one texture cue that distinguishes the night field from a dark section. The root cause is that `body::before` carries no `mix-blend-mode` at all, so a light paper plate at night would read as fog. **Change:** add `mix-blend-mode: multiply` on day and `screen` on night (a 0ms discrete switch — blend modes cannot tween), and give night a non-zero opacity in the §12.6 ratio. `[AD RULING]` on the literal, since the implementation uses an AVIF plate at 0.16 rather than the §10.1 SVG at 0.045; the day:night ratio of 0.045 : 0.030 implies **0.107** at night.

**8. The 800ms offset — `RATIFIED`.** No change. See §5.1 for the ruling and the general rule it establishes.

**9. The prologue — `RATIFIED, BOUND`.** No change to what it does. See §6 for the ruling and §6.2 for the twelve rules that now govern it. Three riders:
- the "Motion Designer: FINAL GO" in `docs/signature-motion.md` is void and is replaced by §6;
- the §6.3 contrast sampling is a **new blocking QA item** that does not exist in `docs/final-qa.md`;
- the §6.4 §19.15 carve-out requires the Art Director's explicit ratification, because as written the check now fails by construction.

**10. Doc drift between the amendment and the code — `CORRECT THIS` (documentation only).**
The art-direction amendment says the layer sits "beneath the Hero and chapters 01–02"; `signature-motion.md` says "Hero and chapters 01–03"; the code releases across chapter 03's entrance (`top 76%` → `top top`). The code is right and both documents should say: **Hero and chapters 01–02 in full, releasing across the entrance of chapter 03, absent from `#otto-file top top` onward.** `signature-motion.md` also describes four stages where the renderer has six (`dispersione`, `attrazione`, `pannocchia`, `pianta`, `campo`, `registro`).

**11. Rail counter type size — `RATIFIED` with an `[AD RULING]` flag.**
§3.6 assigns `--type-num-lg` (64px DM Mono) to "the `08/08` / `64` counters". The rail cover renders at `--type-data` (11px). 64px cannot physically exist in a 40–64px rail, and §3.7.8 forbids display type in the rail entirely. I ratify 11px on motion and interaction grounds — it is registry meta, not a display counter — but the type assignment is the Art Director's to confirm.

**12. Prologue pointer return takes ~716ms — `CORRECT THIS` (low severity).**
The pointer lerp runs at 0.16 per frame with a 0.001 exit threshold: roughly 43 frames, ~716ms at 60fps. That is time-driven, so it is a duration, and it is both outside the vocabulary and longer than the longest value in it. **Change:** return to centre in **≤ 160ms** — either a 160ms `--ease-registro` tween or a lerp factor of ~0.5 with the same exit threshold.

**13. Reduced-motion preference is read once at mount — `CORRECT THIS` (low severity).**
`prefersReducedMotion` is captured as a boolean inside the GSAP context. `gsap.matchMedia()` correctly handles the reveals, but the `setSignature` branch and the chapter-08 trigger branch do not respond to a mid-session OS change. **Change:** move both branches inside the existing `gsap.matchMedia()` so the whole motion layer re-composes on preference change.

**14. Chapter fill window, `top top` → `bottom bottom` — `RATIFIED`.** Exactly §5.6. No change.

**15. Stepped fill via `floor(progress × 8)` with a 160ms colour transition — `RATIFIED`.** The step is the concept, the 160ms is §12.1's "kernel fill". No change.

**16. The counter counts schede READ — `RATIFIED`, and it is better than what I would have specified.**
I would have specified a count of filled kernels, which would have read `57/64` at the moment of truth and made the readout a progress bar. Counting completed rows makes `08/08` and the inversion literally simultaneous, and keeps the component out of §18.30's ban. Adopted into the spec as §3.3.

**17. Only registry rows and the hero line reveal; prose does not — `RATIFIED`, and adopted as a principle.**
I would have accepted per-chapter title reveals. The implementation's restraint is better: *prose is present, evidence registers.* It is now §1's corollary and §4's rule. No change.

**18. Native scroll, no Lenis — `RATIFIED`.**
§12.7 specifies a Lenis config; §14 disables it under reduced motion anyway. Native scroll is strictly better here: no smoothing to fight the scroll-position-pure prologue, no touch branch, no reduced-motion branch, no library. **The Lenis clause in §12.7 is moot and should be struck.**

**19. Registration marks at the pinned scene's corners, not the whole night field's — `RATIFIED`.**
The marks sit 16px inside `.chapter--custody__scene` (100svh), not the 240svh section. That is correct: a printer's registration mark frames a **plate**, and the pinned viewport is the plate. `inset(50%)` → `inset(0%)` draws each cross from its own centre, which is the right gesture for the mark. No change.

**20. Registry reveal at `top 76%`, `once: true` — `RATIFIED`.** 24% viewport entry, never re-fires on scroll-back. Exactly §12.4. Row counts per chapter are 3–6, inside the 8-item stagger cap. No change.

**21. Static plate count and placement — `RATIFIED`.** Four placements (hero dispersion, ch01 plant, ch02 incisions, ch03 incisions-release), three AVIF sources, `aria-hidden`, `alt=""`, no intrinsic height, masked release ending before chapter 03's eight-cell proof. Matches `signature-motion.md`. No change.

**22. Skip-link `transform: translateY(-120%)` — `RATIFIED`.**
It is a static positioning device with no transition attached, not an animation. §12.5's ban is on *animating* `translateY` on text. No change. Do not add a transition to it.

---

### Observed, outside motion scope — passed to the Frontend Lead and the Art Director

Not my verdicts to give, but found while reading the implementation and each is a §19 check that will fail:

- **No photography ships.** Not one `<img>` or `<video>` in the content layer; the entire §9.7 asset set is absent and the only images on the site are the three prologue plates. §19.12 has nothing to census and every chapter's specified visual role is unfulfilled. This is the largest gap in the build.
- `.chapter--royal__data { border-bottom: 1px solid var(--indice) }` puts a `--chicco` rule in **chapter 02**. §5.5 permits `--chicco` rule marks in chapters 03 and 05 only.
- `.rail__cover` and `.rail__touch-label` use `left: 12px` on mobile — not a multiple of 8, and not one of §6.1's four exemptions. §19.1 will flag it.
- `body::before` uses an AVIF paper plate at 0.16 rather than §10.1's inline `feTurbulence` SVG at 0.045, and **no chain lines exist** (§10.2). §12.6's "chain lines removed at 0ms" therefore has no subject.

---

## 15. Summary of required changes before launch

**Blocking:** items 1, 2, 4. Plus the §6.3 contrast sampling, which has never been run.
**Required:** items 3, 5, 6, 7, 12.
**Required ruling:** §6.4 (§19.15 carve-out) and item 11, both from the Art Director.
**Documentation:** items 9 (void sign-off) and 10.

Everything else is ratified as shipped.
