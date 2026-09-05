const PROHIBITED_PUBLIC_CONTENT =
  /\b(?:dental|dentists?|clinics?|bookings?|pricing|testimonials?)\b/i;

export function assertPublicContent(text: string): void {
  if (PROHIBITED_PUBLIC_CONTENT.test(text)) {
    throw new Error("Prohibited public content detected.");
  }
}
