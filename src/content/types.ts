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

export interface Principle {
  title: string;
  description: string;
}

export interface ProcessStage {
  title: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  href: string;
}

export interface NameAssociation {
  title: string;
  description: string;
}

export interface SiteContent {
  navigation: NavigationItem[];
  hero: {
    headline: string;
    supportingText: string;
    actions: ContentAction[];
  };
  principles: {
    headline: string;
    items: Principle[];
  };
  process: {
    headline: string;
    stages: ProcessStage[];
  };
  capabilities: {
    headline: string;
    items: Capability[];
  };
  founder: {
    headline: string;
    body: string;
  };
  closing: {
    headline: string;
    body: string;
    actions: ContentAction[];
  };
  name: {
    pronunciation: string;
    associations: NameAssociation[];
  };
}
