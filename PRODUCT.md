# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (utilities only, tokens in `@theme`), Motion for React, pnpm, Vitest, Testing Library and Playwright.

## Users

- Local business owners and operators deciding whether Prizic can improve their website, how they handle inquiries and bookings, or how their team manages work.
- Visitors who arrive with a business problem rather than a technical brief.
- People checking who Prizic is and how a project would run before getting in touch.

## Product Purpose

This is Prizic's capabilities-led website. It explains three services (websites and digital presence, business software, automation and integrations), connects them through one proposition, and gives visitors a clear way to start a project. Success means a visitor recognises their situation, understands what Prizic would do and how delivery works, and sends an inquiry.

## Positioning

Prizic connects the experience customers see with the work the team handles behind it: from the first inquiry to bookings, requests and everyday operations. The services are presented as related capabilities, not an unrelated catalogue. The site does not claim an exclusive niche or a geography that has not been confirmed.

## Operating Context

Visitors arrive from search, shared links, social previews or direct outreach. They can read the homepage, a Services index and three service pages, Approach, About and Contact. The site must stay understandable to nontechnical business visitors and usable on a phone.

## Capabilities and Constraints

- English only in this release; localise for the market contacted rather than claiming language services.
- Static content in `src/content/site.ts`; no CMS, analytics, third-party embeds or account system.
- One inquiry form. Submissions go to the Outreach CRM through its anon-callable `submit_inquiry` RPC. Production builds fail without the inquiry destination, the canonical URL and the contact URL.
- Introductory-call booking appears only when a scheduling URL is configured.
- No project names, product listings, repository or portfolio links, screenshots of unpublished systems, customer logos, testimonials, case studies, awards, guarantees, staff-size or years-of-experience claims, or performance metrics.
- Ads and ongoing social-media management are outside the current offer.
- Core content, navigation and the inquiry form render on the server and work without JavaScript.
- Motion is progressive enhancement and never required for comprehension.

## Brand Commitments

- Company name: Prizic, pronounced "PRIZ-ik."
- Software and digital product studio founded by Seifelesllam Seif.
- Plain, calm, specific language; describe what will be agreed and delivered rather than promising outcomes.
- Approved P/Z mark, static lockups and the restrained Anchor living-wordmark concept.
- The P/Z icon stays still during the wordmark sequence. `Pr` and `c` remain visible. The sequence runs once and settles on Prizic.
- Branding is supporting scope; no client is required to replace an existing logo.

## Evidence on Hand

- Approved Prizic logo system and animation studies.
- Approved capabilities-led website copy (2 October 2026).
- No approved public customer work, testimonials, customer logos or performance metrics exist yet. Homepage customer situations are illustrative, not case studies.

## Product Principles

- Understand the situation before recommending a solution.
- Make scope, responsibilities and review points explicit.
- Consider use, handover and maintenance as part of the work.
- State limitations and undecided facts plainly.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Provide visible keyboard focus, 44 by 44 pixel minimum touch targets, readable content down to 320 pixels, semantic landmarks, labelled form controls with associated errors, and complete reduced-motion fallbacks.
