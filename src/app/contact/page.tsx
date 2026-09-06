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
    <article className="editorial-page contact-page" data-page="contact">
      <PageIntro
        index="05"
        introduction={page.introduction}
        title={page.title}
      />
      <section
        aria-label={page.title}
        className="contact-page__field"
        data-spread="contact-field"
      >
        <div className="site-frame contact-page__grid">
          <p>{page.body}</p>
          <div className="contact-page__action" data-contact-state={contact.kind}>
            <ContactAction contact={contact} label={page.actionLabel} />
            {contact.kind === "pending" ? (
              <p>{page.pendingExplanation}</p>
            ) : null}
          </div>
          <ol aria-label="What to include" className="contact-prompts">
            <li><span>01</span><strong>The idea</strong></li>
            <li><span>02</span><strong>The current situation</strong></li>
            <li><span>03</span><strong>The desired change</strong></li>
          </ol>
        </div>
      </section>
    </article>
  );
}
