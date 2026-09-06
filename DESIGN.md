---
name: Prizic Editorial Systems Deck
description: A warm-paper editorial deck with authored material imagery, animated identity, and one dynamic signal.
colors:
  accent: "#00d9ff"
  accent-lime: "#65ed9d"
  accent-yellow: "#eff300"
  accent-ink: "#081013"
  accent-lime-ink: "#0b1710"
  accent-yellow-ink: "#171800"
  paper: "#f1f0ed"
  paper-bright: "#fbfaf8"
  ink: "#11120f"
  ink-soft: "#20211e"
  panel: "#dededb"
  line: "#c9c9c5"
  text-muted: "#51524e"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(4.5rem, 7.2vw, 6.5rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3rem, 6.3vw, 5.75rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.25rem"
  capsule: "999px"
  action: "6px"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-6: "1.5rem"
  space-8: "2rem"
  space-12: "3rem"
  space-16: "4rem"
  space-24: "6rem"
  space-32: "8rem"
components:
  contact-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.capsule}"
    padding: "0.5rem 0.75rem 0.5rem 1rem"
  contact-action-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.action}"
    padding: "0.75rem 1rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "0.75rem 1rem"
  editorial-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.md}"
  method-module:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.lg}"
    padding: "2rem"
  navigation:
    textColor: "{colors.ink-soft}"
  accent-swatch:
    rounded: "50%"
    width: "0.75rem"
    height: "0.75rem"
  folio-index:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.capsule}"
    padding: "0.22rem 0.35rem"
---

# Design System: Prizic Editorial Systems Deck

## Overview

**Creative North Star: "Editorial Systems Deck"**

Prizic reads like a composed presentation spread: warm paper, decisive near-black panels, large tightly tracked statements, and compact supporting information. Unequal modules share a disciplined grid; rounded material windows and deliberate pauses keep the dense editorial rhythm legible.

Authored monochrome P/Z material studies make the company's thinking tangible. The identity is alive but settles: a compact full-logo header, a calibrated living wordmark, varied chapter entrances, and small directional responses connect the work. One visitor-selected signal color carries state and emphasis throughout the deck.

**Key Characteristics:**

- Warm paper and near-black fields with flat tonal depth.
- Rounded modular panels, unequal proportions, and compact folio details.
- Large Space Grotesk statements paired with Inter copy and mono metadata.
- Authored P/Z material imagery with intentional responsive crops.
- One scarce dynamic accent: cyan, electric lime, or signal yellow.
- Varied finite entrances and bounded artwork interaction, with a complete static fallback.

## Colors

A neutral editorial field holds one active signal family. The frontmatter records the implemented colors; the sidecar's generated tonal ramps are preview metadata, not additional application tokens.

### Primary

Prizic Cyan is the first-visit accent. Electric Lime and Signal Yellow are alternate selections of the same semantic role, each paired with its own dark accent ink. Selection updates the root accent variables and persists locally across navigation and visits. Accent fills mark the opening action, one method stage, selected panels, routes, and identity details.

**The One Signal Rule.** Use one active accent family at a time; keep it scarce and attach it to state, direction, or emphasis.

### Neutral

Warm Paper is the canvas. Bright Paper carries light text and high-contrast supporting surfaces. Editorial Ink anchors large panels and primary text; Soft Ink supports secondary dark modules. Quiet Panel fills supporting blocks, Measured Line separates content, and Muted Ink carries secondary text on light fields. On dark panels, secondary copy and rules mix from the local light foreground.

Selection and caret colors follow the accent. Scrollbars use the paper and line roles. Keyboard focus combines a dark outline with a bright separation ring so it remains visible across contrasting fields.

## Typography

Space Grotesk supplies the display voice, Inter carries prose and many module titles, and JetBrains Mono labels navigation, folios, controls, and sequence metadata. Next's font pipeline serves the three families locally after build; sans-serif and monospace remain the fallbacks.

The frontmatter display and headline roles describe the opening statement and standard homepage section heading. The introduction deliberately exceeds that headline scale (up to 7.5rem); section-specific overrides are composition decisions. Secondary-route headings and narrow layouts use their own fluid scales. Preserve their established proportions when editing copy.

Body copy is left aligned and usually shortened to fit modules. The opening description has a 43ch measure, principle statements use 42ch, and compact method copy uses 26ch on desktop and 34ch on mobile. Homepage supporting copy commonly uses a 1.55 line height. Uppercase mono details remain compact; they never replace readable explanatory paragraphs.

**The Type Is Composition Rule.** Preserve the authored headline wraps, tight tracking, and unequal text measures; judge changes in their actual panel at desktop and mobile widths.

## Layout

The shared frame is capped at 88rem, with 1.5rem outer gutters that reduce to 1rem at 40rem. Editorial spreads use twelve columns with fluid gaps from 1rem to 2rem. Connected opening and method modules use tighter 0.75rem seams. Standard homepage spreads use fluid block padding from 2.5rem to 3.5rem, preserving the tighter final rhythm.

At 63.99rem, major homepage spreads use six columns, method modules become two columns, and several secondary-route splits stack. At 56.24rem, desktop navigation and the header contact capsule give way to the mobile menu. At 47.99rem, chapters become a single ordered column, the opening statement and artwork join vertically, and the opening actions stack. Below 23.99rem, the full header identity compacts further while keeping its mark and name.

Artwork has deliberate desktop and mobile proportions rather than a single forced ratio. The base frame is 800:520; opening materials use tall opposing rounded ends, with a shorter mobile image window. Raster object positions are fold (50% 48%), ribs (42% 50%), and stack (64% 56%). Shared image sizing hints account for full-width mobile and narrower desktop panels.

**The Composed Spread Rule.** Keep each chapter's specific proportions, reading order, and tonal balance; the shared grid supports different compositions.

## Elevation & Depth

Depth is flat and tonal. Paper, quiet gray, and ink establish hierarchy without decorative elevation shadows. Monochrome material photography carries physical depth inside the artwork windows. The only box-shadow treatment is an accessibility separation ring for focus, including the skip-link accent variant; it is not surface elevation.

**The Tonal Depth Rule.** Separate modules with tone, spacing, clipping, and fine rules; keep simulated elevation inside the authored imagery.

## Shapes

The radius scale provides gently rounded small surfaces, medium panels, and generous large-panel corners. Header identity and contact controls use full capsules; selected swatches, origin points, and orbital studies are circular. Supporting route actions retain compact action corners, while the closing spread rounds them into capsules.

Opposing long curves in the opening material windows and paired introduction studies are intentional signature shapes. Keep clipping on the image frame so motion preserves a clean edge. The approved P/Z mark remains a static, immutable asset; runtime files live under public/brand/.

## Components

### Buttons

The header contact action is a dark mono capsule with a 44px minimum height. Hover and focus adopt the active accent and its paired ink; press returns to the local text/background pairing. Supporting primary actions use the accent, and secondary actions use a fine border on a transparent field. The dark footer reverses its contact action to Bright Paper. The opening contact module is a larger accent panel with an arrow and an underline response.

Directional arrows are authored SVG with consistent rounded strokes. Hover and keyboard focus move the up-right arrow by 4px in both axes; downward arrows move 5px. Color feedback takes 160ms, and arrow movement takes 240ms with the shared exponential ease-out.

### Accent Selector

Three labelled native radio controls use 44px targets around small circular swatches. A visible selection outline and scale change distinguish the active mode; keyboard focus adds a stronger outline. The server begins in cyan, and an early bootstrap restores a valid stored selection. Blocked storage falls back without losing the control.

### Cards / Containers

Editorial panels are a layout vocabulary, not one repeated card template. The method row combines accent, gray, and ink modules with indices 01–04 and a directional action. Capability modules use unequal widths, heights, and vertical offsets. Fine ledgers and open editorial copy balance the enclosed fields.

### Navigation

The compact header places the complete Prizic identity in a dark capsule beside uppercase mono links and the accent selector. Navigation targets are at least 44px wide and tall. Mobile uses an opaque paper dialog with labelled controls, scroll lock, Escape handling, route-close behavior, and focus restoration. Hovered and keyboard-focused route names use the selected accent as a background paired with its contrasting ink. A server-rendered mobile fallback keeps routes and contact available without JavaScript. The footer closes with a near-black rounded folio.

### Authored Artwork and Chapter Motion

The fold, ribs, and stack variants use the approved monolith, ribbon-system, and iteration WebP assets from public/images/editorial/; the orbit variant is authored SVG. Asset provenance is recorded in [docs/assets/2026-09-06-editorial-imagery.md](docs/assets/2026-09-06-editorial-imagery.md). Raster variants use Next Image with explicit dimensions, responsive sizes, and deliberate crops.

Chapter motion varies between line reveals, lateral clipping, and staggered panel arrivals (850ms with 75ms stagger). Artwork crops reveal over 1.1 seconds while their scale settles over 4.2 seconds. Route and orbit details arrive once over 3.2 and 3.8 seconds. While artwork is in view, scroll travel is bounded to 8px and further limited by available crop bleed; mouse movement adds a small perspective response. Listeners detach when the artwork leaves view.

### Animated Identity

The compact header keeps the P/Z mark still while its line and eye details play once over 1.8 seconds. The hero living wordmark preserves visible Pr and c anchors, moves through Precise, Prism, Prize, and Prizic with 1.2-second exploratory holds, and settles into its fixed-width final word. Its calibrated lines finish once; Replay explicitly restarts the word sequence.

**The Static Completion Rule.** Server-rendered and reduced-motion views show complete content and the final Prizic identity immediately; remove animation, transition, transforms, and clipping from motion targets. Cancelling motion settles the current playback until an explicit Replay.

## Do's and Don'ts

### Do:

- Do preserve the Editorial Systems Deck's authored proportions, compact rhythm, and responsive reading order.
- Do use one active accent family with its matching dark ink.
- Do retain the original material assets, provenance, and deliberate crops.
- Do keep the P/Z mark still and preserve the settled wordmark and visible anchors.
- Do vary chapter motion while keeping content readable before enhancement.
- Do preserve visible focus, 44px targets, and the static reduced-motion and no-JavaScript experience.

### Don't:

- Don't introduce gradients, glassmorphism, glows, or decorative elevation shadows.
- Don't replace composed spreads with a uniform grid of generic cards.
- Don't substitute stock people, fake application screenshots, or unrelated imagery for the authored material studies.
- Don't fabricate customer work, logos, testimonials, metrics, or product evidence.
- Don't make animation necessary to read, navigate, or understand the company.
- Don't stretch, redraw, recolor, or animate the approved P/Z mark.
