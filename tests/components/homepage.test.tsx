import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/page";
import { SITE_CONTENT } from "@/content/site";
import { assertPublicContent } from "@/lib/public-content";

const motionPreference = vi.hoisted(() => ({ reduced: false }));

vi.mock("motion/react", async () => {
  const motion = await vi.importActual<typeof import("motion/react")>(
    "motion/react",
  );
  return {
    ...motion,
    useReducedMotion: () => motionPreference.reduced,
  };
});

beforeEach(() => {
  motionPreference.reduced = false;
});

describe("HomePage", () => {
  it("renders the approved narrative in order from typed content", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "From possibility to working systems.",
      }),
    ).toBeVisible();
    expect(screen.getByText(/founder-led technology company/i)).toBeVisible();
    expect(
      screen.getByRole("link", { name: "See how Prizic thinks" }),
    ).toHaveAttribute("href", "/thinking");

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((heading) =>
        heading.textContent,
      ),
    ).toEqual([
      "Clarity is part of the work.",
      "The Prizic system.",
      "What Prizic can bring to the work.",
      "Built close to the work.",
      "A clear first conversation is enough.",
    ]);

    for (const principle of SITE_CONTENT.principles.items) {
      expect(screen.getByText(principle.title)).toBeVisible();
      expect(screen.getByText(principle.description)).toBeVisible();
    }
    expect(screen.getByText(SITE_CONTENT.founder.body)).toBeVisible();
    expect(screen.getByText(SITE_CONTENT.closing.body)).toBeVisible();
    assertPublicContent(container.textContent ?? "");
  });

  it("keeps the blueprint dominant and the living wordmark distinct in the hero", () => {
    const { container } = render(<HomePage />);
    const hero = screen.getByRole("region", {
      name: SITE_CONTENT.hero.headline,
    });

    expect(within(hero).getByRole("img", { name: "Prizic" })).toBeVisible();
    expect(
      within(hero).getAllByRole("figure", { name: "The Prizic system" }),
    ).toHaveLength(2);
    expect(
      hero.querySelector(
        '.home-blueprint--full svg[data-layout="full"]',
      ),
    ).toBeInTheDocument();
    expect(
      hero.querySelector(
        '.home-blueprint--compact svg[data-layout="compact"]',
      ),
    ).toBeInTheDocument();
    expect(container.querySelector(".home-hero__grid")).toBeInTheDocument();
  });

  it("links every capability and both closing actions to their approved routes", () => {
    render(<HomePage />);

    for (const capability of SITE_CONTENT.capabilities.items) {
      expect(
        screen.getByRole("link", { name: new RegExp(capability.title, "i") }),
      ).toHaveAttribute("href", capability.href);
    }
    expect(
      screen.getAllByRole("link", { name: "Start a conversation" }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Explore partnerships" }),
    ).toHaveAttribute("href", "/partnerships");
  });
});
