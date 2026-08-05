#!/usr/bin/env node
// Art Director — ch08 tree value test: --carta vs --esperide, 192px, cols 6/8 row 1.

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
const out = path.join("docs", "captures", "ad-ch08-tree");
await mkdir(out, { recursive: true });

const INJECT = (size, colour) => `
  const MASK = ${JSON.stringify(MASK)};
  const b = document.querySelector('.chapter--custody__body');
  document.querySelectorAll('[data-ad-mark]').forEach(n => n.remove());
  if (b) {
    const m = document.createElement('span');
    m.setAttribute('data-ad-mark','');
    m.style.cssText = [
      'grid-column: 6 / 8','grid-row: 1','justify-self: end','align-self: start',
      'width: ${size}px','height: ${size}px','display: block',
      'background-color: ${colour}',
      "-webkit-mask-image: url(" + MASK + ")","mask-image: url(" + MASK + ")",
      '-webkit-mask-size: contain','mask-size: contain',
      '-webkit-mask-repeat: no-repeat','mask-repeat: no-repeat',
    ].join(';');
    b.insertBefore(m, b.firstChild);
  }
`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// drive the night inversion, then land on the custody body
await page.evaluate(() => {
  const el = document.querySelector(".chapter--custody__body");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
});
await page.waitForTimeout(1600);

for (const [tag, colour] of [
  ["clean", null],
  ["carta", "var(--testo)"],
  ["esperide", "var(--esperide)"],
  ["pietra", "var(--pietra)"],
  ["carta-144", "var(--testo)"],
]) {
  if (colour) await page.evaluate(INJECT(tag === "carta-144" ? 144 : 192, colour));
  else await page.evaluate(`document.querySelectorAll('[data-ad-mark]').forEach(n=>n.remove())`);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(out, `ch08-${tag}.png`) });
}

await browser.close();
console.log(`Captured ch08 tree value set in ${out}`);
