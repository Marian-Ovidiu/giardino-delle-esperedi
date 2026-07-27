import { expect, type Page, test } from "@playwright/test";

async function waitForPrologue(page: Page) {
  await page
    .locator("[data-kernel-prologue][data-renderer='webgl2']")
    .waitFor({ state: "attached" });
  await page.waitForFunction(() => window.__OTTO_SIGNATURE__?.snapshot() != null);
}

async function scrollPrologueTo(page: Page, progress: number) {
  await page.evaluate((targetProgress) => {
    const story = document.querySelector<HTMLElement>("[data-prologue-story]");
    const variety = document.querySelector<HTMLElement>("#varieta");
    const royal = document.querySelector<HTMLElement>("#mais-del-re");
    const rows = document.querySelector<HTMLElement>("[data-prologue-end]");
    if (!story || !variety || !royal || !rows) {
      throw new Error("Signature story stops were not found.");
    }
    const top = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
    const heroTop = top(story);
    const varietyTop = top(variety);
    const royalTop = top(royal);
    const rowsReveal = top(rows) - window.innerHeight * 0.76;
    const mix = (start: number, end: number, value: number) => start + (end - start) * value;
    const target = Math.min(1, Math.max(0, targetProgress));
    const scroll =
      target <= 0.34
        ? mix(heroTop, varietyTop, target / 0.34)
        : target <= 0.6
          ? mix(varietyTop, royalTop, (target - 0.34) / 0.26)
          : mix(royalTop, rowsReveal, (target - 0.6) / 0.4);
    window.scrollTo(0, scroll);
  }, progress);
  await page.waitForFunction((targetProgress) => {
    const current = window.__OTTO_SIGNATURE__?.snapshot()?.progress;
    return current !== undefined && Math.abs(current - targetProgress) < 0.012;
  }, progress);
}

test.describe("OTTO full experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("keeps the structural invariants", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".rail__kernel")).toHaveCount(64);
    await expect(page.locator(".rail__link")).toHaveCount(8);
    await expect(page.getByRole("navigation").getByRole("link")).toHaveCount(8);
    await expect(page.locator("[data-scheda]")).toHaveCount(8);
    await expect(page.locator(".prologue-static")).toHaveCount(4);
    await expect(page.locator(".prologue-static--release")).toHaveCount(1);
    await expect(page.locator(".prologue__canvas")).toHaveCount(1);
    await expect(page.locator("[data-kernel-prologue]")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator("[data-kernel-prologue]")).toHaveCSS("pointer-events", "none");
    await expect(page.locator("main [data-kernel-prologue]")).toHaveCount(0);

    const columnCount = await page.locator(".hero").evaluate((element) => {
      return getComputedStyle(element).gridTemplateColumns.split(" ").length;
    });
    expect(columnCount).toBe(8);

    const fieldColumnCounts = await page
      .locator(".field")
      .evaluateAll((fields) =>
        fields.map((field) => getComputedStyle(field).gridTemplateColumns.split(" ").length),
      );
    expect(fieldColumnCounts.every((count) => count === 8)).toBe(true);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);

    const deadAnchors = await page.locator(".rail__link").evaluateAll(
      (links) =>
        links.filter((link) => {
          const target = link.getAttribute("href");
          return !target || !document.querySelector(target);
        }).length,
    );
    expect(deadAnchors).toBe(0);
  });

  test("keeps the rail fixed and keyboard reachable", async ({ page }) => {
    const rail = page.getByRole("navigation", { name: "Indice del registro" });
    await expect(rail).toBeVisible();
    await expect(rail).toHaveCSS("position", "fixed");

    const firstChapter = rail.getByRole("link", { name: /Scheda 01/ });
    await firstChapter.focus();
    await expect(firstChapter).toBeFocused();

    const box = await firstChapter.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(40);
    expect(box?.width).toBeGreaterThanOrEqual(40);
  });

  test("keeps every interactive target at least 40 by 40 pixels", async ({ page }) => {
    const undersized = await page.locator("a").evaluateAll((links) =>
      links
        .map((link) => {
          const box = link.getBoundingClientRect();
          return {
            label: (link.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 48),
            width: box.width,
            height: box.height,
          };
        })
        .filter(({ width, height }) => width < 40 || height < 40),
    );

    expect(undersized).toEqual([]);
  });

  test("preserves the full composition with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    await expect(page.locator(".hero__title-line > span").first()).toHaveCSS("transform", "none");
    await expect(page.locator(".prologue__canvas")).toHaveCSS("display", "none");
    await expect(page.locator(".prologue-static")).toHaveCount(4);
    await expect(page.locator(".prologue-static").first()).toBeVisible();
    await expect(page.locator("[data-kernel-prologue]")).not.toHaveAttribute(
      "data-renderer",
      "webgl2",
    );
    await expect(page.locator(".rail__kernel")).toHaveCount(64);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);

    await page.locator("#custodia").scrollIntoViewIfNeeded();
    await expect(page.locator(".rail__kernel").last()).toHaveAttribute("data-state", "completed");
    await expect(page.locator("html")).toHaveAttribute("data-field", "notte");
  });

  test("uses decorative static plates when Save-Data is enabled", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "connection", {
        configurable: true,
        value: { saveData: true },
      });
    });
    await page.reload();

    await expect(page.locator("[data-kernel-prologue]")).not.toHaveAttribute(
      "data-renderer",
      "webgl2",
    );
    await expect(page.locator(".prologue__canvas")).toHaveCSS("display", "none");
    const plates = page.locator(".prologue-static");
    await expect(plates).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      await expect(plates.nth(index)).toBeVisible();
      await expect(plates.nth(index)).toHaveAttribute("aria-hidden", "true");
    }
    await expect(page.locator("[data-kernel-prologue]")).toHaveCSS("position", "fixed");
    const releaseClearsProof = await page.evaluate(() => {
      const release = document.querySelector<HTMLElement>(".prologue-static--release");
      const proof = document.querySelector<HTMLElement>(".chapter--rows__proof");
      if (!release || !proof) return false;
      return release.getBoundingClientRect().bottom <= proof.getBoundingClientRect().top;
    });
    expect(releaseClearsProof).toBe(true);
  });

  test("keeps the complete fallback in server HTML without JavaScript", async ({
    browser,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "No-JS audit runs once");
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1440, height: 1000 },
    });
    const noJsPage = await context.newPage();
    await noJsPage.goto("/");
    await expect(noJsPage.locator(".prologue-static")).toHaveCount(4);
    await expect(noJsPage.locator(".prologue-static").last()).toBeVisible();
    await expect(noJsPage.locator(".prologue-static img[alt='']")).toHaveCount(4);
    await expect(noJsPage.locator(".prologue__canvas")).toHaveCSS("display", "none");
    await context.close();
  });

  test("does not expose the internal prologue preview in production", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Production route audit runs once");
    const response = await page.goto("/prologue-preview?progress=0.39");
    expect(response?.status()).toBe(404);
  });

  test("builds the cob from an eight-row deterministic topology", async ({ page }, testInfo) => {
    await waitForPrologue(page);
    const snapshot = await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot());
    const expectedPlants =
      testInfo.project.name === "desktop" ? 48 : testInfo.project.name === "tablet" ? 32 : 24;
    const expectedDepths =
      testInfo.project.name === "desktop" ? 6 : testInfo.project.name === "tablet" ? 4 : 3;
    const expectedDepthScale =
      testInfo.project.name === "desktop" ? 1 : testInfo.project.name === "tablet" ? 0.86 : 0.72;

    expect(snapshot).toMatchObject({
      kernelCount: 256,
      rows: 8,
      drawCalls: 3,
      plantCount: expectedPlants,
      fieldLaneCount: 8,
      fieldDepthCount: expectedDepths,
      depthScale: expectedDepthScale,
      seed: "ottofile-v1",
    });
    const backdrop = await page.locator("[data-kernel-prologue]").evaluate((section) => ({
      height: section.getBoundingClientRect().height / window.innerHeight,
      position: getComputedStyle(section).position,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    }));
    expect(backdrop.height).toBeCloseTo(1, 2);
    expect(backdrop.position).toBe("fixed");
    expect(backdrop.scrollHeight).toBeGreaterThan(backdrop.viewportHeight);
  });

  test("maps every chapter to scroll and reverses deterministically", async ({ page }) => {
    await waitForPrologue(page);
    const checkpoints = [0, 0.12, 0.24, 0.39, 0.52, 0.68, 0.84, 1];
    const expectedStages = [
      "dispersione",
      "attrazione",
      "attrazione",
      "pannocchia",
      "pianta",
      "campo",
      "registro",
      "registro",
    ];

    const forwardHashes: string[] = [];
    for (const [index, progress] of checkpoints.entries()) {
      const snapshot = await page.evaluate((value) => {
        window.__OTTO_SIGNATURE__?.setProgress(value);
        return window.__OTTO_SIGNATURE__?.snapshot();
      }, progress);
      expect(snapshot?.stage).toBe(expectedStages[index]);
      forwardHashes.push(snapshot?.renderHash ?? "");
    }

    for (const [index, progress] of [...checkpoints].reverse().entries()) {
      const snapshot = await page.evaluate((value) => {
        window.__OTTO_SIGNATURE__?.setProgress(value);
        return window.__OTTO_SIGNATURE__?.snapshot();
      }, progress);
      expect(snapshot?.renderHash).toBe([...forwardHashes].reverse()[index]);
    }

    await scrollPrologueTo(page, 0.84);
    await expect(page.locator("[data-kernel-prologue]")).toHaveAttribute("data-stage", "registro");
    await scrollPrologueTo(page, 0.24);
    await expect(page.locator("[data-kernel-prologue]")).toHaveAttribute(
      "data-stage",
      "attrazione",
    );
  });

  test("releases before Otto file and restores perfectly on reverse", async ({ page }) => {
    await waitForPrologue(page);
    await scrollPrologueTo(page, 1);
    const visibleOpacity = await page
      .locator("[data-kernel-prologue] .prologue__viewport")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));
    expect(visibleOpacity).toBeGreaterThan(0.1);

    await page.locator("[data-prologue-end]").evaluate((element) => {
      window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY);
    });
    await expect(page.locator("[data-kernel-prologue] .prologue__viewport")).toHaveCSS(
      "opacity",
      "0",
    );

    await scrollPrologueTo(page, 0.84);
    const restoredOpacity = await page
      .locator("[data-kernel-prologue] .prologue__viewport")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));
    expect(restoredOpacity).toBeGreaterThan(0.1);
  });

  test("initialises the correct state from a deep link without shifting", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Deep-link audit runs once");
    await page.goto("/#mais-del-re");
    await waitForPrologue(page);
    const initial = await page.evaluate(() => ({
      progress: window.__OTTO_SIGNATURE__?.snapshot()?.progress ?? -1,
      y: window.scrollY,
    }));
    expect(initial.progress).toBeCloseTo(0.6, 1);
    await page.waitForTimeout(300);
    const settledY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(settledY - initial.y)).toBeLessThanOrEqual(1);
  });

  test("holds the camera at the cob climax and gates pointer motion", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Fine-pointer behaviour is desktop-only");
    await waitForPrologue(page);

    const camera = await page.evaluate(() => {
      window.__OTTO_SIGNATURE__?.setProgress(0.34);
      const start = window.__OTTO_SIGNATURE__?.snapshot()?.cameraZ;
      window.__OTTO_SIGNATURE__?.setProgress(0.44);
      const end = window.__OTTO_SIGNATURE__?.snapshot()?.cameraZ;
      return { start, end };
    });
    expect(camera.start).toBe(camera.end);

    await scrollPrologueTo(page, 0.2);
    await page.mouse.move(1180, 180);
    await page.waitForTimeout(180);
    const activePointer = await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot());
    expect(Math.abs(activePointer?.pointerYaw ?? 0)).toBeGreaterThan(0.02);

    await scrollPrologueTo(page, 0.39);
    await page.mouse.move(980, 260);
    await page.waitForTimeout(80);
    const gatedPointer = await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot());
    expect(Math.abs(gatedPointer?.pointerYaw ?? 1)).toBeLessThan(0.01);
    expect(Math.abs(gatedPointer?.pointerPitch ?? 1)).toBeLessThan(0.01);
  });

  test("falls back on context loss and permits only one restore", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "WebGL lifecycle audit runs once");
    await waitForPrologue(page);

    const hasLoseContext = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(".prologue__canvas");
      return Boolean(canvas?.getContext("webgl2")?.getExtension("WEBGL_lose_context"));
    });
    test.skip(!hasLoseContext, "WEBGL_lose_context is unavailable in this browser");

    const flowBeforeLoss = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      y: window.scrollY,
    }));

    await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(".prologue__canvas");
      canvas?.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext();
    });
    await expect(page.locator("[data-kernel-prologue]")).toHaveAttribute(
      "data-renderer",
      "fallback",
    );
    const flowAfterLoss = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      y: window.scrollY,
    }));
    expect(flowAfterLoss).toEqual(flowBeforeLoss);
    // SwiftShader does not restore a deliberately lost context reliably in
    // headless mode. Reload, then exercise the real event lifecycle directly.
    await page.reload();
    await waitForPrologue(page);
    await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(".prologue__canvas");
      canvas?.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
    });
    await expect(page.locator("[data-kernel-prologue]")).toHaveAttribute(
      "data-renderer",
      "fallback",
    );
    await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(".prologue__canvas");
      canvas?.dispatchEvent(new Event("webglcontextrestored"));
    });
    await waitForPrologue(page);

    await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(".prologue__canvas");
      canvas?.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
      canvas?.dispatchEvent(new Event("webglcontextrestored"));
    });
    await expect(page.locator("[data-kernel-prologue]")).toHaveAttribute(
      "data-renderer",
      "fallback",
    );
  });

  test("caps the framebuffer on high-resolution viewports", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Framebuffer audit runs once");
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.reload();
    await waitForPrologue(page);
    const framebuffer = await page.locator(".prologue__canvas").evaluate((canvas) => ({
      width: (canvas as HTMLCanvasElement).width,
      height: (canvas as HTMLCanvasElement).height,
    }));
    expect(framebuffer.width).toBeLessThanOrEqual(4096);
    expect(framebuffer.height).toBeLessThanOrEqual(4096);
    expect(framebuffer.width * framebuffer.height).toBeLessThanOrEqual(4_200_000);
  });

  test("does not render pointer frames while the prologue is off-screen", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Fine-pointer visibility audit runs once");
    await waitForPrologue(page);
    await scrollPrologueTo(page, 0.2);
    await page.mouse.move(1120, 180);
    await page.waitForTimeout(220);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(220);
    const before = await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot()?.renderCount);
    await page.mouse.move(240, 240);
    await page.mouse.move(920, 680);
    await page.waitForTimeout(220);
    const after = await page.evaluate(() => window.__OTTO_SIGNATURE__?.snapshot()?.renderCount);
    expect(after).toBe(before);
  });

  test("completes and reverses the register without a second palette event", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator("html")).toHaveAttribute("data-field", "notte");
    await expect(page.locator(".rail__kernel").last()).toHaveAttribute("data-state", "completed");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator("html")).toHaveAttribute("data-field", "giorno");
    await expect(page.locator(".rail__kernel").last()).toHaveAttribute("data-state", "pending");
  });

  test("ties the only pin and the night field to kernel 64", async ({ page }) => {
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("data-field", "giorno");
    await expect(page.locator(".rail__kernel").last()).toHaveAttribute("data-state", "pending");

    const pinStart = await page.locator("[data-custody-pin]").evaluate((scene) => {
      const pinSpacer = scene.parentElement;
      return (pinSpacer?.getBoundingClientRect().top ?? 0) + window.scrollY;
    });
    await page.evaluate((start) => window.scrollTo(0, start + window.innerHeight + 1), pinStart);

    await expect(page.locator(".rail__kernel").last()).toHaveAttribute("data-state", "completed");
    await expect(page.locator("html")).toHaveAttribute("data-rail-field", "notte");
    await expect(page.locator("html")).toHaveAttribute("data-field", "notte");
    await expect(page.locator(".chapter--custody__mark").first()).toHaveCSS(
      "clip-path",
      "inset(0%)",
    );
  });

  test("shows the chapter name briefly when the mobile rail is tapped", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile-only rail behaviour");

    await expect(page.locator("html")).toHaveAttribute("data-experience", "enhanced");
    const firstLink = page.locator(".rail__link").first();
    await firstLink.click();
    const touchLabel = page.locator(".rail__touch-label");
    await expect(touchLabel).toHaveAttribute("data-visible", "true");
    await expect(touchLabel).toHaveText("La varietà");
    await expect(touchLabel).not.toHaveAttribute("data-visible", "true", { timeout: 1200 });
  });

  test("clips the hero through the viewport edge at all five QA widths", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Five-width audit runs once");

    for (const width of [390, 768, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      const metrics = await page.locator(".hero__title-line--wide > span").evaluate((line) => {
        const box = line.getBoundingClientRect();
        return {
          clipped: (Math.max(0, box.right - window.innerWidth) / box.width) * 100,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      expect(metrics.clipped, `${width}px clip`).toBeGreaterThanOrEqual(4);
      expect(metrics.clipped, `${width}px clip`).toBeLessThanOrEqual(16);
      expect(metrics.overflow, `${width}px overflow`).toBeLessThanOrEqual(0);
    }
  });

  test("uses the current commercial product hierarchy", async ({ page }) => {
    const products = page.locator(".product");
    await expect(products).toHaveCount(3);
    await expect(products.nth(0)).toContainText("Maisette");
    await expect(products.nth(0)).toContainText("120 g");
    await expect(products.nth(1)).toContainText("Maissini");
    await expect(products.nth(1)).toContainText("Grissini di mais");
    await expect(products.nth(1).getByText("Peso netto")).toHaveCount(0);
    await expect(products.nth(2)).toContainText("Farina di Mais Rosso");
    await expect(products.nth(2)).toContainText("500 g");
  });

  test("runs without client exceptions or console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.reload();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(320);
    expect(errors).toEqual([]);
  });
});
