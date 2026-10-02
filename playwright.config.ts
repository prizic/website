import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3100";

// Test-only destinations; the inquiry endpoint is tests/e2e/inquiry-mock.mjs.
const E2E_ENV = [
  "NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3100",
  "NEXT_PUBLIC_CONTACT_URL=mailto:preview@prizic.test",
  "OUTREACH_SUPABASE_URL=http://127.0.0.1:3101",
  "OUTREACH_SUPABASE_ANON_KEY=e2e-anon-key",
].join(" ");

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: "line",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "node tests/e2e/inquiry-mock.mjs",
      reuseExistingServer: !process.env.CI,
      url: "http://127.0.0.1:3101",
    },
    {
      command: `${E2E_ENV} pnpm build --webpack && ${E2E_ENV} pnpm exec next start -H 127.0.0.1 -p 3100`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      url: baseURL,
    },
  ],
});
