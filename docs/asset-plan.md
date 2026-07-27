# Phase 4 — Asset Production Plan

**Project:** Il Giardino delle Esperidi — sito vetrina
**Concept:** OTTO — *Registro di una varietà superstite*
**Author:** Art Director
**Governing document:** `docs/art-direction.md` (LOCKED). Where this plan amends it, the amendment is written out and argued. Nothing here is a silent deviation.
**Date:** 2026-07-26
**Status (reconciled 2026-07-27):** **PHOTOGRAPHIC PROGRAMME CLOSED.** Generation is halted. No further Higgsfield spend is authorised without a new written Art Director gate.

## Reconciliation — 2026-07-27

This plan was written before generation was attempted. Generation then falsified its central assumption, so the plan below is preserved as the record of intent, **not as a work order**. Read this section first; the batch tables further down are historical except where noted.

### What actually happened

The plan's own highest-flagged risk fired exactly as predicted. `ch01-pannocchia` and the eight-row specimen were attempted across **two model families and eight candidates** — four on `seedream_v5_pro`, four on `flux_2` — and **all eight were rejected**. Failure modes, recorded per-candidate in `docs/assets-manifest.md`:

- repeated white specular highlights making dried kernels read as waxed or lacquered (the instant-fail gloss gate)
- shadows too long and too dark for the specified lighting
- invented props (a lamp), false longitudinal cob splits
- and in one case simply **too many visible rows** — the one thing the asset existed to get right

The Art Director then **permanently closed generated botanical photography.** Rejected candidates may not be reintroduced.

### What replaced it

The fallback ladder in this plan worked as designed. Abstraction was reached in two steps:

1. **Impronta Otto** — eight parallel impressions in the locked paper field, proving "eight" as a material trace rather than a photograph. Generated on `nano_banana_2_lite`; one candidate approved, one rejected for having **nine** grooves.
2. **The code-native prologue** — which then superseded Impronta Otto in the rendered interface. It is procedural WebGL: geometry, topology and material defined in `src/lib/prologue/`, seed `ottofile-v1`, with three deterministic transparent AVIF exports as the static fallback. **Zero Higgsfield credits, zero generative content, 21,316 bytes of runtime payload.** Specified in `docs/signature-motion.md`.

The eight rows are therefore now asserted by **code that counts**, not by a model that guesses. That is a stronger position than the one this plan set out to buy.

### Budget

| | Credits |
|---|---|
| Opening balance | 199.50 |
| Spent (Batch 0 paper + 8 rejected botanical + Impronta 1R) | 22.45 |
| **Remaining** | **177.05** |

The plan's committed envelope of 119.95 was never drawn. The ~100 credits earmarked for the twelve photographic plates are **unspent and unallocated**.

### What is still open

- **Nothing is required to ship.** The site's imagery is code-native and complete; `public/` holds four files, all referenced, all approved.
- The twelve photographic plates (`ch02-brattee`, `ch04-chicco`, `ch05-barba`, `ch06-farina`, `ch06-macina`, `ch07-galletta`, `ch07-grissini`, `ch03-chicchi`) are **cancelled, not deferred** — they depended on the botanical realism gate that closed.
- **`vid-farina` (22.5 cr) is cancelled.** It was 19% of the envelope for one shot, and it depended on a flour still that was never produced.
- Any future generation needs a new plan, not a resumption of this one.

## Signature prologue amendment — 2026-07-26

The old single-frame Impronta transition is superseded by the approved code-native prologue in `docs/signature-motion.md`. No generated botanical photograph is authorised.

Required assets:

| Asset | Source | Purpose | Format / budget | Approval gate |
|---|---|---|---|---|
| Kernel geometry/material variants | Procedural WebGL mesh; eight dry, matte code-native variants selected by fixed metadata | Surface variation across 256 instanced kernels without random runtime behaviour or a texture download | TypeScript geometry + GLSL, no runtime asset | Art Director reviews dryness, silhouette and lack of waxy highlights |
| Cob target topology | Deterministic code, seed `ottofile-v1` | Eight rows × 32 computational positions; never exposed as botanical copy | TypeScript data, no runtime download | Art Director checks the legibility of eight rows |
| Plant and field geometry | Code-native low-poly geometry traced against botanical structure | Camera pullback from cob to plant and cultivated field without generated photography | Typed arrays/shader geometry, no external image | Art Director checks plausibility and rejects fantasy anatomy |
| Plate A — dispersion | Static export from the approved renderer | Reduced-motion/no-JS state 1 | 8:5 AVIF, ≤120 KB | Batch P review |
| Plate B — formation | Static export from the approved renderer | Reduced-motion/no-JS state 2 | 8:5 AVIF, ≤120 KB | Batch P review |
| Plate C — incisions | Static export from the approved renderer | Reduced-motion/no-JS state 3 | 8:5 AVIF, ≤120 KB | Batch P review |

Production order is locked: kernel/cob study → plant/field study → three static exports → Art Director review → integration. The total prologue asset envelope is ≤1.2 MB. Rejected botanical cob generations remain rejected and must not be reused.

Final asset gate: all three transparent AVIF plates passed Art Director review (`APPROVED SHIP`). The raster atlas was deliberately replaced by eight code-native geometry/material variations: this removed a download, avoided waxy photographic texture and preserved deterministic rendering. The approved fallback payload is 21,316 bytes total.

## Production amendment — 2026-07-26

This ruling supersedes the botanical still programme below:

- `REF-CARTA` is approved and locked.
- Both whole-cob style-test families were rejected; no generated botanical
  photograph may ship and no third photographic roll is permitted.
- Hero has no specimen. `ch01` promotes its data column as the specimen plate.
- `ch03` proves eight through the code-native grid, rail and eight rules.
- The original Batch 1 cross-section is cancelled.
- Its approved replacement is `Batch 1R — IMPRONTA OTTO`: an abstract 8:5 paper
  plate with exactly eight blind-debossed registration grooves. If generation
  fails the count, `REF-CARTA` plus eight code-native grooves is the locked
  fallback.

---

## 0. How to read this document

- §1 is the ledger of rulings I am making now, so nobody has to guess later.
- §2–§4 are the money: budget envelope, model policy, batch order.
- §5 is the asset register — one block per asset, complete specification.
- §6 is the prompt library — **every string is ready to paste into a shell.**
- §7 is the rejection checklist applied to every batch.
- §8 is the fallback ladder, per asset.
- §9 is the post-production pipeline that makes twelve separate generations read as one shoot.

**Nothing is generated until §7 has been read by whoever is running the CLI.** Credits spent on assets that were always going to be rejected are the fastest way to lose this project.

---

## 1. Rulings issued with this plan

These resolve open questions and conflicts between `art-direction.md` §9 and `content-plan.md` §6. They are decisions, not opinions.

**R1 — Nothing is sourced. Everything is generated or it does not exist.**
No royalty-free stock. No asset carried from the current website. Discovery §4 concluded *"nothing visual is worth carrying forward"* and I am holding that. A registry photographed on one substrate under one light cannot absorb an image shot somewhere else — §19.16's swap test is precisely the test stock photography fails. The three source options in the brief resolve to one: **Higgsfield-generated, or typography.**

**R2 — The dried-husk plate is 8:5, not 1:1.**
`art-direction.md` §9.7 lists it as 1:1 against the working-title chapter numbering. `content-plan.md` §6 runs it full-bleed-minus-rail on mobile at `ch02`, and §13.6 drops every 1:1 asset on mobile. A 1:1 husk would leave `ch02` imageless on a phone. **Husk becomes 8:5.**

**R3 — The `ch04` single-kernel plate is 8:5, not 1:1.**
Same reason, and a stronger one: `content-plan.md` §6/`ch04` requires the image to survive on mobile *small, in a tall empty block* — the void is the content. That composition cannot exist if the asset is dropped at 767px. **Single kernel becomes 8:5**, subject occupying **≤ 2% of frame area**, centroid on the 1/8 line.

**R4 — `ch07` plates are 8:5 at every breakpoint. I overrule the tablet note.**
`content-plan.md` §6/`ch07` says *"T: three equal columns, images square"*. §8.4 forbids re-cropping a master to a new ratio in CSS, and shipping square tablet masters would mean six product files and two ratios for one row. **A registry does not change its plate ratio by device.** All three product plates are 8:5, always.

**R5 — The `ch05` cultivation plate is DECLINED. `ch05` gets the corn-silk plate.**
`content-plan.md` §8.5 item 10 requests one extra plate: loose sowing seed in a small pile. I am refusing it, and not on cost grounds. *Loose seed on paper* and *loose kernels on paper* (`ch03-chicchi`) are the same photograph twice; §9.6 already forbids "multiple objects of the same type arranged decoratively" and repetition of a plate type across two chapters devalues both. The corn-silk plate is already in the required set at §9.7 #8, tagged *"05 or 06"*, is cultivation-adjacent (it is the plant's own reproductive material), and is exactly the *"quiet substrate note"* the Content Strategist asked for. **`ch05` = `ch05-barba`. Zero additional credits. Asset gap closed.**

**R6 — The Amaro annex gets no plate.**
`content-plan.md` §6 offers a dried-herb sprig. Declined. The annex is labelled `FUORI REGISTRO`; giving it a photographic plate on the same substrate as the maize entries visually readmits it to the register the copy just expelled it from. **The annex is one line of type and nothing else.**

**R7 — `ch08` gets no image. The optional night re-grade is refused in advance.**
`content-plan.md` §6 leaves it to my judgement. Judged: no. §9.2 already caps chapter 08 at one image *"if it is not exceptional"* — and I will not spend credits discovering whether a re-graded kernel is exceptional when the withholding is the point. **Chapter 08 is typography, black, gold, and 64 marks.**

**R8 — One specimen, two crops, one charge.**
`hero-sezione` and `ch03-sezione` are two 8:5 derivatives of a single master. `ch06-farina` and `ch07-farina` likewise. This is not an economy measure dressed as a concept — a registry photographs an object once and crops the plate to the entry. Two exposures of the same specimen under two slightly different lights would be the defect.

**R9 — AMENDMENT to §8: master delivery size becomes per-asset.**
§8 states a blanket 2560 × 1600 (8:5) and 1600 × 1600 (1:1). At the model tiers we can afford, that would force a paid upscale on nine assets that never render above 477 CSS px. The replacement rule:

> **Master width ≥ 2 × the largest CSS width at which the asset renders, at DPR 2, rounded up to the source model's native tier.**

Consequence: **only `ch03-sezione` requires a true 2560-wide master** (it spans columns 3–7, = 951 CSS px at a 1920 viewport, = 1902 device px at DPR 2). Everything else is served correctly at 1536–2048. 1:1 plates ship at **1536 × 1536**, a declared 4% deviation from §8, sanctioned because no 1:1 asset renders above 477 CSS px and all of them are dropped on mobile.

**R10 — `gpt_image_2` is not purchased. Not once.**
At 7 credits it is 4.6× the seedream 1.5k tier. Its house look — warm amber bias, compressed micro-contrast, smoothed surfaces — fights §9.2's 5600K neutral requirement and walks straight into §9.8's waxy rejection. We would pay a premium for an image we then reject. **Zero credits allocated. This is a decision, not an oversight.**

---

## 2. The eight-row problem, and how we are not going to lose to it

This is the single highest-risk item on the project and it deserves its own section.

The site is built on a claim — *esattamente otto file* — and generative models cannot count. A cross-section that renders nine kernels is not a weak asset; it is **a lie printed at the top of the page**, and §9.8 makes it an automatic rejection with no discussion.

**Ruling: only ONE asset on this site is required to count. Every other maize image is framed so that the count is physically unresolvable — which is what a real 100mm macro at 22.5° actually delivers anyway.**

| Asset | Count risk | How it is removed |
|---|---|---|
| `ch01-pannocchia` (whole cob) | Would be high if shot flat-on | Prompt specifies 22.5° off vertical and states explicitly that **only three or four rows face the camera and the rest curve away around the cylinder**. This is optically true of any real cob. The count is not assertable from the image, so it cannot be wrong. |
| `ch03-chicchi` (loose kernels) | None | Eleven kernels, deliberately ≠ 8, deliberately unarrangeable into rows. |
| `ch04-chicco` | None | One kernel. |
| `hero-sezione` / `ch03-sezione` | **Total** | See below. |

**The mitigation stack for the cross-section, in order:**

1. **Choose the lowest-N counting task available.** A transverse slice, cut face up, plan view, reads as a disc with **eight kernels around the rim** — one per row. Eight discrete objects on a circle is the easiest count we can ask for. A longitudinal cob face asks the model to count eight *columns of many kernels*, which it will never do.
2. **Give the model a positional scaffold.** The prompt does not say "eight rows". It enumerates: *one kernel at each of the eight compass points — north, north-east, east, south-east, south, south-west, west, north-west.* Enumeration outperforms cardinality for every current model.
3. **Buy the count cheaply, buy the resolution expensively.** Run an 8-candidate lottery at `nano_banana_2_lite` 1k (1 cr each, `--thinking HIGH`) whose only acceptance criterion is *exactly eight*. Composition and texture are irrelevant at this stage.
4. **Escalate the winner, don't re-roll it.** The winning 1k frame is passed as `--image-references` to `nano_banana_pro` at 4k. The geometry — and therefore the count — is carried across; we are buying pixels and surface, not a new arrangement.
5. **Repair before re-rolling.** If a 4k escalation lands at nine, `flux_kontext` can remove one kernel far more cheaply than a fresh lottery. Repair path costs ~1 cr; it is inside the contingency.
6. **Two full lotteries and then we stop.** §8 of this document specifies exactly what ships instead. We do not spend the reserve chasing a cob.

**One further rule, non-negotiable at the gate:** the count is verified by a human placing eight tick marks on a printout of the candidate, not by looking at it and feeling satisfied. Seven and nine both look like eight at a glance, which is exactly why this risk exists.

---

## 3. Budget

**Available: 199.5 credits.** Measured unit costs, re-verified against the live CLI on 2026-07-26 (`higgsfield generate cost`), including the resolution tiers, which discovery §7 did not capture:

| Model | Tier | Credits/image | Note |
|---|---|---|---|
| `z_image` | (no tier) | **0.15** | 1:1/4:3/16:9 only. Texture work. |
| `nano_banana_2_lite` | 1k | **1.00** | `--thinking HIGH`. Best cheap instruction-follower. |
| `flux_2` | 2k `pro` | **1.50** | Cross-family retry only. (1k pro = 1.00; `flex`/`max` tiers are 3–6 and are not purchased.) |
| `seedream_v5_pro` | 1k / **1.5k** | **1.50** | **The workhorse.** 1.5k costs the same as 1k — never order 1k. |
| `seedream_v5_pro` | 2k | **3.00** | Surface-critical plates only. |
| `nano_banana_pro` | 1k / 2k | **2.00** | |
| `nano_banana_pro` | **4k** | **4.00** | The only route to a true 2560 master. |
| `gpt_image_2` | — | 7.00 | **Not purchased (R10).** |
| `seedance_2_0` | 720p, 5s | **22.50** | Matches discovery's measured figure. 4s = 18.00. 1080p 5s = 45.00, unaffordable. |
| `seedance_2_0_mini` | 720p, 5s | **12.50** | Video retry ladder only. |

### 3.1 First-pass cost table

| # | Batch | Asset / master | Model | Tier | AR | n | Unit | **Cost** |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 | `tex-carta` | `z_image` | — | 16:9 | 3 | 0.15 | **0.45** |
| 2 | 0 | `MST-PANNOCCHIA` (style test) | `seedream_v5_pro` | 1.5k | 3:2 | 4 | 1.50 | **6.00** |
| 3 | 1 | `MST-SEZIONE` count lottery | `nano_banana_2_lite` | 1k | 3:2 | 8 | 1.00 | **8.00** |
| 4 | 1 | `MST-SEZIONE` escalation | `nano_banana_pro` | 4k | 3:2 | 2 | 4.00 | **8.00** |
| 5 | 2 | `MST-PANNOCCHIA` final | `nano_banana_pro` | 4k | 3:2 | 2 | 4.00 | **8.00** |
| 6 | 2 | `MST-FARINA` | `seedream_v5_pro` | 2k | 3:2 | 3 | 3.00 | **9.00** |
| 7 | 2 | `MST-MACINA` | `seedream_v5_pro` | 1.5k | 3:2 | 2 | 1.50 | **3.00** |
| 8 | 3 | `MST-BRATTEE` | `seedream_v5_pro` | 1.5k | 3:2 | 3 | 1.50 | **4.50** |
| 9 | 3 | `MST-CHICCHI` | `seedream_v5_pro` | 2k | 1:1 | 3 | 3.00 | **9.00** |
| 10 | 3 | `MST-CHICCO` | `seedream_v5_pro` | 1.5k | 3:2 | 3 | 1.50 | **4.50** |
| 11 | 3 | `MST-BARBA` | `seedream_v5_pro` | 1.5k | 1:1 | 3 | 1.50 | **4.50** |
| 12 | 3 | `MST-GALLETTA` | `seedream_v5_pro` | 2k | 3:2 | 3 | 3.00 | **9.00** |
| 13 | 3 | `MST-GRISSINI` | `seedream_v5_pro` | 1.5k | 3:2 | 3 | 1.50 | **4.50** |
| 14 | 4 | `MST-VIDEO-FARINA` | `seedance_2_0` | 720p / 5s | 3:4 | 1 | 22.50 | **22.50** |
| — | — | `hero-sezione`, `ch03-sezione`, `ch07-farina`, `poster-farina` | *derivative crops* | — | — | 4 | 0.00 | **0.00** |
| | | | | | | | **First pass** | **100.95** |

### 3.2 Named contingency — pre-allocated, not a slush fund

Rejections are expected. These three lines are budgeted *now* so that spending them is a plan, not a panic.

| # | Contingency | Model | Tier | n | Unit | **Cost** |
|---|---|---|---|---|---|---|
| C1 | `MST-SEZIONE` second count lottery | `nano_banana_2_lite` | 1k | 8 | 1.00 | **8.00** |
| C2 | `MST-SEZIONE` second 4k escalation | `nano_banana_pro` | 4k | 2 | 4.00 | **8.00** |
| C3 | Cross-family retry on the waxiest surface plate | `flux_2 pro` | 2k | 2 | 1.50 | **3.00** |
| | | | | | **Contingency** | **19.00** |

### 3.3 The envelope

| | Credits |
|---|---|
| First-pass generation | **100.95** |
| Named contingency | **19.00** |
| **Committed envelope** | **119.95** |
| **HARD RESERVE — untouchable without my sign-off** | **79.55** |
| **Total** | **199.50** |

**The reserve is not spare budget. It is the thing that lets me say "reject it" twelve times without it becoming a project risk.** Any draw on it requires a written reason and an amendment to this table.

**The video is a special case and everyone should know it before Batch 4.** One `seedance_2_0` clip is 22.5 credits — more than every still on the site except the two 4k escalations combined. It therefore gets **exactly one paid attempt at full spec.** Retry ladder if rejected:

1. Attempt 1 — `seedance_2_0`, 720p, 5s, 3:4 — 22.50 (in the first pass).
2. Attempt 2 — `seedance_2_0_mini`, 720p, 5s, 3:4 — 12.50 (**draws on the reserve; requires my sign-off**).
3. Attempt 3 — **there is no attempt 3.** The video is cut and the poster still ships permanently at every breakpoint, which is already the specified mobile behaviour (§12.8). The site loses nothing it was promised.

---

## 4. Model policy — why each model, at each price

**`seedream_v5_pro` @ 1.5k — 1.50 cr — the workhorse.**
It renders organic surface better per credit than anything else on the account: dry fibre, chaff, fracture, starch bloom. Those are precisely the textures whose absence produces §9.8's waxy rejection. And the tier arithmetic is decisive — **1.5k costs the same 1.50 as 1k**, so ordering 1k is simply throwing away 50% of the pixels for free. Nine of the fourteen paid jobs sit here.

**`seedream_v5_pro` @ 2k — 3.00 cr — surface-critical only.**
Bought for exactly three plates: `MST-CHICCHI`, `MST-FARINA`, `MST-GALLETTA`. These are the three subjects where the material *is* the content — kernel skin, wholemeal particle-size variation, puffed-grain mosaic — and where a soft render is not a slightly worse photograph but an outright rejection. Doubling the price buys the micro-detail the rejection checklist is looking for.

**`nano_banana_2_lite` @ 1k — 1.00 cr — the count lottery only.**
Bought for instruction adherence, not for pictures. `--thinking HIGH` on a Gemini-family model is the best chance we have of getting *exactly eight discrete objects*, and at 1 credit we can afford eight rolls of the dice. Same family as `nano_banana_pro`, so a winning arrangement transfers cleanly as a reference. Nothing from this model ships.

**`nano_banana_pro` @ 4k — 4.00 cr — the two plates that must be masters.**
The only tier on the account that produces a genuine 2560-wide 8:5 master without a paid upscale. Bought twice: `MST-SEZIONE` (spans columns 3–7 at `ch03`; the largest render on the site) and `MST-PANNOCCHIA` (`ch01`, and the hero's fallback subject, so it must be able to carry the hero at full size). Its reference-image fidelity is also why it is the escalation model — it will hold the eight-kernel geometry it is handed.

**`flux_2 pro` @ 2k — 1.50 cr — the cross-family retry.**
Held in contingency. If a plate comes back plastic twice from seedream, re-rolling seedream a third time reproduces the failure mode. A different model family is the fix, and at 1.50 it costs no more than the workhorse. (`flex` at 5.00 and `max` at 6.00 are not purchased — we are buying a *different* look, not a more expensive one.)

**`z_image` @ 0.15 cr — the substrate.**
A flat sheet of paper is the least demanding generation on the project and the cheapest model on the account renders it fine. Three rolls cost 0.45. This plate's real job is not to ship — it is to be the **reference image handed to every subsequent object plate**, which is the single strongest mechanism available for making twelve separate generations share one ground, one grain and one light. See §4.1.

**`seedance_2_0` @ 22.50 — the one loop.**
The only video model on the account that will hold a locked-off camera and honour a start image at a price we can pay once. 1080p at 45 credits is 22.5% of the entire budget for one shot and is refused.

### 4.1 The reference chain — how the set stays one shoot

This is the mechanism that answers discovery §4's *"inconsistent lighting, colour and crop, no treatment system"* at generation time rather than in the grade.

```
REF-CARTA  (approved tex-carta, bare paper, NO object)
     │
     ├──► passed as --image-references to EVERY object plate
     │     carries: ground colour, laid structure, fibre, grain,
     │              light quality and colour temperature.
     │     cannot inject a subject, because it contains none.
     │
REF-SEZIONE  (winning 1k lottery frame)
     └──► passed as --image-references to the 4k escalation ONLY
           carries: the eight-kernel geometry.

REF-FARINA  (approved MST-FARINA, cropped to 5:8)
     └──► passed as --start-image to seedance_2_0
           carries: the exact pile, ground, light and grade the
                    loop must not drift from.
```

**A specimen plate is never passed as a reference to another specimen plate.** Passing the cob to the flour prompt is how a cob ends up in the flour.

---

## 5. Asset register

Paths are relative to the repo root. **Masters live in `assets/masters/` (outside `public/`, added to `.gitignore` as `/assets/masters/`); only graded, cropped, encoded derivatives enter `public/`.** Every shipped still is a single `.avif` source consumed by `next/image`, which emits the AVIF/WebP responsive set at q82 per §9.5.

Common to every plate unless stated: **lens** 100mm macro equivalent at f/8, full depth of field, no bokeh, no distortion, no vignette · **light** one bare hard source, ~8° apparent size, 70° elevation, 135° azimuth (upper-left → down-right), 5600K neutral, no fill, no bounce, no rim · **shadow** one only, down-right at 45° in plan, length 0.35 × object height, penumbra ≤ 3px at master width, core 62% of `--inchiostro`, falling to 0 across the final 18% · **ground** uncoated 120gsm laid paper, `#E9E3D6`, edge to edge, no environment · **grade** §9.5 applied identically to all.

---

### `tex-carta` — the substrate plate

| | |
|---|---|
| **Purpose** | Generation reference for the whole set (§4.1). Ships only as a fallback texture if the `feTurbulence` route in §10.1 is abandoned. |
| **Section** | None directly — it is the ground every other plate stands on. |
| **Subject** | A bare sheet of unbleached laid paper. Nothing on it. |
| **Composition** | Fills the frame edge to edge. No object, no shadow, no sheet edge visible. Deliberately featureless — the only plate on the project exempt from the eighth-line rule, because it has no subject to place. |
| **Lighting** | Single hard source, **grazing** — elevation lowered toward 20° for this plate only, so the laid chain lines and cotton fibre pick up as raking micro-relief. This is the one lighting deviation in the set and it is legitimate: the plate exists to record surface, not to sit beside the others. |
| **Lens** | 100mm macro, f/8, perpendicular plan view, sensor parallel to the sheet. |
| **Reference in words** | The blank verso of a Kew herbarium sheet under museum copy-stand light. A Swiss pharmaceutical insert before it was printed. |
| **Ratio / master** | Generate 16:9 → crop to **8:5**, deliver 1280 × 800. |
| **Format / weight** | `.avif` q82 — target **55 KB**, cap 90 KB. |
| **Path** | `assets/masters/tex-carta.png` (reference) · `public/images/textures/carta.avif` (fallback only) |
| **Desktop / mobile / fallback** | Not rendered as an `<img>` in the default build. Fallback role only. |
| **Source** | Higgsfield — `z_image` |
| **Cost** | **0.45** (3 candidates) |

---

### `hero-sezione` + `ch03-sezione` — the cross-section  ⚠ **HIGHEST RISK**

| | |
|---|---|
| **Master ID** | `MST-SEZIONE` — one exposure, two crops (R8) |
| **Purpose** | The only image on the site that proves the claim the brand is built on. `hero` establishes the treatment contract in the first three seconds; `ch03` is the argument itself — *"this chapter has to show eight, not assert it"*. |
| **Sections** | `hero` (columns 5–7) · `ch03` (columns 3–7, large) |
| **Subject** | A single transverse slice cut clean through a dried cob, lying flat, cut face up: a disc ~30mm across, ~12mm thick, **eight rounded orange-red kernels evenly spaced around the rim**, pale fibrous cob core at the centre, dry floury interior showing where the blade passed. |
| **Composition** | Plan view, 0° from vertical. Disc centroid on the **5/8 line** for the hero crop and on the **3/8 line** for the `ch03` crop — two different eighth-lines from one master, which is why the master is framed loose. Subject ≤ 30% of frame area in the hero crop, ≤ 38% in `ch03`. ≥ 24% of frame width of clear paper on the top and right in both. |
| **Lighting** | Standard set light. The rim kernels each throw one short hard shadow onto the disc's cut face and the disc throws one shadow onto the paper — **one shadow *system*, one azimuth**, no second source lifting the far side. |
| **Lens** | 100mm macro, f/8. The cut face and the paper are equally sharp; the 12mm of thickness must not produce focus falloff. |
| **Reference in words** | A Blossfeldt plate of a seed head, but cut rather than posed. A cross-sectioned specimen mounted on a museum record card with the scale bar removed. Cold, clinical, extremely dry. |
| **Ratio / master** | Generate **3:2 @ 4k** → crop to 8:5. `ch03-sezione` delivered **2560 × 1600**; `hero-sezione` delivered **1600 × 1000** (a tighter crop of the same master). |
| **Format / weight** | `.avif` q82 — `ch03` target **280 KB** / cap 400 KB · `hero` target **120 KB** / cap 190 KB |
| **Paths** | `public/images/generated/ch03-sezione.avif` · `public/images/generated/hero-sezione.avif` |
| **Desktop** | Hero: columns 5–7. `ch03`: columns 3–7 at large scale. |
| **Mobile** | Hero: full-bleed-minus-rail above the display type. `ch03`: the widest image on the site, full-bleed-minus-rail. |
| **Alt (IT)** | *Sezione trasversale di una pannocchia di Mais Rosso Ottofile: otto file di chicchi.* |
| **Fallback** | §8.1 — the most consequential fallback on the project. |
| **Source** | Higgsfield — `nano_banana_2_lite` lottery → `nano_banana_pro` 4k escalation |
| **Cost** | **16.00** (8 × 1.00 lottery + 2 × 4.00 escalation) |

---

### `ch01-pannocchia` — the whole cob

| | |
|---|---|
| **Master ID** | `MST-PANNOCCHIA` |
| **Purpose** | *"The only full-object image in the record"* — establishes the object whole, once, so every later fragment reads as a part of something. Also the **style test** (Batch 0) and the **hero's fallback subject**. |
| **Section** | `ch01 — La varietà` |
| **Subject** | One dried cob, husk removed, ~14cm, slender and tapering, kernels rounded and tightly packed, deep orange-red, matte, a few missing near the tip leaving a pale gap in the rachis. |
| **Composition** | **22.5° off vertical**, cob on a slight diagonal. **Only three or four rows face the camera; the rest curve away around the cylinder** — this is what removes the count risk (§2) and it is also simply what a real cob looks like at that angle. Centroid on the **3/8 line**, running toward the lower right. Subject ≤ 34% of frame area. ≥ 24% clear paper top and right. |
| **Lighting** | Standard. Light from upper-left rakes across the kernel rows so each kernel gets its own micro-shadow on its lower-right side; the cob throws one shadow to the lower right. |
| **Lens** | 100mm macro, f/8 — the near tip and far tip equally sharp along the whole 14cm. |
| **Reference in words** | A type specimen laid on the card before it was labelled. Not "corn on the cob" — an object being recorded. |
| **Ratio / master** | Generate **3:2 @ 4k** → crop to 8:5, deliver **2560 × 1600**. |
| **Format / weight** | `.avif` q82 — target **270 KB**, cap 400 KB |
| **Path** | `public/images/generated/ch01-pannocchia.avif` |
| **Desktop** | Columns 5–7, above the data column. |
| **Mobile** | Image → body → data, stacked; full-bleed-minus-rail. |
| **Alt (IT)** | *Pannocchia intera di Mais Rosso Ottofile, varietà Albese, su fondo di carta.* |
| **Source** | Higgsfield — `seedream_v5_pro` 1.5k (style test) → `nano_banana_pro` 4k (final) |
| **Cost** | **14.00** (4 × 1.50 style test + 2 × 4.00 final) |

---

### `ch02-brattee` — the dried husk

| | |
|---|---|
| **Master ID** | `MST-BRATTEE` |
| **Purpose** | *"Age and archive, without nostalgia props."* A brittle fragment reads as an old record far better than sepia would. |
| **Section** | `ch02 — Il mais del Re` |
| **Subject** | One single husk leaf, pale straw-bone, curled and brittle, long parallel veins raised, one edge split, slightly translucent where thin, a little chaff fallen beside it. |
| **Composition** | Plan view, 0°. Leaf lying at an angle, curl lifting one end 10–15mm off the paper. Centroid on the **5/8 line**. Subject ≤ 32% of frame area. |
| **Lighting** | Standard. The curl is the whole point: the lifted end catches the raking light and throws a longer hard shadow than the flat end, so the shadow's *length varies along the object* while its direction never does. |
| **Lens** | 100mm macro, f/8 — flat end and lifted end equally sharp. |
| **Reference in words** | A pressed leaf that was never quite pressed flat, on a herbarium sheet. Dry to the point of discomfort. |
| **Ratio / master** | Generate **3:2 @ 1.5k** → crop to 8:5, deliver **1536 × 960**. |
| **Format / weight** | `.avif` q82 — target **110 KB**, cap 180 KB |
| **Path** | `public/images/generated/ch02-brattee.avif` |
| **Desktop** | Columns 5–7. |
| **Mobile** | Full-bleed-minus-rail, 8:5 (per R2). |
| **Alt (IT)** | *Brattee secche di pannocchia.* |
| **Source** | Higgsfield — `seedream_v5_pro` |
| **Cost** | **4.50** |

---

### `ch03-chicchi` — loose kernels  ⚠ **HIGH RISK**

| | |
|---|---|
| **Master ID** | `MST-CHICCHI` |
| **Purpose** | Secondary macro at `ch03`. The kernel surface at maximum magnification — the site's proof that this is photography and not rendering. |
| **Section** | `ch03 — Otto file` |
| **Subject** | **Eleven** loose kernels — deliberately not eight, deliberately uncountable-into-rows — scattered in a loose irregular drift, none touching more than one other. Each ~9mm, rounded, plump, deep orange-red, matte, finely wrinkled at the germ end, pale where it broke from the cob. Chaff and starch dust around them. |
| **Composition** | Plan view, 0°. **No arrangement, no line, no arc, no shape, no bilateral symmetry.** Drift centroid on the **3/8 line**. Cluster ≤ 26% of frame area. |
| **Lighting** | Standard. Eleven kernels, eleven shadows, **all pointing the same way** — this is the frame where a second light source is most obvious and most fatal. |
| **Lens** | 100mm macro, f/8. Every kernel equally sharp; the near-far spread across the drift must not produce falloff. |
| **Reference in words** | A dosette of seed tipped out of a seed-bank envelope onto the record card. |
| **Ratio / master** | Generate **1:1 @ 2k** → deliver **1600 × 1600**. |
| **Format / weight** | `.avif` q82 — target **170 KB**, cap 250 KB |
| **Path** | `public/images/generated/ch03-chicchi.avif` |
| **Desktop / tablet** | Secondary plate at `ch03`. |
| **Mobile** | **Dropped entirely** (§13.6). Not scaled, not cropped — dropped. |
| **Alt (IT)** | *Chicchi sciolti, tondi e arancio.* |
| **⚠ Invariant 2 note** | This plate is the `--chicco` budget's worst case (§4.4). **Rendered saturated kernel area must stay under 1.6% of a 1440 × 900 viewport (20,736 px²).** At its rendered size the eleven kernels are comfortably inside that — but if it is ever placed in the same viewport as a `--chicco` UI mark, **the rail's active row reverts to `--inchiostro`.** The rail is subordinate to the budget. |
| **Source** | Higgsfield — `seedream_v5_pro` 2k |
| **Cost** | **9.00** |

---

### `ch04-chicco` — the single kernel  ⚠ **HIGH RISK (compositional)**

| | |
|---|---|
| **Master ID** | `MST-CHICCO` |
| **Purpose** | *"Scale of loss expressed as scale in frame."* The emptiest composition on the site. It is supposed to be uncomfortable. |
| **Section** | `ch04 — Quasi estinto` |
| **Subject** | One kernel. Nothing else. |
| **Composition** | Plan view, 0°. **Extreme wide framing.** The kernel occupies **< 2% of the picture area**, placed on the **1/8 line** horizontally and slightly below the vertical midpoint. Everything else is empty paper. This inverts §8's *"subject ≤ 38%"* rule far past its floor, which is the entire point of the chapter. |
| **Lighting** | Standard. One tiny hard shadow, ~3mm long, down-right. The shadow is the only other event in the frame. |
| **Lens** | 100mm macro, f/8 — but framed wide, so the kernel is small and still fully resolved. Paper fibre must be legible across the whole empty field, or the emptiness reads as a flat fill rather than as a surface. |
| **Reference in words** | A single seed in the middle of an enormous blank card. Museum vitrine with one object and no label. |
| **Ratio / master** | Generate **3:2 @ 1.5k** → crop to 8:5, deliver **1536 × 960**. |
| **Format / weight** | `.avif` q82 — target **75 KB**, cap 130 KB (mostly empty paper; it should be the lightest shipped plate) |
| **Path** | `public/images/generated/ch04-chicco.avif` |
| **Desktop** | Columns 6–7, tiny, three-quarters of the block left empty. |
| **Mobile** | **Does not scale up.** Stays small in a tall empty block (per R3, this is why it is 8:5). |
| **Alt (IT)** | *Un solo chicco di Mais Rosso Ottofile su fondo di carta.* |
| **Risk** | Models resist tiny-subject-in-vast-void framing and will zoom in. See §8.4 for the compositing fallback, which is free and reliable. |
| **Source** | Higgsfield — `seedream_v5_pro` |
| **Cost** | **4.50** |

---

### `ch05-barba` — corn silk (per R5)

| | |
|---|---|
| **Master ID** | `MST-BARBA` |
| **Purpose** | The *"quiet substrate note"* for the practice chapter, where the data column is the hero and the image must not compete. |
| **Section** | `ch05 — Il campo` |
| **Subject** | One small cluster of dried silk — twenty or thirty fine hair-like strands, russet-brown fading to pale straw at the tips, tangled loosely into one knot with a few strands trailing free. |
| **Composition** | Plan view, 0°. Knot centroid on the **5/8 line**, trailing strands running toward the lower left so the composition has a direction without a diagonal rule. Subject ≤ 22% of frame area. |
| **Lighting** | Standard. Individual strands catch the raking light and each casts a hairline shadow — this is the plate where "one hard source" is most visible and most beautiful, and where a fill light would instantly turn it into a soft-focus food photograph. |
| **Lens** | 100mm macro, f/8. **Every strand a distinct filament** — nothing fused, nothing clumped into a solid mass, no hair-render smear. |
| **Reference in words** | A lock of fibre on a conservation record. Blossfeldt's stamens. |
| **Ratio / master** | Generate **1:1 @ 1.5k** → deliver **1536 × 1536** (declared deviation, R9). |
| **Format / weight** | `.avif` q82 — target **120 KB**, cap 200 KB |
| **Path** | `public/images/generated/ch05-barba.avif` |
| **Desktop / tablet** | Small, subordinate to the promoted data column. |
| **Mobile** | **Dropped** (1:1, §13.6). `ch05` runs data-first and typographic-only on mobile — which `content-plan.md` §6 already declares acceptable and *"arguably more on-concept"*. |
| **Alt (IT)** | *Barba di pannocchia essiccata.* |
| **Source** | Higgsfield — `seedream_v5_pro` |
| **Cost** | **4.50** |

---

### `ch06-macina` — the millstone fragment

| | |
|---|---|
| **Master ID** | `MST-MACINA` |
| **Purpose** | *"The hard mineral that does it"* — one half of the transformation chapter's two states. The only non-organic subject on the site. |
| **Section** | `ch06 — La pietra` |
| **Subject** | One broken fragment of a granite millstone, ~12cm across: one face worn smooth and faintly scored with the straight radial dressing grooves a millwright cut, broken edges rough and crystalline, fine grey grit around it. |
| **Composition** | **22.5° off vertical**, so the worn face and one broken edge are both read. Centroid on the **3/8 line**. Subject ≤ 30% of frame area. |
| **Lighting** | Standard. The dressing grooves are shallow and only exist under a raking hard light — this plate fails completely under soft light, which is a useful check on the whole set. |
| **Lens** | 100mm macro, f/8 — crystalline fracture and the worn face equally sharp. |
| **Reference in words** | A geological hand specimen, dry and unpolished. **Not** slate, **not** marble, **not** a chopping board. |
| **Compliance note for QA** | §9.6 forbids slate, marble and concrete **as props and surfaces**. This is a sanctioned *subject* under §9.7 #9. Do not reject it for being stone. **Do** reject it if it is polished, wet, veined like marble, or carries any carved mark, letter or number. |
| **Ratio / master** | Generate **3:2 @ 1.5k** → crop to 8:5, deliver **1536 × 960**. |
| **Format / weight** | `.avif` q82 — target **130 KB**, cap 200 KB |
| **Path** | `public/images/generated/ch06-macina.avif` |
| **Desktop** | Columns 2–4 (stone left, flour right). |
| **Tablet** | Half scale, side by side with the flour. |
| **Mobile** | **Dropped** — `content-plan.md` §6 specifies flour only on mobile. |
| **Alt (IT)** | *Frammento di macina in pietra.* |
| **Source** | Higgsfield — `seedream_v5_pro` |
| **Cost** | **3.00** |

---

### `ch06-farina` + `ch07-farina` — stone-ground flour

| | |
|---|---|
| **Master ID** | `MST-FARINA` — one exposure, two crops (R8), and the video's start image |
| **Purpose** | *"The powder that results"* at `ch06`; the third registry entry (Farina di Mais Rosso, 500 g) at `ch07`. |
| **Sections** | `ch06 — La pietra` · `ch07 — Tre referenze` |
| **Subject** | A low irregular pile of coarse stone-ground maize flour, ~10cm across, ~2cm high, surface soft and slightly collapsed. Pale gold flecked with darker orange-red bran and hard germ fragments — **a coarse wholemeal grind with visible particle-size variation, not a uniform powder.** A thin drift of loose flour on the paper around it. |
| **Composition** | **22.5° off vertical.** Pile centroid on the **3/8 line** for the `ch06` crop and the **5/8 line** for the `ch07` crop. Subject ≤ 28% of frame area. Framed loose enough that both crops clear the 24% void rule. |
| **Lighting** | Standard. The pile's upper-left flank is lit and its lower-right flank falls into its own shade, then one hard shadow runs off to the lower right. The drift of loose flour picks up as thousands of tiny individual shadows — the strongest available signal that this is a real surface and not a gradient. |
| **Lens** | 100mm macro, f/8. Individual particles resolved at the pile's near edge *and* at its far edge. |
| **Reference in words** | A material sample on a technical data card. Muji, not a bakery. |
| **Ratio / master** | Generate **3:2 @ 2k** → crop to 8:5, deliver **2048 × 1280** each. |
| **Format / weight** | `.avif` q82 — target **200 KB** each, cap 320 KB |
| **Paths** | `public/images/generated/ch06-farina.avif` · `public/images/generated/ch07-farina.avif` |
| **Desktop** | `ch06`: columns 5–7 (the slot the video occupies). `ch07`: the narrowest of the three product columns. |
| **Mobile** | `ch06`: **the flour still is the whole chapter's imagery**, 8:5, full-bleed-minus-rail — it replaces the video, which is not rendered at all. `ch07`: stacked entry image. |
| **Alt (IT)** | *Farina di Mais Rosso macinata a pietra, in un cumulo basso.* |
| **Source** | Higgsfield — `seedream_v5_pro` 2k |
| **Cost** | **9.00** |

---

### `ch07-galletta` — the broken gallette  ⚠ **HIGH RISK**

| | |
|---|---|
| **Master ID** | `MST-GALLETTA` |
| **Purpose** | Registry entry 01 — **Maisette**, gallette, 120 g. Presented as *the thing itself, broken*, because no packaging exists and none may be invented (discovery §8). |
| **Section** | `ch07 — Tre referenze` |
| **Subject** | One round puffed maize cake **broken cleanly in two**, the halves lying apart with the break edges facing each other. The surface is the irregular fused mosaic of burst maize grains — pale cream and toasted amber with orange-red flecks, full of small voids and rough protrusions. The broken edge is ragged and shows the airy interior. Crumbs on the paper. |
| **Composition** | Plan view, 0°. The two halves **not** mirrored, **not** parallel, **not** reassembled into a circle — offset and rotated relative to each other. Combined centroid on the **5/8 line**. ≤ 30% of frame area. **Two objects, but only because they are one object broken; a third piece is a rejection.** |
| **Lighting** | Standard. The mosaic's protrusions each throw a tiny hard shadow to the lower right; the two halves each throw one shadow. |
| **Lens** | 100mm macro, f/8 — the fused-grain mosaic legible grain by grain. |
| **Reference in words** | A fractured mineral aggregate. A material sample snapped to expose its section. **Not** a snack. |
| **Why this is high risk** | Puffed cereal is the single most reliable trigger for CGI-looking output — models render it as a smooth beige disc with an embossed pattern. If the individual burst grains are not separately resolved, it is rejected. This is the first candidate for the C3 `flux_2` cross-family retry. |
| **Ratio / master** | Generate **3:2 @ 2k** → crop to 8:5, deliver **2048 × 1280**. |
| **Format / weight** | `.avif` q82 — target **210 KB**, cap 320 KB |
| **Path** | `public/images/generated/ch07-galletta.avif` |
| **Desktop** | The widest of the three unequal product columns. |
| **Mobile** | Stacked entry image, 8:5 (per R4). |
| **Alt (IT)** | *Galletta di Mais Rosso Ottofile spezzata.* |
| **Source** | Higgsfield — `seedream_v5_pro` 2k |
| **Cost** | **9.00** |

---

### `ch07-grissini` — grissini fragments

| | |
|---|---|
| **Master ID** | `MST-GRISSINI` |
| **Purpose** | Registry entry 02 — **Maissini**. *"Grissini, non gallette."* The plate has to make the correction visually as well as in copy. |
| **Section** | `ch07 — Tre referenze` |
| **Subject** | **Three** broken lengths of thin maize breadstick, unequal lengths, unequal angles. ~1cm thick, irregular and hand-rolled, crust pale gold with darker amber blistering and a faint orange cast from the flour; the snapped ends show a dry open crumb. Crumbs and crust flakes nearby. |
| **Composition** | Plan view, 0°. **Not parallel, not fanned, not bundled, not crossed into an X.** Three sticks lying as they fell. Combined centroid on the **3/8 line**. ≤ 30% of frame area. This is the plate §9.6's *"multiple objects arranged decoratively"* clause is aimed at — the arrangement must look like gravity, not styling. |
| **Lighting** | Standard. Three sticks, three shadows, one direction. The blistered crust reads only under raking light. |
| **Lens** | 100mm macro, f/8 — the open crumb at each snapped end resolved. |
| **Reference in words** | Three fragments of a core sample laid out for measurement. |
| **Ratio / master** | Generate **3:2 @ 1.5k** → crop to 8:5, deliver **1536 × 960**. |
| **Format / weight** | `.avif` q82 — target **125 KB**, cap 200 KB |
| **Path** | `public/images/generated/ch07-grissini.avif` |
| **Desktop** | The middle of the three unequal product columns. |
| **Mobile** | Stacked entry image, 8:5 (per R4). |
| **Alt (IT)** | *Frammenti di grissini di mais.* |
| **Source** | Higgsfield — `seedream_v5_pro` |
| **Cost** | **4.50** |

---

### `vid-farina` — the flour fall  ⚠ **HIGH RISK / SINGLE PAID ATTEMPT**

| | |
|---|---|
| **Master ID** | `MST-VIDEO-FARINA` |
| **Purpose** | The site's only moving image, depicting the only irreversible act in the record. §12.8: one video, `ch06`, or none. |
| **Section** | `ch06 — La pietra` |
| **Subject** | A thin steady stream of coarse stone-ground flour falling vertically onto the low pile below, which grows slightly and slumps. Individual particles visible in the fall. |
| **Composition** | Portrait **5:8**. The falling stream on the **3/8 vertical line**, entering from above the top edge; the pile in the lower third. The right two-thirds of the frame is empty paper. Subject ≤ 30% of frame area, as for the stills. |
| **Camera behaviour** | **Locked-off tripod. The camera does not move at any point.** No push-in, no pull-back, no pan, no tilt, no orbit, no handheld drift, no rack focus, no zoom, no speed ramp. This is the specification most likely to be ignored by the model and it is the first thing checked at review. |
| **Lighting** | Identical to `MST-FARINA` and locked by passing that still as `--start-image`. The light does not change across the clip; exposure does not change; no flicker, no colour drift. |
| **Duration / loop** | Generated at **5s**, trimmed to **4.8s** (6 × 0.8, inside §12.8's 6.4s cap and on the 8-system). Seamless loop: first and last frame identical within **2% RMS** — enforced in post by a short cross-dissolve at the seam if the native loop does not hold. `loop`, `muted`, `playsInline`, `preload="none"`. Audio generation off at the model. |
| **Poster frame** | **Frame 0 of the graded clip**, exported as `poster-farina.webp`. Zero credits. §12.8 requires the poster to be the same frame, graded identically — extracting it from the finished clip guarantees that by construction rather than by care. |
| **Ratio / master** | Generate **3:4 @ 720p** (960 × 1280) → crop width to **5:8** → **800 × 1280**. |
| **Format / weight** | `farina.av1.mp4` target **900 KB** · `farina.h264.mp4` target **1.6 MB** · **hard cap 2.4 MB each** (§12.8). Poster `.webp` q82, target **70 KB**. |
| **Paths** | `public/video/generated/farina.av1.mp4` · `public/video/generated/farina.h264.mp4` · `public/posters/farina.webp` |
| **Desktop / tablet** | Occupies the flour slot at `ch06`, columns 5–7. Autoplays only at ≥ 50% in viewport, paused by IntersectionObserver off-screen. No controls, no play button, no overlay. |
| **Mobile** | **The `<video>` element is not rendered at all** (§12.8) — `poster-farina.webp` ships as a permanent `<img>`. No connection logic, no toggle. |
| **Reduced motion** | Poster only. No controls added — there are no icons on this site. |
| **Alt** | Decorative, `alt=""`. |
| **Source** | Higgsfield — `seedance_2_0`, 720p, 5s, 3:4, `--start-image` = `REF-FARINA` |
| **Cost** | **22.50** |

---

## 6. Prompt library — ready to run

**Preconditions.**

```bash
export HF=/opt/homebrew/bin/higgsfield
mkdir -p assets/masters assets/refs
# Always price a batch before committing it:
#   $HF generate cost <model> [--flags] --prompt "..."
```

**Reading the strings.** Every prompt is built from the same seven blocks in the same order — subject, composition, camera, light, shadow, ground, grade/texture, prohibitions. That repetition is deliberate: it is what makes twelve independent generations read as one shoot, and it is why the prohibition clause is last (leading with negations summons what it names).

**Candidates.** Each command produces **one** image. Run it `n` times — the loop form is shown in Batch 0 and applies throughout.

---

### 6.1 `tex-carta` — 3 × `z_image` — 0.45 cr

```bash
for i in 1 2 3; do
$HF generate create z_image \
  --aspect-ratio 16:9 \
  --wait \
  --prompt "A flat sheet of uncoated 120gsm laid paper filling the entire frame edge to edge, photographed perpendicular from directly above with the sensor exactly parallel to the sheet. The paper is a warm unbleached bone colour, hex E9E3D6, close to the tone of old rag stock. Its laid structure is just visible: faint parallel chain lines and finer laid wires picked out by the light. Visible cotton fibre in the surface, a scattering of tiny darker specks and inclusions pressed into the pulp, a slight unevenness across the sheet, one shallow crease running out of frame. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, arriving from the upper left at a low grazing angle so that the fibre and the laid lines pick up as raking micro-relief. No fill, no bounce card, no reflector, no second source. Neutral 5600K daylight, colour accurate, no warm cast. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Very low saturation, near neutral. Fine monochrome film grain over the whole frame. Real photographic micro-texture, nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered. Nothing else is in the frame: no object, no shadow of any object, no edge of the sheet, no table, no environment. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No logo, no border, no frame."
done
```

**Approval → save the winner as `assets/refs/REF-CARTA.png`.** Every subsequent object plate references it.

---

### 6.2 `MST-PANNOCCHIA` — style test — 4 × `seedream_v5_pro` 1.5k — 6.00 cr

> **This is the batch that decides the look of the whole site.** Nothing else is generated until I have approved one of these four.

```bash
for i in 1 2 3 4; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 1.5k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "One single dried maize cob, husk and silk entirely removed, lying alone on a sheet of paper. The cob is about 14 centimetres long, slender and tapering toward the tip, its kernels rounded and plump and tightly packed, deep orange-red, dry and completely matte, each kernel finely wrinkled at its base. A few kernels are missing near the tip, leaving pale gaps in the fibrous white rachis beneath. The cob lies on a slight diagonal running toward the lower right, its centre placed three eighths of the way across the frame from the left, and it occupies about a third of the picture area, with at least a quarter of the frame width of clear empty paper between it and the top and right edges. Shot on a 100mm macro lens at f/8 with the camera 22.5 degrees off vertical, seen from slightly above and to one side, never 45 degrees. Because the camera is off to one side, only the three or four rows of kernels facing the camera are legible and all the remaining rows curve away out of sight around the cylinder of the cob. Full depth of field: the near tip and the far tip are equally sharp, and every part of the frame is equally in focus. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, so the light arrives from the upper left and travels down to the right, raking across the kernel rows so that each kernel casts its own tiny shadow on its lower-right side. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Exactly one shadow is thrown by the cob, down and to the right at 45 degrees in plan, short, about a third of the cob's height above the paper, with a hard almost cut edge and no visible penumbra, dense at its core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadow. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than that single shadow. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the maize orange-red the one saturated thing in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: dust motes, loose chaff, hairline fractures in the dry kernels, dry starch bloom, microscopic pitting, uneven matte surface. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, boxes, bags, jars, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.3 `MST-SEZIONE` — count lottery — 8 × `nano_banana_2_lite` 1k — 8.00 cr

> Acceptance criterion for this batch is **one thing only: exactly eight kernels.** Composition, texture and grade are not assessed here.

```bash
for i in 1 2 3 4 5 6 7 8; do
$HF generate create nano_banana_2_lite \
  --aspect-ratio 3:2 --thinking HIGH \
  --wait \
  --prompt "A single transverse slice cut cleanly through a dried maize cob with a sharp blade, lying flat on a sheet of paper with the cut face upward, photographed perpendicular from directly above. The slice is a disc about 30 millimetres across and 12 millimetres thick. Around the rim of the disc there are EXACTLY EIGHT kernels — eight, not seven, not nine, not ten, not twelve — one for each of the cob's eight rows, evenly spaced around the circumference: one kernel at each of the eight compass points, north, north-east, east, south-east, south, south-west, west and north-west. Count them: there are eight. Each kernel is rounded, plump, deep orange-red and matte, and its cut face shows the dry starchy interior slightly floury where the blade passed. At the centre of the disc is the pale fibrous white cob core. Shot on a 100mm macro lens at f/8, plan view, sensor exactly parallel to the paper, full depth of field with every part of the frame equally sharp, no bokeh, no shallow focus, no lens distortion, no vignette. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right. No fill, no bounce, no reflector, no rim light, no second source. Neutral 5600K daylight, no warm cast. Exactly one shadow, thrown by the disc down and to the right at 45 degrees in plan, short and hard-edged. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge. No table, no surface behind, no environment. Flat linear grade, lifted blacks, low saturation, fine monochrome film grain. Real photographic micro-texture, nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed. The disc sits off-centre and occupies less than a third of the picture area, with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands, fingers or knives. No packaging, plates, bowls, boards, cloth or props. No wood, burlap, slate or marble. Not symmetrical in composition, not centred in the frame."
done
```

**Approval → save the winning frame as `assets/refs/REF-SEZIONE.png`.** Verify the count with eight tick marks on a printout (§2). If **zero** of the eight candidates shows exactly eight, spend **C1** (a second identical lottery) before escalating. If both lotteries fail, go to §8.1.

---

### 6.4 `MST-SEZIONE` — 4k escalation — 2 × `nano_banana_pro` 4k — 8.00 cr

> The reference carries the geometry. We are buying pixels and surface, not a new arrangement.

```bash
for i in 1 2; do
$HF generate create nano_banana_pro \
  --aspect-ratio 3:2 --resolution 4k \
  --image-references assets/refs/REF-SEZIONE.png \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "Reproduce the arrangement in the first reference image exactly, at high resolution and with true photographic surface detail. Keep the kernel count and the kernel positions identical to the reference: there are EXACTLY EIGHT kernels around the rim of the disc, one at each of the eight compass points, and no kernel may be added, removed or moved. Use the second reference image for the ground: uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, faint laid chain lines catching the grazing light, visible cotton fibre and tiny darker inclusions. A single transverse slice cut cleanly through a dried maize cob, lying flat with the cut face upward, a disc about 30 millimetres across and 12 millimetres thick, the eight rim kernels rounded and plump and deep orange-red and matte, each cut face showing dry floury starch where the blade passed, the pale fibrous white cob core at the centre. Shot on a 100mm macro lens at f/8, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: the cut face, the disc's thickness and the paper are all equally sharp. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right, so each rim kernel throws one short hard shadow across the cut face and the disc throws one shadow onto the paper. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour. Exactly one shadow from the disc, down and to the right at 45 degrees in plan, about a third of the disc's height in length, hard-edged with no visible penumbra, dense at its core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, the maize orange-red the one saturated thing in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: dust motes, chaff, hairline cracks in the dried starch, microscopic pitting, uneven matte surface. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands, fingers or blades. No packaging, plates, bowls, boards, cloth or props. No wood, burlap, slate or marble. Not symmetrical, not centred."
done
```

---

### 6.5 `MST-PANNOCCHIA` — final — 2 × `nano_banana_pro` 4k — 8.00 cr

Identical prompt to §6.2, with the approved style-test frame added as the leading reference so the final inherits the sign-off:

```bash
for i in 1 2; do
$HF generate create nano_banana_pro \
  --aspect-ratio 3:2 --resolution 4k \
  --image-references assets/refs/REF-STILE-PANNOCCHIA.png \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "<the exact prompt string from §6.2, prefixed with:> Reproduce the subject, framing, lighting, shadow and grade of the first reference image exactly, at high resolution and with true photographic surface detail; use the second reference image for the paper ground. "
done
```

---

### 6.6 `MST-FARINA` — 3 × `seedream_v5_pro` 2k — 9.00 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 2k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "A low irregular pile of coarse stone-ground maize flour resting on a sheet of paper, about 10 centimetres across and 2 centimetres high, its surface soft and slightly collapsed as though it has just settled. The flour is pale gold flecked all through with darker orange-red bran specks and tiny hard fragments of germ: it is not a uniform powder, it is a coarse wholemeal grind with obvious particle-size variation, some particles almost gritty. A thin scatter of loose flour has drifted from the pile onto the paper around it, each stray particle catching the light and casting its own tiny shadow. The pile's centre sits three eighths of the way across the frame from the left and it occupies less than a third of the picture area, with at least a quarter of the frame width of clear empty paper between it and the top and right edges. Shot on a 100mm macro lens at f/8 with the camera 22.5 degrees off vertical, seen from slightly above and to one side, never 45 degrees. Full depth of field: individual particles are resolved at the near edge of the pile and at the far edge alike, and every part of the frame is equally sharp. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, so the light arrives from the upper left and travels down to the right: the pile's upper-left flank is lit and its lower-right flank falls into its own shade. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Exactly one shadow is thrown by the pile, down and to the right at 45 degrees in plan, short, about a third of the pile's height, with a hard almost cut edge and no visible penumbra, dense at its core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadow. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than that single shadow. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the maize orange-red flecks the one saturated thing in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: dust motes, loose chaff, dry starch bloom, microscopic pitting, an uneven matte surface. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox, and keep the composition readable whether the pile falls left of centre or right of centre in the final crop. Nothing else is in the frame. No flour cloud in the air, no dust haze, no flour falling, no steam, no smoke, no water, no droplets. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, boxes, bags, jars, bottles or sacks. No plates, bowls, scoops, spoons, sieves, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. Not symmetrical, not centred."
done
```

---

### 6.7 `MST-MACINA` — 2 × `seedream_v5_pro` 1.5k — 3.00 cr

```bash
for i in 1 2; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 1.5k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "One single broken fragment of an old granite millstone lying on a sheet of paper: a rough wedge of coarse grey stone about 12 centimetres across. One face of it is worn smooth from decades of use and is faintly scored with the straight radial dressing grooves a millwright cut into it, shallow and parallel; the broken edges are rough, angular and crystalline, showing the quartz and feldspar grain of the granite. A fine grey grit and a little stone dust lie on the paper around it. The stone is dry, matte and completely unpolished. Its centre sits three eighths of the way across the frame from the left and it occupies less than a third of the picture area, with at least a quarter of the frame width of clear empty paper between it and the top and right edges. Shot on a 100mm macro lens at f/8 with the camera 22.5 degrees off vertical, so that both the worn face and one broken edge are read in the same frame, never 45 degrees. Full depth of field: the crystalline fracture and the worn face are equally sharp and every part of the frame is equally in focus. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right at a raking angle so that the shallow dressing grooves and the crystalline fracture both pick up as relief. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Exactly one shadow, thrown down and to the right at 45 degrees in plan, short, about a third of the stone's height, with a hard almost cut edge and no visible penumbra, dense at its core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadow. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than that single shadow. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, near neutral throughout, since there is no maize in this frame. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: stone dust, hairline fractures, microscopic pitting, an uneven matte surface. Nothing polished, nothing wet, nothing oiled, nothing glossy, no specular highlights, nothing waxy, nothing plastic, nothing over-smoothed, nothing rendered. It is granite, not marble: no veining, no swirls, no mirror finish. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. No carved letters, numbers, dates, initials, maker's marks, symbols, text, labels, stickers, stamps, printing, watermarks or writing of any kind anywhere on the stone or on the paper. No people, faces, hands or fingers. No mill, no machinery, no packaging, no plates, bowls, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.8 `MST-BRATTEE` — 3 × `seedream_v5_pro` 1.5k — 4.50 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 1.5k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "One single dried husk leaf stripped from a maize cob, lying alone on a sheet of paper. It is a pale straw-bone colour, brittle and completely dry, its long parallel veins raised along its length, one edge split where it tore, and it is curled so that one end lifts ten or fifteen millimetres clear of the paper while the other lies flat. Where the leaf is thinnest it is slightly translucent and the light passes through it. A little chaff dust has fallen beside it. The leaf lies at an angle across the frame, its centre placed five eighths of the way across from the left, and it occupies less than a third of the picture area, with at least a quarter of the frame width of clear empty paper between it and the top and left edges. Shot on a 100mm macro lens at f/8, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: the flat end and the lifted curled end are equally sharp and every part of the frame is equally in focus. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right, raking along the raised veins so they read as ridges. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Exactly one shadow, thrown down and to the right at 45 degrees in plan, hard-edged with no visible penumbra, dense at its core and fading to nothing over its last fifth, and longer beneath the lifted curled end than beneath the flat end because that end stands higher off the paper. Its direction never varies. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadow. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than that single shadow. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, near neutral, the husk almost the same value as the paper it lies on. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: chaff, dust motes, hairline cracks along the veins, torn fibres at the split edge, an uneven matte surface. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. A single leaf only, not two, not a pile, not a bundle. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, boxes, bags, jars, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.9 `MST-CHICCHI` — 3 × `seedream_v5_pro` 2k, 1:1 — 9.00 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 1:1 --resolution 2k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "Eleven loose maize kernels scattered on a sheet of paper in a loose irregular drift, exactly as they would fall from a hand: not arranged, not in a line, not in an arc, not in a circle, not in any shape, and none of them touching more than one other. Each kernel is rounded and plump, about 9 millimetres across, deep orange-red, dry and completely matte, its surface finely wrinkled toward the germ end and pale and slightly torn at the tip where it broke away from the cob. A little chaff and a dusting of loose starch lie on the paper around them. The drift's centre sits three eighths of the way across the frame from the left and the whole cluster occupies about a quarter of the picture area, with at least a quarter of the frame width of clear empty paper between it and the top and right edges. Shot on a 100mm macro lens at f/8, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: every one of the eleven kernels is equally sharp and every part of the frame is equally in focus, with no falloff between the nearest and the furthest. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Eleven kernels throw eleven shadows and every one of them points the same way, down and to the right at 45 degrees in plan, each short, about a third of its kernel's height, hard-edged with no visible penumbra, dense at the core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow from any kernel, no bounced light inside the shadows. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than those shadows. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the kernels' orange-red the one saturated thing in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: the wrinkled seed coat resolved wrinkle by wrinkle, dust motes, loose chaff, hairline cracks in the dried starch, dry starch bloom, microscopic pitting, an uneven matte surface. Every kernel is individually different in shape and orientation; none is a copy of another and there is no repeating or tiling pattern. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights, no rim of light along any kernel's edge. Nothing else is in the frame. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, boxes, bags, jars, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.10 `MST-CHICCO` — 3 × `seedream_v5_pro` 1.5k — 4.50 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 1.5k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "An extremely wide, almost empty photograph of a vast sheet of paper with one single maize kernel lying on it. The kernel is very small in the frame: it occupies less than two percent of the picture area, a tiny object in a huge empty field. It is placed one eighth of the way across the frame from the left and a little below the vertical middle. Everything else in the picture is empty paper. The kernel is rounded and plump, about 9 millimetres across, deep orange-red, dry and completely matte, finely wrinkled toward the germ end and pale at the tip where it broke from the cob. Shot on a 100mm macro lens at f/8 but framed very wide, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: the kernel and the paper across the whole empty field are equally sharp, and the paper's fibre and laid structure remain legible right into the far corners so the emptiness reads as a real surface and never as a flat fill. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Exactly one shadow, thrown by the kernel down and to the right at 45 degrees in plan, tiny, about three millimetres long, hard-edged with no visible penumbra, dense at its core and fading to nothing over its last fifth. It is the only other event in the frame. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadow. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than that single shadow. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the kernel's orange-red the one saturated thing in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture: paper fibre, dust motes, a wrinkled matte seed coat. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Do not move the camera closer. Do not fill the frame with the kernel. The emptiness is the subject. Nothing else is in the frame. One kernel only, not two. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, boxes, bags, jars, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.11 `MST-BARBA` — 3 × `seedream_v5_pro` 1.5k, 1:1 — 4.50 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 1:1 --resolution 1.5k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "One small cluster of dried maize silk lying on a sheet of paper: twenty or thirty fine hair-like strands, russet-brown along most of their length and fading to pale straw at the tips, tangled loosely together into a single small knot with half a dozen strands trailing free toward the lower left. Every strand is a distinct individual filament with its own path and its own shadow; nothing is fused, nothing is clumped into a solid mass, nothing is rendered as a smooth sheet of hair. The knot's centre sits five eighths of the way across the frame from the left and the whole cluster occupies about a fifth of the picture area, with at least a quarter of the frame width of clear empty paper between it and the top and right edges. Shot on a 100mm macro lens at f/8, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: the strands where they lift off the paper and the strands lying flat are equally sharp and every part of the frame is equally in focus. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right, raking across the cluster so that each individual strand catches the light along its upper-left side and casts a hairline shadow to its lower right. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Every shadow in the frame runs the same way, down and to the right at 45 degrees in plan, hard-edged and short. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadows, no soft glow anywhere. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than those shadows. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, near neutral, the russet of the silk only just warmer than the paper. Fine monochrome film grain over the whole frame. Real photographic micro-texture: dust motes, a few broken strand ends, dry brittle fibre. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing silky or shampoo-like, nothing wet or oiled, no specular highlights, no sheen running along the strands. Nothing else is in the frame. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands, fingers or hair on a head. No cob, no kernels, no husk. No packaging, boxes, bags, jars, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.12 `MST-GALLETTA` — 3 × `seedream_v5_pro` 2k — 9.00 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 2k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "One single round puffed maize cake, broken cleanly into two pieces, the two halves lying apart on a sheet of paper with their broken edges facing each other but offset and rotated relative to one another, never mirrored, never parallel, never pushed back together into a circle. The cake's surface is the irregular fused mosaic of hundreds of individually burst maize grains: pale cream and toasted amber with scattered orange-red flecks from the red maize, full of small voids and rough protruding grain fragments, matte and slightly abrasive-looking. Each burst grain is separately resolved with its own edge and its own tiny shadow; the surface is never a smooth beige disc and never an embossed or repeating pattern. The broken edge is ragged and shows the dry airy interior with its open cells. A scatter of crumbs and small fragments lies on the paper around the two halves. Their combined centre sits five eighths of the way across the frame from the left and they occupy less than a third of the picture area, with at least a quarter of the frame width of clear empty paper between them and the top and left edges. Shot on a 100mm macro lens at f/8, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: both halves, the crumbs and the paper are equally sharp and every part of the frame is equally in focus. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right, so that every protruding burst grain throws its own small hard shadow to the lower right. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Each half throws exactly one shadow, down and to the right at 45 degrees in plan, short, about a third of its height, hard-edged with no visible penumbra, dense at its core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadows. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than those shadows. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the orange-red maize flecks the one saturated thing in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: crumbs, chaff, hairline fractures, dry starch bloom, microscopic pitting, an uneven matte surface. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing CGI, nothing wet or oiled, no specular highlights, no oil sheen, no toppings, no seasoning, no chocolate, no glaze. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. Two pieces only, and only because one object was broken: no third piece, no stack, no row, no fan. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, wrappers, boxes, bags, jars, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.13 `MST-GRISSINI` — 3 × `seedream_v5_pro` 1.5k — 4.50 cr

```bash
for i in 1 2 3; do
$HF generate create seedream_v5_pro \
  --aspect-ratio 3:2 --resolution 1.5k \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "Three broken lengths of thin maize breadstick lying on a sheet of paper, of three clearly unequal lengths and at three unequal angles, lying as they fell: not parallel, not fanned out, not crossed into an X, not bundled, not arranged into any shape. Each stick is roughly one centimetre thick, irregular and visibly hand-rolled with a slightly twisted uneven form, its crust pale gold with darker amber blistering and a faint orange cast from the maize flour; the snapped ends show a dry open crumb with visible air pockets. A few crumbs and flakes of crust lie on the paper near them. Their combined centre sits three eighths of the way across the frame from the left and they occupy less than a third of the picture area, with at least a quarter of the frame width of clear empty paper between them and the top and right edges. Shot on a 100mm macro lens at f/8, perpendicular plan view, sensor exactly parallel to the paper. Full depth of field: all three sticks, the crumbs and the paper are equally sharp and every part of the frame is equally in focus. No bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette, no tilt. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right at a raking angle so the blistered crust reads as relief. No fill, no bounce card, no reflector, no rim light, no kicker, no background light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour, no tungsten. Each stick throws exactly one shadow, all three pointing the same way, down and to the right at 45 degrees in plan, short, about a third of the stick's thickness, hard-edged with no visible penumbra, dense at the core and fading to nothing over its last fifth. No contact-shadow halo, no ambient-occlusion glow, no second shadow, no bounced light inside the shadows. The ground is a sheet of uncoated 120gsm laid paper in a warm unbleached bone colour, hex E9E3D6, filling the frame edge to edge, its faint laid chain lines just catching the grazing light, with visible cotton fibre and a few tiny darker inclusions. No table, no surface behind, no environment, no horizon, no depth cue other than those shadows. Even illumination corner to corner. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the faint orange of the maize crust the only warmth in the picture. Fine monochrome film grain over the whole frame. Real photographic micro-texture throughout: crumbs, crust flakes, hairline cracks, flour dust, microscopic pitting, an uneven matte surface. Nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered, nothing wet or oiled, no specular highlights, no oil sheen, no seeds, no salt crystals, no herbs, no toppings. Compose with generous empty paper along the top and bottom edges so the frame survives being cropped to a wider letterbox. Nothing else is in the frame. Three pieces only, not four, not a handful. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No people, faces, hands or fingers. No packaging, wrappers, boxes, bags, jars, glasses, bottles or sacks. No plates, bowls, cutlery, boards, cloth, napkins, baskets or twine. No wood, burlap, linen, jute, slate, marble or concrete. No field, sky, soil or growing plants. No steam, smoke, water or droplets. Not symmetrical, not centred."
done
```

---

### 6.14 `MST-VIDEO-FARINA` — 1 × `seedance_2_0` — 22.50 cr

> **One paid attempt.** Price it first. `--start-image` is the approved `MST-FARINA` master cropped to 5:8 and letterboxed to 3:4 — this is what stops the model inventing its own light.

```bash
$HF generate cost seedance_2_0 --aspect-ratio 3:4 --resolution 720p --duration 5 --generate-audio false --prompt "x"
# expect: 22.5 credits

$HF generate create seedance_2_0 \
  --aspect-ratio 3:4 --resolution 720p --duration 5 \
  --mode std --genre auto --generate-audio false --bitrate-mode high \
  --start-image assets/refs/REF-FARINA.png \
  --wait --wait-timeout 20m \
  --prompt "A locked-off macro shot of a low irregular pile of coarse stone-ground maize flour on a sheet of unbleached bone-coloured laid paper. A thin steady stream of the same coarse flour falls vertically from just above the top edge of the frame and lands on the pile, which grows very slightly and slumps a little as it receives it. Individual particles are visible in the falling stream, tumbling as they fall. The fall is continuous and completely even from the first frame to the last, at the same rate and in the same place, so that the shot loops seamlessly and the last frame is indistinguishable from the first. The camera does not move at any point. It is a static locked-off tripod shot: no push in, no pull back, no dolly, no pan, no tilt, no orbit, no handheld drift, no rack focus, no zoom, no speed ramp, no camera shake. The framing never changes. Everything in the frame except the falling flour and the settling surface of the pile is completely still. Shot on a 100mm macro lens at f/8 with full depth of field, every part of the frame equally sharp, no bokeh, no shallow focus, no focus falloff, no lens distortion, no vignette. Lit by exactly one small hard light, a bare instrument roughly 8 degrees in apparent size, at 70 degrees elevation and 135 degrees azimuth, arriving from the upper left and travelling down to the right, so the pile's upper-left flank is lit, its lower-right flank falls into its own shade, and one short hard-edged shadow runs down and to the right at 45 degrees in plan. No fill, no bounce, no reflector, no rim light, no second source. Neutral 5600K daylight, colour accurate, no warm cast, no golden hour. The light does not change across the clip. The exposure does not change. There is no flicker, no colour shift, no auto-exposure adjustment, no light animating on or off. Flat linear grade of a scientific record shot: blacks lifted so nothing reaches pure black, highlights held below pure white, no S-curve, no film emulation, no LUT, no HDR, no clarity, no vignette. Low overall saturation, the paper almost neutral, with the orange-red bran flecks in the flour the one saturated thing in the picture. Fine monochrome film grain. Real photographic micro-texture, nothing waxy, nothing glossy, nothing plastic, nothing over-smoothed, nothing rendered. Compose with generous empty space at the left and right edges so the frame survives being cropped to a taller vertical format, with the falling stream three eighths of the way across from the left and the pile in the lower third. Nothing else is in the frame. Only the falling flour, the pile and the paper: no hands, fingers, arms or people, no chute, funnel, sieve, scoop, spoon, bag, sack or packaging, no mill, no millstone, no machinery, no bowl, plate, board, cloth or prop. No billowing dust cloud spreading outward, no flour haze in the air away from the falling stream, no smoke, no steam, no water, no droplets, no sparks, no motion blur streaks. No text, letters, numbers, labels, stickers, stamps, printing, watermarks or writing of any kind. No wood, burlap, linen, slate, marble or concrete. No field, sky, soil or plants. Not symmetrical, not centred. No music, no sound, no voice."
```

---

### 6.15 Contingency commands

```bash
# C1 — second count lottery: re-run §6.3 eight times.                       8.00 cr
# C2 — second 4k escalation: re-run §6.4 twice with the new REF-SEZIONE.    8.00 cr
# C3 — cross-family retry on the waxiest plate (first candidate: galletta): 3.00 cr
for i in 1 2; do
$HF generate create flux_2 \
  --aspect-ratio 3:2 --resolution 2k --variant pro \
  --image-references assets/refs/REF-CARTA.png \
  --wait \
  --prompt "<the exact prompt string from §6.12>"
done

# Kernel repair (inside C2's allowance) — remove one kernel from a nine-row section:
$HF generate cost flux_kontext --image assets/masters/mst-sezione-9.png \
  --prompt "Remove exactly one kernel from the rim of the disc so that eight remain, evenly spaced. Change nothing else: same light, same shadow direction, same paper, same grade."
```

---

## 7. Rejection criteria — applied to every batch, before anything enters the layout

Run this against **every candidate**, in this order. **The first FAIL ends the assessment of that candidate** — do not carry on looking for reasons to keep it. Record the result per candidate so we can see which model is failing on which axis and stop paying for it.

### 7.1 Instant rejection — no discussion, no negotiation (§9.6, §9.8)

| # | Check | FAIL if |
|---|---|---|
| 1 | **Count** | Any cross-section showing ≠ 8 kernels. Verified by tick marks on a printout, not by glancing. |
| 2 | **Glyphs** | A single letter, numeral, mark, stamp, sticker, watermark or scratch that reads as writing, anywhere in frame — including on the millstone. |
| 3 | **People** | Any face, body, silhouette, hand, finger or part of one, anywhere, at any focus, at any frame edge. |
| 4 | **Packaging** | Any box, bag, tube, jar, bottle, sack, wrapper, label, seal or band — real, invented, blank or implied. |
| 5 | **Plated food** | Any dish, plate, bowl, board, styled arrangement, garnish, topping or seasoning. |
| 6 | **Props** | Cutlery, crockery, cloth, napkin, basket, twine, sieve, scoop, spoon. |
| 7 | **Wrong material ground** | Wood, burlap, hessian, linen, jute, slate, chalkboard, terracotta, marble, concrete, or any surface that is not the paper. |
| 8 | **Landscape** | Field, plants growing, sky, horizon, sun, sunbeam, soil in situ, building, machinery. |
| 9 | **Atmosphere** | Droplets, condensation, steam, smoke, airborne dust or flour haze. *(The sanctioned video is the sole exception, and only for the falling stream itself.)* |
| 10 | **Gloss** | Anything wet, oiled, glossy, or carrying a specular highlight. |
| 11 | **Shadow count / direction** | More than one shadow per object, or any shadow whose direction contradicts the 135° azimuth. |
| 12 | **Second light** | Any fill, bounce, rim or kicker lifting the shaded side of the subject. |
| 13 | **Symmetry** | Bilaterally symmetric composition, or a subject centred on the 4/8 line. |
| 14 | **Motion blur** | Any, in a still. |

### 7.2 The AI tells — the checks that actually decide this project

| # | Check | Method | FAIL if |
|---|---|---|---|
| 15 | **Waxy surface** | Zoom to 100% on the subject's mid-tone. | The surface is smooth where it should be pitted; kernel skin has no wrinkle; flour is a gradient rather than particles; the gallette is a beige disc rather than a mosaic of burst grains. |
| 16 | **Repeat / tile** | Zoom to 100% and scan across any field of many small elements. | Two kernels, two grains, two burst cells or two blisters are identical, or a pattern repeats at a regular pitch. |
| 17 | **Impossible highlight** | Trace every bright point back to the single 135° source. | Any highlight that cannot be produced by one upper-left instrument. |
| 18 | **HDR flatness** | Read the histogram. | Shadows lifted *and* highlights compressed at the same time; no tonal range in the subject. |
| 19 | **Focus falloff** | Compare near-edge and far-edge sharpness. | Any softening with depth. This is a scan; blur is the single fastest way to look like every other food site. |
| 20 | **Paper legibility** | Zoom to 100% in an empty corner. | The paper is a flat fill with no fibre, no laid structure and no inclusions. Empty must be a *surface*. |
| 21 | **Colour temperature** | Sample the paper's RGB. | A warm/amber bias. The paper is 5600K neutral; golden-hour light is forbidden in chapters 01–07. |

### 7.3 Composition and system compliance (§8, §9.3)

| # | Check | FAIL if |
|---|---|---|
| 22 | **Subject area** | Subject > 38% of frame area (> 2% for `ch04-chicco`, > 30% where this document states a tighter figure). |
| 23 | **Eighth-line centroid** | Subject centroid not on 1/8, 3/8, 5/8 or 7/8 of the frame width. Never on 4/8. |
| 24 | **Minimum void** | Less than 24% of the frame width of clear ground between the subject's bounding box and the nearest edge on at least two sides. |
| 25 | **Crop survival** | The 3:2 frame does not survive the crop to 8:5 with checks 22–24 still passing. |
| 26 | **Set consistency** | Placed beside the approved style test, the candidate's paper tone, shadow angle, shadow density or contrast visibly differs. **This is the check that makes the site read as one shoot and it is the one most often skipped.** |
| 27 | **`--chicco` budget** | Rendered at its layout size, the candidate's saturated kernel area exceeds 1.6% of a 1440 × 900 viewport (20,736 px²) while a `--chicco` UI mark is in the same viewport. Re-crop, re-scale, or revert the rail's active row to `--inchiostro` (§4.4). |

### 7.4 Video only

| # | Check | FAIL if |
|---|---|---|
| 28 | **Camera** | Any push, pull, pan, tilt, orbit, drift, zoom or shake. The camera is locked off or the clip is rejected. |
| 29 | **Loop seam** | First and last frame differ by more than 2% RMS after trim. |
| 30 | **Exposure drift** | Any flicker, colour shift or brightness change across the clip. |
| 31 | **Invented apparatus** | A funnel, chute, hand, bag or mill appears at the top of frame as the source of the flour. |
| 32 | **Audio track present** | Any audio stream in the delivered file. Strip it or reject it. |

### 7.5 The last check, and it outranks all of the above

**33 — The swap test (§19.16).** Place the candidate in its layout slot, remove the wordmark, and ask: *could this be another food brand's page?* If yes, the asset dies regardless of how many of checks 1–32 it passed. A plate can be technically flawless and still be generic, and that is what dilution actually looks like at the end.

---

## 8. Fallback ladder — what ships if generation fails twice

**The governing rule from §9.8, restated so nobody has to look it up: a weak asset is never forced into the layout. The layout changes, the asset is regenerated, or typography carries the moment instead.** Every fallback below is a *designed* outcome, not a degradation — several of them are arguably stronger than the photograph they replace, which is exactly the standard a fallback has to meet.

### 8.1 `hero-sezione` / `ch03-sezione` — the one that matters

**Trigger:** two full count lotteries (16 candidates) and two 4k escalations produce nothing with exactly eight kernels, and `flux_kontext` repair fails.

**Ladder:**

1. **Flank macro substitution.** Re-brief the plate as a longitudinal macro of the cob's flank at 22.5°, cropped so that **three complete rows are visible and the fourth rolls away over the curve.** The count becomes unassertable — and therefore cannot be wrong — while the *rows themselves* are shown at maximum magnification, which is arguably the better photograph. Cost: 2 × `seedream_v5_pro` 2k = 6.00 from the reserve. Alt text changes to *"Macro delle file di chicchi su una pannocchia di Mais Rosso Ottofile."*
2. **Structural proof only, no photograph.** `ch03` runs image-free. The eight 2px `--chicco` index rules already sanctioned in column 8 (§5.5) extend to the full field height of the chapter, and the eight rail kernels and the eight grid columns align optically — which `content-plan.md` §6 already identifies as the one moment on the site where that alignment happens. **The proof becomes structural rather than photographic, which is more on-concept than the photograph was.** The hero takes `ch01-pannocchia` in the specimen slot. Cost: **0.00**.
3. **Hero without a specimen.** If the hero also has to give up its plate, columns 5–7 stay empty and the hero becomes type, meta strip, rail and void. §7.6 already forbids a background image, a video, a button, a scroll hint and a tagline; removing the specimen leaves the composition that the rest of that section describes, and it still passes the swap test. Cost: **0.00**.

**I would sign off on ladder step 2 without regret.** The count is the concept, and the concept is safer expressed in 2px rules I control than in pixels a model guesses.

### 8.2 `ch01-pannocchia`
1. Re-brief tighter: crop to the cob's mid-section only, so no tip, no butt and no full silhouette — a fragment, consistent with every other plate in the record. 2 × `seedream_v5_pro` 1.5k = 3.00.
2. `ch01` runs on the registry column alone. `content-plan.md` gives `ch01` six data rows; promoted to columns 5–7 at `--type-data-lg` with 1px `--rigo` separators, the data column *is* the plate. The chapter that identifies the subject identifies it in words and figures — which is what a registry entry is. Cost: 0.00.

### 8.3 `ch02-brattee`
1. Re-brief as a **fragment** of a husk leaf rather than a whole one — a torn piece removes the "leaf on paper" cliché and increases the chance of real brittle texture. 2 × 1.50 = 3.00.
2. Typographic: the `DECRETO` row is already the only row at full ink weight. Promote it to `--type-d3` Bodoni as a pull statement in columns 2–5 — *"Re Vittorio Emanuele II ne impose la semina"* is a verifiable proper-noun fact and therefore legal display type under P6. **Age is carried by the sentence, which is where it always lived.** Cost: 0.00.

### 8.4 `ch04-chicco` — the cheapest reliable fallback on the project
1. **Composite, at zero cost.** Cut one kernel and its shadow from the approved `MST-CHICCHI` master and place it on the approved `tex-carta` plate at the 1/8 line. Both sources are already graded identically and lit from the same 135° azimuth, so the composite is physically consistent by construction. **This may well beat the generated version, because the placement becomes exact rather than negotiated.** Cost: 0.00.
2. Typographic: `ch04` runs with a single `--chicco` 2px rule in column 8 marking `STATO` (already sanctioned in §5.5) and nothing else. The emptiest chapter becomes literally empty. Cost: 0.00.

### 8.5 `ch05-barba`
1. Re-brief with fewer strands — eight or ten rather than thirty — which reduces the hair-render failure mode. 2 × 1.50 = 3.00.
2. Drop it. `content-plan.md` §6 already declares typographic-only for `ch05` *"acceptable and arguably more on-concept"*, with the promoted data column carrying the chapter and the two dash rows (`CONCIMI CHIMICI —`, `PESTICIDI —`) landing as the beat. Cost: 0.00.

### 8.6 `ch06-macina`
1. Re-brief as a close macro of the dressed face only, no fragment silhouette — texture instead of object. 2 × 1.50 = 3.00.
2. Drop it; `ch06` runs on the flour plate and the video alone, which is already the mobile behaviour. The chapter's two-state argument is then carried by the flour's *before* being implied and its *after* being shown, plus the `MACINATURA a pietra` registry row. Cost: 0.00.

### 8.7 `ch06-farina` / `ch07-farina` — no fallback, escalate to me
Flour is the easiest subject in the set and it is load-bearing in two chapters *and* it is the video's start image. If it fails twice, the failure is in the prompt system or the model, not the subject, and the whole set is in question. **Stop the batch and escalate.** The correct response is to re-run the style test, not to re-roll the flour.

### 8.8 `ch07-galletta`
1. C3 cross-family retry on `flux_2 pro` 2k — this plate is the first claimant on that contingency line. 2 × 1.50 = 3.00.
2. **Crumb macro.** Re-brief as a scatter of gallette crumbs and fragments only, no whole cake — the mosaic texture at higher magnification, with the object's silhouette removed. This dodges the "smooth beige disc" failure entirely. 2 × 1.50 = 3.00 from the reserve.
3. Typographic entry. The `ch07` row becomes three registry entries with no plates at all — name in Bodoni `--type-d3`, definition in Archivo, format in DM Mono, `—` where Maissini's weight is null. §17 already states the three products are *"presented without packshots"*; presenting them without plates either is a smaller step than it sounds and keeps the unequal-column rhythm intact. Cost: 0.00. **If one product loses its plate, all three lose theirs.** A row with two photographs and one gap is a defect.

### 8.9 `ch07-grissini`
As §8.8, and bound to it: the three product entries stand or fall together.

### 8.10 `vid-farina`
1. `seedance_2_0_mini` 720p 5s — 12.50 from the reserve, **my sign-off required**.
2. **Cut the video.** `poster-farina.webp` ships as a permanent `<img>` at every breakpoint. This is already the specified mobile and reduced-motion behaviour, so the fallback is a behaviour the site was always going to show a large share of its audience. §12.8 caps video at one; zero is inside the cap. Cost: 0.00.
3. If the poster cannot be extracted because there is no clip, `ch06-farina` fills the slot. Cost: 0.00.

**Net effect if every fallback fires simultaneously:** the site ships with three photographs, sixty-four kernels, eight index rules and a chapter-08 inversion. **It still passes the swap test.** That is the measure of whether the concept was ever really in the photography — and it was not. It is in the eight.

---

## 9. Post-production — the pipeline that makes twelve generations one shoot

Generation is half the treatment system. The grade in §9.5 is applied **identically and mechanically** to every asset, including any fallback composite, so mixed provenance and mixed model families become invisible.

**Order of operations, non-negotiable:**

1. **Crop** to the exact ratio — 1.600, 1.000 or 0.625 — from the master. Never in CSS (§8.4). Verify with §19.12.
2. **Black point → 6% IRE** (RGB floor 15,15,15). Never 0.
3. **White ceiling → 94%** (RGB 240). Never clipped.
4. **Linear contrast curve.** No S-curve, no LUT, no film emulation.
5. **Global saturation → 35%**, with a hue mask on **0–25°** held at 100%. The kernel red-orange is the only saturated thing on the site.
6. **Grain:** monochrome, 8% opacity, ~1.4px at 2560px width. **The same grain plate on every asset**, applied after the grade — a per-asset random grain would defeat the purpose.
7. **Encode** AVIF q82. Verify against the per-asset weight cap in §5.
8. **Video:** the identical grade, then trim to 4.8s, then match the loop seam, then strip audio, then encode AV1 + H.264, then extract frame 0 as the poster.

A reference ffmpeg chain (the Frontend Lead may implement in `sharp` instead, provided the numbers are identical):

```bash
ffmpeg -i master.png -vf "\
crop=iw:iw/1.6, \
curves=all='0/0.06 1/0.94', \
eq=saturation=0.35, \
noise=alls=8:allf=t+u" \
-frames:v 1 out.png
# then: the 0-25 degree hue hold is applied as a masked layer before eq
# (selectivecolor reds/yellows), and AVIF encode is done by the build's
# sharp pipeline at q82 so next/image's variants match the source.
```

**QA hook:** §19.12 (crop ratio census) and §19.3 (`--chicco` coverage) both run against the shipped files, not the masters. An asset that passes the gate and fails §19.3 in the layout is re-cropped, not re-generated.

---

## 10. Batch order — and why it is this order

The order is chosen so that **the two things that can kill the project are resolved before the bulk of the budget is committed.** Those two things are (a) the look, and (b) the count.

| Batch | Contents | Cost | Cumulative | Gate before proceeding |
|---|---|---|---|---|
| **0** | `tex-carta` ×3 · `MST-PANNOCCHIA` style test ×4 | **6.45** | 6.45 | **My written approval of one paper plate and one specimen.** These two files become `REF-CARTA` and `REF-STILE-PANNOCCHIA` and every later prompt references them. **If nothing in Batch 0 is approvable, we do not proceed to Batch 1 — we re-brief, at 6.45 credits spent instead of 101.** |
| **1** | `MST-SEZIONE` lottery ×8 · escalation ×4k ×2 | **16.00** | 22.45 | **Exactly eight kernels, verified by tick marks.** If both lotteries fail, §8.1 fires *now* — while there is still a whole budget to re-plan with, rather than after the set is bought. |
| **2** | `MST-PANNOCCHIA` final ×2 · `MST-FARINA` ×3 · `MST-MACINA` ×2 | **20.00** | 42.45 | Set consistency (check 26) against the Batch 0 reference, on three different subjects and two different models. This is where we find out whether the reference chain actually works before committing the remaining six plates. |
| **3** | `MST-BRATTEE` · `MST-CHICCHI` · `MST-CHICCO` · `MST-BARBA` · `MST-GALLETTA` · `MST-GRISSINI` — 3 each | **36.00** | 78.45 | Full §7 pass on all eighteen candidates. Any plate failing twice goes to its §8 ladder rather than to a third roll. |
| **4** | `MST-VIDEO-FARINA` ×1 | **22.50** | **100.95** | Last, deliberately. It is the most expensive single job on the project, it depends on an approved `MST-FARINA` as its start image, and §8.10's fallback is already the specified mobile behaviour — so it is the one item we can afford to reach with a depleted budget. **Never generate the video before the stills.** |
| **C** | Named contingency, as required | ≤ 19.00 | ≤ 119.95 | Per §3.2. |

**The argument for this order in one sentence:** Batch 0 costs 3.2% of the envelope and can invalidate the other 96.8%, so it goes first; Batch 1 costs 13% and is the only unrecoverable creative risk, so it goes second; the video costs 19% and has a free fallback, so it goes last.

---

## 11. Risk register — flagged assets

| Asset | Risk | Severity | Why | Mitigation in this plan |
|---|---|---|---|---|
| `hero-sezione` / `ch03-sezione` | **Count** | **CRITICAL** | Models cannot count. A nine-row section is a lie at the top of the page and an automatic §9.8 rejection. Load-bearing in two placements. | §2 mitigation stack · Batch 1 resolves it before 78% of spend · §8.1 three-step ladder ending in a structural proof I would sign off on |
| `vid-farina` | **Cost + camera + loop** | **HIGH** | 22.5 cr for one shot — more than every still except the 4k pairs. Video models default to camera movement and to inventing apparatus. Seamless loop is hard. | Generated last · start-image locked · one paid attempt · retry ladder to `mini` at 12.5 · fallback is the already-specified mobile behaviour |
| `ch07-galletta` | **Plastic/CGI surface** | **HIGH** | Puffed cereal is the most reliable trigger for smooth-render output on every current model. | 2k tier · first claimant on the C3 cross-family retry · crumb-macro re-brief · three-plates-or-none rule at `ch07` |
| `ch03-chicchi` | **Waxy skin + repeat + Invariant 2** | **HIGH** | Kernel skin is where §9.8's waxy and tiling triggers both live, and it is the site's worst `--chicco` budget case (§4.4 shows a full-frame kernel macro at 3.04%, over budget). | 2k tier · explicit "every kernel individually different" clause · check 27 with a stated re-crop/rail-revert remedy |
| `ch04-chicco` | **Composition refusal** | **MEDIUM-HIGH** | Models resist tiny-subject-in-vast-void framing and will close in on the kernel. | Explicit "do not move the camera closer, the emptiness is the subject" clause · free compositing fallback that is probably better than the generation |
| `ch06-macina` | **Text + polish** | **MEDIUM** | Real millstones carry carved marks; models love a polished stone. It is also the one subject a QA reviewer may wrongly reject under §9.6's materials clause. | Explicit no-carved-marks and granite-not-marble clauses · compliance note written into the asset block for QA |
| `ch01-pannocchia` | **Secondary count** | **MEDIUM** | If the model renders the cob flat-on, its rows become countable and can be wrong. | 22.5° attitude plus an explicit "only three or four rows face the camera, the rest curve away" clause — true optics, zero count risk |
| `ch05-barba` | **Hair render** | **MEDIUM** | Fine filaments fuse into a smooth sheet or acquire a shampoo sheen. | Explicit per-strand and no-sheen clauses · fewer-strands re-brief · the chapter is already sanctioned to run typographic-only |
| Whole set | **Look drift across 14 jobs** | **MEDIUM** | Twelve generations across three model families is exactly discovery §4's *"inconsistent lighting, colour and crop"* waiting to happen again. | `REF-CARTA` on every object prompt · identical seven-block prompt architecture · Batch 2 consistency gate · one mechanical grade applied to everything (§9) |

---

## 12. Sign-off

Nothing in `public/` until it has passed §7. Nothing past Batch 0 until I have approved the style test in writing. Nothing drawn from the 79.55-credit reserve without an amendment to §3.3.

The set is worth 100.95 credits. **The concept is worth more than the set** — which is why §8 exists, and why I have written a fallback for every single asset that preserves the idea without the photograph.

— Art Director
