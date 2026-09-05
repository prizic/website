import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE_CONTENT } from "@/content/site";
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
  "THESIS: Prizic makes its method the proof and refuses the generic agency portfolio. OWN-WORLD: near-black architectural field, off-white type, sparse cyan routes, measured P/Z geometry. STORY: understand the company, inspect how it thinks, then start a conversation. FIRST VIEWPORT: copy at left, four-state blueprint at right, contact action in the header. FORM: approved Blueprint plus living wordmark, seed 89484ca6. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const siteConfig = resolveSiteConfig(process.env, process.env.NODE_ENV);

  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      >
        <template data-impeccable-contract="89484ca6" hidden>
          {DIRECTION_CONTRACT}
        </template>
        <SiteHeader
          contact={siteConfig.contact}
          navigation={SITE_CONTENT.navigation}
        />
        <main id="main-content">{children}</main>
        <SiteFooter
          contact={siteConfig.contact}
          navigation={SITE_CONTENT.navigation}
        />
      </body>
    </html>
  );
}
