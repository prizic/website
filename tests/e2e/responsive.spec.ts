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
