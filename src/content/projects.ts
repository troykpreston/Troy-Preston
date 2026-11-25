/**
 * Project content — source: _docs/detailsmd (case-study blueprint).
 *
 * Rules: never invent client results, metrics, features or statuses.
 * Unknown values stay `null` and are hidden (or rendered as "To be written").
 * `VERIFY:` comments carry the blueprint's open questions — resolve them
 * against the real codebase before upgrading a diagram's basis or adding claims.
 *
 * Media comes from /_assets/<assetDir>. Run `npm run assets` after adding files.
 */

export type Block =
  | { type: "text"; body: string }
  | { type: "list"; items: string[] }
  /** A numbered sequence — pipelines, user flows, request lifecycles. */
  | { type: "flow"; steps: { label: string; detail?: string }[] }
  /** Key / value table — stacks, thresholds, endpoints. */
  | { type: "specs"; rows: [string, string][] }
  | { type: "quote"; body: string; cite?: string };

export type Section = {
  title: "Overview" | "Challenge" | "Architecture" | "Implementation" | "Outcome";
  blocks: Block[] | null; // null => placeholder
};

export type Project = {
  slug: string;
  name: string;
  /** Background tone of the mat the screenshots sit on. */
  tone: string;
  /** Category line above the title, e.g. "Enterprise Financial Reporting". */
  category: string;
  /** One-line description, shown in lists and under the title. */
  tagline: string;
  /** Optional engagement note shown under the tagline, e.g. an NDA credit. */
  credit?: string;
  disciplines: string[];
  role: string | null;
  system: string | null;
  focus: string | null;
  platform: string | null;
  year: string | null;
  stack: string[] | null;
  status: string | null;
  links?: { label: string; href: string }[];
  /** Folder name inside /_assets. Omit if there are no visuals yet. */
  assetDir?: string;
  /** Exact filename (as in /_assets) used as the cover — cards, previews and case hero. */
  cover?: string;
  /** Focal point when the cover is cropped, e.g. "left center". */
  coverPosition?: string;
  /** Optional looping video (filename in /_assets) shown in the case-study hero. */
  video?: string;
  /** Curated screens in order, with captions. Overrides the automatic gallery. */
  screens?: { file: string; caption: string }[];
  /** Filenames hidden from cover + gallery (in addition to the default marketing-image filter). */
  exclude?: string[];
  /** Homepage "Selected work" position (1 = first). Omit to leave off the homepage. */
  featured?: number;
  sections: Section[];
};

const text = (body: string): Block => ({ type: "text", body });

export const projects: Project[] = [
  {
    slug: "id-verify",
    name: "ID Verify",
    tone: "#262238",
    category: "Biometric Identity",
    tagline: "Document analysis, face matching and presentation-attack detection, with an Android SDK.",
    credit: "Built as senior AI engineer for a confidential client (NDA).",
    disciplines: ["AI", "Identity", "Mobile"],
    role: null,
    system: "Verification pipeline",
    focus: "Computer vision",
    platform: "Web · Android SDK",
    year: null,
    stack: null,
    status: null,
    assetDir: "ID-Verify",
    cover: "00-Cover Image.png",
    featured: 1,
    // Use synthetic identity data and consented demonstration images only.
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "ID Verify is a biometric identity verification platform combining document analysis, facial recognition, presentation attack detection, and mobile SDK integration. It is designed to support identity verification workflows across applications and connected systems.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Identity verification must balance accuracy, security, usability, and processing performance. Document images can vary in quality, facial captures may be affected by lighting and pose, and presentation attacks introduce additional risk. These challenges become more demanding when verification must also operate through mobile SDKs.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The verification pipeline separates document capture, image quality assessment, document analysis, face processing, presentation attack detection, and identity matching. An Android SDK provides an integration surface for mobile applications, while backend services coordinate verification sessions and results.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "Worked on document and facial image processing, OCR and MRZ extraction, face matching, liveness and presentation attack detection, and SDK integration. The platform design also addresses image quality controls, verification status management, and secure handling of sensitive identity information.",
          ),
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text(
            "Developed an integrated identity verification workflow spanning document and biometric processing with mobile integration capabilities.",
          ),
          // VERIFY: distinguish implemented modules from those in development; add accuracy/latency only when independently validated.
        ],
      },
    ],
  },
  {
    slug: "aether",
    name: "Aether",
    tone: "#1d2230",
    category: "AI Automation",
    tagline: "A visual workspace for designing, running and managing AI automation workflows.",
    disciplines: ["AI", "Enterprise"],
    role: null,
    system: "Agent orchestration",
    focus: "Visual workflow design",
    platform: "Web",
    year: null,
    stack: null, // VERIFY: document backend technologies and persistence from the implementation.
    status: null,
    assetDir: "Aether",
    cover: "00.png",
    video: "00-cover.mp4",
    featured: 2,
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "Aether is a visual AI automation platform designed to make intelligent workflows easier to build, organize, and manage. It brings together workflow design, AI-assisted processing, and automation orchestration in a unified workspace.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "AI-powered workflows can become difficult to maintain as the number of steps, integrations, and decision points increases. The challenge is to provide a clear visual environment while keeping workflow definitions structured, execution behavior predictable, and failures understandable.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The platform is organized around a visual workflow editor, structured workflow definitions, an orchestration layer, and integrations with AI models and external services. Execution state, step dependencies, and operational feedback are central architectural concerns.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "Designed the agent-building experience around connected workflow steps, configuration controls, and reusable automation patterns. The interface emphasizes clarity when navigating complex workflows and managing AI-powered operations.",
          ),
          // VERIFY: document the implemented execution engine, model integrations and monitoring separately from planned features.
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text("Created a cohesive product experience for designing and managing AI automation workflows."),
          // VERIFY: add a working end-to-end workflow and its execution results.
        ],
      },
    ],
  },
  {
    slug: "bd-clarity",
    name: "BD Clarity",
    tone: "#ddd6ca",
    category: "Research Intelligence",
    tagline: "Automated research intelligence — ingestion, normalization and target matching across external sources.",
    disciplines: ["Data", "AI"],
    role: null,
    system: "Data pipeline",
    focus: "Data Automation",
    platform: "Web · Azure",
    year: null,
    stack: ["Azure Functions", "Azure Blob Storage", "Azure SQL", "Power Automate", "SharePoint"],
    status: null,
    links: [], // VERIFY: add the live application URL.
    assetDir: "BD-Clarity",
    cover: "image.png",
    coverPosition: "left center",
    screens: [
      { file: "image copy.png", caption: "Overview — morning snapshot" },
      { file: "image copy 2.png", caption: "Briefing" },
      { file: "image copy 5.png", caption: "Targets — matching book and aliases" },
      { file: "image copy 3.png", caption: "Runs" },
      { file: "image copy 4.png", caption: "Content library" },
      { file: "image copy 6.png", caption: "Connectors" },
      { file: "image copy 7.png", caption: "Processing" },
      { file: "image copy 8.png", caption: "Exceptions" },
    ],
    featured: 3,
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "BD Clarity is an automated research intelligence platform that collects, processes, and organizes information from multiple external sources. It converts unstructured research material into searchable content, matches relevant information against defined targets, and presents the results through a centralized web application.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Monitoring multiple information sources manually is time-consuming and difficult to scale. Source formats vary, content can be duplicated, and relevant information may use different names or terminology. The system needed a dependable pipeline for ingestion, normalization, matching, and operational monitoring.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "Azure Functions orchestrate the ingestion and processing pipeline. Raw content is retained in Azure Blob Storage, while structured records and processing states are managed in Azure SQL. Scheduled automation triggers collection jobs, and a web dashboard provides visibility into runs, content, targets, and results.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "Built the discovery, parsing, normalization, and target-matching pipeline with duplicate protection and processing checkpoints.",
          ),
          {
            type: "list",
            items: [
              "Target aliases and multilingual matching considerations",
              "Relevance processing and searchable content views",
              "Run monitoring with processing checkpoints",
              "Scheduled processing and SharePoint integration workflows",
            ],
          },
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text(
            "Established a centralized research-processing workflow that reduces reliance on manual collection and organizes source material into structured, traceable records. Run monitoring and checkpoint management provide visibility into processing status and support recovery from interrupted operations.",
          ),
        ],
      },
    ],
  },
  {
    slug: "fund-clarity",
    name: "Fund Clarity",
    tone: "#d6dbd2",
    category: "Enterprise Financial Reporting",
    tagline: "Enterprise financial reporting, built around data integrity and precise calculation logic.",
    disciplines: ["Enterprise", "Data"],
    role: "Full-Stack",
    system: "Enterprise",
    focus: "Financial Data",
    platform: "Web",
    year: null,
    stack: ["React", "TypeScript", "Python", "Azure Functions", "Azure SQL"],
    status: null, // VERIFY: state production deployment status once confirmed.
    links: [], // VERIFY: add the live application URL.
    assetDir: "Fund-Clarity",
    cover: "image.png",
    coverPosition: "left center",
    screens: [
      { file: "image copy.png", caption: "Overview — AUM by product and submission status" },
      { file: "image copy 3.png", caption: "Compare — this quarter against last" },
      { file: "image copy 2.png", caption: "Products" },
      { file: "image copy 4.png", caption: "Reporting periods" },
    ],
    featured: 4,
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "Fund Clarity is an enterprise financial reporting platform designed to centralize investment fund information, financial calculations, and reporting workflows. It replaces fragmented data entry and spreadsheet-dependent processes with a structured application for managing products, investors, loans, and reporting periods.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Financial reporting requires consistency across multiple data sources, currencies, reporting periods, and user roles. Changes to investor positions, debt, or fund valuations must be reflected accurately without compromising historical information. The core challenge was translating complex financial rules into a reliable, maintainable application.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The platform uses a React and TypeScript frontend connected to Python-based APIs running through Azure services, with Azure SQL providing structured data storage. Backend services manage financial calculations, reporting workflows, data validation, and permissions. Administrative controls govern reporting periods and access.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "The calculation layer supports NAV and INREV AUM reporting, investor roll-forwards, and loan changes between reporting periods. Automated tests validate key calculation scenarios.",
          ),
          {
            type: "list",
            items: [
              "Product and investor management",
              "Debt calculations and loan changes between reporting periods",
              "Financial reporting workflows with multi-currency handling",
              "CSV imports with validation",
              "Search, pagination and administrative controls",
            ],
          },
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text(
            "Delivered an integrated reporting application with centralized financial data, repeatable calculations, and structured administrative workflows. Key calculation scenarios passed automated verification, and core investor, loan, and reporting operations were tested.",
          ),
        ],
      },
    ],
  },
  {
    slug: "telebook",
    name: "TeleBook",
    tone: "#d9d6cc",
    category: "Scheduling & Visitor Management",
    tagline: "Appointments, guest passes, team coordination and access control across web and mobile.",
    disciplines: ["Web", "Mobile", "Identity"],
    role: null,
    system: "Web & mobile",
    focus: "Digital passes · Access control",
    platform: "Web · Mobile",
    year: null,
    stack: null, // VERIFY: implementation stack and device integrations.
    status: null,
    assetDir: "TeleBook",
    cover: "TeleBook Enterprise Access Suite.png",
    featured: 6,
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "TeleBook is a scheduling and visitor management platform designed to connect appointments, guest passes, team coordination, and access-control operations across web and mobile interfaces.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Appointment and visitor workflows often involve disconnected tools for scheduling, identity information, authorization, and entry management. The challenge is to provide a unified experience where visitors, staff, and administrators can access accurate information without introducing unnecessary operational complexity.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The system is structured around a central application backend serving web and mobile clients. Scheduling, guest management, digital credentials, user permissions, and access events are organized as distinct functional domains.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "The product includes booking management, visitor records, QR-based guest passes, team management, and administrative analytics.",
          ),
          // VERIFY: which workflows are functional, how permissions are enforced, how events sync between interfaces.
        ],
      },
      {
        title: "Outcome",
        blocks: [text("A unified product experience for coordinating scheduling and visitor access through a consistent interface.")],
      },
    ],
  },
  {
    slug: "tavola",
    name: "Tavola",
    tone: "#2b241b",
    category: "Restaurant Operations",
    tagline: "An integrated restaurant suite — POS, reservations, menus, inventory, staff and analytics.",
    disciplines: ["Web", "Mobile", "Commerce"],
    role: null,
    system: "Operations suite",
    focus: "POS · Inventory · Reservations",
    platform: null,
    year: null,
    stack: null, // VERIFY: implemented backend stack and integration boundaries.
    status: null,
    assetDir: "Tavola",
    cover: "00.png",
    coverPosition: "left center",
    featured: 5,
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "Tavola is an integrated restaurant management suite designed to bring operational workflows into a single application. It covers point-of-sale operations, reservations, menu management, inventory, staff coordination, and business analytics.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Restaurant operations involve tightly connected processes. Orders affect kitchen preparation, inventory, payments, and reporting. Managing these functions independently creates duplicated work and inconsistent information. The challenge is to provide an efficient operational interface while maintaining reliable business data.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The system architecture separates the management dashboard, POS interface, backend business services, and persistent operational data. Functional domains include orders, menus, reservations, inventory, staff permissions, and reporting.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "The application covers restaurant dashboards, order management, table and reservation workflows, menu configuration, inventory tracking, and analytics.",
          ),
          // VERIFY: distinguish working functionality from planned POS hardware, payment, printer or offline capabilities.
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text("A cohesive restaurant operations product with a unified interface for managing core business activities."),
          // VERIFY: demonstrate a working order lifecycle — creation, kitchen, payment, inventory.
        ],
      },
    ],
  },
  {
    slug: "evalis",
    name: "Evalis",
    tone: "#d3dbe8",
    category: "Examination Management",
    tagline: "The full assessment lifecycle — from question authoring and scheduling to grading and reporting.",
    disciplines: ["Web", "Enterprise"],
    role: null,
    system: "Enterprise platform",
    focus: "Assessment workflows",
    platform: "Web",
    year: null,
    stack: null, // VERIFY: deployment and persistence architecture from the codebase.
    status: null,
    assetDir: "Evalis",
    cover: "00.png",
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "Evalis is an enterprise examination management platform designed to support the full assessment lifecycle, from question creation and examination scheduling to candidate management, monitoring, grading, and reporting.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Managing examinations at scale requires coordination between question banks, candidate records, examination schedules, access permissions, and assessment results. The challenge is maintaining consistent examination data while giving administrators and participants clear, role-appropriate workflows.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The platform is organized around administrative, examiner, and candidate experiences supported by shared application services. Major functional domains include question management, examination scheduling, examination sessions, monitoring, grading, and analytics.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "The product includes exam authoring, question-bank management, scheduling, candidate administration, live monitoring, and results analytics.",
          ),
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text("An integrated examination management experience that organizes the assessment lifecycle within one platform."),
          // VERIFY: describe working exam creation, participation, grading and reporting — not demo statistics.
        ],
      },
    ],
  },
  {
    slug: "aura",
    name: "AURA",
    tone: "#cddcdd",
    category: "Travel Commerce",
    tagline: "Premium travel booking — from destination discovery to reservation and administration.",
    disciplines: ["Web", "Commerce"],
    role: null,
    system: "Commerce platform",
    focus: "Booking workflows",
    platform: "Web",
    year: null,
    stack: null, // VERIFY: implementation and external booking providers.
    status: null,
    assetDir: "AURA",
    cover: "00.png",
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "AURA is a premium travel booking platform designed around destination discovery, travel packages, accommodation, reservations, and customer account management. It combines a consumer-facing booking experience with administrative tools for managing travel content and operations.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Travel booking requires a balance between inspiring destination discovery and precise transactional workflows. Customers need clear information, transparent pricing, and a simple path to reservation. Administrators need structured tools for managing inventory, packages, bookings, and customer requests.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The platform design separates the public travel website, booking and checkout workflows, customer accounts, and administrative management. Backend services are responsible for travel content, booking records, pricing rules, and supported payment integrations.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "The project scope includes destination discovery, package and accommodation pages, search filters, booking and enquiry flows, account management, checkout, and an administrative dashboard. The interface emphasizes a consistent premium visual experience across discovery and transaction screens.",
          ),
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text("A cohesive travel-commerce experience designed to connect discovery, reservation, and administration."),
          // VERIFY: completed booking/checkout scenarios, payment test results, working admin functions.
        ],
      },
    ],
  },
  {
    slug: "forme",
    name: "FORME",
    tone: "#e2d5c6",
    category: "Premium E-Commerce",
    tagline: "A premium leather-goods storefront with product discovery, checkout and store administration.",
    disciplines: ["Web", "Commerce"],
    role: null,
    system: "Commerce platform",
    focus: "Product discovery · Checkout",
    platform: "Web",
    year: null,
    stack: null, // VERIFY: technology stack and commerce provider.
    status: null,
    assetDir: "FORME",
    cover: "00.png",
    sections: [
      {
        title: "Overview",
        blocks: [
          text(
            "FORME is a premium e-commerce experience for leather goods, combining refined visual merchandising with product browsing, shopping, checkout, and store administration. The project emphasizes the relationship between brand presentation, usability, and commerce functionality.",
          ),
        ],
      },
      {
        title: "Challenge",
        blocks: [
          text(
            "Premium retail websites must communicate product quality without sacrificing shopping efficiency. Rich imagery, product variations, navigation, and checkout need to work together while maintaining fast performance and a consistent experience across devices.",
          ),
        ],
      },
      {
        title: "Architecture",
        blocks: [
          text(
            "The platform is organized around a customer-facing storefront, product catalog, shopping cart, checkout, and administrative management. Commerce services manage product information, inventory, orders, and supported payment integrations.",
          ),
        ],
      },
      {
        title: "Implementation",
        blocks: [
          text(
            "The design includes luxury storefront presentation, product discovery, product detail pages, shopping flows, and an administrative dashboard. Emphasis is placed on responsive design, consistent product imagery, clear navigation, and a polished customer journey.",
          ),
        ],
      },
      {
        title: "Outcome",
        blocks: [
          text("A refined commerce product experience combining customer-facing design with operational management interfaces."),
          // VERIFY: actual checkout, order management and responsive behaviour.
        ],
      },
    ],
  },

  /* ── Additional work (not in the blueprint) ────────────────────────── */
  {
    slug: "alpha-forge",
    name: "Alpha Forge",
    tone: "#1c2521",
    category: "Trading Intelligence",
    tagline: "Trading strategy, risk and market-sentiment workspace.", // VERIFY: confirm wording
    disciplines: ["AI", "Data"],
    role: null,
    system: null,
    focus: null,
    platform: null,
    year: null,
    stack: null,
    status: null,
    assetDir: "Alpha Forge",
    cover: "01-dashboard.png",
    sections: [
      { title: "Overview", blocks: null },
      { title: "Challenge", blocks: null },
      { title: "Architecture", blocks: null },
      { title: "Implementation", blocks: null },
      { title: "Outcome", blocks: null },
    ],
  },
];
