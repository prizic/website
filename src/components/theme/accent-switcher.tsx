"use client";

import { useSyncExternalStore } from "react";

import {
  ACCENT_STORAGE_KEY,
  ACCENT_THEMES,
  type AccentTheme,
  applyAccent,
  isAccentTheme,
} from "@/lib/accent-theme";
import { cx } from "@/lib/ui";

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

  function selectAccent(nextAccent: AccentTheme) {
    applyAccent(document.documentElement, nextAccent);

    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, nextAccent);
    } catch {}
    window.dispatchEvent(new Event("prizic-accent-change"));
  }

  return (
    <fieldset
      aria-label="Accent color"
      className={cx("m-0 inline-flex min-w-0 items-center border-0 p-0", className)}
    >
      <legend className="sr-only">Accent color</legend>
      {ACCENT_THEMES.map((theme) => (
        <label
          className="relative grid size-11 cursor-pointer place-items-center"
          key={theme.id}
          title={theme.label}
        >
          <input
            checked={accent === theme.id}
            className="peer absolute inset-0 z-1 m-0 size-full cursor-pointer opacity-0"
            name="accent-color"
            onChange={() => selectAccent(theme.id)}
            type="radio"
            value={theme.id}
          />
          <span
            aria-hidden="true"
            className="size-3 rounded-full border border-ink/34 transition-transform duration-160 ease-out peer-checked:scale-106 peer-checked:outline peer-checked:outline-offset-3 peer-checked:outline-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink motion-reduce:transition-none"
            style={{ backgroundColor: theme.color }}
          />
          <span className="sr-only">{theme.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
