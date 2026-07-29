/**
 * AD probe — does changing the plate treatment move the campitura AA floor?
 *
 * The campitura opacities (0.055 / 0.06, 0.075 / 0.08 mobile) were tuned by
 * measurement against --pietra-testo at the 4.5:1 AA floor. Any ruling that
 * touches `.piastra__img` touches them too.
 *
 * Method: find every element whose computed colour IS --pietra-testo, hide all
 * text so only the ground remains, screenshot, then sample the ground under
 * each of those boxes. Sampling a raw screenshot instead would land on the
 * lastre and report a photograph as a contrast failure.
 *
 * Run: node scripts/ad-campitura-probe.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";

const URL = process.env.PROBE_URL ?? "http://localhost:3000";
const TEXT = [0x62, 0x5d, 0x4d]; // --pietra-testo #625D4D

const lin = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const hex = (a) => "#" + a.map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("");

const REGIMES = {
  "A · as shipped": "",
  "B · frame=carta": `.piastra__frame{background:var(--carta)}`,
  "D · multiply+filter deleted": `.piastra__img{mix-blend-mode:normal!important;filter:none!important}`,
};

const HIDE_TEXT = `*{color:transparent!important;text-decoration-color:transparent!important}
  .piastra__caption,.piastra__nota{visibility:hidden!important}`;

async function meanOf(png, x, y, w, h) {
  const b = await sharp(png)
    .extract({ left: x, top: y, width: w, height: h })
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

for (const width of [1440, 390]) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 1400 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(URL, { waitUntil: "networkidle" });
  console.log(`\n${"═".repeat(72)}\n@${width}  —  --pietra-testo #625D4D on the campitura ground`);

  for (const sel of [".scheda", ".chapter--stone"]) {
    const host = await page.$(`${sel}:has(.piastra--campitura)`);
    if (!host) {
      console.log(`  ${sel}: no campitura`);
      continue;
    }
    await host.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Boxes of real secondary text currently on screen, in viewport coords.
    const boxes = await page.evaluate(
      ([s, vh]) => {
        const host = document.querySelector(`${s}:has(.piastra--campitura)`);
        return [...host.querySelectorAll("*")]
          .filter((e) => {
            if (!e.textContent?.trim()) return false;
            if (e.closest(".piastra")) return false;
            if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
              return false;
            return getComputedStyle(e).color === "rgb(98, 93, 77)";
          })
          .map((e) => e.getBoundingClientRect())
          .filter((r) => r.width > 24 && r.height > 8 && r.top > 0 && r.bottom < vh)
          .map((r) => ({
            x: Math.round(r.x),
            y: Math.round(r.y),
            w: Math.round(r.width),
            h: Math.round(r.height),
          }));
      },
      [sel, 1400],
    );

    if (!boxes.length) {
      console.log(`  ${sel}: no --pietra-testo on screen`);
      continue;
    }

    for (const [label, css] of Object.entries(REGIMES)) {
      await page.evaluate(
        ([c, hide]) => {
          document.getElementById("ad-probe")?.remove();
          const s = document.createElement("style");
          s.id = "ad-probe";
          s.textContent = c + hide;
          document.head.append(s);
        },
        [css, HIDE_TEXT],
      );
      await page.waitForTimeout(150);

      const png = await page.screenshot({ clip: { x: 0, y: 0, width, height: 1400 } });
      let worst = null;
      for (const b of boxes) {
        const c = await meanOf(
          png,
          Math.max(0, b.x),
          Math.max(0, b.y),
          Math.min(b.w, width - b.x),
          b.h,
        );
        if (!worst || L(c) < L(worst)) worst = c;
      }
      const r = ratio(TEXT, worst);
      console.log(
        `  ${sel.padEnd(16)} ${label.padEnd(30)} ${boxes.length} runs  worst ground ${hex(worst)}  ${r.toFixed(2)}:1  ${r >= 4.5 ? "PASS" : "FAIL"}`,
      );
    }
    await page.evaluate(() => document.getElementById("ad-probe")?.remove());
  }
  await browser.close();
}
