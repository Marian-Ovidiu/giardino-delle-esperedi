# Signature Motion — Dalla dispersione al registro

**Status:** IMPLEMENTED; FINAL GO  
**Scope:** decorative scroll background across the approved Hero and chapters 01–03. Typography, palette, content and chapter layouts remain unchanged.

## Narrative argument

The sequence expresses a variety moving from near-dispersion to continuity. Isolated kernels are loss; deterministic attraction into eight rows is custody through practice; cob, plant and field reveal origin. The final flattening into eight paper incisions returns spectacle to evidence.

The sequence is not content and never explains itself. It is `aria-hidden`, cannot receive input and remains beneath every title, fact row, link and focus ring.

## Scroll mapping

The backdrop is `position: fixed`, exactly one viewport high, and adds no document height. One unpinned ScrollTrigger observes semantic content stops; progress is calculated directly from `scrollY` rather than a scrubbed tween.

| Real scroll interval | Renderer progress | State |
|---|---:|---|
| Hero top → `#varieta` top | `0 → .34` | dispersion and attraction |
| `#varieta` top → `#mais-del-re` top | `.34 → .60` | cob pause, then plant |
| `#mais-del-re` top → `#otto-file top 76%` | `.60 → 1` | field, eight lanes and incisions |
| `#otto-file top 76%` → `#otto-file top top` | frozen at `1` | backdrop opacity releases to zero |

At `#otto-file top top` the renderer is invisible and suspended. It does not return in chapters 04–08 or the night field. Reverse scrolling reconstructs the exact same states because both progress and release are pure functions of absolute scroll position.

The internal checkpoints remain `000`, `012`, `024`, `039`, `052`, `068`, `084` and `100`; they now land on real page content rather than an artificial 400svh track.

## Visual treatment

The renderer colours are unchanged and the layer uses `mix-blend-mode: multiply`. Opacity is the sole hierarchy control:

| State | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| dispersion / attraction | `.28` | `.22` | `.18` |
| cob / plant | `.18` | `.14` | `.12` |
| field / register | `.30` | `.26` | `.22` |

Opacity changes are linear and scroll-linked. There is no blur, glow, tint, text shadow or content panel. The stack is field → signature → paper texture → content → header → rail. Column 8 and the rail remain clear.

## Geometry and determinism

- 256 kernel instances: eight rows × 32 computational positions.
- `32` is implementation topology, never content, metadata, ARIA or a botanical claim.
- Fixed PRNG seed: `ottofile-v1`.
- Targets and curved attraction paths are precomputed; there is no runtime randomness or physics engine.
- Field LOD preserves eight lanes: 48 plants desktop, 32 tablet and 24 mobile.
- Exactly three draw calls: incisions/lanes, plant/field and one instanced kernel draw.
- Camera depth scale is `1 / .86 / .72`; DPR is capped at `1.5 / 1.25 / 1`.
- Framebuffer ceiling is 4.2 megapixels and 4096 px per dimension.

## Pointer and lifecycle

Fine pointers receive a camera orbit capped at ±0.35° yaw and ±0.20° pitch. Pointer movement is hard-gated during the cob hold and flattening, never changes scroll progress and cannot intercept page interaction.

The master scroll range and `document.visibilityState` gate rendering. Outside Hero → `#otto-file`, pointer RAF is cancelled and the renderer sleeps. WebGL buffers, programs and VAOs are released on teardown. Context loss switches to the static section backgrounds without changing `scrollHeight` or `scrollY`; only one restore is attempted.

## Reduced motion, Save-Data, no-JS and failures

The three approved transparent AVIF exports are reused in four decorative placements:

- `dispersion.avif`: absolute Hero background;
- `plant.avif`: absolute chapter-01 background;
- `incisions.avif`: absolute chapter-02 background;
- `incisions.avif`: short masked release at the entrance of chapter 03.

All are `aria-hidden`, have empty alt text, no captions and no intrinsic layout height. The chapter-03 release ends before the internal eight-cell proof, preventing visual duplication. Reduced motion and Save-Data do not initialise WebGL or the signature ScrollTrigger. No-JS sees the same backgrounds from server HTML.

## Approval record

- Art Director: FINAL GO; the layer reads as background and text remains dominant at every checkpoint.
- Motion Designer: FINAL GO; piecewise mapping, freeze/release and reverse are deterministic.
- Brand & Content: no copy, claim or semantic hierarchy changed; the layer is explicitly decorative.
- Creative Frontend Lead: GO runtime; fixed stacking, fallback lifecycle, deep-link stability and zero artificial page height verified.

Evidence:

- WebGL: `docs/captures/signature-landing/`;
- reduced-motion and no-JS: `docs/captures/signature-static/`;
- deterministic snapshots: `docs/captures/signature-landing/snapshots.json`.
