import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import CapabilitiesPage from "@/app/capabilities/page";
import ContactPage from "@/app/contact/page";
import NotFound from "@/app/not-found";
import PartnershipsPage from "@/app/partnerships/page";
import ThinkingPage from "@/app/thinking/page";
import { assertPublicContent } from "@/lib/public-content";

vi.mock("motion/react", async () => {
  const motion = await vi.importActual<typeof import("motion/react")>(
    "motion/react",
  );
  return {
    ...motion,
    useReducedMotion: () => false,
  };
});

afterEach(() => vi.unstubAllEnvs());

const routeExpectations = [
  {
    Page: ThinkingPage,
    heading: "Thinking",
    statement: "Clarity before complexity.",
  },
  {
    Page: CapabilitiesPage,
    heading: "Capabilities",
    statement: "Digital products.",
  },
  {
    Page: PartnershipsPage,
    heading: "Partnerships",
    statement: "Bring the industry. Prizic brings the technology.",
  },
  { Page: AboutPage, heading: "About Prizic", statement: "PRIZ-ik" },
  {
    Page: ContactPage,
    heading: "Start a conversation",
    statement: "Start with what you are trying to change.",
  },
] as const;

describe("supporting corporate routes", () => {
  it.each(routeExpectations)(
    "renders $heading with its defining approved statement",
    ({ Page, heading, statement }) => {
      const { container } = render(<Page />);

      expect(
        screen.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
      expect(screen.getByText(new RegExp(statement, "i"))).toBeVisible();
      assertPublicContent(container.textContent ?? "");
    },
  );

  it("states all four practical Thinking commitments", () => {
    render(<ThinkingPage />);

    for (const commitment of [
      "Security is not an upsell.",
      "Cut scope, not quality.",
      "Boring over clever in production code.",
      "Write decisions down.",
    ]) {
      expect(screen.getByText(commitment)).toBeVisible();
    }
  });

  it("expands every Thinking principle beyond its homepage summary", () => {
    render(<ThinkingPage />);

    const expandedPrinciples = [
      {
        title: "Clarity before complexity.",
        homepage: "Understand the actual problem before choosing the technology.",
        expanded:
          "Start by separating the real problem from the requested feature. The situation, constraints and desired change come before a choice of technology.",
      },
      {
        title: "Useful before impressive.",
        homepage:
          "A system should improve real work, not merely look advanced.",
        expanded:
          "Judge the work by whether it improves what people need to do. Novelty and technical spectacle do not make a system useful.",
      },
      {
        title: "Systems over one-offs.",
        homepage:
          "What is built today should make the next decision easier, not create another dead end.",
        expanded:
          "Build each decision so the next one has a clearer foundation. Reusable knowledge, written reasoning and connected parts prevent another dead end.",
      },
    ];

    for (const principle of expandedPrinciples) {
      const heading = screen.getByRole("heading", { name: principle.title });
      const item = heading.closest("li");

      expect(item).not.toBeNull();
      expect(within(item!).getByText(principle.expanded)).toBeVisible();
      expect(within(item!).queryByText(principle.homepage)).not.toBeInTheDocument();
    }
  });

  it("explains every Thinking process stage beyond its homepage summary", () => {
    render(<ThinkingPage />);

    const expandedStages = [
      {
        title: "Question",
        homepage:
          "Start with the real situation, constraints and desired change.",
        expanded:
          "Look at the work as it exists now. Name the people involved, the constraint that matters and the change worth making.",
      },
      {
        title: "Direction",
        homepage: "Decide what should exist, what should not, and why.",
        expanded:
          "Choose the smallest coherent response. Define what belongs, what stays out and the reasoning behind both.",
      },
      {
        title: "Software",
        homepage:
          "Build the focused system with production concerns included.",
        expanded:
          "Turn that direction into a focused working system. Security, quality and maintainability stay in the production baseline.",
      },
      {
        title: "Learning",
        homepage:
          "Observe use, improve the system and carry the knowledge forward.",
        expanded:
          "Watch how the system is used, record what changes and bring that knowledge into the next decision.",
      },
    ];

    for (const stage of expandedStages) {
      const heading = screen.getByRole("heading", { name: stage.title });
      const item = heading.closest("li");

      expect(item).not.toBeNull();
      expect(within(item!).getByText(stage.expanded)).toBeVisible();
      expect(within(item!).queryByText(stage.homepage)).not.toBeInTheDocument();
    }
  });

  it("limits Capabilities examples to the approved artifact categories", () => {
    render(<CapabilitiesPage />);

    const artifactList = screen.getByRole("list", {
      name: "Artifact categories",
    });
    expect(
      within(artifactList)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual([
      "Public websites",
      "Customer portals",
      "Internal dashboards",
      "Workflow automation",
      "Custom applications",
    ]);
    expect(screen.getByText("No template-price race.")).toBeVisible();
    expect(screen.getByText("Security is part of the baseline.")).toBeVisible();
    expect(screen.getByText("Not every problem needs custom software.")).toBeVisible();
  });

  it("presents the three approved Partnership steps without deal terms", () => {
    const { container } = render(<PartnershipsPage />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(
      screen.getByText(
        "A partner brings market knowledge, access or a clearly observed problem.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Prizic brings product framing, engineering and technical direction.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Both sides validate fit before discussing a long-term structure.",
      ),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(
      /equity|revenue split|exclusivity|guaranteed outcome/i,
    );
  });

  it("keeps the About wordmark settled until replay is requested", () => {
    render(<AboutPage />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
    expect(
      screen.getByRole("button", { name: "Replay Prizic word animation" }),
    ).toBeEnabled();
  });

  it("shows a truthful pending Contact state without inventing a form", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_URL", "");
    render(<ContactPage />);

    expect(screen.getByText("Contact destination pending")).toBeVisible();
    expect(
      screen.getByText("The public contact channel is being configured."),
    ).toBeVisible();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("uses the configured direct Contact destination when one exists", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_URL", "mailto:preview@prizic.test");
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: "Contact Prizic" })).toHaveAttribute(
      "href",
      "mailto:preview@prizic.test",
    );
  });
});

describe("NotFound", () => {
  it("offers a branded route back home", () => {
    const { container } = render(<NotFound />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "That path does not exist.",
      }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      container.querySelector('img[src="/brand/prizic-mark-on-dark.svg"]'),
    ).toBeInTheDocument();
  });
});
