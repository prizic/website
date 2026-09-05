import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { SITE_CONTENT } from "@/content/site";

describe("SiteHeader", () => {
  it("exposes the home link and primary navigation", () => {
    render(<SiteHeader navigation={SITE_CONTENT.navigation} />);

    expect(screen.getByRole("link", { name: "Prizic home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
  });

  it("opens the mobile dialog, closes on Escape, and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(<SiteHeader navigation={SITE_CONTENT.navigation} />);

    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);

    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Navigation" }),
    ).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile dialog when a route is selected", async () => {
    const user = userEvent.setup();
    render(<SiteHeader navigation={SITE_CONTENT.navigation} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    const routeLink = within(dialog).getByRole("link", {
      name: SITE_CONTENT.navigation[0].label,
    });
    routeLink.addEventListener("click", (event) => event.preventDefault());
    await user.click(routeLink);

    expect(dialog).not.toBeInTheDocument();
  });
});
