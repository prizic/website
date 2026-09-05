import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3100";

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
  webServer: {
    command:
      "NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3100 NEXT_PUBLIC_CONTACT_URL=mailto:preview@prizic.test pnpm build --webpack && NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3100 NEXT_PUBLIC_CONTACT_URL=mailto:preview@prizic.test pnpm exec next start -H 127.0.0.1 -p 3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: baseURL,
  },
});
