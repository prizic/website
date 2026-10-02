import { expect, test } from "@playwright/test";

import { CONTACT_URL, LEGACY_REDIRECTS, PUBLIC_ROUTES, SITE_CONTENT } from "./support";

test("the editorial type hierarchy uses the loaded brand fonts", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  for (const [target, family] of [
    [page.locator("body"), "Inter"],
    [page.locator("h1"), "Space Grotesk"],
    [page.getByRole("navigation", { name: "Primary" }).getByRole("link").first(), "JetBrains Mono"],
  ] as const) {
    const font = await target.first().evaluate((element) => {
      const style = getComputedStyle(element);
      const primaryFamily = style.fontFamily.split(",")[0];
      return {
        family: style.fontFamily,
        loaded: document.fonts.check(`${style.fontWeight} ${style.fontSize} ${primaryFamily}`),
      };
    });
    expect(font.family.split(",")[0].replaceAll('"', "").replaceAll("'", "")).toBe(family);
    expect(font.loaded).toBe(true);
  }
});

test.describe("public routes", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} responds successfully with one visible H1`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1:visible")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    });
  }
});

test.describe("legacy routes", () => {
  for (const { from, to } of LEGACY_REDIRECTS) {
    test(`${from} permanently redirects to ${to}`, async ({ page, request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(to);

      await page.goto(from);
      await expect(page).toHaveURL(to);
      const heading = PUBLIC_ROUTES.find((route) => route.path === to)!.heading;
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
  }
});

test("header navigation reaches every public destination", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const destination of SITE_CONTENT.navigation) {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: destination.label, exact: true }).click();
    await expect(page).toHaveURL(destination.href);
  }

  await page.goto("/");
  const action = page.getByRole("banner").getByRole("link", { name: SITE_CONTENT.headerAction.label });
  await expect(action).toHaveAttribute("href", "/contact");
  await action.click();
  await expect(page).toHaveURL("/contact");
  await expect(page.getByRole("form", { name: "Project inquiry" })).toBeVisible();

  await page.getByRole("banner").getByRole("link", { name: "Prizic home" }).click();
  await expect(page).toHaveURL("/");
});

test("footer navigation reaches every public destination", async ({ page }) => {
  for (const destination of SITE_CONTENT.navigation) {
    await page.goto("/about");
    await page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: destination.label, exact: true }).click();
    await expect(page).toHaveURL(destination.href);
  }
});

test("services, situations and service pages link to each other", async ({ page }) => {
  await page.goto("/services");
  for (const service of SITE_CONTENT.home.services.items) {
    await page.goto("/services");
    await page.locator('[data-spread="services"]').getByRole("link", { name: service.link.label }).click();
    await expect(page).toHaveURL(service.link.href);
    await expect(page.locator('[data-spread="service-lead"]')).toBeVisible();
    await expect(page.locator('[data-spread="service-capabilities"] li')).toHaveCount(SITE_CONTENT.pages.service[service.slug].capabilities.length);
    await expect(page.locator('[data-spread="service-delivery"]')).toBeVisible();
    await page.locator('[data-spread="service-delivery"]').getByRole("link", { name: SITE_CONTENT.pages.service[service.slug].action.label }).click();
    await expect(page).toHaveURL("/contact");
  }

  await page.goto("/");
  const situations = page.locator('[data-spread="situations"]').getByRole("link");
  await expect(situations).toHaveCount(SITE_CONTENT.home.situations.items.length);
  expect(await situations.evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(
    SITE_CONTENT.home.situations.items.map((item) => item.href),
  );
});

test("direct contact actions use the configured inbox", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('header[aria-labelledby="page-title"]').getByRole("link", { name: SITE_CONTENT.pages.contact.emailLabel })).toHaveAttribute("href", CONTACT_URL);
  await page.goto("/");
  await expect(page.locator('[data-spread="closing"]').getByRole("link", { name: SITE_CONTENT.home.closing.emailLabel })).toHaveAttribute("href", CONTACT_URL);
});

test("unknown service slugs return the branded missing route", async ({ page }) => {
  const response = await page.goto("/services/not-a-service");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: SITE_CONTENT.pages.notFound.title })).toBeVisible();
});

test("no-JavaScript mobile navigation remains within a 320px viewport", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 320, height: 640 } });
  const page = await context.newPage();
  try {
    await page.goto("/");
    const fallback = page.getByRole("navigation", { name: "Mobile fallback" });
    await expect(fallback).toBeVisible();
    for (const label of [...SITE_CONTENT.navigation.map((item) => item.label), SITE_CONTENT.headerAction.label]) {
      const link = fallback.getByRole("link", { name: label, exact: true });
      await expect(link).toBeVisible();
      const bounds = await link.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  } finally {
    await context.close();
  }
});

test("desktop keyboard order moves from the logo through the primary action", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const header = page.getByRole("banner");

  const focusOrder = [
    page.getByRole("link", { name: "Skip to content" }),
    header.getByRole("link", { name: "Prizic home" }),
    ...SITE_CONTENT.navigation.map((item) => header.getByRole("link", { name: item.label, exact: true })),
    header.getByRole("radio", { name: "Prizic cyan" }),
  ];
  for (const target of focusOrder) {
    await page.keyboard.press("Tab");
    await expect(target).toBeFocused();
  }

  await page.keyboard.press("ArrowRight");
  await expect(header.getByRole("radio", { name: "Electric lime" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(header.getByRole("radio", { name: "Signal yellow" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(header.getByRole("link", { name: SITE_CONTENT.headerAction.label })).toBeFocused();
});

test("the skip link moves keyboard users to the main content", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.getElementById("main-content")!.contains(document.activeElement))).toBe(true);
});

test("the branded missing route returns visitors home", async ({ page }) => {
  const response = await page.goto("/this-path-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1:visible")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: SITE_CONTENT.pages.notFound.title })).toBeVisible();
  await expect(page.locator('main img[src="/brand/prizic-mark-on-dark.svg"]')).toBeVisible();
  await page.getByRole("link", { name: SITE_CONTENT.pages.notFound.action.label }).click();
  await expect(page).toHaveURL("/");
});
