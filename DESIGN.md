---
name: Prizic Corporate Website
description: From possibility to working systems.
colors:
  system-night: "#0a0e1a"
  deep-indigo: "#141a2e"
  measured-slate: "#2a3350"
  paper-white: "#edeff5"
  quiet-blue-gray: "#8b93ab"
  signal-cyan: "#00d9ff"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3.5rem, 4.4vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.6rem, 5.3vw, 5rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1rem, 1.45vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  control: "6px"
  system-node: "3rem"
  circular: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  "32": "128px"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.system-night}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "44px"
  system-node:
    backgroundColor: "{colors.system-night}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.system-node}"
    padding: "12px"
---

# Design System: Prizic Corporate Website

## Overview

**Creative North Star: "The Prizic System"**

The visual world behaves like a precise architectural drawing brought to life. A near-black field holds off-white language, measured slate construction lines and one scarce cyan signal. The work feels calm, technically credible and deliberately unfinished at the edges, as if every visible decision belongs to a larger system.

The company method is the proof. Type, route geometry, registration marks and written constraints replace stock imagery and invented evidence. Framer-level craft is a quality reference, but the composition, P/Z geometry and living wordmark remain recognizably Prizic.

**Key Characteristics:**

- Asymmetric editorial layouts with a 5/7 desktop rhythm
- Flat fields separated by rules instead of decorative shadows
- Sparse cyan reserved for routes, punctuation and decisive actions
- Authored P/Z geometry, measurements and calibration marks
- Motion that explains sequence once, then becomes still
- Plain language and visible limits instead of unsupported claims

## Colors

The palette is narrow and structural: one dark field, one lifted dark surface, one construction tone, two text roles and one electric signal.

### Primary

- **Signal Cyan:** Reserved for the connected route, focal punctuation, active interaction and the strongest action. It must remain rare enough to read as information.

### Neutral

- **System Night:** The default page field and dark text used on light or cyan surfaces.
- **Deep Indigo:** A restrained alternate surface for section pacing and interactive hover states.
- **Measured Slate:** Borders, registration marks, axes and structural dividers.
- **Paper White:** Primary text and the occasional light editorial field.
- **Quiet Blue Gray:** Supporting copy, captions and low-priority navigation. Never use it for essential small text when contrast would suffer.

### Named Rules

**The One Signal Rule.** Cyan is the only chromatic accent and should occupy roughly five percent or less of a viewport.

**The Flat Field Rule.** Depth comes from tone, borders and overlap. Do not introduce gradients, glows, glass effects or decorative shadows.

## Typography

**Display Font:** Space Grotesk with a sans-serif fallback

**Body Font:** Inter with a sans-serif fallback

**Label/Mono Font:** JetBrains Mono with a monospace fallback

**Character:** Space Grotesk gives large statements a precise but human voice. Inter keeps longer explanations quiet and readable. JetBrains Mono marks coordinates, indices and system controls without turning the whole interface into a developer tool.

### Hierarchy

- **Display:** Medium weight, tightly tracked and compact. Used for the hero and first-order page statements.
- **Headline:** Medium weight with the same close rhythm. Used for major editorial sections and supporting-route headings.
- **Title:** Space Grotesk at a fluid scale. Used inside system nodes, capability statements and section sequences.
- **Body:** Inter at regular or medium weight with a 1.6 line height and a practical 60 to 72 character measure.
- **Label:** JetBrains Mono at 0.75rem with restrained tracking. Used for stage numbers, coordinates, replay and small system notes.

### Named Rules

**The Left Edge Rule.** Paragraphs remain left aligned. Hierarchy comes from scale and position, not centered marketing copy.

**The Mono Is Metadata Rule.** Monospace type labels the system; it does not carry headlines or paragraphs.

## Layout

The shared frame is capped at 80rem with logical inline gutters. Desktop heroes and major editorial splits use asymmetric 5/7 or 7/5 grids. The blueprint owns the larger hero column, while the copy remains readable and direct. Section spacing follows the 4px-derived scale and expands fluidly between 96px and 128px for major transitions.

At 63.99rem and below, the hero and editorial splits become a single column. At 56.24rem, primary navigation becomes a full-screen labelled mobile dialog. At 47.99rem, the desktop blueprint is replaced by a vertical compact route, multi-column sequences stack, and actions can fill the available width. At 40rem, outer gutters reduce to 16px. Logical CSS properties preserve a future path to right-to-left layouts.

All layouts must remain readable without horizontal scrolling at 320, 375, 768, 1280 and 1440 pixels. Touch targets are at least 44 by 44 pixels. Content order remains meaningful without CSS or JavaScript.

## Elevation & Depth

The system is flat by default and has no shadow vocabulary. Deep Indigo separates selected sections from System Night; Paper White provides one editorial contrast field. One-pixel rules, overlapping route geometry and layered blueprint contours create depth without simulating raised cards.

**The No Decoration Depth Rule.** A new shadow is a design-system change, not a convenient way to make a surface visible.

## Shapes

Controls use compact 6px corners. Blueprint stages use long 3rem capsules connected by round cyan paths. Stage indices, origin rings and partnership nodes are circular. Registration marks stay square and precise, creating tension against the rounded route. Content sections use hard field boundaries rather than repeated floating containers.

The approved logo files are immutable source artwork. Runtime copies live in `public/brand/`; the authoritative exports remain under `02 Brand/Logo/Prizic/` in the company operations workspace. Do not redraw, recolor, crop or animate the P/Z mark.

## Components

### Buttons

- **Shape:** Compact technical corners with a 6px radius and a 44px minimum height.
- **Primary:** Signal Cyan field with System Night text. Hover and focus invert to Paper White on System Night.
- **Secondary:** Transparent field, Paper White text and a Measured Slate border. Hover and focus shift the border and text to Signal Cyan.
- **Pending:** A noninteractive Measured Slate state with Quiet Blue Gray text. It must say that the contact destination is pending.
- **Focus:** Every interactive element receives a visible 2px cyan outline offset by 4px.

### Cards / Containers

The site does not use a generic card component. Editorial sequences, capability ledgers and founder fields are bounded by shared rules or tonal fields. Blueprint stages are the deliberate exception because their capsules are part of the method diagram, not reusable marketing cards.

### Navigation

Desktop navigation uses quiet body-sized links with 44px hit areas and a clear text-color change on hover or keyboard focus. Mobile navigation opens as an opaque System Night dialog, keeps semantic reading order, locks body scrolling, closes on Escape or route selection and restores focus to its trigger.

### The Blueprint

The desktop drawing uses a single rounded cyan route through Question, Direction, Software and Learning. Ten offset construction contours, four measurement axes, twelve registration marks, coordinate labels and stage callouts establish architectural authority around the static center mark. The route draws over 1.6 seconds with a calm ease-out, but every label and connection exists in the document before motion begins. The mobile version turns the system into a vertical route and preserves the same stage order.

### The Living Wordmark

The P/Z mark remains static beside a calibrated signal field. `Pr` and `c` stay mounted while Precise, Prism, Prize and Prizic resolve in order, each exploratory state holding for 1.2 seconds. The final state performs one restrained 720ms eye blink and 820ms smile resolution, then becomes still. Replay is always a labelled 44px control. With reduced motion, the final Prizic state and completed route render immediately, and all animation and transition durations collapse to 0.01ms.

## Do's and Don'ts

### Do:

- **Do** let typography, authored geometry and documented method carry the company story.
- **Do** keep cyan scarce and attach it to meaning, movement or action.
- **Do** preserve the static P/Z mark, visible `Pr` and `c` anchors, one-time sequence and settled final state.
- **Do** use approved assets from the authoritative Prizic logo source and runtime copies from `public/brand/`.
- **Do** keep navigation, content and the final reduced-motion state understandable without JavaScript.
- **Do** add real company evidence only after it is approved and represented accurately.

### Don't:

- **Don't** use gradients, glows, glassmorphism, stock imagery, AI-generated people, looping logos, marquees or parallax fields.
- **Don't** turn the blueprint into a dashboard, workflow screenshot or generic technology illustration.
- **Don't** fabricate projects, customers, logos, testimonials, reviews, prices or performance metrics.
- **Don't** publish dental, clinic or booking content in this corporate release.
- **Don't** imply a launched product, large team, legal status or partnership terms that have not been confirmed.
- **Don't** replace the 5/7 hierarchy with repeated equal cards or centered marketing sections.
