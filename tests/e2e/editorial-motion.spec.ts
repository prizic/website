import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

test("the method follows the opening folio without a dead vertical band", async ({ page }) => {
  await page.goto("/");
  const gap = await page.evaluate(() => document.querySelector("#method h2")!.getBoundingClientRect().top - document.querySelector(".opening-spread__folio")!.getBoundingClientRect().bottom);
  expect(gap).toBeLessThanOrEqual(64);
});

test("every directional arrow travels on hover and keyboard focus", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("a:visible:has(.editorial-arrow)");
  expect(await links.count()).toBeGreaterThan(10);
  for (const link of await links.all()) {
    const arrow = link.locator(".editorial-arrow");
    await link.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await link.evaluate((element) => (element as HTMLElement).blur());
    const direction = await arrow.getAttribute("data-direction");
    await link.hover();
    await expect.poll(() => arrow.evaluate((element) => {
      const transform = new DOMMatrix(getComputedStyle(element).transform);
      return { x: transform.m41, y: transform.m42 };
    })).toEqual(direction === "down" ? { x: 0, y: 5 } : { x: 4, y: -4 });
    await page.mouse.move(0, 0);
    await page.keyboard.press("Tab");
    await link.focus();
    await expect.poll(() => arrow.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42)).toBe(direction === "down" ? 5 : -4);
  }
});

for (const width of [320, 375, 768, 1280, 1440]) {
  test(`opening material crops and wordmark geometry stay composed at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const header = page.locator(".site-header");
    const identity = page.locator("[data-header-identity]");
    await expect(identity).toHaveText("Prizic");
    const [headerBounds, identityBounds] = await Promise.all([header.boundingBox(), identity.boundingBox()]);
    expect(headerBounds!.height).toBeLessThanOrEqual(80);
    expect(identityBounds!.y).toBeGreaterThanOrEqual(headerBounds!.y);
    expect(identityBounds!.y + identityBounds!.height).toBeLessThanOrEqual(headerBounds!.y + headerBounds!.height);
    expect(identityBounds!.x + identityBounds!.width).toBeLessThanOrEqual(width);
    expect(identityBounds!.width).toBeGreaterThan(60);
    const materials = page.locator(".opening-spread__materials");
    await expect(materials.locator("img")).toHaveCount(2);
    for (const img of await materials.locator("img").all()) {
      await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      const box = await img.boundingBox();
      expect(box!.width).toBeGreaterThan(90);
      expect(box!.height).toBeGreaterThan(110);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }
    const geometry = await page.locator(".living-wordmark__word").evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return Array.from(element.children).every((child) => {
        const childBounds = child.getBoundingClientRect();
        return childBounds.left >= bounds.left && childBounds.right <= bounds.right + 1;
      });
    });
    expect(geometry).toBe(true);
    const gap = await page.evaluate(() => document.querySelector("#method h2")!.getBoundingClientRect().top - document.querySelector(".opening-spread__folio")!.getBoundingClientRect().bottom);
    expect(gap).toBeLessThanOrEqual(64);
  });
}

test("live reduced motion cancels all artwork, header, reveal and pointer motion permanently", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-header-identity]")).toBeVisible();
  const artwork = page.locator(".opening-spread__materials .editorial-artwork").first();
  await artwork.hover({ position: { x: 40, y: 40 } });
  await expect.poll(() => artwork.locator("[data-artwork-depth]").evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-header-identity]")).toHaveAttribute("data-motion", "static");
  await page.locator("#method").scrollIntoViewIfNeeded();
  await page.locator(".method-spread__modules a").first().hover();
  expect(await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").length)).toBe(0);
  for (const selector of ["[data-artwork-depth]", "[data-artwork-crop]", "[data-motion-item]", "[data-reveal]:not([data-artwork])"]) {
    const staticStates = await page.locator(selector).evaluateAll((elements) => elements.every((element) => {
      const style = getComputedStyle(element);
      return style.transform === "none" && style.opacity === "1" && (style.clipPath === "none" || style.clipPath === "inset(0px)");
    }));
    expect(staticStates, selector).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator('[data-spread="introduction"]').scrollIntoViewIfNeeded();
  await expect(page.locator("[data-header-identity]")).toHaveAttribute("data-motion", "static");
  expect(await page.locator("[data-reveal]").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).transform === "none"))).toBe(true);
});

test("server-rendered reveals, final identity and original imagery are visible without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.locator("[data-header-identity]")).toHaveText("Prizic");
    await expect(page.locator("[data-reveal]")).not.toHaveCount(0);
    for (const reveal of await page.locator("[data-reveal]").all()) await expect(reveal).toBeVisible();
    await expect(page.locator(".opening-spread__materials img")).toHaveCount(2);
  } finally {
    await context.close();
  }
});
