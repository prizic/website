import { ActionLink } from "@/components/actions/action-link";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { FolioLabel } from "@/components/editorial/folio-label";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame } from "@/lib/ui";

export default function NotFound() {
  const page = SITE_CONTENT.pages.notFound;

  return (
    <section aria-labelledby="not-found-title" className={cx(frame, "py-16")} data-page="not-found">
      <div className="grid min-h-[30rem] content-between gap-8 rounded-spread bg-ink p-8 text-paper-bright lg:p-12 max-md:rounded-panel max-md:p-6" data-spread="missing-path">
        <FolioLabel index="404" section="Route not found" surface="dark" />
        <PrizicLogo className="size-16" decorative variant="mark" />
        <div className="grid gap-6">
          <h1 className="m-0 max-w-[14ch] font-display text-headline font-medium" id="not-found-title">{page.title}</h1>
          <p className="m-0 max-w-[42ch] text-panel">{page.body}</p>
          <div>
            <ActionLink href={page.action.href} surface="dark" variant="secondary">
              {page.action.label}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
