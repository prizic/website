import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LivingWordmark } from "@/components/brand/living-wordmark";

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
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("LivingWordmark", () => {
  it("keeps one stable name, its word anchors, and the supplied mark", () => {
    render(<LivingWordmark autoPlay={false} />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });

    expect(within(wordmark).getByText("Pr")).toBeVisible();
    expect(within(wordmark).getByText("c")).toBeVisible();
    expect(
      wordmark.querySelector('img[src="/brand/prizic-mark-on-dark.svg"]'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Replay Prizic word animation" }),
    ).toBeEnabled();
  });

  it("plays the sequence once, preserves its anchors, and settles on Prizic", () => {
    render(<LivingWordmark />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });
    const prefix = within(wordmark).getByText("Pr");
    const ending = within(wordmark).getByText("c");

    expect(wordmark).toHaveAttribute("data-word", "Precise");

    act(() => vi.advanceTimersByTime(1_200));
    expect(wordmark).toHaveAttribute("data-word", "Prism");

    act(() => vi.advanceTimersByTime(1_200));
    expect(wordmark).toHaveAttribute("data-word", "Prize");

    act(() => vi.advanceTimersByTime(1_200));
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
    expect(within(wordmark).getByText("Pr")).toBe(prefix);
    expect(within(wordmark).getByText("c")).toBe(ending);

    act(() => vi.advanceTimersByTime(10_000));
    expect(wordmark).toHaveAttribute("data-word", "Prizic");

    fireEvent.click(
      screen.getByRole("button", { name: "Replay Prizic word animation" }),
    );
    expect(wordmark).toHaveAttribute("data-word", "Precise");
  });

  it("renders and keeps the final state when reduced motion is requested", () => {
    motionPreference.reduced = true;
    render(<LivingWordmark />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
    expect(wordmark).toHaveAttribute("data-settling", "false");

    act(() => vi.advanceTimersByTime(20_000));
    fireEvent.click(
      screen.getByRole("button", { name: "Replay Prizic word animation" }),
    );
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
  });
});
