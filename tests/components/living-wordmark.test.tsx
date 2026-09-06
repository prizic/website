import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LivingWordmark } from "@/components/brand/living-wordmark";

const motionPreference = { reduced: false };

beforeEach(() => {
  motionPreference.reduced = false;
  vi.stubGlobal("matchMedia", () => ({
    matches: motionPreference.reduced,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
  }));
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
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
    const displayWord = wordmark.querySelector(".living-wordmark__display-word");
    expect(displayWord).toHaveTextContent("Prizic");
    expect(displayWord).not.toHaveStyle({ filter: "blur(3px)" });
    expect(displayWord).not.toHaveStyle({ opacity: "0.55" });
  });

  it("frames the anchored word with calibrated signal geometry", () => {
    render(<LivingWordmark autoPlay={false} expandedSignal />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });
    const signalField = wordmark.querySelector("[data-signal-field]");

    expect(signalField).toBeInTheDocument();
    expect(
      signalField?.querySelectorAll("[data-calibration-line]"),
    ).toHaveLength(7);
    expect(
      signalField?.querySelector("[data-calibration-origin]"),
    ).toBeInTheDocument();
    expect(within(wordmark).getByText("Pr")).toBeVisible();
    expect(within(wordmark).getByText("c")).toBeVisible();
  });

  it("plays the sequence once, preserves its anchors, and settles on Prizic", () => {
    render(<LivingWordmark />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });
    const prefix = within(wordmark).getByText("Pr");
    const ending = within(wordmark).getByText("c");

    function expectVisibleFrame(word: string) {
      const display = wordmark.querySelector(".living-wordmark__display-word");
      expect(display).toHaveTextContent(word);
      expect(display).toBeVisible();
      expect(within(wordmark).getByText("Pr")).toBe(prefix);
      expect(within(wordmark).getByText("c")).toBe(ending);
      expect(prefix).toBeVisible();
      expect(ending).toBeVisible();
    }

    expect(wordmark).toHaveAttribute("data-word", "Precise");
    expectVisibleFrame("Precise");

    act(() => vi.advanceTimersByTime(1_200));
    expect(wordmark).toHaveAttribute("data-word", "Prism");
    expectVisibleFrame("Prism");

    act(() => vi.advanceTimersByTime(1_200));
    expect(wordmark).toHaveAttribute("data-word", "Prize");
    expectVisibleFrame("Prize");

    act(() => vi.advanceTimersByTime(1_200));
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
    expectVisibleFrame("Prizic");

    act(() => vi.advanceTimersByTime(10_000));
    expect(wordmark).toHaveAttribute("data-word", "Prizic");

    fireEvent.click(
      screen.getByRole("button", { name: "Replay Prizic word animation" }),
    );
    expect(wordmark).toHaveAttribute("data-word", "Precise");
    expectVisibleFrame("Precise");
  });

  it("renders and keeps the final state when reduced motion is requested", () => {
    motionPreference.reduced = true;
    render(<LivingWordmark />);

    const wordmark = screen.getByRole("img", { name: "Prizic" });
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
    expect(wordmark).toHaveAttribute("data-settling", "false");

    act(() => vi.advanceTimersByTime(20_000));
    expect(screen.queryByRole("button", { name: "Replay Prizic word animation" })).not.toBeInTheDocument();
    expect(wordmark).toHaveAttribute("data-word", "Prizic");
  });
});
