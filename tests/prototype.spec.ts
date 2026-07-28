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

    // Reaching chapter 08 must NOT by itself flip the field. In reduced motion
    // the inversion stays driven by kernel 64, exactly as it is with motion on.
    // Firing on section entry — which is what shipped before — puts the page on
    // --notte while chapter 07 still fills the screen, where --pietra-testo
    // renders at 2.99:1 and fails WCAG AA, and jumps kernels 57–64 in one step.
    await page.evaluate(() => {
      const section = document.querySelector("#custodia");
      if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY);
    });
    await page.waitForTimeout(320);
    await expect(page.locator("html")).toHaveAttribute("data-field", "giorno");
    await expect(page.locator(".rail__kernel").last()).toHaveAttribute("data-state", "pending");

    // Scrolling THROUGH it fills the count, and the inversion follows kernel 64.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(320);
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

  test("presents products without depending on how many there are", async ({ page }) => {
    const products = page.locator(".product");

    // Deliberately NOT toHaveCount(n). The previous assertion hard-coded three
    // and shipped alongside the copy "Non una gamma. Tre." — which was false:
    // the real catalogue also includes Birra and Amaro del Dottore. The
    // section must absorb a new product with no code change, so the test may
    // not re-introduce the assumption it exists to prevent.
    const count = await products.count();
    expect(count).toBeGreaterThanOrEqual(5);

    // Every entry, whatever the total, carries a name and a way to enquire.
    for (let i = 0; i < count; i += 1) {
      const entry = products.nth(i);
      await expect(entry.locator(".product__name")).not.toBeEmpty();
      await expect(entry.locator(".product__cta")).toHaveCount(1);
      await expect(entry.locator(".product__data dd").first()).not.toBeEmpty();
    }

    // Verified facts appear exactly where they are on record. Products are
    // addressed by id, not by visible name: names come off the packaging and
    // the packaging renamed one of them mid-project.
    const byId = (id: string) => page.locator(`[data-product="${id}"]`);
    await expect(byId("maisette")).toContainText("120 g");
    await expect(byId("farina")).toContainText("500 g");
    await expect(byId("maissini")).toContainText("Grissini di mais");

    /*
     * Maissini's net weight was unknown and its Formato row was asserted
     * ABSENT here. The 2026 priced brochure prints 200 g, so the row now
     * exists and the assertion is inverted rather than deleted: the point was
     * never "no format", it was "no invented format".
     */
    await expect(byId("maissini")).toContainText("200 g");

    // Maisotti shipped on the client's shelf and in their brochure while this
    // site had no entry for it at all. It is a full record now.
    await expect(byId("maisotti")).toHaveAttribute("data-status", "completo");
    await expect(byId("maisotti")).toContainText("250 g");

    /*
     * The beer is a full member of the maize family. Its record was
     * "completo" on two formats and a bare definition; the printed label has
     * since replaced that with a name, a style, a strength and ONE format.
     * 0,75 L is gone: the letter claims it, the bottle contradicts it, and the
     * register follows the bottle.
     */
    const birra = byId("birra");
    await expect(birra).toHaveAttribute("data-status", "completo");
    await expect(birra).not.toContainText("Scheda in preparazione");
    await expect(birra).toContainText("Mais Rosso Ottofile");
    await expect(birra.locator(".product__name")).toHaveText("La Maisèra 8file");
    await expect(birra).toContainText("33 cl");
    await expect(birra).not.toContainText("75 cl");
    await expect(birra.locator(".product__cta")).toHaveCount(1);

    // The Amaro's provenance is unknown, and the register says so rather than
    // guessing. It is NOT visually demoted for it — see the dedicated test.
    const amaro = products.filter({ hasText: "Amaro del Dottore" }).first();
    await expect(amaro).toHaveAttribute("data-status", "parziale");
    await expect(amaro).toContainText("Da verificare");
  });

  test("attributes no unconfirmed provenance to the Amaro", async ({ page }) => {
    const amaro = page.locator('[data-product="amaro"]');
    await expect(amaro).toHaveCount(1);
    const text = (await amaro.innerText()).toLowerCase();

    /*
     * These exact formulations came from the company's own public website and
     * were shipped as fact until the client confirmed that the only cultivation
     * they can stand behind is the Mais Rosso Ottofile.
     *
     * The guard is on PHRASES, not words. "erbe", "botanico" and "officinali"
     * are all legitimate once the real composition arrives — banning them would
     * block the correct copy along with the wrong copy.
     */
    const unconfirmed = [
      "orto botanico",
      "coltivate in azienda",
      "coltivato in azienda",
      "erbe aziendali",
      "botaniche aziendali",
      "botaniche coltivate",
      "erbe officinali",
      "agricoltura simbiotica",
      "biologic",
    ];
    for (const phrase of unconfirmed) {
      expect(text, `"${phrase}" is not confirmed for the Amaro`).not.toContain(phrase);
    }

    // Nothing else about it is known either: no strength, no format, no method.
    expect(text).not.toMatch(/\d+\s*(%|°|cl|ml|l\b)/);
    for (const phrase of ["gradazione", "infusione", "distiller", "laboratorio", "ingredienti"]) {
      expect(text, `"${phrase}" is not on record`).not.toContain(phrase);
    }

    // A partial record is still a product: full-strength name, no empty rows,
    // and the same way to enquire as everything else.
    await expect(amaro.locator(".product__cta")).toHaveCount(1);
    await expect(amaro.locator(".product__name")).toHaveText("Amaro del Dottore");
    const rows = amaro.locator(".product__row");
    await expect(rows).toHaveCount(1); // origin only — no blank format or specs
    for (let i = 0; i < (await rows.count()); i += 1) {
      await expect(rows.nth(i).locator("dd")).not.toBeEmpty();
    }
  });

  test("does not visually demote the Amaro for having a partial record", async ({ page }) => {
    // Incomplete data must not read as a lesser product. The dimmed treatment
    // is reserved for entries with no verified description at all.
    const amaroName = page.locator('[data-product="amaro"] .product__name');
    const birraName = page.locator('[data-product="birra"] .product__name');

    const [amaroColor, birraColor] = await Promise.all([
      amaroName.evaluate((el) => getComputedStyle(el).color),
      birraName.evaluate((el) => getComputedStyle(el).color),
    ]);
    expect(amaroColor).toBe(birraColor);

    const [amaroSize, birraSize] = await Promise.all([
      amaroName.evaluate((el) => getComputedStyle(el).fontSize),
      birraName.evaluate((el) => getComputedStyle(el).fontSize),
    ]);
    expect(amaroSize).toBe(birraSize);

    // And the row itself is a solid register entry, not a provisional one.
    const borderStyle = await page
      .locator('[data-product="amaro"]')
      .evaluate((el) => getComputedStyle(el).borderTopStyle);
    expect(borderStyle).toBe("solid");
  });

  test("keeps the maize the protagonist of the Birra, not the brewery", async ({ page }) => {
    const text = (await page.locator("#referenze").innerText()).toLowerCase();

    /*
     * These styles are still not on record and still banned. What CHANGED on
     * 2026-07-28 is that one style is: the bottle prints "BIÈRE DE GARDE –
     * FARMHOUSE", so that one is a printed fact rather than a guess and is
     * asserted positively below. The list is not weakened to let it through —
     * it never contained it.
     *
     * Whole words only. Substring matching is wrong here and quietly gives a
     * false positive: "ipa" is inside "princ-ipa-le", and the standfirst says
     * "una materia prima principale".
     */
    const styles = ["ipa", "blonde", "amber", "lager", "pilsner", "weiss", "stout"];
    for (const style of styles) {
      expect(text, `brewing style "${style}" is not on record`).not.toMatch(
        new RegExp(`\\b${style}\\b`),
      );
    }

    /*
     * Neither the brewer nor the technical spec sheet belongs here. "gradazione"
     * stays banned even though the strength is now printed on the label: the
     * label's own word is "ALCOOL 7% VOL.", and a register uses the wording on
     * the pack rather than the vocabulary of a tasting sheet.
     *
     * "castelletto" and "accise" are new. The label carries the contract
     * brewery's name, address and excise code in its small print; none of that
     * is this company's, and none of it goes on this company's site.
     */
    const banned = [
      "ibu",
      "birrificio",
      "brewery",
      "malto",
      "abv",
      "gradazione",
      "castelletto",
      "accise",
    ];
    for (const word of banned) {
      expect(text, `"${word}" must not appear`).not.toMatch(new RegExp(`\\b${word}\\b`));
    }
    // Stem match: luppolo / luppoli / luppolato.
    expect(text).not.toContain("luppol");

    // What must be there is the agricultural origin, and now also what the
    // bottle itself declares.
    const birra = page.locator('[data-product="birra"]');
    await expect(birra.locator(".product__data")).toContainText("Mais Rosso Ottofile");
    await expect(birra.locator(".product__data")).toContainText("Bière de Garde");
    await expect(birra.locator(".product__data")).toContainText("7% vol.");
  });

  test("prints prices as register data and never as an offer", async ({ page }) => {
    /*
     * The client publishes a priced list, so the register prints the prices —
     * in the same voice as a net weight, in the same generic spec row, in the
     * same type. What it must never grow is the apparatus of a shop: this
     * company does not sell online, and a price with a button beside it says
     * that it does.
     */
    const referenze = page.locator("#referenze");
    await expect(referenze).toContainText("€ 3,90");
    await expect(referenze).toContainText("€ 5,50");

    const text = (await referenze.innerText()).toLowerCase();
    for (const banned of [
      "compra",
      "acquista ora",
      "aggiungi",
      "carrello",
      "checkout",
      "sconto",
      "offerta",
      "promo",
      "spedizione",
      "iva inclusa",
    ]) {
      expect(text, `"${banned}" must not appear beside a price`).not.toContain(banned);
    }

    // The only action on a product row is still the enquiry, once per row.
    const rows = page.locator(".product");
    const count = await rows.count();
    for (let i = 0; i < count; i += 1) {
      await expect(rows.nth(i).locator("a")).toHaveCount(1);
    }
  });

  test("makes no gluten-free claim anywhere, in either direction", async ({ page }) => {
    /*
     * The presentation letter calls the Maisette "senza glutine per natura"
     * and the maize "naturalmente privo di glutine". Both refused: the claim
     * is regulated, needs a verified analysis under 20 ppm on the finished
     * product, and this range includes wheat flour, barley and a beer whose
     * own label declares gluten-containing cereals.
     *
     * The allergen rows that DO ship are the opposite move — a declaration off
     * a printed ingredient list — and this test guards both directions at once.
     */
    const text = (await page.locator("main").innerText()).toLowerCase();
    for (const phrase of ["senza glutine", "privo di glutine", "gluten free", "glutine free"]) {
      expect(text, `"${phrase}" is not verified and may never appear`).not.toContain(phrase);
    }
    await expect(page.locator('[data-product="maissini"]')).toContainText("contiene glutine");
  });

  test("carries no copy that hard-codes the size of the range", async ({ page }) => {
    const text = (await page.locator("main").innerText()).toLowerCase();
    expect(text).not.toContain("non una gamma");
    expect(text).not.toContain("tre referenze");
    // Ordinals are fine; "01/03" would pin the layout to a fixed total.
    expect(await page.locator(".product__index").first().innerText()).not.toMatch(/\/\s*\d/);
  });

  test("offers three distinct conversion channels, none of them a shop", async ({ page }) => {
    const canali = page.locator(".canale");
    await expect(canali).toHaveCount(3);

    // The real conversion: a structured enquiry, with the message already
    // shaped so the reader never has to compose a cold email.
    const primary = page.locator(".canale[data-primary] .canale__action");
    await expect(primary).toHaveCount(1);
    const enquiry = await primary.getAttribute("href");
    expect(enquiry).toContain("mailto:");
    expect(enquiry).toContain("subject=");
    expect(enquiry).toContain("body=");
    expect(decodeURIComponent(enquiry ?? "")).toContain("Quantità");

    // A phone that actually dials, and a plain email for everything else.
    await expect(page.locator('.canale__action[href^="tel:"]')).toHaveCount(1);
    const mailtos = page.locator('.canale__action[href^="mailto:"]');
    await expect(mailtos).toHaveCount(2);

    // The company does not sell online. Nothing here may imitate one.
    const text = (await page.locator("#contatti").innerText()).toLowerCase();
    for (const banned of ["compra ora", "aggiungi al carrello", "carrello", "checkout", "€"]) {
      expect(text, `"${banned}" must not appear`).not.toContain(banned);
    }
    // And it says so out loud, rather than leaving the reader to discover it.
    expect(text).toContain("non vende online");
  });

  test("explains what happens after contact, and where to buy in person", async ({ page }) => {
    // The reader's real question before writing is "and then what?".
    const steps = page.locator(".percorso");
    expect(await steps.count()).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < (await steps.count()); i += 1) {
      await expect(steps.nth(i).locator(".percorso__title")).not.toBeEmpty();
      await expect(steps.nth(i).locator(".percorso__body")).not.toBeEmpty();
    }

    // Fairs are a genuine route to purchase for this business, not a footnote.
    const fiere = page.locator(".contact__fiere");
    await expect(fiere).toHaveCount(1);
    await expect(fiere).toContainText("fiere");

    // No fair dates are on record, so none may be stated.
    const text = (await fiere.innerText()).toLowerCase();
    expect(text).not.toMatch(/\b20\d\d\b/);
    expect(text).not.toMatch(
      /\b(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\b/,
    );

    // Trust: a real name, a real place, a real way to check who you are dealing with.
    const contatti = page.locator("#contatti");
    await expect(contatti).toContainText("Cherasco");
    await expect(contatti).toContainText("Azienda agricola");
    await expect(contatti.locator('a[href*="privacy"]')).toHaveCount(1);
  });

  test("states no delivery, turnaround or stock promise anywhere", async ({ page }) => {
    // None of these are on record. A plausible-sounding invented one is a
    // commercial promise the client would have to honour.
    const text = (await page.locator("#contatti").innerText()).toLowerCase();
    for (const banned of [
      "spedizion",
      "spediamo",
      "consegna in",
      "entro 24",
      "entro 48",
      "risposta immediata",
      "sempre disponibil",
    ]) {
      expect(text, `"${banned}" is not on record`).not.toContain(banned);
    }
  });

  test("gives every narrative section visual support", async ({ page }) => {
    // The chapters that were carrying copy alone.
    for (const id of ["mais-del-re", "quasi-estinto", "il-campo", "la-pietra"]) {
      const plates = page.locator(`#${id} .piastra`);
      expect(await plates.count(), `#${id} has no plate`).toBeGreaterThanOrEqual(1);
    }

    // Plates are lazy. They must be brought into view first, or this measures
    // lazy-loading rather than whether the files actually resolve.
    // Only visible plates: 1:1 detail plates are dropped on mobile (§8.5), and
    // scrolling to a display:none element throws.
    const images = page.locator(".piastra__img:visible");
    const total = await images.count();
    for (let i = 0; i < total; i += 1) {
      await images.nth(i).scrollIntoViewIfNeeded();
    }
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll<HTMLImageElement>(".piastra__img"))
          .filter((img) => img.offsetParent !== null)
          .every((img) => img.complete),
      undefined,
      { timeout: 15_000 },
    );

    // Every plate actually resolves — a 404 renders as an empty box, which
    // reads as a broken layout rather than as a missing asset.
    const broken = await page
      .locator(".piastra__img")
      .evaluateAll((nodes) =>
        nodes
          .filter(
            (img) =>
              img instanceof HTMLImageElement &&
              img.offsetParent !== null &&
              img.naturalWidth === 0,
          )
          .map((img) => (img as HTMLImageElement).getAttribute("src")),
      );
    expect(broken).toEqual([]);
  });

  test("labels provisional plates and claims nothing through them", async ({ page }) => {
    const provisional = page.locator('.piastra[data-status="provvisorio"]');
    const count = await provisional.count();
    expect(count).toBeGreaterThan(0);

    // A stand-in shown without saying so is a claim the register has not
    // earned. The annotation disappears on its own once status is definitivo.
    for (let i = 0; i < count; i += 1) {
      await expect(provisional.nth(i).locator(".piastra__nota")).toHaveCount(1);
    }

    // Alt text and captions describe what is visible — never a place, an
    // owner, a person or a process. These images are narrative, not
    // documentary, and must not be readable as evidence.
    const texts = await page
      .locator(".piastra")
      .evaluateAll((figures) =>
        figures.map(
          (f) =>
            `${f.querySelector("img")?.getAttribute("alt") ?? ""} ${f.querySelector("figcaption")?.textContent ?? ""}`,
        ),
      );
    const forbidden = [
      "azienda",
      "aziendal",
      "giardino",
      "cherasco",
      "piemonte",
      "langhe",
      "matteo",
      "nostro",
      "nostra",
      "coltivat",
      "raccolt",
      "storic",
      "originale",
      "archivio",
    ];
    for (const text of texts) {
      const lower = text.toLowerCase();
      for (const word of forbidden) {
        expect(lower, `plate text must not imply "${word}": "${text.trim()}"`).not.toContain(word);
      }
    }
  });

  test("renders each plate at its own declared ratio", async ({ page }) => {
    // The box is fixed by aspect-ratio, so swapping a provisional plate for the
    // definitive photograph cannot move the layout. Two ratios exist and a
    // third is a defect (art-direction §8): 8:5 for landscape plates, 1:1 for
    // detail plates. This asserts each variant against ITS ratio — an earlier
    // version demanded 8:5 of everything, which would have blocked the square.
    const frames = await page.locator(".piastra__frame").evaluateAll((nodes) =>
      nodes.map((f) => {
        const r = f.getBoundingClientRect();
        const figure = f.closest(".piastra");
        const variant = figure?.classList.contains("piastra--reperto") ? "reperto" : "lastra";
        return { variant, ratio: r.height === 0 ? 0 : Number((r.width / r.height).toFixed(2)) };
      }),
    );

    const visible = frames.filter((f) => f.ratio > 0);
    expect(visible.length).toBeGreaterThan(0);
    for (const frame of visible) {
      expect(frame.ratio).toBeCloseTo(frame.variant === "reperto" ? 1 : 1.6, 1);
    }
  });

  test("bleeds no plate further than the art direction permits", async ({ page }) => {
    // §7.4.1: at most 20% of an image's width may leave the right edge, and
    // only in chapters 02, 05 and 07. A bleed must also never become a
    // horizontal scrollbar.
    const bleeds = await page.locator(".piastra--lastra").evaluateAll((nodes) =>
      nodes.map((el) => {
        const r = el.getBoundingClientRect();
        const off = Math.max(0, r.right - document.documentElement.clientWidth);
        return {
          section: el.closest("section")?.id ?? "?",
          fraction: r.width === 0 ? 0 : Number((off / r.width).toFixed(3)),
        };
      }),
    );

    const permitted = new Set(["mais-del-re", "il-campo", "referenze"]);
    for (const bleed of bleeds) {
      expect(bleed.fraction, `${bleed.section} bleeds too far`).toBeLessThanOrEqual(0.2);
      if (bleed.fraction > 0) {
        expect(permitted.has(bleed.section), `${bleed.section} may not bleed`).toBe(true);
      }
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("keeps text legible over every campitura", async ({ page }) => {
    // A ground is decorative and must never be announced, and it must never
    // eat the contrast margin of the text printed on it. --pietra-testo sits
    // at 5.15:1 on bare --carta; the grounds were measured and their opacity
    // set from that measurement, not chosen by eye.
    const grounds = page.locator(".piastra--campitura");
    const count = await grounds.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      await expect(grounds.nth(i)).toHaveAttribute("aria-hidden", "true");
      await expect(grounds.nth(i).locator("figcaption")).toHaveCount(0);
      const opacity = await grounds
        .nth(i)
        .locator(".piastra__img")
        .evaluate((el) => Number.parseFloat(getComputedStyle(el).opacity));
      expect(opacity).toBeLessThanOrEqual(0.08);
    }
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
