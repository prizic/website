import type { ContentAction, SiteContent } from "@/content/types";
import { assertPublicContent } from "@/lib/public-content";

const DISCUSS_A_PROJECT: ContentAction = {
  label: "Discuss a project",
  href: "/contact",
  kind: "primary",
};

export const SITE_CONTENT = {
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  headerAction: DISCUSS_A_PROJECT,
  home: {
    metadata: {
      title: "Prizic | Web Design, Business Software & Automation",
      description:
        "Websites, custom business software, and automation for local businesses. Prizic connects customer experiences with the workflows behind them.",
    },
    hero: {
      eyebrow: "Web design, business software & automation",
      headline:
        "Help customers take the next step. Give your team a clearer way to work.",
      supportingText:
        "Prizic designs websites and builds software for local businesses. We connect the experience your customers see with the work your team handles—from the first inquiry to bookings, requests, and everyday operations.",
      actions: [
        DISCUSS_A_PROJECT,
        { label: "Explore our services", href: "/services", kind: "secondary" },
      ],
    },
    introduction: {
      headline: "Your website is where the conversation starts.",
      paragraphs: [
        "What happens afterward matters too. An inquiry needs a response. A booking needs to reach the right person. Your team needs to know what has been agreed and what happens next.",
        "We help improve those connections: a website that explains your business, a clear route for customers to contact you, and tools that help your team manage the work.",
      ],
    },
    services: {
      headline: "Three ways we can help.",
      items: [
        {
          slug: "websites",
          index: "01",
          name: "Websites & digital presence",
          headline: "Make your business easier to understand and choose.",
          description:
            "Give customers a clear picture of what you offer and a straightforward way to act. We design and develop websites around your services, your identity, and the questions people ask before contacting you.",
          deliverables: [
            "Business websites",
            "Website redesigns",
            "Service landing pages",
            "Booking and inquiry flows",
            "Online stores",
          ],
          link: { label: "Website services", href: "/services/websites" },
        },
        {
          slug: "business-software",
          index: "02",
          name: "Business software",
          headline: "Keep the information and the work together.",
          description:
            "When requests, records, and updates are scattered across tools, it becomes difficult to see what needs attention. We build dashboards, portals, and business applications around the people who use them and the decisions they need to make.",
          deliverables: [
            "Internal dashboards",
            "Customer portals",
            "Reservation systems",
            "Request tracking",
            "Custom applications",
          ],
          link: {
            label: "Business software services",
            href: "/services/business-software",
          },
        },
        {
          slug: "automation",
          index: "03",
          name: "Automation & integrations",
          headline: "Let routine steps follow a defined process.",
          description:
            "Connect the tools you use so an inquiry can create a record, a booking can notify your team, or a scheduled update can go out at the right time. We define the workflow, test the connections, and make responsibilities clear when a step needs human attention.",
          deliverables: [
            "Form and CRM connections",
            "Booking integrations",
            "Notifications",
            "Reminders",
            "Scheduled workflows",
          ],
          link: { label: "Automation services", href: "/services/automation" },
        },
      ],
    },
    situations: {
      headline: "Start with the part of your business that needs attention.",
      items: [
        {
          title: "Our website no longer represents us.",
          description:
            "Update your content, design, and customer journey so people can understand your business as it is today.",
          href: "/services/websites",
        },
        {
          title: "We need a better way to handle inquiries and bookings.",
          description:
            "Give customers a clearer route to contact you and your team a defined way to receive, track, and act on requests.",
          href: "/services/business-software",
        },
        {
          title: "We have outgrown our spreadsheets.",
          description:
            "Bring a specific workflow into a shared system with the records, permissions, and views the team needs.",
          href: "/services/business-software",
        },
        {
          title: "We keep entering the same information twice.",
          description:
            "Explore integrations and automation that reduce repeated steps between compatible tools.",
          href: "/services/automation",
        },
      ],
    },
    connected: {
      headline: "Designed together. Built to work together.",
      paragraphs: [
        "We consider the customer-facing experience and the business workflow in the same project. That means checking what happens after someone submits a form, requests a booking, or signs into a portal—not stopping at the screen they see.",
        "Your existing website, brand, and tools are part of the starting point. We identify what to keep, what to improve, and where new work is justified.",
      ],
    },
    delivery: {
      headline: "Know what is being built—and what happens next.",
      stages: [
        {
          title: "Understand",
          description:
            "We discuss the business problem, the people involved, and the tools you use today. If requirements need investigation, we define a discovery phase to establish the scope.",
        },
        {
          title: "Define",
          description:
            "We turn the requirements into a proposal with deliverables, responsibilities, payment milestones, and an estimated schedule. Review time and the inputs we need from your team are included in the plan.",
        },
        {
          title: "Design & build",
          description:
            "We work through agreed milestones, share progress, and review key flows with you. You approve important decisions along the way. Additional requests are assessed for their effect on cost and delivery.",
        },
        {
          title: "Launch & support",
          description:
            "We test the agreed workflows and prepare the handover. You know how to use the system, who owns the relevant accounts, and how any ongoing support will work.",
        },
      ],
      link: { label: "Our approach", href: "/approach" },
    },
    ongoing: {
      headline: "Keep improving after launch.",
      body: "As your business changes, your website and systems need to keep up. Maintenance and ongoing development can be arranged around the work you need, with defined coverage and a clear request process.",
      items: ["Technical maintenance", "Fixes and updates", "Planned improvements"],
      link: { label: "Discuss ongoing support", href: "/contact" },
    },
    about: {
      headline: "Meet the team behind the work.",
      paragraphs: [
        "Prizic is a software and digital product studio founded by Seifelesllam Seif. We bring hands-on development experience to business websites, operational software, and automation.",
        "Our role is to help you understand the options and deliver the agreed solution—from the first conversation through design, development, and handover.",
      ],
      link: { label: "About Prizic", href: "/about" },
    },
    faq: {
      headline: "Before we get started.",
      items: [
        {
          question: "Can you work with our existing website or software?",
          answer:
            "Yes. We review what you have and establish what can be improved, connected, or reused. The recommendation depends on the system and the work required.",
        },
        {
          question: "Do we need a new brand or logo?",
          answer:
            "No. We can design around your existing identity. If the project needs additional visual direction, we agree on that scope before starting it.",
        },
        {
          question: "What if we do not know exactly what to build?",
          answer:
            "Start with the problem you want to solve. The first conversation helps establish whether we are a fit. More detailed research, requirements work, or prototyping can be scoped as paid discovery.",
        },
        {
          question: "How do you price a project?",
          answer:
            "We prepare a proposal based on the agreed work. It identifies deliverables, costs, payment milestones, and any recurring third-party services the solution requires.",
        },
        {
          question: "How is the timeline decided?",
          answer:
            "We estimate the schedule against scope and team availability, including design, development, testing, and review. We also identify dependencies such as content, account access, and client approvals.",
        },
        {
          question: "What happens after launch?",
          answer:
            "Handover and any ongoing support are defined in the agreement. Maintenance has its own coverage and request process; larger additions are planned as separate work.",
        },
      ],
    },
    closing: {
      headline: "What is the next improvement your business needs?",
      examples: [
        "A clearer website.",
        "A better booking flow.",
        "A system your team can share.",
      ],
      body: "Tell us what you want to change, and we will discuss where to start.",
      primaryAction: DISCUSS_A_PROJECT,
      emailLabel: "Email Prizic",
    },
  },
  footer: {
    tagline: "Web design, business software, and automation for local businesses.",
    copyright: "© 2026 Prizic",
  },
  pages: {
    services: {
      metadata: {
        title: "Services | Prizic",
        description:
          "Websites, business software, and automation for local businesses, scoped around the work your customers and team actually do.",
      },
      title: "Services",
      introduction: "Three ways we can help.",
    },
    service: {
      websites: {
        slug: "websites",
        metadata: {
          title: "Business Website Design & Development | Prizic",
          description:
            "Websites that explain your business and help people decide what to do next, from content structure and design to development and launch.",
        },
        title: "Give customers a clear reason—and an easy way—to contact you.",
        introduction:
          "Your website needs to explain your business and help people decide what to do next. We bring content structure, interface design, and development into one process, shaped around the services you sell and the customers you serve.",
        lead: {
          title: "Built around the customer's next step.",
          description:
            "We work through what visitors need to know, what should earn their confidence, and how they can inquire, book, or order. The result is scoped around the actual journey, including where their request goes afterward.",
        },
        capabilitiesHeadline: "Website capabilities",
        capabilities: [
          "Business websites and redesigns.",
          "Service and campaign landing pages.",
          "Forms and inquiry journeys.",
          "Booking-tool integrations.",
          "Online stores and ordering experiences.",
          "Content-management tools.",
          "Visual direction and reusable interface components.",
        ],
        sections: [
          {
            title: "Start from what you already have.",
            description:
              "An existing logo, website, or booking tool may already serve part of the job. We assess it before recommending a replacement. If additional brand work or new functionality is needed, it becomes an explicit part of the proposal.",
          },
          {
            title: "From design to launch.",
            description:
              "The plan sets out pages, content responsibilities, key interactions, integrations, and review milestones. Development includes testing of the agreed experience before launch, with handover and support arrangements defined in advance.",
          },
        ],
        action: { label: "Discuss your website", href: "/contact", kind: "primary" },
      },
      "business-software": {
        slug: "business-software",
        metadata: {
          title: "Custom Business Software & Internal Tools | Prizic",
          description:
            "Dashboards, portals, and business applications built around a defined workflow, with clear roles and a manageable first scope.",
        },
        title: "Put your team's workflow into a system they can use.",
        introduction:
          "Custom business software starts with the work: the records people maintain, the requests they handle, and the decisions they make. We translate a defined workflow into an application with clear roles and a manageable first scope.",
        lead: {
          title: "A shared view of what needs attention.",
          description:
            "A dashboard can bring relevant information together. A portal can give customers a place to manage requests. A reservation system can help staff coordinate availability and bookings. We choose the functionality according to the job it needs to do.",
        },
        capabilitiesHeadline: "Business software capabilities",
        capabilities: [
          "Internal dashboards and operational tools.",
          "Customer and staff portals.",
          "Booking and reservation workflows.",
          "Customer and service-request records.",
          "Approval and status tracking.",
          "Role-based access.",
          "Integrations with existing applications.",
        ],
        sections: [
          {
            title: "Define the first useful version.",
            description:
              "We identify the users, the essential workflows, and the information required. Larger requirements are broken into stages so the first release has a clear purpose and later improvements have a place in the plan.",
          },
          {
            title: "Plan for day-to-day use.",
            description:
              "The scope covers how information enters the system, who can see or change it, and what happens when work moves between people. Data preparation, testing, training, and ongoing responsibilities are agreed as part of delivery.",
          },
        ],
        action: {
          label: "Discuss your business system",
          href: "/contact",
          kind: "primary",
        },
      },
      automation: {
        slug: "automation",
        metadata: {
          title: "Workflow Automation & Integrations | Prizic",
          description:
            "Connect the tools behind your everyday work: defined triggers, tested connections, and clear responsibility when a step needs a person.",
        },
        title: "Connect the tools behind your everyday work.",
        introduction:
          "Automation is useful when the process is clear. We identify the event that starts a workflow, the information it needs, and the action that should follow. Then we check whether the relevant tools can support the connection.",
        lead: {
          title: "From an event to the next action.",
          description:
            "A form submission can create a customer record. A booking can trigger a notification. A scheduled workflow can send an update. These are illustrative possibilities; the actual solution depends on your tools, access, and requirements.",
        },
        capabilitiesHeadline: "Automation capabilities",
        capabilities: [
          "Form-to-CRM workflows.",
          "Calendar and booking connections.",
          "Notifications and reminders.",
          "Scheduled communication workflows.",
          "Data transfer between compatible applications.",
          "Custom integrations using supported interfaces.",
        ],
        sections: [
          {
            title: "Make exceptions part of the plan.",
            description:
              "We consider missing information, failed actions, and steps that require approval. The workflow should make it clear when someone needs to intervene and who is responsible for doing so.",
          },
          {
            title: "Understand the ongoing requirements.",
            description:
              "The proposal identifies account access, platform limits, third-party charges, and maintenance responsibilities. We test the agreed workflow before putting it into use.",
          },
        ],
        action: { label: "Discuss an automation", href: "/contact", kind: "primary" },
      },
    },
    approach: {
      metadata: {
        title: "Our Approach | Prizic",
        description:
          "How Prizic plans and delivers a project: discovery, scope and scheduling, design and development, testing and handover, and ongoing support.",
      },
      title: "A clear plan for the work ahead.",
      introduction:
        "A project needs shared decisions as well as design and development. Our approach establishes what is being delivered, how you will review it, and what each side needs to provide.",
      stages: [
        {
          title: "Discovery",
          description:
            "We begin with your goal and current workflow. We establish the people involved, constraints, and open questions. Where uncertainty affects the proposed solution, a scoped discovery phase can produce a clearer brief and delivery plan.",
        },
        {
          title: "Scope and scheduling",
          description:
            "The proposal defines the deliverables, exclusions, responsibilities, and payment milestones. The schedule accounts for team availability, dependencies, and review time. Assumptions that affect the date are made explicit.",
        },
        {
          title: "Design and development",
          description:
            "Key journeys and interfaces are reviewed before the related build progresses. We share updates against agreed milestones and keep decisions recorded. Changes to the approved scope are discussed before additional work begins.",
        },
        {
          title: "Testing and handover",
          description:
            "We test the agreed functionality and prepare the launch. Handover establishes the relevant account ownership, access, operating guidance, and outstanding responsibilities.",
        },
        {
          title: "Maintenance and improvements",
          description:
            "Ongoing support is defined separately, including coverage and response expectations. New features or larger improvements are assessed and scheduled against the available capacity.",
        },
      ],
      action: DISCUSS_A_PROJECT,
    },
    about: {
      metadata: {
        title: "About Prizic | Software & Digital Product Studio",
        description:
          "Prizic is a software and digital product studio founded by Seifelesllam Seif, helping local businesses with websites, custom applications, and integrations.",
      },
      title: "Design and development with a business purpose.",
      paragraphs: [
        "Prizic is a software and digital product studio founded by Seifelesllam Seif. Built on hands-on freelance development experience, the studio helps local businesses improve how they present themselves online and how they manage work behind the scenes.",
        "Our capabilities span websites, custom applications, and integrations. We bring them together where a project needs a connected solution, and focus on a smaller change when that addresses the problem.",
      ],
      principles: [
        {
          title: "Understand the situation.",
          description:
            "The business goal, current process, and people using the system shape the recommendation.",
        },
        {
          title: "Make decisions clear.",
          description:
            "Scope, responsibilities, and review points are agreed so everyone understands the work ahead.",
        },
        {
          title: "Consider what comes after launch.",
          description:
            "Use, handover, maintenance, and future changes are part of planning the solution.",
        },
      ],
      action: { label: "Talk to Prizic", href: "/contact", kind: "primary" },
    },
    contact: {
      metadata: {
        title: "Discuss a Project | Prizic",
        description:
          "Tell Prizic what you do, what you want to improve, and what you use today. A business problem is enough to start.",
      },
      title: "Let's talk about your business.",
      introduction:
        "Tell us what you do, what you want to improve, and what you use today. We will review your inquiry and discuss whether Prizic is a fit for the work.",
      reassurance:
        "You can start with a business problem. A technical brief is welcome, but not required.",
      form: {
        name: "Your name",
        businessName: "Business name",
        email: "Email address",
        website: "Website or business profile",
        topic: "What would you like help with?",
        topics: [
          { value: "website", label: "Website or digital presence" },
          { value: "business_software", label: "Business software" },
          { value: "automation", label: "Automation or integration" },
          { value: "define_project", label: "Help defining the project" },
        ],
        message: "What do you want to change?",
        messagePlaceholder:
          "Tell us about the current situation and what you would like to improve.",
        budget: "Budget range",
        budgetPlaceholder: "A rough range helps us suggest an appropriate scope.",
        timing: "Timing",
        timingPlaceholder: "Include any important dates or deadlines.",
        optional: "optional",
        submit: "Send inquiry",
        submitting: "Sending…",
        supportingText: "We will use these details to respond to your inquiry.",
        success: "Thank you. Your inquiry has been received.",
        error:
          "Your inquiry could not be sent. Please try again or contact us by email.",
      },
      bookingLabel: "Book an introductory call",
      emailLabel: "Email Prizic",
    },
    notFound: {
      title: "That path does not exist.",
      body: "The page you were looking for is not part of this site.",
      action: { label: "Return home", href: "/", kind: "secondary" },
    },
  },
} satisfies SiteContent;

assertPublicContent(JSON.stringify(SITE_CONTENT));
