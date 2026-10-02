import { describe, expect, it } from "vitest";

import { SITE_CONTENT } from "@/content/site";
import { assertPublicContent } from "@/lib/public-content";

describe("assertPublicContent", () => {
  it.each([
    "dental",
    "Dentist",
    "clinic",
    "testimonial",
    "a recent case study",
    "award-winning studio",
    "guaranteed growth",
  ])("rejects prohibited public copy: %s", (term) => {
    expect(() => assertPublicContent(term)).toThrow(
      /prohibited public content/i,
    );
  });

  it("accepts the service language the approved copy uses", () => {
    expect(() =>
      assertPublicContent(
        "Booking and inquiry flows. How do you price a project? Reservation systems.",
      ),
    ).not.toThrow();
  });

  it("accepts the published site content", () => {
    expect(() => assertPublicContent(JSON.stringify(SITE_CONTENT))).not.toThrow();
  });
});
