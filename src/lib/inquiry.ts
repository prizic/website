import type { InquiryTopic } from "@/content/types";

/** Field limits mirror the check constraints on outreach.inquiries. */
export const INQUIRY_LIMITS = {
  name: 200,
  business_name: 200,
  email: 320,
  website: 500,
  message: 5000,
  budget: 200,
  timing: 200,
} as const;

export const INQUIRY_TOPICS = [
  "website",
  "business_software",
  "automation",
  "define_project",
] as const satisfies readonly InquiryTopic[];

/** A field real people never see; anything typed into it is a bot. */
export const HONEYPOT_FIELD = "nickname";

export type InquiryField = keyof typeof INQUIRY_LIMITS | "topic";

export interface Inquiry {
  name: string;
  business_name: string;
  email: string;
  website: string;
  topic: InquiryTopic;
  message: string;
  budget: string;
  timing: string;
}

export type InquiryValues = Partial<Record<InquiryField, string>>;

export type ParsedInquiry =
  | { kind: "valid"; inquiry: Inquiry }
  | { kind: "invalid"; fieldErrors: Partial<Record<InquiryField, string>>; values: InquiryValues }
  | { kind: "spam" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = ["name", "business_name", "email", "message"] as const;

function isTopic(value: string): value is InquiryTopic {
  return (INQUIRY_TOPICS as readonly string[]).includes(value);
}

export function parseInquiry(form: FormData): ParsedInquiry {
  const honeypot = form.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim()) return { kind: "spam" };

  const read = (field: InquiryField) => {
    const value = form.get(field);
    return typeof value === "string" ? value.trim() : "";
  };

  const values: InquiryValues = {
    name: read("name"),
    business_name: read("business_name"),
    email: read("email"),
    website: read("website"),
    topic: read("topic"),
    message: read("message"),
    budget: read("budget"),
    timing: read("timing"),
  };
  const fieldErrors: Partial<Record<InquiryField, string>> = {};

  for (const field of REQUIRED) {
    if (!values[field]) fieldErrors[field] = "This field is required.";
  }

  for (const [field, limit] of Object.entries(INQUIRY_LIMITS) as Array<
    [keyof typeof INQUIRY_LIMITS, number]
  >) {
    if ((values[field]?.length ?? 0) > limit) {
      fieldErrors[field] = `Keep this under ${limit} characters.`;
    }
  }

  if (values.email && !fieldErrors.email && !EMAIL.test(values.email)) {
    fieldErrors.email = "Enter an email address, like name@business.com.";
  }

  const topic = values.topic ?? "";
  if (!isTopic(topic)) fieldErrors.topic = "Choose what you would like help with.";

  if (Object.keys(fieldErrors).length > 0 || !isTopic(topic)) {
    return { kind: "invalid", fieldErrors, values };
  }

  return {
    kind: "valid",
    inquiry: {
      name: values.name ?? "",
      business_name: values.business_name ?? "",
      email: values.email ?? "",
      website: values.website ?? "",
      topic,
      message: values.message ?? "",
      budget: values.budget ?? "",
      timing: values.timing ?? "",
    },
  };
}
