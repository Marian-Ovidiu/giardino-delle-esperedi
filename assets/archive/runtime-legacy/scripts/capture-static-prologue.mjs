#!/usr/bin/env node

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const getFlag = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const url = getFlag("url", "http://localhost:3000");
const output = getFlag("out", path.join("docs", "captures", "signature-static"));
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const stops = [
  { name: "hero", selector: ".hero" },
  { name: "varieta", selector: "#varieta" },
  { name: "mais-del-re", selector: "#mais-del-re" },
  { name: "otto-file", selector: "#otto-file" },
];

await mkdir(output, { recursive: true });
const browser = await chromium.launch();

for (const viewport of viewports) {
  for (const mode of ["reduced", "no-js"]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
      javaScriptEnabled: mode !== "no-js",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: mode === "no-js" ? "load" : "networkidle" });

    for (const stop of stops) {
      await page.locator(stop.selector).scrollIntoViewIfNeeded();
      await page.screenshot({
        path: path.join(output, `${viewport.name}-${mode}-${stop.name}.png`),
      });
    }

    await context.close();
  }
}

await browser.close();
console.log(`Captured reduced-motion and no-JS signature states in ${output}.`);
