import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/",
  "/thinking",
  "/capabilities",
  "/partnerships",
  "/about",
  "/contact",
] as const;

for (const route of PUBLIC_ROUTES) {
  test(`${route} has no serious or critical automated accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("h1:visible")).toHaveCount(1);

    const results = await new AxeBuilder({ page }).analyze();
    const materialViolations = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(materialViolations).toEqual([]);
  });
}

test("reduced motion exposes the settled wordmark and complete process", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const wordmark = page
    .locator(".living-wordmark__figure")
    .filter({ visible: true });
  await expect(wordmark).toHaveAttribute("data-word", "Prizic");

  const visibleSystem = page
    .locator(".home-system .prizic-blueprint")
    .filter({ visible: true });
  await expect(visibleSystem.locator("strong")).toHaveText([
    "Question",
    "Direction",
    "Software",
    "Learning",
  ]);
  await expect(
    visibleSystem.locator('[data-route-progress][data-motion="static"]'),
  ).toBeVisible();
});

test("core homepage content and navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:3100",
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "From possibility to working systems.",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
      ),
    ).toBeVisible();

    const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNavigation.getByRole("link")).toHaveText([
      "Thinking",
      "Capabilities",
      "Partnerships",
      "About",
    ]);

    const visibleSystem = page
      .locator(".home-system .prizic-blueprint")
      .filter({ visible: true });
    await expect(visibleSystem.locator("strong")).toHaveText([
      "Question",
      "Direction",
      "Software",
      "Learning",
    ]);
  } finally {
    await context.close();
  }
});
