import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { OpeningSpread } from "@/components/home/opening-spread";
import { MethodSpread } from "@/components/home/method-spread";
import { SITE_CONTENT } from "@/content/site";

describe("progressive editorial motion", () => {
  it("ships readable server content and material images before hydration", () => {
    const html = renderToString(<><OpeningSpread /><MethodSpread /></>);
    const document = new DOMParser().parseFromString(html, "text/html");
    expect(document.querySelector("[data-reveal] h2")?.textContent).toBe("A way of thinking.");
    expect(document.querySelectorAll('.opening-spread__materials img[src*="prizic-"]')).toHaveLength(2);
    for (const reveal of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      expect(reveal.style.opacity).not.toBe("0");
      expect(reveal.style.visibility).not.toBe("hidden");
    }
  });

  it("renders a complete still header identity under reduced motion", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
    try {
      render(<SiteHeader navigation={SITE_CONTENT.navigation} />);
      const home = screen.getByRole("link", { name: "Prizic home" });
      expect(home.querySelector("[data-header-identity]")).toHaveAttribute("data-motion", "static");
      expect(home).toHaveTextContent("Prizic");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
