# Phase 8 — Final QA

**Project:** Il Giardino delle Esperidi — sito vetrina  
**Direction:** OTTO — *Registro di una varietà superstite*  
**Date:** 2026-07-26  
**Build status:** GO  
**Public release status:** HOLD pending client-supplied legal data

## Signature background QA amendment — 2026-07-26

The Hero→chapter-03 background is now the approved `Dalla dispersione al registro` sequence:

- 256 instanced kernels assemble deterministically into eight longitudinal rows (`ottofile-v1` seed);
- one unpinned ScrollTrigger maps real Hero, chapter-01, chapter-02 and chapter-03 positions to normalised progress; the fixed canvas adds no document height;
- exactly three draw calls are used, with depth-major field LOD 48/32/24 that preserves all eight lanes at six/four/three depths, responsive camera depth 1/0.86/0.72 and DPR caps 1.5/1.25/1;
- the framebuffer is additionally capped at 4.2 megapixels and 4096 px per dimension;
- pointer movement is a true camera orbit capped at ±0.35° yaw / ±0.20° pitch and hard-disabled at the cob and incision holds;
- all WebGL buffers, programs and VAOs are released on teardown;
- the semantic scroll range and document visibility suppress pointer RAF and WebGL renders outside the signature story;
- the final frame freezes at `#otto-file top 76%`, fades to zero by `top top` and reverses exactly;
- fallback mode reuses three approved AVIF exports in four absolute, `aria-hidden` section backgrounds; they create no layout height or CLS;
- the internal `/prologue-preview` production route resolves to 404 and is marked noindex.

Integrated captures at all eight checkpoints and all three reference viewports are in `docs/captures/signature-landing/`; reduced-motion and no-JS evidence is in `docs/captures/signature-static/`. The paired forward/reverse snapshots have identical render hashes at every checkpoint. Final verdicts: Art Director GO, Motion Designer GO, Content Strategist GO and Creative Frontend Lead GO tecnico.

---

## 1. Final verdict

The production implementation is complete and approved by all four project roles. The page is statically prerendered, responsive, accessible, visually coherent and independent of paid APIs at runtime.

The remaining hold is external rather than technical or creative: the client must confirm the complete legal business name, P. IVA/codice fiscale, legal postal address and a Privacy Policy aligned with the final hosting and data flows before public publication.

## 2. Role sign-off

### Art Director — GO

- OTTO remains original and recognisable from cover to footer.
- The hero clip is intentional and controlled rather than accidental overflow.
- The signature reads as a material atmosphere beneath the record, never as a generated image card or content block.
- The eight chapters use distinct compositions without becoming template sections.
- The single night/gold inversion is visually withheld until chapter 08 and lands as the memorable event.
- Typography, rail and four registration marks form one coherent identity on desktop, tablet and mobile.

### Brand & Content Strategist — GO

- The rendered hierarchy is Mais Rosso Ottofile Integrale first, then Maisette, Maissini and Farina di Mais Rosso.
- Maisette is identified as gallette, 120 g; Maissini as grissini with no invented weight; Farina as Ottofile Integrale varietà Albese, macinata a pietra, 500 g.
- The Vittorio Emanuele II story is qualified as company tradition rather than asserted as an independently verified decree.
- The 2007 conservation-register fact replaces unsupported recovery timing and grower-count claims.
- Nutrition, biological-certification, gluten-free, origin, price, award and obsolete-format claims are absent.
- `docs/content-plan.md` and the runtime fact/copy layers are synchronised.

### Motion & Interaction Designer — GO

- Chapter 08 owns the only pin, measured at exactly one viewport height.
- The 64th kernel is the trigger: rail gold at 0 ms, field night at 160 ms, registration marks from 800–1120 ms.
- The sequence reverses in the opposite order when scrolling back.
- Mobile rail taps expose the chapter label for 640 ms.
- Reduced motion removes the pin and makes the night state instantaneous, without removing the state change.
- With JavaScript disabled, the approved decorative signature backgrounds remain visible without changing layout, and chapter 08 remains readable in its server-rendered night field.

### Creative Frontend Lead — GO

- Next.js 16.2.12 App Router and React Server Components are used according to the installed documentation; GSAP is isolated to one client component.
- The production route `/` is statically prerendered.
- Every `.field` retains eight computed columns at the QA viewports.
- Every interactive anchor measures at least 40×40 px and has visible keyboard focus.
- No Bodoni text renders below 32 px and no footer/UI link uses Bodoni.
- No horizontal overflow occurs at 390, 768, 1280, 1440 or 1920 px.
- The site loads only local static assets and makes no Higgsfield/API call for visitors.

## 3. Mechanical evidence

Final clean run:

```text
npm run format:check  PASS
npm run lint          PASS
npm run typecheck     PASS
npm run build         PASS
npm test              PASS — 45 passed, 18 intentional project skips
```

The 63 Playwright project cases run across desktop 1440×1000, tablet 768×900 and mobile 390×844. Eighteen skips are intentional breakpoint-specific audits: fine-pointer, off-screen rendering, context lifecycle, 4K framebuffer, no-JS, production preview route, deep-link stability and five-width checks run only where applicable; the touch-label check runs only on mobile.

### Hero viewport clip

| Viewport width | Line clipped | Gate |
|---:|---:|---|
| 390 px | 8.293% | PASS |
| 768 px | 9.034% | PASS |
| 1280 px | 5.744% | PASS |
| 1440 px | 4.580% | PASS |
| 1920 px | 8.236% | PASS |

All five values sit inside the locked 4–16% band and `scrollWidth === clientWidth` at every width. Clipping is performed by `overflow-x: clip` on the hero section.

### Font and asset payload

- Five local Latin WOFF2 files total 152,148 bytes, below the 250 KB budget.
- Only Archivo Roman and Bodoni Roman are preloaded: 81,188 bytes combined.
- Bodoni Italic and both DM Mono weights are not preloaded.
- `carta.avif`: 59 KB.
- Three signature fallback AVIF files: 21,316 bytes combined, each 1280×800 with alpha, used in four absolute decorative placements.
- No video ships; the Art Director preferred the verified material trace to an unconvincing generated process loop.

## 4. Browser and visual checks

Verified at 1440×1000, 768×900 and 390×844 with motion enabled, reduced motion and JavaScript disabled. The capture set in `docs/captures/` includes the integrated signature, static fallback, production hero and completed chapter-08 night state for all three viewports. It is gitignored because captures are QA evidence rather than runtime assets.

Checks include semantic landmarks, single `h1`, eight chapters, eight valid rail anchors, 64 rail kernels, 256 procedural prologue kernels, image visibility, no dead anchors, fixed rail, keyboard focus, exact forward/reverse signature hashes, pointer gates, static fallback modes, WebGL lifecycle, framebuffer budget, console exceptions, product truth and no invented Maissini weight.

## 5. Asset decision record

Higgsfield generations were reviewed in controlled batches. Botanical cob attempts were rejected for waxy texture and morphology errors. The approved `Impronta Otto` derivative remains in the audit archive but is superseded in the interface by the code-native signature sequence. Its three static fallback plates are deterministic renderer exports, not new synthetic botanical imagery. Full prompts, model provenance, rejected candidates and usage locations are recorded in `docs/assets-manifest.md`.

## 6. External pre-publication hold

Before a public client launch, obtain and verify:

1. complete legal business name;
2. P. IVA and/or codice fiscale as applicable;
3. legal postal address to display;
4. final Privacy Policy for the actual hosting, analytics, forms and third-party services.

These values are intentionally not inferred from conflicting or outdated public pages. Internal preview, portfolio review and technical handoff are approved; public legal completion must wait for client confirmation.
