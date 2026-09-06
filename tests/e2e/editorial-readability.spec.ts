import { expect, test, type Locator, type Page } from "@playwright/test";

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
// geometry, currentColor, backgrounds, opacity, and stacking remain intact.
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
        points.push({
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        });
      }
    }
    return { color: getComputedStyle(element).color, points };
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
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0);
    const luminance = (rgb: number[]) => {
      const linear = rgb.map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const foreground = luminance(
      metrics.color.match(/[\d.]+/g)!.slice(0, 3).map(Number),
    );
    return Math.min(
      ...metrics.points.map(({ x, y }) => {
        const pixel = context.getImageData(
          Math.min(image.width - 1, Math.max(0, Math.floor(x))),
          Math.min(image.height - 1, Math.max(0, Math.floor(y))),
          1,
          1,
        ).data;
        const background = luminance(Array.from(pixel).slice(0, 3));
        return (
          (Math.max(foreground, background) + 0.05) /
          (Math.min(foreground, background) + 0.05)
        );
      }),
    );
  }, { metrics, png: screenshot.toString("base64") });
}

for (const width of [320, 375, 768]) {
  for (const accent of ["cyan", "lime", "yellow"]) {
    test(
      `Contact copy clears the painted ${accent} field at ${width}px`,
      async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/contact");
        await awaitDisplayFont(page);
        await page
          .getByRole("radio", { name: new RegExp(accent, "i") })
          .check();
        await expect(page.locator("html")).toHaveAttribute(
          "data-accent",
          accent,
        );
        const contrast = await paintedTextContrast(
          page,
          page.locator(".contact-page__grid > p"),
        );
        expect(contrast).toBeGreaterThanOrEqual(4.5);
        const prompts = page.getByRole("list", { name: "What to include" });
        expect(
          await prompts.evaluate(
            (element) => getComputedStyle(element).backgroundColor,
          ),
        ).not.toBe("rgba(0, 0, 0, 0)");
      },
    );
  }
}

for (const accent of ["cyan", "lime", "yellow"]) {
  test(
    `open mobile routes retain painted contrast on focus and hover in ${accent}`,
    async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("/");
      await awaitDisplayFont(page);
      await page
        .getByRole("radio", { name: new RegExp(accent, "i") })
        .check();
      await page.getByRole("button", { name: "Open menu" }).click();
      const dialog = page.getByRole("dialog", { name: "Navigation" });
      await expect(
        dialog.getByRole("button", { name: "Close menu" }),
      ).toBeFocused();
      for (const link of await dialog
        .locator(".mobile-menu__navigation a")
        .all()) {
        const defaultBackground = await link.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        );
        await page.keyboard.press("Tab");
        await expect(link).toBeFocused();
        expect(
          await link.evaluate((element) => element.matches(":focus-visible")),
        ).toBe(true);
        expect(
          await link.evaluate(
            (element) => getComputedStyle(element).outlineStyle,
          ),
        ).toBe("solid");
        expect(
          await paintedTextContrast(page, link),
          "keyboard focus contrast",
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          await link.evaluate(
            (element) => getComputedStyle(element).backgroundColor,
          ),
        ).not.toBe(defaultBackground);
      }
      await dialog.getByRole("button", { name: "Close menu" }).focus();
      for (const link of await dialog
        .locator(".mobile-menu__navigation a")
        .all()) {
        await page.mouse.move(0, 0);
        const defaultBackground = await link.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        );
        await link.hover();
        expect(await link.evaluate((element) => element.matches(":hover"))).toBe(
          true,
        );
        expect(
          await paintedTextContrast(page, link),
          "pointer hover contrast",
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          await link.evaluate(
            (element) => getComputedStyle(element).backgroundColor,
          ),
        ).not.toBe(defaultBackground);
      }
    },
  );
}

for (const width of [1280, 1440]) {
  test(`Capabilities title and introduction separate with loaded fonts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/capabilities");
    await awaitDisplayFont(page);
    const overlaps = await page
      .locator(".capabilities-page__intro .page-intro__grid")
      .evaluate((element) => {
        const textRects = (selector: string) => {
          const range = document.createRange();
          range.selectNodeContents(element.querySelector(selector)!);
          return Array.from(range.getClientRects());
        };
        return textRects("h1").some((title) =>
          textRects("p").some(
            (copy) =>
              title.left < copy.right &&
              title.right > copy.left &&
              title.top < copy.bottom &&
              title.bottom > copy.top,
          ),
        );
      });
    expect(overlaps).toBe(false);
  });
}

for (const width of [320, 1280]) {
  test(`About navigation meets the 44px target at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await awaitDisplayFont(page);
    const navigation =
      width === 320
        ? ".site-footer__navigation"
        : ".site-header__navigation";
    const bounds = await page
      .locator(navigation)
      .getByRole("link", { name: "About" })
      .boundingBox();
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  });
}
