import { describe, expect, it } from "vitest";

import {
  ACCENT_BOOTSTRAP_SCRIPT,
  ACCENT_STORAGE_KEY,
  ACCENT_THEMES,
  isAccentTheme,
} from "@/lib/accent-theme";

describe("accent theme contract", () => {
  it("accepts only the three approved accents", () => {
    expect(ACCENT_THEMES.map((theme) => theme.id)).toEqual([
      "cyan",
      "lime",
      "yellow",
    ]);
    expect(isAccentTheme("cyan")).toBe(true);
    expect(isAccentTheme("lime")).toBe(true);
    expect(isAccentTheme("yellow")).toBe(true);
    expect(isAccentTheme("green")).toBe(false);
    expect(isAccentTheme(null)).toBe(false);
  });

  it("bootstraps the stored accent's tokens before hydration", () => {
    expect(ACCENT_STORAGE_KEY).toBe("prizic-accent");
    const root = document.documentElement;
    localStorage.setItem(ACCENT_STORAGE_KEY, "yellow");

    new Function(ACCENT_BOOTSTRAP_SCRIPT)();

    expect(root.dataset.accent).toBe("yellow");
    expect(root.style.getPropertyValue("--color-accent")).toBe("#eff300");
    expect(root.style.getPropertyValue("--color-accent-ink")).toBe("#171800");
    localStorage.clear();
  });

  it("ignores an unknown stored accent", () => {
    const root = document.documentElement;
    root.removeAttribute("style");
    root.dataset.accent = "cyan";
    localStorage.setItem(ACCENT_STORAGE_KEY, "green");

    new Function(ACCENT_BOOTSTRAP_SCRIPT)();

    expect(root.dataset.accent).toBe("cyan");
    expect(root.style.getPropertyValue("--color-accent")).toBe("");
    localStorage.clear();
  });
});
