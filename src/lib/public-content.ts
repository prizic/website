// Claims and material the site must not publish until real, approved evidence
// exists: a niche it has not committed to, customer proof, or promises.
const PROHIBITED_PUBLIC_CONTENT =
  /\b(?:dental|dentists?|clinics?|testimonials?|case stud(?:y|ies)|award[- ]winning|awards?|guarantee(?:d|s)?)\b/i;

export function assertPublicContent(text: string): void {
  if (PROHIBITED_PUBLIC_CONTENT.test(text)) {
    throw new Error("Prohibited public content detected.");
  }
}
