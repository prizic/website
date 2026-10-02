import type { Page } from "@playwright/test";

import { SITE_CONTENT } from "../../src/content/site";

export { SITE_CONTENT };

const { pages, home } = SITE_CONTENT;

/** Every public route with the H1 it must render. */
export const PUBLIC_ROUTES = [
  { path: "/", heading: home.hero.headline },
  { path: "/services", heading: pages.services.introduction },
  { path: "/services/websites", heading: pages.service.websites.title },
  {
    path: "/services/business-software",
    heading: pages.service["business-software"].title,
  },
  { path: "/services/automation", heading: pages.service.automation.title },
  { path: "/approach", heading: pages.approach.title },
  { path: "/about", heading: pages.about.title },
  { path: "/contact", heading: pages.contact.title },
] as const;

export const PUBLIC_PATHS = PUBLIC_ROUTES.map((route) => route.path);

/** Routes from the earlier site, kept as permanent redirects. */
export const LEGACY_REDIRECTS = [
  { from: "/thinking", to: "/approach" },
  { from: "/capabilities", to: "/services" },
  { from: "/partnerships", to: "/contact" },
] as const;

export const ACCENTS = [
  { id: "cyan", label: "Prizic cyan", color: "#00d9ff", ink: "#081013" },
  { id: "lime", label: "Electric lime", color: "#65ed9d", ink: "#0b1710" },
  { id: "yellow", label: "Signal yellow", color: "#eff300", ink: "#171800" },
] as const;

/** Matches NEXT_PUBLIC_CONTACT_URL in playwright.config.ts. */
export const CONTACT_URL = "mailto:preview@prizic.test";

export const INQUIRY_MOCK = "http://127.0.0.1:3101";

export function nextFrames(page: Page) {
  return page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

export function runningAnimations(page: Page) {
  return page.evaluate(
    () =>
      document
        .getAnimations()
        .filter((animation) => animation.playState === "running").length,
  );
}

/** Waits for every finite animation currently on the page to finish. */
export async function settleAnimations(page: Page) {
  await nextFrames(page);
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => undefined))),
  );
}
