# Brand signature — proposal

**Date:** 2026-07-28
**Status:** **PROPOSAL. Nothing in this document has been implemented.** It is written to be reviewed against `docs/art-direction.md` before a single line is built.
**Scope:** where the two marks go, at what size, in which value, and what job each does in the narrative. Nothing else.
**Authority consulted:** `docs/brand-alignment.md`, `docs/art-direction.md` §4 / §5 / §6 / §7 / §11 / §12 / §18, `docs/art-review-immagini.md` §7–§9, `docs/motion-spec.md` §6, and the built `Header.tsx`, `ContactFooter.tsx`, `Chapters.tsx`, `components.css`, `tokens.css`.

The problem, restated so the proposal can be judged against it: **twenty seconds in, a visitor still does not know who made this.** The site is a beautiful register about maize. It is not yet recognisably *Il Giardino delle Esperidi*.

---

## 0. The one rule that generated every decision below

Before the placements, the principle they all obey, because it is what separates "identity" from "a logo dropped on the layout":

> **The mark never asserts anything the type has not already said. It is always placed beside a sentence that names it.**

| Placement | The sentence already on the page |
|---|---|
| Header | `IL GIARDINO DELLE ESPERIDI` — `nav.wordmark`, live Archivo, already there |
| ch07 | *"Le referenze di mais escono con il marchio **Mais Rosso Co.**"* — already in the ch07 body |
| ch08 | *"**Il Giardino delle Esperidi** è il frutteto di Hera…"* — the myth's first clause |
| Footer | `piede.copyright` — the legal name |

A mark that illustrates a sentence is a **citation**. A mark that arrives alone is a **badge**. This site is a register: it cites. Every placement below sits in an empty grid cell adjacent to the sentence that authorises it, and none of them introduces a new claim, a payoff, a tagline or a strapline.

The second rule, which follows from the first: **the marks are single-ink**. Both are rendered as alpha masks and painted with an existing token. Neither ships as a colour image. This is what a printer's device on a document looks like, it costs zero new hex values (§4.1 / §18.27), and it means the whole brand layer is invisible to the `--chicco` budget.

### Verification of the tree mark itself

`assets/brand/logo/Logo_nero.png` was downloaded from the *old* public site, which on its own is weak provenance. It is corroborated on current physical goods and I checked both:

- The **Mais Rosso Co. seal** on the 2026 packaging carries the Esperidi tree as a small secondary seal inside its right-hand field — visible in `src/app/icon.png`, the 400 dpi render taken off brochure p. 1.
- The **Amaro del Dottore** bottle in the brochure p. 4 photograph carries the same tree (recorded in `brand-alignment.md` §2).

The mark is current, it is on the goods, and it may be used. Measured, not assumed: the file is 743 × 1032 with real alpha; ink occupies y 28–1004, x 32–717. It contains **three** separable elements — roundel (y 28–724, 697 px), `Il giardino delle` (y 763–862), `ESPERIDI` (y 882–1004).

**Only the roundel is used.** The wordmark inside the file is never placed, anywhere, at any size — see §Rejected #11.

---

## 1. Position and role of each mark

Four placements. Sizes escalate to ch08 and return to the opening size at the foot, so that **the same mark at the same size opens and closes the document**.

```
  40px          128px          192px          40px
 header   →     ch07     →     ch08     →    footer
atmosphere     stamp         signature     sign-off
```

### 1.1 Header — the tree roundel, 40 × 40, `--pietra`

| | |
|---|---|
| **Asset** | roundel only, alpha mask, no wordmark |
| **Size** | **40 × 40** desktop (`--space-5`, in the token set) · **32 × 32** tablet · **absent** below 768 |
| **Value** | `--pietra` #8C8779 — §4.3 assigns this token to *"rules, hairlines, disabled, non-text marks"*. A mark is a non-text mark. This is the token's declared job. |
| **Position** | `grid-column: 1 / 2; justify-self: end; align-self: start`. Right-aligned to the column-1 edge, so the gap to the wordmark **is the gutter** — 24px desktop, 16px tablet. No new spacing value. |
| **Semantics** | `aria-hidden="true"`. The accessible name is the wordmark text beside it. |
| **Motion** | none. |

**Why column 1.** §5.5 gives column 1 exactly one role: *"display-type optical overhang… chapter numerals, which may clip left behind the rail."* Column 1 is the site's hanging margin. Putting the mark there means **the wordmark does not move**: it keeps `grid-column: 2 / 5` and stays on the hard left text axis (§7.1), and the stems still align (§7.2). An inline mark before the text would have pushed the wordmark off the axis and that alone would have been a rejection.

**Why it is not a protagonist.** Three measurements, not adjectives:

- 40 × 40 = **1,600 px² = 0.12%** of a 1440 × 900 viewport.
- `--pietra` on `--carta` is **2.80 : 1**. It is the quietest legal value on the day field. (2.80:1 fails text contrast; irrelevant — the mark is `aria-hidden` and wholly redundant with adjacent text, so WCAG 1.4.11 does not apply. This is why it may be this quiet.)
- The header is `position: absolute`, not fixed. It sits in the first viewport and **scrolls away**. The mark greets and leaves. It is not present for chapters 02–08 at all.

**Rendered check, done not estimated.** I rendered the roundel at 24 / 32 / 40 / 48 / 64 / 96 / 256 px against `--carta`. At **24px it is illegible mush**; at 32px it is a blob; **40px is the floor at which it reads as a tree in a circle**. This kills the "make it smaller to be discreet" instinct: below 40 the mark stops being a mark and becomes a smudge, which is worse than absent. 40px in `--pietra` is the smallest honest version. If the Art Director judges 40px too faint at 1× DPR, the fallback is 48 × 48 (still a multiple of 8, component-internal per §6.1) — **not** a darker value, because darkness is what makes it a protagonist.

**Why no mark below 768.** The mobile wordmark moves to `grid-column: 1 / 6` (§5.3 — the text axis moves to column 1 on mobile). There is no hanging column left, only the 16px rail→field pad, which is 16px wide and already spoken for by the display overhang. Every alternative — inline before the wordmark, stacked above it, moved to the right — either breaks the text axis or adds a line, and **the mobile vertical rhythm was just finished and is out of bounds**. The rule that results is clean and already exists in the system: *graphic marks live where the two-column register lives; below 768 the site is typographic.* §8.5 already drops every `REPERTO` on mobile for the same reason. The cost is stated honestly in §5.

### 1.2 ch07 — the Mais Rosso Co. seal, 128 × 128, `--pietra`, single ink

| | |
|---|---|
| **Asset** | the seal, reduced to one ink at luminance threshold **T = 0.60**, alpha mask |
| **Size** | **128 × 128** desktop · **96 × 96** tablet · **absent** below 768 |
| **Value** | `--pietra` |
| **Position** | `grid-column: 6 / 8; grid-row: 1; justify-self: end; align-self: end` — the registry column pair, bottom-aligned to the chapter head, right-aligned to the column-7 edge |
| **Semantics** | `aria-hidden="true"`. The body copy names the brand. |
| **Motion** | none. |

**Why there.** `.chapter--products__head` is `grid-column: 2 / 6; grid-row: 1`. **Columns 6–7 of row 1 are empty.** The seal occupies a void that already exists; it displaces nothing, pushes nothing, and reflows nothing. Bottom-aligned, its baseline agrees with the foot of the chapter head, and the next thing down the page is the matrix's 1px `--rigo` rule and then the register of products. It reads as **a stamp at the head of a ruled page** — which is exactly "the natural landing of the story onto the products". Column 8 is untouched (§5.5).

**The single-ink reduction, and what it removes.** I built and looked at it. Thresholding the 400 dpi seal at relative luminance T = 0.60 and painting the residue in `--pietra` drops the cream ground entirely — so there is **no disc, no card, no fill**, which keeps §18.8 ("no element whose background-color differs from its parent's") intact. What survives at 128px and reads clearly:

> `MAIS ROSSO Co.` · `OTTOFILE` · `varietà "ALBESE"` · the two cobs

Every one of those is a verified fact already on the site. What **drops out** at T = 0.60 is the small `GOURMET PREMIUM` sub-roundel. That is not an accident I am glossing over — it is the reason to prefer T = 0.60 over the softer thresholds I also tried. *Gourmet premium* is a marketing superlative, it is exactly the register this project has refused since day one (`brand-alignment.md` §3, §5), and §18.29 rejects the build outright for setting that class of word in display type. **A graphic is not exempt from the tone rule because it is a graphic.** The reduction removes the slogan and keeps the facts, which is the same discipline applied to a picture instead of a sentence.

**128px is the size at which the ring text reads.** Rendered and checked at 80 / 96 / 128 / 160: at 80 it is a faint disc, at 96 the name begins to resolve, at 128 it is a legible stamp, at 160 it starts to look like a badge. 128 it is, and 96 on tablet where the column pair is narrower.

**Row-height check, blocking before build:** the ch07 head is label (16) + `t-d2` title + 40 + `t-lead` standfirst + 40 ≈ 240px at desktop, so a 128px seal sits inside row 1 without growing it. This must be measured, not assumed. **If the seal would grow row 1, the seal shrinks — the row does not.** Growing the row is a rhythm change and is out of bounds.

### 1.3 ch08 — the tree roundel, 192 × 192, `--carta`

| | |
|---|---|
| **Asset** | roundel only, same mask as the header |
| **Size** | **192 × 192** desktop · **144 × 144** tablet · **absent** below 768 |
| **Value** | `--carta` via `color: var(--testo)` on the night field — **not** `--esperide`, see §Rejected #3 |
| **Position** | `.chapter--custody__body`, `grid-column: 6 / 8; grid-row: 1; justify-self: end; align-self: start` |
| **Semantics** | `aria-hidden="true"`. |
| **Motion** | none. |

**This is the placement that earns the whole proposal.** The myth on this page reads *"Il Giardino delle Esperidi è il frutteto di Hera. Vi cresce un boschetto di meli che producono mele d'oro."* The mark is **a tree in a circle**. Facing that paragraph, the logo stops being a logo and becomes the illustration of the sentence beside it — a woodcut facing a page of text, which is the exact editorial register of this site. Nowhere else on the site does the mark have a reason this good, and it is the reason the client is right that ch08 is where the tree may speak up.

**The column it sits in is already a column.** `.chapter--custody__myth` is `grid-column: 2 / 6; grid-row: 1`. `.chapter--custody__final` ("Il registro resta aperto", `--esperide`) is `grid-column: 6 / 8; grid-row: 3; align-self: end`. So cols 6–7 already form a vertical channel with a signature line at its foot and **nothing at its head**. The tree fills the head of that channel. The result is a page: myth on the left, mark top-right, signature bottom-right. No cell is displaced, no row grows, `1fr` slack absorbs it.

**Why 192 and not 256.** I sized it at 256 first. Cols 6–7 are 310px at desktop; 256 fills 83% of the pair and starts to read as an illustration plate competing with the myth. 192 fills 62% and leaves the column's air intact. The myth is set in `--esperide` — the only paragraph on the entire site in gold — and it must stay the loudest thing in its own chapter. Cream at 15.37:1 is very present; gold at 8.74:1 is the *event*. Hierarchy is by role, not by contrast ratio, and 192px keeps the roles the right way round.

**This amends `art-review-immagini.md` §8, and I am flagging it rather than doing it quietly.** §8 rules ch08 *"Invariato. Zero fotografia, per legge"* — and its stated reasoning is entirely photographic: `multiply` does not work on a dark ground, a second image treatment would be needed, the closure must stay typographic. **None of that applies to a one-ink alpha mask.** It needs no §9.5 grade, no blend mode, no second treatment; it is line art painted with an existing token, closer to the four registration marks than to a photograph. But §8 says "invariato", and a section documented as unchanged does not get changed by me. **Art Director ratification required.**

**Below 768: absent.** `.chapter--custody__body` is `min-height: auto` on mobile (`components.css` :1595) — there is **no slack left**. The mobile rhythm audit removed it deliberately. A mobile tree here would add ~232px of real height to a block that was just tightened. Not done.

### 1.4 Footer — the tree roundel, 40 × 40, `--carta`

| | |
|---|---|
| **Asset** | roundel only, same mask |
| **Size** | **40 × 40** at every breakpoint |
| **Value** | `--carta` via `color: var(--testo)` |
| **Position** | first flex child of `.contact__legal`, before `piede.copyright`, `align-self: center` |
| **Motion** | none. |

`.contact__legal` is already a `display: flex; flex-wrap: wrap; justify-content: space-between` row holding the copyright and the privacy link. The mark joins that row. It is **the same 40px it was in the header** — the reader meets the mark at the top of the sheet and signs off with it at the bottom, at identical scale. That symmetry is the entire argument for the size, and it is why the footer mark is *not* escalated.

It is a **sign-off**, not a letterhead: it sits *with* the legal line, on the same baseline row, at the size of a rubber stamp — not above the block, not centred, not in its own band. A mark that opens a block is a letterhead. A mark inside the last line is a signature.

**Mobile cost, declared:** on a 334px field the legal row will wrap and the mark takes its own line, adding roughly 48px **at the extreme bottom of the document, below every other element**. Nothing above it reflows. If even that is unacceptable against the rhythm audit, the offset is available for free by moving `.contact__inner`'s bottom padding one token down (`--space-5` → `--space-1` on mobile, `--space-8` → `--space-3` on desktop), which also pays for the terminal rule in §3. The Frontend Lead lands the arithmetic; the placement does not change either way.

### 1.5 Asset production

One new step in `scripts/build-brand.mjs`, two files, both **alpha-only** so the colour is always a CSS token and a wrong hex is structurally impossible:

| File | Source | Build |
|---|---|---|
| `public/images/marchi/esperidi-albero.png` | `assets/brand/logo/Logo_nero.png` | `extract({left: 26, top: 22, width: 697, height: 708})` → resize 576 × 576 (3× the 192px use) → alpha channel only |
| `public/images/marchi/mais-rosso-sigillo.png` | brochure p. 1 @ 400 dpi, `crop {left: 918, top: 524, width: 1525, height: 1525}` (the crop `build-brand.mjs` already uses for the favicon) | resize 384 × 384 (3× the 128px use) → `alpha = clamp((0.60 − L) / 0.60) × a`, L = relative luminance → alpha channel only |

Consumed as `mask-image` with `background-color: currentColor`, wrapped in `@supports (mask-image: url()) or (-webkit-mask-image: url())` so a failure yields *nothing* rather than a solid square. Both registered in `src/content/media.ts` alongside the photographic slots, so the marks obey the same rule as every other image on the site: **components receive a key, never a path.**

`src/app/icon.png`, `apple-icon.png` and `opengraph-image.png` are unchanged.

---

## 2. Additional `--chicco` uses and the 2% budget

### 2.1 The proposal adds none. The number is zero.

**Not one pixel of `--chicco` is introduced by this sprint.** Both marks are `--pietra` on day and `--carta` at night. This is not caution, it is the correct answer to the brief's own constraint: the client approved `--chicco` for *"index, active, primary, or 'look here' moments"*, and **a company mark is none of those.** A mark says "who"; an index says "which one". Painting the tree or the seal in `--chicco` would make the kernel red a **brand colour**, which is Invariant 2 inverted, and §4.4 illegal uses #1 (fill) and #4/#5 (repetition converting index to state) both apply. There is no version of that I would sign.

### 2.2 The measured inventory, at 1440 × 900 = 1,296,000 px² (budget 25,920 px²)

Taken from an exhaustive grep of `var(--indice)` in `src/styles/` — exhaustive because components consume aliases and never raw tokens (§4.2). Glyph areas use §4.4's own convention (advance × font-size), which is what produced its published "numeral `03` at 32px ≈ 1,220 px²".

| # | Use | Where | Area | % of viewport |
|---|---|---|---|---|
| 1 | rail active row, 8 × 4 × 4 | every chapter | 128 px² | 0.010% |
| 2 | `.site-header__link` 1px underline, "Contatti" ≈ 76px wide | hero viewport only | ≈ 76 px² | 0.006% |
| 3 | ch03 index rules, 8 × 2 × 143 | ch03 | 2,288 px² | 0.177% |
| 4 | `.chapter--conservation__year` `2007`, DM Mono 64px × 4 glyphs | ch05 | ≈ 9,830 px² | 0.758% |
| 5 | `.chapter--stone__cut` `/`, DM Mono 64px × 1 glyph | ch06 | ≈ 2,458 px² | 0.190% |
| 6 | `referenze-collettiva` retained 0–25° chroma | ch07 | ≈ **194,400 px²** | **≈ 15%** |

**Worst UI viewport today: ch05 = 9,830 + 128 = 9,958 px² = 0.77%.** Comfortably inside budget.
**After this proposal: 0.77%. Identical.** No row is added to that table.

### 2.3 The ch07 collision — how I deal with it rather than avoid it

Row 6 is the open wound recorded in `brand-alignment.md` §4.2 (b): the definitive packaging photograph carries 18.6% of its own frame in retained kernel-window chroma — the pack's terracotta band, which sits inside the 0–25° hue window the §9.5 grade holds at full saturation — which is **≈ 15% of the reference viewport against a 2% ceiling.**

Three things to say, in order of usefulness:

1. **My seal does not touch it.** `--pietra` contributes exactly 0 px² of `--chicco`. The seal at row 1 and the LASTRA at row 3 will co-occur in one 900px viewport, and it does not matter, because the seal has no chroma to add. **I do not need to avoid that viewport and I have not designed around it.**

2. **A full-colour seal would have made it materially worse, and that is the decisive reason it is refused.** I measured the seal: **23.1% of its opaque pixels fall in the 0–25° window at saturation > 0.25** (21.7% above 0.45). At 128 × 128 that is ≈ 3,800 px² of new kernel-window chroma — 0.29% on its own, which is survivable — but it would put **two independent red-orange sources in one viewport**, one of them a graphic device rather than a photograph, and that is the moment `--chicco` stops being an index and becomes the company's colour. Independently fatal: the seal contains at least four values outside the seven, including the **petrol blue** (≈ `#20647D`) that `brand-alignment.md` §6 refused as an eighth token. §18.27 is categorical. Placing the seal in colour would import that refusal straight back into the page as page graphics, which is worse than a hex in `tokens.css` because it is invisible to a grep.

3. **I recommend closing §4.4's own prescribed mitigation while this sprint is open,** because it is a one-line CSS change that has been sitting unresolved: *"on the chapter where a full-frame kernel macro appears, the rail's active row reverts to `--inchiostro`."* Applied to ch07 that removes 128 px².

> **Net `--chicco` delta of this proposal: −128 px².**

That is the honest headline. The brand layer costs nothing chromatically, and the one change it recommends *reduces* the total. Row 6 itself is not resolved by anything here — it is a photograph-versus-ceiling question that belongs to the Art Director, and it is still open.

---

## 3. `--esperide` in the footer

**Proposal: one 1px `--esperide` rule, spanning columns 1–7, placed *below* the legal line — the last inked pixel on the site.**

```css
.contact__legal {
  border-bottom: 1px solid var(--indice);   /* --esperide on the night field */
  padding-bottom: var(--space-5);
}
```
…extended to `grid-column: 1 / 8` for the rule alone, so it starts at the rail's edge and stops at the reserved void.

### Why below and not above

The obvious move is to upgrade the existing `border-top: 1px solid var(--rigo)` on `.contact__legal` to gold. **That is precisely the letterhead the client rejected.** A gold rule *above* the copyright block announces "here begins the institutional matter" — it introduces a section. A gold rule *below everything*, with nothing after it, does not introduce anything. **It closes.** Position is the whole argument; the treatment is identical either way.

### Why it reads as an ending and not as an index

`--esperide` is `--indice` on the night field, so a gold rule is grammatically an index mark — and an index that points at nothing would be a defect. This one points at nothing **because there is nothing after it**, and that is what makes it terminal rather than indexical. It is the bottom edge of the sheet. The site's last gesture is the same gesture as its first: the hero's headline is cut by the right edge of the world; the footer's last rule is the edge of the page. Both say *the document stops here*.

Length: columns 1–7 = 1,145px at desktop. §11.2 requires rules to be a multiple of 8 **or exactly one full column/field span** — this is a column span, so it is legal at 1,145. It runs from the rail to the void, wider than everything above it (`.contact__legal` is cols 2/8), which is why it reads as the sheet's edge rather than a divider between two blocks.

### The gold count in that viewport

| Use | Area |
|---|---|
| `.canale[data-primary]` 1px rule, cols 2–5 (already shipped) | 644 px² |
| terminal rule, 1px × 1,145 (**new**) | 1,145 px² |
| **total gold in the last viewport** | **1,789 px² = 0.14%** |

There is no published `--esperide` budget — §18.12 governs it by rule rather than by area — but two 1px rules in one field is the ceiling I would defend. A third would make gold a divider colour and would cost the primary-channel rule its meaning, exactly as §4.4 #5 describes for `--chicco`.

### The amendment this needs

§11.2's rule table has no row for **1px `--indice`** — it lists 1px `--rigo`, 1px `--rigo-forte`, and 2px `--indice` limited to chapters 03 and 05. A fourth weight would be a defect; this is not a fourth weight (1px already exists) but it *is* a colour/weight pairing the table does not enumerate. The precedent already ships: `.canale[data-primary]` at `components.css:1222` is a 1px `--indice` rule in this same footer, in the built site today.

**Requested amendment, for the Art Director:** add to §11.2 — *1px `--indice`, index and terminal marks, **maximum two on the entire site, both in the footer***. That closes an existing undocumented use and authorises exactly one more. `--chicco` is unaffected: on the day field this row can never fire, because §4.5 puts the footer permanently in night.

---

## 4. Transitions

**Recommendation: none. Not one new animation, not one new timeline, not one new trigger, at any of the four placements.**

The brief asks whether the marks can enter through timing, progressive presence, composition, or a scroll relationship that already exists. They can, and the answer is composition plus the scroll the reader is already doing:

| Mark | How it enters | How it leaves |
|---|---|---|
| Header | present at first paint, in the first viewport | scrolls out of the document — the header is `position: absolute`, so it exits by itself and never returns |
| ch07 seal | the reader scrolls it into view | scrolls past |
| ch08 tree | the reader scrolls it into view, already in the night field | scrolls past |
| Footer | the reader scrolls it into view | it is the end |

That is a real progression and it costs nothing: the mark is **loud at the top (first thing on a clean page), silent through the whole kernel sequence, quiet again at ch07, strongest at the myth, small at the sign-off.** The dramaturgy is entirely positional. Adding motion on top of it would not add a beat; it would add a second thing competing for the same beat.

**Refused specifically, each with its rule:**

- Fade-in or fade-up on any mark — §18.2, and §12.5 governs reveal for text only.
- SVG stroke draw-on for the tree — §18.32: *"if you cannot state the sentence an animation is speaking, it is decoration and it is cut."* The sentence here would be "look, a logo".
- Scroll-linked opacity or scale on any mark — §12.7 caps scroll-linked continuous animations at **one**, and it is the rail fill. This is not a budget I may spend.
- Rotation, hover, or any pointer response on the seal — §12.7 forbids `scale` on hover site-wide; the marks are `aria-hidden` and not interactive.
- Folding the ch08 tree into the inversion as a fifth beat at t = 800ms — **tempting and wrong.** §12.6's six-row table is fixed and I have no authority over it; §12.6 also states *"nothing moves, nothing fades, nothing scales"* during the field flip. And the tree is not in the pinned `__scene` anyway — it is in `__body`, one screen further down, and arrives already-night.

**One transition is inherited for free and needs no code.** Both night marks are painted with `currentColor` off `--testo`, which is one of the properties §12.6 already transitions over 640ms at the inversion. If either is ever on screen when the field flips, it inverts with everything else, on the approved timing, with no new declaration. Nothing has to be written for that to be true — which is the definition of entering through a relationship that already exists.

`prefers-reduced-motion`: nothing to honour, because nothing moves. The marks are pixel-identical in both modes, which is one place where §19.15's parity check *gains* rather than loses (`motion-spec.md` §6.4 records that the prologue currently breaks it).

---

## 5. Immersion check — element by element

The invariant: **kernels → cob → field must remain the principal immersive peak.** The signature runs hero → ch03 and the prologue releases to zero at `#otto-file top top` (`motion-spec.md` §6.2).

**Structural fact that does most of the work:** three of the four placements sit *outside* the sequence entirely. ch07 and ch08 are in chapters 04–08, where the prologue is **suspended** — not transparent, suspended: RAF cancelled, no draw calls. They cannot compete with something that is not running. The footer is past even that. **Only the header coexists with the sequence, and only for its first viewport.**

| Element | Competes with the sequence? | Argument |
|---|---|---|
| Header mark, 40px `--pietra` | **This is the only real risk. See below.** | mitigated, but must be verified on a screenshot |
| ch07 seal, 128px `--pietra` | No | prologue suspended; zero chroma; no fill, no disc; static |
| ch08 tree, 192px `--carta` | No — but it is near the *other* peak | it is in `__body`, one full screen **after** the pinned `__scene` where the inversion fires; it arrives in the resolution, not the climax; it is cream, not gold, so the myth stays the loudest thing in its chapter |
| Footer mark + terminal rule | No | past both peaks; 40px; 1px |

### 5.1 The single biggest immersion risk, stated plainly

**The header mark shares the first viewport with the prologue's `dispersione` / `attrazione` stages, and it is formally similar to what that layer is doing.** The prologue at that moment is a scatter of small separated kernel forms drifting into rows. The Esperidi roundel is a scatter of small leaf forms in a canopy. **Two clouds of ovoids in one viewport, one of them moving.** If the mark reads as part of the kernel field, the site's first three seconds become ambiguous, and the ambiguity lands on exactly the element the whole page is built around.

**Why I believe it holds:**

- **It fuses.** In my renders the leaf cloud stops resolving as individual leaves somewhere below 64px; at 40px the canopy is a single mass with a trunk. The prologue's kernels are *separated points*. Mass versus scatter is a real formal distinction and it appears exactly at the size I am proposing.
- **It is quieter than the layer.** `--pietra` on `--carta` is 2.80:1. The prologue paints in `multiply` at 0.28 with `saturate(0.92)`. The mark is not the brightest thing in the frame.
- **It is static and the field is not.** Motion wins attention over a static 40px shape, always, and 1,600 px² is 0.12% of the viewport.
- **It is in the top-left chrome band**, on the header line, adjacent to a wordmark, inside a composition §7.6 fixes exactly. The prologue explicitly *cannot* be mistaken for content (§6.2: `z-index: 0`, `pointer-events: none`, `aria-hidden`, beneath the header). They sit at different depths and read at different depths.

**Mitigation if it fails, and the test that decides it — blocking, before build:**

Screenshot the hero at prologue checkpoints `000` and `012` (the two `dispersione`/`attrazione` frames), at all three reference viewports and at 1× and 2× DPR, with and without the mark. **If the mark reads as part of the kernel field in any of them, the ladder is:** reduce to 32 × 32 → if it still competes, remove the header mark entirely and accept the wordmark text as the only first-viewport identity. **The mark loses this argument, not the sequence.** There is no version of this proposal in which the brand layer wins a fight with the kernels; that is the invariant and it is not mine to trade.

### 5.2 The honest cost, stated once

**Below 768px, three of the four marks are absent.** Mobile brand identity is: the wordmark as text in the header, the seal in the browser tab, and a 40px tree at the very foot of the page. On a phone the site is *more* recognisably Esperidi than it was, but not by much — and mobile is probably most of the traffic.

I am not going to pretend that is solved. Every mobile placement I could find costs vertical rhythm, and the mobile vertical rhythm was finished two days ago and is explicitly out of bounds for this sprint. **If the Art Director and the Frontend Lead want mobile brand presence, it is one decision — a small mark inside `.chapter--products__head` on mobile, or the header mark at 32px hanging into the 16px pad — and both need the rhythm re-measured by someone who owns it.** `TODO` left. An honest gap beats a placement I smuggled past a finished audit.

---

## 6. Considered and rejected

Every one of these was a live option, not a straw man.

| # | Rejected | Why |
|---|---|---|
| 1 | **The Mais Rosso Co. seal in full colour at ch07** | Imports ≥ 4 values outside the seven as page graphics, including the petrol blue `brand-alignment.md` §6 already refused as an eighth token (§18.27). Adds ≈ 3,800 px² of measured kernel-window chroma into the one viewport already at ≈ 15% against a 2% ceiling, and makes the second red-orange source in that frame a *device* rather than a photograph — the exact moment `--chicco` becomes a brand colour. |
| 2 | **Either mark in `--chicco`** | §4.4 illegal use #1 (fill at any size, any opacity) and #7 (no tints, no `color-mix`). A mark is not an index: it says *who*, not *which one*. |
| 3 | **The ch08 tree in `--esperide`** | The most attractive rejected idea in this document — a golden tree in the garden of golden apples. It out-shouts the myth quotation, which §12.6 makes *"the only paragraph ever set in `--esperide`"*, and it would make the company mark the protagonist of the site's one chromatic event. The inversion is the climax. The logo is not. |
| 4 | **A fixed or sticky header carrying the mark down the page** | It would coexist with the entire kernel sequence instead of one viewport, and §7.6 fixes the hero's contents exactly. A mark that follows the reader through `pannocchia` → `campo` → `registro` is the definition of "logo dropped on top of the layout". |
| 5 | **A watermark tree behind the myth text on `--notte`** | Readability risk on the night field, and it converts the mark from a citation into decoration. §18.32. |
| 6 | **A `--chicco` rule, or a seal, per product row** | Pre-refused by the brief, and independently by §4.4 #4/#5 (repetition turns an index into a state colour) and `art-review-immagini.md` §0-bis C (*"nessuna immagine per referenza"* — a per-row device turns the register into an e-commerce grid). |
| 7 | **Any mark in column 8** | §5.5 is categorical: *"no text, no image, no border, no background may occupy column 8 at any breakpoint."* The reserved void is Invariant 1. |
| 8 | **A mark inside the rail** | §11.3: the kernel is the rail's only mark and *"appears in the rail and nowhere else."* The inverse holds too. |
| 9 | **Any entry animation** — fade, draw-on, scroll-linked opacity, seal rotation | §18.2, §18.32, §12.7 (one scroll-linked animation, already spent on the rail fill). See §4. |
| 10 | **The seal overlaid on the ch07 photograph** | A mark placed on a documentary photograph makes the photograph look like an advertisement, and it requires a second image treatment on a plate that already carries the §9.5 grade. |
| 11 | **The full lockup — roundel + wordmark — anywhere** | The company name is already live Archivo text at every placement (header, myth, copyright). A raster wordmark would duplicate text the page already sets, and would put lettering on the page that is not one of the three approved faces (§18.15 in spirit). **The roundel is the only part of the logo file that ships.** |
| 12 | **`--pietra-testo` for the marks** | Legible and tempting at 40px, and a token-role violation: §4.3 makes `--pietra-testo` secondary *text* and `--pietra` the value for *non-text marks*. If 40px `--pietra` proves too faint, the answer is 48px, not a darker ink. |
| 13 | **The `GOURMET PREMIUM` sub-roundel inside the seal** | A marketing superlative. It is what the pack says, and inside the ch07 *photograph* that is honest reportage — but reproduced as a page graphic it becomes the site asserting it. Dropped by choosing T = 0.60 over the softer thresholds. |
| 14 | **Petrol blue as an eighth token, to carry the seal** | Restating `brand-alignment.md` §6. Still refused, for the same three structural reasons: §4.1 admits no eighth hex; on the pack the blue does a *printing* job the page does not have; and a second saturated accent with no indexical job turns both accents into decoration. |
| 15 | **A gold rule above `.contact__legal`** | That is the letterhead the client rejected in terms. Same rule, wrong side of the block. See §3. |
| 16 | **A payoff, tagline or descriptor beside any mark** | Nothing in the brochure survives the adjective test (*eccellenza, autentico, genuino, unico*), and a mark that needs a sentence to explain it is not working. The marks illustrate sentences already on the page; they do not bring their own. |
| 17 | **A mark at 24 or 32px to be "discreet"** | Rendered and looked at: at 24px the roundel is illegible, at 32px it is a blob. An unreadable mark is not discretion, it is a smudge — and it costs the same pixels. 40px is the floor. |

---

## 7. What this proposal needs before anything is built

| # | Owner | Decision |
|---|---|---|
| 1 | **Art Director** | **§11.3 amendment.** The section enumerates exactly two marks (the kernel, the registration mark) and states *"no other marks… exist."* This proposal adds a third class — the company mark — at four placements. It also needs a carve-out from §18.6, which bans icons; a company mark is not an icon set, but the kill list does not say so. **This is the largest documentation change requested here and nothing ships without it.** |
| 2 | **Art Director** | **`art-review-immagini.md` §8 amendment** — ch08 is documented "invariato". §1.3 puts a non-photographic mark in it. |
| 3 | **Art Director** | **§11.2 amendment** — a 1px `--indice` row, max two site-wide, both in the footer. Closes an existing undocumented use (`components.css:1222`) and authorises the terminal rule. |
| 4 | **Art Director** | **The still-open §4.4 ch07 mitigation** from `brand-alignment.md` §4.2 (b). Recommended here: rail active row reverts to `--inchiostro` in ch07. −128 px². |
| 5 | **Art Director / Frontend Lead** | **The header/prologue screenshot test** (§5.1). Blocking. |
| 6 | **Frontend Lead** | **Row-height verification** at ch07 row 1 and ch08 `__body` row 1. If either row would grow, the mark shrinks. |
| 7 | **Frontend Lead** | The +48px mobile footer wrap, or the padding-token offset that pays for it (§1.4). |
| 8 | **Art Director / Frontend Lead** | Optional `--marchio` alias (`--pietra` on day, `--carta` on night). Tidier than `currentColor` on two selectors; needs §4.2 ratified. Not required. |
| 9 | **`TODO(cliente)`** | **Vector artwork for the Esperidi tree.** Everything above is built from a 743 × 1032 raster pulled off the old public site. A 3× mask covers 1× and 2× DPR, but a vector removes the question. |
| 10 | **`TODO(cliente)`** | **Original artwork for the Mais Rosso Co. seal.** The current source is a 400 dpi rasterisation of brochure p. 1 — good enough for a 128px single-ink stamp, not for anything larger. |
| 11 | **`TODO`** | **Mobile brand presence** (§5.2). Unresolved, and it needs whoever owns the mobile vertical rhythm. |

---

## 8. Verdict

**Coherent after this, if built:** a visitor meets the tree in the first viewport, meets the Mais Rosso Co. stamp at the head of the products, meets the tree again — large — beside the sentence that explains the company's name, and signs off with it at the foot of the page. The mark on the jar becomes the mark in the tab, in the header, at the register, at the myth and at the end. Four placements, one mark, one ink, one escalation curve that returns to where it started.

**What it costs the sequence: nothing that can be measured.** Zero new `--chicco`, zero new hexes, zero new animation, zero new timelines, zero pinned sections, zero grid changes, zero rhythm changes above 768px. Net `--chicco` delta **−128 px²**.

**What it does not fix:** mobile, where three of four marks are absent and I would not force them past a finished audit. And ch07's photographic chroma, which was open before this sprint and is open after it.

**The one thing that could still go wrong** is the header mark reading as part of the kernel field in the first viewport. It is one screenshot away from being settled, and if it fails, the mark goes and the sequence keeps the frame.
