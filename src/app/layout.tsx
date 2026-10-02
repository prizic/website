import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE_CONTENT } from "@/content/site";
import { ACCENT_BOOTSTRAP_SCRIPT } from "@/lib/accent-theme";
import {
  createOrganizationJsonLd,
  createPageMetadata,
} from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const DIRECTION_CONTRACT =
  "THESIS: Prizic connects the website a local business's customers see with the workflow its team runs, shown through an Editorial Systems Deck. OWN-WORLD: warm paper, near-black rounded panels, large editorial type, compact folios, and one scarce dynamic cyan, lime, or yellow accent. STORY: understand what Prizic does, find the situation that matches, see how delivery works, then discuss a project. FIRST VIEWPORT: compact animated full identity, the customer-and-team statement, authored monochrome material imagery, settled living wordmark, and attached action modules. FORM: unequal twelve-column spreads, deliberate mobile chapters, original P/Z assets and crops, varied finite motion, and complete reduced-motion and no-JavaScript states, including the inquiry form. FINISH: reviewed desktop and mobile captures, synchronized DESIGN.md, and provenance for every shipping raster.";

const rootSiteConfig = resolveSiteConfig(process.env, process.env.NODE_ENV);

export const metadata: Metadata = createPageMetadata({
  ...SITE_CONTENT.home.metadata,
  path: "/",
  canonicalUrl: rootSiteConfig.canonicalUrl,
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const siteConfig = rootSiteConfig;
  const organizationJsonLd = createOrganizationJsonLd(siteConfig.canonicalUrl);

  return (
    <html
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} scheme-light scroll-smooth motion-reduce:scroll-auto`}
      data-accent="cyan"
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ACCENT_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="min-h-screen overflow-x-clip bg-paper font-sans leading-[1.6] text-ink caret-accent antialiased selection:bg-accent selection:text-accent-ink **:focus-visible:outline-2 **:focus-visible:outline-offset-4 **:focus-visible:outline-ink **:focus-visible:ring-4 **:focus-visible:ring-paper-bright">
        <template
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
          data-impeccable-contract="89484ca6"
          hidden
        />
        {organizationJsonLd ? (
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
            }}
            type="application/ld+json"
          />
        ) : null}
        <SiteHeader navigation={SITE_CONTENT.navigation} />
        <main id="main-content">{children}</main>
        <SiteFooter navigation={SITE_CONTENT.navigation} />
      </body>
    </html>
  );
}
