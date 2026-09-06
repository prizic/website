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
    expect(screen.getByText(SITE_CONTENT.hero.supportingText)).toBeVisible();
    expect(
      screen.getByRole("link", { name: "See how Prizic thinks" }),
    ).toHaveAttribute("href", "/thinking");

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((heading) =>
        heading.textContent,
      ),
    ).toEqual([
      "A way of thinking.",
      "Introducing Prizic.",
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

  it("composes the homepage as the approved editorial deck", () => {
    const { container } = render(<HomePage />);
    const hero = screen.getByRole("region", {
      name: SITE_CONTENT.hero.headline,
    });

    expect(within(hero).getByRole("img", { name: "Prizic" })).toBeVisible();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const spread of ["opening", "method", "introduction", "principles", "direction", "capabilities", "founder", "closing"]) {
      expect(container.querySelector(`[data-spread="${spread}"]`)).toBeInTheDocument();
    }
    expect(hero.querySelector('[data-artwork="fold"]')).toBeInTheDocument();
    const method = container.querySelector('[data-spread="method"]')! as HTMLElement;
    const modules = within(method).getAllByRole("listitem");
    expect(modules).toHaveLength(4);
    SITE_CONTENT.process.stages.forEach((stage, index) => {
      expect(within(modules[index]).getByRole("heading", { name: stage.title })).toBeVisible();
      expect(within(modules[index]).getByText(stage.description)).toBeVisible();
      expect(within(modules[index]).getByRole("link")).toHaveAttribute("href", "/thinking");
    });
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
