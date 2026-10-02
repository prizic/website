import { ActionLink } from "@/components/actions/action-link";
import { ContactAction } from "@/components/actions/contact-action";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import type { ContactState } from "@/content/types";
import { cx, frame } from "@/lib/ui";

type ClosingSectionProps = {
  contact: ContactState;
};

export function ClosingSection({ contact }: ClosingSectionProps) {
  const { closing } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-labelledby="closing-title" className={cx(frame, "pt-10 pb-6")} data-spread="closing">
      <div className="grid grid-cols-12 gap-4 rounded-spread bg-ink p-8 text-paper-bright sm:p-12 lg:gap-8 lg:p-16 max-lg:grid-cols-6 max-md:grid-cols-1 max-md:gap-7 max-md:px-6 max-md:py-7">
        <h2 className="col-span-9 m-0 max-w-[17ch] font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.05em] text-balance max-lg:col-span-5 max-md:col-span-1" data-motion-item="" id="closing-title">
          {closing.headline}
        </h2>
        <PrizicLogo className="col-start-12 h-auto w-full self-end max-lg:col-start-6 max-md:col-start-auto max-md:w-14" decorative variant="mark" />
        <div className="col-span-full mt-8 grid grid-cols-[5fr_6fr] items-end gap-12 max-lg:grid-cols-1 max-lg:gap-8 max-md:mt-0">
          <div className="grid gap-5">
            <ul className="m-0 grid list-none gap-1 p-0 font-display text-[clamp(1.25rem,2vw,1.6rem)] tracking-[-0.03em]">
              {closing.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            <p className="m-0 max-w-[43ch] text-[0.9375rem] leading-[1.55] text-panel">{closing.body}</p>
          </div>
          <div className="flex flex-wrap justify-end gap-3 max-lg:justify-start max-md:*:flex-[1_1_13rem]">
            <ActionLink href={closing.primaryAction.href} surface="dark" variant="primary">
              {closing.primaryAction.label}
            </ActionLink>
            <ContactAction contact={contact} label={closing.emailLabel} surface="dark" variant="secondary" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
