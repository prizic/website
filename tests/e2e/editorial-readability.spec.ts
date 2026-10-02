import { expect, test, type Locator, type Page } from "@playwright/test";

import { ACCENTS, SITE_CONTENT } from "./support";

test.use({ reducedMotion: "reduce" });

async function awaitDisplayFont(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  const font = await page.locator("h1").evaluate((element) => {
    const style = getComputedStyle(element);
    const family = style.fontFamily.split(",")[0];
    return {
      family,
      loaded: document.fonts.check(`${style.fontWeight} ${style.fontSize} ${family}`),
    };
  });
  expect(font.family).toContain("Space Grotesk");
  expect(font.loaded).toBe(true);
}

// Sample the actual composited paint beneath each character, including ancestor
// pseudo-elements. Hide only glyph fill during the in-memory screenshot: DOM
// geometry, backgrounds, opacity, and stacking remain intact. The glyph colour
// is then composited over each sampled pixel with its own alpha and the
// element's effective opacity, so translucent text is judged as painted.
async function paintedTextContrast(page: Page, text: Locator) {
  await text.scrollIntoViewIfNeeded();
  const metrics = await text.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const points: { x: number; y: number }[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      for (let i = 0; i < (node.textContent?.length ?? 0); i++) {
        if (!node.textContent?.[i].trim()) continue;
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        points.push({
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        });
      }
    }
    let opacity = 1;
    for (let node: Element | null = element; node; node = node.parentElement) {
      opacity *= Number(getComputedStyle(node).opacity);
    }
    return { color: getComputedStyle(element).color, opacity, points };
  });
  expect(metrics.points.length).toBeGreaterThan(0);
  const screenshot = await text.screenshot({
    scale: "css",
    style: "* { -webkit-text-fill-color: transparent !important; text-shadow: none !important; }",
  });
  return page.evaluate(async ({ metrics, png }) => {
    const image = new Image();
    image.src = `data:image/png;base64,${png}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
    context.drawImage(image, 0, 0);
    const swatch = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
    const luminance = (rgb: ArrayLike<number>) => {
      const linear = Array.from(rgb).slice(0, 3).map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    return Math.min(
      ...metrics.points.map(({ x, y }) => {
        const pixel = context.getImageData(
          Math.min(image.width - 1, Math.max(0, Math.floor(x))),
          Math.min(image.height - 1, Math.max(0, Math.floor(y))),
          1,
          1,
        ).data;
        swatch.globalAlpha = 1;
        swatch.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        swatch.fillRect(0, 0, 1, 1);
        swatch.globalAlpha = metrics.opacity;
        swatch.fillStyle = metrics.color;
        swatch.fillRect(0, 0, 1, 1);
        const foreground = luminance(swatch.getImageData(0, 0, 1, 1).data);
        const background = luminance(pixel);
        return (
          (Math.max(foreground, background) + 0.05) /
          (Math.min(foreground, background) + 0.05)
        );
      }),
    );
  }, { metrics, png: screenshot.toString("base64") });
}

async function chooseAccent(page: Page, accent: (typeof ACCENTS)[number]) {
  await page.getByRole("radio", { name: accent.label }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", accent.id);
}

for (const width of [320, 375, 768]) {
  for (const accent of ACCENTS) {
    test(`Contact copy and form clear their painted fields in ${accent.id} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/contact");
      await awaitDisplayFont(page);
      await chooseAccent(page, accent);
      const { contact } = SITE_CONTENT.pages;
      const folio = page.locator('header[aria-labelledby="page-title"] p').first();
      for (const text of [
        folio.locator("span").first(), // the folio index, set on the accent
        folio.locator("span").nth(1),
        page.getByText(contact.introduction),
        page.getByText(contact.reassurance),
        page.getByText(contact.form.topic, { exact: true }),
        page.getByText(contact.form.supportingText),
      ]) {
        expect(await paintedTextContrast(page, text), await text.textContent() ?? "").toBeGreaterThanOrEqual(4.5);
      }
      const form = page.getByRole("form", { name: "Project inquiry" });
      expect(await form.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
    });
  }
}

for (const accent of ACCENTS) {
  test(`homepage copy set on the ${accent.id} accent field stays readable`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await awaitDisplayFont(page);
    await chooseAccent(page, accent);
    const accentService = page.locator('[data-spread="services"] ol > li').nth(2);
    const firstStage = page.locator('[data-spread="delivery"] ol > li').first();
    const opening = page.locator('[data-spread="opening"]');
    for (const text of [
      opening.getByRole("link", { name: SITE_CONTENT.home.hero.actions[0].label }).locator("span"),
      accentService.locator("p").first(),
      accentService.locator("h3"),
      accentService.locator("p").nth(1),
      accentService.getByRole("listitem").first(),
      accentService.getByRole("link"),
      firstStage.locator("h3"),
      firstStage.locator("p"),
    ]) {
      expect(await paintedTextContrast(page, text), await text.textContent() ?? "").toBeGreaterThanOrEqual(4.5);
    }
  });
}

for (const accent of ACCENTS) {
  test(`open mobile routes retain painted contrast on focus and hover in ${accent.id}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await awaitDisplayFont(page);
    await chooseAccent(page, accent);
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Navigation" });
    await expect(dialog.getByRole("button", { name: "Close menu" })).toBeFocused();
    const links = dialog.getByRole("navigation", { name: "Mobile" }).getByRole("link");
    await expect(links).toHaveCount(SITE_CONTENT.navigation.length);
    for (const link of await links.all()) {
      const defaultBackground = await link.evaluate((element) => getComputedStyle(element).backgroundColor);
      await page.keyboard.press("Tab");
      await expect(link).toBeFocused();
      expect(await link.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
      expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
      expect(await paintedTextContrast(page, link), "keyboard focus contrast").toBeGreaterThanOrEqual(4.5);
      expect(await link.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(defaultBackground);
    }
    await dialog.getByRole("button", { name: "Close menu" }).focus();
    for (const link of await links.all()) {
      await page.mouse.move(0, 0);
      const defaultBackground = await link.evaluate((element) => getComputedStyle(element).backgroundColor);
      await link.hover();
      expect(await link.evaluate((element) => element.matches(":hover"))).toBe(true);
      expect(await paintedTextContrast(page, link), "pointer hover contrast").toBeGreaterThanOrEqual(4.5);
      expect(await link.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(defaultBackground);
    }
  });
}

const INTRO_ROUTES = ["/services/websites", "/services/business-software", "/services/automation", "/approach", "/contact"];

for (const width of [1024, 1280, 1440]) {
  test(`page titles and introductions separate with loaded fonts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of INTRO_ROUTES) {
      await page.goto(route);
      await awaitDisplayFont(page);
      const overlaps = await page.locator('header[aria-labelledby="page-title"]').evaluate((element) => {
        const textRects = (target: Element) => {
          const range = document.createRange();
          range.selectNodeContents(target);
          return Array.from(range.getClientRects());
        };
        const title = element.querySelector("h1")!;
        const copy = Array.from(element.querySelectorAll("p")).filter((paragraph) => !paragraph.contains(title));
        return textRects(title).some((titleRect) =>
          copy.some((paragraph) =>
            textRects(paragraph).some(
              (copyRect) =>
                titleRect.left < copyRect.right &&
                titleRect.right > copyRect.left &&
                titleRect.top < copyRect.bottom &&
                titleRect.bottom > copyRect.top,
            ),
          ),
        );
      });
      expect(overlaps, route).toBe(false);
    }
  });
}

for (const width of [320, 1280]) {
  test(`site navigation meets the 44px target at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await awaitDisplayFont(page);
    // Below the 900px breakpoint the header collapses to the menu button.
    const navigations = width < 900 ? ["Footer"] : ["Primary", "Footer"];
    for (const name of navigations) {
      for (const link of await page.getByRole("navigation", { name }).getByRole("link").all()) {
        const bounds = await link.boundingBox();
        expect(bounds!.width, `${name}: ${await link.textContent()}`).toBeGreaterThanOrEqual(44);
        expect(bounds!.height, `${name}: ${await link.textContent()}`).toBeGreaterThanOrEqual(44);
      }
    }
    if (width < 900) {
      const menu = await page.getByRole("button", { name: "Open menu" }).boundingBox();
      expect(menu!.width).toBeGreaterThanOrEqual(44);
      expect(menu!.height).toBeGreaterThanOrEqual(44);
    }
  });
}
