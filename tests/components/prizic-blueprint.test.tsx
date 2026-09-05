import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PrizicBlueprint } from "@/components/brand/prizic-blueprint";
import { SITE_CONTENT } from "@/content/site";

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

describe("PrizicBlueprint", () => {
  it("exposes the four stages in order beside one decorative drawing", () => {
    render(<PrizicBlueprint stages={SITE_CONTENT.process.stages} />);

    const blueprint = screen.getByRole("figure", {
      name: "The Prizic system",
    });
    const items = within(blueprint).getAllByRole("listitem");

    expect(items).toHaveLength(4);
    expect(items.map((item) => item.querySelector("strong")?.textContent)).toEqual(
      ["Question", "Direction", "Software", "Learning"],
    );

    const drawing = blueprint.querySelector("svg");
    expect(drawing).toHaveAttribute("aria-hidden", "true");
    expect(drawing?.querySelector("[data-route]"))
      .toHaveAttribute("pathLength", "1");
    expect(drawing?.querySelector("[data-route]"))
      .toHaveAttribute("stroke-dasharray", "1");
  });

  it("uses purpose-built vertical geometry in compact mode", () => {
    const { rerender } = render(
      <PrizicBlueprint stages={SITE_CONTENT.process.stages} />,
    );

    const fullDrawing = screen
      .getByRole("figure", { name: "The Prizic system" })
      .querySelector("svg");
    const fullViewBox = fullDrawing?.getAttribute("viewBox");
    const fullRoute = fullDrawing
      ?.querySelector("[data-route]")
      ?.getAttribute("d");

    rerender(<PrizicBlueprint compact stages={SITE_CONTENT.process.stages} />);

    const compactDrawing = screen
      .getByRole("figure", { name: "The Prizic system" })
      .querySelector("svg");
    expect(compactDrawing?.getAttribute("viewBox")).not.toBe(fullViewBox);
    expect(
      compactDrawing?.querySelector("[data-route]")?.getAttribute("d"),
    ).not.toBe(fullRoute);
    expect(compactDrawing).toHaveAttribute("data-layout", "compact");
  });

  it("renders a static completed route for reduced motion", () => {
    motionPreference.reduced = true;
    render(<PrizicBlueprint stages={SITE_CONTENT.process.stages} />);

    const route = screen
      .getByRole("figure", { name: "The Prizic system" })
      .querySelector("[data-route-progress]");
    expect(route).toHaveAttribute("data-motion", "static");
  });
});
