export type ContactState =
  | { kind: "pending" }
  | { kind: "ready"; href: string };

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ContentAction extends NavigationItem {
  kind: "primary" | "secondary";
}

export interface EditorialItem {
  title: string;
  description: string;
}

export interface PageMetadataCopy {
  title: string;
  description: string;
}

export type ServiceSlug = "websites" | "business-software" | "automation";

export interface ServiceSummary {
  slug: ServiceSlug;
  index: string;
  name: string;
  headline: string;
  description: string;
  deliverables: string[];
  link: NavigationItem;
}

export interface ServicePageContent {
  slug: ServiceSlug;
  metadata: PageMetadataCopy;
  title: string;
  introduction: string;
  lead: EditorialItem;
  capabilitiesHeadline: string;
  capabilities: string[];
  sections: EditorialItem[];
  action: ContentAction;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type InquiryTopic =
  | "website"
  | "business_software"
  | "automation"
  | "define_project";

export interface SiteContent {
  navigation: NavigationItem[];
  headerAction: ContentAction;
  home: {
    metadata: PageMetadataCopy;
    hero: {
      eyebrow: string;
      headline: string;
      supportingText: string;
      actions: [ContentAction, ContentAction];
    };
    introduction: {
      headline: string;
      paragraphs: string[];
    };
    services: {
      headline: string;
      items: ServiceSummary[];
    };
    situations: {
      headline: string;
      items: Array<EditorialItem & { href: string }>;
    };
    connected: {
      headline: string;
      paragraphs: string[];
    };
    delivery: {
      headline: string;
      stages: EditorialItem[];
      link: NavigationItem;
    };
    ongoing: {
      headline: string;
      body: string;
      items: string[];
      link: NavigationItem;
    };
    about: {
      headline: string;
      paragraphs: string[];
      link: NavigationItem;
    };
    faq: {
      headline: string;
      items: FaqItem[];
    };
    closing: {
      headline: string;
      examples: string[];
      body: string;
      primaryAction: ContentAction;
      emailLabel: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  pages: {
    services: {
      metadata: PageMetadataCopy;
      title: string;
      introduction: string;
    };
    service: Record<ServiceSlug, ServicePageContent>;
    approach: {
      metadata: PageMetadataCopy;
      title: string;
      introduction: string;
      stages: EditorialItem[];
      action: ContentAction;
    };
    about: {
      metadata: PageMetadataCopy;
      title: string;
      paragraphs: string[];
      principles: EditorialItem[];
      action: ContentAction;
    };
    contact: {
      metadata: PageMetadataCopy;
      title: string;
      introduction: string;
      reassurance: string;
      form: {
        name: string;
        businessName: string;
        email: string;
        website: string;
        topic: string;
        topics: Array<{ value: InquiryTopic; label: string }>;
        message: string;
        messagePlaceholder: string;
        budget: string;
        budgetPlaceholder: string;
        timing: string;
        timingPlaceholder: string;
        optional: string;
        submit: string;
        submitting: string;
        supportingText: string;
        success: string;
        error: string;
      };
      bookingLabel: string;
      emailLabel: string;
    };
    notFound: {
      title: string;
      body: string;
      action: ContentAction;
    };
  };
}
