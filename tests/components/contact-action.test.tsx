import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactAction } from "@/components/actions/contact-action";

describe("ContactAction", () => {
  it("renders pending contact as noninteractive text", () => {
    render(<ContactAction contact={{ kind: "pending" }} />);

    const pending = screen.getByText("Contact destination pending");
    expect(pending.closest("a, button")).toBeNull();
  });

  it("renders a ready destination as an email link by default", () => {
    render(
      <ContactAction
        contact={{ kind: "ready", href: "mailto:hello@prizic.com" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Email Prizic" })).toHaveAttribute(
      "href",
      "mailto:hello@prizic.com",
    );
  });

  it("uses an explicit label for a ready destination", () => {
    render(
      <ContactAction
        contact={{ kind: "ready", href: "https://prizic.com/contact" }}
        label="Start a conversation"
      />,
    );

    expect(
      screen.getByRole("link", { name: "Start a conversation" }),
    ).toHaveAttribute("href", "https://prizic.com/contact");
  });
});
