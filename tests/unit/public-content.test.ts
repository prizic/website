import { describe, expect, it } from "vitest";

import { assertPublicContent } from "@/lib/public-content";

describe("assertPublicContent", () => {
  it.each([
    "dental",
    "Dentist",
    "clinic",
    "online booking",
    "pricing",
    "testimonial",
  ])("rejects prohibited public copy: %s", (term) => {
    expect(() => assertPublicContent(term)).toThrow(
      /prohibited public content/i,
    );
  });

  it("accepts approved corporate copy", () => {
    expect(() =>
      assertPublicContent(
        "Prizic combines product thinking, engineering and long-term technical direction.",
      ),
    ).not.toThrow();
  });
});
