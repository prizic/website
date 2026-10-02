import type { Inquiry } from "@/lib/inquiry";

type SiteMode = "development" | "test" | "production";

export interface InquiryEndpoint {
  rpcUrl: string;
  anonKey: string;
}

const PRODUCTION_CONFIG_ERROR =
  "Production requires OUTREACH_SUPABASE_URL and OUTREACH_SUPABASE_ANON_KEY";

/**
 * Inquiries go to the Outreach CRM through its public `submit_inquiry` RPC.
 * Only the anon key is used: the RPC is the one thing that role may call, so
 * the site never holds a credential that can read the CRM back.
 */
export function resolveInquiryEndpoint(
  env: Partial<NodeJS.ProcessEnv>,
  mode: SiteMode,
): InquiryEndpoint | null {
  const url = env.OUTREACH_SUPABASE_URL?.trim();
  const anonKey = env.OUTREACH_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    if (mode === "production") throw new Error(PRODUCTION_CONFIG_ERROR);
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid OUTREACH_SUPABASE_URL: expected an absolute URL");
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Invalid OUTREACH_SUPABASE_URL: expected an http or https URL");
  }

  return {
    rpcUrl: new URL("/rest/v1/rpc/submit_inquiry", parsed.origin).toString(),
    anonKey,
  };
}

export async function submitInquiry(
  endpoint: InquiryEndpoint,
  inquiry: Inquiry,
): Promise<"sent" | "failed"> {
  try {
    const response = await fetch(endpoint.rpcUrl, {
      method: "POST",
      headers: {
        apikey: endpoint.anonKey,
        Authorization: `Bearer ${endpoint.anonKey}`,
        "Content-Type": "application/json",
        // The CRM lives in the `outreach` schema, not PostgREST's default.
        "Content-Profile": "outreach",
      },
      body: JSON.stringify({ p: inquiry }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
