#!/usr/bin/env node
/**
 * Visual QA capture.
 *
 * Screenshots the running site at the three reference viewports defined in the
 * art-direction brief and writes them to docs/captures/.
 *
 * Usage:
 *   npm run dev            # in one shell
 *   npm run shots          # in another
 *   npm run shots -- --url http://localhost:3000 --full
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const getFlag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const url = getFlag("url", "http://localhost:3000");
const outDir = getFlag("out", path.join("docs", "captures"));
const fullPage = args.includes("--full");
const motion = args.includes("--motion");
const label = getFlag("label", "");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    // Capture the composed, motion-complete state rather than mid-animation.
    reducedMotion: motion ? "no-preference" : "reduce",
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "networkidle" });
  // Let fonts settle and any entrance state resolve.
  await page.waitForTimeout(1200);

  if (motion) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += Math.round(vp.height * 0.6)) {
      await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(320);
  }

  const suffix = label ? `-${label}` : "";
  const file = path.join(outDir, `${vp.name}${suffix}.png`);
  await page.screenshot({ path: file, fullPage });
  console.log(`✓ ${vp.name.padEnd(8)} ${vp.width}×${vp.height}  →  ${file}`);

  // Horizontal-overflow guard: the single most common responsive failure.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 0) {
    console.warn(`  ⚠ horizontal overflow at ${vp.name}: ${overflow}px`);
  }

  await context.close();
}

await browser.close();
console.log("\nDone.");
