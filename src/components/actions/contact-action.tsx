import type { ContactState } from "@/content/types";

type ContactActionProps = {
  contact: ContactState;
  label?: string;
  className?: string;
};

export function ContactAction({
  contact,
  label = "Email Prizic",
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
      <svg
        aria-hidden="true"
        className="contact-action__arrow"
        viewBox="0 0 16 16"
      >
        <path d="M3 13 13 3M6 3h7v7" />
      </svg>
    </a>
  );
}
