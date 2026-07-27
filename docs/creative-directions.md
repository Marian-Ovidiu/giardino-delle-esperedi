# Phase 2 — Creative Directions

**Project:** Il Giardino delle Esperidi — sito vetrina
**Author:** Art Director
**Date:** 2026-07-26
**Source of truth:** `docs/discovery.md` (nothing outside it is asserted as fact)
**Status:** three directions proposed, one selected

---

## 0. Preamble — the three constraints I am directing against

Discovery §9 hands over three things. I am treating them as a hierarchy, not a list, and each direction below places them in a different order. That ordering *is* the difference between the directions.

1. **Eight rows.** A hard, verifiable number. Structurally expressible as grid, rhythm, count, navigation.
2. **Near-extinction.** The emotional stake. Guardianship, not nostalgia. Buying this food is what keeps the variety alive.
3. **The Hesperides.** Golden light at dusk in the far west — the *licence* to abandon corn-yellow with a reason rather than as contrarianism.

And one prohibition carried from §5.4 and §8: nothing here may be a warm-editorial food site. Three variants of Fraunces-and-cream would be a failure of this phase.

### 0.1 Licensing note

Every typeface named below is verified as legally self-hostable on a commercial client site:

- **Google Fonts** families are SIL OFL 1.1 — self-hosting permitted, no attribution required in-page.
- **Fontshare** (Indian Type Foundry) families are either SIL OFL 1.1 or the ITF Free Font License; both explicitly permit commercial use and both ship a downloadable WOFF2 offline kit for self-hosting.

Verified individually: Bodoni Moda (GF/OFL, variable `wght` 400–900 + `opsz` 6–96), Archivo (GF/OFL, variable `wght` + `wdth`), DM Mono (GF/OFL, Colophon Foundry), Boska (Fontshare), Switzer (Fontshare), Bespoke Stencil (Fontshare), Erode (Fontshare). No typeface is named here that we cannot ship.

### 0.2 The yellow question, stated once

Discovery §5.4 identifies "automatic yellow" as a defect: corn → yellow, applied by convention with no art direction on top. **I am rejecting corn-yellow as a brand surface colour in all three directions.** Not because yellow is wrong, but because *unargued* yellow is wrong. Each direction below states what it does instead, and the three answers are genuinely different: one **samples** (the kernel's real red-orange, used as index not as fill), one **transforms** (yellow demoted from pigment to emitted light), one **refuses** (the product the customer touches is pale flour, not a cob).

---

# Direction 1 — **OTTO**

> *Registro di una varietà superstite*

## Central metaphor

**The site is not an advertisement. It is a record.** A seed-bank card, a herbarium sheet, a registry entry for an organism that was nearly deleted from the world — and Il Giardino delle Esperidi are the registrars. The company does not "celebrate tradition"; it *keeps the file open*.

Every fact in discovery §3 is registry data: variety, locality, morphology (eight rows), status (at risk of extinction), provenance (royal decree), process (stone-milled). The brand's thin fact set stops being a limitation and becomes the entire content model.

## Emotional tone

Sober, exact, quietly monumental. The register of a museum vitrine label, not a farm shop. Evidence in place of adjectives — which directly attacks the "virtue-word inflation" flagged in §5.5. Warmth arrives **exactly once**, near the end, and lands harder for having been withheld for 90% of the page.

## Typography

| Role | Typeface | Source / licence |
|---|---|---|
| Display | **Bodoni Moda** | Google Fonts · OFL 1.1 · variable `wght` 400–900, `opsz` 6–96 |
| Text | **Archivo** | Google Fonts · OFL 1.1 · variable `wght` + `wdth` (Condensed→Expanded) |
| Data / meta | **DM Mono** | Google Fonts · OFL 1.1 |

**Reason.** Bodoni was the printer to the court of Parma; the neoclassical didone *is* the typographic voice of a nineteenth-century Italian state document. Vittorio Emanuele II's decree is not a decorative anecdote here — it is the reason the display face has hairlines. At `opsz 96` Bodoni Moda's thin strokes read engraved, not editorial, which is precisely the escape route from warm-serif food branding.

Archivo is a grotesque drawn for signage and printed matter — the neutral, unemotional hand of the registrar. Critically, its **width axis** earns its place: registry labels are set in Archivo at `wdth` ~125, 10px, uppercase, 0.16em tracking, giving a specimen-card label style that a fixed-width grotesque cannot produce.

DM Mono is the catalogue number — coordinates, weights, dates, the `08/08`.

Three faces, three voices: **history** (Bodoni), **institution** (Archivo), **evidence** (DM Mono). No fourth voice is permitted.

## Colour

**The yellow decision: sampled, not inherited.** We do not use "corn yellow", an abstraction of the crop. We use the *measured* colour of this specific kernel — the rounded orange-red of the Ottofile — and we use it the way a scientific plate uses a colour chip: as index, never as decoration. It appears on rules, marks, numerals and the active row of the rail. **It is never a background, never a button fill, never a gradient.** Total coverage across the page is under 2%.

```
--carta        #E9E3D6   unbleached laid paper — the base, 7 of 8 chapters
--inchiostro   #16150F   warm near-black ink
--chicco       #B23A16   the kernel's true red-orange — index only, ≤2% coverage
--pietra       #8C8779   secondary meta, rules, disabled state
--notte        #0D0B08   night — chapter 08 only
--esperide     #D9A441   Hesperides gold — chapter 08 only, on night only
```

**Behaviour across scroll: fixed, then one event.** Chapters 01–07 are immutable bone paper. At chapter 08 (*Custodia* — the myth) the entire page inverts to night and the gold appears for the first and only time. That is the sole chromatic event on the site, and it is spent on the brand's single best paragraph (§2, the Hesperides text). Colour is a narrative instrument used once. The footer stays in night.

## Composition rules

- **Eight columns. Always.** 8px base unit; every spacing value a multiple of 8 (8 / 16 / 24 / 40 / 64 / 104 — the large steps follow Fibonacci multiples of the unit so the rhythm accelerates rather than stepping evenly).
- A **fixed 64px left rail** (8×8) holds eight marks and is present at every scroll position.
- **Nothing centres.** Body text hangs on a hard axis at column 2. Display type breaks *out* to the left, optically hanging into column 1 — the Bodoni caps overhang so that the stems, not the bounding boxes, align.
- Facts occupy columns 6–7 as a persistent registry column: label (Archivo Expanded caps) / value (DM Mono), separated by a 1px `--pietra` rule.
- **Asymmetry is enforced by a reserved void:** column 8 is empty everywhere on the site. Only `--chicco` rule marks are ever allowed to enter it. It is the margin of the card, and it is never filled — the discipline of that emptiness is what makes the page read as a document rather than a layout.

## Image treatment

**Specimen plate, not food photography.**

- One object or one fragment per frame. No props, no styling, no hands, no plated dishes.
- Photographed on the `--carta` ground itself, so the image and the page share a substrate.
- Single hard top light at ~70°, producing exactly one short shadow. No fill, no reflectors, no second source.
- Grade: blacks lifted to 6% (never crushed to zero — a scan, not a photograph), global desaturation to ~35%, with `--chicco` held at full saturation via a targeted hue mask. The kernel is the only saturated thing on the site.
- 8% monochrome grain, applied uniformly across every asset so mixed provenance becomes invisible — which directly fixes §4's "inconsistent lighting, colour and crop, no treatment system".
- Crops: square or 8:5 only. The object always sits **small in the frame** with generous void around it. Museum object, not hero shot.

## Material language

Uncoated 120gsm laid paper with visible chain lines at very low opacity. Letterpress bite on the display type — a 1px darker edge on the stem, no drop shadow, no glow. The eight rail marks behave like printer's registration marks. Hairline rules are true 1px at 1x and 0.5px at 2x, never scaled.

References: Karl Blossfeldt's botanical plates, seed-bank record cards, Kew herbarium sheets, Fondazione Prada catalogues, Muji product cards. Nothing rustic. No wood, no burlap, no chalkboard.

## Motion language

**Indexing.** Nothing eases in decoratively; things *register* — they arrive onto the 8px grid with a short, slightly abrupt curve, like a card being seated in a drawer. `cubic-bezier(.2,.8,.2,1)`, no overshoot, no spring.

Text is never faded up (explicitly forbidden). It is revealed by a mask travelling along the baseline grid. The only continuous motion on the site is the rail filling.

Duration vocabulary: **160ms / 320ms / 640ms** — all multiples of 8×20. If a duration is not on that list it is not shipped.

## Hero — the first 3 seconds

Full bone-paper field. No image background, no video, no centred stack.

- **Bottom-left, hanging on the text axis:** `MAIS ROSSO OTTOFILE INTEGRALE` in Bodoni Moda at a size where the final word is **clipped by the right viewport edge**. Deliberate: it does not fit. The variety barely fits in the world.
- **Top-right, DM Mono, 11px:** `VARIETÀ ALBESE · CHERASCO (CN) · REGISTRO · 8 SCHEDE`
- **Left rail:** eight marks, the first filled in `--chicco`.
- **Centre-right:** one specimen image — a single pannocchia, cross-sectioned, showing exactly eight rows, on paper, one hard shadow.
- **No button. No scroll hint. No tagline.**

It reads as the cover of a catalogue that someone has decided to publish, not as a landing page.

## Signature interaction — **La Riga Ottava**

The fixed left rail is the navigation, and it is not a progress bar. **Each of the eight marks is a row of kernels, and each row holds eight kernels.** As you scroll a chapter, its mark fills one kernel at a time. Across the whole site you count **64 kernels — one complete pannocchia.**

- Hover a mark: it expands rightward into a full registry line — chapter number, name, and the single fact that chapter carries (`03 · OTTO FILE · esattamente otto file di chicchi tondi`).
- Click: seats you at that chapter with the indexing motion.
- Reaching the 64th kernel is the trigger for the night inversion. The rail turns gold and is, for a moment, the only lit thing on a black page.

That inversion moment — 64 gold kernels on black, the myth text set in Bodoni — is the screenshot.

## Higgsfield asset strategy

**Volume:** ~14–18 stills, 1 short loop. **This is the lowest-risk plan of the three.**

Required set: whole pannocchia; cross-section showing eight rows; loose kernels scattered; stone-ground flour in a low pile; a broken gallette; grissini fragments; dried husk; corn silk; a millstone fragment; the bone paper substrate itself.

**Why it survives §8.** Every failure mode listed in discovery §8 is structurally avoided rather than mitigated: no people (no hands, no faces), no packaging (no invented label text possible), no plated dishes, no complex multi-source lighting to keep consistent across a set. The one remaining risk — mushy or repeating kernel detail — is met by shooting *close* and by the uniform grain/desaturation treatment, which converts residual AI smoothness into a plate-like flatness that reads as intentional. Waxy surfaces are the enemy of glossy food shots; they are far less legible under a hard single light on matte paper.

**Budget:** `seedream_v5_pro` (3cr) × 6 hero specimens = 18cr; `nano_banana_pro` (2cr) × 12 secondary = 24cr; `z_image` (0.15cr) for paper and texture plates ≈ 3cr; one `seedance_2_0` loop of flour falling = 22.5cr. **≈ 68 credits of 199.5**, leaving genuine headroom for the rejections §8 says to expect.

## Strengths

- The eight is **structural, not decorative** — grid, unit, rail, count, chapter list. It is the only direction where removing the number would break the layout.
- Thin verified copy becomes an asset: a registry is *supposed* to be terse. §8's "thin fact set" risk is neutralised at the concept level.
- Presents the three products **without packshots**, which §8 says are unavailable — a registry presents objects, not packs.
- One chromatic event is cheap to build, impossible to forget, and gives the myth the weight §5.1 says it is currently denied.
- Light-dominant, high-contrast, fast, accessible, SEO-legible — commercially safe without being bland.
- Most resistant to dilution: the grid is arithmetic, so any deviation is *measurable*.

## Risks

- **Coldness.** A food brand whose site never makes you hungry. If the night chapter is executed weakly, the whole thing is a grey site with a good grid.
- The specimen-on-paper genre has become familiar on Awwwards; the concept must be carried by the rail and the inversion, not by the plates.
- Requires typographic discipline that historically dies under client pressure to "make it friendlier".
- Bodoni hairlines at small sizes and on low-DPI screens need careful `opsz` management or they disappear.

---

# Direction 2 — **VESPERO**

> *L'ora dorata delle Esperidi*

## Central metaphor

**The site is a sunset.** You do not scroll through sections; you descend through the last hour of light. The Hesperides are *"le ninfe della sera e della luce dorata dei tramonti"*, positioned *"nel lontano ovest dove tramonta il Sole"* (§2, verbatim) — so the page's single organising system is the passage of daylight into night, and the golden thing is still there at the bottom, guarded.

Scrolling = the sun going down = the passage from harvest to keeping.

## Emotional tone

Cinematic, reverent, slow. Not nostalgic — **vigilant**. The tone of the last twenty minutes of usable daylight, when you are still working.

## Typography

| Role | Typeface | Source / licence |
|---|---|---|
| Display | **Boska** | Fontshare · ITF free licence · Thin→Black + italics |
| Text | **Switzer** | Fontshare · ITF free licence · 18 styles incl. italics |
| Meta | **DM Mono** | Google Fonts · OFL 1.1 |

**Reason.** Boska is an extreme-contrast display serif. In a dusk system that matters technically, not just stylistically: on near-black, hairlines set in gold read as *emitted light* rather than painted shape — the thin strokes glow, the thick strokes hold. A low-contrast face on this palette would look like a dark-mode blog. Boska is chosen because the palette requires it.

Switzer is a neo-grotesque with humanist warmth, excellent at small optical sizes on dark grounds, with a weight range wide enough to compensate as the page background darkens (text weight increases as luminance drops, to hold apparent stroke). It is chosen because it **disappears** — the correct behaviour for a text face standing next to a display face that is acting.

Explicitly rejected here: Fraunces, Playfair, Cormorant, and every other warm-editorial serif that would collapse this into a wine-estate site.

## Colour

**The yellow decision: kept, but demoted from pigment to light.** This is the only direction that retains gold, and the argument is specific. Corn-yellow-as-fill is the cliché §5.4 names. But this brand's own myth is *literally about golden light at sunset* — so gold is legitimate here on the condition that it stops behaving like paint. **Gold is never a background, never a card, never a button fill, never a border.** It exists only as emission: type colour, a horizon gradient, a rim light on an object. Everything it touches must look *lit*, not *coloured*.

```
--calce        #F2EDE3   bone — the top of the page, full daylight
--crepuscolo   #2A2118   warm brown-black — the middle
--notte        #0B0D14   blue-black — the far east of the sky, the bottom
--brace        #8A3B14   ember, the only mid-tone
--oro          #E8B44A   Hesperides gold — emission only
```

**Behaviour across scroll: continuous drift.** It does not invert; it *interpolates*. A single scalar `--luce` (0 → 1, bound to scroll progress) drives the page background from `--calce` through `--crepuscolo` to `--notte`, and every component reads its colours from custom properties derived from that scalar. Type colour, rule opacity, shadow length and image grade all cool together on one number. There is no section boundary in the colour system; the boundary is time.

## Composition rules

- A **horizon axis**: a hairline at a fixed 61.8% viewport height, present in every section, never broken by the grid.
- Content composes *relative to the horizon*, not to a container. Headlines sit **on** it, images break through it, facts hang beneath it like reflections.
- Underlying 12-column grid, but the operative logic is the horizon plus a **left margin that narrows as you descend** — the frame closes as light fails, from 18vw at the top to 6vw at the footer.
- Asymmetry follows a **sun path**: content sits low and left in the early sections and migrates up and right as the page darkens. The final section is high-right against black.

## Image treatment

- Raking single-source light at ~10° elevation. Deep falloff, no fill light, no second source.
- Blacks crushed to 4%. Split-toned: shadows pulled toward `#14161F`, highlights toward `--oro`.
- Heavy 35mm grain (12–14%), with a slight halation bloom on specular edges.
- Crops are **wide** — 21:9 and 2:1 only. The subject enters from a frame edge and is never centred.
- Photography is **fragmentary by rule**: never a whole field, always the edge of a field; never a full pannocchia in daylight, always a hand-width of kernels catching one line of light; one leaf against sky.

## Material language

Photographic, not print. The substrate is light itself. References: film stills (*Il Conformista*, *Le Quattro Volte*), Paolo Roversi's darkness, gold leaf on gesso, the black-and-gold of a reliquary, the interior of an unlit church at 6pm. Texture is grain and bloom, never paper fibre.

## Motion language

**The sun going down.** One governing scalar drives everything — background, shadow length, image grade, horizon position, and (the detail that makes it a system rather than an effect) **Boska's weight axis: the display type thins as the page darkens**, from 500 at the top to 200 at the footer, so the headlines appear to burn down.

There is no per-element animation vocabulary. Nothing "animates in". The world simply gets later.

## Hero — the first 3 seconds

A near-full-bleed dark image fills the lower 60%: the **edge** of a maize field at extreme low light, shot into the sun so the plants are almost silhouette, with only the top few centimetres catching a last rim of gold.

Above the horizon line, hanging left: **`Custodi di qualcosa di dorato`** — Boska Light, ~11rem, `--oro`, with the descender of the *q* crossing the horizon down into the image.

Bottom right, Switzer 12px caps, `--calce` at 60%: `Cherasco · Piemonte · dal seme alla farina`.

And the detail that sells it: **if you do nothing for three seconds, the light in the image drops by 4%.** The site is already getting later while you hesitate.

## Signature interaction — **Il Tramonto**

A thin fixed gold gradient strip at the right edge is the scroll indicator, and it reads as a **sun descending a slot**. Its position *is* the global `--luce` scalar.

**Drag it and you scrub the time of day for the entire page in real time** — background, shadows, image grades, type weight, rule opacity all move continuously and together. It is a light-desk fader for a website.

Scrub to the very bottom and the page goes fully black except **eight gold marks** — the rows of the pannocchia, the only thing still lit. Guardianship made literal, in one gesture.

## Higgsfield asset strategy

**Volume:** ~12 atmospheric stills, 2 video loops. **This is the highest-risk plan of the three, and I want that on the record.**

Golden-hour cornfields are the single most fluently generated and most generically generated subject in AI imagery. Discovery §8's top-severity risk — *"AI food imagery reads as fake"* — is at its maximum here: plastic skies, impossible flares, and repeating leaf/kernel detail across a wide field are exactly the failure signature, and a wide landscape gives the model the most surface on which to repeat itself.

**Mitigation is real but costly.** Shoot near-silhouettes and fragments only: darkness *hides* the detail AI gets wrong, which is a genuine structural advantage of this direction, not a rationalisation. Absolute prohibitions: no wide field with resolvable plant repetition; no sky as subject; no sun in frame; no golden-hour "lifestyle" framing. Prefer light-on-object over light-in-landscape.

**Budget:** expect a ~50% rejection rate. `seedream_v5_pro` (3cr) × ~20 attempts for ~10 keepers = 60cr; 2 × `seedance_2_0` loops = 45cr. **≈ 105 credits of 199.5** — over half the budget, with one bad batch capable of forcing a re-plan.

## Strengths

- Uses the company's **own name and own best paragraph** as the system. No competitor can copy it without renaming themselves.
- Emotionally the strongest and commercially the most immediately "premium".
- The scroll-bound light scalar is one idea executed everywhere — genuine systemic coherence rather than a collection of effects.
- Sells provenance and preciousness in the first second, without copy.
- `Il Tramonto` is a legitimately novel interaction, not a decorated scrollbar.

## Risks

- **Most likely of the three to become generic-luxury-food.** Golden hour is the most saturated territory in the entire food-branding landscape. The margin between "cinematic" and "olive-oil advertisement" is thin and one weak asset crosses it.
- A continuously interpolating colour system is **hard to keep accessible**: contrast ratios must be validated at every point along the scalar, not at two endpoints, and the mid-scroll range is where it will fail.
- Dark-dominant sites measurably underperform for older demographics — relevant for a regional Italian food producer's actual customer.
- **The eight rows are decorative here, not structural.** The hardest, most ownable fact in discovery is reduced to eight gold marks at the end. That is a real cost.
- Heaviest asset budget and the least headroom for the rejections §8 tells us to expect.

---

# Direction 3 — **MACINA**

> *A pietra* — the risky one

## Central metaphor

**Transformation by attrition.** The one irreversible act at the centre of this business is a seed being crushed between two stones and becoming something else. Not "from field to table" — *from whole to powder*. The site is that passage: everything on it is either whole, being ground, or already flour.

This is deliberately the anti-food direction. It looks like a materials company. It looks like a quarry.

## Emotional tone

Mineral, austere, physical. Not appetising — **material**. A workshop, a mill house, a foundry. Nearer to a Kvadrat or a Vitra materials site than to anything in food.

## Typography

| Role | Typeface | Source / licence |
|---|---|---|
| Display | **Bespoke Stencil** | Fontshare · ITF free licence |
| Text | **Erode** | Fontshare · ITF free licence |
| Data | **DM Mono** | Google Fonts · OFL 1.1 |

**Reason.** Bespoke Stencil's strokes break where a broad-pen writer would lift — letterforms structurally *interrupted*. The concept is matter interrupted and reformed, so the display face argues the concept rather than dressing it. It also carries the correct vernacular reference: **stencil is the real print language of flour sacks and mill markings.** No food brand uses it.

Erode is a serif drawn with deliberately weathered contours. At text sizes it is warm and entirely legible; its edges carry the same attrition idea at a whisper. Display and text are therefore two states of one thought — **broken** and **worn**. That is a typographic system, not a pairing.

DM Mono carries the technical readout: grind grade, mesh, weight, moisture.

## Colour

**The yellow decision: refused outright, and here is the argument.** Yellow is what the corn looks like in a farmer's hand for about two weeks a year. What the customer actually buys and touches — *Maisette*, *Maissini*, *Farina di Mais Rosso* — is pale, dusty and stone-coloured. **This brand's product is not a cob; it is a powder and its consequences.** And since the concept is transformation, the palette must be the colour of the *process*, not of the input. Using yellow would be branding the raw material of a company whose entire value-add is changing it.

The kernel's orange survives only as **residue** — literal flecks in the flour texture at ≤3% coverage. It is never a UI colour, never a rule, never type.

```
--ferro      #1C1E1D   iron near-black — the top of the page
--pietra     #6E6A63   millstone grey
--crusca     #A8977E   bran — the only warm tone in the system
--farina     #DEDAD1   flour, warm off-white — the bottom of the page
--residuo    #C0562A   kernel orange — particles only, ≤3% coverage
```

**Behaviour across scroll: continuous bleaching.** The page starts at `--ferro` (the whole seed; the dark of the earth and the mill house) and ends at `--farina` (the finished powder). It is not an inversion event and not a fade — it is a **monotonic lightening and desaturation**: the site is literally ground down as you descend. Scrolling back up re-darkens it, because the metaphor is reversible in representation even though the process is not.

## Composition rules

- The layout is **two facing stones**: two vertical slabs with a narrow gap running down the page at 1/3 from the left. Grid is an asymmetric **5 + 7** split at that gap.
- Content is milled *through* the gap. Sections enter from the outer edges, meet at the centre, and **what emerges below is finer**.
- **The type scale decreases monotonically down the entire page** — 14rem in the hero, 0.75rem in the product specifications at the bottom. There is no section where type gets bigger again. The page grinds.
- The baseline grid tightens correspondingly, from 32px at the top to 8px at the footer. Leading, measure and letter-spacing all contract on the same curve.

## Image treatment

**Surface only. No scenes, no objects, no hero shots.**

- Every image is a **texture at a stated magnification**: stone face, husk fibre, kernel skin, milled flour macro, dust in raking light, sackcloth weave, kraft.
- Shot as flat-field *scans*, not photographs: even diffuse light, no depth of field, no bokeh, no focal subject.
- Graded to near-monochrome with `--residuo` left in as the only chroma.
- Images are used as **fills** — behind type, inside letterform counters, in the stencil gaps — never as framed pictures with borders.
- Crop: full-bleed horizontal bands only, 16:5.

## Material language

Kraft, sackcloth, stone, concrete dust, iron. References: flour-sack stencils, Donald Judd's plywood, Kvadrat/Raf Simons material sites, industrial mineral specification sheets, Bauhaus weaving swatch cards, Anni Albers. Absolutely nothing rustic, nothing hand-lettered, nothing warm.

## Motion language

**Attrition.** Nothing appears and nothing disappears — everything is either coarse or fine, and scroll moves matter between those two states. The governing physics: **momentum plus friction**. Scroll carries weight and the page resists slightly; when input stops, things *settle* rather than snap.

There is exactly **one** effect in the whole site: a particulate mask that dissolves a letterform into ~4000 points and reassembles it at a finer size. It is permitted at **four moments only**, all of them genuine state changes: `seme → chicco → farina → cibo`. Using it a fifth time would make it decoration, and it would be cut.

## Hero — the first 3 seconds

Full viewport of `--ferro`. Near-black, nothing else.

Centre-left, a slow-rotating mass of pale particles resolves over ~1.4 seconds into the word **`MACINA`** in Bespoke Stencil at 14rem — the stencil breaks letting the black show through the strokes.

Below, one line in Erode: *"Un seme che quasi non c'è più, ridotto a farina, per restare."*

Along the bottom edge, a 100vw band of flour macro texture and a DM Mono readout: `MOLITURA A PIETRA · OTTOFILE INTEGRALE · CHERASCO (CN)`.

**No image of corn. No yellow anywhere.** The first thing you see is a word made of the material it names.

## Signature interaction — **La Macinatura**

Between the two stone slabs, a scroll-locked section where the user **actually grinds**. Drag horizontally (or scroll, on touch) and the upper stone rotates; each full pass drives the type, textures and product names between them one step finer:

`MAIS` → `OTTOFILE` → `FARINA` → `MAISETTE / MAISSINI / FARINA DI MAIS ROSSO`

Four passes and the three products exist. The particulate typography is real-time and responds to drag velocity — grind faster and the particles scatter wider before settling. It is a physical mechanism the user operates, not an animation they watch, and it is the thing people record and post.

## Higgsfield asset strategy

**Volume:** ~10 flat-field texture plates. **No scenes, no objects, no food, no video. This is by far the lowest-risk and lowest-cost plan of the three, and that is a strategic argument, not a convenience.**

Required set: millstone surface, flour macro, bran flecks, husk fibre, dust in raking light, kraft paper, sackcloth weave, kernel skin macro, stone dust, iron.

**Why it survives §8.** Every high-severity risk in discovery §8 is eliminated rather than mitigated: no people, no packaging, no dishes, no lighting continuity to maintain across a set, no anatomy. The one failure mode that remains — *"mushy or repeating detail"* — is **not a failure mode in a texture**. A repeating grain field is what we are asking for. This is the only direction where the AI's characteristic weakness is aligned with the brief.

**Budget:** `z_image` (0.15cr) and `flux_2` (1cr) for most plates; `seedream_v5_pro` (3cr) for 2–3 macro heroes. **≈ 20–25 credits of 199.5.** Roughly 175 credits left unspent — real insurance against everything else going wrong.

## Strengths

- **Absolutely unmistakable.** There is no section of this site that could be lifted onto another food brand with the logo swapped. It passes the studio's hardest test outright.
- Lowest asset cost and lowest AI risk by a very wide margin — the executed work would actually match the concept, which is the usual failure point.
- The typography does the work, which is where the concept says the work belongs.
- The strongest pure-design statement of the three; the best odds of a jury award.

## Risks

- **It may simply not sell food.** An austere grey mineral site aimed at a Piedmontese consumer or a delicatessen buyer is a genuine commercial gamble, and the client may reject it on sight.
- Real-time particulate typography is a performance and accessibility liability on low-end mobile — discovery §8 flags exactly this. It requires a complete static fallback, and **that fallback is where this concept usually dies**: the degraded version is just a grey site with a stencil headline.
- **It under-uses both crown jewels.** The eight is barely present. The myth is absent. Discovery §9 names those as the two things to contend with, and this direction contends with neither.
- Near-extinction becomes an *aesthetic* (austerity, dust, erasure) rather than a *stake*. That is a subtle but real betrayal of §6's strongest commercial insight — that buying this food is what keeps the variety alive.

---

# Selection

## Selected: **OTTO — Registro di una varietà superstite**

Not a close call, and not a compromise between the other two.

### Why it is strongest for the client's business

This company is not a snack brand and should stop behaving like one. Its moat is **verifiable fact**: exactly eight rows, a royal decree, near-extinction, symbiotic agriculture, stone milling, one locality. Discovery §5.5 identifies precisely the disease — *eccellenza, passione, autentico, genuino, unico* piled on top of facts that are far stronger than the adjectives burying them. OTTO is the only direction whose entire system is **built out of those facts rather than decorated with them**. The registry *is* the fact set. Every competitor can claim passion; none of them can claim the file.

Four concrete commercial consequences:

1. **It presents the products without packshots.** §8 records that photography of the real packs is unavailable. A registry presents *objects and specifications*, not packaging — so the constraint stops being a compromise and becomes the format. VESPERO and MACINA both have to work around this; OTTO doesn't notice it.
2. **The thin fact set becomes a virtue.** §8 lists it as a medium risk to be managed with short copy. A registry is *supposed* to be terse. The risk is designed out.
3. **It is legible to the three audiences that matter** — a delicatessen buyer, a food journalist, and a Slow-Food-adjacent consumer all read "documented heritage variety" instantly. It is also light-dominant, high-contrast, fast and SEO-legible, which a dark cinematic site is not, and which matters for a business whose site is its only shopfront.
4. **It travels.** A registry reads identically in Italian and English. A poetic dusk site loses half its register in translation; an austere mineral site alienates in both.

And it does not give up the emotion. It **saves** it. The near-extinction stake and the Hesperides myth are not diluted across the page — they are concentrated into one chapter where the entire site inverts to night and gold. Withholding warmth for seven chapters is what makes the eighth one land. That is a commercial argument as much as an aesthetic one: it is the section that converts.

### Why it is strongest for a developer's portfolio

Different criteria, and I want to be explicit that they are different.

- **A jury reads it in two seconds.** "The number eight is the whole system — eight columns, an 8px unit, an eight-mark rail that counts sixty-four kernels of one pannocchia." That is a one-sentence concept with a visible structural consequence. Award juries reward legible constraint far more reliably than they reward atmosphere.
- **The signature interaction is conceptual, not technical.** `La Riga Ottava` is memorable because of *what it counts*, not because of what it costs to build. Compare `La Macinatura`: brilliant, but a WebGL particle system is only impressive while it runs at 60fps, and its mobile fallback is a liability the portfolio has to apologise for. OTTO's rail degrades to a perfectly good static list and loses nothing conceptual.
- **It is the direction most resistant to dilution** — the standard I am judged on. The grid is arithmetic: if a value is not a multiple of 8, it is wrong, and that is *checkable*. VESPERO's continuous colour system has no such invariant; it drifts under pressure and nobody can prove it did.
- **Its asset plan will actually be delivered.** The most common way an ambitious portfolio piece fails is that the imagery undercuts the concept. At ~68 credits with no faces, no packaging and no dishes, OTTO is the direction where the finished site will most closely resemble the direction as written. That is worth more than a higher ceiling with a lower expected value.

### What we are giving up

I am not going to pretend the other two lose on merit.

**By not choosing VESPERO, we give up the myth as a world.** The company is *named* after the Hesperides, and §2 correctly identifies that paragraph as the single most valuable, least-exploited asset in the business. VESPERO would have made it the entire architecture; OTTO makes it one chapter out of eight. We also lose `Il Tramonto` — a scroll-bound global light system with a draggable sun is a genuinely better *interaction* than a filling rail, and the sacrifice of the type's weight axis burning down as the page darkens is a real loss of craft. **The bet we are making is that a single withheld gold moment hits harder than sustained gold.** If chapter 08 is executed at anything less than full commitment, we will have been wrong, and VESPERO would have been the right call. Chapter 08 is therefore not negotiable in implementation and I will reject the build if it arrives underweight.

**By not choosing MACINA, we give up the risk.** MACINA was the dangerous one, and it was also the cheapest and the safest to produce — a rare combination I do not enjoy walking away from. We lose particulate typography, a signature the user *operates* rather than watches, a palette nobody in this category owns, and about 145 unspent credits. We also lose a genuinely true argument that OTTO only half-honours: **this brand sells powder, not cobs.** OTTO still leans on the pannocchia as its central image when the customer's actual experience is flour, gallette and grissini. I am accepting that inconsistency because the pannocchia is what carries the eight, and the eight is the concept — but it is an inconsistency and I am naming it rather than hiding it.

### Carried into Phase 3

The art-direction bible will specify OTTO only. Three things are locked and not open for revision:

1. **The 8 system is arithmetic, not thematic.** Eight columns, 8px unit, 64 kernels, 8:5 crops, 160/320/640ms. Non-multiples are defects.
2. **`--chicco` never fills anything.** Index only, under 2% coverage. First violation kills the entire colour argument.
3. **There is exactly one chromatic event.** If a second dark section appears anywhere on the site, chapter 08 is dead and so is the concept.
