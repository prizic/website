import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, sectionHeading, spreadPadding } from "@/lib/ui";

/** Native disclosure, so every answer opens without JavaScript. */
export function FaqSpread() {
  const { faq } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-labelledby="faq-title" className={cx(frame, spreadPadding)} data-spread="faq" reveal="lines">
      <div className="grid grid-cols-12 gap-4 lg:gap-8 max-lg:grid-cols-1">
        <h2 className={cx(sectionHeading, "col-span-5 max-w-[10ch] self-start")} id="faq-title">{faq.headline}</h2>
        <div className="col-span-7">
          {faq.items.map((item) => (
            <details className="group border-t border-line last:border-b" data-motion-item="" key={item.question}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg aria-hidden="true" className="size-5 shrink-0 transition-transform duration-240 ease-editorial group-open:rotate-45 motion-reduce:transition-none" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path d="M12 4v16M4 12h16" />
                </svg>
              </summary>
              <p className="m-0 max-w-[58ch] pb-6 text-[0.9375rem] leading-[1.6] text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
