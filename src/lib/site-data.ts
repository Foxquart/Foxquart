export const EMAIL_ADDRESS = "business@foxquart.com";
export const MAILTO_URL = `mailto:${EMAIL_ADDRESS}`;

export const PHONE_NUMBERS = [
  { raw: "6909519692", formatted: "+91 69095 19692", tel: "tel:+916909519692" },
  { raw: "8731953807", formatted: "+91 87319 53807", tel: "tel:+918731953807" },
];

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  roi: string;
  isFlagship?: boolean;
  tech: string[];
  capabilities: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Workflow Automation",
    tagline: "Replace repetitive human steps with reliable, auditable automation.",
    isFlagship: true,
    problem:
      "Teams re-key data between tools, chase approvals over email, and lose leads because nobody responded within the hour.",
    solution:
      "We map every manual step, then rebuild it as monitored automation: n8n pipelines, AI qualification, approval logic and system-to-system sync with full logging.",
    impact: "Typical client removes 120–400 manual hours per month within the first quarter.",
    roi: "3–7x in year one",
    tech: ["n8n", "OpenAI", "Anthropic", "LangChain", "Postgres", "Redis"],
    capabilities: [
      "n8n workflow engineering",
      "Lead qualification & routing",
      "Invoice and document automation",
      "Email and WhatsApp automation",
      "Multi-step approval systems",
      "AI agents & knowledge assistants",
    ],
    faqs: [
      {
        q: "Do we need to replace our current tools?",
        a: "No. We automate across what you already run — CRM, accounting, spreadsheets, ERP — and only replace a tool when it is the bottleneck.",
      },
      {
        q: "How long before the first automation is live?",
        a: "First production workflow typically ships in 10–15 working days, including logging and failure alerting.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    tagline: "Operational systems built around how your business actually runs.",
    isFlagship: true,
    problem:
      "Off-the-shelf software forces your process into someone else's template, and the gaps get filled with spreadsheets.",
    solution:
      "We engineer ERP, CRM, inventory, POS and industry platforms with your workflow, roles and reporting modelled correctly from day one.",
    impact: "One source of truth across operations, finance and the field team.",
    roi: "Payback in 8–14 months",
    tech: ["TypeScript", "React", "Node.js", "Go", "PostgreSQL", "Docker"],
    capabilities: [
      "ERP & CRM platforms",
      "Inventory and warehouse systems",
      "POS and restaurant operations",
      "Hospital, school and clinic systems",
      "Construction & manufacturing platforms",
      "Internal tools and admin dashboards",
    ],
    faqs: [
      {
        q: "Do we own the code?",
        a: "Yes. Full IP, repositories and infrastructure are transferred to you, with documentation and handover.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Regularly. We start with an architecture and risk audit, then stabilise before adding features.",
      },
    ],
  },
  {
    slug: "cloud-devops",
    name: "Cloud Infrastructure & DevOps",
    tagline: "Infrastructure that scales quietly and recovers automatically.",
    problem:
      "Deploys are manual and risky, downtime is discovered by customers, and nobody is certain the backups restore.",
    solution:
      "Containerised workloads, CI/CD pipelines, autoscaling, observability and tested disaster recovery — fully managed or handed to your team.",
    impact: "99.98% measured uptime and deploys that take minutes instead of evenings.",
    roi: "40–60% lower infra spend",
    tech: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Cloudflare"],
    capabilities: [
      "Docker & Kubernetes deployment",
      "CI/CD pipelines",
      "Load balancing & autoscaling",
      "Monitoring and alerting",
      "Backups & disaster recovery",
      "Managed hosting with 24/7 cover",
    ],
    faqs: [
      {
        q: "Can you migrate us without downtime?",
        a: "Yes — we run parallel environments and cut over behind a load balancer, with a tested rollback path.",
      },
      {
        q: "What does managed hosting include?",
        a: "Patching, monitoring, incident response, capacity planning and a monthly reliability report.",
      },
    ],
  },
  {
    slug: "data-intelligence",
    name: "Data Intelligence & Scraping",
    tagline: "Turn public and internal data into a live decision feed.",
    problem:
      "Pricing, competitor and market data is collected by hand, weeks late, and it never reaches the people deciding.",
    solution:
      "Resilient extraction pipelines with browser automation, scheduling, validation and delivery into your warehouse and dashboards.",
    impact: "Daily market visibility instead of quarterly guesswork.",
    roi: "Margin gains of 2–9%",
    tech: ["Playwright", "Puppeteer", "Python", "FastAPI", "PostgreSQL", "Metabase"],
    capabilities: [
      "Web scraping at scale",
      "Browser automation",
      "Competitor & price monitoring",
      "Scheduled extraction pipelines",
      "Custom data APIs",
      "BI and analytics dashboards",
    ],
    faqs: [
      {
        q: "Is the data collection compliant?",
        a: "We collect publicly available data, respect rate limits and legal boundaries, and document the sources for every pipeline.",
      },
      {
        q: "What happens when a source changes?",
        a: "Pipelines are monitored; broken selectors raise alerts and are patched under the maintenance agreement.",
      },
    ],
  },
  {
    slug: "enterprise-websites",
    name: "Enterprise Websites & Landing Pages",
    tagline: "Fast, indexable, conversion-engineered web presence.",
    problem:
      "Marketing sites load slowly, rank poorly and force a developer ticket for every content change.",
    solution:
      "Server-rendered sites with structured data, editable content models and performance budgets enforced in CI.",
    impact: "Sub-second loads, higher organic reach, marketing autonomy.",
    roi: "1.5–3x conversion lift",
    tech: ["React", "Next.js", "TanStack", "Tailwind", "Cloudflare", "Headless CMS"],
    capabilities: [
      "Enterprise and marketing sites",
      "High-converting landing pages",
      "Technical SEO & structured data",
      "Headless CMS integration",
      "Core Web Vitals optimisation",
      "Analytics and experimentation",
    ],
    faqs: [
      {
        q: "Can our team edit content?",
        a: "Yes — content is modelled in a headless CMS with previews, so marketing ships without engineering.",
      },
      {
        q: "Do you handle SEO migration?",
        a: "We map redirects, preserve rankings and monitor indexation for 90 days after launch.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    name: "Mobile & Field Applications",
    tagline: "Apps for the people doing the work, not just the office.",
    problem:
      "Field teams report on paper or WhatsApp, so the office finds out what happened a day late.",
    solution:
      "Offline-capable mobile apps for delivery, service, inventory and inspection, synced to the same backend as your dashboards.",
    impact: "Real-time field visibility and paperless reporting.",
    roi: "25–45% faster job cycles",
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "Node.js"],
    capabilities: [
      "Field service applications",
      "Delivery & logistics apps",
      "Inventory scanning apps",
      "Internal business tools",
      "Offline-first sync",
      "Push notification workflows",
    ],
    faqs: [
      {
        q: "iOS and Android?",
        a: "Both, from one codebase, including store submission and release management.",
      },
      {
        q: "Will it work without signal?",
        a: "Yes — offline-first storage with conflict-safe sync when connectivity returns.",
      },
    ],
  },
];

export type LandingPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  parent: string;
  problems: string[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
};

export const solutionPages: LandingPage[] = [
  {
    slug: "inventory-management-software",
    title: "Inventory Management Software Development",
    h1: "Inventory Management Software Built For Real Warehouses",
    description:
      "Custom inventory management software with real-time stock, multi-location transfers, barcode scanning and reorder automation.",
    parent: "custom-software-development",
    problems: [
      "Stock counts in spreadsheets that are wrong by the time they are shared",
      "Dead stock and stockouts discovered after a customer complains",
      "No traceability between purchase, transfer and sale",
    ],
    outcomes: [
      "Live stock across every location and bin",
      "Barcode and scanner workflows for receiving and picking",
      "Automatic reorder points and supplier purchase orders",
      "Batch, serial and expiry traceability",
    ],
    faqs: [
      {
        q: "Can it integrate with our accounting system?",
        a: "Yes — we sync purchases, sales and stock valuation with the accounting platform you already use.",
      },
      {
        q: "How long does implementation take?",
        a: "A production rollout for a single-site operation typically takes 6–10 weeks.",
      },
    ],
  },
  {
    slug: "erp-development",
    title: "ERP Development Services",
    h1: "ERP Development For Businesses Outgrowing Spreadsheets",
    description:
      "Modular ERP development covering finance, inventory, procurement, production and reporting, modelled on your real process.",
    parent: "custom-software-development",
    problems: [
      "Five disconnected tools and one very tired operations manager",
      "Month-end close that takes two weeks of manual reconciliation",
      "Generic ERP implementations abandoned halfway",
    ],
    outcomes: [
      "One system across finance, stock, procurement and production",
      "Role-based approvals with full audit trail",
      "Live management reporting instead of monthly PDFs",
      "Modular rollout — go live per department, not big bang",
    ],
    faqs: [
      {
        q: "Custom ERP or off-the-shelf?",
        a: "We advise honestly. If a packaged ERP fits 80% of your process, we implement and extend it instead of rebuilding it.",
      },
      {
        q: "How do you handle data migration?",
        a: "Legacy data is cleaned, mapped and migrated with reconciliation reports signed off before cutover.",
      },
    ],
  },
  {
    slug: "crm-development",
    title: "Custom CRM Development",
    h1: "CRM Development That Matches Your Sales Process",
    description:
      "Custom CRM development with pipeline automation, AI lead scoring, quoting and revenue reporting.",
    parent: "custom-software-development",
    problems: [
      "Leads sitting untouched because nobody owns follow-up",
      "Pipeline reported from memory in the Monday meeting",
      "Sales data trapped in individual inboxes",
    ],
    outcomes: [
      "Automatic lead capture, scoring and assignment",
      "Quote-to-invoice flow inside one system",
      "Forecasting from real activity, not opinion",
      "WhatsApp and email conversations logged to the record",
    ],
    faqs: [
      {
        q: "Why not just use a standard CRM?",
        a: "If a standard CRM fits, use it. We build custom when your sales process, pricing logic or compliance needs break the standard model.",
      },
      {
        q: "Can you migrate from our current CRM?",
        a: "Yes, including contacts, history, attachments and open pipeline.",
      },
    ],
  },
  {
    slug: "n8n-automation-services",
    title: "n8n Automation Services",
    h1: "n8n Automation Engineering, Built To Survive Production",
    description:
      "Production-grade n8n automation: self-hosted workflows, error handling, monitoring and AI-powered decision steps.",
    parent: "ai-automation",
    problems: [
      "Prototype workflows that fail silently at 2am",
      "No visibility into what ran, what failed and what was skipped",
      "Automation knowledge trapped with one person",
    ],
    outcomes: [
      "Self-hosted n8n with version control and staging",
      "Retry, alerting and dead-letter handling on every workflow",
      "AI decision nodes for classification and extraction",
      "Documented, handover-ready automation estate",
    ],
    faqs: [
      {
        q: "Self-hosted or cloud n8n?",
        a: "Both. Self-hosting is usually cheaper at volume and required when data cannot leave your infrastructure.",
      },
      {
        q: "Can you fix workflows we already built?",
        a: "Yes — audit, harden and instrument existing workflows is one of our most common engagements.",
      },
    ],
  },
  {
    slug: "ai-automation-services",
    title: "AI Automation Services For Business",
    h1: "AI Automation That Does Actual Work",
    description:
      "AI agents, document processing, OCR and knowledge assistants integrated into your existing business systems.",
    parent: "ai-automation",
    problems: [
      "AI pilots that impress in a demo and never reach production",
      "Documents typed into systems by humans, one field at a time",
      "Support teams answering the same forty questions daily",
    ],
    outcomes: [
      "Document and OCR pipelines with human-in-the-loop review",
      "Internal knowledge assistants grounded in your own data",
      "AI agents that take actions in your systems, with guardrails",
      "Evaluation and monitoring so quality is measured, not assumed",
    ],
    faqs: [
      {
        q: "Where does our data go?",
        a: "Into infrastructure you control, with model providers configured for zero-retention where available.",
      },
      {
        q: "How do you stop hallucinations?",
        a: "Retrieval grounding, strict output schemas, confidence thresholds and human review on anything financial or legal.",
      },
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    h1: "Business Process Automation, End To End",
    description:
      "Process mapping, automation engineering and change rollout that removes repetitive work across departments.",
    parent: "ai-automation",
    problems: [
      "Approvals that take days because they live in email",
      "Every department re-entering the same customer data",
      "No measurement of how long a process actually takes",
    ],
    outcomes: [
      "Mapped, measured processes with baseline timings",
      "Automated handoffs between departments and systems",
      "Exception dashboards so humans handle only the edge cases",
      "Quarterly savings reporting in hours and currency",
    ],
    faqs: [
      {
        q: "Where do you start?",
        a: "A two-week discovery that ranks processes by hours consumed and automation feasibility.",
      },
      {
        q: "Will staff resist it?",
        a: "We automate the work people dislike and involve their team leads in design, which is why adoption holds.",
      },
    ],
  },
  {
    slug: "cloud-hosting",
    title: "Managed Cloud Hosting",
    h1: "Managed Cloud Hosting For Business-Critical Systems",
    description:
      "Managed cloud hosting with monitoring, backups, scaling and 24/7 incident response on AWS, Azure and GCP.",
    parent: "cloud-devops",
    problems: [
      "Outages discovered by customers before the team",
      "Backups that have never actually been restored",
      "Cloud bills nobody can explain",
    ],
    outcomes: [
      "24/7 monitoring with defined response targets",
      "Tested restore drills, not theoretical backups",
      "Cost optimisation and right-sizing reviews",
      "Security patching and hardening baselines",
    ],
    faqs: [
      {
        q: "Which cloud do you recommend?",
        a: "Whichever fits your workload, compliance and existing skills. We are not resellers, so the advice is neutral.",
      },
      {
        q: "What is the response time?",
        a: "Critical incidents are acknowledged within 15 minutes on the 24/7 plan.",
      },
    ],
  },
  {
    slug: "managed-devops",
    title: "Managed DevOps Services",
    h1: "Managed DevOps For Teams That Ship Weekly",
    description:
      "CI/CD pipelines, Kubernetes, infrastructure as code and observability delivered as a managed service.",
    parent: "cloud-devops",
    problems: [
      "Manual deploys that only one engineer is willing to run",
      "No staging parity, so bugs appear only in production",
      "Infrastructure configured by hand and undocumented",
    ],
    outcomes: [
      "Automated pipelines with quality gates",
      "Infrastructure as code and reproducible environments",
      "Kubernetes with autoscaling and rollout safety",
      "Metrics, logs and traces in one place",
    ],
    faqs: [
      {
        q: "Do you work with our in-house engineers?",
        a: "Yes — most engagements are joint, and we document and train as we go.",
      },
      {
        q: "Is Kubernetes always the answer?",
        a: "No. For many workloads containers on a managed runtime are cheaper and simpler, and we will say so.",
      },
    ],
  },
  {
    slug: "web-scraping",
    title: "Web Scraping & Data Extraction Services",
    h1: "Web Scraping Pipelines That Keep Running",
    description:
      "Large-scale web scraping, browser automation and scheduled data extraction delivered as clean APIs and dashboards.",
    parent: "data-intelligence",
    problems: [
      "Competitor and pricing research done manually every week",
      "Scrapers that break and nobody notices for a month",
      "Raw data that never becomes a decision",
    ],
    outcomes: [
      "Resilient extraction with proxy and rate strategy",
      "Validation, deduplication and change detection",
      "Delivery via API, warehouse or scheduled report",
      "Alerting when a source structure changes",
    ],
    faqs: [
      {
        q: "Can you handle sites requiring login or JS?",
        a: "Yes, using headless browser automation where permitted by the source's terms.",
      },
      {
        q: "How is the data delivered?",
        a: "Any combination of REST API, database sync, S3 export or BI dashboard.",
      },
    ],
  },
  {
    slug: "landing-page-development",
    title: "Landing Page Development",
    h1: "Landing Pages Engineered To Convert",
    description:
      "High-performance landing page development with conversion copy, analytics and sub-second load times.",
    parent: "enterprise-websites",
    problems: [
      "Paid traffic landing on slow, generic pages",
      "No experiment loop, so nothing improves",
      "Forms that leak leads before they reach sales",
    ],
    outcomes: [
      "Sub-second first paint on mobile",
      "Conversion-focused structure and copy",
      "Instant lead routing into CRM and Slack",
      "A/B testing and event analytics wired in",
    ],
    faqs: [
      {
        q: "How fast can a page launch?",
        a: "A single campaign page typically launches within 7–10 days including copy.",
      },
      {
        q: "Do you write the copy?",
        a: "Yes, based on customer interviews and the objections your sales team actually hears.",
      },
    ],
  },
  {
    slug: "restaurant-software",
    title: "Restaurant POS & Management Software",
    h1: "Restaurant Software From Counter To Kitchen",
    description:
      "Restaurant POS, kitchen display, recipe costing and multi-branch reporting built for hospitality operations.",
    parent: "custom-software-development",
    problems: [
      "Orders lost between the counter and the kitchen",
      "Food cost calculated once a month, if at all",
      "No consolidated view across branches",
    ],
    outcomes: [
      "POS with offline resilience and kitchen display sync",
      "Recipe-level ingredient consumption and costing",
      "Multi-branch sales and wastage dashboards",
      "Delivery platform and payment integrations",
    ],
    faqs: [
      {
        q: "Does it work if the internet drops?",
        a: "Yes — the POS continues offline and syncs automatically on reconnection.",
      },
      {
        q: "Can it run on existing hardware?",
        a: "In most cases yes, including Android terminals and standard receipt printers.",
      },
    ],
  },
  {
    slug: "warehouse-software",
    title: "Warehouse Management Software",
    h1: "Warehouse Management Software For High-Volume Operations",
    description:
      "WMS development with bin-level tracking, guided picking, dispatch planning and courier integrations.",
    parent: "custom-software-development",
    problems: [
      "Pickers walking the warehouse twice for one order",
      "Inbound goods untracked until someone counts them",
      "Dispatch errors discovered by the customer",
    ],
    outcomes: [
      "Bin and zone level stock accuracy",
      "Optimised pick paths and wave picking",
      "Scan-verified packing and dispatch",
      "Courier and marketplace integrations",
    ],
    faqs: [
      {
        q: "Do we need special scanners?",
        a: "Standard Android scanners or phones work; we support enterprise handhelds too.",
      },
      {
        q: "Can it integrate with our ERP?",
        a: "Yes, via API or scheduled sync, with reconciliation reporting.",
      },
    ],
  },
  {
    slug: "manufacturing-erp",
    title: "Manufacturing ERP Development",
    h1: "Manufacturing ERP With Real Shop-Floor Visibility",
    description:
      "Manufacturing ERP covering BOM, production planning, machine downtime, quality control and costing.",
    parent: "custom-software-development",
    problems: [
      "Production plans in spreadsheets, actuals on paper",
      "Machine downtime discovered in the monthly review",
      "True cost per unit is an estimate",
    ],
    outcomes: [
      "BOM, routing and work-order execution",
      "Live shop-floor status and downtime capture",
      "Quality checks with non-conformance tracking",
      "Actual cost per batch and per unit",
    ],
    faqs: [
      {
        q: "Can you connect to machines?",
        a: "Where the machines expose data, yes — via OPC-UA, Modbus or vendor APIs.",
      },
      {
        q: "Discrete or process manufacturing?",
        a: "Both; the data model is designed around your production type.",
      },
    ],
  },
  {
    slug: "healthcare-software",
    title: "Healthcare & Hospital Software",
    h1: "Healthcare Software Built Around Clinical Workflow",
    description:
      "Hospital and clinic systems: patient records, appointments, pharmacy, billing and compliance-ready audit trails.",
    parent: "custom-software-development",
    problems: [
      "Patient history scattered across paper and three systems",
      "Appointment no-shows with no automated reminders",
      "Billing reconciliation done manually every night",
    ],
    outcomes: [
      "Unified patient record with access control",
      "Appointment, ward and theatre scheduling",
      "Pharmacy and inventory integration",
      "Audit logging designed for regulatory review",
    ],
    faqs: [
      {
        q: "How is patient data protected?",
        a: "Encryption at rest and in transit, strict role-based access, full audit trails and data residency of your choosing.",
      },
      {
        q: "Can it integrate with lab or imaging systems?",
        a: "Yes, via HL7/FHIR or vendor interfaces where available.",
      },
    ],
  },
  {
    slug: "school-erp",
    title: "School ERP Development",
    h1: "School ERP For Academics, Finance And Parents",
    description:
      "School management system with admissions, attendance, timetables, fees, exams and parent communication.",
    parent: "custom-software-development",
    problems: [
      "Fee follow-up handled by phone calls and memory",
      "Attendance registers that never reach parents",
      "Exam results compiled manually each term",
    ],
    outcomes: [
      "Admissions to alumni lifecycle in one system",
      "Automated fee reminders and online payment",
      "Parent portal and app with real-time updates",
      "Timetable, exam and report card automation",
    ],
    faqs: [
      {
        q: "Multi-campus support?",
        a: "Yes, with consolidated group reporting and per-campus permissions.",
      },
      {
        q: "Is there a parent app?",
        a: "Yes — attendance, fees, results and announcements in one place.",
      },
    ],
  },
  {
    slug: "custom-software-development-services",
    title: "Custom Software Development Company",
    h1: "Custom Software Development For Business Operations",
    description:
      "Custom software development covering discovery, architecture, delivery and long-term maintenance.",
    parent: "custom-software-development",
    problems: [
      "Software projects that arrive late and miss the point",
      "Vendors who disappear after launch",
      "Architecture that cannot survive the next growth stage",
    ],
    outcomes: [
      "Fixed-scope discovery before any commitment",
      "Two-week delivery increments with working software",
      "Documented architecture and full IP transfer",
      "Ongoing support and improvement agreement",
    ],
    faqs: [
      {
        q: "How do you price projects?",
        a: "Discovery is fixed price. Delivery is either fixed-scope per phase or a dedicated team retainer.",
      },
      {
        q: "What if requirements change?",
        a: "They will. Two-week increments make change cheap and visible instead of catastrophic.",
      },
    ],
  },
  {
    slug: "api-development",
    title: "API Development Services",
    h1: "API Development And System Integration",
    description:
      "REST, GraphQL and event-driven API development with versioning, documentation and rate limiting.",
    parent: "data-intelligence",
    problems: [
      "Integrations built as one-off scripts nobody maintains",
      "Partners waiting weeks for data access",
      "No documentation, no versioning, constant breakage",
    ],
    outcomes: [
      "Versioned, documented public and internal APIs",
      "Authentication, rate limiting and usage analytics",
      "Event-driven sync with webhooks and queues",
      "Partner sandbox and developer documentation",
    ],
    faqs: [
      {
        q: "REST or GraphQL?",
        a: "Depends on the consumer. We often ship REST for partners and GraphQL for internal product surfaces.",
      },
      {
        q: "Can you expose data from a legacy system?",
        a: "Yes — we wrap legacy databases and services behind a clean, safe API layer.",
      },
    ],
  },
];

export const industries = [
  {
    name: "Manufacturing",
    problem: "Production plans on paper, downtime invisible until month-end.",
    solution: "Shop-floor ERP with work orders, downtime capture and batch costing.",
    benefit: "18% higher line utilisation",
  },
  {
    name: "Retail",
    problem: "Stock accuracy drifts across branches and channels.",
    solution: "Unified inventory, POS and replenishment automation.",
    benefit: "Stockouts down 61%",
  },
  {
    name: "Restaurants",
    problem: "Food cost unknown until it has already been lost.",
    solution: "POS, kitchen display and recipe-level consumption tracking.",
    benefit: "Wastage down 24%",
  },
  {
    name: "Healthcare",
    problem: "Patient data fragmented across paper and legacy systems.",
    solution: "Unified records, scheduling, pharmacy and audit trails.",
    benefit: "31% faster patient throughput",
  },
  {
    name: "Construction",
    problem: "Site progress and material usage reported days late.",
    solution: "Project ERP with mobile site reporting and procurement control.",
    benefit: "Material leakage down 17%",
  },
  {
    name: "Logistics",
    problem: "Dispatch planning by phone call and whiteboard.",
    solution: "Route planning, driver app and live delivery tracking.",
    benefit: "Deliveries per driver up 22%",
  },
  {
    name: "Education",
    problem: "Fees, attendance and results managed in parallel spreadsheets.",
    solution: "School ERP with parent portal and payment automation.",
    benefit: "Fee collection cycle halved",
  },
  {
    name: "Finance",
    problem: "Manual reconciliation and compliance reporting.",
    solution: "Automated reconciliation, document AI and audit-ready logging.",
    benefit: "Close time cut from 12 days to 3",
  },
  {
    name: "Hospitality",
    problem: "Bookings, housekeeping and billing in separate tools.",
    solution: "Property operations platform with channel integrations.",
    benefit: "RevPAR up 9%",
  },
  {
    name: "Real Estate",
    problem: "Leads lost between portals, agents and follow-up.",
    solution: "CRM with lead scoring, WhatsApp automation and pipeline reporting.",
    benefit: "Lead response under 3 minutes",
  },
];

export const productPillars = [
  "All Foundations",
  "Core Operations",
  "Automation & AI",
  "Industry Systems",
] as const;

export const products = [
  {
    name: "Inventory Management",
    pillar: "Core Operations",
    detail: "Multi-location stock, barcode workflows, reorder automation.",
  },
  {
    name: "Warehouse Management",
    pillar: "Core Operations",
    detail: "Bin-level tracking, guided picking, dispatch verification.",
  },
  {
    name: "CRM Platform",
    pillar: "Core Operations",
    detail: "Pipeline automation, AI lead scoring, quote-to-invoice.",
  },
  {
    name: "HRMS & Payroll",
    pillar: "Core Operations",
    detail: "Attendance, payroll inputs, leave and performance cycles.",
  },
  {
    name: "Automation Platform",
    pillar: "Automation & AI",
    detail: "Self-hosted n8n estate with monitoring and governance.",
  },
  {
    name: "Business Dashboard",
    pillar: "Automation & AI",
    detail: "Company-wide KPIs aggregated from every operational system.",
  },
  {
    name: "AI Lead & Support Agent",
    pillar: "Automation & AI",
    detail: "Autonomous triage, document extraction, and WhatsApp/Email actions.",
  },
  {
    name: "Restaurant POS",
    pillar: "Industry Systems",
    detail: "Offline-capable POS, kitchen display, recipe costing.",
  },
  {
    name: "Hospital ERP",
    pillar: "Industry Systems",
    detail: "Patient records, scheduling, pharmacy, billing.",
  },
  {
    name: "Construction ERP",
    pillar: "Industry Systems",
    detail: "Site progress, procurement, subcontractor control.",
  },
  {
    name: "School ERP",
    pillar: "Industry Systems",
    detail: "Admissions to alumni, fees, exams, parent portal.",
  },
];

export const caseStudies = [
  {
    client: "National FMCG distributor",
    challenge: "9 warehouses running on spreadsheets with a 3-day stock reporting lag.",
    solution: "Custom WMS with scanner workflows, transfer control and live dashboards.",
    tech: ["Go", "PostgreSQL", "React", "Kubernetes"],
    timeline: "14 weeks",
    results: [
      { label: "Stock accuracy", value: "99.4%" },
      { label: "Hours saved / month", value: "740" },
      { label: "Order cycle", value: "-38%" },
    ],
  },
  {
    client: "B2B services group",
    challenge: "Leads from six channels handled manually; average response time 9 hours.",
    solution: "n8n + AI qualification pipeline into a custom CRM with WhatsApp automation.",
    tech: ["n8n", "OpenAI", "Node.js", "Redis"],
    timeline: "7 weeks",
    results: [
      { label: "Response time", value: "< 3 min" },
      { label: "Qualified leads", value: "+64%" },
      { label: "Revenue growth", value: "+31%" },
    ],
  },
  {
    client: "Regional hospital network",
    challenge: "Legacy records system with nightly outages and no audit trail.",
    solution: "Migration to containerised infrastructure with HA database and observability.",
    tech: ["Docker", "AWS", "Terraform", "Grafana"],
    timeline: "11 weeks",
    results: [
      { label: "Uptime", value: "99.98%" },
      { label: "Page load", value: "-72%" },
      { label: "Infra cost", value: "-44%" },
    ],
  },
];
