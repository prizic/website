"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import {
  ACCENT_STORAGE_KEY,
  ACCENT_THEMES,
  type AccentTheme,
  isAccentTheme,
} from "@/lib/accent-theme";

type AccentSwitcherProps = {
  className?: string;
};

function getInitialAccent(): AccentTheme {
  if (typeof document === "undefined") {
    return "cyan";
  }

  const accent = document.documentElement.dataset.accent;
  return isAccentTheme(accent) ? accent : "cyan";
}

export function AccentSwitcher({ className }: AccentSwitcherProps) {
  const [accent, setAccent] = useState<AccentTheme>(getInitialAccent);
  const classes = ["accent-switcher", className].filter(Boolean).join(" ");

  useEffect(() => {
    document.documentElement.dataset.accent = accent;

    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, accent);
    } catch {}
  }, [accent]);

  function selectAccent(nextAccent: AccentTheme) {
    setAccent(nextAccent);
  }

  return (
    <fieldset aria-label="Accent color" className={classes}>
      <legend className="sr-only">Accent color</legend>
      {ACCENT_THEMES.map((theme) => (
        <label key={theme.id} title={theme.label}>
          <input
            checked={accent === theme.id}
            name="accent-color"
            onChange={() => selectAccent(theme.id)}
            type="radio"
            value={theme.id}
          />
          <span
            aria-hidden="true"
            style={{ "--swatch": theme.color } as CSSProperties}
          />
          <span className="sr-only">{theme.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
