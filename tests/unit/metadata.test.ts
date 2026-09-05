import type { Metadata } from "next";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as AboutRoute from "@/app/about/page";
import * as CapabilitiesRoute from "@/app/capabilities/page";
import * as ContactRoute from "@/app/contact/page";
import SocialImage, {
  alt as socialImageAlt,
  contentType as socialImageContentType,
  size as socialImageSize,
} from "@/app/opengraph-image";
import * as PartnershipsRoute from "@/app/partnerships/page";
import * as HomeRoute from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import * as ThinkingRoute from "@/app/thinking/page";
import {
  createOrganizationJsonLd,
  createPageMetadata,
} from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

afterEach(() => vi.unstubAllEnvs());

describe("createPageMetadata", () => {
  it("builds the exact default identity and canonical social metadata", () => {
    expect(
      createPageMetadata({
        title: "From possibility to working systems",
        description:
          "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
        path: "/",
        canonicalUrl: "https://prizic.com",
      }),
    ).toMatchObject({
      title: "Prizic | From possibility to working systems",
      description:
        "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
      alternates: { canonical: "https://prizic.com/" },
      openGraph: {
        title: "Prizic | From possibility to working systems",
        url: "https://prizic.com/",
        siteName: "Prizic",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Prizic | From possibility to working systems",
      },
    });
  });

  it("qualifies inner-page titles and paths with the Prizic identity", () => {
    expect(
      createPageMetadata({
        title: "About Prizic",
        description: "The founder, purpose and thinking behind Prizic.",
        path: "/about",
        canonicalUrl: "https://prizic.com",
      }),
    ).toMatchObject({
      title: "About Prizic | Prizic",
      alternates: { canonical: "https://prizic.com/about" },
    });
  });

  it("omits invented canonical metadata when configuration is pending", () => {
    const metadata = createPageMetadata({
      title: "Thinking",
      description: "How Prizic frames decisions and production work.",
      path: "/thinking",
      canonicalUrl: null,
    });

    expect(metadata.alternates).toBeUndefined();
    expect(metadata.metadataBase).toBeUndefined();
    expect(metadata.openGraph).not.toHaveProperty("url");
  });
});

describe("route metadata", () => {
  it("gives every public route a unique plain-language title and description", () => {
    const routeMetadata = [
      HomeRoute,
      ThinkingRoute,
      CapabilitiesRoute,
      PartnershipsRoute,
      AboutRoute,
      ContactRoute,
    ].map((route) => (route as { metadata?: Metadata }).metadata);

    expect(routeMetadata.map((metadata) => metadata?.title)).toEqual([
      "Prizic | From possibility to working systems",
      "Thinking | Prizic",
      "Capabilities | Prizic",
      "Partnerships | Prizic",
      "About Prizic | Prizic",
      "Contact | Prizic",
    ]);
    expect(routeMetadata.map((metadata) => metadata?.description)).toEqual([
      "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
      "The principles, four-stage method and production commitments behind how Prizic works.",
      "The digital products, business systems and technical direction Prizic can shape.",
      "How industry knowledge and Prizic's product and engineering direction can meet.",
      "The founder, purpose and thinking behind Prizic.",
      "Start a direct conversation with Prizic about a product, operating problem or industry.",
    ]);
  });
});

describe("structured discovery metadata", () => {
  it("emits only confirmed Organization facts when canonical config is ready", () => {
    expect(createOrganizationJsonLd("https://prizic.com")).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Prizic",
      url: "https://prizic.com",
      logo: "https://prizic.com/brand/prizic-mark-on-dark.svg",
    });
    expect(createOrganizationJsonLd(null)).toBeNull();
  });

  it("lists exactly the six rendered public routes when canonical config exists", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://prizic.com");

    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://prizic.com/",
      "https://prizic.com/thinking",
      "https://prizic.com/capabilities",
      "https://prizic.com/partnerships",
      "https://prizic.com/about",
      "https://prizic.com/contact",
    ]);
  });

  it("allows crawling but adds a sitemap reference only with canonical config", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
    });

    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://prizic.com");
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://prizic.com/sitemap.xml",
    });
  });

  it("keeps production discovery config behind existing URL validation", () => {
    expect(() => resolveSiteConfig({}, "production")).toThrow(
      "Production requires NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_URL",
    );
    expect(() =>
      resolveSiteConfig(
        {
          NEXT_PUBLIC_SITE_URL: "not a URL",
          NEXT_PUBLIC_CONTACT_URL: "mailto:preview@prizic.test",
        },
        "production",
      ),
    ).toThrow(/invalid NEXT_PUBLIC_SITE_URL/i);
  });
});

describe("social image", () => {
  it("ships the owned Prizic preview at the social sharing dimensions", () => {
    expect(socialImageSize).toEqual({ width: 1200, height: 630 });
    expect(socialImageContentType).toBe("image/png");
    expect(socialImageAlt).toBe(
      "Prizic. From possibility to working systems.",
    );
    expect(SocialImage().headers.get("content-type")).toContain("image/png");
  });
});
