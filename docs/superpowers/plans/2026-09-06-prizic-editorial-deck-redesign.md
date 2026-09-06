# Prizic Editorial Deck Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every Prizic public route as a high-fidelity responsive adaptation of the supplied editorial-presentation references, with persistent cyan, lime, and yellow accent modes and no fabricated company evidence.

**Architecture:** Keep the existing Next.js App Router, typed content, metadata, contact configuration, and server-rendered page model. Add a small client-only accent controller at the root, introduce reusable server-rendered editorial primitives and authored abstract artwork, then recompose the homepage and supporting routes around those primitives. CSS custom properties own theming; JavaScript only persists the selected accent and enhances motion.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS v4 entrypoint with authored global CSS, Motion for React, `next/image`, Vitest, Testing Library, Playwright, axe-core, Vercel.

**Spec:** `docs/specs/2026-09-06-prizic-editorial-deck-redesign.md`

## Global Constraints

- The supplied references are the visual authority for desktop composition density, type scale, spacing, rounded modular panels, image treatment, and large-to-small information balance.
- Prizic supplies the identity and content; do not copy the reference company identity, photography, wording, or figures.
- No invented portfolio entries, customer logos, testimonials, reviews, revenue, growth, project counts, or performance metrics.
- Temporary copy may shape the layout only when it is non-claiming and clearly structural.
- Preserve Home, Thinking, Capabilities, Partnerships, About, Contact, and branded not-found routes.
- Preserve the approved P/Z assets and living-wordmark contract: static mark, visible `Pr` and `c`, one sequence, settled final state.
- Preserve direct contact configuration, canonical-domain behavior, metadata, robots, sitemap, and structured data.
- Core content and navigation remain server-rendered and usable without JavaScript.
- Target WCAG 2.2 AA, 44 by 44 pixel touch targets, visible focus, complete reduced-motion behavior, and no horizontal overflow at 320, 375, 768, 1280, or 1440 pixels.
- Do not add a CMS, database, analytics, contact form, booking/product sales flow, or new production dependency.
- Default accent is cyan; visitors can select cyan, lime, or yellow, and the choice persists locally across routes.

## File Map

### Create

- `src/lib/accent-theme.ts` — accent names, labels, storage key, validation, and bootstrap source.
- `src/components/theme/accent-switcher.tsx` — accessible three-swatch client control.
- `src/components/editorial/folio-label.tsx` — compact presentation metadata.
- `src/components/editorial/editorial-artwork.tsx` — reusable abstract P/Z-derived visual variants.
- `src/components/editorial/editorial-arrow.tsx` — shared directional glyph.
- `src/components/home/opening-spread.tsx` — reference-led first viewport.
- `src/components/home/method-spread.tsx` — four-module table-of-contents composition.
- `src/components/home/story-spreads.tsx` — introduction, principles, capabilities, founder, and close compositions.
- `tests/unit/accent-theme.test.ts` — theme validation and bootstrap behavior.
- `tests/components/accent-switcher.test.tsx` — interaction and accessibility behavior.
- `tests/components/editorial-artwork.test.tsx` — artwork semantics and variants.
- `tests/e2e/accent-theme.spec.ts` — persistence and contrast-mode integration.

### Modify

- `src/app/layout.tsx` — install pre-paint accent bootstrap and updated direction contract.
- `src/app/globals.css` — replace the current dark architectural visual world with the editorial-deck system.
- `src/app/page.tsx` — compose the new homepage spreads.
- `src/app/thinking/page.tsx` — editorial thinking layout.
- `src/app/capabilities/page.tsx` — editorial capabilities layout.
- `src/app/partnerships/page.tsx` — editorial partnership path.
- `src/app/about/page.tsx` — editorial founder and name study.
- `src/app/contact/page.tsx` — editorial contact spread.
- `src/app/not-found.tsx` — matching error spread.
- `src/components/layout/site-header.tsx` — compact reference-style navigation and accent control.
- `src/components/layout/mobile-menu.tsx` — carry accent control into the compact navigation state.
- `src/components/layout/site-footer.tsx` — black folio-style closing frame.
- `src/components/layout/page-intro.tsx` — reusable supporting-route opening spread.
- `src/components/actions/contact-action.tsx` — shared reference-style capsule treatment without changing behavior.
- `src/components/brand/prizic-logo.tsx` — choose correct light/dark asset by surface.
- `src/components/brand/living-wordmark.tsx` — place existing behavior inside the new presentation composition.
- `tests/components/homepage.test.tsx` — new semantic composition assertions.
- `tests/components/routes.test.tsx` — new supporting-route structure assertions.
- `tests/components/site-header.test.tsx` — accent switcher and updated navigation order.
- `tests/e2e/site.spec.ts` — updated focus order and unchanged route behavior.
- `tests/e2e/homepage-runtime.spec.ts` — reference-fidelity geometry checks.
- `tests/e2e/responsive.spec.ts` — new spread stacking and accent-control constraints.
- `tests/e2e/accessibility.spec.ts` — preserve no-JavaScript and reduced-motion guarantees.
- `DESIGN.md` and `.impeccable/design.json` — regenerate only after the finished UI passes review.

---

### Task 1: Persistent Dynamic Accent System

**Files:**

- Create: `src/lib/accent-theme.ts`
- Create: `src/components/theme/accent-switcher.tsx`
- Create: `tests/unit/accent-theme.test.ts`
- Create: `tests/components/accent-switcher.test.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**

- Produces: `type AccentTheme = "cyan" | "lime" | "yellow"`.
- Produces: `ACCENT_THEMES`, `ACCENT_STORAGE_KEY`, `isAccentTheme(value)`, and `ACCENT_BOOTSTRAP_SCRIPT`.
- Produces: `<AccentSwitcher className?: string />`, which writes `data-accent` to `<html>` and local storage.
- Consumes later: CSS reads `html[data-accent]`; header and mobile menu render `AccentSwitcher`.

- [ ] **Step 1: Write failing unit tests for theme validation and bootstrap content**

```ts
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
    expect(ACCENT_BOOTSTRAP_SCRIPT).toContain("document.documentElement.dataset.accent");
  });
});
```

- [ ] **Step 2: Run the unit test and verify the missing module failure**

Run:

```bash
pnpm test tests/unit/accent-theme.test.ts
```

Expected: FAIL because `@/lib/accent-theme` does not exist.

- [ ] **Step 3: Implement the theme contract**

```ts
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
```

- [ ] **Step 4: Write the failing accessible switcher tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AccentSwitcher } from "@/components/theme/accent-switcher";

describe("AccentSwitcher", () => {
  beforeEach(() => {
    document.documentElement.dataset.accent = "cyan";
    localStorage.clear();
  });

  it("offers all accents and persists a selection", async () => {
    const user = userEvent.setup();
    render(<AccentSwitcher />);

    await user.click(screen.getByRole("radio", { name: "Electric lime" }));

    expect(document.documentElement).toHaveAttribute("data-accent", "lime");
    expect(localStorage.getItem("prizic-accent")).toBe("lime");
    expect(screen.getByRole("radio", { name: "Electric lime" })).toBeChecked();
  });
});
```

- [ ] **Step 5: Run the component test and verify the missing component failure**

Run:

```bash
pnpm test tests/components/accent-switcher.test.tsx
```

Expected: FAIL because `AccentSwitcher` does not exist.

- [ ] **Step 6: Implement the switcher and pre-paint bootstrap**

Use a client component with radio semantics and initialize from `document.documentElement.dataset.accent`. In `layout.tsx`, set the server default and run the bootstrap in `<head>`:

```tsx
<html data-accent="cyan" lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: ACCENT_BOOTSTRAP_SCRIPT }} />
  </head>
  <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
    {organizationJsonLd ? (
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    ) : null}
    <SiteHeader contact={siteConfig.contact} navigation={SITE_CONTENT.navigation} />
    <main id="main-content">{children}</main>
    <SiteFooter contact={siteConfig.contact} navigation={SITE_CONTENT.navigation} />
  </body>
</html>
```

The switcher markup must be:

```tsx
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
      <span aria-hidden="true" style={{ "--swatch": theme.color } as React.CSSProperties} />
      <span className="sr-only">{theme.label}</span>
    </label>
  ))}
</fieldset>
```

- [ ] **Step 7: Run focused and full unit tests**

Run:

```bash
pnpm test tests/unit/accent-theme.test.ts tests/components/accent-switcher.test.tsx
pnpm test
```

Expected: all tests PASS.

- [ ] **Step 8: Commit the accent engine**

```bash
git add src/lib/accent-theme.ts src/components/theme/accent-switcher.tsx src/app/layout.tsx tests/unit/accent-theme.test.ts tests/components/accent-switcher.test.tsx
git commit -m "feat: add persistent Prizic accent themes"
```

---

### Task 2: Editorial Primitives and Authored Artwork

**Files:**

- Create: `src/components/editorial/folio-label.tsx`
- Create: `src/components/editorial/editorial-arrow.tsx`
- Create: `src/components/editorial/editorial-artwork.tsx`
- Create: `tests/components/editorial-artwork.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**

- Produces: `<FolioLabel section: string; detail?: string; index?: string />`.
- Produces: `<EditorialArrow direction?: "up-right" | "down" />`.
- Produces: `<EditorialArtwork variant: "fold" | "ribs" | "orbit" | "stack"; label?: string; decorative?: boolean; className?: string />`.
- Artwork is inline SVG/CSS, inherits `currentColor`, and uses `var(--accent)` only for informative marks.

- [ ] **Step 1: Write the failing artwork contract test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EditorialArtwork } from "@/components/editorial/editorial-artwork";

describe("EditorialArtwork", () => {
  it.each(["fold", "ribs", "orbit", "stack"] as const)(
    "renders the %s authored variant",
    (variant) => {
      const { container } = render(
        <EditorialArtwork label={`${variant} system study`} variant={variant} />,
      );
      expect(screen.getByRole("img", { name: `${variant} system study` })).toBeVisible();
      expect(container.querySelector(`[data-artwork="${variant}"]`)).toBeInTheDocument();
    },
  );

  it("can be purely decorative", () => {
    const { container } = render(<EditorialArtwork decorative variant="fold" />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run:

```bash
pnpm test tests/components/editorial-artwork.test.tsx
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Build the primitives with explicit variants**

Use one typed component whose view box remains stable across variants:

```tsx
import type { ReactNode } from "react";

type EditorialArtworkProps = {
  variant: "fold" | "ribs" | "orbit" | "stack";
  label?: string;
  decorative?: boolean;
  className?: string;
};

export function EditorialArtwork(props: EditorialArtworkProps) {
  const accessibility = props.decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": props.label ?? "Prizic system study", role: "img" as const };

  const artwork = {
    fold: (
      <g>
        <path d="M90 90h360l190 170-190 170H90l190-170Z" fill="#ececea" />
        <path d="m90 90 190 170h360L450 90Z" fill="#5b5c58" />
        <path d="M90 430h360l190-170H280Z" fill="#252622" />
      </g>
    ),
    ribs: (
      <g>
        {Array.from({ length: 8 }, (_, index) => (
          <rect
            fill={index % 2 === 0 ? "#dededb" : "#777873"}
            height="300"
            key={index}
            rx="70"
            transform={`translate(${120 + index * 62} 100) rotate(-18 ${155 + index * 62} 250)`}
            width="70"
          />
        ))}
      </g>
    ),
    orbit: (
      <g fill="none" stroke="currentColor" strokeWidth="24">
        <circle cx="400" cy="260" r="180" />
        <circle cx="400" cy="260" r="112" opacity=".6" />
        <circle cx="400" cy="260" r="42" fill="var(--accent)" stroke="none" />
      </g>
    ),
    stack: (
      <g>
        {[0, 1, 2, 3].map((index) => (
          <rect
            fill={index === 1 ? "var(--accent)" : index % 2 ? "#777873" : "#dededb"}
            height="68"
            key={index}
            rx="34"
            transform={`translate(${150 + index * 54} ${110 + index * 78}) rotate(-12 250 250)`}
            width="470"
          />
        ))}
      </g>
    ),
  } satisfies Record<EditorialArtworkProps["variant"], ReactNode>;

  return (
    <figure className={["editorial-artwork", props.className].filter(Boolean).join(" ")} data-artwork={props.variant} {...accessibility}>
      <svg aria-hidden="true" viewBox="0 0 800 520">
        {artwork[props.variant]}
      </svg>
    </figure>
  );
}
```

Implement all four `<g>` drawings: a folded Z plane, a row of rounded ribs, concentric orbital forms, and a vertical stack. Use SVG masks, solid grayscale fills, and grain through a bounded SVG filter; do not use a CSS gradient, glow, stock image, or fake screenshot.

- [ ] **Step 4: Establish the global visual foundation**

Replace the root tokens and base rules in `globals.css` with this contract before styling page-specific classes:

```css
:root {
  --paper: #f1f0ed;
  --paper-bright: #fbfaf8;
  --ink: #11120f;
  --ink-soft: #20211e;
  --panel: #dededb;
  --line: #c9c9c5;
  --accent: #00d9ff;
  --accent-ink: #081013;
  --radius-sm: 0.75rem;
  --radius-md: 1.5rem;
  --radius-lg: 2.25rem;
  --frame: 88rem;
}

html[data-accent="lime"] {
  --accent: #65ed9d;
  --accent-ink: #0b1710;
}

html[data-accent="yellow"] {
  --accent: #eff300;
  --accent-ink: #171800;
}
```

Keep all essential text at AA contrast. Add `.sr-only`, `.folio-label`, `.editorial-arrow`, `.editorial-artwork`, `.editorial-spread`, and `.editorial-panel` foundations. Do not yet remove legacy selectors still consumed by unfinished routes.

- [ ] **Step 5: Run the artwork test, lint, and typecheck**

Run:

```bash
pnpm test tests/components/editorial-artwork.test.tsx
pnpm lint
pnpm typecheck
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit the visual primitives**

```bash
git add src/components/editorial src/app/globals.css tests/components/editorial-artwork.test.tsx
git commit -m "feat: add editorial Prizic visual primitives"
```

---

### Task 3: Shared Header, Navigation, Intro, and Footer

**Files:**

- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/mobile-menu.tsx`
- Modify: `src/components/layout/site-footer.tsx`
- Modify: `src/components/layout/page-intro.tsx`
- Modify: `src/components/actions/contact-action.tsx`
- Modify: `src/components/brand/prizic-logo.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/components/site-header.test.tsx`
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**

- Consumes: `AccentSwitcher`, `FolioLabel`, `EditorialArrow`, `PrizicLogo`, existing `ContactState`, and `NavigationItem`.
- Produces: one shared compact header and dark closing footer for all routes.
- `PageIntro` retains `title`, `introduction`, and optional `className`; add optional `index?: string` and `eyebrow?: string`.

- [ ] **Step 1: Update tests to require the accent control and new presentation landmarks**

Add assertions:

```tsx
expect(screen.getByRole("group", { name: "Accent color" })).toBeVisible();
expect(screen.getByRole("link", { name: "Prizic home" })).toBeVisible();
expect(screen.getByRole("navigation", { name: "Primary" })).toBeVisible();
```

Update the desktop keyboard order in `tests/e2e/site.spec.ts` so each of the three accent radios appears after the route links and before the contact link.

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
pnpm test tests/components/site-header.test.tsx
pnpm test:e2e tests/e2e/site.spec.ts
```

Expected: FAIL because the header does not render the accent selector and the focus order changed.

- [ ] **Step 3: Rebuild the shared frame**

The desktop header order must be logo, primary navigation, accent selector, contact capsule. The compact header uses the mark, accent selector, and menu trigger. Preserve the existing no-JavaScript mobile fallback and focus trap.

Update `PageIntro` to emit:

```tsx
<header aria-labelledby="page-title" className={classes}>
  <FolioLabel detail={eyebrow} index={index} section={title} />
  <div className="page-intro__grid">
    <h1 id="page-title">{title}</h1>
    <p>{introduction}</p>
  </div>
</header>
```

The footer must contain the approved closing line, direct contact action, navigation, P/Z mark, and copyright in a black rounded folio composition. Do not add social links or legal links without destinations.

- [ ] **Step 4: Style the shared frame at desktop and mobile widths**

Match the reference’s small top navigation, compact metadata, black capsule action, and warm paper canvas. Keep 44-pixel interactive hit areas even when the visible control is visually smaller. At `max-width: 56.24rem`, hide the primary navigation and contact capsule, show the mobile trigger, and keep the swatches accessible.

- [ ] **Step 5: Run shared-frame tests**

Run:

```bash
pnpm test tests/components/site-header.test.tsx tests/components/contact-action.test.tsx
pnpm test:e2e tests/e2e/site.spec.ts
```

Expected: all focused tests PASS.

- [ ] **Step 6: Commit the shared frame**

```bash
git add src/components/layout src/components/actions/contact-action.tsx src/components/brand/prizic-logo.tsx src/app/globals.css tests/components/site-header.test.tsx tests/e2e/site.spec.ts
git commit -m "feat: rebuild Prizic shared editorial frame"
```

---

### Task 4: Reference-Fidelity Homepage

**Files:**

- Create: `src/components/home/opening-spread.tsx`
- Create: `src/components/home/method-spread.tsx`
- Create: `src/components/home/story-spreads.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/principles-section.tsx`
- Modify: `src/components/home/capabilities-section.tsx`
- Modify: `src/components/home/founder-section.tsx`
- Modify: `src/components/home/closing-section.tsx`
- Modify: `src/components/brand/living-wordmark.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/components/homepage.test.tsx`
- Modify: `tests/e2e/homepage-runtime.spec.ts`

**Interfaces:**

- Consumes: existing `SITE_CONTENT` only; no fabricated evidence fields.
- Produces: `<OpeningSpread />`, `<MethodSpread />`, and `<StorySpreads />` as server components except the existing living wordmark boundary.
- Maintains one visible H1 with accessible name “From possibility to working systems.”

- [ ] **Step 1: Replace legacy hero assertions with the new semantic spread contract**

```tsx
it("composes the homepage as the approved editorial deck", () => {
  const { container } = render(<HomePage />);

  expect(container.querySelector('[data-spread="opening"]')).toBeInTheDocument();
  expect(container.querySelector('[data-spread="method"]')).toBeInTheDocument();
  expect(container.querySelector('[data-spread="introduction"]')).toBeInTheDocument();
  expect(container.querySelector('[data-spread="principles"]')).toBeInTheDocument();
  expect(container.querySelector('[data-spread="capabilities"]')).toBeInTheDocument();
  expect(container.querySelector('[data-spread="founder"]')).toBeInTheDocument();
  expect(container.querySelector('[data-spread="closing"]')).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: SITE_CONTENT.hero.headline })).toBeVisible();
});
```

Keep the existing content-order and public-content assertions.

- [ ] **Step 2: Run homepage tests and verify failure**

Run:

```bash
pnpm test tests/components/homepage.test.tsx
```

Expected: FAIL because the new `data-spread` composition does not exist.

- [ ] **Step 3: Build the opening and method spreads first**

The opening spread must use this hierarchy:

```tsx
<section aria-labelledby="home-title" className="opening-spread" data-spread="opening">
  <FolioLabel detail="Technology company" index="01" section="Prizic" />
  <div className="opening-spread__grid">
    <div className="opening-spread__statement">
      <h1 id="home-title">From possibility to working systems.</h1>
      <p>{SITE_CONTENT.hero.supportingText}</p>
    </div>
    <div className="opening-spread__feature">
      <EditorialArtwork decorative variant="fold" />
      <LivingWordmark expandedSignal />
    </div>
    <div className="opening-spread__action">
      <ContactAction
        contact={{ kind: "ready", href: SITE_CONTENT.hero.actions[0].href }}
        label={SITE_CONTENT.hero.actions[0].label}
      />
      <Link href={SITE_CONTENT.hero.actions[1].href}>
        {SITE_CONTENT.hero.actions[1].label}
      </Link>
    </div>
  </div>
</section>
```

`MethodSpread` renders four indexed modules in order. It must use semantic `<ol>`, place one module on `var(--ink)`, another on `var(--accent)`, and preserve descriptions in the document.

- [ ] **Step 4: Prove the hero at the reference desktop aspect**

Start the site and capture only the first viewport at 1440 by 900 to `.impeccable/review/hero-repro.png`:

```bash
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3100 NEXT_PUBLIC_CONTACT_URL=mailto:preview@prizic.test pnpm dev --hostname 127.0.0.1 --port 3100
```

Compare beside the supplied reference. Correct type coverage, panel proportions, spacing, black/gray material balance, rounded corners, and accent scarcity before building later sections.

- [ ] **Step 5: Build the remaining homepage spreads**

Compose introduction, principles, process/direction, capabilities, founder, and closing sections as materially different twelve-column spreads. Reuse `EditorialArtwork` variants but change their crop and placement. Preserve all approved content and links. Do not insert metrics, clients, projects, testimonials, or case-study shells.

- [ ] **Step 6: Replace homepage CSS as one coherent system**

Remove superseded `.home-hero`, `.home-system`, and legacy homepage-layout rules once no markup consumes them. Implement the 1440-pixel composition first, then 1280, 768, 375, and 320 breakpoints. The opening spread should occupy approximately one viewport, and no small supporting module should compete with the H1.

- [ ] **Step 7: Update runtime geometry tests**

Assert the first viewport’s feature panel dominates its attached support modules:

```ts
const opening = page.locator('[data-spread="opening"]');
const feature = opening.locator(".opening-spread__feature");
const statement = opening.locator(".opening-spread__statement");
const [featureBox, statementBox] = await Promise.all([
  feature.boundingBox(),
  statement.boundingBox(),
]);
expect(featureBox).not.toBeNull();
expect(statementBox).not.toBeNull();
expect(featureBox!.width).toBeGreaterThan(statementBox!.width * 0.9);
```

Keep the hydration-error check and replace blueprint-specific selectors with new spread selectors.

- [ ] **Step 8: Run homepage tests and commit**

Run:

```bash
pnpm test tests/components/homepage.test.tsx tests/components/living-wordmark.test.tsx
pnpm test:e2e tests/e2e/homepage-runtime.spec.ts
```

Expected: all focused tests PASS.

```bash
git add src/app/page.tsx src/app/globals.css src/components/home src/components/brand/living-wordmark.tsx tests/components/homepage.test.tsx tests/e2e/homepage-runtime.spec.ts .impeccable/review/hero-repro.png
git commit -m "feat: rebuild Prizic homepage as editorial spreads"
```

---

### Task 5: Supporting Routes and Not-Found Composition

**Files:**

- Modify: `src/app/thinking/page.tsx`
- Modify: `src/app/capabilities/page.tsx`
- Modify: `src/app/partnerships/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/components/routes.test.tsx`

**Interfaces:**

- Consumes: `PageIntro`, `FolioLabel`, `EditorialArtwork`, `EditorialArrow`, `SITE_CONTENT`, and existing contact resolution.
- Produces: route-specific `data-page` and `data-spread` landmarks without introducing a new data model.

- [ ] **Step 1: Add failing route-composition assertions**

Add a route-level `data-page` expectation for each component:

```tsx
const routeExpectations = [
  { Page: ThinkingPage, page: "thinking", spread: "commitments" },
  { Page: CapabilitiesPage, page: "capabilities", spread: "artifacts" },
  { Page: PartnershipsPage, page: "partnerships", spread: "partnership-path" },
  { Page: AboutPage, page: "about", spread: "name-study" },
  { Page: ContactPage, page: "contact", spread: "contact-field" },
] as const;

it.each(routeExpectations)("composes $page as an editorial route", ({ Page, page, spread }) => {
  const { container } = render(<Page />);
  expect(container.querySelector(`[data-page="${page}"]`)).toBeInTheDocument();
  expect(container.querySelector(`[data-spread="${spread}"]`)).toBeInTheDocument();
});
```

Preserve all existing truthfulness, expanded-copy, contact-state, and not-found assertions.

- [ ] **Step 2: Run route tests and verify failure**

Run:

```bash
pnpm test tests/components/routes.test.tsx
```

Expected: FAIL because the new editorial landmarks do not exist.

- [ ] **Step 3: Recompose Thinking and Capabilities**

Thinking gets an indexed opening, a three-principle summary, an alternating four-stage method, and a dense commitments ledger. Capabilities gets an artwork-led opening, three unequal capability territories, a large typographic artifact inventory, and a contrast boundary spread. Use semantic lists and existing content exactly.

- [ ] **Step 4: Recompose Partnerships, About, Contact, and Not Found**

Partnerships shows roles and process only. About includes founder, purpose, pronunciation, associations, and the existing living wordmark. Contact keeps one real direct-contact action plus the three non-form prompts: Idea, Current situation, Desired change. Not Found retains HTTP 404 behavior and the return-home link.

The contact prompts are structural labels and must not be rendered as inputs:

```tsx
<ol aria-label="What to include" className="contact-prompts">
  <li><span>01</span><strong>The idea</strong></li>
  <li><span>02</span><strong>The current situation</strong></li>
  <li><span>03</span><strong>The desired change</strong></li>
</ol>
```

- [ ] **Step 5: Complete route-specific CSS and remove dead legacy rules**

Give each route at least one distinctive composition while keeping the same type, panel, metadata, radius, and accent grammar. Use `rg` to confirm removed class names are not referenced before deleting their CSS. Preserve the mobile dialog styles until the new mobile menu passes tests.

- [ ] **Step 6: Run route and content tests**

Run:

```bash
pnpm test tests/components/routes.test.tsx tests/unit/public-content.test.ts
pnpm test:e2e tests/e2e/site.spec.ts
```

Expected: all focused tests PASS and prohibited-claim scans remain clean.

- [ ] **Step 7: Commit the supporting routes**

```bash
git add src/app src/app/globals.css tests/components/routes.test.tsx
git commit -m "feat: apply editorial system across Prizic routes"
```

---

### Task 6: Responsive, Motion, Theme, and Accessibility Hardening

**Files:**

- Create: `tests/e2e/accent-theme.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `src/app/globals.css`
- Modify: `src/components/theme/accent-switcher.tsx`
- Modify: `src/components/layout/mobile-menu.tsx`
- Modify: `src/components/brand/living-wordmark.tsx`
- Modify: `src/components/home/method-spread.tsx`
- Modify: `src/components/editorial/editorial-artwork.tsx`

**Interfaces:**

- Consumes: `data-accent`, all `data-page`/`data-spread` landmarks, existing reduced-motion behavior.
- Produces: verified behavior across the required viewports and all three accents.

- [ ] **Step 1: Write the failing accent persistence test**

```ts
import { expect, test } from "@playwright/test";

test("accent selection persists across routes and reloads", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: "Electric lime" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");

  await page.goto("/thinking");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");
  await expect(page.getByRole("radio", { name: "Electric lime" })).toBeChecked();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "lime");
});

test("all approved accents expose their exact token", async ({ page }) => {
  await page.goto("/");
  const expected = { cyan: "#00d9ff", lime: "#65ed9d", yellow: "#eff300" };
  for (const [accent, color] of Object.entries(expected)) {
    await page.getByRole("radio", { name: new RegExp(accent, "i") }).check();
    expect(await page.locator("html").evaluate((element) => getComputedStyle(element).getPropertyValue("--accent").trim())).toBe(color);
  }
});
```

- [ ] **Step 2: Run the accent test and verify any integration gaps**

Run:

```bash
pnpm test:e2e tests/e2e/accent-theme.spec.ts
```

Expected: FAIL until persistence, accessible names, and exact computed tokens agree.

- [ ] **Step 3: Update responsive tests for the new compositions**

For 320, 375, 768, 1280, and 1440 widths, keep the overflow assertion and additionally confirm the opening feature, method modules, footer action, and accent control have nonzero boxes. At mobile widths, verify method module text order remains Question, Direction, Software, Learning.

- [ ] **Step 4: Verify reduced motion and no-JavaScript behavior**

Replace removed blueprint selectors with the new method-spread selectors. Reduced motion must show every stage and final Prizic wordmark immediately. With JavaScript disabled, the default cyan theme, primary navigation fallback, approved headline, supporting text, method stages, and direct contact link remain visible.

- [ ] **Step 5: Run the accessibility and responsive suites**

Run:

```bash
pnpm test:e2e tests/e2e/accent-theme.spec.ts tests/e2e/responsive.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: all tests PASS with zero serious or critical axe violations.

- [ ] **Step 6: Run the full engineering gate**

Run:

```bash
pnpm test
pnpm lint
pnpm typecheck
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:seifsaif151@gmail.com pnpm build --webpack
pnpm test:e2e
```

Expected: every command exits 0.

- [ ] **Step 7: Commit the hardening pass**

```bash
git add src tests
git commit -m "test: harden editorial themes and responsive behavior"
```

---

### Task 7: Motion, Asset, Geometry, and Rhythm Correction

**User-approved correction:** The first preview was too static; the header used a static logo, directional arrows did not move, hero shapes looked broken, and large vertical gaps made the site feel empty. Integrate original generated assets and add a coherent motion system without sacrificing the Task 6 accessibility guarantees.

**Files:**

- Create: `public/images/editorial/prizic-monolith.webp`
- Create: `public/images/editorial/prizic-ribbon-system.webp`
- Create: `public/images/editorial/prizic-iteration.webp`
- Create: `src/components/brand/animated-header-logo.tsx`
- Create: `src/components/motion/scroll-reveal.tsx`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/editorial/editorial-arrow.tsx`
- Modify: `src/components/editorial/editorial-artwork.tsx`
- Modify: `src/components/home/opening-spread.tsx`
- Modify: `src/components/home/story-spreads.tsx`
- Modify: `src/app/globals.css`
- Modify: focused component and browser tests
- Replace: `.impeccable/review/desktop.png`
- Replace: `.impeccable/review/mobile.png`

**Generated source assets:**

- Graphite monolith: `/Users/seifelesllamseif/.codex/generated_images/01a063d9-458e-7fe2-a033-a3dd2b34685d/exec-ad6e3d73-e713-42ee-bfbe-1a0b4aa1d92d.png`
- Ivory ribbon system: `/Users/seifelesllamseif/.codex/generated_images/01a063d9-458e-7fe2-a033-a3dd2b34685d/exec-3b1eabcd-a229-477b-89cf-468c4766c78b.png`
- Graphite iteration study: `/Users/seifelesllamseif/.codex/generated_images/01a063d9-458e-7fe2-a033-a3dd2b34685d/exec-d936b440-06aa-4d79-bc07-28ed71c0735b.png`

**Interfaces:**

- The header consumes a compact animated Prizic mark/wordmark that never hides `Pr` or `c`, plays one restrained entrance, and settles legibly.
- Editorial arrows visibly translate in their pointing direction on hover and keyboard focus, with a subtle authored entrance when appropriate.
- Scroll reveals use one reusable client boundary and preserve visible server-rendered defaults before hydration.
- Generated assets are optimized to WebP, rendered through `next/image`, and treated as original editorial imagery rather than logos.
- `prefers-reduced-motion` shows every element and the settled logo immediately, with no autoplay, looping, parallax, or delayed visibility.

- [ ] **Step 1: Add failing behavior tests**

Cover the animated header-logo presence and settled accessible home link, arrow translation state on hover/focus, server-visible scroll-reveal content, and reduced-motion static state. Add a geometry regression for the opening artwork and a vertical-rhythm check that prevents the large dead band after the opening spread.

- [ ] **Step 2: Optimize and install the generated assets**

Convert the three source PNGs to high-quality WebP without changing the originals. Keep reasonable intrinsic dimensions and file sizes for production. Place only the final assets under `public/images/editorial/` and render them with explicit sizes, `sizes`, and suitable priority only for the opening asset.

- [ ] **Step 3: Build the animated header identity**

Replace the static top-left logo presentation with a compact animated Prizic identity using the approved P/Z mark and wordmark language. Keep the home link, accessible name, hit area, and stable settled width. Animate transform/opacity/clip-path only; do not cause layout shift. `Pr` and `c` remain visible throughout; internal line motion and `i`-dot blink may provide the authored moment.

- [ ] **Step 4: Correct hero artwork and visual rhythm**

Replace the two generic/broken vector tiles with intentional crops of the graphite monolith and ivory ribbon assets. Ensure the pair reads as one asymmetric composition at 1440/1280 and stacks cleanly at 768/375/320. Tighten opening and inter-spread spacing so no empty band appears accidental, while preserving separation and the reference's presentation cadence.

- [ ] **Step 5: Add the coherent motion language**

Implement scroll-triggered reveals once per spread with already-visible server defaults and exponential ease-out. Stagger meaningful grouped items. Give arrows directional hover/focus motion. Make motion a defining feature across the generated artwork: layered mask reveals, slow crop drift, scroll-linked parallax, subtle pointer/hover tilt and depth, and restrained accent-line passes. Animate existing internal line details and selected modular panels so the composition responds throughout the page, while varying timing and direction instead of applying one identical entrance everywhere. Keep animation GPU-friendly, avoid layout-property animation, prevent motion from obscuring copy or controls, and make every effect immediately static under reduced motion.

- [ ] **Step 6: Verify motion and visuals**

Run focused component tests, browser interaction tests, all Task 6 accessibility/reduced-motion tests, and overflow checks at 320, 375, 768, 1280, and 1440. Capture verified new desktop and mobile previews from an isolated production-like server. Compare spacing, asset crops, and animation settled states to the supplied reference boards.

- [ ] **Step 7: Run engineering gates and commit**

Run unit/component tests, full E2E, lint, typecheck, and production build. Commit the optimized assets, integration, animation components, tests, and captures as one reviewed correction.

---

### Task 8: Visual Fidelity Review, Design Documentation, and Production Release

**Files:**

- Create or replace: `.impeccable/review/desktop.png`
- Create or replace: `.impeccable/review/mobile.png`
- Modify: `DESIGN.md`
- Modify: `.impeccable/design.json`
- Modify: `README.md` only if deployment instructions changed
- Modify: any UI file named by the bounded finish review

**Interfaces:**

- Consumes: approved specification, supplied reference screenshots, implemented UI, Impeccable craft floor, detector, finish reviewer, and documenter.
- Produces: reviewed screenshots, synchronized design documentation, a clean Git commit, pushed GitHub state, and the Vercel production deployment on `prizic.com`.

- [ ] **Step 1: Load the craft floor immediately before the final UI pass**

Read completely:

```text
/Users/seifelesllamseif/.codex/skills/impeccable/reference/craft-floor.md
```

- [ ] **Step 2: Capture one batched visual inspection round**

Run the site with production-like environment values, settle entrance motion, and capture from document top:

```text
.impeccable/review/desktop.png — 1440 × 900
.impeccable/review/mobile.png — 375 × 812
```

Open both files and validate that neither is blank, mid-animation, incorrectly scrolled, clipped, or showing the wrong route. Compare desktop beside the supplied references at legible scale. Inspect cyan, lime, and yellow modes during the same browser round; the saved desktop capture uses cyan unless a later user choice changes the default.

- [ ] **Step 3: Run the Impeccable detector exactly once**

Run:

```bash
node /Users/seifelesllamseif/.codex/skills/impeccable/scripts/detect.mjs --json src/app/layout.tsx src/app/globals.css src/app/page.tsx src/app/thinking/page.tsx src/app/capabilities/page.tsx src/app/partnerships/page.tsx src/app/about/page.tsx src/app/contact/page.tsx src/app/not-found.tsx src/components
```

Fix mechanical findings as one batch. Do not run the detector a second time.

- [ ] **Step 4: Run the shipped finish review**

Give the reviewer the original request, approved spec, reference screenshots, `hero-repro.png`, `desktop.png`, `mobile.png`, changed targets, detector findings, and craft-floor path. Act on the exact disposition: recapture invalid evidence, rebuild a failed visual region, or batch material fixes. A fix verdict must explicitly score each requested correction.

- [ ] **Step 5: Regenerate durable design documentation**

After the last visual correction, run the Impeccable documenter against the project root, all public routes, `PRODUCT.md`, the approved direction contract, and the final screenshots. It must rewrite `DESIGN.md` and `.impeccable/design.json` from the built visual world, removing the stale-sidecar condition.

- [ ] **Step 6: Run fresh final verification**

Run:

```bash
pnpm test
pnpm lint
pnpm typecheck
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:seifsaif151@gmail.com pnpm build --webpack
pnpm test:e2e
git diff --check
git status --short
```

Expected: all commands exit 0, no untracked shipping files are missing from the intended commit, and the only remaining changes are the reviewed redesign and synchronized documentation.

- [ ] **Step 7: Commit and push the reviewed redesign**

```bash
git add src tests public .impeccable DESIGN.md README.md
git commit -m "feat: launch Prizic editorial deck redesign"
git push origin main
```

- [ ] **Step 8: Deploy to Vercel production**

Run with the working Node 22 path:

```bash
PATH='/opt/homebrew/opt/node@22/bin:/Users/seifelesllamseif/Library/pnpm':"$PATH" vercel deploy --prod --yes --scope katanaz
```

Confirm Vercel reports the deployment READY and aliases `prizic.com` and `www.prizic.com` to it.

- [ ] **Step 9: Verify the real domain from multiple boundaries**

Verify:

```bash
curl -I https://prizic.com
curl -I https://www.prizic.com
curl -I https://prizic.com/thinking
curl -I https://prizic.com/capabilities
curl -I https://prizic.com/partnerships
curl -I https://prizic.com/about
curl -I https://prizic.com/contact
```

Expected: apex routes return 200, `www` redirects permanently to apex, TLS verifies, and a fresh collaborative-browser snapshot shows the new editorial homepage with no console errors.
