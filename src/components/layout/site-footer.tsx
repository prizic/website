import Link from "next/link";

import { ContactAction } from "@/components/actions/contact-action";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { FolioLabel } from "@/components/editorial/folio-label";
import type { ContactState, NavigationItem } from "@/content/types";

type SiteFooterProps = {
  navigation: readonly NavigationItem[];
  contact: ContactState;
};

export function SiteFooter({ navigation, contact }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-frame">
        <div className="site-footer__folio">
          <div className="site-footer__topline">
            <FolioLabel index="P/Z" section="Prizic" />
            <span>Close</span>
          </div>

          <div className="site-footer__inner">
            <div className="site-footer__identity">
              <PrizicLogo decorative surface="dark" variant="mark" />
              <p>From possibility to working systems.</p>
            </div>

            <nav aria-label="Footer" className="site-footer__navigation">
              {navigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact">Contact</Link>
            </nav>

            <div className="site-footer__closing">
              <ContactAction contact={contact} label="Start a conversation" />
              <p>© 2026 Prizic</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
