import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import ApproachPage from "@/app/approach/page";
import ContactPage from "@/app/contact/page";
import NotFound from "@/app/not-found";
import ServicesPage from "@/app/services/page";
import ServicePage, { generateStaticParams } from "@/app/services/[slug]/page";
import { SITE_CONTENT } from "@/content/site";
import type { ServiceSlug } from "@/content/types";
import { assertPublicContent } from "@/lib/public-content";

const { pages } = SITE_CONTENT;

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

async function renderService(slug: string) {
  return render(await ServicePage({ params: Promise.resolve({ slug }) }));
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>, topic: string, message: string) {
  await user.type(screen.getByLabelText("Your name"), "Lina Haddad");
  await user.type(screen.getByLabelText("Business name"), "Haddad Kitchens");
  await user.type(screen.getByLabelText("Email address"), "lina@haddad.example");
  await user.click(screen.getByRole("radio", { name: topic }));
  await user.type(screen.getByLabelText("What do you want to change?"), message);
}

describe("Services", () => {
  it("introduces all three services on the index under one page heading", () => {
    const { container } = render(<ServicesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Three ways we can help." })).toBeVisible();
    for (const service of SITE_CONTENT.home.services.items) {
      expect(screen.getByRole("link", { name: service.link.label })).toHaveAttribute("href", service.link.href);
    }
    assertPublicContent(container.textContent ?? "");
  });

  it("builds exactly the three service routes", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "websites" },
      { slug: "business-software" },
      { slug: "automation" },
    ]);
  });

  it.each(Object.keys(pages.service) as ServiceSlug[])(
    "renders the %s page from its approved copy",
    async (slug) => {
      const page = pages.service[slug];
      const { container } = await renderService(slug);

      expect(screen.getByRole("heading", { level: 1, name: page.title })).toBeVisible();
      expect(screen.getByText(page.introduction)).toBeVisible();
      expect(screen.getByRole("heading", { level: 2, name: page.lead.title })).toBeVisible();
      const capabilities = screen.getByRole("heading", { name: page.capabilitiesHeadline }).parentElement!;
      expect(
        within(capabilities).getAllByRole("listitem").map((item) => item.textContent?.replace(/^\d{2}/, "")),
      ).toEqual(page.capabilities);
      for (const section of page.sections) {
        expect(screen.getByRole("heading", { level: 2, name: section.title })).toBeVisible();
        expect(screen.getByText(section.description)).toBeVisible();
      }
      expect(screen.getByRole("link", { name: page.action.label })).toHaveAttribute("href", "/contact");
      assertPublicContent(container.textContent ?? "");
    },
  );
});

describe("Approach", () => {
  it("lists the five delivery stages in order and ends with the inquiry", () => {
    render(<ApproachPage />);

    expect(screen.getByRole("heading", { level: 1, name: pages.approach.title })).toBeVisible();
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent),
    ).toEqual(pages.approach.stages.map((stage) => stage.title));
    expect(screen.getByRole("link", { name: "Discuss a project" })).toHaveAttribute("href", "/contact");
  });
});

describe("About", () => {
  it("names the founder and the three working principles", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: pages.about.title })).toBeVisible();
    expect(screen.getByText(/founded by Seifelesllam Seif/)).toBeVisible();
    for (const principle of pages.about.principles) {
      expect(screen.getByRole("heading", { level: 2, name: principle.title })).toBeVisible();
      expect(screen.getByText(principle.description)).toBeVisible();
    }
    expect(screen.getByRole("link", { name: "Talk to Prizic" })).toHaveAttribute("href", "/contact");
  });
});

describe("Contact", () => {
  it("renders the inquiry form with the approved fields and options", () => {
    render(<ContactPage />);
    const form = screen.getByRole("form", { name: "Project inquiry" });

    expect(within(form).getByLabelText("Your name")).toBeRequired();
    expect(within(form).getByLabelText("Business name")).toBeRequired();
    expect(within(form).getByLabelText("Email address")).toHaveAttribute("type", "email");
    expect(within(form).getByLabelText(/Website or business profile/)).not.toBeRequired();
    expect(
      within(within(form).getByRole("group", { name: "What would you like help with?" }))
        .getAllByRole("radio")
        .map((radio) => radio.closest("label")?.textContent),
    ).toEqual(pages.contact.form.topics.map((topic) => topic.label));
    expect(within(form).getByLabelText("What do you want to change?")).toHaveAttribute(
      "placeholder",
      "Tell us about the current situation and what you would like to improve.",
    );
    expect(within(form).getByLabelText(/Budget range/)).not.toBeRequired();
    expect(within(form).getByLabelText(/Timing/)).not.toBeRequired();
    expect(within(form).getByRole("button", { name: "Send inquiry" })).toBeEnabled();
    expect(within(form).getByText(pages.contact.form.supportingText)).toBeVisible();
  });

  it("offers an introductory call only when booking is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_BOOKING_URL", "");
    const { unmount } = render(<ContactPage />);
    expect(screen.queryByRole("link", { name: "Book an introductory call" })).not.toBeInTheDocument();
    unmount();

    vi.stubEnv("NEXT_PUBLIC_BOOKING_URL", "https://cal.example/prizic/intro");
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "Book an introductory call" })).toHaveAttribute(
      "href",
      "https://cal.example/prizic/intro",
    );
  });

  it("shows Email Prizic as pending until the inbox is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_URL", "");
    const { unmount } = render(<ContactPage />);
    expect(screen.getByText("Contact destination pending")).toBeVisible();
    unmount();

    vi.stubEnv("NEXT_PUBLIC_CONTACT_URL", "mailto:preview@prizic.test");
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "Email Prizic" })).toHaveAttribute("href", "mailto:preview@prizic.test");
  });

  it("sends a valid inquiry to Outreach and confirms it", async () => {
    vi.stubEnv("OUTREACH_SUPABASE_URL", "https://crm.example.supabase.co");
    vi.stubEnv("OUTREACH_SUPABASE_ANON_KEY", "anon-key");
    const fetchMock = vi.fn(async () => new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactPage />);

    await fillRequiredFields(user, "Website or digital presence", "Our site is out of date.");
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thank you. Your inquiry has been received.");
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://crm.example.supabase.co/rest/v1/rpc/submit_inquiry");
    expect(init.headers).toMatchObject({ apikey: "anon-key", "Content-Profile": "outreach" });
    expect(JSON.parse(String(init.body))).toEqual({
      p: {
        name: "Lina Haddad",
        business_name: "Haddad Kitchens",
        email: "lina@haddad.example",
        website: "",
        topic: "website",
        message: "Our site is out of date.",
        budget: "",
        timing: "",
      },
    });
  });

  it("keeps what was typed and offers email when sending fails", async () => {
    vi.stubEnv("OUTREACH_SUPABASE_URL", "https://crm.example.supabase.co");
    vi.stubEnv("OUTREACH_SUPABASE_ANON_KEY", "anon-key");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("rate_limited", { status: 400 })));
    const user = userEvent.setup();
    render(<ContactPage />);

    await fillRequiredFields(user, "Business software", "Bookings live in a notebook.");
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(pages.contact.form.error);
    expect(screen.getByLabelText("What do you want to change?")).toHaveValue("Bookings live in a notebook.");
    expect(screen.getByRole("radio", { name: "Business software" })).toBeChecked();
  });
});

describe("NotFound", () => {
  it("offers a branded route back home", () => {
    const { container } = render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "That path does not exist." }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
    expect(container.querySelector('img[src="/brand/prizic-mark-on-dark.svg"]')).toBeInTheDocument();
  });
});
