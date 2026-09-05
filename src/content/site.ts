import type { SiteContent } from "@/content/types";
import { assertPublicContent } from "@/lib/public-content";

export const SITE_CONTENT = {
  navigation: [
    { label: "Thinking", href: "/thinking" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "About", href: "/about" },
  ],
  hero: {
    headline: "From possibility to working systems.",
    supportingText:
      "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
    actions: [
      {
        label: "Start a conversation",
        href: "/contact",
        kind: "primary",
      },
      {
        label: "See how Prizic thinks",
        href: "/thinking",
        kind: "secondary",
      },
    ],
  },
  principles: {
    headline: "Clarity is part of the work.",
    items: [
      {
        title: "Clarity before complexity.",
        description:
          "Understand the actual problem before choosing the technology.",
      },
      {
        title: "Useful before impressive.",
        description:
          "A system should improve real work, not merely look advanced.",
      },
      {
        title: "Systems over one-offs.",
        description:
          "What is built today should make the next decision easier, not create another dead end.",
      },
    ],
  },
  process: {
    headline: "The Prizic system.",
    stages: [
      {
        title: "Question",
        description:
          "Start with the real situation, constraints and desired change.",
      },
      {
        title: "Direction",
        description:
          "Decide what should exist, what should not, and why.",
      },
      {
        title: "Software",
        description:
          "Build the focused system with production concerns included.",
      },
      {
        title: "Learning",
        description:
          "Observe use, improve the system and carry the knowledge forward.",
      },
    ],
  },
  capabilities: {
    headline: "What Prizic can bring to the work.",
    items: [
      {
        title: "Digital products.",
        description:
          "Focused software shaped around a repeated problem and the people who live with it.",
        href: "/capabilities",
      },
      {
        title: "Business systems.",
        description:
          "Customer-facing experiences and internal workflows designed as one connected system.",
        href: "/capabilities",
      },
      {
        title: "Technology partnerships.",
        description:
          "Product thinking and engineering for people who understand a market and need a technical counterpart.",
        href: "/partnerships",
      },
    ],
  },
  founder: {
    headline: "Built close to the work.",
    body: "Prizic was founded by Seifelesllam Seif after building technology for other companies. The aim is simple: turn that experience into focused systems Prizic can stand behind, improve and learn from.",
  },
  closing: {
    headline: "A clear first conversation is enough.",
    body: "If you are shaping a product, improving how a business works or bringing deep knowledge of an industry, tell Prizic what you see.",
    actions: [
      {
        label: "Start a conversation",
        href: "/contact",
        kind: "primary",
      },
      {
        label: "Explore partnerships",
        href: "/partnerships",
        kind: "secondary",
      },
    ],
  },
  name: {
    pronunciation: "PRIZ-ik",
    associations: [
      {
        title: "Precise",
        description: "Careful, dependable engineering.",
      },
      {
        title: "Prism",
        description: "Turning complexity into something clear.",
      },
      {
        title: "Prize",
        description: "Producing outcomes with real value.",
      },
      {
        title: "-ic",
        description: "A modern, technical finish.",
      },
    ],
  },
} satisfies SiteContent;

assertPublicContent(JSON.stringify(SITE_CONTENT));
