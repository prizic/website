import { describe, expect, it } from "vitest";

import { resolveSiteConfig } from "@/lib/site-config";

describe("resolveSiteConfig", () => {
  it("represents missing development destinations truthfully", () => {
    expect(resolveSiteConfig({}, "development")).toEqual({
      canonicalUrl: null,
      contact: { kind: "pending" },
    });
  });

  it("accepts verified https destinations", () => {
    expect(
      resolveSiteConfig(
        {
          NEXT_PUBLIC_SITE_URL: "https://prizic.com",
          NEXT_PUBLIC_CONTACT_URL: "mailto:hello@prizic.com",
        },
        "test",
      ),
    ).toMatchObject({
      canonicalUrl: "https://prizic.com",
      contact: { kind: "ready", href: "mailto:hello@prizic.com" },
    });
  });

  it("normalizes the canonical URL without a trailing slash", () => {
    expect(
      resolveSiteConfig(
        {
          NEXT_PUBLIC_SITE_URL: "https://prizic.com/",
        },
        "test",
      ).canonicalUrl,
    ).toBe("https://prizic.com");
  });

  it("rejects malformed canonical URLs", () => {
    expect(() =>
      resolveSiteConfig(
        { NEXT_PUBLIC_SITE_URL: "not a URL" },
        "test",
      ),
    ).toThrow(/invalid NEXT_PUBLIC_SITE_URL/i);
  });

  it.each(["ftp://prizic.com/contact", "tel:+123456789"])(
    "rejects unsupported contact schemes: %s",
    (contactUrl) => {
      expect(() =>
        resolveSiteConfig(
          { NEXT_PUBLIC_CONTACT_URL: contactUrl },
          "test",
        ),
      ).toThrow(/invalid NEXT_PUBLIC_CONTACT_URL/i);
    },
  );

  it("rejects an empty mailto destination in production", () => {
    expect(() =>
      resolveSiteConfig(
        {
          NEXT_PUBLIC_SITE_URL: "https://prizic.com",
          NEXT_PUBLIC_CONTACT_URL: "mailto:",
        },
        "production",
      ),
    ).toThrow(/invalid NEXT_PUBLIC_CONTACT_URL/i);
  });

  it("rejects pending production configuration", () => {
    expect(() => resolveSiteConfig({}, "production")).toThrow(
      "Production requires NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_URL",
    );
  });
});
