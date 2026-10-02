import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/page";
import { SITE_CONTENT } from "@/content/site";
import { assertPublicContent } from "@/lib/public-content";

const { home } = SITE_CONTENT;

afterEach(() => vi.unstubAllEnvs());

describe("HomePage", () => {
  it("renders the approved narrative in order from typed content", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: home.hero.headline }),
    ).toBeVisible();
    expect(screen.getByText(home.hero.eyebrow)).toBeVisible();
    expect(screen.getByText(home.hero.supportingText)).toBeVisible();

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent),
    ).toEqual([
      "Your website is where the conversation starts.",
      "Three ways we can help.",
      "Start with the part of your business that needs attention.",
      "Designed together. Built to work together.",
      "Know what is being built—and what happens next.",
      "Keep improving after launch.",
      "Meet the team behind the work.",
      "Before we get started.",
      "What is the next improvement your business needs?",
    ]);
    assertPublicContent(container.textContent ?? "");
  });

  it("composes the homepage as an editorial deck with one page heading", () => {
    const { container } = render(<HomePage />);
    const hero = screen.getByRole("region", { name: home.hero.headline });

    expect(within(hero).getByRole("img", { name: "Prizic" })).toBeVisible();
    expect(hero.querySelector('[data-artwork="fold"]')).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const spread of ["opening", "introduction", "services", "situations", "connected", "delivery", "studio", "faq", "closing"]) {
      expect(container.querySelector(`[data-spread="${spread}"]`)).toBeInTheDocument();
    }
  });

  it("sends the hero actions to the inquiry and the services", () => {
    render(<HomePage />);
    const hero = screen.getByRole("region", { name: home.hero.headline });

    expect(within(hero).getByRole("link", { name: "Discuss a project" })).toHaveAttribute("href", "/contact");
    expect(within(hero).getByRole("link", { name: "Explore our services" })).toHaveAttribute("href", "/services");
  });

  it("presents each service with its deliverables and a matching link", () => {
    render(<HomePage />);
    const services = screen.getByRole("region", { name: home.services.headline });

    for (const service of home.services.items) {
      const card = within(services)
        .getByRole("heading", { level: 3, name: service.headline })
        .closest("li")!;
      expect(
        within(within(card).getByRole("list", { name: `${service.name} deliverables` }))
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual(service.deliverables);
      expect(within(card).getByRole("link", { name: service.link.label })).toHaveAttribute("href", service.link.href);
    }
  });

  it("links every customer situation to the service that addresses it", () => {
    render(<HomePage />);

    for (const situation of home.situations.items) {
      const heading = screen.getByRole("heading", { level: 3, name: situation.title });
      expect(heading.closest("a")).toHaveAttribute("href", situation.href);
    }
  });

  it("answers every FAQ in a native disclosure", () => {
    render(<HomePage />);

    for (const item of home.faq.items) {
      expect(screen.getByText(item.question).closest("details")).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it("closes with the inquiry and a truthful email state", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_URL", "");
    render(<HomePage />);
    const closing = screen.getByRole("region", { name: home.closing.headline });

    expect(within(closing).getByRole("link", { name: "Discuss a project" })).toHaveAttribute("href", "/contact");
    expect(within(closing).getByText("Contact destination pending")).toBeVisible();
  });

  it("uses the configured inbox for Email Prizic", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_URL", "mailto:preview@prizic.test");
    render(<HomePage />);
    const closing = screen.getByRole("region", { name: home.closing.headline });

    expect(within(closing).getByRole("link", { name: "Email Prizic" })).toHaveAttribute("href", "mailto:preview@prizic.test");
  });
});
