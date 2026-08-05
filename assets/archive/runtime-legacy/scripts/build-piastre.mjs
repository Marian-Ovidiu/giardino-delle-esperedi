#!/usr/bin/env node
/**
 * Fetch, crop and encode the approved plate masters for the web.
 *
 * Reads the job JSON written by scripts/generate-piastre.zsh, downloads the
 * result, centre-crops the 3:2 master to the art direction's 8:5 (the model
 * offers no 8:5 ratio) and writes AVIF at exactly the size media.ts declares —
 * so the rendered box is identical for a provisional plate and the definitive
 * photograph that replaces it.
 *
 * Masters and job JSON stay in assets/masters/ (gitignored). Only encoded
 * derivatives enter public/.
 *
 * Usage: node scripts/build-piastre.mjs
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.join("assets", "masters", "piastre");
const OUT = path.join("public", "images", "generated", "piastre");

/**
 * Every derivative is written at the ratio it will be DISPLAYED at.
 *
 * art-direction §8.4: "Frames are never cropped further in CSS to a new ratio.
 * `object-fit: cover` with a non-native aspect box is a defect." So a square
 * plate is a real 1:1 file cut from the master, never an 8:5 file squeezed
 * into a square box.
 *
 * `--derivati <name>` limits the run to one plate; without it everything is
 * rebuilt.
 */
const RATIOS = {
  /** 8:5 — the default landscape plate (LASTRA and objects). */
  lastra: { w: 1600, h: 1000, suffix: "" },
  /** 1:1 — detail plates (REPERTO). Desktop and tablet only (§8.5). */
  reperto: { w: 1200, h: 1200, suffix: "-1x1" },
  /** Wide cover for full-section grounds (CAMPITURA). */
  campitura: { w: 2000, h: 1250, suffix: "-cover" },
};

/**
 * Which derivatives each master needs. Adding a ratio here is the only step
 * required to produce it — the paths are then registered in media.ts.
 */
const PLAN = {
  "re-materia": ["lastra"],
  "atmosfera-luce": ["lastra", "reperto"],
  "campo-terra": ["lastra", "campitura"],
  "campo-coltura": ["lastra"],
  "pietra-macina": ["lastra", "campitura"],
  "pietra-farina": ["lastra"],
  "referenze-collettiva": ["lastra"],
};

/** Pull the first image URL out of an arbitrarily shaped job payload. */
function findImageUrl(node) {
  if (typeof node === "string") {
    return /^https?:\/\/\S+\.(png|jpe?g|webp|avif)(\?|$)/i.test(node) ? node : null;
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findImageUrl(item);
      if (found) return found;
    }
    return null;
  }
  if (node && typeof node === "object") {
    // Prefer explicit result fields before falling back to a blind walk.
    for (const key of ["url", "raw_url", "output_url", "result_url"]) {
      if (typeof node[key] === "string") {
        const found = findImageUrl(node[key]);
        if (found) return found;
      }
    }
    for (const value of Object.values(node)) {
      const found = findImageUrl(value);
      if (found) return found;
    }
  }
  return null;
}

await mkdir(SRC, { recursive: true });
await mkdir(OUT, { recursive: true });

const only = process.argv.includes("--derivati")
  ? process.argv[process.argv.indexOf("--derivati") + 1]
  : null;

const names = Object.keys(PLAN).filter((n) => !only || n === only);
if (names.length === 0) {
  console.error(`Nothing to build. Known plates: ${Object.keys(PLAN).join(", ")}`);
  process.exit(1);
}

let built = 0;
const failed = [];

for (const name of names) {
  // Prefer a master already on disk; fall back to the job payload's URL.
  let master;
  const masterPath = path.join(SRC, `${name}.png`);
  try {
    master = await readFile(masterPath);
  } catch {
    let payload;
    try {
      payload = JSON.parse(await readFile(path.join(SRC, `${name}.json`), "utf8"));
    } catch {
      failed.push(`${name}: no master on disk and no readable job payload`);
      continue;
    }

    const url = findImageUrl(payload);
    if (!url) {
      failed.push(`${name}: no image URL in job payload`);
      continue;
    }

    const response = await fetch(url);
    if (!response.ok) {
      failed.push(`${name}: download failed (${response.status})`);
      continue;
    }
    master = Buffer.from(await response.arrayBuffer());
    // Keep the master for the audit trail before any transformation.
    await writeFile(masterPath, master);
  }

  for (const ratio of PLAN[name]) {
    const { w, h, suffix } = RATIOS[ratio];
    const file = path.join(OUT, `${name}${suffix}.avif`);
    const info = await sharp(master)
      .resize(w, h, { fit: "cover", position: "centre" })
      .avif({ quality: 62, effort: 6 })
      .toFile(file);

    console.log(
      `✓ ${`${name}${suffix}`.padEnd(26)} ${ratio.padEnd(10)} ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`,
    );
    built += 1;
  }
}

if (failed.length > 0) {
  console.log("\nNot built:");
  for (const line of failed) console.log(`  ✗ ${line}`);
}

console.log(`\n${built} plate(s) written to ${OUT}. Registered in src/content/media.ts.`);
if (built === 0) process.exit(1);
