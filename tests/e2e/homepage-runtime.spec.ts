import { expect, test } from "@playwright/test";

import { SITE_CONTENT } from "./support";

const { hero } = SITE_CONTENT.home;

test.use({ viewport: { width: 1280, height: 800 } });

test("hydrates directly into the settled state with reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("img", { name: "Prizic" })).toHaveAttribute("data-word", "Prizic");
  await expect(page.getByRole("img", { name: "Prizic" })).toHaveAttribute("data-motion", "static");
  expect(errors).toEqual([]);
});

test("hydrates every public page without React runtime errors", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`${page.url()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => runtimeErrors.push(`${page.url()}: ${error.message}`));

  await page.goto("/");
  await page.getByRole("heading", { level: 1, name: hero.headline }).waitFor();
  await page.getByRole("button", { name: "Replay Prizic word animation" }).click();
  await expect(page.getByRole("img", { name: "Prizic" })).toHaveAttribute("data-word", "Precise");

  for (const route of ["/services", "/services/websites", "/approach", "/about", "/contact"]) {
    await page.goto(route, { waitUntil: "networkidle" });
  }

  const hydrationErrors = runtimeErrors.filter((message) =>
    /hydration|hydrating|react error #418|server rendered|did not match/i.test(message),
  );
  expect(hydrationErrors).toEqual([]);
});

test("the homepage starts the living wordmark sequence and settles on Prizic", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const wordmark = page.getByRole("img", { name: "Prizic" });
  await expect(wordmark).toHaveAttribute("data-motion", "enabled");
  for (const word of ["Prism", "Prize", "Prizic"]) {
    await expect(wordmark).toHaveAttribute("data-word", word);
  }
  await expect(wordmark).toHaveAttribute("data-settling", "false");
  await expect(page.locator("[data-header-identity]")).toHaveAttribute("data-motion", "enabled");
});

test("keeps every service and delivery description fully readable", async ({ page }) => {
  await page.goto("/");
  const descriptions = page.locator('[data-spread="services"] ol > li > p, [data-spread="delivery"] ol > li > p');
  await expect(descriptions).toHaveCount(SITE_CONTENT.home.services.items.length * 2 + SITE_CONTENT.home.delivery.stages.length);
  for (const description of await descriptions.all()) {
    await description.scrollIntoViewIfNeeded();
    await expect(description).toBeVisible();
    const metrics = await description.evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
        textOverflow: styles.textOverflow,
        webkitLineClamp: styles.webkitLineClamp,
      };
    });
    expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.clientHeight);
    expect(metrics.textOverflow).not.toBe("ellipsis");
    expect(metrics.webkitLineClamp).toBe("none");
  }
});

test("sets the headline at editorial display scale", async ({ page }) => {
  await page.goto("/");
  const headline = page.getByRole("heading", { level: 1, name: hero.headline });
  const typography = await headline.evaluate((element) => {
    const styles = getComputedStyle(element);
    const supporting = element.nextElementSibling!;
    return {
      lineCount: Math.round(element.clientHeight / Number.parseFloat(styles.lineHeight)),
      fontSize: Number.parseFloat(styles.fontSize),
      supportingSize: Number.parseFloat(getComputedStyle(supporting).fontSize),
    };
  });
  expect(typography.lineCount).toBeGreaterThanOrEqual(3);
  expect(typography.lineCount).toBeLessThanOrEqual(5);
  expect(typography.fontSize).toBeGreaterThanOrEqual(56);
  expect(typography.fontSize).toBeGreaterThanOrEqual(typography.supportingSize * 3.5);
});

test("offers the next chapter and both actions within the first viewport", async ({ page }) => {
  await page.goto("/");
  const opening = page.locator('[data-spread="opening"]');
  for (const action of hero.actions) {
    const link = opening.getByRole("link", { name: action.label });
    await expect(link).toBeInViewport({ ratio: 1 });
    await expect(link).toHaveAttribute("href", action.href);
  }
  const cue = opening.getByRole("link", { name: "Continue to the introduction" });
  await expect(cue).toBeInViewport();
  await cue.click();
  await expect(page).toHaveURL(/#introduction$/);
  await expect(page.locator("#introduction")).toBeInViewport();
});

test("gives the material feature authority over its attached action modules", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const opening = page.locator('[data-spread="opening"]');
  // The feature column holds the material studies and the living wordmark.
  const feature = opening.locator('[data-artwork="fold"]').locator("xpath=../..");
  const statement = opening.getByRole("heading", { level: 1 }).locator("xpath=..");
  const support = opening.getByRole("link", { name: hero.actions[0].label }).locator("xpath=..");
  const [featureBox, statementBox, supportBox] = await Promise.all([
    feature.boundingBox(), statement.boundingBox(), support.boundingBox(),
  ]);
  expect(featureBox).not.toBeNull();
  expect(statementBox).not.toBeNull();
  expect(supportBox).not.toBeNull();
  expect(featureBox!.width).toBeGreaterThan(statementBox!.width * 0.9);
  expect(featureBox!.height).toBeGreaterThan(supportBox!.height * 3);
  await expect(feature.locator('[data-artwork="fold"]')).toBeVisible();
  await expect(feature.locator('[data-artwork="ribs"]')).toBeVisible();
  await expect(feature.getByRole("img", { name: "Prizic" })).toBeVisible();
  await expect(feature.locator("[data-signal-field]")).toBeVisible();
  await expect(feature.locator("[data-calibration-line]")).toHaveCount(7);
});
