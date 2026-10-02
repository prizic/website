/** Joins class names, skipping empty values. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** The shared 88rem frame with 1.5rem gutters, 1rem below 40rem. */
export const frame =
  "mx-auto w-[calc(100%-3rem)] max-w-frame max-sm:w-[calc(100%-2rem)]";

/** Uppercase mono metadata: navigation, folios, compact controls. */
export const label =
  "font-mono text-label font-semibold uppercase tracking-label";

export const sectionHeading =
  "m-0 font-display text-headline font-medium text-balance";

export const spreadPadding = "scroll-mt-4 py-10 lg:py-14";
