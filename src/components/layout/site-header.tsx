import Link from "next/link";

import { ActionLink } from "@/components/actions/action-link";
import { AnimatedHeaderLogo } from "@/components/brand/animated-header-logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AccentSwitcher } from "@/components/theme/accent-switcher";
import { SITE_CONTENT } from "@/content/site";
import type { ContentAction, NavigationItem } from "@/content/types";
import { cx, frame, label } from "@/lib/ui";

type SiteHeaderProps = {
  navigation: readonly NavigationItem[];
  action?: ContentAction;
};

export const navigationLink = cx(
  label,
  "inline-flex min-h-11 min-w-11 items-center tracking-wider text-ink-soft no-underline transition-colors duration-160 ease-out hover:text-ink focus-visible:text-ink motion-reduce:transition-none",
);

export function SiteHeader({
  navigation,
  action = SITE_CONTENT.headerAction,
}: SiteHeaderProps) {
  return (
    <header className="bg-paper">
      <a
        className="fixed start-4 top-4 z-100 -translate-y-24 rounded-action bg-accent px-4 py-3 font-semibold text-accent-ink no-underline transition-transform duration-160 ease-out focus-visible:translate-y-0 motion-reduce:transition-none"
        href="#main-content"
      >
        Skip to content
      </a>
      <div
        className={cx(
          frame,
          "flex min-h-19 items-center gap-3 lg:gap-6 max-nav:flex-wrap max-nav:gap-y-0 max-sm:min-h-18",
        )}
      >
        <Link
          aria-label="Prizic home"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-ink px-3 max-nav:px-2.5 max-xs:px-1.5"
          href="/"
        >
          <AnimatedHeaderLogo />
        </Link>

        <nav
          aria-label="Primary"
          className="ms-auto flex items-center gap-3 lg:gap-6 max-nav:hidden"
        >
          {navigation.map((item) => (
            <Link className={navigationLink} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <AccentSwitcher className="shrink-0 max-nav:ms-auto" />

        <ActionLink className="max-nav:hidden" href={action.href} variant="capsule">
          {action.label}
        </ActionLink>

        <MobileMenu action={action} navigation={navigation} />
      </div>
    </header>
  );
}
