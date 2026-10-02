export const ACCENT_STORAGE_KEY = "prizic-accent";

export const ACCENT_THEMES = [
  { id: "cyan", label: "Prizic cyan", color: "#00d9ff", ink: "#081013" },
  { id: "lime", label: "Electric lime", color: "#65ed9d", ink: "#0b1710" },
  { id: "yellow", label: "Signal yellow", color: "#eff300", ink: "#171800" },
] as const;

export type AccentTheme = (typeof ACCENT_THEMES)[number]["id"];

export function isAccentTheme(value: unknown): value is AccentTheme {
  return ACCENT_THEMES.some((theme) => theme.id === value);
}

/** Points the theme's accent tokens at the selected pair on <html>. */
export function applyAccent(root: HTMLElement, accent: AccentTheme) {
  const theme = ACCENT_THEMES.find((candidate) => candidate.id === accent);
  if (!theme) return;
  root.dataset.accent = theme.id;
  root.style.setProperty("--color-accent", theme.color);
  root.style.setProperty("--color-accent-ink", theme.ink);
}

const BOOTSTRAP_THEMES = Object.fromEntries(
  ACCENT_THEMES.map((theme) => [theme.id, [theme.color, theme.ink]]),
);

export const ACCENT_BOOTSTRAP_SCRIPT = `try{const t=${JSON.stringify(BOOTSTRAP_THEMES)},v=localStorage.getItem("${ACCENT_STORAGE_KEY}"),p=t[v||""],r=document.documentElement;if(p){r.dataset.accent=v;r.style.setProperty("--color-accent",p[0]);r.style.setProperty("--color-accent-ink",p[1])}}catch{}`;
