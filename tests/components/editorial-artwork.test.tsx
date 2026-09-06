import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EditorialArtwork } from "@/components/editorial/editorial-artwork";

describe("EditorialArtwork", () => {
  it.each(["fold", "ribs", "orbit", "stack"] as const)(
    "renders the %s authored variant",
    (variant) => {
      const { container } = render(
        <EditorialArtwork label={`${variant} system study`} variant={variant} />,
      );

      expect(
        screen.getByRole("img", { name: `${variant} system study` }),
      ).toBeVisible();
      expect(
        container.querySelector(`[data-artwork="${variant}"]`),
      ).toBeInTheDocument();
    },
  );

  it("can be purely decorative", () => {
    const { container } = render(<EditorialArtwork decorative variant="fold" />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
