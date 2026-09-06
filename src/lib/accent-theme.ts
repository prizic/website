export const ACCENT_STORAGE_KEY = "prizic-accent";

export const ACCENT_THEMES = [
  { id: "cyan", label: "Prizic cyan", color: "#00d9ff" },
  { id: "lime", label: "Electric lime", color: "#65ed9d" },
  { id: "yellow", label: "Signal yellow", color: "#eff300" },
] as const;

export type AccentTheme = (typeof ACCENT_THEMES)[number]["id"];

export function isAccentTheme(value: unknown): value is AccentTheme {
  return ACCENT_THEMES.some((theme) => theme.id === value);
}

export const ACCENT_BOOTSTRAP_SCRIPT = `try{const value=localStorage.getItem("${ACCENT_STORAGE_KEY}");if(["cyan","lime","yellow"].includes(value||"")){document.documentElement.dataset.accent=value}}catch{}`;
