import Link from "next/link";

import { PrizicLogo } from "@/components/brand/prizic-logo";
import { FolioLabel } from "@/components/editorial/folio-label";
import { SITE_CONTENT } from "@/content/site";
import type { NavigationItem } from "@/content/types";
import { cx, frame, label } from "@/lib/ui";

type SiteFooterProps = {
  navigation: readonly NavigationItem[];
};

export function SiteFooter({ navigation }: SiteFooterProps) {
  const { footer } = SITE_CONTENT;

  return (
    <footer className="pt-16 pb-6 max-sm:pt-12">
      <div className={frame}>
        <div className="rounded-spread bg-ink p-6 text-paper-bright sm:p-10 lg:p-12">
          <div
            className={cx(
              label,
              "flex items-center justify-between gap-4 border-b border-paper-bright/22 pb-6 text-paper-bright/72",
            )}
          >
            <FolioLabel index="P/Z" section="Prizic" surface="dark" />
            <span>Close</span>
          </div>

          <div className="grid grid-cols-[minmax(0,1.25fr)_repeat(2,minmax(0,1fr))] items-start gap-12 pt-8 sm:pt-12 lg:pt-16 max-nav:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-8">
            <div className="max-nav:col-span-full max-sm:col-auto">
              <div className="flex items-center gap-3">
                <PrizicLogo className="size-12" decorative surface="dark" variant="mark" />
                <span className="font-display text-3xl font-medium tracking-[-0.04em]">Prizic</span>
              </div>
              <p className="mt-6 mb-0 max-w-96 font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.05] tracking-[-0.04em] text-paper-bright/70">
                {footer.tagline}
              </p>
            </div>

            <nav aria-label="Footer" className="grid justify-items-start gap-1">
              {navigation.map((item) => (
                <Link
                  className={cx(
                    label,
                    "inline-flex min-h-11 min-w-11 items-center tracking-wider text-paper-bright/72 no-underline transition-colors duration-160 ease-out hover:text-paper-bright focus-visible:text-paper-bright motion-reduce:transition-none",
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="m-0 font-mono text-xs text-paper-bright/62 lg:self-end lg:justify-self-end">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
