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
  pages: {
    thinking: {
      title: "Thinking",
      introduction: "Clarity is part of the work.",
      principles: [
        {
          title: "Clarity before complexity.",
          description:
            "Start by separating the real problem from the requested feature. The situation, constraints and desired change come before a choice of technology.",
        },
        {
          title: "Useful before impressive.",
          description:
            "Judge the work by whether it improves what people need to do. Novelty and technical spectacle do not make a system useful.",
        },
        {
          title: "Systems over one-offs.",
          description:
            "Build each decision so the next one has a clearer foundation. Reusable knowledge, written reasoning and connected parts prevent another dead end.",
        },
      ],
      processStages: [
        {
          title: "Question",
          description:
            "Look at the work as it exists now. Name the people involved, the constraint that matters and the change worth making.",
        },
        {
          title: "Direction",
          description:
            "Choose the smallest coherent response. Define what belongs, what stays out and the reasoning behind both.",
        },
        {
          title: "Software",
          description:
            "Turn that direction into a focused working system. Security, quality and maintainability stay in the production baseline.",
        },
        {
          title: "Learning",
          description:
            "Watch how the system is used, record what changes and bring that knowledge into the next decision.",
        },
      ],
      commitmentsHeadline: "Production commitments.",
      commitments: [
        {
          title: "Security is not an upsell.",
          description:
            "Security belongs in the production baseline from the start.",
        },
        {
          title: "Cut scope, not quality.",
          description:
            "When constraints tighten, reduce what is built without weakening how it is built.",
        },
        {
          title: "Boring over clever in production code.",
          description:
            "Prefer dependable choices people can understand, operate and improve.",
        },
        {
          title: "Write decisions down.",
          description:
            "Record what was decided, why it was chosen and what could change it.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      introduction: "What Prizic can bring to the work.",
      artifactsHeadline: "Artifacts Prizic can shape.",
      artifacts: [
        "Public websites",
        "Customer portals",
        "Internal dashboards",
        "Workflow automation",
        "Custom applications",
      ],
      boundariesHeadline: "Clear boundaries.",
      boundaries: [
        {
          title: "No template-price race.",
          description:
            "Prizic focuses on the problem and the system around it, not the cheapest interchangeable output.",
        },
        {
          title: "Security is part of the baseline.",
          description:
            "Production concerns are included in the work, not offered as optional extras.",
        },
        {
          title: "Not every problem needs custom software.",
          description:
            "Direction can mean choosing an existing tool or a simpler change instead of building more.",
        },
      ],
    },
    partnerships: {
      title: "Partnerships",
      introduction: "Bring the industry. Prizic brings the technology.",
      stepsHeadline: "A shared path to fit.",
      steps: [
        {
          title: "Bring market knowledge.",
          description:
            "A partner brings market knowledge, access or a clearly observed problem.",
        },
        {
          title: "Frame and build.",
          description:
            "Prizic brings product framing, engineering and technical direction.",
        },
        {
          title: "Validate fit.",
          description:
            "Both sides validate fit before discussing a long-term structure.",
        },
      ],
      action: {
        label: "Start a conversation",
        href: "/contact",
        kind: "primary",
      },
    },
    about: {
      title: "About Prizic",
      introduction:
        "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
      purposeHeadline: "From possibility to working systems.",
      purposeBody:
        "The purpose is to turn experience into focused systems Prizic can stand behind, improve and learn from.",
      nameHeadline: "The name Prizic.",
      pronunciationLead: "Prizic is pronounced PRIZ-ik.",
    },
    contact: {
      title: "Start a conversation",
      introduction: "Start with what you are trying to change.",
      body: "A product idea, an operating problem or an industry you understand deeply is enough context for a first conversation.",
      pendingExplanation: "The public contact channel is being configured.",
      actionLabel: "Contact Prizic",
    },
    notFound: {
      title: "That path does not exist.",
      body: "The page you were looking for is not part of this site.",
      action: {
        label: "Return home",
        href: "/",
        kind: "secondary",
      },
    },
  },
} satisfies SiteContent;

assertPublicContent(JSON.stringify(SITE_CONTENT));
