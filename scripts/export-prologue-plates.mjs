#!/usr/bin/env node

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const getFlag = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const url = getFlag("url", "http://localhost:3000");
const outputDirectory = path.join("public", "images", "generated", "prologue");
const temporaryDirectory = path.join("docs", "captures", "prologue-plates");
const plates = [
  { name: "dispersion", progress: 0.06 },
  { name: "plant", progress: 0.56 },
  { name: "incisions", progress: 1 },
];

await mkdir(outputDirectory, { recursive: true });
await mkdir(temporaryDirectory, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const page = await context.newPage();

async function removePaperField(sourcePath, transparentPath, avifPath) {
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const paper = [233, 227, 214];

  for (let offset = 0; offset < data.length; offset += 4) {
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const distance = Math.hypot(red - paper[0], green - paper[1], blue - paper[2]);
    const alpha = Math.min(1, Math.max(0, (distance - 0.75) / 16));

    if (alpha <= 0) {
      data[offset + 3] = 0;
      continue;
    }

    data[offset] = Math.max(0, Math.min(255, Math.round((red - paper[0] * (1 - alpha)) / alpha)));
    data[offset + 1] = Math.max(
      0,
      Math.min(255, Math.round((green - paper[1] * (1 - alpha)) / alpha)),
    );
    data[offset + 2] = Math.max(
      0,
      Math.min(255, Math.round((blue - paper[2] * (1 - alpha)) / alpha)),
    );
    data[offset + 3] = Math.round(alpha * 255);
  }

  const transparent = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
  await transparent.clone().png().toFile(transparentPath);
  await transparent.clone().avif({ quality: 64, effort: 6 }).toFile(avifPath);
}

for (const plate of plates) {
  await page.goto(`${url}/prologue-preview?progress=${plate.progress}`, {
    waitUntil: "networkidle",
  });
  await page.locator("[data-kernel-prologue][data-enhanced='true']").waitFor();
  await page.addStyleTag({
    content: `
      html, body { background: transparent !important; }
      body::before { display: none !important; }
      nextjs-portal { display: none !important; }
    `,
  });
  await page.evaluate(
    (progress) => window.__OTTO_SIGNATURE__?.setProgress(progress),
    plate.progress,
  );
  await page.waitForTimeout(80);

  const pngPath = path.join(temporaryDirectory, `${plate.name}.png`);
  const transparentPath = path.join(temporaryDirectory, `${plate.name}-alpha.png`);
  const avifPath = path.join(outputDirectory, `${plate.name}.avif`);
  await page.locator(".prologue__viewport").screenshot({
    path: pngPath,
    omitBackground: true,
  });
  await removePaperField(pngPath, transparentPath, avifPath);
  const metadata = await sharp(avifPath).metadata();
  console.log(`✓ ${plate.name.padEnd(12)} ${metadata.width}×${metadata.height} → ${avifPath}`);
}

await context.close();
await browser.close();
