#!/usr/bin/env node

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const getFlag = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const url = getFlag("url", "http://localhost:3000");
const landing = args.includes("--landing");
const output = getFlag(
  "out",
  path.join("docs", "captures", landing ? "signature-landing" : "prologue"),
);
const checkpoints = [0, 0.12, 0.24, 0.39, 0.52, 0.68, 0.84, 1];
const viewportFilter = getFlag("viewport", "all");
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
].filter(({ name }) => viewportFilter === "all" || name === viewportFilter);

async function scrollLandingTo(page, targetProgress) {
  await page.evaluate((progress) => {
    const story = document.querySelector("[data-prologue-story]");
    const variety = document.querySelector("#varieta");
    const royal = document.querySelector("#mais-del-re");
    const rows = document.querySelector("[data-prologue-end]");
    if (
      !(story instanceof HTMLElement) ||
      !(variety instanceof HTMLElement) ||
      !(royal instanceof HTMLElement) ||
      !(rows instanceof HTMLElement)
    ) {
      throw new Error("Signature story stops were not found.");
    }
    const top = (element) => element.getBoundingClientRect().top + window.scrollY;
    const heroTop = top(story);
    const varietyTop = top(variety);
    const royalTop = top(royal);
    const rowsReveal = top(rows) - window.innerHeight * 0.76;
    const mix = (start, end, value) => start + (end - start) * value;
    const target = Math.min(1, Math.max(0, progress));
    const scroll =
      target <= 0.34
        ? mix(heroTop, varietyTop, target / 0.34)
        : target <= 0.6
          ? mix(varietyTop, royalTop, (target - 0.34) / 0.26)
          : mix(royalTop, rowsReveal, (target - 0.6) / 0.4);
    window.scrollTo(0, scroll);
  }, targetProgress);
  await page.waitForFunction((progress) => {
    const current = window.__OTTO_SIGNATURE__?.snapshot()?.progress;
    return current !== undefined && Math.abs(current - progress) < 0.012;
  }, targetProgress);
}

await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const report = {};

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const browserMessages = [];
  page.on("console", (message) => browserMessages.push(`${message.type()}: ${message.text()}`));
  page.on("pageerror", (error) => browserMessages.push(`pageerror: ${error.message}`));
  report[viewport.name] = [];

  if (landing) {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.locator("[data-kernel-prologue]").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
    const rendererState = await page
      .locator("[data-kernel-prologue]")
      .getAttribute("data-renderer");
    if (rendererState !== "webgl2") {
      throw new Error(
        `Integrated prologue did not initialise WebGL2 (${rendererState ?? "no state"}).\n${browserMessages.join("\n")}`,
      );
    }
  }

  for (const progress of checkpoints) {
    if (!landing) {
      await page.goto(`${url}/prologue-preview?progress=${progress}`, {
        waitUntil: "networkidle",
      });
      await page
        .locator("[data-kernel-prologue][data-enhanced='true']")
        .waitFor({ state: "attached" });
    } else {
      await scrollLandingTo(page, progress);
    }
    await page.waitForTimeout(80);
    const snapshot = await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot());
    report[viewport.name].push(snapshot);
    const checkpoint = String(Math.round(progress * 100)).padStart(3, "0");
    const capturePath = path.join(output, `${viewport.name}-${checkpoint}.png`);
    if (landing) await page.screenshot({ path: capturePath });
    else await page.locator(".prologue__viewport").screenshot({ path: capturePath });
  }

  if (landing) {
    report[`${viewport.name}-reverse`] = [];
    for (const progress of [...checkpoints].reverse()) {
      await scrollLandingTo(page, progress);
      report[`${viewport.name}-reverse`].push(
        await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot()),
      );
    }

    await page.locator("[data-prologue-end]").evaluate((element) => {
      window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY);
    });
    await page.waitForTimeout(80);
    await page.screenshot({ path: path.join(output, `${viewport.name}-exit.png`) });
  }

  await context.close();
}

await browser.close();
await writeFile(path.join(output, "snapshots.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `Captured ${viewports.length * checkpoints.length} ${landing ? "integrated" : "prototype"} prologue states in ${output}.`,
);
