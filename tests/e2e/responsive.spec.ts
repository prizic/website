import { expect, test, type Locator } from "@playwright/test";

import { PUBLIC_PATHS, SITE_CONTENT } from "./support";

const WIDTHS = [320, 390, 768, 1024, 1440];

async function expectInsideViewport(element: Locator, width: number) {
  await expect(element).toBeVisible();
  const box = await element.boundingBox();
  expect(box!.width).toBeGreaterThan(0);
  expect(box!.height).toBeGreaterThan(0);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width);
}

for (const width of WIDTHS) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);

    for (const [element, count] of [
      [page.locator('[data-spread="opening"] [data-artwork="fold"]').locator("xpath=../.."), 1],
      [page.locator('[data-spread="services"] ol > li'), SITE_CONTENT.home.services.items.length],
      [page.locator('[data-spread="delivery"] ol > li'), SITE_CONTENT.home.delivery.stages.length],
      [page.locator('[data-spread="closing"]').getByRole("link", { name: SITE_CONTENT.home.closing.emailLabel }), 1],
      [page.getByRole("group", { name: "Accent color" }), 1],
    ] as const) {
      await expect(element).toHaveCount(count);
      for (const item of await element.all()) await expectInsideViewport(item, width);
    }

    if (width < 768) {
      for (const list of ['[data-spread="services"] ol > li', '[data-spread="delivery"] ol > li']) {
        const positions = await page.locator(list).evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().top));
        expect(positions.every((top, index) => index === 0 || top > positions[index - 1]), list).toBe(true);
      }
      await expect(page.locator('[data-spread="delivery"] h3')).toHaveText(SITE_CONTENT.home.delivery.stages.map((stage) => stage.title));
    }
  });

  test(`supporting routes have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [...PUBLIC_PATHS.filter((path) => path !== "/"), "/missing-page"]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), route).toBe(true);
      await expect(page.locator("h1"), route).toBeVisible();
      await expectInsideViewport(page.locator("h1"), width);
    }
  });
}

test("the inquiry form fits every width without horizontal overflow", async ({ page }) => {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    const form = page.getByRole("form", { name: "Project inquiry" });
    await expectInsideViewport(form, width);
    const controls = [...(await form.getByRole("textbox").all()), ...(await form.getByRole("radio").all()), form.getByRole("button")];
    expect(controls.length).toBeGreaterThan(10);
    for (const control of controls) {
      await expectInsideViewport(control, width);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${width}px`).toBe(true);
  }
});

for (const width of [320, 390, 768]) {
  test(`mobile navigation opens and closes accessibly at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/");

    const openMenu = page.getByRole("button", { name: "Open menu" });
    await expect(openMenu).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    const triggerSize = await openMenu.boundingBox();
    expect(triggerSize!.width).toBeGreaterThanOrEqual(44);
    expect(triggerSize!.height).toBeGreaterThanOrEqual(44);

    await openMenu.click();
    const menu = page.getByRole("dialog", { name: "Navigation" });
    await expect(menu).toBeVisible();
    await expect(openMenu).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(menu).toBeHidden();
    await expect(openMenu).toHaveAttribute("aria-expanded", "false");
    await expect(openMenu).toBeFocused();
  });
}

test("a mobile menu link navigates and closes the menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation" });
  await menu.getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL("/approach");
  await expect(menu).toBeHidden();
  await expect(page.getByRole("heading", { level: 1, name: SITE_CONTENT.pages.approach.title })).toBeVisible();
});

test("the open mobile menu closes when the viewport widens to desktop", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  expect(await page.locator("body").evaluate((element) => getComputedStyle(element).overflow)).not.toBe("hidden");
});

test("mobile navigation remains scrollable in a short landscape viewport", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation" });
  const contactLink = menu.getByRole("link", { name: "Contact", exact: true });
  const action = menu.getByRole("link", { name: SITE_CONTENT.headerAction.label });

  await expect(menu).toBeVisible();
  await contactLink.scrollIntoViewIfNeeded();
  await expect(contactLink).toBeInViewport();
  await action.scrollIntoViewIfNeeded();
  await expect(action).toBeInViewport();
  await expect(action).toHaveAttribute("href", SITE_CONTENT.headerAction.href);

  const scrollState = await menu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    overflowY: getComputedStyle(element).overflowY,
    scrollHeight: element.scrollHeight,
  }));
  expect(scrollState.overflowY).toBe("auto");
  expect(scrollState.scrollHeight).toBeGreaterThan(scrollState.clientHeight);
});

test("the living wordmark stays inside the narrow mobile feature", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto("/", { waitUntil: "networkidle" });

  const signal = page.locator('[data-spread="opening"]').getByRole("img", { name: "Prizic" });
  const bounds = await signal.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  expect(bounds!.height).toBeGreaterThanOrEqual(64);
  await expect(signal.locator("[data-signal-field]")).toBeVisible();
  const word = await signal.locator("[data-display-word]").boundingBox();
  expect(word!.x + word!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
});
