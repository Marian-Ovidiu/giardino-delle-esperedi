#!/usr/bin/env node
// Art Director — header mark vs prologue collision test.
// Injects the proposed 40px --pietra tree roundel into the header at the
// proposed grid position and captures the first viewport at prologue
// checkpoints 000 and 012, with and without the mark, at 1x and 2x DPR.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// The roundel mask, built from source so this script is self-contained and the
// ruling's evidence is reproducible. Crop per docs/brand-signature.md §1.5.
const roundel = await sharp("assets/brand/logo/Logo_nero.png")
  .extract({ left: 26, top: 22, width: 697, height: 708 })
  .resize(320, 320, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const MASK = `data:image/png;base64,${roundel.toString("base64")}`;

const url = "http://localhost:3000";
const out = path.join("docs", "captures", "ad-mark-collision");
await mkdir(out, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900, size: 40, dpr: [1, 2] },
  { name: "tablet", width: 768, height: 900, size: 32, dpr: [1] },
];

const INJECT = (size) => `
  const MASK = ${JSON.stringify(MASK)};
  const h = document.querySelector('.site-header');
  if (h && !h.querySelector('[data-ad-mark]')) {
    const m = document.createElement('span');
    m.setAttribute('data-ad-mark','');
    m.setAttribute('aria-hidden','true');
    m.style.cssText = [
      'grid-column: 1 / 2',
      'justify-self: end',
      'align-self: start',
      'width: ${size}px',
      'height: ${size}px',
      'display: block',
      'background-color: var(--pietra)',
      "-webkit-mask-image: url(" + MASK + ")",
      "mask-image: url(" + MASK + ")",
      '-webkit-mask-size: contain',
      'mask-size: contain',
      '-webkit-mask-repeat: no-repeat',
      'mask-repeat: no-repeat',
    ].join(';');
    h.insertBefore(m, h.firstChild);
  }
`;

async function scrollTo(page, progress) {
  await page.evaluate((p) => {
    const story = document.querySelector("[data-prologue-story]");
    const variety = document.querySelector("#varieta");
    const top = (el) => el.getBoundingClientRect().top + window.scrollY;
    const heroTop = top(story);
    const varietyTop = top(variety);
    window.scrollTo(0, heroTop + (varietyTop - heroTop) * (p / 0.34));
  }, progress);
  await page.waitForTimeout(500);
}

const browser = await chromium.launch();

for (const vp of viewports) {
  for (const dpr of vp.dpr) {
    for (const withMark of [false, true]) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: dpr,
        reducedMotion: "no-preference",
      });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "networkidle" });
      await page.locator("[data-kernel-prologue]").waitFor({ state: "attached" });
      await page.waitForTimeout(600);

      for (const progress of [0, 0.12]) {
        await scrollTo(page, progress);
        if (withMark) await page.evaluate(INJECT(vp.size));
        await page.waitForTimeout(200);
        const cp = String(Math.round(progress * 100)).padStart(3, "0");
        const tag = withMark ? "mark" : "clean";
        await page.screenshot({
          path: path.join(out, `${vp.name}-${dpr}x-${cp}-${tag}.png`),
        });
        // tight crop of the first-viewport top band, where both clouds live
        await page.screenshot({
          path: path.join(out, `${vp.name}-${dpr}x-${cp}-${tag}-band.png`),
          clip: { x: 0, y: 0, width: Math.min(vp.width, 900), height: 420 },
        });
      }
      await ctx.close();
    }
  }
}

await browser.close();
console.log(`Captured collision set in ${out}`);
