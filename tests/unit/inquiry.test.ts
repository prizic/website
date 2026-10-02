import { describe, expect, it } from "vitest";

import { HONEYPOT_FIELD, parseInquiry } from "@/lib/inquiry";
import { resolveInquiryEndpoint } from "@/lib/inquiry-endpoint";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
}

const valid = {
  name: " Lina Haddad ",
  business_name: "Haddad Kitchens",
  email: "lina@haddad.example",
  topic: "automation",
  message: "We copy every booking into a spreadsheet.",
};

describe("parseInquiry", () => {
  it("trims a valid inquiry and fills absent optional fields", () => {
    expect(parseInquiry(form(valid))).toEqual({
      kind: "valid",
      inquiry: {
        name: "Lina Haddad",
        business_name: "Haddad Kitchens",
        email: "lina@haddad.example",
        website: "",
        topic: "automation",
        message: "We copy every booking into a spreadsheet.",
        budget: "",
        timing: "",
      },
    });
  });

  it("names every missing required field and an unknown topic", () => {
    const parsed = parseInquiry(form({ topic: "logo" }));

    expect(parsed.kind).toBe("invalid");
    if (parsed.kind !== "invalid") return;
    expect(Object.keys(parsed.fieldErrors).sort()).toEqual(
      ["business_name", "email", "message", "name", "topic"],
    );
  });

  it("rejects a malformed email and text over the stored limit", () => {
    const parsed = parseInquiry(form({ ...valid, email: "lina@", budget: "x".repeat(201) }));

    expect(parsed.kind).toBe("invalid");
    if (parsed.kind !== "invalid") return;
    expect(parsed.fieldErrors).toMatchObject({
      email: expect.stringMatching(/email address/),
      budget: expect.stringMatching(/200 characters/),
    });
    expect(parsed.values.message).toBe(valid.message);
  });

  it("flags a filled honeypot as spam before validating", () => {
    expect(parseInquiry(form({ [HONEYPOT_FIELD]: "Bot" }))).toEqual({ kind: "spam" });
  });
});

describe("resolveInquiryEndpoint", () => {
  it("is absent outside production until configured", () => {
    expect(resolveInquiryEndpoint({}, "development")).toBeNull();
  });

  it("fails a production build that cannot deliver inquiries", () => {
    expect(() => resolveInquiryEndpoint({}, "production")).toThrow(
      "Production requires OUTREACH_SUPABASE_URL and OUTREACH_SUPABASE_ANON_KEY",
    );
  });

  it("targets the submit_inquiry RPC on the project origin", () => {
    expect(
      resolveInquiryEndpoint(
        { OUTREACH_SUPABASE_URL: "https://abc.supabase.co/", OUTREACH_SUPABASE_ANON_KEY: "anon" },
        "production",
      ),
    ).toEqual({ rpcUrl: "https://abc.supabase.co/rest/v1/rpc/submit_inquiry", anonKey: "anon" });
  });

  it("rejects a URL that is not http or https", () => {
    expect(() =>
      resolveInquiryEndpoint(
        { OUTREACH_SUPABASE_URL: "ftp://abc.supabase.co", OUTREACH_SUPABASE_ANON_KEY: "anon" },
        "test",
      ),
    ).toThrow(/invalid OUTREACH_SUPABASE_URL/i);
  });
});
