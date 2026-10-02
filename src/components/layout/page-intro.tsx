import type { ReactNode } from "react";

import { FolioLabel } from "@/components/editorial/folio-label";
import { cx, frame } from "@/lib/ui";

type PageIntroProps = {
  title: string;
  introduction: string;
  section: string;
  index?: string;
  eyebrow?: string;
  children?: ReactNode;
};

export function PageIntro({
  title,
  introduction,
  section,
  index,
  eyebrow,
  children,
}: PageIntroProps) {
  return (
    <header aria-labelledby="page-title" className={cx(frame, "py-16 lg:py-24")}>
      <FolioLabel detail={eyebrow} index={index} section={section} />
      <div className="mt-8 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-end gap-8 lg:gap-24 max-lg:grid-cols-1">
        <h1 className="m-0 max-w-[16ch] font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance" id="page-title">
          {title}
        </h1>
        <div className="grid gap-5">
          <p className="m-0 max-w-[52ch] text-lede text-muted">{introduction}</p>
          {children}
        </div>
      </div>
    </header>
  );
}
