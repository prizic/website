import { describe, expect, it } from "vitest";

import { resolveSiteConfig } from "@/lib/site-config";

describe("resolveSiteConfig", () => {
  it("represents missing development destinations truthfully", () => {
    expect(resolveSiteConfig({}, "development")).toEqual({
      canonicalUrl: null,
      contact: { kind: "pending" },
      bookingUrl: null,
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

  it.each([
    "https://prizic.com/about",
    "https://prizic.com?source=preview",
    "https://prizic.com#company",
  ])("rejects a canonical URL that is not the site origin: %s", (siteUrl) => {
    expect(() =>
      resolveSiteConfig({ NEXT_PUBLIC_SITE_URL: siteUrl }, "test"),
    ).toThrow(/invalid NEXT_PUBLIC_SITE_URL/i);
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

  it.each([
    "mailto:not-an-email",
    "mailto:%20",
    "mailto:hello%20world@prizic.com",
    "mailto:hello@",
  ])("rejects a malformed mailto recipient: %s", (contactUrl) => {
    expect(() =>
      resolveSiteConfig(
        { NEXT_PUBLIC_CONTACT_URL: contactUrl },
        "test",
      ),
    ).toThrow(/invalid NEXT_PUBLIC_CONTACT_URL/i);
  });

  it("retains a valid mailto recipient and query parameters", () => {
    expect(
      resolveSiteConfig(
        {
          NEXT_PUBLIC_CONTACT_URL:
            "mailto:hello@prizic.com?subject=Project%20enquiry&body=Hello%20Prizic",
        },
        "test",
      ).contact,
    ).toEqual({
      kind: "ready",
      href: "mailto:hello@prizic.com?subject=Project%20enquiry&body=Hello%20Prizic",
    });
  });

  it("rejects pending production configuration", () => {
    expect(() => resolveSiteConfig({}, "production")).toThrow(
      "Production requires NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_URL",
    );
  });

  it("accepts an http or https introductory-call booking URL", () => {
    expect(
      resolveSiteConfig(
        { NEXT_PUBLIC_BOOKING_URL: "https://cal.example/prizic/intro" },
        "test",
      ).bookingUrl,
    ).toBe("https://cal.example/prizic/intro");
  });

  it("rejects a booking URL that is not http or https", () => {
    expect(() =>
      resolveSiteConfig({ NEXT_PUBLIC_BOOKING_URL: "mailto:a@b.co" }, "test"),
    ).toThrow(/invalid NEXT_PUBLIC_BOOKING_URL/i);
  });
});
