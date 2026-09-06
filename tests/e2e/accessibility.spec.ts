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

test("keyboard focus remains visible on accent swatches", async ({ page }) => {
  await page.goto("/");
  const cyan = page.getByRole("radio", { name: "Prizic cyan" });
  await cyan.focus();
  await page.keyboard.press("ArrowRight");
  const lime = page.getByRole("radio", { name: "Electric lime" });
  await expect(lime).toBeFocused();
  await expect(lime).toBeChecked();
  const swatch = lime.locator("+ span");
  expect(await swatch.evaluate((element) => getComputedStyle(element).outlineColor)).toBe("rgb(17, 18, 15)");
});

test("keyboard focus remains inside clipped method panels", async ({ page }) => {
  await page.goto("/");
  const methodLink = page.locator(".method-spread__modules a").first();
  await methodLink.focus();
  await expect(methodLink).toBeFocused();
  const focusStyle = await methodLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { style: style.outlineStyle, offset: parseFloat(style.outlineOffset), width: parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.style).toBe("solid");
  expect(focusStyle.width).toBeGreaterThanOrEqual(2);
  expect(focusStyle.offset).toBeLessThanOrEqual(-focusStyle.width);
});

test("enabling reduced motion during playback immediately settles the wordmark", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: "Replay Prizic word animation" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".living-wordmark__figure")).toHaveAttribute("data-word", "Prizic", { timeout: 500 });
  await expect(page.getByRole("button", { name: "Replay Prizic word animation" })).toBeHidden();
});

test("mobile dialog traps keyboard focus, locks scroll, and restores focus on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  const close = dialog.getByRole("button", { name: "Close menu" });
  await expect(close).toBeFocused();
  expect(await page.locator("body").evaluate((element) => getComputedStyle(element).overflow)).toBe("hidden");
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Start a conversation" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  for (const target of await dialog.locator("a, button").all()) {
    const box = await target.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(await page.locator("body").evaluate((element) => getComputedStyle(element).overflow)).not.toBe("hidden");
});

for (const route of PUBLIC_ROUTES) {
  test(`${route} has no serious or critical automated accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("h1:visible")).toHaveCount(1);

    for (const accent of ["cyan", "lime", "yellow"]) {
      await page.getByRole("radio", { name: new RegExp(accent, "i") }).check();
      const results = await new AxeBuilder({ page }).analyze();
      const materialViolations = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(materialViolations, accent).toEqual([]);
    }
  });
}

test("reduced motion exposes the settled wordmark and complete process", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );

  const wordmark = page
    .locator(".living-wordmark__figure")
    .filter({ visible: true });
  const initialWordmarkState = await wordmark.evaluate((element) => {
    const displayWord = element.querySelector<HTMLElement>(
      ".living-wordmark__display-word",
    );
    const styles = displayWord ? getComputedStyle(displayWord) : null;

    return {
      word: element.getAttribute("data-word"),
      filter: styles?.filter,
      opacity: styles?.opacity,
      transform: styles?.transform,
    };
  });
  expect(initialWordmarkState).toEqual({
    word: "Prizic",
    filter: "blur(0px)",
    opacity: "1",
    transform: "none",
  });

  const visibleSystem = page.locator('[data-spread="method"]');
  const processState = await visibleSystem.evaluate((element) => ({
    stages: Array.from(element.querySelectorAll<HTMLElement>("h3")).map(
      (label) => {
        const styles = getComputedStyle(label);
        const bounds = label.getBoundingClientRect();

        return {
          text: label.textContent,
          visible:
            styles.display !== "none" &&
            styles.visibility !== "hidden" &&
            Number(styles.opacity) > 0 &&
            bounds.width > 0 &&
            bounds.height > 0,
        };
      },
    ),
  }));
  expect(processState).toEqual({
    stages: [
      { text: "Question", visible: true },
      { text: "Direction", visible: true },
      { text: "Software", visible: true },
      { text: "Learning", visible: true },
    ],
  });
  expect(await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").length)).toBe(0);
  await expect(page.getByRole("button", { name: "Replay Prizic word animation" })).toBeHidden();
});

test("core homepage content and navigation work without JavaScript", async ({
  browser, baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
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
      .locator('[data-spread="method"]')
      .filter({ visible: true });
    await expect(visibleSystem.locator("h3")).toHaveText([
      "Question",
      "Direction",
      "Software",
      "Learning",
    ]);
    await expect(page.locator("html")).toHaveAttribute("data-accent", "cyan");
    await expect(page.locator(".site-footer .contact-action")).toHaveAttribute("href", "mailto:preview@prizic.test");
    await expect(page.getByRole("button", { name: "Replay Prizic word animation" })).toBeHidden();
  } finally {
    await context.close();
  }
});

test("mobile navigation remains complete and usable without JavaScript", async ({
  browser, baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();

  try {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();

    const navigation = page.getByRole("navigation", {
      name: "Mobile fallback",
    });
    await expect(navigation).toBeVisible();
    await expect(navigation.getByRole("link")).toHaveText([
      "Thinking",
      "Capabilities",
      "Partnerships",
      "About",
      "Start a conversation",
    ]);
    expect(
      await navigation.getByRole("link").evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")),
      ),
    ).toEqual([
      "/thinking",
      "/capabilities",
      "/partnerships",
      "/about",
      "mailto:preview@prizic.test",
    ]);
    await expect(
      navigation.getByRole("link", { name: "Start a conversation" }),
    ).toHaveAttribute("href", "mailto:preview@prizic.test");

    for (const link of await navigation.getByRole("link").all()) {
      await expect(link).toBeVisible();
    }
  } finally {
    await context.close();
  }
});
