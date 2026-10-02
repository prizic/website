import { cx } from "@/lib/ui";

/** A dotless "i" whose dot is a separate eye that the identity can blink. */
export function IdentityI({ eyeClassName, eyeProps }: {
  eyeClassName?: string;
  eyeProps?: Record<`data-${string}`, string>;
}) {
  return (
    <span className="relative inline-block">
      <span className="inline-block [clip-path:inset(27%_-10%_-10%)]">i</span>
      <span
        className={cx(
          "absolute start-1/2 top-[0.13em] size-[0.095em] -translate-x-1/2 rounded-full bg-current",
          eyeClassName,
        )}
        {...eyeProps}
      />
    </span>
  );
}
