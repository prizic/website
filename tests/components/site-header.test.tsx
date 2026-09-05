import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { SITE_CONTENT } from "@/content/site";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: originalMatchMedia,
  });
});

function installDesktopBreakpoint(initialMatches = false) {
  let changeListener: ((event: MediaQueryListEvent) => void) | undefined;
  const mediaQuery = {
    matches: initialMatches,
    media: "(min-width: 56.25rem)",
    onchange: null,
    addEventListener: (
      _type: "change",
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      changeListener = listener;
    },
    removeEventListener: () => {
      changeListener = undefined;
    },
  } as unknown as MediaQueryList;

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: () => mediaQuery,
  });

  return (matches: boolean) => {
    Object.defineProperty(mediaQuery, "matches", {
      configurable: true,
      value: matches,
    });
    changeListener?.({ matches } as MediaQueryListEvent);
  };
}

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

  it("uses one home link with full and compact responsive logo assets", () => {
    render(<SiteHeader navigation={SITE_CONTENT.navigation} />);

    const homeLinks = screen.getAllByRole("link", { name: "Prizic home" });
    expect(homeLinks).toHaveLength(1);

    const lockup = homeLinks[0].querySelector(
      'img[src="/brand/prizic-lockup-on-dark.svg"]',
    );
    const mark = homeLinks[0].querySelector(
      'img[src="/brand/prizic-mark-on-dark.svg"]',
    );

    expect(lockup).toHaveClass("site-header__logo--desktop");
    expect(mark).toHaveClass("site-header__logo--mobile");
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

  it("closes and unlocks the page when the desktop breakpoint is crossed", async () => {
    const user = userEvent.setup();
    const setDesktop = installDesktopBreakpoint();
    render(<SiteHeader navigation={SITE_CONTENT.navigation} />);

    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    act(() => setDesktop(true));

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Navigation" }),
      ).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe("");
    expect(trigger).not.toHaveFocus();
  });
});
