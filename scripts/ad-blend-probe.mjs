/**
 * AD probe — piastra blend ruling.
 *
 * Answers four questions with measurement, not inference:
 *  1. Is `mix-blend-mode: multiply` on `.piastra__img` inert as shipped?
 *  2. Does `.piastra__frame { background: var(--carta) }` engage it?
 *  3. What do the REAL assets render as under each candidate regime?
 *  4. What does each regime do to ch07's saturated-pixel coverage?
 *
 * Every sample is taken from a single screenshot so capture bias cancels.
 * Run: node scripts/ad-blend-probe.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";

const URL = process.env.PROBE_URL ?? "http://localhost:3000";
const hex = (a) => "#" + a.map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("");

const REGIMES = {
  "A · as shipped": "",
  "B · frame=carta (multiply engages)": `.piastra__frame{background:var(--carta)}`,
  "C · multiply deleted, filter kept": `.piastra__img{mix-blend-mode:normal!important}`,
  "D · multiply and filter both deleted": `.piastra__img{mix-blend-mode:normal!important;filter:none!important}`,
};

/** Sample a screenshot buffer at a CSS-pixel point, averaging a 5x5 box. */
async function sampleAt(png, dpr, x, y) {
  const px = Math.round(x * dpr);
  const py = Math.round(y * dpr);
  const b = await sharp(png)
    .extract({ left: px - 2, top: py - 2, width: 5, height: 5 })
    .removeAlpha()
    .raw()
    .toBuffer();
  let r = 0,
    g = 0,
    bl = 0;
  for (let i = 0; i < b.length; i += 3) {
    r += b[i];
    g += b[i + 1];
    bl += b[i + 2];
  }
  const n = b.length / 3;
  return [Math.round(r / n), Math.round(g / n), Math.round(bl / n)];
}

/** Fraction of pixels inside a rect that read as saturated, by §4.4's own test. */
async function chromaOfRect(png, dpr, rect) {
  const { data, info } = await sharp(png)
    .extract({
      left: Math.round(rect.x * dpr),
      top: Math.round(rect.y * dpr),
      width: Math.round(rect.width * dpr),
      height: Math.round(rect.height * dpr),
    })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let sat = 0;
  const n = data.length / info.channels;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    if (max > 60 && (max - min) / (max || 1) > 0.35) sat += 1;
  }
  return { fraction: sat / n, px: n };
}

const FLATS = ["#FFFFFF", "#E9E3D6", "#E9E1D0", "#D9CDB2", "#161813"];
const flatURI = (h) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="${h}"/></svg>`,
  );

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await page.goto(URL, { waitUntil: "networkidle" });
await page.emulateMedia({ reducedMotion: "reduce" });

const TARGETS = [
  { name: "ch02 .chapter--royal__lastra", sel: ".chapter--royal__lastra" },
  { name: "ch07 .chapter--products__lastra", sel: ".chapter--products__lastra" },
];

for (const t of TARGETS) {
  const handle = await page.$(t.sel);
  if (!handle) {
    console.log(`\n${t.name}: NOT PRESENT`);
    continue;
  }
  await handle.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  const box = await handle.boundingBox();
  const dpr = await page.evaluate(() => window.devicePixelRatio);
  // A point well inside the plate, and paper 40px to its left.
  const inX = box.x + Math.min(box.width * 0.35, 220);
  const inY = box.y + box.height * 0.5;
  const paperX = box.x - 40;

  console.log(
    `\n${"═".repeat(78)}\n${t.name}  @1440  box ${Math.round(box.width)}x${Math.round(box.height)}`,
  );

  const paperStack = await page.evaluate(
    ([x, y]) =>
      document
        .elementsFromPoint(x, y)
        .slice(0, 3)
        .map((e) => e.className || e.tagName),
    [paperX, inY],
  );
  console.log(`paper probe stack: ${JSON.stringify(paperStack)}`);

  for (const [label, css] of Object.entries(REGIMES)) {
    await page.evaluate((c) => {
      document.getElementById("ad-probe")?.remove();
      if (!c) return;
      const s = document.createElement("style");
      s.id = "ad-probe";
      s.textContent = c;
      document.head.append(s);
    }, css);
    await page.waitForTimeout(120);

    // 1. the real asset, untouched
    let png = await page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 1000 } });
    const real = await sampleAt(png, dpr, inX, inY - box.y > 0 ? inY : inY);
    const paper = await sampleAt(png, dpr, paperX, inY);
    const clip = {
      x: Math.max(0, box.x),
      y: Math.max(0, box.y),
      width: Math.min(box.width, 1440 - Math.max(0, box.x)),
      height: Math.min(box.height, 1000 - Math.max(0, box.y)),
    };
    const chroma = await chromaOfRect(png, dpr, clip);

    console.log(`\n  ${label}`);
    console.log(
      `    real asset renders ${hex(real)}   paper ${hex(paper)}   plate-saturated ${(chroma.fraction * 100).toFixed(1)}%`,
    );

    // 2. flat-colour probes
    const rows = [];
    for (const f of FLATS) {
      const restore = await page.evaluate(
        ([sel, uri]) => {
          const img = document.querySelector(sel + " img");
          const old = { src: img.src, srcset: img.srcset, sizes: img.sizes };
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          img.src = uri;
          return old;
        },
        [t.sel, flatURI(f)],
      );
      await page.waitForTimeout(120);
      png = await page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 1000 } });
      const got = await sampleAt(png, dpr, inX, inY);
      const pap = await sampleAt(png, dpr, paperX, inY);
      rows.push(
        `    src ${f} → ${hex(got)}  Δpaper ${got.map((v, i) => (v - pap[i] >= 0 ? "+" : "") + (v - pap[i])).join(",")}`,
      );
      await page.evaluate(
        ([sel, old]) => {
          const img = document.querySelector(sel + " img");
          img.src = old.src;
          if (old.srcset) img.srcset = old.srcset;
          if (old.sizes) img.sizes = old.sizes;
        },
        [t.sel, restore],
      );
      await page.waitForTimeout(80);
    }
    console.log(rows.join("\n"));
  }
  await page.evaluate(() => document.getElementById("ad-probe")?.remove());
}

await browser.close();
