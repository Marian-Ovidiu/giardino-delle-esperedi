#!/usr/bin/env node
// Art Director diagnostic pass. Two sets per checkpoint:
//   shipped/  — exactly as the reader sees it (envelope + multiply)
//   nudo/     — opacity 1, no blend mode: the DRAWING, isolated from the veil.
// The point is to separate "there is nothing there" from "it is there and unlit".

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("docs/captures/ad-rifinitura");
const URL = "http://localhost:3000";

const CHECKPOINTS = [
  ["p00", 0.0],
  ["p08", 0.08],
  ["p20", 0.2],
  ["p30", 0.3],
  ["p36", 0.36],
  ["p40", 0.4],
  ["p43", 0.43],
  ["p48", 0.48],
  ["p54", 0.54],
  ["p59", 0.59],
  ["p64", 0.64],
  ["p70", 0.7],
  ["p75", 0.75],
  ["p80", 0.8],
  ["p90", 0.9],
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => !!window.__OTTO_SIGNATURE__, null, { timeout: 20000 });

  const viewport = page.locator(".prologue__viewport");

  for (const mode of ["shipped", "nudo"]) {
    await mkdir(path.join(OUT, mode), { recursive: true });
    for (const [name, p] of CHECKPOINTS) {
      await page.evaluate((prog) => window.__OTTO_SIGNATURE__.setProgress(prog), p);
      // Re-assert the diagnostic override AFTER setProgress, which rewrites the var.
      await page.evaluate((m) => {
        const section =
          document.querySelector(".prologue") || document.querySelector("[data-stage]");
        if (!section) return;
        if (m === "nudo") {
          section.style.setProperty("--prologue-opacity", "1");
          section.style.mixBlendMode = "normal";
          section.style.filter = "none";
          const c = section.querySelector("canvas");
          if (c) {
            c.style.mixBlendMode = "normal";
            c.style.opacity = "1";
            c.style.filter = "none";
          }
        }
      }, mode);
      await page.waitForTimeout(120);
      await viewport.screenshot({ path: path.join(OUT, mode, `${name}.png`) });
    }
  }

  const snap = await page.evaluate(() => window.__OTTO_SIGNATURE__.snapshot());
  console.log(JSON.stringify(snap, null, 2));
  await browser.close();
  console.log("written to", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
