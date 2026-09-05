import type { Metadata } from "next";

export interface PageMetadataInput {
  title: string;
  description: string;
  path: `/${string}` | "/";
  canonicalUrl: string | null;
}

const SOCIAL_IMAGE = {
  width: 1200,
  height: 630,
  alt: "Prizic. From possibility to working systems.",
};

function pageTitle(title: string, path: PageMetadataInput["path"]): string {
  return path === "/" ? `Prizic | ${title}` : `${title} | Prizic`;
}

function absoluteUrl(canonicalUrl: string, path: string): string {
  return new URL(path, `${canonicalUrl}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  canonicalUrl,
}: PageMetadataInput): Metadata {
  const resolvedTitle = pageTitle(title, path);
  const canonical = canonicalUrl ? absoluteUrl(canonicalUrl, path) : null;
  const socialImage = canonicalUrl
    ? absoluteUrl(canonicalUrl, "/opengraph-image")
    : "/opengraph-image";

  return {
    ...(canonicalUrl ? { metadataBase: new URL(canonicalUrl) } : {}),
    title: resolvedTitle,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: resolvedTitle,
      description,
      siteName: "Prizic",
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      images: [{ ...SOCIAL_IMAGE, url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
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
