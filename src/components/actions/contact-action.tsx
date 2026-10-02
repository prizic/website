import { ActionLink, type ActionSurface, type ActionVariant } from "@/components/actions/action-link";
import type { ContactState } from "@/content/types";
import { cx } from "@/lib/ui";

type ContactActionProps = {
  contact: ContactState;
  label?: string;
  variant?: ActionVariant;
  surface?: ActionSurface;
  className?: string;
};

/** The configured direct contact (usually the Prizic inbox), or a truthful pending state. */
export function ContactAction({
  contact,
  label = "Contact Prizic",
  variant = "secondary",
  surface = "light",
  className,
}: ContactActionProps) {
  if (contact.kind === "pending") {
    return (
      <span
        className={cx(
          "inline-flex min-h-11 cursor-not-allowed items-center rounded-action border px-4 py-3 text-sm",
          surface === "dark"
            ? "border-paper-bright/30 text-paper-bright/62"
            : "border-line text-muted",
          className,
        )}
      >
        Contact destination pending
      </span>
    );
  }

  return (
    <ActionLink
      className={className}
      href={contact.href}
      surface={surface}
      variant={variant}
    >
      {label}
    </ActionLink>
  );
}
