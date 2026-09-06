import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AccentSwitcher } from "@/components/theme/accent-switcher";

describe("AccentSwitcher", () => {
  beforeEach(() => {
    document.documentElement.dataset.accent = "cyan";
    localStorage.clear();
  });

  it("offers all accents and persists a selection", async () => {
    const user = userEvent.setup();
    render(<AccentSwitcher />);

    await user.click(screen.getByRole("radio", { name: "Electric lime" }));

    expect(document.documentElement).toHaveAttribute("data-accent", "lime");
    expect(localStorage.getItem("prizic-accent")).toBe("lime");
    expect(
      screen.getByRole("radio", { name: "Electric lime" }),
    ).toBeChecked();
  });
});
