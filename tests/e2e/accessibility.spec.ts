import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { ACCENTS, CONTACT_URL, PUBLIC_PATHS, SITE_CONTENT, nextFrames, runningAnimations, settleAnimations } from "./support";

const REPLAY = "Replay Prizic word animation";

function wordmark(page: Page) {
  return page.getByRole("img", { name: "Prizic" });
}

test("keyboard focus remains visible on accent swatches", async ({ page }) => {
  await page.goto("/");
  const cyan = page.getByRole("radio", { name: "Prizic cyan" });
  await cyan.focus();
  await page.keyboard.press("ArrowRight");
  const lime = page.getByRole("radio", { name: "Electric lime" });
  await expect(lime).toBeFocused();
  await expect(lime).toBeChecked();
  const swatch = lime.locator("+ span");
  const outline = await swatch.evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.outlineColor, style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
  });
  expect(outline).toEqual({ color: "rgb(17, 18, 15)", style: "solid", width: 2 });
});

type FocusAudit = { stops: number; invisible: string[]; clipped: string[] };

// Tabs through every keyboard stop on the current page and records stops
// without a solid indicator, and stops whose indicator an overflow-clipping
// ancestor (a rounded panel) cuts off.
async function auditFocusStops(page: Page): Promise<FocusAudit> {
  await page.evaluate(() => document.fonts.ready);
  const audit: FocusAudit = { stops: 0, invisible: [], clipped: [] };
  const seen = new Set<number>();
  for (let stop = 0; stop < 120; stop++) {
    await page.keyboard.press("Tab");
    const report = await page.evaluate(() => {
      const element = document.activeElement as HTMLElement | null;
      if (!element || element === document.body) return null;
      const key = Array.from(document.querySelectorAll("*")).indexOf(element);
      const name = `${element.tagName.toLowerCase()} "${(element.getAttribute("aria-label") ?? element.textContent ?? "").trim().slice(0, 40)}"`;
      // Accent radios are visually hidden; their swatch carries the indicator.
      if (element.matches("input[type=radio][name=accent-color]")) return { key, name, skip: true as const };
      const style = getComputedStyle(element);
      const width = parseFloat(style.outlineWidth);
      const reach = width + Math.max(0, parseFloat(style.outlineOffset));
      const box = element.getBoundingClientRect();
      const outer = { left: box.left - reach, right: box.right + reach, top: box.top - reach, bottom: box.bottom + reach };
      let clippedBy: string | null = null;
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        const parentStyle = getComputedStyle(parent);
        if (parentStyle.overflowX === "visible" && parentStyle.overflowY === "visible") continue;
        const clip = parent.getBoundingClientRect();
        if (outer.left < clip.left - 0.5 || outer.right > clip.right + 0.5 || outer.top < clip.top - 0.5 || outer.bottom > clip.bottom + 0.5) {
          clippedBy = `<${parent.tagName.toLowerCase()} class="${parent.className.toString().split(" ").slice(0, 4).join(" ")}">`;
          break;
        }
      }
      return { key, name, skip: false as const, visible: element.matches(":focus-visible") && style.outlineStyle === "solid" && width >= 2, clippedBy };
    });
    if (!report) continue;
    if (seen.has(report.key)) break;
    seen.add(report.key);
    audit.stops++;
    if (report.skip) continue;
    if (!report.visible) audit.invisible.push(report.name);
    if (report.clippedBy) audit.clipped.push(`${report.name} clipped by ${report.clippedBy}`);
  }
  return audit;
}

test("every keyboard stop on every public route shows a solid focus indicator", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const route of PUBLIC_PATHS) {
    await page.goto(route);
    const audit = await auditFocusStops(page);
    expect(audit.stops, route).toBeGreaterThan(10);
    expect(audit.invisible, route).toEqual([]);
  }
});

test("rounded panels never clip a keyboard focus indicator", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const clipped: string[] = [];
  for (const route of PUBLIC_PATHS) {
    await page.goto(route);
    for (const entry of (await auditFocusStops(page)).clipped) clipped.push(`${route}: ${entry}`);
  }
  expect(clipped).toEqual([]);
});

test("enabling reduced motion during playback immediately settles the wordmark", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: REPLAY }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(wordmark(page)).toHaveAttribute("data-word", "Prizic", { timeout: 500 });
  await expect(page.getByRole("button", { name: REPLAY })).toBeHidden();
});

test("reduced motion snaps the final Prizic entrance to a still frame", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: REPLAY }).click();
  await page.waitForFunction(() => {
    const figure = document.querySelector('figure[aria-label="Prizic"][data-word="Prizic"]');
    const word = figure?.querySelector("[data-display-word]");
    return word && Number(getComputedStyle(word).opacity) < 1;
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("button", { name: REPLAY })).toBeHidden();
  expect(await wordmark(page).locator("[data-display-word]").evaluate((element) => {
    const style = getComputedStyle(element);
    return { opacity: style.opacity, filter: style.filter, transform: style.transform,
      running: element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length };
  })).toEqual({ opacity: "1", filter: "none", transform: "none", running: 0 });
});

for (const stage of ["during playback", "after completion"]) {
  test(`restoring normal motion ${stage} keeps Prizic until explicit Replay`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const replay = page.getByRole("button", { name: REPLAY });
    await replay.click();
    const figure = wordmark(page);
    if (stage === "after completion") {
      await expect(figure).toHaveAttribute("data-word", "Prizic");
      await expect(figure).toHaveAttribute("data-settling", "false");
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(replay).toBeHidden();
    await expect(figure).toHaveAttribute("data-word", "Prizic");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(replay).toBeVisible();
    expect(await figure.getAttribute("data-word")).toBe("Prizic");
    // A restarted sequence would advance to Prism after 1200ms.
    await page.waitForTimeout(1500);
    expect(await figure.getAttribute("data-word")).toBe("Prizic");
    await expect(figure).toHaveAttribute("data-settling", "false");
    await replay.click();
    await expect(figure).toHaveAttribute("data-word", "Precise");
    await expect(figure).toHaveAttribute("data-word", "Prism");
    await expect(figure).toHaveAttribute("data-word", "Prizic");
    await expect(figure).toHaveAttribute("data-settling", "false");
  });
}

test("reduced motion keeps the header identity still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  const identity = page.locator("[data-header-identity]");
  await expect(identity).toHaveAttribute("data-motion", "static");
  expect(await identity.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  for (const eye of await identity.locator("[data-identity-eye]").all()) {
    expect(await eye.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  }
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
  await expect(dialog.getByRole("link", { name: SITE_CONTENT.headerAction.label })).toBeFocused();
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

for (const route of [...PUBLIC_PATHS, "/missing-page"]) {
  test(`${route} has no serious or critical automated accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1:visible")).toHaveCount(1);
    // Audit the settled page, not a frame of an entrance animation.
    await settleAnimations(page);

    for (const accent of ACCENTS) {
      await page.getByRole("radio", { name: accent.label }).check();
      const results = await new AxeBuilder({ page }).analyze();
      const materialViolations = results.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target.join(" ")) }));
      expect(materialViolations, accent.id).toEqual([]);
    }
  });
}

test("the inquiry form's error states have no serious accessibility violations", async ({ page }) => {
  await page.goto("/contact");
  // Skip browser validation so the server's field errors render.
  await page.getByRole("form", { name: "Project inquiry" }).evaluate((form: HTMLFormElement) => (form.noValidate = true));
  await page.getByRole("button", { name: SITE_CONTENT.pages.contact.form.submit }).click();
  await expect(page.getByLabel(SITE_CONTENT.pages.contact.form.name)).toHaveAttribute("aria-invalid", "true");
  const results = await new AxeBuilder({ page }).include('[data-spread="inquiry"]').analyze();
  expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical")).toEqual([]);
});

test("reduced motion exposes the settled wordmark and the complete delivery process", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await nextFrames(page);

  const initialWordmarkState = await wordmark(page).evaluate((element) => {
    const displayWord = element.querySelector<HTMLElement>("[data-display-word]");
    const styles = displayWord ? getComputedStyle(displayWord) : null;
    return {
      word: element.getAttribute("data-word"),
      filter: styles?.filter,
      opacity: styles?.opacity,
      transform: styles?.transform,
    };
  });
  expect(initialWordmarkState).toEqual({ word: "Prizic", filter: "none", opacity: "1", transform: "none" });

  const stages = await page.locator('[data-spread="delivery"]').evaluate((element) =>
    Array.from(element.querySelectorAll<HTMLElement>("h3")).map((label) => {
      const styles = getComputedStyle(label);
      const bounds = label.getBoundingClientRect();
      return {
        text: label.textContent,
        visible: styles.display !== "none" && styles.visibility !== "hidden" && Number(styles.opacity) > 0 && bounds.width > 0 && bounds.height > 0,
      };
    }),
  );
  expect(stages).toEqual(SITE_CONTENT.home.delivery.stages.map((stage) => ({ text: stage.title, visible: true })));
  expect(await runningAnimations(page)).toBe(0);
  await expect(page.getByRole("button", { name: REPLAY })).toBeHidden();
});

test("core homepage content and navigation work without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1, name: SITE_CONTENT.home.hero.headline })).toBeVisible();
    await expect(page.getByText(SITE_CONTENT.home.hero.supportingText)).toBeVisible();

    const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNavigation.getByRole("link")).toHaveText(SITE_CONTENT.navigation.map((item) => item.label));
    await expect(page.locator('[data-spread="delivery"] h3')).toHaveText(SITE_CONTENT.home.delivery.stages.map((stage) => stage.title));
    await expect(page.locator("html")).toHaveAttribute("data-accent", "cyan");
    await expect(page.locator('[data-spread="closing"]').getByRole("link", { name: SITE_CONTENT.home.closing.emailLabel })).toHaveAttribute("href", CONTACT_URL);
    await expect(page.getByRole("banner").getByRole("link", { name: SITE_CONTENT.headerAction.label })).toHaveAttribute("href", "/contact");
    await expect(page.getByRole("button", { name: REPLAY })).toBeHidden();

    // Native disclosure: every FAQ answer opens without JavaScript.
    const faq = SITE_CONTENT.home.faq.items[0];
    await page.getByText(faq.question).click();
    await expect(page.getByText(faq.answer)).toBeVisible();
  } finally {
    await context.close();
  }
});

test("mobile navigation remains complete and usable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  try {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();

    const navigation = page.getByRole("navigation", { name: "Mobile fallback" });
    await expect(navigation).toBeVisible();
    await expect(navigation.getByRole("link")).toHaveText([
      ...SITE_CONTENT.navigation.map((item) => item.label),
      SITE_CONTENT.headerAction.label,
    ]);
    expect(await navigation.getByRole("link").evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual([
      ...SITE_CONTENT.navigation.map((item) => item.href),
      SITE_CONTENT.headerAction.href,
    ]);
    for (const link of await navigation.getByRole("link").all()) {
      await expect(link).toBeVisible();
      const box = await link.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }

    await navigation.getByRole("link", { name: "Approach" }).click();
    await expect(page).toHaveURL("/approach");
  } finally {
    await context.close();
  }
});
