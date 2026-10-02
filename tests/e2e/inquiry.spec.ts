import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

import { INQUIRY_MOCK, SITE_CONTENT } from "./support";

const copy = SITE_CONTENT.pages.contact.form;
const topic = copy.topics.find((entry) => entry.value === "business_software")!;

type Received = Record<string, string | undefined>;

// The mock keeps every payload across runs, so each test uses a unique email.
function uniqueEmail(prefix: string) {
  return `${prefix}@e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.test`;
}

function inquiryFor(email: string) {
  return {
    name: "Rana Haddad",
    business_name: "Haddad Dental Clinic",
    email,
    website: "https://haddad-dental.example",
    message: "We take bookings by phone and want patients to request appointments online.",
    budget: "Around 2,000 USD",
    timing: "Before the new clinic opens in spring",
  };
}

async function received(request: APIRequestContext): Promise<Received[]> {
  const response = await request.get(`${INQUIRY_MOCK}/__inquiries`);
  expect(response.ok()).toBe(true);
  return response.json();
}

async function fillInquiry(page: Page, values: ReturnType<typeof inquiryFor>) {
  const form = page.getByRole("form", { name: "Project inquiry" });
  await form.getByLabel(copy.name).fill(values.name);
  await form.getByLabel(copy.businessName).fill(values.business_name);
  await form.getByLabel(copy.email).fill(values.email);
  await form.getByLabel(copy.website).fill(values.website);
  await form.getByRole("group", { name: copy.topic }).getByRole("radio", { name: topic.label }).check();
  await form.getByLabel(copy.message).fill(values.message);
  await form.getByLabel(copy.budget).fill(values.budget);
  await form.getByLabel(copy.timing).fill(values.timing);
  return form;
}

test("a complete inquiry reaches the Outreach endpoint and confirms receipt", async ({ page, request }) => {
  const values = inquiryFor(uniqueEmail("e2e"));
  await page.goto("/contact");
  const form = await fillInquiry(page, values);
  await form.getByRole("button", { name: copy.submit }).click();

  const status = page.getByRole("status");
  await expect(status).toHaveText(copy.success);
  // Focus moves to the outcome so keyboard and screen-reader users hear it.
  await expect(status).toBeFocused();
  await expect(form).toBeHidden();

  const payload = (await received(request)).find((entry) => entry.email === values.email);
  expect(payload).toEqual({ ...values, topic: topic.value, profile: "outreach", apikey: "e2e-anon-key" });
});

test("only the required fields and a topic are needed", async ({ page, request }) => {
  const email = uniqueEmail("e2e-minimal");
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Project inquiry" });
  await form.getByLabel(copy.name).fill("Omar");
  await form.getByLabel(copy.businessName).fill("Omar's Bakery");
  await form.getByLabel(copy.email).fill(email);
  await form.getByRole("radio", { name: copy.topics[3].label }).check();
  await form.getByLabel(copy.message).fill("Not sure where to start.");
  await form.getByRole("button", { name: copy.submit }).click();
  await expect(page.getByRole("status")).toHaveText(copy.success);

  const payload = (await received(request)).find((entry) => entry.email === email);
  expect(payload).toMatchObject({ topic: copy.topics[3].value, website: "", budget: "", timing: "", profile: "outreach" });
});

test("a refused inquiry shows the error and keeps everything the visitor typed", async ({ page, request }) => {
  const values = inquiryFor(uniqueEmail("fail"));
  expect(values.email.startsWith("fail@")).toBe(true);
  await page.goto("/contact");
  const form = await fillInquiry(page, values);
  await form.getByRole("button", { name: copy.submit }).click();

  // Scoped: Next's route announcer is also an (empty) alert region.
  const alert = page.locator('[data-spread="inquiry"]').getByRole("alert");
  await expect(alert).toHaveText(copy.error);
  await expect(alert).toBeFocused();
  await expect(page.getByRole("status")).toHaveCount(0);

  await expect(form.getByLabel(copy.name)).toHaveValue(values.name);
  await expect(form.getByLabel(copy.businessName)).toHaveValue(values.business_name);
  await expect(form.getByLabel(copy.email)).toHaveValue(values.email);
  await expect(form.getByLabel(copy.website)).toHaveValue(values.website);
  await expect(form.getByRole("radio", { name: topic.label })).toBeChecked();
  await expect(form.getByLabel(copy.message)).toHaveValue(values.message);
  await expect(form.getByLabel(copy.budget)).toHaveValue(values.budget);
  await expect(form.getByLabel(copy.timing)).toHaveValue(values.timing);
  await expect(form.getByRole("button", { name: copy.submit })).toBeEnabled();

  expect((await received(request)).some((entry) => entry.email === values.email)).toBe(false);
});

test("the browser requires every mandatory field before sending", async ({ page }) => {
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Project inquiry" });
  for (const label of [copy.name, copy.businessName, copy.email, copy.message]) {
    await expect(form.getByLabel(label)).toHaveAttribute("required", "");
  }
  for (const label of [copy.website, copy.budget, copy.timing]) {
    await expect(form.getByLabel(label)).not.toHaveAttribute("required", "");
  }
  await form.getByRole("button", { name: copy.submit }).click();
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(form).toBeVisible();
});

test("server validation marks missing fields when browser validation is bypassed", async ({ page, request }) => {
  const before = (await received(request)).length;
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Project inquiry" });
  await form.evaluate((element: HTMLFormElement) => (element.noValidate = true));
  await form.getByLabel(copy.name).fill("Lina");
  await form.getByLabel(copy.email).fill("not-an-email");
  await form.getByRole("button", { name: copy.submit }).click();

  const business = form.getByLabel(copy.businessName);
  await expect(business).toHaveAttribute("aria-invalid", "true");
  await expect(business).toHaveAccessibleDescription(/\S/);
  await expect(form.getByLabel(copy.message)).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByLabel(copy.email)).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByLabel(copy.email)).toHaveValue("not-an-email");
  await expect(form.getByLabel(copy.name)).toHaveValue("Lina");
  await expect(form.getByLabel(copy.name)).not.toHaveAttribute("aria-invalid", "true");
  await expect(form.getByRole("group", { name: copy.topic })).toHaveAccessibleDescription(/\S/);
  expect((await received(request)).length).toBe(before);
});

test("the inquiry form submits without JavaScript", async ({ browser, baseURL, request }) => {
  // Without JavaScript, Playwright waits on smooth scrolling (html is
  // scroll-smooth) before acting; the reduced-motion preference turns it off.
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  try {
    const values = inquiryFor(uniqueEmail("e2e-nojs"));
    await page.goto("/contact");
    const form = await fillInquiry(page, values);
    await form.getByRole("button", { name: copy.submit }).click();
    await expect(page.getByRole("status")).toHaveText(copy.success);

    const payload = (await received(request)).find((entry) => entry.email === values.email);
    expect(payload).toEqual({ ...values, topic: topic.value, profile: "outreach", apikey: "e2e-anon-key" });
  } finally {
    await context.close();
  }
});

test("a refused inquiry without JavaScript still shows the error and keeps the values", async ({ browser, baseURL }) => {
  // Without JavaScript, Playwright waits on smooth scrolling (html is
  // scroll-smooth) before acting; the reduced-motion preference turns it off.
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  try {
    const values = inquiryFor(uniqueEmail("fail"));
    await page.goto("/contact");
    const form = await fillInquiry(page, values);
    await form.getByRole("button", { name: copy.submit }).click();
    await expect(page.locator('[data-spread="inquiry"]').getByRole("alert")).toHaveText(copy.error);
    await expect(form.getByLabel(copy.name)).toHaveValue(values.name);
    await expect(form.getByLabel(copy.message)).toHaveValue(values.message);
    await expect(form.getByRole("radio", { name: topic.label })).toBeChecked();
  } finally {
    await context.close();
  }
});
