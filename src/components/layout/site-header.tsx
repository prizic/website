import Link from "next/link";

import { ContactAction } from "@/components/actions/contact-action";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AccentSwitcher } from "@/components/theme/accent-switcher";
import type { ContactState, NavigationItem } from "@/content/types";

type SiteHeaderProps = {
  navigation: readonly NavigationItem[];
  contact?: ContactState;
};

export function SiteHeader({
  navigation,
  contact = { kind: "pending" },
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-frame site-header__inner">
        <Link aria-label="Prizic home" className="site-header__brand" href="/">
          <PrizicLogo
            className="site-header__logo site-header__logo--desktop"
            decorative
            preload
          />
          <PrizicLogo
            className="site-header__logo site-header__logo--mobile"
            decorative
            surface="light"
            variant="mark"
          />
        </Link>

        <nav aria-label="Primary" className="site-header__navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <AccentSwitcher className="site-header__accent" />

        <ContactAction
          className="site-header__contact"
          contact={contact}
          label="Start a conversation"
        />

        <MobileMenu contact={contact} navigation={navigation} />
      </div>
    </header>
  );
}
