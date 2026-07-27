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
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.join("assets", "masters", "piastre");
const OUT = path.join("public", "images", "generated", "piastre");

/** 8:5, matching the declared intrinsic size in src/content/media.ts. */
const WIDTH = 1600;
const HEIGHT = 1000;

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

const jobs = (await readdir(SRC)).filter((f) => f.endsWith(".json"));
if (jobs.length === 0) {
  console.error(`No job files in ${SRC}. Run scripts/generate-piastre.zsh first.`);
  process.exit(1);
}

let built = 0;
const failed = [];

for (const job of jobs) {
  const name = path.parse(job).name;
  const jobPath = path.join(SRC, job);

  let payload;
  try {
    payload = JSON.parse(await readFile(jobPath, "utf8"));
  } catch {
    failed.push(`${name}: job file is empty or not valid JSON`);
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
  const master = Buffer.from(await response.arrayBuffer());

  // Keep the master for the audit trail before any transformation.
  await writeFile(path.join(SRC, `${name}.png`), master);

  const info = await sharp(master)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .avif({ quality: 62, effort: 6 })
    .toFile(path.join(OUT, `${name}.avif`));

  console.log(
    `✓ ${name.padEnd(18)} ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`,
  );
  built += 1;
}

if (failed.length > 0) {
  console.log("\nNot built:");
  for (const line of failed) console.log(`  ✗ ${line}`);
}

console.log(`\n${built} plate(s) written to ${OUT}. Registered in src/content/media.ts.`);
if (built === 0) process.exit(1);
