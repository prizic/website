import type { Metadata } from "next";

export interface PageMetadataInput {
  /** The complete document title, including the Prizic identity. */
  title: string;
  description: string;
  path: `/${string}` | "/";
  canonicalUrl: string | null;
}

const SOCIAL_IMAGE = {
  width: 1200,
  height: 630,
  alt: "Prizic. Web design, business software and automation for local businesses.",
};

function absoluteUrl(canonicalUrl: string, path: string): string {
  return new URL(path, `${canonicalUrl}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  canonicalUrl,
}: PageMetadataInput): Metadata {
  const canonical = canonicalUrl ? absoluteUrl(canonicalUrl, path) : null;
  const socialImage = canonicalUrl
    ? absoluteUrl(canonicalUrl, "/opengraph-image")
    : "/opengraph-image";

  return {
    ...(canonicalUrl ? { metadataBase: new URL(canonicalUrl) } : {}),
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title,
      description,
      siteName: "Prizic",
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      images: [{ ...SOCIAL_IMAGE, url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function createOrganizationJsonLd(canonicalUrl: string | null) {
  if (!canonicalUrl) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prizic",
    url: canonicalUrl,
    logo: absoluteUrl(canonicalUrl, "/brand/prizic-mark-on-dark.svg"),
  } as const;
}
