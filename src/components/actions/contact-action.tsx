import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import type { ContactState } from "@/content/types";

type ContactActionProps = {
  contact: ContactState;
  label?: string;
  className?: string;
};

export function ContactAction({
  contact,
  label = "Contact Prizic",
  className,
}: ContactActionProps) {
  const classes = ["contact-action", className].filter(Boolean).join(" ");

  if (contact.kind === "pending") {
    return (
      <span className={`${classes} contact-action--pending`}>
        Contact destination pending
      </span>
    );
  }

  return (
    <a className={classes} href={contact.href}>
      <span>{label}</span>
      <EditorialArrow />
    </a>
  );
}
