# Brand signature — Art Director ruling

**Date:** 2026-07-28
**Rules on:** `docs/brand-signature.md` (Brand Guardian proposal, 2026-07-28)
**Status:** **BINDING.** `docs/art-direction.md` §11.2, §11.3, §18.6, §18.29 and `docs/art-review-immagini.md` §8 are amended by this document and have been edited to match. Nothing outside what is ratified here may be built.
**Method:** every visual claim in the proposal that could be settled by looking was rendered and looked at. Captures are in `docs/captures/ad-mark-collision/` and `docs/captures/ad-ch08-tree/`. Where my finding contradicts the proposal, the render is the reason.

---

## 0. Summary of verdicts

| # | Item | Verdict |
|---|---|---|
| 1 | §11.3 gains a brand-mark clause | **RATIFICATO CON MODIFICHE** — one mark class, three placements, one ink, header excluded |
| 2 | §11.2 gains a 1px `--indice` row | **RATIFICATO CON MODIFICHE** — max two site-wide, both in the footer, terminal rule must be terminal |
| 3 | §18.6 carve-out for a company mark | **RATIFICATO CON MODIFICHE** — carve-out granted and the surrounding ban tightened so it cannot widen |
| 4 | `art-review-immagini.md` §8 amended for ch08 | **RATIFICATO CON MODIFICHE** — one non-photographic mark admitted; value corrected to `--pietra` |
| 5 | Header mark, 40 × 40 `--pietra` | **RESPINTO** — at every size, at every breakpoint |
| 6 | ch07 seal at T = 0.60 | **RESPINTO AS BUILT**, placement ratified — the asset is regenerated, not the layout |
| 7 | ch08 tree in `--carta` | **OVERRULED** — `--esperide` correctly refused, but `--carta` is also wrong; the value is `--pietra` |
| 8 | Footer tree, 40 × 40 | **RATIFICATO** — value corrected to `--pietra` |
| 9 | Terminal `--esperide` rule below the legal line | **RATIFICATO** |
| 10 | No transitions on any mark | **RATIFICATO** — in full, including every refusal in the proposal's §4 |
| 11 | Net `--chicco` delta and the §4.4 ch07 mitigation | **RATIFICATO** — rail active row reverts to `--inchiostro` in ch07 |

**Resulting mark inventory: three instances on the entire site.** ch07 seal (128), ch08 tree (192), footer tree (40). All `--pietra`. Alongside the four registration marks and the rail kernel, that is the complete set of non-typographic marks, and §11.3 now says so.

---

## 1. The header mark — the judgement that mattered most

### 1.1 The collision does not occur, and the proposal's reason for why it holds is wrong

I rendered it. `docs/captures/ad-mark-collision/`, three viewports, 1× and 2× DPR, prologue checkpoints `000` and `012`, with and without the mark.

**Finding 1 — the two clouds never share a viewport.** At checkpoint `012` the header has already left the frame. `.site-header` is `position: absolute` at `top: var(--space-5)`; by the time the prologue reaches `attrazione` the header is above the fold and gone. The collision window is checkpoint `000` and the first ~200px of scroll, and nothing else. The proposal's own framing — "shares the first viewport with the prologue's `dispersione` **and** `attrazione` stages" — is true of `dispersione` only.

**Finding 2 — at `000` the two forms are not confusable.** The prologue at `dispersione` paints **six** kernels across a 1440 × 900 frame at roughly 16px, soft-edged, terracotta, at 0.28 `multiply`. The canopy is roughly **forty** shapes at 2–3px, hard-edged, `--pietra` grey. Six-fold size difference, opposite edge quality, different hue, two orders of magnitude apart in density. There is no frame in which one reads as the other.

**Finding 3 — the argument offered for why it holds is factually false, and its mitigation is inverted.** The proposal states that "at 40px the canopy fuses into a mass while the prologue stays separated points". It does not fuse. Rendered at 8× nearest-neighbour (`/tmp/segno-40-x8.png`, reproducible from `public/images/marchio/segno-inchiostro-40.png`), the 40px canopy is unambiguously **a scatter of ~40 discrete ovoids inside a ring**. Mass-versus-scatter is not the distinction that saves it; scale, hue, edge and density are.

This matters beyond bookkeeping. The proposed fallback ladder is **40px → 32px → remove**. Reducing the mark makes the canopy speckle *finer and sparser* — it moves the mark **toward** the form the risk was named against, not away from it. Had the collision been real, rung one of the mitigation would have made it worse. A mitigation ladder that runs the wrong way is a sign the mechanism was never actually observed, and it is why I do not accept "one screenshot away from being settled" as a substitute for taking the screenshot.

**The prologue is not the reason the header mark dies.** I want that on the record, because the Brand Guardian declared this risk honestly and should not be told they were right for the wrong reason. They were wrong about the mechanism and wrong about the mitigation, and the risk they named is not a risk.

### 1.2 Why it dies anyway

**(a) It reconstructs the lockup the proposal itself refuses.**

`docs/captures/ad-mark-collision/desktop-2x-000-mark-band.png`. The roundel sits in column 1, justified right, **one gutter — 24px — from `IL GIARDINO DELLE ESPERIDI`**, on the same line, at an optical size matched to the wordmark's cap height. That is a circular mark plus a wordmark, top-left. That is a lockup.

Rejected item #11 in the proposal refuses "the full lockup — roundel + wordmark — anywhere", on the grounds that the raster wordmark would duplicate live type. The placement then rebuilds the lockup out of the raster roundel plus the live type. The refusal and the placement cannot both stand. This is a distinction without a difference, and the render is not ambiguous about which one it is.

**(b) It fails §19.16, the swap test — and it is the one element in the header that does.**

Compare `desktop-1x-000-clean.png` and `desktop-1x-000-mark.png`. Without the roundel the header is: a 12px Archivo `wdth 125` wordmark hung on the column-2 axis at `0.14em`, a DM Mono locality right-aligned to column 7, `CONTATTI` with a 1px `--indice` underline, the rail carrying a rotated `00/08`, and column 8 empty. Swap the name out of that and it still could not be another company's header — the register is doing the identifying work.

With the roundel it becomes favicon-plus-site-title, which is the most conventional gesture in web design, and the frame will accept any other brand's circle without complaint. The mark is added to make the site more recognisably Esperidi and the measurable effect is that the header becomes more recognisably a website.

**(c) It fails §7.6.**

§7.6 is titled *"Chapter 01 — the hero, fixed composition"* and it enumerates its contents in a closed table: wordmark, meta strip, display headline, specimen image, rail, empty column 8. Adding a sixth element is an amendment to §7.6. None was requested and I am not granting one on my own initiative. §7.6 exists to protect the first three seconds, which is the same asset the client's invariant protects — so refusing this is not in tension with the client's brief, it is the brief.

**(d) Column 1 is a hanging margin, and the proposal's own reasoning shows it was chosen for fit, not for meaning.**

§5.5 gives column 1 exactly one role: display-type optical overhang and chapter numerals clipping left behind the rail. It is a *void that things hang into*, not a cell that things sit in. The proposal's stated reason for choosing it — "putting the mark there means the wordmark does not move" — is an argument from convenience. Nothing in this project is placed because it fits. Column 1 is left empty in the header because the wordmark's hanging margin is what makes the text axis read as an axis.

**(e) It fails at both resolutions, in opposite directions.**

At 1× (`desktop-1x-000-mark-band.png`) the 40px roundel is illegible speckle and reads as dirt on the paper — the site is built on a paper-grain texture and a grey smudge at 2.80:1 is indistinguishable from a defect in the substrate. At 2× (`desktop-2x-000-mark-band.png`) it resolves crisply and becomes the lockup in (a). There is no DPR at which it is right, and 48px — the proposal's own fallback for faintness — makes (a) worse.

**(f) The proposal's founding rule defeats it.**

> *"The mark never asserts anything the type has not already said. It is always placed beside a sentence that names it."*

At 24px from the company name set in full, the mark is not citing the sentence. It is duplicating it, at the single point on the site where attention is highest and most expensive. Citation is a mark **facing** a sentence across a page (ch08) or **closing** a document (footer). Adjacency at one gutter is a lockup. The rule is right; ch07, ch08 and the footer obey it; the header does not.

### 1.3 On overruling a client-approved placement

"Tree in header" was listed as not open to renegotiation. I am ruling against it, and I will not disguise that.

What I am refusing is the execution, and I have established there is no execution of it that survives: every size is either illegible or a lockup, and the only zone that does not displace §7.6 is a hanging margin that must stay empty.

More usefully — **a roundel does not solve the problem the client actually stated.** The diagnosis was *"twenty seconds in, a visitor still does not know the company's name."* That is a naming problem. A tree in a circle contains no name. The instrument for a naming problem is type scale, and the measurement is on the page: the company name is set at **12px** (`--type-label-lg`) while the product name beside it is set at up to **208px** (`--type-d0`). A **17:1 ratio between the maker and the thing made** is the entire diagnosis, and no 40px graphic closes it.

**Returned to the client with a direction, not a refusal:** the first viewport's identity problem is solved in the wordmark, not beside it. I will specify that separately — it is a type decision and it belongs in §3.3 and §7.6, not in a brand-mark sprint. The brand recognition the client asked for is delivered by the ch08 tree at 192px, which is where the mark genuinely earns its place, and by the footer sign-off.

### 1.4 What this does to the mobile question

I was asked whether the desktop-only version reads as coherent or unfinished. **As proposed, unfinished** — a header that carries a logo on desktop and drops it below 768px is a responsive failure, not a rule, and every visitor who resizes sees it.

**After this ruling, coherent.** The header carries no mark at any breakpoint, so the tell disappears. What remains is: the seal and the ch08 tree on desktop and tablet, the footer tree everywhere. That is governed by a rule the system already enforces for `REPERTO` (§8.5) — *graphic marks live where the two-column register lives; below 768 the site is typographic* — and the one mark that survives on mobile is the sign-off, which is the correct one to keep. The `TODO` on mobile brand presence is closed by this ruling rather than deferred.

---

## 2. The ch07 seal — placement ratified, asset rejected

### 2.1 On the principle: agreed, and written into the kill list

> *"A superlative is a superlative whether set in type or drawn."*

Agreed without reservation. `GOURMET PREMIUM` may not be reproduced as a page graphic in any form. Inside the ch07 photograph it is reportage — the pack says what the pack says. Redrawn as a page device it is the site asserting it, and §18.29 rejects a build for setting that class of word in display type. A graphic is not exempt from a tone rule because it is a graphic. §18.29 is amended to say so explicitly.

### 2.2 On the method: overruled. T = 0.60 does not do what it is claimed to do

I built the reduction and looked at it at 96 / 128 / 160.

**Finding 1 — `GOURMET PREMIUM` does not drop.** At T = 0.60 the sub-roundel survives as a ghost: the ring outline, the dot border and traces of the lettering are all clearly present at 128px. I re-ran at T = 0.45 and T = 0.30 and it survives both. Global luminance thresholding cannot separate light terracotta lettering from dark ring type and a dark cross-hatched illustration simultaneously — it is the wrong tool, and no value of T fixes it. What ships under the proposed method is an **illegible ghost of a marketing superlative**, which is worse than either the legible original or a clean removal, because it reads as a printing fault.

**Finding 2 — a third, accidental, illegible Esperidi tree.** The seal carries the Esperidi tree as a small secondary roundel in its right-hand field. At T = 0.60 and 128px it survives at roughly 26px as an unreadable smudge with a hint of ring type around it. §11.3's entire logic is that marks earn their place by being rare and legible; this puts a smeared instance of the company mark inside another mark, by accident, uncounted. The proposal did not catch it.

**Finding 3 — the reduction inverts the seal's own hierarchy.** In single ink the cross-hatched cobs become the dominant dark mass and the ring type — the part carrying the verified facts, which is the entire argument for keeping the seal — becomes the thinner, weaker element. The reduction keeps the picture and weakens the words.

### 2.3 Ruling

Placement **ratified**: `grid-column: 6 / 8; grid-row: 1; justify-self: end; align-self: end`, 128 desktop / 96 tablet, `--pietra`, `aria-hidden`, no motion, absent below 768. The reasoning — a stamp at the head of a ruled page, occupying a void that already exists — is correct and it is the best structural argument in the proposal.

Asset **rejected as specified**. Required instead, and blocking:

1. **Element removal by hand mask, then threshold.** Both sub-roundels — `GOURMET PREMIUM` and the Esperidi tree — are painted out of the source *before* reduction. Not thresholded out. Removed.
2. What ships is: the ring type (`MAIS ROSSO Co.` · `OTTOFILE` · `varietà "ALBESE"`), the border dots, the ring rule, and the two cobs. Nothing else.
3. Re-render at 96 / 128 / 160 for my sign-off before a line of CSS is written.
4. **If the cobs still read as an undifferentiated dark mass at 128px**, the illustration is dropped too and the stamp ships as ring type and rule alone. If that fails, the seal does not ship and ch07's brand moment is carried by type. **The layout does not change to accommodate a weak asset.**
5. `TODO(cliente)` for original seal artwork stands and is now load-bearing rather than a nicety.

The full-colour seal is refused, as proposed, for the reasons given. Petrol blue as an eighth token remains refused.

---

## 3. The ch08 tree — `--esperide` correctly refused, `--carta` overruled

Rendered at 192px in all three candidate values against the live night field: `docs/captures/ad-ch08-tree/`.

**`--esperide`: refused, and for a stronger reason than the one offered.** The proposal's argument — gold out-shouts the myth and makes the logo the protagonist of the site's one chromatic event — is true but secondary. The primary reason is grammatical: `--esperide` **is** `--indice` on the night field. Gold on this site means *index*. A gold company mark is an index pointing at the company, which converts the index into a brand colour — §4.4 illegal use #5, in the night token. That is fatal before any question of loudness arises. (For the record, the gold render is the most *attractive* of the three, and that is exactly why the rule exists.)

**`--carta`: overruled.** The render settles it. Cream at 15.37:1 at 192px is the highest-contrast compact object in the frame; the eye lands on the tree before it lands on the myth. It makes the logo the protagonist of the chapter that is the site's emotional resolution — the same failure the proposal correctly refused for gold, achieved with a different token. The proposal asserted that "cream at 15.37:1 is very present; gold at 8.74:1 is the *event*" and reasoned from contrast ratios about roles. Roles are not read off a contrast table; they are read off the page. On the page, cream wins.

**`--pietra`: ratified.** 5.48:1 on `--notte`, legal, quiet, and §4.3 already assigns `--pietra` to *"rules, hairlines, disabled, non-text marks"*. In the render the tree is fully legible as a woodcut in the margin, and the hierarchy comes out in the right order: **gold myth (the event) > cream body (the text) > stone mark (the citation)**.

It also produces the stronger rule, and this is the part worth keeping: **one ink for the brand mark across the entire site, day and night.** `--pietra` on `--carta`, `--pietra` on `--notte`. Simpler than the proposal's two-value scheme, and it makes a wrong value structurally impossible rather than merely documented. The `--marchio` alias (proposal §7 item 8) is therefore **refused as unnecessary** — there is one token and it never changes.

Size **192 ratified**, with the proposal's reasoning intact: 256 fills 83% of the column pair and becomes an illustration plate; 192 fills 62% and leaves the column's air. 144 on tablet. Absent below 768.

---

## 4. The footer — ratified, with one value correction

Tree at 40 × 40 in `--pietra` (not `--carta`), first flex child of `.contact__legal`, `align-self: center`, every breakpoint, no motion.

The argument for the size is the strongest compositional argument in the proposal and I am not touching it: **the reader meets the mark at the top of the sheet and signs off with it at the bottom, at identical scale.** With the header mark gone that symmetry is lost, and I have considered whether the footer mark loses its reason with it. It does not — it gains one. A mark inside the last line of a document, at the size of a rubber stamp, beside the legal name, is a **colophon**. A colophon does not need an answering mark at the head; a letterhead does. Removing the header mark makes the footer mark *more* correct, not less.

40px stands, for the reason the proposal gives: below 40 the roundel stops being a mark and becomes a smudge, and an unreadable mark costs the same pixels as a readable one.

### The terminal `--esperide` rule — ratified

One 1px `--esperide` rule, `grid-column: 1 / 8`, **below** `.contact__legal`, the last inked pixel on the site.

The argument is right and it is a real idea rather than a decoration: a gold rule *above* the copyright introduces a section and is the letterhead the client rejected; a gold rule *below everything*, with nothing after it, closes. An index that points at nothing is a defect unless there is nothing to point at, and then it is a terminal mark. It rhymes with the hero clip — the headline is cut by the edge of the world, the footer is cut by the edge of the sheet. Both say *the document stops here*.

**Conditions, binding:**
- It must be the last inked pixel in the document. If anything is ever added below it, the rule moves or dies. It is terminal or it is a divider, and a gold divider is §4.4 #5.
- Maximum two 1px `--indice` rules on the entire site, both in the footer. The third is a defect.
- This closes the existing undocumented use at `components.css:1222` (`.canale[data-primary]`), which is hereby documented rather than grandfathered.

---

## 5. Transitions, chroma, and the rest

**§4 (no transitions): ratificato in full.** Every refusal in it stands — no fade, no draw-on, no scroll-linked opacity, no hover, no fifth beat at the inversion. The dramaturgy is positional and that is enough. The inherited `currentColor` transition at the inversion is free and correct; with the value now `--pietra` on both fields the marks simply do not change at the flip, which is quieter still and equally correct.

**§2 (`--chicco` budget): ratificato.** Net delta of this sprint is zero from the marks themselves. The §4.4 ch07 mitigation — *rail active row reverts to `--inchiostro` on the chapter carrying a full-frame kernel macro* — is **ratified and ordered**: it is my own prescribed mitigation, it has been open too long, and ch07 is the chapter it was written for. −128 px².

Row 6 of the inventory — the ch07 packaging photograph at ≈15% retained kernel-window chroma against a 2% ceiling — is **not** resolved by this ruling and is not the Brand Guardian's to resolve. It is a photograph-versus-budget question, it is mine, and it stays open. It is now the largest unresolved chromatic defect on the site and it outranks anything in this document.

**§6 rejections: upheld in full**, with two extensions:
- #11 (no full lockup) is extended: **the roundel may never appear on the same line as the wordmark, at any placement, at any size.** That is the rule the header placement broke, and stating it as adjacency rather than as file contents is what makes it enforceable.
- #13 (no `GOURMET PREMIUM`) is extended from a threshold side-effect to a **removal requirement** — see §2.3.

---

## 6. Rejected outright — the complete list

1. The header mark. All sizes, all breakpoints, all values, all positions within §7.6.
2. The 40 → 32 → remove fallback ladder. Its logic runs backwards.
3. T = 0.60, or any global luminance threshold, as the production method for the seal.
4. Any reproduction of `GOURMET PREMIUM`, legible or ghosted.
5. The Esperidi sub-roundel inside the ch07 seal.
6. Any mark in `--chicco`, `--esperide` or `--carta`.
7. Any mark on the same line as the wordmark.
8. The `--marchio` alias. One ink, one token, nothing to alias.
9. Any entry animation on any mark, at any placement.
10. Any mark in the rail, in column 8, or overlaid on a photograph.

---

## 7. What must happen, in order

| # | Owner | Action | Blocking |
|---|---|---|---|
| 1 | Brand Guardian | Rebuild the seal: hand-mask both sub-roundels out of source, then reduce. Re-render 96/128/160. | **yes — my sign-off before build** |
| 2 | Art Director | Verify the rebuilt seal's cob mass at 128px. If it mushes, drop the cobs; if that fails, drop the seal. | **yes** |
| 3 | Frontend Lead | Row-height check: ch07 row 1 with a 128px seal, ch08 `__body` row 1 with a 192px tree. **If either row would grow, the mark shrinks. The row does not.** | **yes** |
| 4 | Frontend Lead | Build the three ratified placements. `--pietra`, alpha masks, `@supports` guard, keys via `media.ts`, `aria-hidden`, zero motion. | — |
| 5 | Frontend Lead | Terminal `--esperide` rule, `1 / 8`, below `.contact__legal`. | — |
| 6 | Frontend Lead | ch07 rail active row → `--inchiostro`. | — |
| 7 | Frontend Lead | Footer mobile wrap: +48px at the document foot, or the padding-token offset. Placement does not change either way. | — |
| 8 | Art Director | The header's identity problem, as a type decision. Separate ruling, §3.3 and §7.6. | — |
| 9 | Art Director | ch07 photographic chroma vs the 2% ceiling. Still open, and now top of my list. | — |
| 10 | `TODO(cliente)` | Vector artwork for the tree; original artwork for the seal. | — |

---

## 8. Verdict

**APPROVED WITH CHANGES.**

The proposal is the best-argued document this project has produced and it is right about the thing that matters: the marks are citations, not badges, and they belong beside sentences that already name the company. Three of its four placements survive intact. It refused every tempting wrong answer — gold tree, colour seal, `--chicco` anywhere, animation, per-product devices, the eighth token — and it declared its own biggest risk instead of burying it, which is the reason I could rule on it at all.

It fails in three places and all three are places where it reasoned instead of looking: the canopy does not fuse at 40px, T = 0.60 does not drop the superlative, and cream at 192px does not stay behind the myth. The header mark dies because it rebuilds the lockup its own §6 refuses, not because of the prologue. The seal's asset dies because thresholding is the wrong tool. The ch08 tree lives, in stone, and it is the placement that earns the whole thing.

**Three marks, one ink, no motion. The kernel sequence keeps the frame.**
