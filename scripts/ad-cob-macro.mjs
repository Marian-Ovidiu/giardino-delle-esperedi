#!/usr/bin/env node
// Macro pass on the cob itself. Crops the cob bounding box and upscales,
// so the question "are the eight rows readable" is answered by looking.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("docs/captures/ad-rifinitura/macro");
const URL = "http://localhost:3000";

const SHOTS = [
  ["p34-nudo", 0.34, true],
  ["p36-nudo", 0.36, true],
  ["p40-nudo", 0.4, true],
  ["p43-nudo", 0.43, true],
  ["p40-shipped", 0.4, false],
  ["p20-nudo", 0.2, true],
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 4, // macro: 4x so kernel-level detail survives
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => !!window.__OTTO_SIGNATURE__, null, { timeout: 20000 });

  for (const [name, p, nudo] of SHOTS) {
    await page.evaluate((prog) => window.__OTTO_SIGNATURE__.setProgress(prog), p);
    await page.evaluate((isNudo) => {
      const section = document.querySelector(".prologue") || document.querySelector("[data-stage]");
      if (!section) return;
      if (isNudo) {
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
    }, nudo);
    await page.waitForTimeout(120);
    // Cob occupies roughly x 560-880, y 100-800 in CSS px at this camera.
    await page.screenshot({
      path: path.join(OUT, `${name}.png`),
      clip: { x: 560, y: 90, width: 330, height: 640 },
    });
  }

  await browser.close();
  console.log("macro written to", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
