# Asset manifest

**Project:** Il Giardino delle Esperidi  
**Updated:** 2026-07-27  
**Rule:** only assets marked `APPROVED — SHIP` may be rendered by the website.

> **Reconciliation, 2026-07-27.** Audited the manifest against the filesystem and
> against runtime references in `src/`. Two corrections applied:
>
> 1. `impronta-otto.avif` and `impronta-otto-relief.avif` were marked
>    `ARCHIVE` / "not requested at runtime" but were sitting in `public/`, so
>    they were being served publicly and shipped on every deploy — 145 KB of
>    payload for files nothing references. **Moved to `assets/archive/`.**
>    Archive status and `public/` are contradictory by definition; anything not
>    `APPROVED — SHIP` does not belong under `public/`.
> 2. Runtime reference audit: `public/` now contains exactly four files, and
>    all four are reachable from code — `carta.avif` from `globals.css:57`, and
>    the three prologue plates from `StaticProloguePlate.tsx:21` via a template
>    path (`/images/generated/prologue/${state}.avif`). No orphans, no
>    unreferenced payload.
>
> Higgsfield balance at reconciliation: **177.05 credits** (22.45 spent of the
> 199.50 opening balance).

The complete, verbatim generation prompts live in `docs/asset-plan.md` §6 and in the versioned scripts named below. This manifest records every generated candidate, including rejections, so a rejected frame cannot silently return to the layout.

## Approved assets

| Filename | Source | Purpose | Generation prompt | Dimensions | Format | Approval status | Usage location |
|---|---|---|---|---:|---|---|---|
| `assets/refs/REF-CARTA.png` | Higgsfield `z_image`; candidate `carta-01`; neutralised mechanically from mean RGB 208/190/164 to 233/227/214 | Locked material and colour reference for every generated plate | `docs/asset-plan.md` §6.1, verbatim | 2048×1152 | PNG | `APPROVED — REFERENCE` | Generation input only; never requested at runtime |
| `public/images/textures/carta.avif` | Approved `REF-CARTA`, centre-cropped and web encoded locally | Static paper substrate/fallback; the first approved Higgsfield visual | 6.1 prompt above; no generative edit after approval | 1280×800 | AVIF, 59 KB | `APPROVED — SHIP` | Prototype hero/record substrate; CSS background, decorative |
| `assets/archive/impronta-otto.avif` | Higgsfield `nano_banana_2_lite`; candidate `impronta-01`; left crop and neutral grade toward `#E9E3D6` | Locked full-field source for “Impronta Otto” | `scripts/generate-batch1r-impronta.zsh`, verbatim | 1280×800 | AVIF, 57 KB | `APPROVED — SOURCE DERIVATIVE` | Source for relief extraction; not rendered directly because its 8:5 paper perimeter remained visible |
| `assets/archive/impronta-otto-relief.avif` | Deterministic high-pass extraction from approved `impronta-otto.avif`; script `scripts/extract-impronta-relief.mjs` | Transparent material relief preserving the approved eight-groove geometry without the rectangular paper field | Same generation prompt as source; no generative edit | 1280×800 | AVIF with alpha, 87,085 bytes | `APPROVED — ARCHIVE`; superseded by the code-native signature | Audit archive only; not requested at runtime |
| `public/images/generated/prologue/dispersion.avif` | Deterministic transparent export from the approved WebGL renderer, seed `ottofile-v1`; `scripts/export-prologue-plates.mjs` | Static state 1 for reduced motion, Save-Data, WebGL2 failure and no-JS | No generative prompt; code-native topology and material defined in `src/lib/prologue/` | 1280×800 | AVIF with alpha, 2,571 bytes | `APPROVED — SHIP`; Art Director plate gate passed | Absolute, decorative Hero background; `aria-hidden`, empty alt |
| `public/images/generated/prologue/plant.avif` | Deterministic transparent export from the approved WebGL renderer, seed `ottofile-v1`; `scripts/export-prologue-plates.mjs` | Static state 2: formed cob attached to plant | No generative prompt; code-native topology and material defined in `src/lib/prologue/` | 1280×800 | AVIF with alpha, 12,444 bytes | `APPROVED — SHIP`; Art Director plate gate passed | Absolute, decorative chapter-01 background; `aria-hidden`, empty alt |
| `public/images/generated/prologue/incisions.avif` | Deterministic transparent export from the approved WebGL renderer, seed `ottofile-v1`; `scripts/export-prologue-plates.mjs` | Static state 3: exactly eight material incisions | No generative prompt; code-native topology and material defined in `src/lib/prologue/` | 1280×800 | AVIF with alpha, 6,301 bytes | `APPROVED — SHIP`; Art Director plate gate passed | Absolute chapter-02 background and short masked chapter-03 release; both decorative, `aria-hidden`, empty alt |

## Batch 0 — paper candidates

| Filename | Source | Purpose | Generation prompt | Dimensions | Format | Approval status | Usage location |
|---|---|---|---|---:|---|---|---|
| `assets/masters/batch-0/paper/carta-01.png` | Higgsfield `z_image` | Paper style test | `docs/asset-plan.md` §6.1 | 2048×1152 | PNG | `APPROVED WITH GRADE`; source of `REF-CARTA` | Master archive only |
| `assets/masters/batch-0/paper/carta-02.png` | Higgsfield `z_image` | Paper style test | `docs/asset-plan.md` §6.1 | 2048×1152 | PNG | `REJECTED`; too yellow and generically uniform | None |
| `assets/masters/batch-0/paper/carta-03.png` | Higgsfield `z_image` | Paper style test | `docs/asset-plan.md` §6.1 | 2048×1152 | PNG | `REJECTED`; visible horizontal seams/banding | None |

## Batch 0 — pannocchia style test, Seedream

All four use the exact prompt in `docs/asset-plan.md` §6.2 and `REF-CARTA` as image reference. All are 1872×1248 PNG. They are rejected at the instant-fail gloss check: repeated white specular highlights make the dried kernels look waxed or lacquered; shadows are also too long and dark.

| Filename | Source | Purpose | Approval status | Usage location |
|---|---|---|---|---|
| `assets/masters/batch-0/pannocchia/pannocchia-01.png` | Higgsfield `seedream_v5_pro`, 1.5k, 3:2 | Pannocchia style test | `REJECTED` | None |
| `assets/masters/batch-0/pannocchia/pannocchia-02.png` | Higgsfield `seedream_v5_pro`, 1.5k, 3:2 | Pannocchia style test | `REJECTED` | None |
| `assets/masters/batch-0/pannocchia/pannocchia-03.png` | Higgsfield `seedream_v5_pro`, 1.5k, 3:2 | Pannocchia style test | `REJECTED` | None |
| `assets/masters/batch-0/pannocchia/pannocchia-04.png` | Higgsfield `seedream_v5_pro`, 1.5k, 3:2 | Pannocchia style test | `REJECTED` | None |

## Batch 0 — controlled cross-model retry, Flux 2

The exact revised prompt is versioned in `scripts/generate-batch0-flux.zsh`. Flux 2 did not support the requested 3:2 ratio when checked on 2026-07-26, so the nearest production-safe wider ratio, 16:9, was used for a later 8:5 crop. All are 2752×1536 PNG, `pro`, 2k.

| Filename | Source | Purpose | Approval status | Usage location |
|---|---|---|---|---|
| `assets/masters/batch-0/pannocchia-flux/pannocchia-flux-01.png` | Higgsfield `flux_2` | Dry/matte cross-family style retry | `REJECTED`; false longitudinal split and long shadow | None |
| `assets/masters/batch-0/pannocchia-flux/pannocchia-flux-02.png` | Higgsfield `flux_2` | Dry/matte cross-family style retry | `REJECTED`; invented lamp/prop, false split, long shadow | None |
| `assets/masters/batch-0/pannocchia-flux/pannocchia-flux-03.png` | Higgsfield `flux_2` | Dry/matte cross-family style retry | `REJECTED`; too many visible rows and long shadow | None |
| `assets/masters/batch-0/pannocchia-flux/pannocchia-flux-04.png` | Higgsfield `flux_2` | Dry/matte cross-family style retry | `REJECTED`; false longitudinal split and long shadow | None |

## Batch 1R — Impronta Otto fallback

After two failed botanical families, the Art Director permanently closed generated cob photography. The approved fallback proves “eight” through a material trace: eight parallel impressions in the locked paper field. The exact prompt and model options are versioned in `scripts/generate-batch1r-impronta.zsh`. All masters are 1365×768 PNG.

| Filename | Source | Purpose | Approval status | Usage location |
|---|---|---|---|---|
| `assets/masters/batch-1r/impronta/impronta-01.png` | Higgsfield `nano_banana_2_lite` | Abstract eight-groove material study | `APPROVED WITH GRADE`; exactly eight grooves, cleanest material behaviour | Source of shipping derivative; master archive only |
| `assets/masters/batch-1r/impronta/impronta-02.png` | Higgsfield `nano_banana_2_lite` | Abstract eight-groove material study | `REJECTED`; weaker spacing and edge behaviour | None |
| `assets/masters/batch-1r/impronta/impronta-03.png` | Higgsfield `nano_banana_2_lite` | Abstract material study | `REJECTED`; nine grooves, factual/structural mismatch | None |
| `assets/masters/batch-1r/impronta/impronta-04.png` | Higgsfield `nano_banana_2_lite` | Abstract eight-groove material study | `REJECTED`; less convincing relief and hierarchy | None |

## Production ruling

- Botanical photography is closed: neither the Seedream nor Flux family met the material-realism gate. Rejected candidates must not be reintroduced.
- `impronta-otto-relief.avif` remains an approved archive derivative but was superseded in the rendered interface by the signature prologue on 2026-07-26.
- The prologue itself is code-native. Its only runtime images are the three approved, transparent static exports above; their combined payload is 21,316 bytes.
- No further generation is required. Later asset production requires a new written Art Director gate.
- No generated packaging, label, certification mark or product text exists in the asset library.
