import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

test("hydrates directly into the settled state with reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".living-wordmark__figure")).toHaveAttribute("data-word", "Prizic");
  expect(errors).toEqual([]);
});

test("hydrates the homepage without React runtime errors", async ({ page }) => {
  const runtimeErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.goto("/");
  await page.getByRole("heading", {
    level: 1,
    name: "From possibility to working systems.",
  }).waitFor();
  await page.getByRole("button", {
    name: "Replay Prizic word animation",
  }).click();

  const hydrationErrors = runtimeErrors.filter((message) =>
    /hydration|hydrating|react error #418|server rendered|did not match/i.test(
      message,
    ),
  );
  expect(hydrationErrors).toEqual([]);
});

test("keeps every method description fully readable", async ({ page }) => {
  await page.goto("/");
  const descriptions = page.locator('[data-spread="method"] li p');
  await expect(descriptions).toHaveCount(4);
  for (const description of await descriptions.all()) {
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

test("sets the thesis at editorial display scale", async ({ page }) => {
  await page.goto("/");
  const headline = page.getByRole("heading", {
    level: 1,
    name: "From possibility to working systems.",
  });
  const typography = await headline.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      lineCount: Math.round(element.clientHeight / Number.parseFloat(styles.lineHeight)),
      fontSize: Number.parseFloat(styles.fontSize),
    };
  });
  expect(typography.lineCount).toBeGreaterThanOrEqual(3);
  expect(typography.lineCount).toBeLessThanOrEqual(4);
  expect(typography.fontSize).toBeGreaterThanOrEqual(88);
});

test("offers the next method chapter and contact within the first viewport", async ({ page }) => {
  await page.goto("/");
  const opening = page.locator('[data-spread="opening"]');
  await expect(opening.getByRole("link", { name: "Start a conversation" })).toBeInViewport();
  const cue = opening.getByRole("link", { name: "Continue to A way of thinking." });
  await expect(cue).toBeInViewport();
  await cue.click();
  await expect(page).toHaveURL(/#method$/);
  await expect(page.locator("#method")).toBeInViewport();
});

test("gives the panoramic feature authority over its attached support modules", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const opening = page.locator('[data-spread="opening"]');
  const feature = opening.locator(".opening-spread__feature");
  const statement = opening.locator(".opening-spread__statement");
  const support = opening.locator(".opening-spread__action");
  const [featureBox, statementBox, supportBox] = await Promise.all([
    feature.boundingBox(), statement.boundingBox(), support.boundingBox(),
  ]);
  expect(featureBox).not.toBeNull();
  expect(statementBox).not.toBeNull();
  expect(supportBox).not.toBeNull();
  expect(featureBox!.width).toBeGreaterThan(statementBox!.width * 0.9);
  expect(featureBox!.height).toBeGreaterThan(supportBox!.height * 3);
  await expect(feature.locator('[data-artwork="fold"]')).toBeVisible();
  await expect(feature.locator(".living-wordmark__figure")).toBeVisible();
  await expect(feature.locator("[data-signal-field]")).toBeVisible();
});
