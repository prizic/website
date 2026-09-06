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

  it("bootstraps the stored accent before hydration", () => {
    expect(ACCENT_STORAGE_KEY).toBe("prizic-accent");
    expect(ACCENT_BOOTSTRAP_SCRIPT).toContain("localStorage.getItem");
    expect(ACCENT_BOOTSTRAP_SCRIPT).toContain(
      "document.documentElement.dataset.accent",
    );
  });
});
