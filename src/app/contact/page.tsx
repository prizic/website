import type { Metadata } from "next";

import { ContactAction } from "@/components/actions/contact-action";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a direct conversation with Prizic about a product, operating problem or industry.",
  path: "/contact",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function ContactPage() {
  const page = SITE_CONTENT.pages.contact;
  const { contact } = resolveSiteConfig(process.env, process.env.NODE_ENV);

  return (
    <article className="editorial-page contact-page">
      <PageIntro introduction={page.introduction} title={page.title} />
      <section aria-label={page.title} className="contact-page__field">
        <div className="site-frame contact-page__grid">
          <p>{page.body}</p>
          <div className="contact-page__action">
            <ContactAction contact={contact} label={page.actionLabel} />
            {contact.kind === "pending" ? (
              <p>{page.pendingExplanation}</p>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
