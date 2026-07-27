# Il Giardino delle Esperidi — OTTO

Art-directed editorial website for the agricultural company Il Giardino delle Esperidi, centred on **Mais Rosso Ottofile Integrale, varietà Albese** and its three current commercial references: Maisette, Maissini and Farina di Mais Rosso.

The experience treats the site as a conservation register rather than a conventional food landing page: eight columns, eight chapters and a fixed 8×8 kernel index. The implementation has no paid runtime dependency; Higgsfield is used only as a static production tool.

## Stack

- Next.js 16 App Router and React 19
- TypeScript strict mode
- Tailwind CSS 4 for token exposure; authored CSS for the art-directed layout
- GSAP, ScrollTrigger and CustomEase for the constrained motion system
- raw WebGL2 instancing for the scroll-built Mais Rosso prologue
- local Bodoni Moda, Archivo and DM Mono through `next/font/local`
- Playwright for browser, responsive and interaction QA
- Sharp for deterministic image derivatives

## Local setup

Requirements: a current Node.js release supported by Next.js 16 and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev          # local development
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # TypeScript without emit
npm run format       # Prettier write
npm run format:check # Prettier verification
npm test             # production build + Playwright at the three QA sizes
npm run test:browser # Playwright against the current production build
npm run test:ui      # Playwright UI
npm run shots        # responsive screenshots of a running server
npm run shots:signature # eight integrated prologue checkpoints, forward and reverse
npm run shots:signature:static # reduced-motion and no-JS signature states
npm run assets:prologue # rebuild the three transparent static fallback plates
npm run verify       # format, lint, types, build and browser tests
```

Capture options:

```bash
npm run shots -- --url http://127.0.0.1:3000 --label final --full
npm run shots -- --url http://127.0.0.1:3000 --label motion --motion --full
```

## Architecture

```text
src/
  app/                 route, metadata and global styles
  assets/fonts/        committed local font sources
  components/          server-rendered chapters and one motion client island
  content/             verified facts and final Italian interface copy
  lib/                 local font loading and deterministic prologue renderer
  styles/              tokens and art-directed component CSS
public/images/         approved web derivatives only
scripts/               visual capture and deterministic asset processing
tests/                 Playwright experience checks
docs/                  discovery, creative law, asset record and QA
```

`src/content/facts.ts` is the factual source of truth. Commercial names printed on current packaging take precedence over the outdated public site. Editorial copy lives separately in `src/content/site.ts`.

The interface is server-rendered by default. Two narrow client islands own motion: `ExperienceMotion.tsx` controls the 64-kernel rail and chapter-08 palette event; `KernelPrologue.client.tsx` owns the signature ScrollTrigger/WebGL lifecycle. Its fixed decorative canvas follows real content stops without adding height or a pin, so chapter 08 remains the only GSAP-created pin.

## Asset workflow and Higgsfield

The complete production history is recorded in `docs/asset-plan.md` and `docs/assets-manifest.md`.

1. Generate only after written Art Director approval.
2. Store raw candidates under `assets/masters/` (gitignored).
3. Reject factual, botanical or material failures; never force them into layout.
4. Put only approved, optimized derivatives in `public/`.
5. Record source, prompt, dimensions, status and usage in the manifest.

The earlier `impronta-otto-relief.avif` remains in the audited asset archive but is no longer rendered. The shipping background is code-native WebGL2 and reuses three transparent AVIF renderer exports in four absolute section placements for reduced motion, Save-Data, no-JS and WebGL failure:

```bash
npm run assets:prologue
```

Generation scripts are versioned for auditability. They require an authenticated Higgsfield CLI and are not part of the site build. No Higgsfield token or API call is required for visitors.

## Testing and QA

Playwright verifies:

- one semantic `h1` and eight real chapter sections;
- exactly 64 rail kernels and eight working anchor targets;
- the eight-column grid at every reference viewport;
- no horizontal document overflow;
- fixed, keyboard-reachable rail hit targets;
- reduced-motion composition parity;
- deterministic 256-kernel/eight-row topology, three-draw-call budget and device LOD;
- exact forward/reverse signature states and pointer gating at the climax;
- eight-lane responsive field LOD, 4K framebuffer cap and no off-screen pointer renders;
- complete/reversible rail and night-field state;
- current product hierarchy, formats and the absence of an invented Maissini weight.

Visual captures are written to `docs/captures/` and gitignored. Creative decisions and review outcomes live in `docs/prototype-review.md` and `docs/final-qa.md`.

## Production notes

- Generated assets are static and locally served.
- The three signature fallback exports total 21,316 bytes and create four decorative section backgrounds.
- Chapter 08 and the contact footer are the only dark field.
- No video is shipped: the Art Director judged that motion type and the rail carry the story more honestly than an unverified generated process loop.
- Before public client launch, confirm the complete legal name, fiscal details and a privacy policy matching the final hosting/analytics setup.
