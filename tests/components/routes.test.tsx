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
