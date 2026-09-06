import { expect, test } from "@playwright/test";

test("accent selection persists across routes and reloads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "cyan");
  await page.getByRole("radio", { name: "Electric lime" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");

  await page.locator("header").getByRole("link", { name: "Thinking" }).click();
  await expect(page).toHaveURL("/thinking");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");
  await expect(page.getByRole("radio", { name: "Electric lime" })).toBeChecked();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");
  await expect(page.getByRole("radio", { name: "Electric lime" })).toBeChecked();
});

test("all approved accents expose their exact token across every route", async ({ page }) => {
  await page.goto("/");
  const expected = { cyan: "#00d9ff", lime: "#65ed9d", yellow: "#eff300" };
  for (const [accent, color] of Object.entries(expected)) {
    const bounds = await page.getByRole("radio", { name: new RegExp(accent, "i") }).boundingBox();
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    await page.getByRole("radio", { name: new RegExp(accent, "i") }).check();
    for (const route of ["/", "/thinking", "/capabilities", "/partnerships", "/about", "/contact"]) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-accent", accent);
      await expect(page.getByRole("radio", { name: new RegExp(accent, "i") })).toBeChecked();
      expect(await page.locator("html").evaluate((element) => getComputedStyle(element).getPropertyValue("--accent").trim())).toBe(color);
    }
  }
});

test("accent remains usable when local storage is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get: () => { throw new Error("Storage disabled"); } });
  });
  await page.goto("/");
  await page.getByRole("radio", { name: "Signal yellow" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "yellow");
});
