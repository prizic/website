import type { Metadata } from "next";

import { ActionLink } from "@/components/actions/action-link";
import { ContactAction } from "@/components/actions/contact-action";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { resolveInquiryEndpoint } from "@/lib/inquiry-endpoint";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";
import { cx, frame } from "@/lib/ui";

const page = SITE_CONTENT.pages.contact;

export const metadata: Metadata = createPageMetadata({
  ...page.metadata,
  path: "/contact",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function ContactPage() {
  const { contact, bookingUrl } = resolveSiteConfig(process.env, process.env.NODE_ENV);
  // This page prerenders at build time, so a production build without an
  // inquiry destination fails here instead of shipping a form that cannot send.
  resolveInquiryEndpoint(process.env, process.env.NODE_ENV);

  return (
    <article data-page="contact">
      <PageIntro index="04" introduction={page.introduction} section="Contact" title={page.title}>
        <p className="m-0 max-w-[52ch] text-[0.9375rem] leading-[1.6]">{page.reassurance}</p>
        <div className="flex flex-wrap gap-3">
          {bookingUrl ? (
            <ActionLink href={bookingUrl} variant="secondary">
              {page.bookingLabel}
            </ActionLink>
          ) : null}
          <ContactAction contact={contact} label={page.emailLabel} />
        </div>
      </PageIntro>

      <section aria-label="Inquiry form" className={cx(frame, "pb-12")} data-spread="inquiry">
        <InquiryForm copy={page.form} />
      </section>
    </article>
  );
}
