#!/usr/bin/env node
/**
 * Crop, grade and encode the CLIENT'S OWN photographs and identity marks.
 *
 * Sibling of scripts/build-piastre.mjs, which does the same job for the
 * generated provisional plates. The two differ in one respect only: this one
 * reads real photographs out of assets/brand/ instead of generated masters,
 * and writes to public/images/foto/ instead of .../generated/piastre/ — the
 * path itself records that these are not generated images.
 *
 * ── Why the grade is not optional ────────────────────────────────────────
 * The sources are phone snapshots taken at fairs, extracted from the client's
 * brochure and presentation letter: mixed light, mixed white balance, on-camera
 * flash. art-direction §9.5 exists precisely for this — "applied identically to
 * every asset, so mixed provenance becomes invisible". Every derivative here
 * goes through the same five steps as every other asset on the site:
 *
 *   1. black point lifted to RGB 15, white ceiling RGB 240, never clipped
 *   2. linear contrast — no S-curve, no LUT
 *   3. global saturation 35%, with the 0–25° kernel red-orange held at 100%
 *   4. monochrome grain, 8%, ~1.4px at 2560px width
 *   5. AVIF at the ratio the frame displays (§8.4 — no CSS re-cropping)
 *
 * ── Declared limit: resolution ───────────────────────────────────────────
 * The originals were not supplied. These pixels come out of two PDFs, where
 * they had already been downsampled — the largest is 908px on its long edge.
 * Derivatives are therefore upscaled (lanczos3) to the size media.ts declares,
 * so the reserved box is identical to the plate they replace. The upscale is
 * recorded in each `source` line in media.ts and in docs/brand-alignment.md.
 * It is the one thing here that a set of original files would fix outright.
 *
 * Usage: node scripts/build-brand.mjs [--only <name>]
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BRAND = path.join("assets", "brand");
const FOTO = path.join(BRAND, "foto");
const OUT_FOTO = path.join("public", "images", "foto");
const OUT_APP = path.join("src", "app");

/* ── §9.5 grade ─────────────────────────────────────────────────────────── */

/** Black point 6% IRE and white ceiling 94%. A scan has no true black. */
const BLACK = 15;
const WHITE = 240;

/**
 * Global saturation, and the hue window that escapes it.
 *
 * "The kernel is the only saturated thing on the site" (§9.5.4). Everything
 * outside 0–25° — tablecloths, kraft card, packaging blues, wood — collapses to
 * 35%, which is what makes a fair snapshot sit next to a studio plate.
 */
const SATURATION = 0.35;
const HUE_FULL = 25; // ° — held at 100%
const HUE_FALLOFF = 45; // ° — linear ramp back to SATURATION

function hueOf(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

/** 1 inside the kernel window, ramping to 0 outside it. Wraps past 360°. */
function kernelWeight(hue) {
  const h = hue > 340 ? hue - 360 : hue; // −20…340, so red wraps continuously
  if (h >= 0 && h <= HUE_FULL) return 1;
  if (h > HUE_FULL && h < HUE_FALLOFF) return 1 - (h - HUE_FULL) / (HUE_FALLOFF - HUE_FULL);
  if (h < 0) return Math.max(0, 1 + h / 20);
  return 0;
}

/**
 * Desaturate everything except the kernel hue, in place, on raw RGB.
 *
 * sharp's `modulate({ saturation })` is global and would flatten the kernel
 * with everything else, so the hue mask is done by hand. Also returns the
 * fraction of pixels that stay saturated — the number art-direction §4.4 needs
 * to decide whether a plate may share a viewport with a `--chicco` UI mark.
 */
function gradePixels(data, channels) {
  let saturated = 0;
  const total = data.length / channels;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const weight = kernelWeight(hueOf(r, g, b));
    const s = SATURATION + (1 - SATURATION) * weight;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    // Chroma of the graded pixel, as a fraction — what §4.4 actually counts.
    if (weight > 0.5 && max > 60 && (max - min) / (max || 1) > 0.35) saturated += 1;
    data[i] = Math.round(luma + (r - luma) * s);
    data[i + 1] = Math.round(luma + (g - luma) * s);
    data[i + 2] = Math.round(luma + (b - luma) * s);
  }
  return saturated / total;
}

/** Monochrome grain plate, 8% opacity, ~1.4px at 2560px width. */
async function grain(width, height) {
  const cell = Math.max(1, Math.round((1.4 * width) / 2560));
  const w = Math.ceil(width / cell);
  const h = Math.ceil(height / cell);
  const noise = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i += 1) {
    const v = 128 + Math.round((Math.random() - 0.5) * 255);
    noise[i * 4] = v;
    noise[i * 4 + 1] = v;
    noise[i * 4 + 2] = v;
    noise[i * 4 + 3] = Math.round(255 * 0.08);
  }
  return sharp(noise, { raw: { width: w, height: h, channels: 4 } })
    .resize(width, height, { kernel: "nearest" })
    .png()
    .toBuffer();
}

/**
 * crop → resize to the declared box → grade → grain → AVIF.
 *
 * `crop` is in SOURCE pixels and is chosen by hand for each plate: art
 * direction §9.6 forbids text, packaging, props, hands and plated food inside
 * a citable plate, so the crop is where that rule is enforced.
 */
async function plate({ src, crop, width, height, out, quality = 62 }) {
  const base = sharp(path.join(FOTO, src));
  if (crop) base.extract(crop);

  const resized = await base
    .resize(width, height, { fit: "cover", position: "centre", kernel: "lanczos3" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const chroma = gradePixels(resized.data, resized.info.channels);

  const graded = sharp(resized.data, {
    raw: { width: resized.info.width, height: resized.info.height, channels: 3 },
  }).linear((WHITE - BLACK) / 255, BLACK);

  const file = path.join(OUT_FOTO, out);
  const info = await sharp(await graded.png().toBuffer())
    .composite([{ input: await grain(width, height), blend: "overlay" }])
    .avif({ quality, effort: 6 })
    .toFile(file);

  return { file, info, chroma };
}

/* ── The plates ─────────────────────────────────────────────────────────── */

/**
 * Two slots, and only two.
 *
 * `pannocchie-cover` — ch01's ground. A CAMPITURA renders at ≤0.08 opacity in
 * `multiply`, so the kernel chroma that survives the hue mask is crushed to
 * nothing and art-direction §4.4's `--chicco` budget is not engaged. This is
 * the only pattern on the site where a full frame of red maize is legal
 * without an Art Director decision.
 *
 * `referenze-confezioni` — ch07's LASTRA. Pre-authorised: art-review §0-bis C
 * declared this slot provisional pending "la fotografia collettiva definitiva
 * delle confezioni", to be swapped in place with no layout change. The crop
 * sits high in the frame so the kernel bed at the bottom of the source stays
 * mostly out — see the measured chroma fraction printed by this script and
 * recorded in docs/brand-alignment.md §4.
 *
 * Nothing else is placed. Every other real photograph available is a
 * saturated red-maize frame or a labelled pack, and both need an Art Director
 * decision that this sprint has no mandate to take. The reasoning, per slot,
 * is in docs/brand-alignment.md §4.
 */
const PLATES = {
  "pannocchie-cover": {
    src: "lett-img1.jpg",
    // The full frame is cobs, edge to edge: no sky, no horizon, no building,
    // no person, no text. §9.6 clean by construction.
    crop: null,
    width: 2000,
    height: 1250,
    out: "pannocchie-cover.avif",
  },
  "referenze-confezioni": {
    src: "broc-img4.jpg",
    // 908×908 source. Taking y 40…608 keeps the packs and the gallette and
    // leaves most of the loose-kernel bed below the frame.
    crop: { left: 0, top: 150, width: 908, height: 568 },
    width: 1600,
    height: 1000,
    out: "referenze-confezioni.avif",
  },
};

/* ── Identity marks ─────────────────────────────────────────────────────── */

/**
 * The seal and the illustration, at the only two placements that are identity
 * rather than decoration — and neither of which touches the layout.
 *
 * The seal becomes the site's icon: the mark on the jar becomes the mark in
 * the browser tab. The illustration becomes the share card, on `--carta`, off
 * the eighth-line so nothing is centred (§8.2). They appear once each. The
 * brochure scatters both across every page; the site does not.
 */
const SEAL = {
  // Page 1 of the brochure at 400dpi. Measured against the ring, not guessed.
  page: 1,
  crop: { left: 918, top: 524, width: 1525, height: 1525 },
};

const CARTA = { r: 233, g: 227, b: 214 };

/** Circular alpha mask, so the seal is a seal and not a square with a seal in it. */
function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#fff"/></svg>`,
  );
}

async function buildSeal(sealPng) {
  const size = 512;
  const round = await sharp(sealPng)
    .resize(size, size, { fit: "cover", kernel: "lanczos3" })
    .composite([{ input: circleMask(size), blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(round).toFile(path.join(OUT_APP, "icon.png"));

  // Apple flattens transparency to white; the field colour is the correct
  // ground for this mark, and white is not one of the seven values.
  await sharp({
    create: { width: 180, height: 180, channels: 3, background: CARTA },
  })
    .composite([{ input: await sharp(round).resize(180, 180).toBuffer() }])
    .png()
    .toFile(path.join(OUT_APP, "apple-icon.png"));

  return round;
}

/**
 * The share card: the client's own drawing of the Ottofile, on `--carta`.
 *
 * No text — the card carries the mark, the page metadata carries the words.
 * The JPEG ships on a white ground; white is not one of the seven values, so
 * it is keyed out to alpha before the drawing is placed on the field colour.
 */
async function buildOpenGraph() {
  const src = sharp(path.join(BRAND, "pannocchia-illustrazione.jpeg"));
  const { data, info } = await src.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    // Near-white to transparent, with a short ramp so the drawn outline keeps
    // its edge instead of acquiring a hard white fringe.
    data[i + 3] = min > 246 ? 0 : min > 232 ? Math.round(255 * (1 - (min - 232) / 14)) : 255;
  }

  // Resized tall, then cut at the card's bottom edge: the drawing runs off the
  // frame rather than sitting inside it, the same gesture as the hero title.
  const TOP = 120;
  const tall = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .resize({ height: 760, kernel: "lanczos3" })
    .png()
    .toBuffer();
  const tallMeta = await sharp(tall).metadata();
  const cob = await sharp(tall)
    .extract({ left: 0, top: 0, width: tallMeta.width, height: 630 - TOP })
    .png()
    .toBuffer();

  const cobMeta = await sharp(cob).metadata();
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: CARTA },
  })
    .composite([
      {
        input: cob,
        // Centroid on the 5/8 line, and the drawing runs off the bottom edge:
        // nothing on this site is centred, including inside a picture (§8.2).
        left: Math.round(1200 * 0.625 - cobMeta.width / 2),
        top: TOP,
      },
    ])
    .png()
    .toFile(path.join(OUT_APP, "opengraph-image.png"));
}

/* ── Run ────────────────────────────────────────────────────────────────── */

await mkdir(OUT_FOTO, { recursive: true });

const only = process.argv.includes("--only")
  ? process.argv[process.argv.indexOf("--only") + 1]
  : null;

for (const [name, spec] of Object.entries(PLATES)) {
  if (only && only !== name) continue;
  const { file, info, chroma } = await plate(spec);
  console.log(
    `✓ ${name.padEnd(24)} ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB  ` +
      `kernel chroma ${(chroma * 100).toFixed(1)}% of frame  → ${file}`,
  );
}

if (!only || only === "identita") {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const run = promisify(execFile);
  const tmp = path.join("assets", "brand", ".seal");
  await run("pdftoppm", [
    "-r",
    "400",
    "-f",
    String(SEAL.page),
    "-l",
    String(SEAL.page),
    "-png",
    path.join(BRAND, "MAIS ROSSO brochure con prezzi.pdf"),
    tmp,
  ]);
  const page = await sharp(`${tmp}-${SEAL.page}.png`).extract(SEAL.crop).png().toBuffer();
  await buildSeal(page);
  await buildOpenGraph();
  console.log(`✓ ${"identità".padEnd(24)} icon.png · apple-icon.png · opengraph-image.png`);
}
