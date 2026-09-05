import type { ContactState } from "@/content/types";

export interface SiteConfig {
  canonicalUrl: string | null;
  contact: ContactState;
}

type SiteMode = "development" | "test" | "production";

const PRODUCTION_CONFIG_ERROR =
  "Production requires NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_URL";

function optionalValue(value: string | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function parseCanonicalUrl(value: string): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid NEXT_PUBLIC_SITE_URL: expected an absolute URL");
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Invalid NEXT_PUBLIC_SITE_URL: expected an http or https URL");
  }

  return url.toString().replace(/\/$/, "");
}

function parseContactUrl(value: string): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid NEXT_PUBLIC_CONTACT_URL: expected an absolute URL");
  }

  if (!["mailto:", "https:", "http:"].includes(url.protocol)) {
    throw new Error(
      "Invalid NEXT_PUBLIC_CONTACT_URL: expected a mailto, http or https URL",
    );
  }

  return url.toString();
}

export function resolveSiteConfig(
  env: Partial<NodeJS.ProcessEnv>,
  mode: SiteMode,
): SiteConfig {
  const siteUrl = optionalValue(env.NEXT_PUBLIC_SITE_URL);
  const contactUrl = optionalValue(env.NEXT_PUBLIC_CONTACT_URL);

  if (mode === "production" && (!siteUrl || !contactUrl)) {
    throw new Error(PRODUCTION_CONFIG_ERROR);
  }

  return {
    canonicalUrl: siteUrl ? parseCanonicalUrl(siteUrl) : null,
    contact: contactUrl
      ? { kind: "ready", href: parseContactUrl(contactUrl) }
      : { kind: "pending" },
  };
}
