import { expect, test } from "@playwright/test";

for (const width of [320, 375, 768, 1280, 1440]) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  });
}

for (const width of [320, 375, 768]) {
  test(`mobile navigation opens and closes accessibly at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/");

    const openMenu = page.getByRole("button", { name: "Open menu" });
    await expect(openMenu).toBeVisible();

    const triggerSize = await openMenu.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    });
    expect(triggerSize.width).toBeGreaterThanOrEqual(44);
    expect(triggerSize.height).toBeGreaterThanOrEqual(44);

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

test("mobile navigation remains scrollable in a short landscape viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation" });
  const about = menu.getByRole("link", { name: "About" });
  const contact = menu.getByRole("link", { name: "Start a conversation" });

  await expect(menu).toBeVisible();
  await expect(about).toBeVisible();
  await about.scrollIntoViewIfNeeded();
  await expect(about).toBeInViewport();
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeInViewport();
  await expect(contact).toBeEnabled();
  await expect(contact).toHaveAttribute("href", "mailto:preview@prizic.test");

  const scrollState = await menu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    overflowY: getComputedStyle(element).overflowY,
    scrollHeight: element.scrollHeight,
  }));
  expect(scrollState.overflowY).toBe("auto");
  expect(scrollState.scrollHeight).toBeGreaterThan(scrollState.clientHeight);
});

test("the compact process keeps all four stages in document order", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const compactSystem = page.locator(
    ".home-system .home-blueprint--compact .prizic-blueprint__stages",
  );
  await expect(compactSystem).toBeVisible();
  await expect(compactSystem.locator("strong")).toHaveText([
    "Question",
    "Direction",
    "Software",
    "Learning",
  ]);
});

test("the stronger Anchor signal stays inside the narrow mobile frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto("/", { waitUntil: "networkidle" });

  const signal = page.locator(
    ".home-hero__wordmark .living-wordmark__figure",
  );
  const bounds = await signal.boundingBox();

  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  expect(bounds!.height).toBeGreaterThanOrEqual(64);
  await expect(signal.locator("[data-signal-field]")).toBeVisible();
});
