# Prizic Editorial Deck Redesign

Date: 2026-09-06
Status: Approved design direction; implementation pending
Surface: All public website routes

## Objective

Redesign the Prizic corporate website as an editorial, presentation-inspired experience derived from the supplied references. The site should feel like a sequence of exceptionally composed business-deck spreads translated into a responsive website, while remaining recognizably Prizic rather than copying the reference brand.

The redesign must preserve the site's purpose: explain what Prizic is, make its way of thinking visible, and provide a direct path to start a conversation. It must not imply customers, results, products, or company scale that Prizic cannot yet substantiate.

## Product Truth That Remains Fixed

- Prizic is a founder-led technology company.
- The approved line is “From possibility to working systems.”
- The public routes remain Home, Thinking, Capabilities, Partnerships, About, and Contact.
- The approved P/Z mark, Prizic wordmark, and restrained living-wordmark behavior remain brand assets.
- The Question, Direction, Software, and Learning sequence remains the central method.
- The site remains a corporate and public-relations website. It does not sell the booking platform or promote an unreleased product.
- No portfolio entries, customer logos, testimonials, reviews, revenue figures, growth figures, project counts, or performance metrics may be invented.
- The website remains useful without JavaScript. Motion is progressive enhancement.

## Chosen Direction: Prizic Editorial Deck

### Visual world

The website uses the spatial confidence of a premium business presentation: large editorial headlines, disciplined modular grids, compact metadata, rounded image fields, and alternating moments of dense information and visual quiet.

The palette is Prizic-owned:

- warm paper for the primary page field;
- near-black for strong panels and primary type;
- soft gray for secondary modules;
- Prizic cyan as the only signal color;
- white for type and diagrams on dark surfaces.

The supplied references establish the desired density, scale, corner language, and editorial rhythm. Their yellow and green accents, company identity, photography, wording, figures, and exact layouts are not copied.

### Design character

- Swiss-editorial rather than conventional SaaS marketing.
- Large, tightly tracked type used as composition, not decoration.
- Modular panels that join into designed spreads instead of repeated generic cards.
- Strong black-and-white contrast with cyan used sparingly for state, direction, and emphasis.
- Rounded rectangles and capsules balanced by strict alignment and thin rules.
- Small labels and indices create presentation-like navigation without making the site feel like a slide viewer.
- No gradients, glassmorphism, decorative shadows, stock people, fake application screenshots, or generic technology icon grids.

## Content and Evidence Rules

Existing approved Prizic copy remains the source of truth during the first implementation. Copy may be rearranged, shortened for presentation, or repeated as navigation labels, but factual meaning must not change without approval.

Temporary content is allowed only when it is visibly non-claiming. Acceptable temporary material includes:

- abstract visual studies;
- process labels;
- interface-neutral diagrams;
- clearly labelled “Concept” or “Example structure” modules;
- empty project frames reserved for future verified work.

Temporary material must never resemble a real customer case study. No invented business names, logos, quotes, outcomes, money, percentages, dates of delivery, or project statistics may appear.

## Imagery System

The reference photography is replaced with authored Prizic system imagery. The imagery should be abstract, monochrome, and connected to the P/Z geometry or the Question-to-Learning method.

The initial image family consists of:

1. Folded or extruded forms derived from the diagonal Z stroke.
2. Repeated soft mechanical forms suggesting systems and iteration.
3. High-contrast material studies using black, white, and graphite.
4. Cyan route marks, origin points, and small calibration symbols applied as information rather than decoration.

These visuals may be implemented as lightweight SVG/CSS compositions or produced raster assets. They must not depict client work. Every generated or sourced raster must carry its provenance metadata and have a deliberate responsive crop.

## Shared Page Frame

### Header

The header becomes compact and light, with the Prizic mark and wordmark at the left, restrained route links in the center or right, and a small dark contact capsule at the far edge. It sits within the same maximum-width grid as the main compositions.

The desktop header is visually quiet so the first spread owns the viewport. The mobile header retains the existing accessible dialog behavior, body-scroll lock, Escape handling, focus restoration, and 44-pixel targets.

### Canvas and section rhythm

The global field is warm off-white. Content is arranged in wide, presentation-like spreads separated by generous vertical pauses. A spread may contain one large statement, several joined modules, or a dominant artwork with supporting copy. It must not be forced into one repeated card template.

Desktop uses a twelve-column grid. Tablet compresses this to six columns. Mobile becomes a deliberate single-column sequence while preserving the intended reading order.

### Footer

The footer acts as a final presentation folio: a large closing line, one direct contact action, compact route links, the P/Z mark, and copyright information. It uses a near-black field so the site ends with visual weight.

## Homepage Composition

### 1. Opening spread

The first viewport is a single composed thesis, not a standard left-copy/right-image hero.

- Compact header across the top.
- A near-black rounded panoramic panel dominates the upper composition.
- The approved line “From possibility to working systems.” is set at large scale inside or immediately beside the panel.
- An authored P/Z-derived monochrome visual occupies the panel.
- Prizic cyan marks one route, origin point, or decisive accent.
- The company description and primary contact action sit in smaller supporting modules attached to the main panel.
- The visitor must understand that Prizic is a technology company and see the next action without scrolling.

### 2. Contents / method spread

The four-stage method becomes a presentation table of contents: four tall modules labelled Question, Direction, Software, and Learning with indices 01–04. One module is dark and one uses cyan so the row has controlled variation. The modules link to the deeper Thinking content where appropriate.

### 3. Company introduction spread

A large “Introducing Prizic” statement is paired with a two-part abstract P/Z material image and a concise founder-led explanation. Small metadata labels identify the surface as “Company / Technology / 2026” without implying age, size, or results.

### 4. Principles summary spread

The three approved principles are composed as an executive-summary layout: one dominant heading, one abstract visual, and three concise statements with asymmetric alignment. This is editorial content, not a KPI dashboard.

### 5. Proposed direction spread

The Question-to-Learning method is shown as a connected set of modules rather than a workflow diagram copied from enterprise software. Cyan highlights the stage currently being described. The approved P/Z blueprint may appear in a simplified editorial form.

### 6. Capabilities spread

Digital products, business systems, and technology partnerships appear as three differently proportioned panels around one large statement. Empty space and abstract imagery prevent the section from becoming a generic services grid.

### 7. Founder spread

The founder statement is paired with a substantial monochrome P/Z-derived artwork. No portrait is required. The composition should communicate proximity to the work without inventing team scale.

### 8. Closing spread

A near-black full-width panel carries the closing invitation and primary contact action. The living wordmark may resolve once within this section, with the P/Z icon static and the final state remaining still.

## Secondary Routes

All secondary pages inherit the editorial-deck system but use different compositions so the site does not feel like one template repeated six times.

### Thinking

- Opening statement with an indexed folio label.
- Three-principle summary spread.
- Four-stage method in an alternating horizontal/vertical composition.
- Production commitments displayed as a dense editorial ledger.

### Capabilities

- Large opening statement paired with abstract system artwork.
- Three capability territories in unequal modules.
- Artifact categories displayed as a typographic inventory, not fake projects.
- Boundaries shown as a contrasting light/dark editorial spread.

### Partnerships

- Opening proposition: “Bring the industry. Prizic brings the technology.”
- Three-stage partnership path using connected cyan route marks.
- A quiet collaboration diagram that contains roles and process only, with no invented partner identities.
- Strong contact close.

### About

- Founder-led company introduction.
- Purpose statement and approved company principles.
- The meaning and pronunciation of Prizic.
- Living-wordmark demonstration presented as a brand study rather than a product feature.

### Contact

- A decisive, minimal opening composition.
- One primary contact destination.
- Three non-form prompts that help visitors frame a useful first message: the idea, the current situation, and the desired change.
- No contact form, calendar, or response-time promise is added without confirmed operational support.

### Not found

- Compact editorial error spread using the same paper, black panel, cyan index, and return-home action.

## Interaction and Motion

Motion is purposeful and scarce:

- opening modules reveal in one orchestrated sequence;
- large panels may shift by a few pixels or reveal their crop as the visitor enters a section;
- method connectors draw once to explain sequence;
- buttons use fast color and position feedback;
- the existing living-wordmark behavior remains: the P/Z icon stays still, `Pr` and `c` remain visible, and the sequence settles on Prizic;
- no looping marquees, parallax fields, cursor followers, or continuous decorative motion.

With reduced motion enabled, all content appears in its final state immediately. No information depends on animation.

## Responsive Behavior

The desktop composition targets 1280–1440 pixels and preserves the wide presentation-spread feeling. Tablet reorganizes multi-panel spreads while retaining contrast and order. Mobile is redesigned, not merely shrunk:

- headings scale fluidly without clipping;
- connected desktop modules become ordered vertical chapters;
- panoramic artwork receives intentional portrait crops or a dedicated compact variant;
- metadata remains readable and avoids excessive microtype;
- actions can expand to the available width;
- no horizontal scrolling occurs at 320, 375, 768, 1280, or 1440 pixels.

## Accessibility and Performance

- Maintain WCAG 2.2 AA contrast and visible keyboard focus.
- Preserve semantic landmarks, heading order, lists, labels, and descriptive action names.
- Maintain a skip link and a fully keyboard-operable mobile menu.
- Keep tap targets at least 44 by 44 pixels.
- Use `next/image` for raster content and explicit responsive `sizes` values.
- Keep primary copy server-rendered and understandable without JavaScript.
- Treat motion components as isolated client boundaries rather than converting whole pages into client components.
- Keep the first viewport lightweight and avoid animation-driven layout shift.

## Implementation Boundaries

The redesign may replace the shared stylesheet, update the shared header/footer/page-intro components, reshape homepage sections, add reusable editorial-layout components, and introduce approved abstract assets. It may change presentation markup where needed for the new compositions.

The redesign must not add a CMS, database, analytics, contact form, customer data, portfolio model, or product-sales flow. It must not change the environment-variable contract or canonical-domain behavior.

## Verification

Implementation is complete only when:

- unit and component tests pass;
- Playwright route, accessibility, navigation, reduced-motion, and responsive tests pass;
- production build succeeds with required environment variables;
- desktop and mobile screenshots show the full visual direction without missing or hidden content;
- visual inspection confirms the supplied reference’s editorial density and composition have been translated into Prizic’s palette and brand grammar;
- all temporary content is non-claiming and no prohibited evidence appears;
- the Impeccable detector has run once over changed UI targets;
- a finish review closes all material findings;
- `DESIGN.md` and its sidecar are regenerated from the finished implementation.

## Acceptance Summary

A first-time visitor should describe the result as a premium editorial technology-company website made from presentation-like compositions, black-and-white abstract system imagery, oversized type, rounded modular panels, and one unmistakable cyan signal. They should understand what Prizic is, how it thinks, and how to start a conversation without encountering fabricated proof.
