# Prologo — rifinitura

**Ruling by:** Art Director
**Date:** 2026-07-28
**Binds:** `src/lib/prologue/shaders.ts`, `src/lib/prologue/topology.ts`, `src/lib/prologue/renderer.ts`
**Amends:** `docs/motion-spec.md` §6.2 (one prohibition, narrowly — see §5)
**Evidence:** `docs/captures/ad-rifinitura/` — 15 checkpoints × 2 modes (`shipped`, `nudo`) + 6 macro crops at 4× DPR.
Only the six macro crops remain in the tree; the full set was archived on 2026-07-29 — see `docs/captures/LEGGIMI.md`.

---

## 0. Method, and why the incoming diagnosis is half right

I rendered the sequence twice: once as shipped, once **`nudo`** — layer opacity forced to 1, `mix-blend-mode` forced to `normal`. That second set is the one that settles the argument, because it separates *"there is nothing there"* from *"it is there and the veil eats it"*.

The engineering diagnosis said: the geometry is correct, the shading destroys it, the 0.18 envelope makes it invisible. **The first clause is true. The second is true. The third is a trap.**

Look at `macro/p40-nudo.png` — the cob at 4× magnification, at **opacity 1, no blend mode, no veil at all**. The rows are *still* not readable. The interior is a smooth wash. If the envelope were the cause, the naked render would be crisp and the veiled render soft. It is not. The naked render is already mush.

So raising the opacity would not reveal a hidden drawing. **It would produce a larger, louder blob** — and it would cost us §19.16, which is the only check standing between this layer and a generic WebGL hero background.

The measurement, corrected. Ground `--carta` is `#e9e3d6` = (0.914, 0.890, 0.839). Multiply at opacity *a* gives `out = ground · (1 − a + a·src)`.

| | `diffuse` | `src.r` | composited R @ 0.18 | 8-bit |
|---|---:|---:|---:|---:|
| kernel shadow | 0.66 | 0.4607 | 0.8253 | **211** |
| kernel lit | 1.00 | 0.6980 | 0.8643 | **221** |

**Ten levels.** That is the entire modelling of the protagonist object. But the fix is not to widen the band until the cob shouts. It is to stop asking the cob to carry legibility it cannot carry at 0.18, and to move the load to where the envelope *already* permits it.

---

## 1. Ruling on the cob: **DEFECT — but not the defect that was reported**

Not intent. The quiet was intentional; the formlessness was not, and §6.2 never asked for it. A woodcut at 18% is still a woodcut. But the defect is **not** "insufficient contrast". There are four, and only one of them is the shader:

**1a. The kernel is the wrong shape.** `createKernelMesh()` builds a body 0.432 wide × 0.340 tall × 0.284 deep — **1.27 : 1**, a bead. The client's own illustration (`assets/brand/pannocchia-illustrazione.jpeg`) shows kernels at roughly **2.2 : 1**, wider than tall, with a *flattened outer face*, not a dome. The client wrote "sputi di colore rosso tondi" and the client is describing a measurement. They are round because they are modelled round.

**1b. The kernels are buried in each other.** Vertical pitch is `4.72 / 31 = 0.1523`. Kernel height is 0.340. That is **2.23× overlap** — each kernel is sunk more than halfway into its neighbours. This is the actual cause of the interior mush, and it is why the naked render is soft. Adjacent kernels interpenetrate and their silhouettes cancel.

**1c. There is no occlusion at the row seam.** The shader has a single Lambert term and no ambient occlusion whatsoever. In the reference illustration **the rows are drawn by the dark channel between them**, not by the lit crowns. We render the crowns and omit the channel. The eight-ness lives in a value we do not compute.

**1d. The rachis leaks through the cob.** See `macro/p36-nudo.png`. At p36 the axial rotation lands a row-channel dead centre and the reader sees a **hard grey stripe** — `darkStone` (0.384, 0.365, 0.302) — running the full length of a red cob. The cob visibly comes apart during the stage that is supposed to be its hold. This is a straight bug and the ugliest single frame in the sequence.

### Ordered, in numbers

**Mesh.** Kernel to **0.44 w × 0.20 h × 0.30 d** (2.2 : 1). Volume approximately preserved so the cob's mass does not change. At 0.20 height against a 0.1523 pitch the overlap falls to **1.31×** — kernels imbricate like roof tiles, as in the reference, instead of drowning.

**Outer face.** Flatten the outer 40% of the radial profile. The kernel must read as a **tooth**, not a bead. `crown = 0.78 + v·0.28` currently swells the top; replace with a profile that is flat-to-slightly-domed across the outer face with a shallow distal crease. This single change does more against "sputi tondi" than any colour work.

**Lighting.** Range `0.66 → 1.00` becomes **`0.50 → 1.02`**, plus a seam occlusion term driven by circumferential position that takes the kernel flanks to **0.38** where two rows meet. Composited at 0.18 that is 203 → 221, **19 levels** instead of 10. Quiet, but modelled.

**Per-kernel value.** Current `variation = 0.965 + mod(vVariant,4)·0.012` is a **3.6% spread across four buckets** — arithmetically indistinguishable from a constant. Replace with a seeded per-kernel multiplier spanning **0.82 → 1.06**, mean **0.94**. Value only. **No hue variation** (see §6).

**Aggregate red, so §6.2 #9 is satisfied by arithmetic, not assertion.** Current mean multiplier ≈ `0.864 (diffuse) × 0.983 (variation) = 0.849`. Proposed: diffuse mean capped at **0.90**, variance mean **0.94** → **0.846**. The aggregate quantity of `--chicco` goes **down**, not up. Every step lighter is paid for by a step darker. This is a hard, checkable constraint on the implementation.

**Rachis.** Does not render below `uProgress` 0.44 — while the cob is closed there is nothing behind it to see. From 0.44 it renders as a **value of `--chicco` at 0.62 diffuse**, never as stone grey. A grey object inside a red one is a category error.

---

## 2. Ruling on the eight rows: **YES — the signature carries it, once, at `registro`, and never as a count**

The question was whether to give the prologue this job. I am giving it, because the argument for it is not that the prologue is a good place to count — it is that **the prologue is the only element on this site that possesses the fact rather than asserting it.** `KERNEL_ROWS = 8` is a real constant driving real geometry. Chapter 03 says "Esattamente otto"; the prologue *is* eight.

But it must not be proven where the incoming brief assumed, and this is the crux:

**Not at `pannocchia`.** At 0.18 the cob spans 19 levels of 8-bit. You cannot count eight of anything inside 19 levels. Worse, a cylinder shows **four of its eight rows** to a frontal camera — counting would require a full revolution, and §6.2 hard-gates the pointer during 0.34–0.44 precisely so the layer *holds still* while making its claim. A cob that spins to be counted is a device, and the client explicitly ruled the eight is "a varietal characteristic, not a counting device for the site."

**At `registro`, where the envelope is already 0.30 — the highest ceiling in the table.** The spec author put the loudest band exactly where the flattening happens. The implementation simply never used it. §6.1 already claims the argument — *"the final flattening into eight paper incisions is the record"* — and the implementation **cheats it**: the incisions are a separate vertex buffer that happens to loop to `KERNEL_ROWS`. Eight lines appear; the cob's eight rows never *become* them.

### Ordered

**The eight incisions must be generated from the kernel rows.** Same eight row indices, same seeded `rowOffset`, so each line inherits the pressure irregularity of the row it came from. The unroll is **continuous**: the reader watches eight rows of a cob lie down and become eight marks on paper.

**Proof by continuity, not by enumeration.** Nobody is asked to count. A reader who counts finds eight; a reader who doesn't sees a cob become a record. That is the difference between evidence and a scoreboard.

**Window.** The rows remain individually identifiable through the first 60% of the flatten window — **0.76 → 0.856** — then resolve to lines by **0.92**. Long enough to be read as a transformation, short enough that it never becomes a demonstration.

**It adds no second eight.** This is the cob's eight, expressed once, in the one place the site was already going to draw eight marks. It is not the rail's 64 and it is not the grid's columns.

### And it kills an eight that should never have existed

`createPlantFieldMesh()` contains `const lane = plant % 8`, and `snapshot()` exposes **`fieldLaneCount: 8`**. The field is planted in eight lanes. **Eight rows per cob has nothing whatever to do with how many rows you sow in a field.** This is exactly the error class the Content Strategist ruled on — a property of the interface masquerading as a property of the plant, except here it is worse, because it is a fabricated agronomic claim. **Kill it.** Irregular seeded spacing, no lane count, and `fieldLaneCount` comes out of the snapshot entirely.

---

## 3. The plant stage — the client is right, and here is the arithmetic

"Una pannocchia drittissima su un rametto." See `nudo/p54.png`. It is worse than described: the cob does not even **attach** — it floats to the left of a dead-straight uniform-width vertical line, connected by a peduncle triangle that is invisible at any opacity.

**The proportion is the whole problem.** The cob is 4.72 units on a stalk of 11.4 — the cob is **41% of the plant's height**. Real maize: a 20 cm cob on a 220 cm stalk, **9%**. The cob is roughly **4.5× oversized relative to its own plant**, which is precisely why the plant reads as a twig: the twig has been scaled down to the cob.

Compounding it, the plant-stage pullback is only `cameraZ 12.5 → 21.5` — **1.7×**. The camera barely moves, so the promised zoom-out from cob to plant never happens.

### Ordered

**Do not shrink the cob** — `pannocchia` needs it at frame scale. **Grow the plant and pull the camera.** Stalk to ~48 units (cob at ~10% of plant height), plant-stage pullback to **at least 4×** so the cob genuinely becomes a *detail on a plant*. That is the narrative the stage is named for: kernel → cob → plant → field, each a step out.

**Add the tassel.** There is no `pennacchio`. A maize plant is identified by its tassel before anything else — it is the most recognisable silhouette in the entire crop. Its absence is the single largest reason the stage reads as "un rametto". This is the biggest win available on this stage and it is cheap.

**Leaves: 5 → 11**, alternating, emerging from **visible nodes**. Currently five ribbons sprout from arbitrary heights on a node-less pole.

**Stalk taper: 0.16 at the base → 0.07 at the tip**, with node marks. It is currently a uniform-width rectangle 11.4 units long, which is why it reads as a drawn line rather than an object.

**The cob must attach.** A real shank at a real node, occluding correctly. Right now the protagonist is not connected to the plant it grows on.

**Husk — currently two grey ribbons revealed at 0.44, which means the `pannocchia` stage shows a naked cob.** The client's illustration is roughly half husk. Order: **five ribbons, present from 0.34** (the moment the cob closes), width 0.16–0.22, length **5.4 — longer than the cob**, extending past the tip, peeling outward and downward with hooked tips as drawn in the reference. Value **0.80**, not stone grey: composited at 0.18 that sits ~3.6% darker than paper, against the current husk's 8%. The husk is the **light** shape and the cob is the **dark** shape — that opposition is the reference illustration's entire structure, and we currently render all three organs (stalk, leaf, husk) in one grey.

---

## 4. The field stage — not empty, but the client's word for it is fair

See `nudo/p70.png`. There are 48 plants and they render. The client says "vuoto" and is describing something real. Measured at p70 (`fieldPullback` 0.684, `cameraZ` 30.39, FOV 28°, aspect 1.44):

- Visible frame at the near row (z = −7.5): **27.2 units wide × 18.9 tall**
- Field lateral span: **10.4 units → 38% of frame width.** Both margins are bare paper, and both **ends of the field are visible**. A field with visible ends is a flowerbed.
- Plant height 1.45–2.4 → **7.7%–12.7% of frame height**
- **The hero cob is 4.72 — two to three times taller than an entire mature plant behind it** — and it hangs unattached in the sky above the crop.
- Depth: 6 rows, z −7.5 → −23.25. No horizon, no far haze, nothing resolving into distance.
- Colour: the field is **entirely grey**. The only red in the `campo` stage is the floating hero cob. The stage where the varietal finally exists at scale contains none of the varietal's colour.

### Ordered

**Lateral span 10.4 → 34 units.** The frame is 27.2 wide at the near row; at 34 the field runs past both edges and has no visible end. This alone fixes most of "vuoto".

**Depth 6 → 10 rows**, z from −6 to −40, so plants resolve into a far haze at the horizon. **No blur, no fog, no DOF** — recession by scale, density and value only (§6.2 #10 stands, see §6).

**Plant count 48 → 140 desktop**, scaling the existing three-tier LOD (mobile/tablet/desktop) proportionally.

**Irregular sown spacing**, seeded. No lanes. See §2.

**Resolve the floating cob.** At `campo` the hero plant either takes its place as the field's nearest member or it leaves the frame. It may not hover above the crop at triple scale.

**The hero stalk currently runs the full frame height as a single uniform vertical line, splitting the composition in two.** Once it tapers and terminates in a tassel (§3) this resolves; verify it does.

**A trace of red at the horizon.** Not the plants — the plants stay in the stone values, because the field is *ground* and the cob is *subject*. But the field is where the variety survives, and it currently disowns its own colour. Admit `--chicco` at the far rows only, at a value that composites within 2% of paper: present, unnameable, under budget. This is the one addition I am allowing, and it is bounded by §5.

---

## 5. §6.2 amendment

**One amendment. It touches prohibition 9 only.**

> **9. Contain `--chicco` above the declared opacity envelope, or in aggregate above the §4.4 budget.**

**As amended:**

> **9. Contain `--chicco` above the declared opacity envelope, or in aggregate above the §4.4 budget. Prohibition 9 governs the aggregate *quantity* of red and the *hue*; it does not govern the internal *value* range of a red object.** The layer may modulate lightness within `--chicco` — per-kernel and per-facet — provided that (a) the hue and saturation of `--chicco` are unchanged at every sample, and (b) the **area-weighted mean multiplier does not exceed the value a flat `--chicco` fill would have produced**, currently **0.849**. Every step lighter must be paid for by a step darker. Aggregate red may fall; it may not rise.

**Why this is the narrow amendment and not a loophole.** The original prohibition exists so the layer cannot creep warmer and louder until it becomes a decorative red field. That risk is entirely a function of *how much* red and *what* red. It is not a function of whether a red object has a lit side and a shadow side. Under the amendment the layer's total red **decreases** (0.846 vs 0.849, §1) while the object becomes legible as a solid. The prohibition's purpose is strengthened, not weakened, and the constraint is arithmetic — the build either passes it or does not.

**§6.2 prohibitions 1–8 and 10–12 stand unamended.** In particular:

- **#1 (0.30 ceiling) stands.** The 0.18 `pannocchia` / `pianta` band is **not raised**. See §6.
- **#8 (no time base) stands.** Wind remains progress-driven. The denser field must not introduce a clock.
- **#10 (no blur/glow/bloom) stands.** The field's recession is scale, density and value — never atmosphere.
- **#12 (no fifth stage) stands.** Everything ordered here happens inside the six existing stages.

**The opacity table is unchanged.** Note what that table already does: it puts **0.30 — the loudest band on the site — exactly where the flattening happens.** The spec was already correct. The implementation simply never spent the budget it was given.

**One clarification for §6.4, which is mine to give:** §19.15 parity measured on **content only**, prologue excluded from the diff, on the stated condition. **Ratified.**

---

## 6. What I refuse

**1. I refuse to raise the 0.18 ceiling.** This is the refusal that matters. The client asked for "più dettaglio" and the automatic response is "make it more visible" — and the naked render proves that response is wrong on the facts: at opacity 1 the cob is *already* formless, so opacity was never the constraint. Raising it would buy nothing but volume, and it would convert a prologue into a WebGL hero background, which is the one failure mode §6.1 says takes the whole concept with it. The cob stays quiet. It stops being *formless*, which is a different word.

**2. I refuse hue variation.** I am told bordeaux was nearly proposed. `--chicco` `#B23A16` is the brand's single red and it is an index colour, not a palette. Eight kernels in eight tints of red is a food brand. **Value only.**

**3. I refuse any device that counts.** No rotation-to-reveal, no kernel counter, no numeral, no label, no tick marks, no "8" anywhere in the layer. The eight is proven by a cob becoming eight marks, or it is not proven here at all. The moment the layer explains itself it stops being a substrate and becomes a diagram — and it fails the client's invariant that nothing may draw attention to itself.

**4. I refuse to keep the eight-lane field.** It is a fabricated agronomic claim and a second eight on a site that is allowed exactly one. Killed, not softened.

**5. I refuse atmosphere in the field.** No fog, no DOF, no bloom, no vignette to fake depth. Distance is drawn — scale, density, value — the way it is drawn in print.

**6. I refuse a fifth stage and any new time base.** Everything ordered here fits the six stages and stays a pure function of `scrollY`.

**7. I refuse to accept the first capture pass as evidence.** `docs/captures/prologo-stadi/panoramica.png`, filed as the magnified cob, **contains no cob** — it is a crop of the wordmark. Two images cannot review a six-stage sequence. Superseded by `docs/captures/ad-rifinitura/`.

---

## 7. Priority

| # | Change | Stage | Why first |
|---|---|---|---|
| **1** | Kernel mesh to 2.2:1, flattened outer face, overlap 2.23× → 1.31× | all | The literal answer to "sputi tondi". Nothing else reads until the kernel has a shape. |
| **2** | Lighting 0.50→1.02 + seam occlusion 0.38; per-kernel value 0.82→1.06, mean 0.94, aggregate ≤ 0.849 | all | Gives the form somewhere to live. Bounded by the §5 amendment. |
| **3** | Rachis: no render < 0.44, `--chicco` value not stone | `pannocchia` | Hard bug. Grey stripe through a red cob at p36. |
| **4** | Husk: 5 ribbons from 0.34, length 5.4, value 0.80 | `pannocchia` / `pianta` | The `pannocchia` stage currently shows a naked cob. Half the reference illustration is husk. |
| **5** | Tassel + 11 nodal leaves + stalk taper + real shank; plant to ~48 units, pullback ≥ 4× | `pianta` | The whole of "un rametto". Tassel is the cheapest single win on the site. |
| **6** | Field span 10.4 → 34, depth 6 → 10, count 48 → 140, kill the 8 lanes, resolve the floating cob | `campo` | The whole of "vuoto". |
| **7** | Incisions generated from kernel rows; continuous unroll 0.76 → 0.856 → 0.92 | `registro` | The eight. Last because it depends on 1–2 landing first. |

Items **1–4** answer the client. Items **5–6** answer the client. Item **7** is the one I am adding, and it is the reason the layer is worth keeping at all.

---

## 8. Implementation record

All seven items are implemented. Two notes worth keeping, because both cost more than the change itself.

**The field numbers in item 6 were derived in the old world.** Span 34 and 140 plants were sized against a 2-unit stalk. Item 5 grew the hero plant 4.2×, so those figures were rescaled rather than applied literally: span 125, ten depth bands, **360 plants**. The LOD tiers in `renderer.ts` had been left at 70/98/140 and were drawing 98 of 360; they are now 180/252/360.

**The `campo` stage was rendering as blank paper for a reason that had nothing to do with density.** `perspective()` carried a far plane of **120** — correct when the camera stopped near z≈60, fatal once item 5's pullback took it to z≈166. The whole crop stood 144–210 units from the eye and was clipped in its entirety; of the hero plant only the tassel, the one part inside the old plane, survived. Four rounds of density, span, count and camera adjustment were spent against a clipping plane. It is now 0.5 → 320.

The instructive part: **`__OTTO_SIGNATURE__.snapshot()` reported `plantCount: 252`, `fieldReveal: 0.84`, `drawCalls: 3` throughout.** Every counter was accurate and every counter was useless — they measure what is submitted, not what survives to the frame. `tests/prototype.spec.ts` now measures ink instead: the page is hidden, the prologue left visible, and the `campo` frame must darken >20% of the canvas and at least 4× what the single hero plant does. Measured 0.498 against 0.026; under the old far plane both collapse below 0.01.

**Verdict on the sequence as it stands: REJECTED** — the protagonist object is modelled as a bead rather than a kernel and buried at 2.23× overlap, which no shading or opacity change can rescue; the concept survives and the four stages are right, but the drawing must be rebuilt from the mesh outward before the eight can be carried anywhere.
