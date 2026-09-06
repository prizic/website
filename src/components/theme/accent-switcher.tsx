"use client";

import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";

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

function subscribeToAccent(onChange: () => void) {
  window.addEventListener("prizic-accent-change", onChange);
  return () => window.removeEventListener("prizic-accent-change", onChange);
}

export function AccentSwitcher({ className }: AccentSwitcherProps) {
  const accent = useSyncExternalStore(subscribeToAccent, getInitialAccent, () => "cyan" as const);
  const classes = ["accent-switcher", className].filter(Boolean).join(" ");

  function selectAccent(nextAccent: AccentTheme) {
    document.documentElement.setAttribute("data-accent", nextAccent);

    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, nextAccent);
    } catch {}
    window.dispatchEvent(new Event("prizic-accent-change"));
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
