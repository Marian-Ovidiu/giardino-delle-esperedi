import { expect, type Locator, test } from "@playwright/test";

const publicProductIds = ["farina", "maisera", "maisette", "maissini"] as const;
const bannedPublicContent = [
  /Il Giardino delle Esperidi/i,
  /Amaro del Dottore/i,
  /Maisciuc/i,
  /Maisotti/i,
  /senza intermediari/i,
  /tutto prodotto internamente/i,
  /interamente in azienda/i,
  /agricoltura simbiotica/i,
  /senza glutine/i,
  /\bbiologic[oa]\b/i,
  /raccolt[oa] a mano/i,
  /essiccat[oa] al sole/i,
  /\bIBU\b/i,
  /(?:0[,.]75\s*l|75\s*cl)\b/i,
  /\b\d+(?:[.,]\d+)?\s*(?:ha|ettari|quintali)\b/i,
  /€|\b\d+[,.]\d{2}\s*euro\b/i,
] as const;

function expectNoBannedContent(text: string, surface: string) {
  for (const pattern of bannedPublicContent) {
    expect(text, `${surface} contiene ${pattern}`).not.toMatch(pattern);
  }
}

async function expectLoadedImage(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  const source = (await image.getAttribute("src")) ?? "immagine senza src";
  await expect
    .poll(
      () =>
        image.evaluate((node) => {
          const element = node as HTMLImageElement;
          return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0;
        }),
      { message: `caricamento di ${source}`, timeout: 15_000 },
    )
    .toBe(true);
}

test.describe("Mais Rosso Co. — acceptance", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("identifies the only public brand and the real subject immediately", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveCount(1);
    await expect(heading).toHaveText("Mais Rosso Co.");

    const hero = page.locator("#inizio");
    await expect(hero).toContainText("Mais Rosso Ottofile");
    await expect(hero).toContainText(/Cherasco/i);

    const heroMedia = hero.locator(".hero__media");
    await expect(heroMedia).toHaveAttribute("data-media-kind", "documentary");
    await expectLoadedImage(heroMedia.locator("img"));

    const isInFirstViewport = await heroMedia.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return box.top < window.innerHeight && box.bottom > 0;
    });
    expect(isInFirstViewport).toBe(true);
  });

  test("publishes exactly the four approved products in the approved order", async ({ page }) => {
    const cards = page.locator("#prodotti [data-product]");
    await expect(cards).toHaveCount(4);
    await expect
      .poll(() =>
        cards.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-product"))),
      )
      .toEqual(publicProductIds);

    const beer = cards.nth(1);
    await expect(beer).toHaveAttribute("data-product", "maisera");
    await expect(beer).toContainText("La Maisèra 8file");
    await expect(beer).toContainText("33 cl");
    await expect(beer).toContainText("7% vol");
    await expect(beer).toContainText("Bière de Garde");
    await expect(beer).toContainText("partner specializzato");

    for (const id of publicProductIds) {
      const card = page.locator(`[data-product="${id}"]`);
      await expect(card.getByRole("heading", { level: 3 })).not.toBeEmpty();
      await expect(card.getByRole("link", { name: /Verifica disponibilità/ })).toHaveAttribute(
        "href",
        /^mailto:/,
      );
    }
  });

  test("keeps La Maisèra second in the mobile reading order", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile reading-order audit");
    const cards = page.locator("#prodotti [data-product]");
    const positions = await cards.evaluateAll((nodes) =>
      nodes.map((node) => ({
        id: node.getAttribute("data-product"),
        top: node.getBoundingClientRect().top + window.scrollY,
      })),
    );
    expect(positions.map(({ id }) => id)).toEqual(publicProductIds);
    expect(positions[0].top).toBeLessThan(positions[1].top);
    expect(positions[1].top).toBeLessThan(positions[2].top);
  });

  test("states the supply chain honestly", async ({ page }) => {
    const field = page.locator("#dal-campo");
    await expect(field).toContainText("Coltiviamo direttamente");
    await expect(field).toContainText("Selezioniamo");
    await expect(field).toContainText("partner specializzati");
    await expect(field).toContainText("qualità");
    await expect(field).toContainText("ricette");
    await expect(field).toContainText("prodotto finale");
    expectNoBannedContent(await field.innerText(), "filiera");
  });

  test("keeps forbidden and unconfirmed content out of DOM and head", async ({ page }) => {
    const publicText = await page.locator("html").innerText();
    const headText = await page.locator("head").textContent();
    expectNoBannedContent(publicText, "DOM pubblico");
    expectNoBannedContent(headText ?? "", "head");
  });

  test("keeps forbidden content out of manifest and JSON-LD", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Metadata audit runs once");

    await expect(page).toHaveTitle("Mais Rosso Co. | Mais Rosso Ottofile ai piedi di Cherasco");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Mais Rosso Co.+.*Mais Rosso Ottofile.+.*Cherasco/,
    );

    const manifestHref = await page.locator('link[rel="manifest"]').getAttribute("href");
    expect(manifestHref).toBeTruthy();
    const manifestResponse = await page.request.get(new URL(manifestHref!, page.url()).toString());
    expect(manifestResponse.ok()).toBe(true);
    const manifestText = await manifestResponse.text();
    expectNoBannedContent(manifestText, "manifest");
    expect(JSON.parse(manifestText)).toMatchObject({
      name: "Mais Rosso Co.",
      short_name: "Mais Rosso Co.",
      lang: "it",
    });

    const jsonLdText = await page.locator('script[type="application/ld+json"]').textContent();
    expectNoBannedContent(jsonLdText ?? "", "JSON-LD");
    expect(JSON.parse(jsonLdText ?? "{}")).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Brand",
      name: "Mais Rosso Co.",
    });
  });

  test("provides direct consumer and secondary professional contacts", async ({ page }) => {
    const contact = page.locator("#contatti");
    await expect(contact.getByRole("heading", { level: 2 })).toHaveText(
      "Quale prodotto ti interessa?",
    );
    await expect(contact.getByRole("link", { name: "Verifica disponibilità" })).toHaveAttribute(
      "href",
      /^mailto:/,
    );
    await expect(
      contact.getByRole("link", { name: "Richiedi informazioni professionali" }),
    ).toHaveAttribute("href", /^mailto:/);
    await expect(contact.getByRole("link", { name: "Telefono" })).toHaveAttribute("href", /^tel:/);
    await expect(contact.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      /^https:\/\/www\.instagram\.com\//,
    );
  });

  test("has no dead internal anchors and the skip link works", async ({ page }) => {
    const deadAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href"))
          .filter((href) => !href || href === "#" || !document.querySelector(href)),
      );
    expect(deadAnchors).toEqual([]);

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Vai al contenuto" });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page).toHaveURL(/#contenuto$/);
  });

  test("keeps every visible interactive target at least 44px", async ({ page }) => {
    const undersized = await page.locator("a, summary, button").evaluateAll((elements) =>
      elements
        .map((element) => {
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            label: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 64),
            width: box.width,
            height: box.height,
            visible:
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              box.width > 0 &&
              box.height > 0,
          };
        })
        .filter(({ visible, width, height }) => visible && (width < 44 || height < 44)),
    );
    expect(undersized).toEqual([]);
  });

  test("supports the mobile menu by keyboard", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile menu audit");
    const menu = page.locator(".site-header__menu");
    const trigger = menu.locator("summary");
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await trigger.press("Enter");
    await expect(menu).toHaveAttribute("open", "");
    const firstLink = menu.getByRole("link", { name: "Il mais" });
    await firstLink.focus();
    await firstLink.press("Escape");
    await expect(menu).not.toHaveAttribute("open", "");
    await expect(trigger).toBeFocused();
  });

  test("shows all content with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    const hiddenReveals = await page.locator(".reveal").evaluateAll(
      (nodes) =>
        nodes.filter((node) => {
          const style = getComputedStyle(node);
          return style.opacity === "0" || style.visibility === "hidden";
        }).length,
    );
    expect(hiddenReveals).toBe(0);
  });

  test("keeps the full content available without JavaScript", async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "No-JS audit runs once");
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1440, height: 1000 },
    });
    const noJsPage = await context.newPage();
    await noJsPage.goto("/");
    await expect(noJsPage.getByRole("heading", { level: 1 })).toHaveText("Mais Rosso Co.");
    await expect(noJsPage.locator("#prodotti [data-product]")).toHaveCount(4);
    await expect(noJsPage.locator("#dal-campo")).toContainText("partner specializzati");
    await expect(noJsPage.locator("#contatti")).toBeVisible();
    await context.close();
  });

  test("lands on a stable deep link", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Deep-link audit runs once");
    await page.goto("/#prodotti");
    const products = page.locator("#prodotti");
    await expect
      .poll(() => products.evaluate((node) => Math.round(node.getBoundingClientRect().top)))
      .toBeLessThan(120);
    const initialY = await page.evaluate(() => window.scrollY);
    await page.waitForTimeout(400);
    const settledY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(settledY - initialY)).toBeLessThanOrEqual(2);
  });

  test("uses loaded, described real or product media", async ({ page }) => {
    const frames = page.locator(".media-frame");
    expect(await frames.count()).toBeGreaterThanOrEqual(7);
    for (let index = 0; index < (await frames.count()); index += 1) {
      const frame = frames.nth(index);
      await expect(frame).toHaveAttribute("data-media-kind", /^(documentary|product)$/);
      const image = frame.locator("img");
      await expect(image).toHaveAttribute("alt", /\S+/);
      await expectLoadedImage(image);
      const source = await image.evaluate((node) => {
        const imageNode = node as HTMLImageElement;
        const url = new URL(imageNode.currentSrc || imageNode.src);
        return url.searchParams.get("url") ?? url.pathname;
      });
      expect(decodeURIComponent(source)).toContain("/images/brand/");
    }
  });

  test("has no horizontal overflow at acceptance widths", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Five-width audit runs once");
    for (const width of [320, 390, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.reload();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${width}px horizontal overflow`).toBeLessThanOrEqual(1);
    }
  });

  test("runs without console errors or uncaught exceptions", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.reload();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });
});
