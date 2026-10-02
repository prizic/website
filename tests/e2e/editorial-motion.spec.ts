import { expect, test, type Locator, type Page } from "@playwright/test";

import { nextFrames, runningAnimations, settleAnimations } from "./support";

test.use({ viewport: { width: 1440, height: 900 } });

/** Space between the end of the opening spread and the introduction's first content. */
async function openingToIntroductionGap(page: Page) {
  return page.evaluate(() => {
    const opening = document.querySelector('[data-spread="opening"]')!.getBoundingClientRect();
    const content = document.querySelector('[data-spread="introduction"] > *')!.getBoundingClientRect();
    return content.top - opening.bottom;
  });
}

/** Tailwind v4 moves elements with the individual `translate` property. */
function translation(arrow: Locator) {
  return arrow.evaluate((element) => {
    const value = getComputedStyle(element).translate;
    const [x = "0", y = "0"] = value === "none" ? [] : value.split(" ");
    return { x: parseFloat(x), y: parseFloat(y) };
  });
}

function orbitDetails(page: Page) {
  const artwork = page.locator('[data-spread="connected"] [data-artwork="orbit"]');
  return { artwork, details: artwork.locator(":scope > svg > g, :scope > span") };
}

test("the introduction follows the opening folio without a dead vertical band", async ({ page }) => {
  await page.goto("/");
  expect(await openingToIntroductionGap(page)).toBeLessThanOrEqual(64);
});

test("the orbit and its accent line stay still before first entry", async ({ page }) => {
  await page.goto("/");
  const { artwork, details } = orbitDetails(page);
  await expect(artwork).toHaveAttribute("data-motion", "enabled");
  await expect(artwork).not.toBeInViewport();
  await expect(details).toHaveCount(2);
  expect(await details.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName))).toEqual(["none", "none"]);
  expect(await details.evaluateAll((elements) => elements.flatMap((element) => element.getAnimations()).length)).toBe(0);
});

test("the orbit and its accent line play on first entry and never replay on re-entry", async ({ page }) => {
  await page.goto("/");
  const { artwork, details } = orbitDetails(page);
  await expect(artwork).toHaveAttribute("data-motion", "enabled");
  await expect(artwork).not.toBeInViewport();
  expect(await details.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName))).toEqual(["none", "none"]);

  await artwork.evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(artwork).toHaveAttribute("data-entered", "true");
  await expect.poll(() => details.evaluateAll((elements) => elements.every((element) => element.getAnimations().some((animation) => animation.playState === "running")))).toBe(true);
  await details.evaluateAll(async (elements) => {
    await Promise.all(elements.flatMap((element) => element.getAnimations().map((animation) => animation.finished)));
  });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(artwork).not.toBeInViewport();
  await artwork.evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(artwork).toBeInViewport();
  await nextFrames(page);
  expect(await details.evaluateAll((elements) => elements.flatMap((element) => element.getAnimations()).filter((animation) => animation.playState === "running").length)).toBe(0);
});

test("live reduction cancels an entered orbit and its accent line without restarting", async ({ page }) => {
  await page.goto("/");
  const { artwork, details } = orbitDetails(page);
  await artwork.evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect.poll(() => details.evaluateAll((elements) => elements.every((element) => element.getAnimations().some((animation) => animation.playState === "running")))).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(artwork).toHaveAttribute("data-motion", "static");
  expect(await details.evaluateAll((elements) => elements.map((element) => ({ transform: getComputedStyle(element).transform, running: element.getAnimations().filter((animation) => animation.playState === "running").length })))).toEqual([{ transform: "none", running: 0 }, { transform: "none", running: 0 }]);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await artwork.evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(artwork).toHaveAttribute("data-motion", "static");
  expect(await details.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName))).toEqual(["none", "none"]);
});

for (const width of [320, 375]) {
  test(`short mobile artwork keeps its image beyond both panel edges during parallax at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/");
    const artwork = page.locator('[data-spread="introduction"] [data-artwork]').first();
    const image = artwork.locator("[data-artwork-parallax]");
    for (const top of [40, 640]) {
      await artwork.evaluate((element, targetTop) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - targetTop, behavior: "instant" }), top);
      await expect(artwork).toBeInViewport();
      await nextFrames(page);
      await expect.poll(() => image.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
      const coverage = await artwork.evaluate((element) => {
        const panel = element.getBoundingClientRect();
        const picture = element.querySelector("[data-artwork-parallax]")!.getBoundingClientRect();
        return { top: picture.top - panel.top, bottom: panel.bottom - picture.bottom };
      });
      expect(coverage.top).toBeLessThanOrEqual(0);
      expect(coverage.bottom).toBeLessThanOrEqual(0);
    }
  });
}

test("every directional arrow travels on hover and keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Tab changes focus and scroll position between links; keep that scroll
    // from moving the next hovered target away from the stationary pointer.
    document.documentElement.style.scrollBehavior = "auto";
  });
  const links = page.locator("a:visible:has(svg[data-direction])");
  expect(await links.count()).toBeGreaterThan(10);
  for (const link of await links.all()) {
    const arrow = link.locator("svg[data-direction]");
    await link.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await link.evaluate((element) => (element as HTMLElement).blur());
    const direction = await arrow.getAttribute("data-direction");
    const travelled = direction === "down" ? { x: 0, y: 5 } : { x: 4, y: -4 };
    await expect.poll(() => translation(arrow)).toEqual({ x: 0, y: 0 });
    await link.hover();
    await expect.poll(() => translation(arrow)).toEqual(travelled);
    await page.mouse.move(0, 0);
    await page.keyboard.press("Tab");
    await link.focus();
    await expect.poll(() => translation(arrow)).toEqual(travelled);
  }
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`opening material crops and wordmark geometry stay composed at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const header = page.getByRole("banner");
    const identity = page.locator("[data-header-identity]");
    await expect(identity).toHaveText("Prizic");
    const [headerBounds, identityBounds] = await Promise.all([header.boundingBox(), identity.boundingBox()]);
    expect(headerBounds!.height).toBeLessThanOrEqual(80);
    expect(identityBounds!.y).toBeGreaterThanOrEqual(headerBounds!.y);
    expect(identityBounds!.y + identityBounds!.height).toBeLessThanOrEqual(headerBounds!.y + headerBounds!.height);
    expect(identityBounds!.x + identityBounds!.width).toBeLessThanOrEqual(width);
    expect(identityBounds!.width).toBeGreaterThan(60);

    const materials = page.locator('[data-spread="opening"] [data-artwork] img');
    await expect(materials).toHaveCount(2);
    for (const img of await materials.all()) {
      await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      const box = await img.boundingBox();
      expect(box!.width).toBeGreaterThan(90);
      expect(box!.height).toBeGreaterThan(110);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }

    // The changing word and its anchors stay inside the wordmark.
    const geometry = await page.getByRole("img", { name: "Prizic" }).evaluate((figure) => {
      const bounds = figure.getBoundingClientRect();
      const row = figure.querySelector("[data-display-word]")!.parentElement!;
      return Array.from(row.children).every((child) => {
        const childBounds = child.getBoundingClientRect();
        return childBounds.left >= bounds.left - 1 && childBounds.right <= bounds.right + 1;
      });
    });
    expect(geometry).toBe(true);
    expect(await openingToIntroductionGap(page)).toBeLessThanOrEqual(64);
  });
}

test("live reduced motion cancels all artwork, header, reveal and pointer motion permanently", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-header-identity]")).toHaveAttribute("data-motion", "enabled");
  // Reducing mid-entrance is covered separately below (known bug). Motion
  // drives these entrances from JavaScript, so wait on their styles rather
  // than document.getAnimations().
  await settleAnimations(page);
  await expect.poll(() => page.locator('[data-entered="true"] :is([data-motion-item], [data-artwork-crop])').evaluateAll((elements) => elements.every((element) => getComputedStyle(element).transform === "none")), { timeout: 10_000 }).toBe(true);
  const artwork = page.locator('[data-spread="opening"] [data-artwork]').first();
  await artwork.hover({ position: { x: 40, y: 40 } });
  await expect.poll(() => artwork.locator("[data-artwork-depth]").evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-header-identity]")).toHaveAttribute("data-motion", "static");
  await page.locator('[data-spread="services"]').scrollIntoViewIfNeeded();
  await page.locator('[data-spread="services"] a').first().hover();
  expect(await runningAnimations(page)).toBe(0);
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
  await expect(page.locator("[data-reveal]").first()).toHaveAttribute("data-motion", "static");
  expect(await page.locator("[data-reveal]").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).transform === "none"))).toBe(true);
  expect(await runningAnimations(page)).toBe(0);
});

test("live reduced motion during the entrance settles every entering element to its still frame", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-spread="opening"]')).toHaveAttribute("data-entered", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-header-identity]")).toHaveAttribute("data-motion", "static");
  await nextFrames(page);
  const moved = await page.locator("[data-motion-item], [data-artwork-crop]").evaluateAll((elements) =>
    elements
      .map((element) => ({ element, style: getComputedStyle(element) }))
      .filter(({ style }) => style.transform !== "none" || style.opacity !== "1" || !["none", "inset(0px)"].includes(style.clipPath))
      .map(({ element, style }) => `${element.tagName.toLowerCase()} in ${element.closest("[data-spread]")?.getAttribute("data-spread")}: ${style.transform}`),
  );
  expect(moved).toEqual([]);
});

test("server-rendered reveals, final identity and original imagery are visible without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.locator("[data-header-identity]")).toHaveText("Prizic");
    await expect(page.getByRole("img", { name: "Prizic" })).toHaveAttribute("data-word", "Prizic");
    await expect(page.locator("[data-reveal]")).not.toHaveCount(0);
    for (const reveal of await page.locator("[data-reveal]").all()) await expect(reveal).toBeVisible();
    for (const item of await page.locator("[data-motion-item]").all()) await expect(item).toBeVisible();
    await expect(page.locator('[data-spread="opening"] [data-artwork] img')).toHaveCount(2);
  } finally {
    await context.close();
  }
});
