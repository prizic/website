# Prizic Corporate Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a complete Prizic corporate/PR website that explains the company through the approved Blueprint composition and living-wordmark animation without publishing dental content, fake proof, pricing or an unreleased product offer.

**Architecture:** A new `/website` Next.js App Router application renders six static corporate routes from typed local content. Server Components own content, metadata and page composition; Client Components are limited to mobile navigation, the one-time wordmark animation and progressive blueprint motion. Brand geometry is authored as SVG, and direct-contact configuration is validated so a production build cannot silently ship an invented or pending destination.

**Tech Stack:** pnpm, Next.js App Router, React, TypeScript, Tailwind CSS v4, Motion for React, Vitest, Testing Library, vitest-axe, Playwright

**Spec:** `docs/specs/2026-09-05-prizic-corporate-website-design.md`

## Global Constraints

- Build the app at this standalone repository root; do not place it back inside the company-operations repository.
- Use the approved Prizic assets from `02 Brand/Logo/Prizic/`; copy only required runtime assets and leave the originals unchanged.
- The public site contains no dental, dentist, clinic or booking content.
- Do not create projects, customers, logos, testimonials, reviews, commercial metrics, pricing, packages, checkout or a “book a demo” action.
- Use only near-black `#0A0E1A`, deep indigo `#141A2E`, muted slate `#2A3350`, off-white `#EDEFF5`, muted gray-blue `#8B93AB` and electric cyan `#00D9FF`; cyan text on cyan and white text on cyan are forbidden.
- No gradients, glow, glassmorphism, stock imagery, generic technology art, endless marquee, cursor replacement or looping logo.
- The selected composition is Blueprint / The Prizic System with Signal's living wordmark; comp-first fidelity is assessed against `.impeccable/mocks/decision/prizic-system.webp` and `.impeccable/mocks/decision/living-wordmark.webp`.
- The design contract seed is `89484ca6`.
- The P/Z icon remains still; `Pr` and `c` remain visible; the word sequence runs once and settles.
- Target WCAG 2.2 AA, visible keyboard focus, 44 × 44 px minimum touch targets and full reduced-motion fallbacks.
- Core navigation and content render server-side and remain usable without JavaScript.
- Use logical CSS properties and prevent horizontal body overflow at 320, 375, 768, 1280 and 1440 px.
- English only for the first release; no CMS, database, analytics, third-party embeds, contact form or visitor-data storage.
- A verified canonical URL and direct contact URL are required for a production deployment; preview mode represents missing values truthfully.

---

## File Map

### Project and tooling

- `package.json`: scripts and runtime/development dependencies
- `pnpm-lock.yaml`: reproducible dependency graph
- `next.config.ts`: Next.js configuration
- `tsconfig.json`: strict TypeScript configuration
- `eslint.config.mjs`: framework and TypeScript lint rules
- `postcss.config.mjs`: Tailwind PostCSS integration
- `vitest.config.mts`: jsdom unit/component test configuration
- `playwright.config.ts`: production-server end-to-end configuration
- `src/test/setup.ts`: Testing Library and jest-dom setup

### Content and configuration

- `src/content/types.ts`: typed content contracts
- `src/content/site.ts`: all approved public copy and navigation
- `src/lib/site-config.ts`: environment parsing and launch-state validation
- `src/lib/public-content.ts`: prohibited-content guard
- `src/lib/metadata.ts`: shared metadata construction

### Application routes

- `src/app/layout.tsx`: fonts, metadata defaults, design contract and global shell
- `src/app/page.tsx`: homepage narrative
- `src/app/thinking/page.tsx`: permanent principles page
- `src/app/capabilities/page.tsx`: capability categories and boundaries
- `src/app/partnerships/page.tsx`: partnership model and limitations
- `src/app/about/page.tsx`: founder, purpose and name explanation
- `src/app/contact/page.tsx`: direct configured contact state
- `src/app/not-found.tsx`: branded 404
- `src/app/sitemap.ts`: static route inventory
- `src/app/robots.ts`: crawler policy and sitemap location
- `src/app/opengraph-image.tsx`: owned social preview
- `src/app/globals.css`: tokens, typography, layout and responsive rules

### Components

- `src/components/layout/site-header.tsx`: desktop header and mobile-menu boundary
- `src/components/layout/mobile-menu.tsx`: accessible client-side mobile navigation
- `src/components/layout/site-footer.tsx`: footer navigation and contact state
- `src/components/layout/page-intro.tsx`: supporting-route heading pattern
- `src/components/brand/prizic-logo.tsx`: supplied static logo/mark selection
- `src/components/brand/living-wordmark.tsx`: one-time Anchor and face resolution
- `src/components/brand/prizic-blueprint.tsx`: semantic four-stage diagram plus motion enhancement
- `src/components/actions/contact-action.tsx`: ready or pending contact rendering
- `src/components/home/principles-section.tsx`: editorial principle sequence
- `src/components/home/capabilities-section.tsx`: integrated capability statements
- `src/components/home/founder-section.tsx`: factual founder statement
- `src/components/home/closing-section.tsx`: low-pressure final actions

### Runtime assets

- `public/brand/prizic-lockup-on-dark.svg`
- `public/brand/prizic-mark-on-dark.svg`
- `public/brand/prizic-mark-on-light.svg`
- `src/app/icon.ico`
- `src/app/apple-icon.png`

### Tests

- `tests/unit/site-config.test.ts`
- `tests/unit/public-content.test.ts`
- `tests/components/site-header.test.tsx`
- `tests/components/living-wordmark.test.tsx`
- `tests/components/prizic-blueprint.test.tsx`
- `tests/components/contact-action.test.tsx`
- `tests/components/homepage.test.tsx`
- `tests/e2e/site.spec.ts`
- `tests/e2e/accessibility.spec.ts`
- `tests/e2e/responsive.spec.ts`

---

### Task 1: Scaffold the application and lock truthful content configuration

**Files:**

- Create: `package.json`
- Create: `pnpm-lock.yaml`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `postcss.config.mjs`
- Create: `vitest.config.mts`
- Create: `src/test/setup.ts`
- Create: `src/content/types.ts`
- Create: `src/content/site.ts`
- Create: `src/lib/site-config.ts`
- Create: `src/lib/public-content.ts`
- Test: `tests/unit/site-config.test.ts`
- Test: `tests/unit/public-content.test.ts`

**Interfaces:**

- Produces: `SiteContent`, `NavigationItem`, `Principle`, `ProcessStage`, `Capability`, `ContactState`
- Produces: `resolveSiteConfig(env: NodeJS.ProcessEnv, mode: "development" | "test" | "production"): SiteConfig`
- Produces: `assertPublicContent(text: string): void`
- Consumes: exact copy and prohibitions from the approved design specification

- [x] **Step 1: Scaffold the isolated website package**

Run from the workspace root:

```bash
pnpm dlx create-next-app@latest website --ts --tailwind --eslint --app --src-dir --import-alias '@/*' --use-pnpm --disable-git
pnpm add motion
pnpm add -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest-axe @playwright/test
pnpm exec playwright install chromium
```

Keep the scaffold's current stable Next.js and React versions. Do not copy code from the unrelated product-lab applications.

- [x] **Step 2: Add test scripts and the jsdom test environment**

Set the package scripts to include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Configure `vitest.config.mts` with the React plugin, `jsdom`, `@/` mapped to `src`, and `src/test/setup.ts` as the setup file. The setup file imports `@testing-library/jest-dom/vitest`.

- [x] **Step 3: Write failing configuration tests**

Create `tests/unit/site-config.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { resolveSiteConfig } from "@/lib/site-config";

describe("resolveSiteConfig", () => {
  it("represents missing development destinations truthfully", () => {
    expect(resolveSiteConfig({}, "development")).toEqual({
      canonicalUrl: null,
      contact: { kind: "pending" },
    });
  });

  it("accepts verified https destinations", () => {
    expect(resolveSiteConfig({
      NEXT_PUBLIC_SITE_URL: "https://prizic.com",
      NEXT_PUBLIC_CONTACT_URL: "mailto:hello@prizic.com",
    }, "test")).toMatchObject({
      canonicalUrl: "https://prizic.com",
      contact: { kind: "ready", href: "mailto:hello@prizic.com" },
    });
  });

  it("rejects pending production configuration", () => {
    expect(() => resolveSiteConfig({}, "production")).toThrow(
      "Production requires NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_URL",
    );
  });
});
```

- [x] **Step 4: Run the configuration test and confirm failure**

Run: `pnpm test -- tests/unit/site-config.test.ts`

Expected: FAIL because `@/lib/site-config` does not exist.

- [x] **Step 5: Implement typed configuration resolution**

Create discriminated `ContactState` and `SiteConfig` types. `resolveSiteConfig` must:

- return `null` and `{ kind: "pending" }` in non-production when values are absent;
- normalize the canonical URL without a trailing slash;
- accept contact schemes `mailto:`, `https:` and `http:` only;
- throw a descriptive error for malformed values;
- throw the exact production-missing error asserted above.

Use the native `URL` parser. Do not add a validation framework for two values.

- [x] **Step 6: Write failing prohibited-content tests**

Create `tests/unit/public-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { assertPublicContent } from "@/lib/public-content";

describe("assertPublicContent", () => {
  it.each(["dental", "Dentist", "clinic", "online booking", "pricing", "testimonial"])(
    "rejects prohibited public copy: %s",
    (term) => expect(() => assertPublicContent(term)).toThrow(/prohibited public content/i),
  );

  it("accepts approved corporate copy", () => {
    expect(() => assertPublicContent(
      "Prizic combines product thinking, engineering and long-term technical direction.",
    )).not.toThrow();
  });
});
```

- [x] **Step 7: Run the prohibited-content test and confirm failure**

Run: `pnpm test -- tests/unit/public-content.test.ts`

Expected: FAIL because `@/lib/public-content` does not exist.

- [x] **Step 8: Implement the content contracts and approved copy**

Create `assertPublicContent` using word-boundary, case-insensitive checks for `dental`, `dentist`, `clinic`, `booking`, `pricing` and `testimonial`. Create `SiteContent` and the `SITE_CONTENT` object containing:

- navigation: Thinking, Capabilities, Partnerships, About;
- hero: “From possibility to working systems.” and the approved founder-led supporting line;
- principles: Clarity before complexity, Useful before impressive, Systems over one-offs;
- process: Question, Direction, Software, Learning with the exact descriptions from the spec;
- capabilities: Digital products, Business systems, Technology partnerships;
- founder and closing copy from the spec;
- pronunciation and name associations.

At module initialization, serialize `SITE_CONTENT` and call `assertPublicContent` so prohibited text fails during tests and builds.

- [x] **Step 9: Run foundation verification**

Run:

```bash
pnpm test -- tests/unit/site-config.test.ts tests/unit/public-content.test.ts
pnpm typecheck
pnpm lint
```

Expected: all commands pass.

- [x] **Step 10: Commit the foundation**

```bash
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json eslint.config.mjs postcss.config.mjs vitest.config.mts src/test src/content src/lib tests/unit
git commit -m "feat: scaffold Prizic corporate website foundation"
```

---

### Task 2: Implement the global visual system and accessible shell

**Files:**

- Create: `src/app/globals.css`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/mobile-menu.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/page-intro.tsx`
- Create: `src/components/brand/prizic-logo.tsx`
- Create: `src/components/actions/contact-action.tsx`
- Modify: `src/app/layout.tsx`
- Copy: approved runtime assets to `public/brand/` and app icons to `src/app/`
- Test: `tests/components/site-header.test.tsx`
- Test: `tests/components/contact-action.test.tsx`

**Interfaces:**

- Consumes: `SITE_CONTENT.navigation`, `resolveSiteConfig`
- Produces: `SiteHeader`, `SiteFooter`, `PageIntro`, `PrizicLogo`, `ContactAction`
- Produces: semantic CSS tokens and layout utilities used by every later task

- [x] **Step 1: Copy only the approved brand assets**

Run:

```bash
mkdir -p public/brand
cp '02 Brand/Logo/Prizic/prizic-lockup-on-dark.svg' public/brand/
cp '02 Brand/Logo/Prizic/prizic-mark-on-dark.svg' public/brand/
cp '02 Brand/Logo/Prizic/prizic-mark-on-light.svg' public/brand/
cp '02 Brand/Logo/Prizic/png/favicon.ico' src/app/icon.ico
cp '02 Brand/Logo/Prizic/png/apple-touch-icon.png' src/app/apple-icon.png
```

Do not modify or delete the source assets.

- [x] **Step 2: Write failing shell component tests**

Test these public behaviors:

```tsx
render(<SiteHeader navigation={SITE_CONTENT.navigation} />);
expect(screen.getByRole("link", { name: "Prizic home" })).toHaveAttribute("href", "/");
expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "Open menu" }));
expect(screen.getByRole("dialog", { name: "Navigation" })).toBeVisible();
await user.keyboard("{Escape}");
expect(screen.queryByRole("dialog", { name: "Navigation" })).not.toBeInTheDocument();
```

For `ContactAction`, assert that `{ kind: "pending" }` renders noninteractive text “Contact destination pending” and `{ kind: "ready", href }` renders a link named “Email Prizic”.

- [x] **Step 3: Run the shell tests and confirm failure**

Run: `pnpm test -- tests/components/site-header.test.tsx tests/components/contact-action.test.tsx`

Expected: FAIL because the shell components do not exist.

- [x] **Step 4: Implement the design tokens and document foundation**

Replace scaffold styling with CSS variables from the spec. Set dark color scheme, off-white text, Space Grotesk/Inter/JetBrains Mono font variables from `next/font/google`, logical margins and paddings, a 1280 px maximum frame, 4 px spacing-derived values, visible cyan focus rings and a section-level off-white field utility.

Add these non-negotiable global rules:

```css
html { color-scheme: dark; scroll-behavior: smooth; }
body { margin: 0; overflow-x: clip; background: var(--bg); color: var(--text); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

- [x] **Step 5: Implement the shell and contact states**

`SiteHeader` is a Server Component except for the imported `MobileMenu`. Desktop navigation is a plain `<nav>`. `MobileMenu` manages open state, closes on Escape and route selection, restores focus to the trigger, locks body scrolling while open and renders a labelled modal dialog.

`ContactAction` accepts:

```ts
type ContactActionProps = {
  contact: ContactState;
  label?: string;
  className?: string;
};
```

The pending state is not an anchor or enabled button. The ready state is a normal anchor and uses the provided `label`, defaulting to “Email Prizic” when the prop is omitted.

- [x] **Step 6: Add the auditable direction contract to the root layout**

React strips source comments, so emit an inert `<template>` as the first `<body>` child with `data-impeccable-contract="89484ca6"` and this compact text:

```text
THESIS: Prizic makes its method the proof and refuses the generic agency portfolio. OWN-WORLD: near-black architectural field, off-white type, sparse cyan routes, measured P/Z geometry. STORY: understand the company, inspect how it thinks, then start a conversation. FIRST VIEWPORT: copy at left, four-state blueprint at right, contact action in the header. FORM: approved Blueprint plus living wordmark, seed 89484ca6. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
```

The template is inert, hidden and grep-verifiable in built output. Place `SiteHeader`, `<main>{children}</main>` and `SiteFooter` after it.

- [x] **Step 7: Run shell verification**

Run:

```bash
pnpm test -- tests/components/site-header.test.tsx tests/components/contact-action.test.tsx
pnpm typecheck
pnpm lint
```

Expected: all commands pass.

- [x] **Step 8: Commit the shell**

```bash
git add src/app src/components/layout src/components/actions src/components/brand/prizic-logo.tsx public/brand tests/components
git commit -m "feat: add accessible Prizic site shell"
```

---

### Task 3: Build the living wordmark and semantic blueprint

**Files:**

- Create: `src/components/brand/living-wordmark.tsx`
- Create: `src/components/brand/prizic-blueprint.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/components/living-wordmark.test.tsx`
- Test: `tests/components/prizic-blueprint.test.tsx`

**Interfaces:**

- Consumes: `SITE_CONTENT.process`
- Produces: `LivingWordmark({ autoPlay?: boolean })`
- Produces: `PrizicBlueprint({ stages, compact?: boolean })`

- [x] **Step 1: Write failing wordmark behavior tests**

Use a controllable `matchMedia` mock and fake timers. Assert:

```tsx
expect(screen.getByRole("img", { name: "Prizic" })).toBeInTheDocument();
expect(screen.getByText("Pr")).toBeVisible();
expect(screen.getByText("c")).toBeVisible();
expect(screen.getByRole("button", { name: "Replay Prizic word animation" })).toBeEnabled();
```

Advance timers through Precise, Prism, Prize and Prizic. Assert the final state remains Prizic and does not restart after an additional 10 seconds. With reduced motion enabled, assert the first render is the final state.

- [x] **Step 2: Write failing blueprint semantics tests**

Render the diagram and assert an accessible ordered list exposes exactly Question, Direction, Software and Learning in that order. Assert decorative SVG has `aria-hidden="true"` and the component contains one accessible label, “The Prizic system”.

- [x] **Step 3: Run the brand tests and confirm failure**

Run: `pnpm test -- tests/components/living-wordmark.test.tsx tests/components/prizic-blueprint.test.tsx`

Expected: FAIL because both components are missing.

- [x] **Step 4: Implement the one-time living wordmark**

Use `useReducedMotion` from Motion and a small explicit sequence state. Preserve a stable accessible name by putting animation text inside an `aria-hidden` group and naming the outer figure “Prizic”. The P/Z mark uses the static supplied SVG; it is never part of an animation variant.

Sequence timing:

```ts
const WORD_STATES = [
  { word: "Precise", holdMs: 1200 },
  { word: "Prism", holdMs: 1200 },
  { word: "Prize", holdMs: 1200 },
  { word: "Prizic", holdMs: 0 },
] as const;
```

Keep `Pr` and `c` in persistent DOM elements. Animate only the middle suffix with opacity and transform. After Prizic resolves, run a single CSS blink/smile class and settle. Replay restarts only after explicit activation.

- [x] **Step 5: Implement the rounded blueprint**

Render an SVG with one rounded route and four stage nodes. Each label also exists in an adjacent semantic ordered list so the SVG can stay decorative. Use `pathLength="1"`, `strokeDasharray="1"` and Motion's `pathLength` only as progressive enhancement.

Desktop arrangement follows the approved comp: Question top, Direction inline-end, Software bottom, Learning inline-start, P/Z origin in the center. The mobile `compact` presentation uses a vertical route and does not scale the desktop geometry down.

- [x] **Step 6: Run brand verification**

Run:

```bash
pnpm test -- tests/components/living-wordmark.test.tsx tests/components/prizic-blueprint.test.tsx
pnpm typecheck
pnpm lint
```

Expected: all commands pass.

- [x] **Step 7: Commit the brand interactions**

```bash
git add src/components/brand src/app/globals.css tests/components/living-wordmark.test.tsx tests/components/prizic-blueprint.test.tsx
git commit -m "feat: add Prizic wordmark and blueprint motion"
```

---

### Task 4: Reproduce the approved homepage composition

**Files:**

- Modify: `src/app/page.tsx`
- Create: `src/components/home/principles-section.tsx`
- Create: `src/components/home/capabilities-section.tsx`
- Create: `src/components/home/founder-section.tsx`
- Create: `src/components/home/closing-section.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/components/homepage.test.tsx`

**Interfaces:**

- Consumes: `SITE_CONTENT`, `PrizicBlueprint`, `LivingWordmark`, `ContactAction`
- Produces: complete `/` route and reusable homepage section components

- [x] **Step 1: Write the failing homepage narrative test**

Render `HomePage` and assert:

```tsx
expect(screen.getByRole("heading", { level: 1, name: "From possibility to working systems." })).toBeVisible();
expect(screen.getByText(/founder-led technology company/i)).toBeVisible();
expect(screen.getByRole("link", { name: "See how Prizic thinks" })).toHaveAttribute("href", "/thinking");
expect(screen.getByRole("heading", { name: "Clarity is part of the work." })).toBeVisible();
expect(screen.getByRole("heading", { name: "What Prizic can bring to the work." })).toBeVisible();
expect(screen.getByRole("heading", { name: "Built close to the work." })).toBeVisible();
expect(screen.getByRole("heading", { name: "A clear first conversation is enough." })).toBeVisible();
```

Serialize the container and run `assertPublicContent(container.textContent ?? "")`.

- [x] **Step 2: Run the homepage test and confirm failure**

Run: `pnpm test -- tests/components/homepage.test.tsx`

Expected: FAIL because the final homepage composition does not exist.

- [x] **Step 3: Build the first viewport to comp fidelity**

Implement a `<section aria-labelledby="home-title">` with a 5/7 desktop grid. The left column contains the H1, supporting line and two actions. The right column contains the blueprint at dominant scale. Place `LivingWordmark` as a distinct brand signal within the hero without replacing the static header logo or obscuring the H1.

At 1280 × 800:

- header and hero fit in the viewport;
- H1 occupies roughly 38% of available width;
- blueprint occupies roughly 55%;
- cyan remains limited to route, coordinates, focus and key punctuation;
- no card grid or detached glass panel appears.

- [x] **Step 4: Build the remaining narrative sections**

Implement, in order:

1. off-white “Clarity is part of the work” field with three editorial principles;
2. expanded four-stage Prizic system using the same route grammar;
3. capability statements integrated into ruled blueprint columns;
4. founder section with the exact factual statement from the spec;
5. closing invitation with Contact and Partnerships actions.

Every heading and paragraph comes from `SITE_CONTENT`. Do not introduce demo interfaces or blank project cards.

- [x] **Step 5: Implement responsive composition rules**

At 768–1023 px, stack hero copy before blueprint and reduce annotations. At 320–767 px, switch the blueprint to its vertical semantic arrangement, retain full heading measure, stack capability statements with dividing rules and keep all controls at least 44 px tall.

- [x] **Step 6: Run homepage verification**

Run:

```bash
pnpm test -- tests/components/homepage.test.tsx
pnpm typecheck
pnpm lint
```

Expected: all commands pass.

- [x] **Step 7: Commit the homepage**

```bash
git add src/app/page.tsx src/app/globals.css src/components/home tests/components/homepage.test.tsx
git commit -m "feat: build Prizic corporate homepage"
```

---

### Task 5: Complete the supporting corporate routes and 404

**Files:**

- Create: `src/app/thinking/page.tsx`
- Create: `src/app/capabilities/page.tsx`
- Create: `src/app/partnerships/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/not-found.tsx`
- Modify: `src/content/site.ts`
- Modify: `src/components/layout/page-intro.tsx`
- Modify: `src/app/globals.css`
- Test: extend `tests/components/homepage.test.tsx` with route-content imports, or create focused route tests when isolation is clearer

**Interfaces:**

- Consumes: supporting-route content from `SITE_CONTENT`, `PageIntro`, `ContactAction`, `LivingWordmark`
- Produces: all sitemap routes and the missing-route recovery surface

- [x] **Step 1: Add failing route-content tests**

Test each route's H1 and one defining statement:

```ts
const expectations = [
  ["Thinking", "Clarity before complexity."],
  ["Capabilities", "Digital products"],
  ["Partnerships", "Bring the industry. Prizic brings the technology."],
  ["About Prizic", "PRIZ-ik"],
  ["Start a conversation", "Start with what you are trying to change."],
] as const;
```

Test the 404 for heading “That path does not exist.” and a link named “Return home”.

- [x] **Step 2: Run route tests and confirm failure**

Run: `pnpm test -- tests/components`

Expected: FAIL for routes not yet implemented.

- [x] **Step 3: Implement Thinking and Capabilities**

Thinking expands the approved principles and four-stage loop, then includes the factual operating commitments: security is not an upsell; cut scope, not quality; boring over clever in production code; write decisions down.

Capabilities explains Digital products, Business systems and Technology partnerships through artifact categories only: public websites, customer portals, internal dashboards, workflow automation and custom applications. Add the approved boundaries: no template-price race, no optional security baseline and no assumption that every problem needs custom software.

- [x] **Step 4: Implement Partnerships and About**

Partnerships presents three steps: partner brings market knowledge or an observed problem; Prizic brings product framing and engineering; both validate fit before discussing a long-term structure. Explicitly omit equity, revenue split, exclusivity and guaranteed outcomes.

About presents the founder statement, purpose, pronunciation and Precise/Prism/Prize associations. The living wordmark replays only on explicit activation on this route.

- [x] **Step 5: Implement Contact and 404**

Contact reads `SiteConfig.contact`. Ready state exposes the configured direct action. Pending preview state shows “Contact destination pending” and explains that the public channel is being configured; it does not render a fake email or form.

The 404 uses the static mark, one sentence and `/` return action. It shares the global shell.

- [x] **Step 6: Run route verification**

Run:

```bash
pnpm test -- tests/components
pnpm typecheck
pnpm lint
```

Expected: all commands pass.

- [x] **Step 7: Commit the routes**

```bash
git add src/app src/content/site.ts src/components/layout/page-intro.tsx src/app/globals.css tests/components
git commit -m "feat: add Prizic corporate routes"
```

---

### Task 6: Add accurate metadata, sitemap, robots and social image

**Files:**

- Create: `src/lib/metadata.ts`
- Modify: `src/app/layout.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/opengraph-image.tsx`
- Modify: every route page to export route-specific metadata
- Test: `tests/unit/metadata.test.ts`

**Interfaces:**

- Consumes: `SiteConfig.canonicalUrl`, static route metadata definitions
- Produces: `createPageMetadata(input: PageMetadataInput): Metadata`
- Produces: canonical sitemap entries and owned 1200 × 630 social image

- [x] **Step 1: Write failing metadata tests**

Assert the default and About metadata:

```ts
expect(createPageMetadata({
  title: "About Prizic",
  description: "The founder, purpose and thinking behind Prizic.",
  path: "/about",
  canonicalUrl: "https://prizic.com",
})).toMatchObject({
  title: "About Prizic | Prizic",
  alternates: { canonical: "https://prizic.com/about" },
});
```

Assert malformed or missing production canonical configuration is already rejected by `resolveSiteConfig`.

- [x] **Step 2: Run metadata tests and confirm failure**

Run: `pnpm test -- tests/unit/metadata.test.ts`

Expected: FAIL because the metadata helper does not exist.

- [x] **Step 3: Implement metadata and structured data**

Use the exact default title and description from the spec. Each route exports a unique title and description. The root layout emits Organization JSON-LD containing only name, canonical URL and logo when canonical configuration is ready. Do not emit legal identifiers, founding date, employee count, ratings or social profiles.

- [x] **Step 4: Implement sitemap and crawler policy**

`sitemap.ts` contains `/`, `/thinking`, `/capabilities`, `/partnerships`, `/about` and `/contact`. `robots.ts` allows public crawling and references the canonical sitemap only when a canonical URL exists. Do not include a route that the app does not render.

- [x] **Step 5: Implement the social image**

Use `ImageResponse` to render a 1200 × 630 near-black image with the static Prizic mark, “From possibility to working systems.” and one authored rounded cyan route. No product or customer imagery, gradient or unsupported claim appears.

- [x] **Step 6: Verify metadata and build output**

Run:

```bash
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:hello@prizic.com pnpm test -- tests/unit/metadata.test.ts
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:hello@prizic.com pnpm build
grep -R "89484ca6" .next/server/app
```

Expected: tests and production build pass; grep finds the inert design contract in rendered build output. The example URLs are build-verification inputs only and are not committed as Prizic's real public configuration.

- [x] **Step 7: Commit metadata**

```bash
git add src/app src/lib/metadata.ts tests/unit/metadata.test.ts
git commit -m "feat: add Prizic metadata and social preview"
```

---

### Task 7: Add public-seam accessibility, navigation and responsive tests

**Files:**

- Create: `playwright.config.ts`
- Create: `tests/e2e/site.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Modify: application files only when a test exposes a behavior defect

**Interfaces:**

- Consumes: built Next.js app and complete route inventory
- Produces: browser-level verification across navigation, accessibility, no-JavaScript and required widths

- [x] **Step 1: Configure Playwright against a production server**

Configure Chromium with `baseURL: http://127.0.0.1:3100` and this `webServer.command`, which builds and starts Next.js using test-only verified environment values:

```ts
command: "NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3100 NEXT_PUBLIC_CONTACT_URL=mailto:preview@prizic.test pnpm build && NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3100 NEXT_PUBLIC_CONTACT_URL=mailto:preview@prizic.test pnpm start -- -p 3100",
```

Reuse the server outside CI and capture traces only on first retry.

- [x] **Step 2: Write failing route and navigation tests**

For every route, assert status is successful, exactly one visible H1 exists and header navigation works. Test keyboard navigation from the logo through the primary action. Visit a missing route and follow “Return home”.

- [x] **Step 3: Write failing responsive overflow tests**

For widths 320, 375, 768, 1280 and 1440, visit `/` and assert:

```ts
const overflow = await page.evaluate(() =>
  document.documentElement.scrollWidth > document.documentElement.clientWidth,
);
expect(overflow).toBe(false);
```

At mobile widths, open and close the navigation, verify 44 px minimum trigger geometry and confirm the four process labels appear in document order.

- [x] **Step 4: Write failing reduced-motion and no-JavaScript tests**

Create a reduced-motion browser context, visit `/`, and assert the final Prizic wordmark and all four blueprint labels are visible without waiting for animation. Create a JavaScript-disabled context and assert the H1, supporting copy, route links and process list remain present.

- [x] **Step 5: Add automated accessibility scanning**

Install `@axe-core/playwright` if not already present. Scan all six routes after load and fail on serious or critical WCAG violations. Keep manual focus-order and contrast checks in Task 8 because automation cannot prove them completely.

- [x] **Step 6: Run end-to-end tests and fix exposed behavior**

Run:

```bash
pnpm add -D @axe-core/playwright
pnpm test:e2e
```

Expected: all route, navigation, accessibility, reduced-motion, no-JavaScript and overflow tests pass.

- [x] **Step 7: Commit browser verification**

```bash
git add playwright.config.ts tests/e2e package.json pnpm-lock.yaml src
git commit -m "test: verify Prizic website public behavior"
```

---

### Task 8: Match the comps, finish quality review and document the shipped world

**Files:**

- Create: `.impeccable/review/prizic-desktop.png`
- Create: `.impeccable/review/prizic-mobile.png`
- Create: `.impeccable/review/prizic-reduced-motion.png`
- Create: `DESIGN.md`
- Create: `README.md`
- Modify: implementation files only for issues found in the bounded finish pass

**Interfaces:**

- Consumes: complete website, approved comps, specification and design contract
- Produces: verified screenshots, final design-system record and operational README

- [x] **Step 1: Run the complete automated gate**

```bash
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:hello@prizic.com pnpm test
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:hello@prizic.com pnpm typecheck
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:hello@prizic.com pnpm lint
NEXT_PUBLIC_SITE_URL=https://prizic.com NEXT_PUBLIC_CONTACT_URL=mailto:hello@prizic.com pnpm build
pnpm test:e2e
```

Expected: every command exits successfully. Verification addresses are never committed as real company contact data.

- [x] **Step 2: Start the production preview and capture valid evidence**

Start the built app on port 3100 with the same test-only environment. Use the collaborative browser to capture:

- 1280 × 800 homepage after the entrance animation settles;
- 375 × 812 homepage after the entrance animation settles;
- reduced-motion 1280 × 800 homepage final state.

Save the desktop and mobile captures under `.impeccable/review/`. Open every capture and confirm it is not blank, cropped incorrectly or showing the wrong route.

- [x] **Step 3: Compare the hero against both approved comps**

Open the desktop capture beside `.impeccable/mocks/decision/prizic-system.webp` at equal dimensions. Compare headline scale, 5/7 balance, route geometry, blueprint dominance, cyan scarcity and header placement. Then compare the living-wordmark region with `.impeccable/mocks/decision/living-wordmark.webp` for type scale and signal character.

Fix comp-fidelity issues in one batch. Do not add elements merely because the generated comp invented them; the specification wins on factual content and the comp wins on spatial treatment.

- [x] **Step 4: Run the Impeccable mechanical detector once**

From the workspace root:

```bash
node /Users/seifelesllamseif/.codex/skills/impeccable/scripts/detect.mjs --json src
```

Fix mechanical findings that violate the approved direction. Pass any intentional remaining findings into the finish-review packet.

- [x] **Step 5: Conduct the finish review**

Use the Impeccable finish-review workflow with:

- original request and approved spec;
- desktop, mobile and reduced-motion captures;
- direction contract and seed `89484ca6`;
- approved comp paths;
- detector findings;
- craft-floor reference.

Apply one bounded fix batch for a `fix` verdict, then recapture the same viewports and obtain the verdict pass. A `rebuild` verdict replaces the named failed region rather than accumulating patches.

- [x] **Step 6: Write the durable design record**

Create `DESIGN.md` from the shipped implementation. Record the actual palette, typography, blueprint geometry, route-line motion, living-wordmark states, responsive transformations, interaction states, reduced-motion fallback and content-proof rules. Do not describe intentions that did not survive into the build.

- [x] **Step 7: Write the operational README**

Document:

- pnpm install, development, test, type-check, lint and build commands;
- `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_URL` requirements;
- preview versus production pending-contact behavior;
- brand asset source path;
- public route inventory;
- how to update typed copy;
- the explicit ban on dental content and fabricated proof in this release.

- [x] **Step 8: Run final fresh verification**

Repeat the full automated gate from Step 1 after all review changes. Reopen the final desktop and mobile captures. Confirm the deployed-output grep still finds `89484ca6` and that a recursive case-insensitive scan of `src` finds no prohibited public terms outside the guard/test definitions.

- [x] **Step 9: Commit the reviewed result**

```bash
git add website .impeccable/review/prizic-desktop.png .impeccable/review/prizic-mobile.png .impeccable/review/prizic-reduced-motion.png
git commit -m "feat: complete Prizic corporate website"
```

Do not deploy until the Founder supplies and verifies the real canonical and contact destinations.

---

## Completion Definition

The plan is complete only when Tasks 1–8 are checked, the production build and browser suite pass, comp comparison is documented, finish review reaches an accepted disposition, `DESIGN.md` describes the shipped system, the public source contains no dental or fabricated proof, and the only remaining launch action is substituting verified domain/contact configuration.
