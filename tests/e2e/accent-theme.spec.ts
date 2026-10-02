import { expect, test } from "@playwright/test";

import { ACCENTS, PUBLIC_PATHS } from "./support";

test("accent selection persists across routes and reloads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "cyan");
  await page.getByRole("radio", { name: "Electric lime" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Services" })
    .click();
  await expect(page).toHaveURL("/services");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");
  await expect(page.getByRole("radio", { name: "Electric lime" })).toBeChecked();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");
  await expect(page.getByRole("radio", { name: "Electric lime" })).toBeChecked();
});

test("all approved accents expose their exact tokens across every route", async ({ page }) => {
  await page.goto("/");
  for (const accent of ACCENTS) {
    const radio = page.getByRole("radio", { name: accent.label });
    const bounds = await radio.boundingBox();
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    await radio.check();
    for (const route of PUBLIC_PATHS) {
      await page.goto(route);
      const html = page.locator("html");
      await expect(html, route).toHaveAttribute("data-accent", accent.id);
      await expect(page.getByRole("radio", { name: accent.label }), route).toBeChecked();
      const tokens = await html.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          accent: style.getPropertyValue("--color-accent").trim(),
          ink: style.getPropertyValue("--color-accent-ink").trim(),
        };
      });
      expect(tokens, route).toEqual({ accent: accent.color, ink: accent.ink });
    }
  }
});

test("a stored accent is applied before any bundle runs", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL });
  await context.addInitScript(() => localStorage.setItem("prizic-accent", "yellow"));
  const page = await context.newPage();
  try {
    // Only the inline bootstrap script can apply it when the bundles never load.
    await page.route("**/_next/static/**/*.js", (route) => route.abort());
    await page.goto("/contact");
    await expect(page.locator("html")).toHaveAttribute("data-accent", "yellow");
    expect(
      await page.locator("html").evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--color-accent").trim(),
      ),
    ).toBe("#eff300");
  } finally {
    await context.close();
  }
});

test("accent remains usable when local storage is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get: () => {
        throw new Error("Storage disabled");
      },
    });
  });
  await page.goto("/");
  await page.getByRole("radio", { name: "Signal yellow" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "yellow");
  await expect(page.getByRole("radio", { name: "Signal yellow" })).toBeChecked();
});
