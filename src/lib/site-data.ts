export const EMAIL_ADDRESS = "business@foxquart.com";
export const MAILTO_URL = `mailto:${EMAIL_ADDRESS}`;

export const PHONE_NUMBERS = [
  { raw: "6909519692", formatted: "+91 69095 19692", tel: "tel:+916909519692" },
  { raw: "8731953807", formatted: "+91 87319 53807", tel: "tel:+918731953807" },
];

/**
 * Hand-authored search metadata, shared by both page types.
 *
 * `composeDescription` assembles a description from fragments and skips any that
 * would overflow instead of stopping, so whichever fragment happens to fit lands
 * last. That produced descriptions ending on a verbless clause and repeating a
 * word from the sentence before it. These fields override that per page; the
 * composer stays as the fallback for records not yet written by hand.
 */
type SearchMeta = {
  /** `<title>` without the " | Foxquart" suffix the route appends. Keep under 48. */
  metaTitle?: string;
  /** 140-158 characters, primary keyword inside the first 90. */
  metaDescription?: string;
  /**
   * ISO date this page's content last changed, emitted as the sitemap `<lastmod>`.
   * Per page rather than one site-wide constant: search engines discount a
   * `lastmod` they can see does not track real edits, and a single frozen date
   * shared by all 30 URLs is exactly that pattern. Bump it when the copy changes.
   */
  lastModified?: string;
};

export type Service = SearchMeta & {
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
    metaTitle: "AI Workflow Automation Services",
    metaDescription:
      "AI workflow automation services that replace manual steps with monitored pipelines: n8n builds, lead qualification, document handling and approval logic.",
    lastModified: "2026-08-16",
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
        a: "No. Foxquart automates across the tools you already run, including your CRM, accounting system, spreadsheets and ERP, and only replaces a tool when that tool is the actual bottleneck. Workflow automation connects those systems with monitored pipelines and full logging, so the stack you have keeps working instead of being thrown away.",
      },
      {
        q: "How long before the first automation is live?",
        a: "The first production workflow from Foxquart typically ships in 10–15 working days, including logging and failure alerting. That is a live automation running against your real systems, not a demo. Later workflows follow the same pattern, and a typical client removes 120–400 manual hours per month within the first quarter.",
      },
      {
        q: "How much does AI workflow automation cost?",
        a: "Foxquart publishes no list price for AI workflow automation, because scope decides the number. Discovery is fixed price, and delivery runs as fixed-scope phases or a dedicated team retainer, so cost is agreed stage by stage. Clients typically see 3–7x return in year one from the hours automation removes.",
      },
      {
        q: "What happens when an automated workflow fails overnight?",
        a: "Every Foxquart automation ships with logging and failure alerting, so a workflow that breaks at 2am raises an alert instead of failing silently. Pipelines are monitored, retry and dead-letter handling catches recoverable errors, and exception dashboards leave humans handling only the edge cases automation cannot decide.",
      },
      {
        q: "Can automation handle lead follow-up and approvals?",
        a: "Yes. Foxquart builds lead qualification and routing, multi-step approval systems, invoice and document automation, and email and WhatsApp automation as monitored pipelines. Those are the steps where teams chase approvals over email and lose leads because nobody responded within the hour, so they are usually automated first.",
      },
      {
        q: "Who owns the automations once they are running?",
        a: "You do. Foxquart transfers source repositories, intellectual property and infrastructure in full, with documented architecture and a formal handover, and the automation estate is documented so it stays handover-ready. Self-hosted workflows run on infrastructure you control, so nothing operational stays locked inside a vendor account.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    metaTitle: "Custom Software Development Services",
    metaDescription:
      "Custom software development services for ERP, CRM, inventory and industry platforms, modelled on how your company actually operates. You own the code.",
    lastModified: "2026-08-16",
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
        a: "Yes, in full. Foxquart transfers intellectual property, source repositories and infrastructure to you, with documentation and a formal handover at the end of the build. You are not licensing your own operational system back from us, and that holds whether or not Foxquart keeps supporting it afterwards.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Regularly, and it is one of the more common ways a Foxquart engagement starts. We begin with an architecture and risk audit of the existing codebase, then stabilise it before adding any features. Rushing new work onto an unstable base is how projects arrive late and miss the point.",
      },
      {
        q: "How long does a custom software project take?",
        a: "Custom software from Foxquart is measured in weeks. Delivery runs in two-week increments with working software at the end of each one, so progress stays visible. A single-site operational rollout typically takes 6–10 weeks, and a nine-warehouse management system for an FMCG distributor took 14 weeks.",
      },
      {
        q: "What is the payback period on a custom system?",
        a: "Operational systems built by Foxquart typically pay back in 8–14 months. There is no list price, because scope decides the cost: discovery is fixed price, and delivery is either fixed-scope per phase or a dedicated team retainer. Payback comes from one source of truth across operations, finance and the field team.",
      },
      {
        q: "What technology do you build operational systems on?",
        a: "Foxquart builds custom operational systems on TypeScript, React, Node.js, Go, PostgreSQL and Docker. That stack is deliberately mainstream, so the documented architecture can be picked up by any competent engineering team after handover. Obscure technology choices are how a system fails to survive the next growth stage.",
      },
      {
        q: "How do you make sure the software matches how we work?",
        a: "Foxquart models your workflow, roles and reporting from day one instead of fitting your process into someone else's template. Discovery maps the real process before code is written, and two-week delivery increments put working software in front of your team early, while corrections are still cheap to make.",
      },
      {
        q: "How do you price projects?",
        a: "Foxquart prices discovery as a fixed amount, then delivery as either fixed-scope phases or a dedicated team retainer. There is no list price for a build, because scope decides the number and discovery is what establishes the scope. You approve the cost of each phase before that phase begins.",
      },
      {
        q: "What if requirements change?",
        a: "They will change, and Foxquart plans for it rather than resisting it. Delivery runs in two-week increments with working software at the end of each, so a change is priced against the next increment instead of renegotiating a whole contract. Change found in week three is cheap; the same change at handover is not.",
      },
      {
        q: "What do we get out of the discovery phase?",
        a: "A fixed-scope plan that belongs to you. Foxquart discovery is fixed price and produces the mapped process, the architecture direction, and the scope and cost of delivery before you commit to building anything. If the honest conclusion is that a packaged product fits, discovery says so.",
      },
      {
        q: "What happens if the project runs over?",
        a: "Two-week increments are how Foxquart keeps that from becoming a surprise. Working software at the end of each increment makes slippage visible within a fortnight rather than at a deadline, and remaining scope is renegotiated against the remaining phases. An overrun becomes a scoping conversation instead of an unexplained invoice.",
      },
      {
        q: "What support do we get after launch?",
        a: "An ongoing support and improvement agreement, not ad-hoc favours. Foxquart continues improvements in the same two-week increments as the original build, and where infrastructure is included, cover extends to patching, monitoring, incident response and a monthly reliability report. Because it is contracted, support survives changes of staff on both sides.",
      },
      {
        q: "How do we know you will not disappear after launch?",
        a: "Because the handover is built so you could survive it. Foxquart transfers repositories, intellectual property and infrastructure with documented architecture, and most engagements run jointly with your engineers. If we stopped tomorrow, another team could pick the system up, which is the opposite of how vendor lock-in normally works.",
      },
    ],
  },
  {
    slug: "cloud-infrastructure",
    // "DevOps" moved out of the parent's title: /solutions/managed-devops owns
    // that head term, and a parent naming its child's keyword outranks and
    // starves it. The parent keeps architecture, migration and reliability.
    metaTitle: "Cloud Infrastructure Services",
    metaDescription:
      "Cloud infrastructure and DevOps services: containerised workloads, CI/CD pipelines, autoscaling, observability plus tested recovery. Deploy without fear.",
    lastModified: "2026-08-16",
    name: "Cloud Infrastructure & Reliability",
    tagline: "Infrastructure that scales quietly and recovers automatically.",
    problem:
      "Deploys are manual and risky, downtime is discovered by customers, and nobody is certain the backups restore.",
    solution:
      "Containerised workloads, CI/CD pipelines, autoscaling, observability and tested disaster recovery, fully managed or handed to your team.",
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
        a: "Yes. Foxquart runs the new and old environments in parallel, then cuts over behind a load balancer with a tested rollback path ready. Nothing is switched on faith. A regional hospital network moved a nightly-failing legacy system onto containerised infrastructure this way in 11 weeks.",
      },
      {
        q: "What does managed hosting include?",
        a: "Foxquart managed hosting covers patching, monitoring, incident response, capacity planning and a monthly reliability report. It is an agreement with defined response targets rather than best-effort cover, and on the 24/7 plan critical incidents are acknowledged within 15 minutes. Backups are proven by restore drills, not assumed.",
      },
      {
        q: "How much can we realistically cut our cloud bill?",
        a: "Foxquart infrastructure work typically lands 40–60% lower infrastructure spend, through right-sizing reviews, autoscaling instead of permanently over-provisioned capacity, and cost optimisation on workloads nobody has revisited. The hospital network migration cut infrastructure cost by 44% while measured uptime reached 99.98%.",
      },
      {
        q: "How long does a cloud migration take?",
        a: "Cloud migrations at Foxquart are measured in weeks, not quarters. A regional hospital network moved off a legacy records system with nightly outages onto containerised infrastructure with a high-availability database and observability in 11 weeks. Work runs in two-week increments, so the migration path stays visible throughout.",
      },
      {
        q: "Can our own engineers run the infrastructure afterwards?",
        a: "Yes. Foxquart delivers infrastructure either fully managed or handed to your team, and every environment is reproducible infrastructure as code rather than servers configured by hand. Pipelines, monitoring and runbooks are documented, and most engagements run jointly with your engineers so the handover is not a surprise.",
      },
      {
        q: "How do you know the backups actually restore?",
        a: "Foxquart tests them. Disaster recovery is verified with restore drills rather than treated as a theoretical backup policy, and the results feed the monthly reliability report. Most teams discover their backups do not restore during an incident, which is the worst possible moment to find out.",
      },
    ],
  },
  {
    slug: "data-engineering",
    // "Data intelligence" is a phrase this site invented; buyers do not search it.
    // Scraping moves to /solutions/web-scraping, which owns that head term.
    metaTitle: "Data Engineering Services",
    metaDescription:
      "Data extraction services turning public and internal sources into a live decision feed: browser automation, validation, warehousing plus dashboards you trust.",
    lastModified: "2026-08-16",
    name: "Data Engineering & Business Intelligence",
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
        a: "Foxquart collects publicly available data only, respects rate limits and legal boundaries, and documents the sources behind every pipeline. That documentation matters later: when someone asks where a number in a pricing decision came from, the pipeline can be traced back to a named, permitted source rather than an unattributed scrape.",
      },
      {
        q: "What happens when a source changes?",
        a: "Foxquart pipelines are monitored, so a broken selector raises an alert and is patched under the maintenance agreement. The common failure elsewhere is a scraper that breaks and nobody notices for a month, quietly feeding stale data into decisions. Change detection and validation catch that before it reaches a dashboard.",
      },
      {
        q: "How often is the data refreshed?",
        a: "On whatever schedule the decision needs, run by scheduled extraction pipelines rather than by hand. The point of Foxquart data intelligence is daily market visibility instead of quarterly guesswork, so pricing and competitor feeds usually run far more often than the weekly manual research they replace.",
      },
      {
        q: "Can the data feed our existing warehouse and dashboards?",
        a: "Yes. Foxquart delivers extracted data into the warehouse and dashboards you already use, or through custom data APIs where a system needs to pull it directly. Validation and deduplication happen before delivery, so what lands in your BI layer is clean rather than raw.",
      },
      {
        q: "What is the commercial case for a data pipeline?",
        a: "Foxquart data intelligence work targets margin gains of 2–9%, earned by pricing and market decisions made on daily data instead of information collected by hand and already weeks old. There is no list price: discovery is fixed price and delivery is scoped per phase or on retainer.",
      },
      {
        q: "Who maintains the pipelines after they are built?",
        a: "Foxquart does, under a maintenance agreement that covers monitoring, alerting and patching when a source structure changes. The pipelines and their sources are documented, so your own engineers can take them over instead. Either way the extraction estate is not left as undocumented scripts nobody maintains.",
      },
    ],
  },
  {
    slug: "enterprise-websites",
    metaTitle: "Enterprise Website Development",
    metaDescription:
      "Enterprise website development with server rendering, structured data and editable content models. Fast pages marketing can update without a developer ticket.",
    lastModified: "2026-08-16",
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
        a: "Yes. Foxquart models site content in a headless CMS with previews, so marketing publishes changes without raising an engineering ticket. That autonomy is the point: most enterprise sites slow down because every wording change needs a developer, and the content queue becomes the real bottleneck rather than the design.",
      },
      {
        q: "Do you handle SEO migration?",
        a: "Yes. Foxquart maps redirects, preserves existing rankings and monitors indexation for 90 days after launch, so a redesign does not quietly cost you the organic traffic the old site earned. Structured data and server rendering are part of the build rather than something retrofitted once rankings drop.",
      },
      {
        q: "Why not just use a website builder or template?",
        a: "Use one if it fits. Foxquart builds custom when the site has to be genuinely fast, properly indexable and wired into your own content model and analytics. Builders tend to fail on Core Web Vitals and structured data, which is exactly where organic reach and conversion are won.",
      },
      {
        q: "Will the site stay fast once marketing adds content?",
        a: "Yes, because Foxquart enforces performance budgets in CI rather than measuring speed once at launch. A change that pushes the site past its budget fails the build. Sites are server-rendered for sub-second loads, and Core Web Vitals optimisation is part of delivery rather than a later cleanup project.",
      },
      {
        q: "Can you wire the site into our analytics and testing tools?",
        a: "Yes. Foxquart wires analytics and experimentation into enterprise sites at build time, so conversion changes are measured rather than argued about in a meeting. Combined with conversion-engineered page structure and server rendering, that instrumentation is what makes the 1.5–3x conversion lift these builds are scoped around checkable rather than claimed.",
      },
      {
        q: "What does an enterprise website build cost?",
        a: "Foxquart quotes no list price for websites, because scope decides it. A fixed-price discovery establishes the content model, page set and performance targets, then delivery is scoped as fixed-price phases or a retainer. You approve the cost of each stage before it starts rather than once at the beginning.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    metaTitle: "Mobile App Development Services",
    metaDescription:
      "Mobile app development services for field, delivery and inventory teams: one React Native codebase, offline-first sync, both stores. Get live site visibility.",
    lastModified: "2026-08-16",
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
        a: "Both, from a single React Native codebase, which keeps one app under maintenance instead of two diverging ones. Foxquart also handles store submission and release management for both platforms, so shipping an update to field staff does not become an internal project every time something changes.",
      },
      {
        q: "Will it work without signal?",
        a: "Yes. Foxquart field apps are offline-first: data is stored on the device and syncs back with conflict-safe handling once connectivity returns. That matters for delivery, service, inventory and inspection work, where the job happens in a basement, a warehouse aisle or a site with no usable coverage.",
      },
      {
        q: "Does the app connect to our existing systems?",
        a: "Yes. Foxquart field apps sync to the same backend as your dashboards, so a job completed on a phone updates the same records your office team is reading. That is the difference between real-time field visibility and an office that finds out what happened a day late.",
      },
      {
        q: "Who handles App Store and Play Store submission?",
        a: "Foxquart does, as part of delivery. Store submission and ongoing release management are included rather than handed back to you at the end, along with push notification workflows for dispatch and status updates. Your team is not left decoding store review rejections on its own.",
      },
      {
        q: "Will field staff actually use it?",
        a: "They use it when it beats the paper. Foxquart builds field apps for the people doing the work rather than for the office view of that work, with offline capture, scanning and push updates. Job cycles typically run 25–45% faster once reporting stops going through paper and WhatsApp.",
      },
      {
        q: "How much does a field service app cost to build?",
        a: "There is no published price, because scope decides it. Foxquart starts with a fixed-price discovery that defines the workflows, offline behaviour and integrations, then delivery is scoped as fixed-price phases or a dedicated team retainer. Cost is agreed per stage rather than as one number at the start.",
      },
    ],
  },
];

export type LandingPage = SearchMeta & {
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
    metaDescription:
      "Inventory management software development with live stock by location, barcode receiving, automatic reorder points and batch tracing. Stop counting twice.",
    lastModified: "2026-08-16",
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
        a: "Yes. Foxquart syncs purchases, sales and stock valuation with the accounting platform you already run, so finance and operations report the same numbers. Inventory software that does not reconcile against the accounts simply creates a second version of the truth, which is the problem most warehouses are trying to leave behind.",
      },
      {
        q: "How long does implementation take?",
        a: "A production rollout of Foxquart inventory management software for a single-site operation typically takes 6–10 weeks. That covers live stock by location and bin, barcode receiving and picking, reorder points and supplier purchase orders. Delivery runs in two-week increments, so warehouse staff see and correct the workflows before go-live.",
      },
      {
        q: "Can you migrate our existing stock data?",
        a: "Yes. Foxquart cleans, maps and migrates existing stock data, then reconciles it before cutover so opening balances are trusted from day one. Spreadsheet counts are usually wrong by the time they are shared, so migration includes agreeing which counts are authoritative rather than importing the existing errors.",
      },
      {
        q: "Does it handle multiple warehouses and branches?",
        a: "Yes. Foxquart inventory systems hold live stock across every location and bin, including multi-location transfers, so one branch can see real availability elsewhere instead of phoning to ask. Batch, serial and expiry traceability follows goods across those transfers, which is what makes recalls and audits answerable.",
      },
      {
        q: "Why not use off-the-shelf inventory software?",
        a: "Use it if it fits, and Foxquart will say so when it does. Custom becomes the right call when your bin logic, transfer rules, batch and expiry handling or valuation method break the packaged model. Those gaps end up back in spreadsheets, which is where the stock errors started.",
      },
      {
        q: "What does inventory management software cost to build?",
        a: "Foxquart publishes no price for inventory software, because scope decides it. A fixed-price discovery defines locations, workflows and integrations, then produces the delivery cost before you commit to it. Operational systems of this kind typically pay back in 8–14 months, largely through the stockouts and dead stock that stop happening.",
      },
    ],
  },
  {
    slug: "erp-development",
    metaTitle: "ERP Software Development Company",
    metaDescription:
      "ERP software development company building finance, stock, procurement and production into one modular system. Go live per team, never in a risky big bang.",
    lastModified: "2026-08-16",
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
      "Modular rollout: go live per department, not big bang",
    ],
    faqs: [
      {
        q: "Custom ERP or off-the-shelf?",
        a: "Foxquart advises honestly on this rather than defaulting to a build. If a packaged ERP fits about 80% of your process, we implement and extend it instead of rebuilding it. Custom ERP is the right answer when your finance, procurement or production logic breaks the packaged model and the gaps would return to spreadsheets.",
      },
      {
        q: "How do you handle data migration?",
        a: "Foxquart cleans, maps and migrates legacy ERP data, and produces reconciliation reports that you sign off before cutover. Nothing goes live on unverified balances. Because rollout is modular, migration happens per department rather than as one weekend attempt at moving five disconnected tools at once.",
      },
      {
        q: "How long does an ERP implementation take?",
        a: "Foxquart rolls ERP out module by module rather than as a big-bang launch, so a department goes live when its module is ready instead of waiting for the whole system. Delivery runs in two-week increments with working software each time, which is what keeps an ERP project from stalling halfway.",
      },
      {
        q: "What does ERP development cost?",
        a: "Foxquart publishes no ERP price, because scope decides it and modular rollout changes the shape of the spend. Discovery is fixed price and produces the scope and cost for delivery. After that, each phase is either fixed price or covered by a dedicated team retainer, so you commit per module.",
      },
      {
        q: "Can the ERP replace all of our current tools?",
        a: "That is the intent: one Foxquart system across finance, stock, procurement and production, instead of five disconnected tools and one very tired operations manager. Replacement happens in sequence, not at once, with role-based approvals and a full audit trail, and live management reporting replacing the monthly PDF.",
      },
      {
        q: "Why do ERP projects get abandoned halfway?",
        a: "Because a generic implementation gets forced onto a process it does not fit, and everyone quietly returns to spreadsheets. Foxquart models finance, stock, procurement and production on your actual process, goes live per department, and ships working software every two weeks so the mismatch surfaces in week two rather than month nine.",
      },
    ],
  },
  {
    slug: "crm-development",
    metaTitle: "Custom CRM Development Services",
    metaDescription:
      "Custom CRM development services with automatic lead capture, AI scoring, quoting and forecasting from real activity. Fits your sales process, not a template.",
    lastModified: "2026-08-16",
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
        a: "If a standard CRM fits your sales process, use it, and Foxquart will tell you so. We build custom when your sales process, pricing logic or compliance needs break the standard model, because that is when teams start working around the CRM in spreadsheets and the pipeline data stops being trustworthy.",
      },
      {
        q: "Can you migrate from our current CRM?",
        a: "Yes. Foxquart migrates contacts, activity history, attachments and open pipeline into the new custom CRM, so nothing is stranded in the old system and sales does not restart from an empty database. Migration is reconciled before cutover rather than discovered to be incomplete afterwards.",
      },
      {
        q: "How long does a custom CRM take to build?",
        a: "Weeks. Foxquart delivers in two-week increments, so lead capture usually works before quoting and forecasting are finished. A B2B services group had an AI lead-qualification pipeline feeding a custom CRM with WhatsApp automation live in 7 weeks, and average lead response fell from 9 hours to under 3 minutes.",
      },
      {
        q: "How much does a custom CRM cost?",
        a: "Foxquart does not quote a per-seat price, because a custom CRM is a built system rather than a subscription. Discovery is fixed price and defines the pipeline, quoting and reporting scope; delivery is then fixed price per phase or a dedicated team retainer. The cost does not climb each time you hire a salesperson.",
      },
      {
        q: "Can it log WhatsApp and email conversations automatically?",
        a: "Yes. Foxquart logs WhatsApp and email conversations against the customer record, so history stops living inside individual inboxes. Lead capture, scoring and assignment run automatically, and quote-to-invoice sits in the same system, which is what makes forecasting reflect real activity rather than opinion in the Monday meeting.",
      },
      {
        q: "Who owns the customer data in a custom CRM?",
        a: "You do, outright. Foxquart transfers repositories, intellectual property and infrastructure, and the CRM runs on infrastructure you control, so contacts, pipeline history and conversation logs are not held hostage to a subscription. Access is role-based, and the data stays wherever your compliance requirements need it to sit.",
      },
    ],
  },
  {
    slug: "n8n-automation-services",
    metaTitle: "n8n Automation Agency & Consulting",
    metaDescription:
      "An n8n automation agency for production workloads: self-hosted estates, version control, retries and AI decision nodes. Fix workflows that fail silently.",
    lastModified: "2026-08-16",
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
        a: "Both, and Foxquart picks based on volume and data rules. Self-hosting n8n is usually cheaper at volume and is required outright when data cannot leave your infrastructure. Either way, workflows are version controlled with a staging environment rather than edited live in production and hoped for the best.",
      },
      {
        q: "Can you fix workflows we already built?",
        a: "Yes, and auditing, hardening and instrumenting workflows somebody else built is one of the most common Foxquart engagements. Prototype workflows tend to fail silently at 2am with no record of what ran, what failed and what was skipped, so we add retry, alerting and dead-letter handling to every one.",
      },
      {
        q: "Can you move our workflows onto self-hosted infrastructure?",
        a: "Yes. Foxquart migrates existing n8n workflows onto self-hosted infrastructure you control, with version control and a staging environment so changes are tested before production. Migration is also the point at which retry, alerting and dead-letter handling get added, since workflows built quickly on cloud n8n rarely have any.",
      },
      {
        q: "What happens if the person who built our workflows leaves?",
        a: "Nothing breaks, because Foxquart documents the automation estate for handover instead of leaving it in one person's head. Workflows are version controlled, staged and instrumented, and the documentation records what each one does and how it fails. Automation knowledge trapped with a single engineer is a risk, not a saving.",
      },
      {
        q: "Can n8n workflows make AI-based decisions?",
        a: "Yes. Foxquart adds AI decision nodes inside n8n for classification and extraction, so a workflow routes a document or message on its content rather than on brittle rules. Output is constrained by strict schemas and confidence thresholds, with human review kept on anything financial or legal.",
      },
      {
        q: "How do we see what ran and what failed?",
        a: "Foxquart instruments every n8n workflow, so what ran, what failed and what was skipped is visible rather than guessed at. Retry, alerting and dead-letter handling catch failures where they happen, and self-hosted n8n keeps those execution logs inside infrastructure you control instead of a vendor dashboard.",
      },
    ],
  },
  {
    slug: "ai-agent-development",
    metaDescription:
      "AI automation services that reach production: document pipelines with human review, grounded knowledge assistants and agents acting in your systems safely.",
    lastModified: "2026-08-16",
    // Retargeted off "AI automation services", which collided with the parent
    // practice page. The content was always agent and document-AI engineering;
    // only the title had been written to the head term rather than the page.
    title: "AI Agent & Document AI Development",
    h1: "AI Agents And Document AI That Reach Production",
    metaTitle: "AI Agent & Document AI Development",
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
        a: "Into infrastructure you control. Foxquart configures model providers for zero retention where that option is available, so your documents and internal knowledge are not retained by a third party. Knowledge assistants are grounded in your own data rather than uploaded into a shared external service you cannot audit.",
      },
      {
        q: "How do you stop hallucinations?",
        a: "Foxquart constrains the model rather than trusting it. Retrieval grounding ties answers to your own data, strict output schemas force a parsable shape, and confidence thresholds route uncertain results to a person. Anything financial or legal keeps human review in the loop by design, not as an optional extra.",
      },
      {
        q: "Why do AI pilots never reach production?",
        a: "Because a demo has no error handling, no monitoring and no owner. Foxquart builds AI automation as production systems instead: document and OCR pipelines with human-in-the-loop review, agents with guardrails on the actions they can take, and evaluation and monitoring so quality is measured rather than assumed after launch.",
      },
      {
        q: "Can AI read our invoices and paperwork?",
        a: "Yes. Foxquart builds document and OCR pipelines that extract fields from invoices and paperwork and write them into your systems, replacing humans typing one field at a time. Extraction runs against strict output schemas, and low-confidence results route to human review rather than being saved silently.",
      },
      {
        q: "How do you know the AI is performing well?",
        a: "Foxquart measures it. Evaluation and monitoring are part of every AI automation, so accuracy is tracked against real cases instead of inferred from one good demo. Confidence thresholds send uncertain outputs to human review, and anything financial or legal keeps a person in the loop permanently.",
      },
      {
        q: "What does an AI automation project cost?",
        a: "Foxquart quotes no standard price, because scope decides it. A fixed-price discovery ranks candidate processes by hours consumed and automation feasibility, then produces the delivery scope and cost. Delivery is fixed price per phase or a dedicated team retainer, and a first production automation typically ships in 10–15 working days.",
      },
    ],
  },
  {
    slug: "business-process-automation",
    metaTitle: "Business Process Automation Services",
    metaDescription:
      "Business process automation services covering discovery, mapping, engineering and rollout. Cut approval delays between departments, measured in hours saved.",
    lastModified: "2026-08-16",
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
        a: "Foxquart starts with a two-week discovery that maps your processes and ranks them by hours consumed and automation feasibility. That produces both a prioritised list and the scope and cost of delivery, so the first automation targets the most expensive repetitive work rather than whichever process annoyed someone loudest.",
      },
      {
        q: "Will staff resist it?",
        a: "Usually not, because Foxquart automates the work people already dislike and involves their team leads in the design. Adoption holds when automation removes approval chasing and duplicate data entry instead of being imposed on top of existing work. Exception dashboards leave staff handling the cases that actually need judgement.",
      },
      {
        q: "How do you prove the automation actually saved time?",
        a: "Foxquart measures the process before touching it. Discovery records baseline timings, so any saving is a comparison rather than a claim, and quarterly savings reporting states the result in hours and currency. Most organisations cannot say how long a process takes today, which is exactly why later savings become unarguable.",
      },
      {
        q: "What happens to the exceptions automation cannot handle?",
        a: "They go to people, deliberately. Foxquart builds exception dashboards so staff handle only the edge cases while routine handoffs between departments and systems run automatically. An unhandled case surfaces on a dashboard rather than sitting unnoticed in an inbox until a customer chases it.",
      },
      {
        q: "Can automation connect departments using different systems?",
        a: "Yes. Foxquart automates the handoffs between departments and between systems, so customer data entered once stops being re-keyed by everyone downstream. Approvals that previously moved by email run as multi-step logic with an audit trail, which removes the days lost while a request sits in somebody's inbox.",
      },
      {
        q: "How much of a process can realistically be automated?",
        a: "Enough to remove the repetitive middle, not the judgement. Foxquart maps and measures the process first, then ranks its steps by hours consumed and automation feasibility, so expensive mechanical work is automated and decisions stay with people. Exception dashboards cover whatever falls outside the rules.",
      },
    ],
  },
  {
    slug: "cloud-hosting",
    metaTitle: "Managed Cloud Hosting Services",
    metaDescription:
      "Managed cloud hosting on AWS, Azure or GCP with monitoring, restore drills, right-sizing reviews and round-the-clock incident cover. Sleep through deploys.",
    lastModified: "2026-08-16",
    title: "Managed Cloud Hosting",
    h1: "Managed Cloud Hosting For Business-Critical Systems",
    description:
      "Managed cloud hosting with monitoring, backups, scaling and 24/7 incident response on AWS, Azure and GCP.",
    parent: "cloud-infrastructure",
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
        a: "Foxquart recommends whichever cloud fits your workload, compliance requirements and existing skills, and we work across AWS, Azure and GCP. We are not resellers, so no margin rides on the answer and the advice stays neutral. The wrong cloud is usually the one your own team cannot operate.",
      },
      {
        q: "What is the response time?",
        a: "On the Foxquart 24/7 managed hosting plan, critical incidents are acknowledged within 15 minutes. That is a defined response target in the agreement rather than a best-effort promise, and it sits behind round-the-clock monitoring, so an outage is caught by the monitoring instead of reported by your customers.",
      },
      {
        q: "Can you take over hosting from our current provider?",
        a: "Yes. Foxquart takes hosting over by running the environments in parallel and cutting over behind a load balancer with a tested rollback path. Handover includes documenting whatever was previously configured by hand, so the infrastructure stops depending on knowledge that walks out with the outgoing provider.",
      },
      {
        q: "Are we locked in if we want to leave?",
        a: "No. Foxquart is not a reseller, workloads run in your own AWS, Azure or GCP accounts, and environments are reproducible infrastructure as code rather than hand-built servers only we understand. If you move hosting in-house or to someone else, the code and documentation go with you.",
      },
      {
        q: "How do you keep the servers patched and secure?",
        a: "Foxquart applies security patching against hardening baselines as part of managed hosting, rather than when somebody remembers. Monitoring runs 24/7, incident response carries defined targets, and the monthly reliability report records what was patched. Restore drills verify the backups, so an incident does not turn into permanent data loss.",
      },
      {
        q: "What is in the monthly reliability report?",
        a: "The Foxquart reliability report covers what actually happened to your systems: incidents and how they were handled, patching applied, capacity planning, and cost optimisation or right-sizing findings. It exists so both the uptime and the cloud bill are explainable, rather than a monthly charge nobody in the business can account for.",
      },
    ],
  },
  {
    slug: "managed-devops",
    metaDescription:
      "Managed DevOps services delivering CI/CD pipelines, Kubernetes, infrastructure as code and observability. Ship weekly without one engineer holding the keys.",
    lastModified: "2026-08-16",
    title: "Managed DevOps Services",
    h1: "Managed DevOps For Teams That Ship Weekly",
    description:
      "CI/CD pipelines, Kubernetes, infrastructure as code and observability delivered as a managed service.",
    parent: "cloud-infrastructure",
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
        a: "Yes. Most Foxquart DevOps engagements run jointly with your in-house engineers, and we document and train as the work happens. The intended result is a team that can run its own pipelines and infrastructure afterwards, not a dependency, which is why every environment is reproducible infrastructure as code.",
      },
      {
        q: "Is Kubernetes always the answer?",
        a: "No, and Foxquart will say so when it is not. For many workloads, containers on a managed runtime are cheaper and simpler to operate, and simpler infrastructure fails less often. Kubernetes earns its place when you need autoscaling and rollout safety across many services, not by default.",
      },
      {
        q: "Can you document infrastructure nobody wrote down?",
        a: "Yes. Foxquart rebuilds hand-configured infrastructure as code, so environments become reproducible and documented instead of a server nobody dares touch. That also restores staging parity, which is what stops bugs from appearing only in production, and it removes the single point of failure of one engineer who remembers the setup.",
      },
      {
        q: "What happens when a deploy goes wrong?",
        a: "It gets caught or rolled back. Foxquart builds automated pipelines with quality gates before the deploy and rollout safety after it, so a bad release does not become an evening of debate. Metrics, logs and traces sit in one place, so what broke is answered from data rather than guessed at.",
      },
      {
        q: "Do you replace our existing pipelines or improve them?",
        a: "Whichever is cheaper to live with. Foxquart audits the existing pipelines first, hardens what works and replaces only what cannot be made reliable. The usual finding is manual deploys that a single engineer is willing to run, so automating that path with quality gates comes before any rebuild.",
      },
      {
        q: "Is managed DevOps a retainer or a project?",
        a: "Both, in sequence. Foxquart scopes and prices the setup work per phase after a fixed-price discovery, then ongoing cover runs as a retainer, because pipelines, clusters and observability need maintaining rather than installing once. Your team can take the estate over later, since everything is code and documented.",
      },
    ],
  },
  {
    slug: "web-scraping",
    metaTitle: "Web Scraping Services & Data Extraction",
    metaDescription:
      "Web scraping services at scale: resilient extraction, proxy rotation, deduplication, change detection and delivery by API. Get alerts when a source moves.",
    lastModified: "2026-08-16",
    title: "Web Scraping & Data Extraction Services",
    h1: "Web Scraping Pipelines That Keep Running",
    description:
      "Large-scale web scraping, browser automation and scheduled data extraction delivered as clean APIs and dashboards.",
    parent: "data-engineering",
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
        a: "Yes. Foxquart uses headless browser automation with Playwright and Puppeteer to reach content behind a login or rendered by JavaScript, where the source's terms permit it. The sites that resist simple requests are usually the ones holding the pricing and competitor data worth having, so this is routine rather than exceptional.",
      },
      {
        q: "How is the data delivered?",
        a: "Foxquart delivers extracted data as any combination of REST API, direct database sync, S3 export or BI dashboard, so it arrives where decisions are already made. Validation and deduplication run before delivery. Raw data dumped into a folder never becomes a decision, which is why most scraping projects quietly stop being used.",
      },
      {
        q: "Is web scraping legal?",
        a: "Foxquart collects publicly available data, respects rate limits, works within the source's terms and documents the sources behind every pipeline. That documentation is what makes the collection defensible later. Where a source's terms do not permit extraction, we say so rather than route around it and hand you the risk.",
      },
      {
        q: "What happens if a site blocks the scraper?",
        a: "Foxquart plans for it. Extraction runs with a proxy and rate strategy rather than hammering a source until it blocks, and monitoring raises an alert when a block or structure change breaks a run. Patching is covered under the maintenance agreement instead of arriving as a surprise invoice.",
      },
      {
        q: "How many sources can you extract from?",
        a: "Foxquart builds web scraping at scale, with scheduled extraction pipelines, proxy and rate strategy, and deduplication across sources. The practical ceiling is usually the sources' own terms and rate limits rather than the pipeline, so schedules are designed around what a site permits rather than what a server could technically request.",
      },
      {
        q: "What does a scraping project cost to run?",
        a: "Foxquart quotes no fixed price, because source count, refresh frequency and delivery format decide it. Discovery is fixed price and settles those, then delivery is scoped per phase or on retainer, with maintenance covering monitoring and patching. Data intelligence work of this kind targets margin gains of 2–9%.",
      },
    ],
  },
  {
    slug: "landing-page-development",
    metaTitle: "Landing Page Development Services",
    metaDescription:
      "Landing page development for paid traffic, with conversion copy, instant CRM routing and experiment tracking. Pages that load fast enough to keep the click.",
    lastModified: "2026-08-16",
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
        a: "A single Foxquart campaign landing page typically launches within 7–10 days, including the copy. That covers conversion-focused structure, sub-second first paint on mobile, lead routing and analytics wiring, so the page is ready for paid traffic on launch day rather than a shell that gets instrumented later.",
      },
      {
        q: "Do you write the copy?",
        a: "Yes. Foxquart writes landing page copy from customer interviews and the objections your sales team actually hears, rather than generic benefit statements. Copy and page structure are designed together, because a conversion-focused layout wrapped around vague messaging is exactly how paid traffic ends up on a page that reads as generic.",
      },
      {
        q: "Where do the leads from the form go?",
        a: "Straight into your systems. Foxquart routes landing page form submissions instantly into your CRM and Slack, so nobody re-keys them out of an inbox. Forms that leak leads before they reach sales are among the most expensive failures in paid acquisition, because that traffic has already been paid for.",
      },
      {
        q: "How do you know the new page converts better?",
        a: "Foxquart measures it rather than asserting it. A/B testing and event analytics are wired in at launch, so conversion changes are observed and the page keeps improving instead of being redesigned on opinion once a year. Conversion-engineered pages are scoped around a 1.5–3x lift.",
      },
      {
        q: "What does a landing page cost to build?",
        a: "Foxquart publishes no landing page price, because page count, copy research and integrations decide the number. A fixed-price discovery settles that scope, then delivery is priced per phase before it starts. From that point a single campaign page typically takes 7–10 days to reach launch.",
      },
      {
        q: "Can we launch more pages ourselves afterwards?",
        a: "Yes. Foxquart can model landing pages in a headless CMS with previews, so marketing ships variants without an engineering ticket, while performance budgets enforced in CI stop new pages from quietly getting slower. Code and infrastructure transfer to you, so nothing is rented back from us later.",
      },
    ],
  },
  {
    slug: "restaurant-software",
    metaTitle: "Restaurant POS Software Development",
    metaDescription:
      "Restaurant POS software development with kitchen display sync, recipe-level costing and multi-branch dashboards. Keeps selling when the internet drops out.",
    lastModified: "2026-08-16",
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
        a: "Yes. A Foxquart restaurant POS keeps taking orders offline and syncs automatically once the connection returns, so a dropped line does not stop service at the counter. Kitchen display sync resumes with it, which matters because the alternative during an outage is orders lost between the counter and the kitchen.",
      },
      {
        q: "Can it run on existing hardware?",
        a: "In most cases yes. Foxquart restaurant software runs on Android terminals and standard receipt printers, so hardware you already own usually stays in service. That keeps the cost of switching down and lets staff keep using terminals they already know while the software behind the counter changes.",
      },
      {
        q: "Can it integrate with delivery platforms and payments?",
        a: "Yes. Foxquart builds delivery platform and payment integrations into restaurant systems, so online orders reach the same kitchen display as counter orders and reconcile into the same sales reporting. Orders landing on a separate tablet nobody is watching is how tickets get missed during a rush.",
      },
      {
        q: "Does it give a single view across branches?",
        a: "Yes. Foxquart restaurant software reports sales and wastage across every branch in one place, instead of each outlet reporting separately. Recipe-level consumption is compared the same way across sites, which is what makes an outlier branch visible before it turns up in the monthly accounts.",
      },
      {
        q: "How does it help control food cost?",
        a: "By tracking consumption at recipe level. Foxquart restaurant software deducts ingredients per dish sold and costs them, so food cost is a live figure rather than something calculated once a month, if at all. Wastage dashboards sit alongside it, which is how loss is found while it is still recoverable.",
      },
      {
        q: "Can we switch from our current POS without closing?",
        a: "Yes. Foxquart migrates menu, recipe and historical sales data and reconciles it before cutover, and rollout runs in two-week increments so staff train on working software rather than on go-live day. Because the POS also runs offline, the switch does not depend on the connection holding.",
      },
    ],
  },
  {
    slug: "warehouse-software",
    metaTitle: "Warehouse Management System Development",
    metaDescription:
      "Warehouse management system development with bin-level accuracy, optimised pick paths, scan-verified dispatch and courier integrations. Cut walking per order.",
    lastModified: "2026-08-16",
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
        a: "No. Standard Android scanners or ordinary phones work with Foxquart warehouse software, and enterprise handhelds are supported as well. Hardware is rarely the constraint. What matters more is that receiving, picking and dispatch are scan-verified at all, because dispatch errors are otherwise discovered by the customer.",
      },
      {
        q: "Can it integrate with our ERP?",
        a: "Yes. Foxquart connects warehouse management to your ERP by API or scheduled sync, with reconciliation reporting so both systems agree on stock instead of drifting apart quietly. Reconciliation is the part usually skipped, and it is why warehouse and finance numbers stop matching within a quarter.",
      },
      {
        q: "Will it reduce picking time?",
        a: "That is the point of it. Foxquart warehouse software builds optimised pick paths and wave picking, so pickers stop walking the warehouse twice for one order. Bin and zone level stock accuracy is what makes that work, since a pick path is only as good as the system's confidence about where stock sits.",
      },
      {
        q: "Can it connect to couriers and marketplaces?",
        a: "Yes. Foxquart builds courier and marketplace integrations into warehouse management, so labels, tracking and marketplace orders move through the same system as picking and packing. Scan-verified packing sits in front of dispatch, so a wrong item is caught at the bench rather than by the customer.",
      },
      {
        q: "Can we go live without stopping dispatch?",
        a: "Yes. Foxquart runs warehouse rollouts in two-week increments and migrates stock data with reconciliation before cutover, so dispatch keeps running through the change. Inbound tracking and scan-verified picking usually switch on first, since that is where errors enter and where accuracy is easiest to prove early.",
      },
      {
        q: "How long does a warehouse rollout take?",
        a: "Weeks. A Foxquart warehouse management system covering nine warehouses for a national FMCG distributor took 14 weeks, including scanner workflows, transfer control and live dashboards. Stock accuracy reached 99.4%, around 740 hours a month were saved, and the order cycle shortened by 38%.",
      },
    ],
  },
  {
    slug: "manufacturing-erp",
    metaTitle: "Manufacturing ERP Software Development",
    metaDescription:
      "Manufacturing ERP software development covering bills of material, routing, work orders, downtime capture and quality checks. Know true cost per unit.",
    lastModified: "2026-08-16",
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
        a: "Where machines expose data, yes. Foxquart connects manufacturing ERP to shop-floor equipment over OPC-UA, Modbus or vendor APIs, so downtime and output are captured as they happen rather than reconstructed later. Where a machine exposes nothing, operators record the same events on the floor and the data model stays consistent.",
      },
      {
        q: "Discrete or process manufacturing?",
        a: "Both. Foxquart designs the data model around your production type instead of forcing discrete assembly logic onto a batch process or the reverse. That choice drives how BOM, routing, work orders and costing behave, which is why it is settled in discovery rather than discovered halfway through the build.",
      },
      {
        q: "How do operators record work on the shop floor?",
        a: "At the point of production. Foxquart manufacturing ERP captures work-order execution, machine downtime and quality checks on the floor as they happen, so live shop-floor status replaces production plans in spreadsheets and actuals on paper. Nothing waits for someone to type up the shift's paperwork afterwards.",
      },
      {
        q: "How do you calculate true cost per unit?",
        a: "From recorded consumption, not estimation. Foxquart manufacturing ERP ties BOM, routing and work-order execution to the material and time actually recorded on the floor, producing real cost per batch and per unit. Most manufacturers price against an estimate, which is how a product gets sold at a loss unnoticed.",
      },
      {
        q: "Does it track quality and non-conformance?",
        a: "Yes. Foxquart manufacturing ERP records quality checks at defined points in routing and tracks non-conformances against the batch and work order that produced them. Because costing uses the same records, the cost of rework and scrap becomes visible per batch instead of disappearing into a monthly variance figure.",
      },
      {
        q: "What does a manufacturing ERP actually change day to day?",
        a: "Visibility, mainly. Foxquart manufacturing ERP replaces spreadsheet plans and paper actuals with live shop-floor status, downtime capture and actual batch costing. Shop-floor ERP work of this kind is scoped around roughly 18% higher line utilisation, which comes from seeing downtime while it is happening rather than at month-end.",
      },
    ],
  },
  {
    slug: "healthcare-software",
    metaTitle: "Hospital Management Software Development",
    metaDescription:
      "Hospital management software development covering patient records, appointments, wards, pharmacy and billing, with audit trails built for regulatory review.",
    lastModified: "2026-08-16",
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
        a: "Foxquart healthcare systems ship with encryption at rest and in transit, strict role-based access, full audit trails and data residency of your choosing. Access is scoped by role rather than by shared logins, and every record view or change is logged, so who saw what is answerable rather than assumed.",
      },
      {
        q: "Can it integrate with lab or imaging systems?",
        a: "Yes, over HL7 or FHIR, or through vendor interfaces where a system offers no standard one. Foxquart connects lab and imaging into the unified patient record so results land against the patient rather than in a separate application, which is how history ends up scattered across paper and three systems.",
      },
      {
        q: "Can you migrate us off a legacy hospital system?",
        a: "Yes. Foxquart moved a regional hospital network off a legacy records system that failed nightly, onto containerised infrastructure with a high-availability database and observability, in 11 weeks. Migrations run in parallel with a tested rollback path, so clinical operations are never staked on a single cutover night.",
      },
      {
        q: "Does it reduce appointment no-shows?",
        a: "That is what the automated reminders are for. Foxquart healthcare systems handle appointment, ward and theatre scheduling and send reminders automatically instead of treating no-shows as unavoidable. Scheduling sits on the unified patient record, so a change updates one place rather than a diary, a phone list and a spreadsheet.",
      },
      {
        q: "Is the system ready for a regulatory audit?",
        a: "Foxquart designs the audit logging in healthcare systems for regulatory review rather than for debugging, so access, record changes and billing events trace back to a user and a time. Role-based access and data residency of your choosing are part of that design rather than settings bolted on later.",
      },
      {
        q: "Where is the system hosted and how reliable is it?",
        a: "Wherever your data residency requires, on infrastructure you control. Foxquart runs clinical systems on containerised infrastructure with monitoring, tested restore drills and defined incident response targets. The hospital network migration reached 99.98% measured uptime, cut page load by 72% and reduced infrastructure cost by 44%.",
      },
    ],
  },
  {
    slug: "school-erp",
    metaTitle: "School ERP Software Development",
    metaDescription:
      "School ERP software development covering admissions, attendance, timetables, fees, exams and a parent portal. Chase payments automatically, not by phone.",
    lastModified: "2026-08-16",
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
        a: "Yes. Foxquart school ERP handles multiple campuses with consolidated group reporting and per-campus permissions, so head office sees the group while each campus sees only its own students and staff. Fees, attendance and results roll up without every campus keeping a parallel spreadsheet to reconcile at term end.",
      },
      {
        q: "Is there a parent app?",
        a: "Yes. The Foxquart parent portal and app show attendance, fees, results and announcements in one place, updated in real time. That replaces attendance registers that never reach parents and fee follow-up handled by phone calls and memory, because a parent can see the position without the school chasing them.",
      },
      {
        q: "How does it improve fee collection?",
        a: "Through automated reminders and online payment. Foxquart school ERP issues fee reminders automatically and accepts payment online instead of leaving follow-up to phone calls and someone's memory. School ERP work of this kind is scoped around halving the fee collection cycle, largely by removing the delay between a due date and a reminder.",
      },
      {
        q: "Can we move our student records mid-session?",
        a: "Yes. Foxquart cleans, maps and migrates student, fee and attendance records, then reconciles them before cutover so balances and history are trusted from the first day on the new system. Rollout runs in increments, so a school can start with admissions and fees before moving exams across.",
      },
      {
        q: "Does it automate timetables and report cards?",
        a: "Yes. Foxquart school ERP automates timetables, exams and report cards, so results stop being compiled by hand every term. Because attendance, marks and fee status all sit in one system spanning admissions to alumni, a report card is generated from existing records rather than assembled from separate registers.",
      },
      {
        q: "Is student data kept secure?",
        a: "Foxquart school systems use role-based access, full audit trails and encryption in transit and at rest, with data residency of your choosing. Teachers, accounts staff and parents each see only their own scope, so the parent portal exposes one family's records rather than the whole register.",
      },
    ],
  },
  {
    slug: "api-development",
    metaTitle: "API Development & Integration Services",
    metaDescription:
      "API development and integration services: versioned REST or GraphQL endpoints, authentication, rate limits, webhooks plus developer docs. Open partner access.",
    lastModified: "2026-08-16",
    title: "API Development Services",
    h1: "API Development And System Integration",
    description:
      "REST, GraphQL and event-driven API development with versioning, documentation and rate limiting.",
    parent: "data-engineering",
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
        a: "It depends on the consumer, and Foxquart often ships both. REST suits external partners, who want predictable versioned endpoints and clear documentation. GraphQL suits internal product surfaces that need to fetch varied shapes without a new endpoint per screen. The choice is made per consumer rather than as a house style.",
      },
      {
        q: "Can you expose data from a legacy system?",
        a: "Yes. Foxquart wraps legacy databases and services behind a clean, versioned API layer, so consumers integrate against a stable contract instead of reaching into an old system directly. That also makes the legacy system replaceable later, because the contract stays the same even when what sits behind it changes.",
      },
      {
        q: "How do you avoid breaking partner integrations?",
        a: "With versioning and documentation from the first release. Foxquart ships versioned APIs, so an existing partner integration keeps working when a new version lands and changes arrive as a new version rather than a silent alteration. Unversioned, undocumented APIs are why integrations break constantly and nobody can explain when.",
      },
      {
        q: "How is the API secured?",
        a: "Foxquart builds authentication, rate limiting and usage analytics into every API rather than adding them after an incident. Rate limiting protects the systems behind the API from one misbehaving consumer, and usage analytics show who is calling what, so an unusual pattern is visible rather than discovered on a bill.",
      },
      {
        q: "Do partners get documentation and a sandbox?",
        a: "Yes. Foxquart ships developer documentation and a partner sandbox alongside the API, so a partner integrates and tests without waiting on your engineers or being handed production credentials. Partners waiting weeks for data access is usually a documentation problem rather than a technical one.",
      },
      {
        q: "Can you replace our one-off integration scripts?",
        a: "Yes, and that is a common starting point. Foxquart replaces one-off scripts nobody maintains with versioned, documented APIs and event-driven sync built on webhooks and queues. Scripts fail silently and keep their logic in one person's head, whereas a documented API layer is something a team can actually operate.",
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

/** Real, founder-confirmed profiles. Rendered in the footer and emitted as
 *  Organization sameAs so knowledge graphs merge the entity correctly. */
export const SOCIAL_LINKS = [
  { name: "X", url: "https://x.com/Foxquart" },
  { name: "Instagram", url: "https://www.instagram.com/foxquart/" },
] as const;
