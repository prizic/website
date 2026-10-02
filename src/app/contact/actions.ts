"use server";

import type { InquiryField, InquiryValues } from "@/lib/inquiry";
import { parseInquiry } from "@/lib/inquiry";
import { resolveInquiryEndpoint, submitInquiry } from "@/lib/inquiry-endpoint";

export type InquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "failed"; values: InquiryValues }
  | {
      status: "invalid";
      fieldErrors: Partial<Record<InquiryField, string>>;
      values: InquiryValues;
    };

export async function sendInquiry(
  _previous: InquiryState,
  form: FormData,
): Promise<InquiryState> {
  const parsed = parseInquiry(form);

  // A bot gets the same answer as a person, so it learns nothing to retry.
  if (parsed.kind === "spam") return { status: "sent" };
  if (parsed.kind === "invalid") {
    return { status: "invalid", fieldErrors: parsed.fieldErrors, values: parsed.values };
  }

  const endpoint = resolveInquiryEndpoint(process.env, process.env.NODE_ENV);
  const result = endpoint ? await submitInquiry(endpoint, parsed.inquiry) : "failed";

  return result === "sent"
    ? { status: "sent" }
    : { status: "failed", values: parsed.inquiry };
}
