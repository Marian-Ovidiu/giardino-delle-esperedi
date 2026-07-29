# Ruling — the plate blend, and what the client generates against

**Author:** Art Director
**Date:** 2026-07-29
**Status:** BINDING
**Supersedes:** the `mix-blend-mode` and `filter` declarations on `.piastra__img` in `src/styles/components.css`
**Escalated by:** Frontend Lead, "`mix-blend-mode: multiply` has never worked"

---

## 0. The short version

**The multiply comes out. The filter comes out with it, one commit later.
The client generates against a flat `#E9E3D6` ground. Plates do not fade at their edges.**

The escalation was right about the defect and right that it is urgent. It was
wrong about the remedy, and the measurement that decides it is the one it
correctly declined to guess at. I ran it. It reverses the recommendation.

---

## 1. I verified it myself

`scripts/ad-blend-probe.mjs` and `scripts/ad-campitura-probe.mjs`, Chromium at
1440 and 390, `deviceScaleFactor: 1`, all samples taken from a single
screenshot so capture bias cancels. Both are committed — re-run them, do not
trust this table either.

The escalation's numbers reproduce **exactly**. `saturate(0.72) contrast(1.04)`
applied to `#E9E3D6` computes to `#ECE7DD` by hand and measures `#ECE7DD` in
the browser. The report is sound and I am ruling on top of it, not around it.

---

## 2. Why the multiply dies

### 2.1 It was never authorised

The 2026-07-26 signature amendment, art-direction bible, line 19:

> `mix-blend-mode: multiply` is limited to this decorative layer and its static
> equivalents

`.piastra__img` is not that layer. The declaration is out of spec on its face,
independently of whether it renders. That alone settles it; the rest is why I
would kill it even if it were legal.

### 2.2 It does the opposite of what its own comment claims

The comment says the grade is pulled toward the paper *"so no plate becomes a
colour event — `--chicco` has a 2% budget and photography is what spends it"*.

Measured fraction of plate pixels reading as saturated (§4.4's own test:
`max > 60 && (max−min)/max > 0.35`):

| regime | ch02 lastra | ch07 lastra |
|---|---|---|
| **A** as shipped | 4.2% | **15.3%** |
| **B** multiply engaged via frame background | 7.1% | **21.2%** |
| **D** multiply and filter both deleted | 9.5% | **27.9%** |

**Multiply raises chroma by ~39%.** It is not a mystery: multiplying by a warm
paper attenuates blue hardest (×0.839 vs ×0.914 red), and blue is the *minimum*
channel in every warm subject on this site, so the max−min spread widens. The
declaration was written to spend less of the `--chicco` budget and it spends
more. Shipping it would move the single worst number on the site in the wrong
direction.

### 2.3 It is the wrong operator for this asset set

Measured ground colour at the four corners of every shipped plate:

| asset | corners |
|---|---|
| `pietra-macina-cover.avif` | `#161813` `#2E2F2A` `#55544F` `#4F483C` |
| `referenze-confezioni.avif` | `#110F0E` `#C8A18B` `#9C613A` `#734125` |
| `pannocchie-cover.avif` | `#524E50` `#814B43` `#D47068` `#D8C5AC` |
| `campo-coltura.avif` | `#D7D0BE` `#DDD6C6` `#D4C7B6` `#DBD0BE` |
| `re-materia-test.png` | `#F4E0CB` `#F3DFCA` `#F2DDC8` `#F2DCC7` |

**Not one shipped plate has a `--carta` ground.** §9.3 — *"the photographic
ground **is** `--carta` #E9E3D6 … paper fills the frame edge to edge"* — is
honoured by zero of eight assets. Every plate is a full-bleed photograph with a
hard rectangular edge.

Multiply is multiplicative, therefore non-uniform. Applied to that set it drops
the light plates 30–50 levels and the near-black ones by nothing. §9.5 exists
precisely *"so mixed provenance becomes invisible"*. Multiply amplifies the
divergence it was reached for to suppress.

### 2.4 Even in the ideal world it is wrong

Suppose every asset were re-shot to §9.3 with a true `#E9E3D6` ground. Multiply
against a `--carta` frame then renders that ground at `#D8CEB9` — **measured,
regime B, −19/−23/−31 against the page.** A visibly darker tan rectangle on the
sheet. A card. Worse than today's `+20/+26/+39`, not better.

The only source ground that survives multiply is `#FFFFFF`, which is why the
escalation reached for it. But requiring white masters contradicts three
separate clauses: §9.3 (the ground *is* carta), §9.4 (the baked shadow is
specified at 62% of `--inchiostro` **over `--carta`** and would be
double-darkened), and §9.5.2 (*"white ceiling 94% — RGB 240. **Never
clipped**"*). Multiply can only be made to work by breaking the photographic
direction that gives this site its substrate.

### 2.5 The intent already has a correct implementation, and it is not CSS

The intent in the comment is real and I stand behind it: plates sit *in* the
field, not on it. §9.3 already delivers it — *"the image and the page share a
substrate, so images have no visible edge"*. That is an instruction to the
**camera**, not to the compositor. A CSS multiply is a simulation of a thing the
bible says to photograph.

Measured, regime D — no multiply, no filter — a source of `#E9E3D6` renders at
`Δ 0,0,0` from the adjacent page. **Exact identity, with zero CSS.** The correct
implementation of "plates sit in the field" is a flat paper ground in the file.

---

## 3. Why the filter dies too — and why it is sequenced

The filter is the actual live defect. It is not merely inert-adjacent: it
*lightens*. A `--carta` ground renders `#ECE7DD`, **+3/+4/+7 above the page**.
That is the pale panel. The client said *"mi sembra un po' trasparente"*; the
escalation is right that it is the opposite, and `contrast(1.04)` is the
mechanism — it pushes everything above mid-grey further toward white.

But the filter is doing a second, undeclared job. **§9.5 owns the grade.**
`scripts/build-brand.mjs` implements it exactly — black point 15, white ceiling
240, global saturation 35% with a 0–25° hue mask, grain. `scripts/build-piastre.mjs`
**never calls it**: it crops, resizes and encodes, nothing more. Measured floors
and ceilings confirm it — the `/foto/` assets sit at 25/239, the generated ones
at 0/251, 0/253, 0/255.

So `filter: saturate(0.72)` is a site-wide approximation standing in for a grade
that six of eight assets never received — while *double-grading* the two that
did (35% × 72% = 25% effective saturation, well under spec).

**The grade belongs in the file. The CSS filter is an architectural error, not a
style choice.**

**Sequencing gate.** Deleting the filter alone takes ch07 from 15.3% to 27.9%.
The filter comes out **in the same commit** that the §9.5 grade goes into
`build-piastre.mjs` and the six generated plates are rebuilt. Not before. If
that commit is not ready, ship §4.1 alone and leave §4.2 pending — the multiply
deletion stands on its own and is safe in isolation.

---

## 4. The exact CSS

### 4.1 Ship now — safe in isolation

```css
.piastra__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* No blend, no CSS grade. §9.5 owns the grade and it is baked at build time
     (scripts/build-brand.mjs, scripts/build-piastre.mjs); §9.3 owns the ground
     and it is `--carta` in the photograph, not a compositing trick here. A
     plate whose ground is #E9E3D6 renders at Δ0,0,0 from the page — measured,
     scripts/ad-blend-probe.mjs.

     `mix-blend-mode: multiply` was removed on 2026-07-29. It had never
     rendered (the plate's own `z-index: 1` isolates it), it is barred from
     this element by the 2026-07-26 signature amendment, and when forced to
     engage it RAISED ch07's saturated fraction 15.3% → 21.2% against a 2%
     budget — the opposite of what it was written to do.
     docs/piastre-blend-ruling.md. */
  filter: saturate(0.72) contrast(1.04);
}
```

### 4.2 Ship with the build-grade commit, not before

Delete the `filter` line, leaving:

```css
.piastra__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

and in the same commit, `scripts/build-piastre.mjs` imports and applies the
§9.5 grade already written in `scripts/build-brand.mjs` — `gradePixels`,
the `BLACK`/`WHITE` linear, and `grain` — then all six `/generated/piastre/`
derivatives are rebuilt.

### 4.3 SHIPPED — a real AA failure I found on the way

`.scheda`'s mobile ground measures **4.47:1** against `--pietra-testo` **as
shipped today**. Below the 4.5 floor. Pre-existing, caused by neither the
multiply nor this ruling — but §4.2 costs it a further 0.04 and I will not sign
a change that leaves a known sub-AA value in place.

Measured sweep at 390px, ground sampled under the real text boxes with text
hidden:

| `--campitura-opacity` | ground | ratio | |
|---|---|---|---|
| 0.075 (shipped) | `#DBD3C7` | 4.43:1 | FAIL |
| 0.070 | `#DCD4C8` | 4.48:1 | FAIL |
| 0.065 | `#DDD5C9` | 4.52:1 | too tight |
| **0.060** | `#DDD7CA` | **4.59:1** | **PASS** |

```css
@media (max-width: 767px) {
  .scheda .piastra--campitura .piastra__img {
    --campitura-opacity: 0.06;
  }
}
```

0.065 passes by 0.02 and I do not ship a 0.02 margin on an accessibility floor.
`.chapter--stone` at 0.08 measures 4.55:1 and holds — leave it.

Shipped alongside §4.1 rather than held for §4.2: 0.06 passes under **both**
compositing regimes (4.59:1 with the filter present, 4.59:1 without), so it is
safe now, and a live sub-AA value does not wait for an unrelated commit.
Re-measured after the edit — `.scheda` @390 now **4.59:1 PASS**.

### 4.4 Confirmed after shipping

`.piastra__img` computes `mix-blend-mode: normal`. Regimes A, B and C now
render **identically** — ch02 `#C2B09C` / 4.2%, ch07 `#B1997D` / 15.3% — because
with the multiply gone the frame background has nothing to engage. **Zero pixels
changed on any plate**, which is the whole point: an inert declaration was
removed, not a treatment.

*Note for whoever re-runs the probes:* there were two Next servers up during
this ruling. Port 3000 was a stale detached instance not watching the working
tree; the live dev server was on **3001**. Both probes take `PROBE_URL`. Check
`getComputedStyle(...).mixBlendMode` before trusting any measurement — the first
pass of §4.3 appeared to fail because it was measured against the stale server.

---

## 5. The sentence for the client

> Genera la piastra su un fondo **piatto, uniforme, `#E9E3D6`** — carta non
> sbiancata — che riempie l'inquadratura da bordo a bordo. Nessuna sfumatura,
> nessuna vignettatura, nessun bordo morbido: il fondo non sfuma verso la
> pagina, **è** la pagina. Luce uniforme da angolo a angolo entro il 4%, il
> soggetto occupa al massimo il 38% dell'inquadratura, e l'unica ombra è quella
> descritta in §9.4.

`#E9E3D6`. Not `#E9E1D0` — that value is tuned to a bug and dies with it. Not
`#FFFFFF` — white is the identity element for a multiply that is not shipping,
and it would break §9.4's shadow density and §9.5's white ceiling.

---

## 6. Should a plate fade at its edges at all?

**No. This is already law and I am restating it, not deciding it.**

§9.3: *"No gradient across the ground. **No vignette.** Even illumination corner
to corner within 4%."*
§8.6: *"No borders, no frames, no keylines, no `border-radius`, no CSS shadow."*

A plate is a plate: a hard-edged 8:5 field with a caption and a rule. It has no
visible edge **not because it fades, but because the paper inside the photograph
is the same paper as the page.** Those are opposite mechanisms and only one of
them is ours.

The client asked how to blend an image into the page. The honest answer is the
one the escalation suspected: **it should not blend.** A soft vignette is the
single fastest way to make this look like every other food site — it is the
gesture §9.1 already refuses under "no lens distortion, no vignette", and a
faded rectangle on a register page reads as a stock photo with a feather, not as
a specimen plate. The dissolution is real, and it is achieved by matching the
substrate exactly, not by feathering the boundary.

---

## 7. The other four questions

**§19.9, the frame background — REJECTED.** Moot given §2, but ruled for the
record so it is not reintroduced. `.piastra__frame`'s parent is `.piastra`,
which declares no background; the frame's computed `background-color` would
therefore differ from its parent's, which is exactly what §19.9 tests. It trips
the census. There is no "blending substrate" exemption: §11.5 enumerates two
exceptions — the rail hover panel and the chapter-08 field — and an enumerated
list of two is a closed list. The census reading in `registro-dati-ruling.md` §5
was correct and it holds here.

**`--notte` — moot, with a standing rule.** No frame background ships, and ch08
carries no plate. The rule survives the specific case: **any paper value baked
for compositing is the literal `#E9E3D6`, never `var(--carta)`.** The alias
re-points at the inversion and would drag a compositing constant across a field
change it has nothing to do with. Recorded here so the next reader who reaches
for `var(--carta)` in a blend context finds this line first.

**The already-approved plates — no re-gate for §4.1, re-gate for §4.2.**
Deleting an inert declaration changes not one pixel; regime A and regime C
measure identically at every probe point. §4.2 does change all six generated
plates — but it changes them by giving them the grade §9.5 has always required
and `build-piastre.mjs` has never applied. That is a regrade, not a new
composition. Re-run the asset gate on tone and consistency only; crop, subject,
void and shadow were approved and are untouched.

**ch07's chroma — the fix neither helps nor hurts, and the asset is the
problem.** 15.3% today, 21.2% under multiply, 27.9% ungraded. The plate is 43%
of the 1440 viewport, so ~6.6% of the viewport is saturated against a **2%**
ceiling — 3.3× over, before any of this. And the cause is structural:
`referenze-confezioni.avif` measures 32.3% saturated pixels at mean chroma
0.324, and **§9.5.4 holds the 0–25° hue window at 100% saturation — precisely
the maize red that §4.4 caps at 2%.** The grade is written to protect the exact
chroma the budget is written to suppress. No compositing model resolves that
contradiction; a smaller or differently-chosen plate does. **ch07 remains open
under my existing ruling, this one does not close it, and I am not accepting a
CSS filter as the thing holding it at 3.3× instead of 6×.**

**The campitura opacities — no re-audit needed. Measured, not assumed.** The
grounds are inside their own stacking contexts too, so the multiply was inert
there as well, and the filter's effect at 5.5–8% opacity is negligible. Delta
across all three regimes is **≤0.04:1**:

| | A shipped | B multiply | D both deleted |
|---|---|---|---|
| `.scheda` @1440 | 4.73:1 | 4.73:1 | 4.70:1 |
| `.chapter--stone` @1440 | 4.72:1 | 4.72:1 | 4.72:1 |
| `.chapter--stone` @390 | 4.55:1 | 4.55:1 | 4.55:1 |

The calibration was not done against the wrong compositing model in any way
that reaches the third significant figure. The one real failure is `.scheda` at
390px, it predates this ruling, and §4.3 fixes it.

---

## 8. Verdict

**APPROVED WITH CHANGES** — the escalation's diagnosis and root cause are
correct and its measurements reproduce exactly; its remedy is reversed, because
engaging the multiply raises the one number the declaration was written to
lower and requires an asset spec that contradicts §9.3, §9.4 and §9.5.

Delete the multiply now. Delete the filter when the §9.5 grade enters
`build-piastre.mjs`. Tell the client `#E9E3D6`, flat, edge to edge, no fade.

**Standing item, not caused by this ruling and not closed by it:** ch07's plate
is 3.3× the `--chicco` budget under the most favourable compositing model
available, and §9.5.4 and §4.4 are in direct contradiction for any asset whose
subject is red maize. That needs a ruling of its own and it is mine to make.
