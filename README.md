# Prizic website

The corporate site for Prizic, a founder-led technology company turning possibility into working systems.

Production: [prizic.com](https://prizic.com)

![Prizic homepage](.impeccable/review/prizic-desktop.png)

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion for React, Vitest, Testing Library and Playwright. The package manager is pnpm 10.

## Local development

```bash
pnpm install
pnpm dev
```

Development can run without contact configuration. In that state, contact actions render as `Contact destination pending` instead of inventing an address.

## Checks

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm test:e2e
```

Playwright builds and starts its own production server on port 3100 with test-only local configuration.

## Production configuration

Set both variables to verified real destinations before running `pnpm build`:

- `NEXT_PUBLIC_SITE_URL`: canonical HTTP or HTTPS site URL
- `NEXT_PUBLIC_CONTACT_URL`: direct `mailto:`, HTTP or HTTPS contact URL

Production builds fail when either value is absent or invalid. Once both are set in the environment:

```bash
pnpm build
pnpm start
```

Preview and development builds may omit them and show the truthful pending-contact state. Test-only addresses belong in commands or CI configuration, never in company content.

The production site is deployed from the `katanaz/prizic` Vercel project. The apex domain is the canonical address. Vercel stores the production and preview values for both public environment variables; update the contact destination there when the Prizic company inbox is ready.

## Site structure

Public routes are `/`, `/thinking`, `/capabilities`, `/partnerships`, `/about` and `/contact`. Approved public copy and navigation live in `src/content/site.ts`; update its typed contracts in `src/content/types.ts` when the shape changes. Runtime configuration is validated in `src/lib/site-config.ts`.

Approved runtime logos live in `public/brand/`. Their source exports are under `02 Brand/Logo/Prizic/` in the company operations workspace. Treat those source files as authoritative and do not redraw or overwrite them.

This release is a corporate introduction, not a product sales site. Do not add dental or booking material, fabricated portfolio work, customer logos, testimonials, reviews, pricing or performance metrics. Real proof can be added after it is approved and represented accurately.
