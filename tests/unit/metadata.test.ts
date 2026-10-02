import type { Metadata } from "next";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as AboutRoute from "@/app/about/page";
import * as ApproachRoute from "@/app/approach/page";
import * as ContactRoute from "@/app/contact/page";
import SocialImage, {
  alt as socialImageAlt,
  contentType as socialImageContentType,
  size as socialImageSize,
} from "@/app/opengraph-image";
import * as HomeRoute from "@/app/page";
import robots from "@/app/robots";
import { generateMetadata as serviceMetadata } from "@/app/services/[slug]/page";
import * as ServicesRoute from "@/app/services/page";
import sitemap from "@/app/sitemap";
import {
  createOrganizationJsonLd,
  createPageMetadata,
} from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

afterEach(() => vi.unstubAllEnvs());

describe("createPageMetadata", () => {
  it("uses the complete approved title across document and social metadata", () => {
    expect(
      createPageMetadata({
        title: "Prizic | Web Design, Business Software & Automation",
        description: "Websites, custom business software, and automation for local businesses.",
        path: "/",
        canonicalUrl: "https://prizic.com",
      }),
    ).toMatchObject({
      title: "Prizic | Web Design, Business Software & Automation",
      alternates: { canonical: "https://prizic.com/" },
      openGraph: {
        title: "Prizic | Web Design, Business Software & Automation",
        url: "https://prizic.com/",
        siteName: "Prizic",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Prizic | Web Design, Business Software & Automation",
      },
    });
  });

  it("builds canonical inner-page paths", () => {
    expect(
      createPageMetadata({
        title: "About Prizic | Software & Digital Product Studio",
        description: "About.",
        path: "/about",
        canonicalUrl: "https://prizic.com",
      }),
    ).toMatchObject({ alternates: { canonical: "https://prizic.com/about" } });
  });

  it("omits invented canonical metadata when configuration is pending", () => {
    const metadata = createPageMetadata({
      title: "Our Approach | Prizic",
      description: "How Prizic plans and delivers a project.",
      path: "/approach",
      canonicalUrl: null,
    });

    expect(metadata.alternates).toBeUndefined();
    expect(metadata.metadataBase).toBeUndefined();
    expect(metadata.openGraph).not.toHaveProperty("url");
  });
});

describe("route metadata", () => {
  it("gives every public route its approved title and a unique description", async () => {
    const staticRoutes = [HomeRoute, ServicesRoute, ApproachRoute, AboutRoute, ContactRoute].map(
      (route) => (route as { metadata?: Metadata }).metadata,
    );
    const serviceRoutes = await Promise.all(
      ["websites", "business-software", "automation"].map((slug) =>
        serviceMetadata({ params: Promise.resolve({ slug }) }),
      ),
    );
    const routeMetadata = [...staticRoutes, ...serviceRoutes];

    expect(routeMetadata.map((metadata) => metadata?.title)).toEqual([
      "Prizic | Web Design, Business Software & Automation",
      "Services | Prizic",
      "Our Approach | Prizic",
      "About Prizic | Software & Digital Product Studio",
      "Discuss a Project | Prizic",
      "Business Website Design & Development | Prizic",
      "Custom Business Software & Internal Tools | Prizic",
      "Workflow Automation & Integrations | Prizic",
    ]);
    expect(routeMetadata[0]?.description).toBe(
      "Websites, custom business software, and automation for local businesses. Prizic connects customer experiences with the workflows behind them.",
    );
    const descriptions = routeMetadata.map((metadata) => metadata?.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
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

  it("lists exactly the rendered public routes when canonical config exists", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://prizic.com");

    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://prizic.com/",
      "https://prizic.com/services",
      "https://prizic.com/services/websites",
      "https://prizic.com/services/business-software",
      "https://prizic.com/services/automation",
      "https://prizic.com/approach",
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

  it("builds discovery URLs from the validated canonical origin", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://prizic.com/");

    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://prizic.com/sitemap.xml",
    });
    expect(sitemap().at(-1)?.url).toBe("https://prizic.com/contact");
  });

  it.each([
    "https://prizic.com/about",
    "https://prizic.com?source=preview",
    "https://prizic.com#company",
  ])("rejects invalid discovery origins: %s", (siteUrl) => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);

    expect(() => robots()).toThrow(/invalid NEXT_PUBLIC_SITE_URL/i);
    expect(() => sitemap()).toThrow(/invalid NEXT_PUBLIC_SITE_URL/i);
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
      "Prizic. Web design, business software and automation for local businesses.",
    );
    expect(SocialImage().headers.get("content-type")).toContain("image/png");
  });
});
