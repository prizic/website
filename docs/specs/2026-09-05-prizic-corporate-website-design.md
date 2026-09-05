# Prizic Corporate Website Design Specification

**Status:** Proposed for Founder review  
**Date:** 2026-09-05  
**Owner:** Seifelesllam Seif  
**Approved composition:** Blueprint / The Prizic System, strengthened by Signal's living wordmark  
**Reference comp:** `.impeccable/mocks/decision/prizic-system.webp`  
**Supporting comp:** `.impeccable/mocks/decision/living-wordmark.webp`

## 1. Problem

Prizic needs a credible public identity before it has approved customer work, testimonials or commercial metrics to publish. A conventional agency site would either look empty or tempt the company to fill space with claims it cannot prove. A product-led site would incorrectly present the private dental booking exploration as a launched offer.

## 2. Solution

Build an English-language corporate/PR website that makes Prizic's identity, point of view, capabilities, method and future direction tangible. The visual proof is Prizic's own thinking: a P/Z-derived blueprint connecting Question, Direction, Software and Learning, plus a one-time living-wordmark sequence resolving Precise, Prism and Prize into Prizic.

The site invites a conversation without behaving like a sales funnel. It contains no dental content, public product offer, prices, fabricated portfolio, customer logos, testimonials or metrics.

## 3. Goals

1. Let a first-time visitor understand what Prizic is within the first viewport.
2. Make the brand memorable through one ownable visual system rather than generic technology imagery.
3. Demonstrate clear product and engineering thinking without pretending an unreleased product is available.
4. Explain the company's capabilities and partnership direction in plain language.
5. Provide one low-pressure, working contact path.
6. Establish a maintainable technical foundation that can later receive real work, products, languages and content without redesigning the core site.

## 4. Explicitly Out of Scope

- Any mention, screenshot or implication of the dental booking system
- Product pages, pricing, subscriptions, “book a demo” or checkout
- Service packages or hourly-rate tables
- Portfolio, case-study or `/work` routes before approved real work exists
- Customer logos, reviews, testimonials or business-impact metrics
- Generic sample client projects presented as company work
- Blog, news feed, CMS, careers, login, account or dashboard
- Contact-form submission, lead database, CRM integration or visitor-data storage
- Analytics, advertising pixels or cookie banner in the first release
- Light theme or public theme switch in the first release
- Arabic or Turkish public routes in the first release; the implementation must still use logical CSS properties so they can be added later
- Native applications or booking-platform implementation

## 5. Audiences

1. Prospective clients or founders assessing whether Prizic is thoughtful and technically credible.
2. Industry-oriented collaborators assessing Prizic as a possible technical partner.
3. First-time brand visitors who need a concise explanation of the company.
4. Future team members or advisers assessing how Prizic thinks and works.

## 6. User Stories

1. As a first-time visitor, I want to understand what Prizic is immediately, so that I can decide whether to continue exploring.
2. As a nontechnical business visitor, I want the company described without jargon, so that the site feels understandable rather than intimidating.
3. As a technical founder, I want to see evidence of disciplined product and engineering thinking, so that I can judge Prizic beyond visual polish.
4. As an industry-oriented partner, I want to understand how Prizic approaches partnerships, so that I can decide whether to begin a conversation.
5. As a visitor without portfolio proof to inspect, I want to see Prizic's principles and process, so that I still have honest evidence on which to form an opinion.
6. As a keyboard user, I want every navigation item and action to be reachable with a visible focus state, so that I can use the full site.
7. As a motion-sensitive visitor, I want a complete static experience when reduced motion is enabled, so that animation does not block comprehension.
8. As a mobile visitor, I want the blueprint, navigation and text to remain readable without horizontal scrolling, so that the site works on my phone.
9. As a visitor following an internal link, I want a clear current-page state and a consistent route structure, so that I always know where I am.
10. As a visitor ready to contact Prizic, I want one direct action with a truthful destination, so that I do not submit information into a nonfunctional form.
11. As a visitor who follows a missing or mistyped route, I want a branded 404 with a path back home, so that I am not stranded.
12. As a search or social visitor, I want accurate metadata and a recognizable social preview, so that I know the link is an official Prizic page.
13. As a visitor with JavaScript disabled or unavailable, I want the company content and navigation to remain available, so that enhancements are not prerequisites.
14. As the Founder, I want content stored separately from layout, so that real proof and contact information can be added without rebuilding the design.
15. As the Founder, I want prohibited dental and fabricated-proof content guarded by review and tests, so that an old strategy cannot accidentally return during implementation.

## 7. Information Architecture

```text
/
├── /thinking
├── /capabilities
├── /partnerships
├── /about
└── /contact
```

Shared global elements:

- Header: static dark Prizic lockup, route navigation and “Start a conversation” action
- Footer: static mark, concise company line, route navigation, copyright and configured contact action
- Mobile menu: semantic disclosure/dialog pattern with body-scroll containment and escape support
- Branded 404: concise message, static logo and return-home action

No empty route is rendered. No `/work`, `/products`, `/solutions/dental`, `/pricing`, `/blog` or `/login` route is created.

## 8. Homepage Narrative

### 8.1 Header

- Use the supplied `prizic-lockup-on-dark.svg` at a legible size; the header logo does not animate.
- Navigation labels: Thinking, Capabilities, Partnerships, About.
- Primary action: Start a conversation, linking to `/contact`.
- Desktop header remains visually light and does not become a floating glass capsule.
- Mobile collapses navigation into one labelled menu control with a minimum 44 × 44 px target.

### 8.2 Hero: From possibility to working systems

Exact launch copy:

> **From possibility to working systems.**
>
> Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.

Actions:

- Primary: **Start a conversation** → `/contact`
- Secondary: **See how Prizic thinks** → `/thinking`

Composition:

- Desktop uses an asymmetric 5/7 grid. Copy occupies the left side; the architectural blueprint owns the larger right side.
- The blueprint grows from the approved P/Z mark and connects four readable states: Question, Direction, Software and Learning.
- The accent path follows rounded geometry. It must not cut across corners or move as a fast straight sweep.
- The visual reads as company philosophy, never as a dashboard, customer workflow or product screenshot.
- The first viewport includes a clear continuation cue without hiding the primary action below the fold.

### 8.3 Living wordmark moment

The existing Anchor concept is adapted into the hero as a single narrative sequence:

1. `Pr` remains fixed.
2. The suffix resolves through `Precise`, `Prism` and `Prize`.
3. The sequence lands on `Prizic`.
4. The two `i` dots may perform one restrained blink and the `z` may briefly resolve as the cyan smile from the approved face study.
5. The full wordmark settles and remains static.

The P/Z icon stays completely still. `Pr` and `c` never disappear. The sequence does not loop. A deliberate replay control may appear on hover/focus or as a small labelled button, but autoplay occurs only once per page visit. Reduced-motion mode renders the final Prizic wordmark immediately.

### 8.4 What Prizic believes

Section headline: **Clarity is part of the work.**

Three real principles appear as an editorial sequence, not three generic floating cards:

- **Clarity before complexity.** Understand the actual problem before choosing the technology.
- **Useful before impressive.** A system should improve real work, not merely look advanced.
- **Systems over one-offs.** What is built today should make the next decision easier, not create another dead end.

The section may shift to an off-white field for pacing while preserving the same cyan accent and near-black text. This is a section-level contrast change, not a user-selectable light theme.

### 8.5 The Prizic system

The four-state model receives enough space to be understood beyond the hero:

1. **Question.** Start with the real situation, constraints and desired change.
2. **Direction.** Decide what should exist, what should not, and why.
3. **Software.** Build the focused system with production concerns included.
4. **Learning.** Observe use, improve the system and carry the knowledge forward.

Scrolling may draw the single cyan route progressively, but all labels and connections exist in the initial document and remain visible without JavaScript.

### 8.6 Capabilities

Section headline: **What Prizic can bring to the work.**

- **Digital products.** Focused software shaped around a repeated problem and the people who live with it.
- **Business systems.** Customer-facing experiences and internal workflows designed as one connected system.
- **Technology partnerships.** Product thinking and engineering for people who understand a market and need a technical counterpart.

Capabilities use large statements integrated into the blueprint grid. They are not packages, prices or equal-height marketing cards. Each links to `/capabilities` or `/partnerships` for detail.

### 8.7 Founder-led company

Section headline: **Built close to the work.**

Launch copy:

> Prizic was founded by Seifelesllam Seif after building technology for other companies. The aim is simple: turn that experience into focused systems Prizic can stand behind, improve and learn from.

Do not imply a large team. Abdulrahman or any future collaborator is not named publicly without a separate approval and an accurate role at launch time. No portrait is required; typography, the founder statement and the P/Z geometry carry the section until approved photography exists.

### 8.8 Closing invitation

Headline: **A clear first conversation is enough.**

Body:

> If you are shaping a product, improving how a business works or bringing deep knowledge of an industry, tell Prizic what you see.

Actions:

- **Start a conversation** → `/contact`
- **Explore partnerships** → `/partnerships`

No urgency language, calendar wall, newsletter capture, pop-up or live chat.

## 9. Supporting Routes

### 9.1 Thinking

A permanent editorial page rather than a blog index. It expands the three principles, explains the Question → Direction → Software → Learning loop and states practical commitments: security is not an upsell; cut scope, not quality; boring over clever in production code; write decisions down. Content comes from the existing Company Principles document and must be paraphrased consistently with Voice & Tone.

### 9.2 Capabilities

Explains digital products, business systems and technical direction with examples of artifact types rather than invented projects. Permitted examples include public websites, customer portals, internal dashboards, workflow automation and custom applications. Wording must make clear that these are categories Prizic can build, not claims that named customer systems have launched.

Include boundaries: no cheap template race, no security as an optional extra, no pretending every problem needs custom software.

### 9.3 Partnerships

Explains a collaboration pattern:

- A partner brings market knowledge, access or a clearly observed problem.
- Prizic brings product framing, engineering and technical direction.
- Both sides validate fit before discussing a long-term structure.

No public equity percentage, revenue split, exclusivity promise, guaranteed outcome or standard deal terms appear.

### 9.4 About

Includes the Founder statement, company purpose, name pronunciation (`PRIZ-ik`) and a short explanation of the Precise, Prism and Prize associations. It may replay the approved Anchor animation on explicit user action. It does not tell an inflated founding-team story or display unconfirmed legal-registration claims.

### 9.5 Contact

Launch copy:

> **Start with what you are trying to change.**
>
> A product idea, an operating problem or an industry you understand deeply is enough context for a first conversation.

The route exposes one direct contact link sourced from typed site configuration. The public destination is a launch requirement and must be supplied by the Founder before deployment. Development and preview builds may render a clearly disabled action labelled “Contact destination pending” rather than inventing an email address. There is no form, storage or response-time promise.

## 10. Visual System

### 10.1 Colour

- `--bg`: `#0A0E1A`
- `--surface`: `#141A2E`
- `--border`: `#2A3350`, decorative only
- `--text`: `#EDEFF5`
- `--text-muted`: `#8B93AB`, captions only
- `--accent`: `#00D9FF`
- `--accent-text`: `#0A0E1A`
- Optional light narrative field: `#EDEFF5` with `#0A0E1A` text

Cyan stays below roughly 5% of the viewport. White text never appears on cyan. There are no gradients, glows, glass effects, colourful status accents or decorative shadows.

### 10.2 Typography

- Headings and large statements: Space Grotesk, weight 500
- Body: Inter, weight 400–500
- System labels and coordinates: JetBrains Mono, used sparingly
- Fluid display sizing uses `clamp()` and must remain readable without clipping at 320 px
- Body measure is 60–72 characters; paragraphs are never centred

### 10.3 Geometry and spacing

- Use the approved 4 px spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Content max width: 1200–1280 px
- Blueprint paths use the same rounded family as the approved mark and chosen composition
- Buttons and controls use 6 px radius; content panels use 10 px only where a real boundary exists
- Avoid a repeated grid of rounded cards; hierarchy comes from type, rules, fields and the blueprint itself

### 10.4 Imagery

No stock photography or AI-generated people. The launch is carried by authored SVG geometry, typography and the real Prizic logo assets. No raster composition mock is shipped as the live page. The social preview may be a generated static rendering of the approved blueprint using only Prizic-owned shapes and copy.

## 11. Motion and Interaction

- Ordinary control transitions remain 120–200 ms.
- Narrative route drawing is an explicit brand exception and may run 1.2–1.8 seconds with a calm ease-out curve.
- The wordmark sequence may run 6–8 seconds once; each state stays readable long enough to understand.
- Scroll motion explains sequence only. It never gates text, moves layout dimensions or creates continuous background activity.
- No cursor replacement, parallax field, autoplay video, endless marquee or looping logo.
- `prefers-reduced-motion: reduce` removes route drawing, blinking, suffix transitions and scroll reveals while preserving final content.
- Hover-dependent information is duplicated for focus and touch.
- All controls have default, hover, focus-visible, active and disabled states.

## 12. Responsive Behaviour

### Desktop: 1024 px and wider

- Hero uses the 5/7 split and keeps headline, actions and blueprint within the first viewport at approximately 1280 × 800.
- Navigation appears inline.
- Blueprint uses the full four-state loop and measured annotation layer.

### Tablet: 768–1023 px

- Hero becomes a vertical composition: copy first, blueprint second.
- Blueprint remains a loop but annotations reduce to essential labels.
- Sections use two-column layouts only where both columns retain a useful reading measure.

### Mobile: 320–767 px

- Header uses the compact mark plus menu control.
- Hero copy appears before any decorative element.
- Blueprint becomes a vertical rounded route in the order Question, Direction, Software, Learning; it is not a scaled-down desktop diagram.
- Wordmark animation stays within the viewport and never clips the suffix.
- Capability statements stack without becoming generic card tiles.
- Touch targets are at least 44 × 44 px.
- The document body never scrolls horizontally.

Logical CSS properties are required for layout and spacing. Logos and non-directional brand geometry never mirror in future RTL layouts; directional arrows may mirror.

## 13. Technical Architecture

- Application location: `/website` at the workspace root
- Package manager: pnpm, matching the existing maintained web project in the workspace
- Next.js App Router with TypeScript and Tailwind CSS v4
- Vercel deployment target
- React Server Components by default
- Client Components limited to mobile navigation, wordmark replay and motion-enhanced blueprint behavior
- Motion for React used only for the approved narrative interactions
- Typed local content and site configuration; no CMS or database
- SVG components for blueprint and brand motion; supplied SVG lockups used directly where animation is unnecessary
- Metadata API for page titles, descriptions, canonical URLs and social images
- Static `sitemap.ts`, `robots.ts`, `not-found.tsx` and Organization JSON-LD containing only confirmed facts

Suggested module boundaries:

```text
app/                  routes, metadata and page composition
components/brand/     logo, living wordmark and blueprint
components/layout/    header, mobile navigation and footer
components/sections/  reusable narrative sections
content/              typed site copy, navigation and company data
lib/                  configuration validation and metadata helpers
public/brand/         approved Prizic SVG/PNG/favicon assets
tests/                unit, component and end-to-end verification
```

The implementation must copy required brand assets into the website's own `public/brand` directory while leaving the originals under `02 Brand/Logo/Prizic/` unchanged.

## 14. Content Contracts

Typed content must separate factual content from layout. At minimum it represents:

- Site identity and verified canonical URL
- Contact state: configured direct URL or explicitly pending
- Navigation entries
- Hero statement and actions
- Principles
- Four process stages
- Capability statements
- Partnership steps and boundaries
- Founder statement
- Pronunciation and name associations
- Footer links

Collections for projects, customer logos, testimonials and metrics are not created for launch. They can be introduced later only with real approved data and a separate design decision.

## 15. Metadata and Privacy

- Default title: `Prizic | From possibility to working systems`
- Default description: `Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.`
- Every page has a unique plain-language title and description.
- The social image uses the Prizic mark, approved colours and blueprint route; no customer or product imagery.
- Organization JSON-LD includes only confirmed name, canonical URL and logo. Legal company identifiers are omitted until registration is complete and verified.
- With no form, analytics or third-party embeds, the first release stores no visitor data and requires no marketing-cookie banner.

## 16. Accessibility and Progressive Enhancement

- Target WCAG 2.2 AA.
- Semantic landmarks, ordered heading hierarchy and descriptive link text are mandatory.
- Keyboard focus uses an accent treatment with at least 3:1 contrast against adjacent colours.
- Decorative blueprint detail is hidden from assistive technology; the four-stage model has an equivalent semantic ordered list.
- The living wordmark has one stable accessible name, “Prizic,” rather than announcing every animation frame.
- Colour is never the only carrier of meaning.
- Core content, navigation and contact state render server-side and remain usable without JavaScript.

## 17. Testing Strategy

Use the highest public seams available. Avoid tests coupled to individual animation implementation details.

### Unit and content checks

- Site configuration rejects malformed canonical and contact URLs.
- Production build rejects pending canonical or contact configuration.
- Production build cannot silently publish a pending contact destination.
- Rendered content contains no case-insensitive references to dental, dentist, clinic, booking, sample customer, testimonials, pricing or unsupported metrics.
- Metadata helpers return the confirmed titles and descriptions.

### Component checks

- Mobile navigation opens, closes, traps/returns focus appropriately and responds to Escape.
- Wordmark exposes the stable accessible name and a working replay action.
- Reduced-motion preference renders the final wordmark and static blueprint without transitional motion.
- Contact action renders configured and pending states truthfully.

### End-to-end checks

- Every sitemap route returns successfully and contains one H1.
- Global navigation and both homepage actions reach the expected routes.
- Keyboard-only traversal reaches all actions with visible focus.
- 404 provides a working return-home link.
- No page produces horizontal body scrolling at 320, 375, 768, 1280 and 1440 px.
- JavaScript-disabled smoke test retains readable content and navigation.

### Visual and quality checks

- Compare the 1280 × 800 homepage hero directly with the approved Blueprint comp and the living-wordmark supporting comp.
- Inspect desktop and mobile screenshots after entrance animation settles.
- Run automated accessibility scanning on all routes and manually check focus order and reduced motion.
- Run a production build, lint, type-check and all tests before completion.
- Confirm favicon, social image, sitemap, robots and canonical metadata from the built output.

## 18. Acceptance Criteria

1. A first-time visitor can identify Prizic as a founder-led technology company from the first viewport.
2. Blueprint / The Prizic System is the dominant composition and visibly communicates Question → Direction → Software → Learning.
3. The living wordmark resolves Precise → Prism → Prize → Prizic once, keeps `Pr` and `c` visible, keeps the P/Z mark still, and then stops.
4. Reduced-motion visitors receive the complete final state immediately.
5. The public site contains no dental or booking-system material.
6. The site contains no fake project, customer, testimonial, logo, review, commercial result or business metric.
7. There is no product pricing, service package, checkout or demo-sales CTA.
8. Home, Thinking, Capabilities, Partnerships, About, Contact and the branded 404 are complete and responsive.
9. The contact destination is either truthfully pending in preview or verified and working in production; production cannot ship the pending state silently.
10. The approved Prizic assets, colour rules and no-gradient rule are preserved.
11. The site is keyboard navigable, meets WCAG 2.2 AA expectations and has no horizontal page overflow at the required widths.
12. Core content and navigation remain usable without JavaScript.
13. Production build, lint, type-check, tests and metadata checks pass.

## 19. Launch Dependencies

- Founder supplies the final public contact destination.
- Founder confirms the canonical domain once purchased and connected.
- Name/company/trademark clearance remains outside the website build; unverified legal-registration claims do not appear.
- Any future public work, product or collaborator content requires separate factual approval before publication.

## 20. Decision Record

- 2026-09-05: Corporate/PR website approved; dental booking system excluded completely.
- 2026-09-05: No fake portfolio, customers, testimonials or metrics.
- 2026-09-05: Blueprint / The Prizic System selected as the homepage foundation.
- 2026-09-05: Signal's living-wordmark idea merged into the selected direction.
- 2026-09-05: Comp-first implementation remains the working path; the approved compositions are build references, not shippable page images.

