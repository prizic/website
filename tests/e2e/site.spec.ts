import { expect, test } from "@playwright/test";

const PUBLIC_ROUTES = [
  { path: "/", heading: "From possibility to working systems." },
  { path: "/thinking", heading: "Thinking" },
  { path: "/capabilities", heading: "Capabilities" },
  { path: "/partnerships", heading: "Partnerships" },
  { path: "/about", heading: "About Prizic" },
  { path: "/contact", heading: "Start a conversation" },
] as const;

test("the editorial type hierarchy uses the loaded brand fonts", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  for (const [selector, family] of [
    ["body", "Inter"],
    ["h1", "Space Grotesk"],
    [".folio-label", "JetBrains Mono"],
  ]) {
    const font = await page.locator(selector).first().evaluate((element) => {
      const style = getComputedStyle(element);
      const primaryFamily = style.fontFamily.split(",")[0];
      return {
        family: style.fontFamily,
        loaded: document.fonts.check(
          `${style.fontWeight} ${style.fontSize} ${primaryFamily}`,
        ),
      };
    });
    expect(font.family.split(",")[0].replaceAll('"', "")).toBe(family);
    expect(font.loaded).toBe(true);
  }
});

test.describe("public routes", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} responds successfully with one visible H1`, async ({
      page,
    }) => {
      const response = await page.goto(route.path);

      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1:visible")).toHaveCount(1);
      await expect(
        page.getByRole("heading", { level: 1, name: route.heading }),
      ).toBeVisible();
    });
  }
});

test("header navigation reaches every public destination", async ({ page }) => {
  const destinations = [
    { name: "Thinking", path: "/thinking" },
    { name: "Capabilities", path: "/capabilities" },
    { name: "Partnerships", path: "/partnerships" },
    { name: "About", path: "/about" },
  ] as const;

  for (const destination of destinations) {
    await page.goto("/");
    await page
      .locator("header")
      .getByRole("link", { name: destination.name, exact: true })
      .click();
    await expect(page).toHaveURL(destination.path);
  }

  await page.goto("/");
  await expect(
    page
      .locator("header")
      .getByRole("link", { name: "Start a conversation" }),
  ).toHaveAttribute("href", "mailto:preview@prizic.test");

  await page.goto("/thinking");
  await page
    .locator("header")
    .getByRole("link", { name: "Prizic home" })
    .click();
  await expect(page).toHaveURL("/");
});

test("no-JavaScript mobile navigation remains within a 320px viewport", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 640 },
  });
  const page = await context.newPage();

  await page.goto("/");

  const fallback = page.getByRole("navigation", { name: "Mobile fallback" });
  await expect(fallback).toBeVisible();

  for (const label of [
    "Thinking",
    "Capabilities",
    "Partnerships",
    "About",
    "Start a conversation",
  ]) {
    const link = fallback.getByRole("link", { name: label });
    await expect(link).toBeVisible();
    const bounds = await link.boundingBox();

    expect(bounds).not.toBeNull();
    expect(bounds?.x).toBeGreaterThanOrEqual(0);
    expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(320);
  }

  await context.close();
});

test("desktop keyboard order moves from the logo through the primary action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const focusOrder = [
    page.getByRole("link", { name: "Skip to content" }),
    page.getByRole("link", { name: "Prizic home" }),
    page.locator("header").getByRole("link", { name: "Thinking" }),
    page.locator("header").getByRole("link", { name: "Capabilities" }),
    page.locator("header").getByRole("link", { name: "Partnerships" }),
    page.locator("header").getByRole("link", { name: "About", exact: true }),
    page.locator("header").getByRole("radio", { name: "Prizic cyan" }),
  ];

  for (const target of focusOrder) {
    await page.keyboard.press("Tab");
    await expect(target).toBeFocused();
  }

  await page.keyboard.press("ArrowRight");
  await expect(
    page.locator("header").getByRole("radio", { name: "Electric lime" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.locator("header").getByRole("radio", { name: "Signal yellow" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page
      .locator("header")
      .getByRole("link", { name: "Start a conversation" }),
  ).toBeFocused();
});

test("the branded missing route returns visitors home", async ({ page }) => {
  const response = await page.goto("/this-path-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.locator("h1:visible")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "That path does not exist." }),
  ).toBeVisible();
  await expect(
    page.locator('main img[src="/brand/prizic-mark-on-dark.svg"]'),
  ).toBeVisible();

  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL("/");
});
