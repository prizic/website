import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

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

test("keeps every desktop blueprint description fully readable", async ({
  page,
}) => {
  await page.goto("/");

  const descriptions = page.locator(
    ".home-hero .home-blueprint--full .prizic-blueprint__stage p",
  );
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

test("sets the desktop headline as a two-line display with restrained tracking", async ({
  page,
}) => {
  await page.goto("/");

  const headline = page.getByRole("heading", {
    level: 1,
    name: "From possibility to working systems.",
  });
  const typography = await headline.evaluate((element) => {
    const styles = getComputedStyle(element);
    const lineHeight = Number.parseFloat(styles.lineHeight);
    const fontSize = Number.parseFloat(styles.fontSize);
    const letterSpacing = Number.parseFloat(styles.letterSpacing);

    return {
      lineCount: Math.round(element.clientHeight / lineHeight),
      trackingEm: letterSpacing / fontSize,
    };
  });

  expect(typography.lineCount).toBe(2);
  expect(typography.trackingEm).toBeGreaterThanOrEqual(-0.04);
});

test("offers an in-viewport continuation cue to the principles", async ({
  page,
}) => {
  await page.goto("/");

  const cue = page.getByRole("link", {
    name: "Continue to Clarity is part of the work.",
  });
  await expect(cue).toBeVisible();
  await expect(cue).toBeInViewport();

  await cue.click();

  await expect(page).toHaveURL(/#principles$/);
  await expect(page.locator("#principles")).toBeInViewport();
});

test("gives the desktop blueprint and Anchor signal focal authority", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hero = page.locator(".home-hero");
  const heroCopy = page.locator(".home-hero__copy");
  const headline = page.getByRole("heading", {
    level: 1,
    name: "From possibility to working systems.",
  });
  const blueprint = page.locator(
    ".home-hero .home-blueprint--full .prizic-blueprint",
  );
  const wordmark = page.locator(
    ".home-hero__wordmark .living-wordmark__figure",
  );

  const [heroBox, copyBox, headlineBox, blueprintBox, wordmarkBox] =
    await Promise.all([
      hero.boundingBox(),
      heroCopy.boundingBox(),
      headline.boundingBox(),
      blueprint.boundingBox(),
      wordmark.boundingBox(),
    ]);

  expect(heroBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headlineBox).not.toBeNull();
  expect(blueprintBox).not.toBeNull();
  expect(wordmarkBox).not.toBeNull();

  // Fractional grid centering can place the headline on a subpixel while the
  // SVG is snapped to the next device pixel. Treat that as the same top edge.
  expect(blueprintBox!.y).toBeLessThanOrEqual(headlineBox!.y + 1);
  expect(blueprintBox!.width).toBeGreaterThanOrEqual(heroBox!.width * 0.5);
  expect(wordmarkBox!.width).toBeGreaterThanOrEqual(copyBox!.width * 0.68);
  expect(wordmarkBox!.height).toBeGreaterThanOrEqual(72);

  await expect(
    blueprint.locator("[data-construction-contour]").first(),
  ).toBeVisible();
  await expect(
    wordmark.locator("[data-signal-field]"),
  ).toBeVisible();
});
