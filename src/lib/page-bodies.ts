/**
 * Long-form body copy for the six service pages and seventeen solution pages.
 *
 * Why this exists: the templated bullet grids left those 23 pages at roughly
 * 140-200 unique visible words each. Seventeen near-identically structured
 * solution pages at that depth is the pattern scaled-content systems look for,
 * and it gives answer engines nothing quotable. Each section below is written to
 * stand alone at 40-60 words so a passage survives being extracted away from the
 * page.
 *
 * Kept out of `site-data.ts` deliberately: that file is the taxonomy and is read
 * by the sitemap, the nav, the footer and the JSON-LD builders. Prose does not
 * belong in the same module as the routing data.
 *
 * The "What goes wrong" section is the differentiator. Almost no studio site
 * publishes its own failure modes, which is exactly why it gets cited. Every
 * figure used traces to an existing value in `site-data.ts`; nothing is invented.
 */

export type BodySection = { heading: string; text: string };

/** Keyed by service or solution slug. Pages without an entry render nothing. */
export const pageBodies: Record<string, BodySection[]> = {
  // ---------------------------------------------------------------- services

  "ai-automation": [
    {
      heading: "What actually breaks",
      text: "The failure is not that people are slow. It is that the work lives in the gaps between systems. An order arrives by email, someone reads it, types it into the CRM, then types it again into accounting. A lead form fires after hours and nobody sees it until morning. An approval waits three days because the request sits in one person's inbox. None of this appears in any report, because the only record of the work is the person doing it.",
    },
    {
      heading: "How we build it",
      text: "We trace one process end to end and record where every field comes from and where it lands. That map becomes the data contract. Automation runs on self-hosted n8n, with Postgres holding the state a workflow cannot afford to lose and Redis handling queues and rate limits, so a burst of inbound mail does not fan out into an equal number of concurrent API calls. Where a step needs judgement, a model is called through LangChain against a strict output schema, so it returns a typed object rather than prose. Failures retry with backoff, then land in a dead-letter queue that raises an alert instead of disappearing.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "The common failure is not technical. It is that the documented process and the real process differ, and the difference only surfaces once the automation is live and someone says we never actually do it that way in December. Second, source systems have undocumented limits, or a CRM field three teams use for three different things. Third, automation makes exceptions visible, and the volume of exceptions is almost always higher than anyone expected.",
    },
    {
      heading: "What changes after",
      text: "The work still happens, but nobody types it twice. Approvals move because the system chases them. When something fails, an alert fires before a customer notices. And you get a number for how long each process takes, which is usually the first time anyone has had one.",
    },
  ],

  "custom-software-development": [
    {
      heading: "What actually breaks",
      text: "The packaged system handles most of the process, and the rest moves into spreadsheets. There is a master sheet one person maintains, a second sheet finance keeps because the first is missing a column, and a WhatsApp group where the actual decisions get made. Reports are assembled by exporting from three places and pasting into a fourth. Nobody trusts a number until they have asked the person who owns the sheet.",
    },
    {
      heading: "How we build it",
      text: "The first artefact is a data model, not a screen. We model the entities your business actually argues about, an order, a job, a batch, a patient, a site, and decide early which are immutable records and which are mutable state, because getting that wrong is what makes audit trails impossible later. Schemas live in PostgreSQL with real constraints and foreign keys, not validation that exists only in application code. The API layer is TypeScript on Node.js, with Go where throughput justifies it. React front ends are built per role, so a warehouse supervisor and a finance controller do not share one overloaded screen.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Scope is not the usual killer. Undocumented exceptions are. Every business has rules nobody writes down: the customer invoiced differently, the branch that closes stock a day early, the approval skipped when the director is travelling. These surface during rollout, not discovery. The other recurring problem is legacy data. Migrated records are never as clean as the team believes, and reconciliation before cutover regularly takes longer than building the feature that consumes it.",
    },
    {
      heading: "What changes after",
      text: "One system holds the record, and reports come out of it instead of being assembled. Each role sees its own view. The audit trail exists because the schema was designed for it rather than bolted on. Operational systems of this kind typically pay back in 8–14 months.",
    },
  ],

  "cloud-infrastructure": [
    {
      heading: "What actually breaks",
      text: "Deployment is a person. One engineer connects to a box on a Friday evening, runs a script that lives on their laptop, and watches the logs. Nobody else will do it. The staging environment was configured by hand and has drifted since, so bugs appear only in production. Backups run nightly and have never been restored, which makes them untested files rather than backups. Outages are reported by customers, because no alert fires first.",
    },
    {
      heading: "How we build it",
      text: "Infrastructure gets described in Terraform before anything is rebuilt, so the current state is written down and reviewable rather than discovered by clicking through a console. Workloads move into Docker images with pinned base layers, then onto Kubernetes or a managed container runtime, whichever the workload actually justifies. Pipelines build once and promote the same artefact through environments instead of rebuilding per stage. Monitoring covers saturation, error rate, latency and queue depth, with alerts routed to a person rather than a dashboard nobody watches. Restore drills are scheduled, because a restore that has not been run does not count.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Migrations are rarely blocked by the migration. They are blocked by the one service with a hardcoded IP, a licence pinned to a MAC address, or a cron job on a server nobody has logged into since the person who wrote it left. Cost is the other surprise: containerising a workload that was oversized on its old host often proves it was oversized, and right-sizing is a negotiation rather than a switch.",
    },
    {
      heading: "What changes after",
      text: "Deploys take minutes and any engineer can run one. Failures page the team before customers notice, and restores are something you have watched work. Measured uptime on managed infrastructure runs at 99.98%, and right-sizing typically brings infrastructure spend down 40–60%.",
    },
  ],

  "data-engineering": [
    {
      heading: "What actually breaks",
      text: "Someone in pricing opens competitor pages every Monday and types the numbers into a sheet. By the time it circulates, half the prices have moved. Market data arrives as a PDF once a quarter. Where a scraper does exist, it was written once, it broke months ago, and the sheet it feeds has been quietly returning last-known values ever since, which is worse than no data because people still act on it.",
    },
    {
      heading: "How we build it",
      text: "Extraction runs in Python, with Playwright or Puppeteer driving a real browser only where a source genuinely needs rendered JavaScript or an authenticated session. Every source gets a schema, and every record gets a fetch timestamp and a source URL, so a number in a dashboard can always be traced back to the page it came from. Raw payloads land before parsing, so a selector change can be replayed against stored responses instead of re-crawling. Parsed rows go into PostgreSQL with deduplication and change detection, so you see what moved rather than a full snapshot daily.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Sources change without warning, and they usually change silently rather than by returning an error. A layout tweak produces a page that parses cleanly to the wrong value, which is why validation rules matter more than parser cleverness: price within a plausible band, required fields non-empty, row count within tolerance of yesterday. Rate limits and blocking escalate over time, so a pipeline proven at low volume is not proven at scale.",
    },
    {
      heading: "What changes after",
      text: "Pricing and market data arrive on a schedule, with a timestamp and a source you can check. When a source breaks, an alert fires instead of a stale number propagating. Decisions get made on this week's data rather than last quarter's, which is where margin gains of 2–9% come from.",
    },
  ],

  "enterprise-websites": [
    {
      heading: "What actually breaks",
      text: "Marketing cannot change a headline without filing a ticket. The page takes several seconds to become readable on a mid-range Android phone because it loads a stack of analytics scripts, a chat widget and a font that arrives after the text. Product pages are not indexed because they render client-side and the crawler saw an empty shell. Every campaign gets a new page built by copying the last one, so nobody knows which is canonical.",
    },
    {
      heading: "How we build it",
      text: "Pages are server-rendered, so the HTML a crawler receives already contains the content. Content lives in a headless CMS as modelled fields rather than a rich-text blob, which is what makes a page editable without letting an editor break the layout. Structured data is generated from the same fields the page renders, so JSON-LD cannot drift away from the visible copy. Assets serve through Cloudflare with immutable hashing, fonts are self-hosted and preloaded, and a performance budget runs in CI, so a page that regresses its Largest Contentful Paint fails the build rather than shipping.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Third-party scripts are where performance goes to die, and they are usually added after launch by someone outside engineering. A budget in CI catches your code, not a tag manager. Migrations are the other risk: redirects that miss a long tail of old URLs cost rankings that take months to recover, so the redirect map gets built from server logs and search console data rather than from the sitemap alone.",
    },
    {
      heading: "What changes after",
      text: "Marketing edits and publishes without engineering. Pages load in under a second on mobile, crawlers see real HTML, and the structured data matches what is on the page. Measured conversion lift on rebuilt pages runs 1.5–3x.",
    },
  ],

  "mobile-applications": [
    {
      heading: "What actually breaks",
      text: "The field team reports on paper, on WhatsApp, or by calling the office. A delivery is confirmed by a photo in a group chat that scrolls away. Job sheets get filled in at the end of the day from memory, so timestamps are approximate and disputes are unwinnable. The office finds out what happened on site a day later, and the person keying it into the system is the same person trying to schedule tomorrow.",
    },
    {
      heading: "How we build it",
      text: "The design starts from connectivity, not screens. Data a technician needs is cached on the device, writes land in a local queue first, and the app stays usable with the radio off, because a basement, a warehouse aisle and a rural site all behave the same way. Every record carries a client-generated ID and a device timestamp, so a job submitted twice on reconnect does not become two jobs. Apps are React Native with Expo in TypeScript, sharing types with the Node.js backend so a schema change breaks the build instead of the field team.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Adoption, usually. An app that takes eleven taps to log a job loses to WhatsApp, so screen count is a design constraint rather than a detail. Devices are the second problem: field hardware is old, storage is full, and battery policy on some Android builds kills background sync. Third, offline sync surfaces data quality issues that paper hid, because paper never told anyone two people had closed the same job.",
    },
    {
      heading: "What changes after",
      text: "The office sees work as it is completed, with a timestamp and a location instead of a recollection. Paper reporting stops. Job cycles typically run 25–45% faster, mostly because the handoff between field and office disappears.",
    },
  ],

  // --------------------------------------------------------------- solutions

  "inventory-management-software": [
    {
      heading: "What actually breaks",
      text: "The stock figure is a spreadsheet, and the spreadsheet is a snapshot of a count that finished on Tuesday. Goods move between branches on a message and get deducted from one location without ever being added to the other. Sales are made against stock that has already gone. Dead stock is discovered during an annual count, long after the money was tied up in it.",
    },
    {
      heading: "How we build it",
      text: "The core decision is that stock is not a number on a product; it is the running total of movements. Every receipt, transfer, sale, adjustment and return is written as an immutable movement row against a location and, where relevant, a bin, batch or serial. Current quantity is derived from those rows, so it can always be explained. Transfers are modelled in two legs with an in-transit state, which is what stops units vanishing between branches. Reorder points run against consumption over a rolling window rather than a fixed minimum, and generate a draft purchase order for a human to approve.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "The opening balance. Almost every rollout stalls on the first physical count, because the existing data disagrees with the shelf and someone has to decide which is right before the system can be trusted. Expect a cycle-count period rather than a clean switch. The second issue is unit of measure: a supplier sells cases, the floor picks singles, and if the conversion is not modelled explicitly the numbers drift again within weeks.",
    },
    {
      heading: "What changes after",
      text: "Stock is live, and every number traces back to a movement with a time and a person against it. Transfers reconcile instead of leaking. Reorders happen before a stockout rather than after a complaint. A production rollout for a single-site operation typically takes 6–10 weeks.",
    },
  ],

  "erp-development": [
    {
      heading: "What actually breaks",
      text: "Month-end takes two weeks, and most of it is one person reconciling exports. Sales sits in a CRM, stock in a spreadsheet, purchases in email and payroll with an external accountant, so any question crossing two of them becomes a manual exercise. The same customer exists three times under different spellings. A previous ERP attempt is still half-implemented, and the workaround has been the real process for years.",
    },
    {
      heading: "How we build it",
      text: "The scope question comes first, and the answer is honest: if a packaged ERP fits about 80% of your process we implement and extend it instead of rebuilding it. Where custom is the right call, the ledger is the foundation. We model the chart of accounts, document numbering and posting rules before any screen exists, because retrofitting double entry into a system built around forms does not work. Master data is unified first, with one canonical record and a deduplication pass. Modules then roll out one department at a time, each with its own go-live and cutover balance.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Big-bang go-lives fail for the same reason every time: the volume of small unrecorded rules is larger than the plan allowed for, and when everything cuts over at once there is no fallback. Modular rollout costs more in integration work and is still the safer trade. The other predictable problem is migration. Legacy data needs cleaning only your team can do, because only your team knows which of three duplicate suppliers is real.",
    },
    {
      heading: "What changes after",
      text: "One record per customer, supplier and item. Close moves from a two-week reconciliation to a review. Management reporting is live rather than a monthly PDF, and every approval has a name and a timestamp behind it.",
    },
  ],

  "crm-development": [
    {
      heading: "What actually breaks",
      text: "Leads arrive from a website form, a marketplace, WhatsApp, a phone call and a trade show list, and each channel lands somewhere different. A lead that arrives on Friday evening is contacted on Monday afternoon, by which time the buyer has already spoken to someone else. Pipeline is reported from memory in the Monday meeting. When a salesperson leaves, their conversation history leaves with their inbox.",
    },
    {
      heading: "How we build it",
      text: "Capture comes before pipeline. Every channel terminates into one intake with a source tag, deduplicated on phone and email, and assigned by a rule you can read rather than by whoever notices first. Stages are modelled with explicit entry criteria, because a stage that means different things to different reps makes forecasting arithmetic on noise. Scoring runs on observed activity, replies, site visits and quote requests, not on a static form field. Reporting is built on stage transition timestamps, which is what makes cycle time measurable at all.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "CRM projects fail on data entry, not on features. If logging a call takes longer than making one, the data rots and the forecast goes back to being an opinion, so we cut required fields to the minimum the report actually needs and capture the rest automatically. The second failure is scoring: a model fitted to a sales team's historical behaviour will reproduce its biases, so scores are shown alongside the signals behind them.",
    },
    {
      heading: "What changes after",
      text: "Every lead lands in one place with an owner and a clock running. The forecast comes from stage timestamps instead of the Monday meeting. Conversation history survives staff changes, and quotes go out with the right price on them.",
    },
  ],

  "n8n-automation-services": [
    {
      heading: "What actually breaks",
      text: "The workflows exist, and that is the problem. They were built in the editor by whoever needed them, they run on a single instance, and there is no staging, so the way to test a change is to change production. When one fails at 2am it fails silently, because the error branch was never wired, and the first sign is a customer asking where their invoice is. Credentials are attached to one person's account.",
    },
    {
      heading: "How we build it",
      text: "Workflows become deployable artefacts, not editor state. n8n is self-hosted in Docker with Postgres as the execution store and Redis behind queue mode, so long-running and bursty workflows do not block each other on one process. Workflow JSON is exported into Git, so a change is a diff and a rollback is a revert. Each workflow gets the same spine: an error trigger routing to a dead-letter table and an alert channel, retry with backoff on external calls, and idempotency keys on anything that writes downstream so a retry cannot double-post.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "n8n is easy to start and easy to sprawl. The usual state we are handed is a sprawl of workflows, some duplicated, several superseded, and a handful nobody will admit to owning; auditing them often takes longer than rebuilding them. Version upgrades are the second issue, since node behaviour occasionally changes between releases and an untested upgrade breaks quietly. Third, self-hosting is cheaper at volume, but it is now infrastructure you own.",
    },
    {
      heading: "What changes after",
      text: "You can see what ran, what failed and what was skipped. Failures alert instead of vanishing, and a retry does not duplicate an invoice. The estate is documented and in version control, so it survives the person who built it.",
    },
  ],

  "ai-agent-development": [
    {
      heading: "What actually breaks",
      text: "The pilot worked. A model read a handful of invoices in a demo and everyone was impressed. Then it met the real post bag: scanned at an angle, stapled, a handwritten amendment in the margin, a supplier who changed their template without telling anyone. Accuracy that looked like a solved problem becomes a queue of corrections, and the team quietly goes back to typing.",
    },
    {
      heading: "How we build it",
      text: "Nothing goes straight from model to system of record. Documents are classified first, then extracted against a per-type schema, and every field returns with a confidence value. Fields above threshold post automatically; anything below routes to a review screen where a human corrects the value, and the correction is stored as labelled data rather than discarded. Knowledge assistants are retrieval-grounded against your own documents with the source passage shown next to the answer, so an answer that cannot cite anything becomes a refusal instead of a guess.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "The evaluation set is the work nobody budgets for, and skipping it means quality is an anecdote. Second, edge cases are not rare in aggregate: individually unusual document formats add up to a meaningful share of volume, and the review queue has to be staffed for that rather than treated as a temporary state. Third, providers change models, and a prompt tuned to one version can behave differently on the next.",
    },
    {
      heading: "What changes after",
      text: "Documents post themselves when the model is confident and get reviewed when it is not, with exceptions visible instead of hidden. Support questions are answered from current material with the source attached. Quality becomes a number you can watch rather than a feeling.",
    },
  ],

  "business-process-automation": [
    {
      heading: "What actually breaks",
      text: "Nobody can tell you how long a process takes. A purchase requisition goes from a form to an email to a manager, sits, gets forwarded to finance, sits again, and is approved days later; those days are invisible, because there is no record of when it entered each stage. The same customer detail is typed by sales, then again by operations, then again by billing.",
    },
    {
      heading: "How we build it",
      text: "Discovery runs two weeks and produces measurements, not a diagram. We sit with the people doing the work, record the actual sequence including the parts nobody documents, and estimate hours consumed per process per month. Processes are ranked on hours consumed against automation feasibility, and we start where that ratio is best rather than where the politics point. Implementation targets handoffs first, because that is where the time goes: the point where work leaves one department becomes a queue with a timestamp, an owner and an escalation.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Automating a bad process makes it faster and still bad, so some processes need changing before they are automated, and that is a decision for your team rather than ours. Resistance is real where automation is read as measurement of individuals, which is why we report on process timings rather than person timings. And the baseline has to be captured before anything changes; teams that skip it can never prove the saving afterwards.",
    },
    {
      heading: "What changes after",
      text: "Each process has a measured duration, before and after. Handoffs stop waiting on someone remembering. Exceptions become a visible queue instead of a backlog. Savings are reported against the baseline that was captured first.",
    },
  ],

  "cloud-hosting": [
    {
      heading: "What actually breaks",
      text: "The first person who knows the site is down is a customer. Monitoring is a check on whether the homepage returns 200, which it does, while the checkout queue has been stuck for an hour. Backups run and nobody has restored one, so the restore time is unknown and possibly infinite. The cloud bill grows every month and the line items map to nothing anyone recognises.",
    },
    {
      heading: "How we build it",
      text: "Monitoring starts from what the business would notice, not from CPU. We define checks on the transactions that matter, an order completing, a job queue draining, a scheduled sync finishing, and alert on those, with infrastructure metrics as the diagnosis layer underneath. Backups get a documented recovery point and recovery time objective, and a restore runs on a schedule into an isolated environment and is verified, because a backup that has not been restored is a file. Cost work is a right-sizing review against observed usage, with tagging so every line item maps to a system and an owner.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Alert fatigue is the biggest risk to a monitored system. Too many alerts and the real one gets muted along with the noise, so thresholds are tuned and low-value alerts are deleted rather than tolerated. Second, a response target is only meaningful if someone can act, which means runbooks and access have to exist before the incident. Third, cost optimisation has a floor: past a point, further savings mean accepting less redundancy.",
    },
    {
      heading: "What changes after",
      text: "Failures are detected by the system, and critical incidents are acknowledged within 15 minutes on the 24/7 plan. Restores are something the team has watched work rather than assumed. The cloud bill breaks down by system, and the instances nobody could explain are gone.",
    },
  ],

  "managed-devops": [
    {
      heading: "What actually breaks",
      text: "One engineer owns deployment, and that engineer is the constraint. Releases cluster on Thursday evening because that is when they can be watched. Staging exists but has drifted, so it proves nothing, and bugs are found by production traffic. Infrastructure was configured by hand, which means the only record of how it works is in someone's memory and a console. Rolling back means restoring a database and hoping.",
    },
    {
      heading: "How we build it",
      text: "Environments are defined in Terraform and rebuilt from that definition, which is the only way staging stays comparable to production. Pipelines build the artefact once and promote it: the container that passed tests is the container that reaches production. Quality gates run tests, type checks, dependency and container scanning and a migration check, and a failing gate blocks promotion rather than warning about it. Database migrations are separated from application deploys and written to stay backwards compatible for one version, because that is what makes rollback possible at all.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Kubernetes is not always the answer, and choosing it by default adds an operational surface a small team cannot carry; for many workloads, containers on a managed runtime are cheaper and simpler, and we will say so. Second, the migration path is where rollback promises break, because application code rolls back and schema changes do not. Third, slow pipelines get bypassed, so pipeline speed is a reliability feature.",
    },
    {
      heading: "What changes after",
      text: "Any engineer can deploy, on any day, because the pipeline handles the risky parts. Staging tells you something because it is built from the same definition. When a release goes wrong it stops at a health check instead of at a customer.",
    },
  ],

  "web-scraping": [
    {
      heading: "What actually breaks",
      text: "Competitor pricing is gathered by a person with a folder of browser tabs, every Monday morning. It takes half a day, it covers the products someone remembered, and it is out of date before the meeting. Where a scraper exists, it was a script on a laptop; it broke when a class name changed, and the spreadsheet it feeds has been showing the same numbers ever since. Nobody noticed, because a stale number looks exactly like a current one.",
    },
    {
      heading: "How we build it",
      text: "Fetching and parsing are separated. The fetch layer stores the raw response with its URL, status and timestamp; the parse layer runs against that store. When a site changes, we replay the new parser over historical responses instead of re-crawling, which turns a breakage into a fix rather than a re-collection. Requests use a proxy pool with per-domain concurrency and rate limits set below anything that would degrade the source. Validation runs on every batch: expected row counts, required fields, value ranges.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Silent failure is the real risk, and it is almost never an exception. A page changes and the parser cleanly extracts the wrong element, so the pipeline reports success while the data is wrong, which is why range and count validation matters more than error handling. Blocking escalates with volume. And some sources are off limits under their terms or applicable law, so we check first and decline the ones that do not pass.",
    },
    {
      heading: "What changes after",
      text: "Data arrives on a schedule, validated, with a timestamp and a source URL behind every row. Changes are highlighted rather than buried in a full export. When a source breaks, an alert fires the same day and the fix is a parser change instead of a lost month.",
    },
  ],

  "landing-page-development": [
    {
      heading: "What actually breaks",
      text: "The ad is good and the page is not. Paid traffic lands on a page built from the corporate template, which loads a slider, a chat widget and a font that arrives late, so on a mid-range phone over mobile data the visitor sees a blank area before anything readable. The message on the page does not match the ad they clicked. The form asks for everything anyone ever wanted, and submissions arrive as email to a shared inbox, where they wait.",
    },
    {
      heading: "How we build it",
      text: "The page is built as a single-purpose document, server-rendered, with content in the initial HTML and no client-side fetch between arrival and first read. Scripts are budgeted: analytics loads deferred, nothing third-party blocks rendering, images are sized and served in modern formats, and the font is self-hosted and preloaded so text does not arrive twice. Copy is structured around the objections your sales team actually hears, in the order a buyer raises them. The form asks only for what routing requires, then posts straight into your CRM.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Most pages do not have the traffic to resolve an A/B test quickly, so testing a button colour wastes the traffic you have. Test offers and headlines, and accept that some results will stay inconclusive. Second, tracking is where the numbers quietly break: a form that fires its conversion event before the submission is confirmed will report leads that never arrived. Third, a fast page cannot fix a mismatched offer.",
    },
    {
      heading: "What changes after",
      text: "The page is readable before the visitor decides to leave. Leads reach an owner immediately instead of an inbox. You have an event stream that shows where people stop, so the next version is a change with a reason behind it.",
    },
  ],

  "restaurant-software": [
    {
      heading: "What actually breaks",
      text: "Orders are called across the pass, and on a full Saturday one gets lost between the counter and the kitchen. A modifier such as no onions is remembered rather than printed. Food cost is calculated at month-end from purchase invoices divided by sales, which tells you the margin moved but not where or why. Wastage is a number someone estimates. With two or three branches, the group has separate reports and no consolidated view.",
    },
    {
      heading: "How we build it",
      text: "The POS is built to keep selling when the internet does not. Orders, payments and shifts write to local storage first and sync when the link returns, with sequence numbers per terminal so two tills cannot mint the same bill number. Orders route to the kitchen display by station, so cold, grill and pass see only their own tickets. Recipes are modelled to ingredient level with yields and modifiers, which is what makes consumption theoretical rather than guessed: every sale deducts the ingredients it should have used, and the variance against actual stock is the wastage number.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Recipe data is the bottleneck, and it is your team's work: someone has to specify yields and portion sizes honestly, and until that exists, food cost stays an estimate. Second, offline resilience covers the till but not the card terminal, which needs its own fallback procedure agreed with your payment provider. Third, a kitchen used to paper tickets will not switch mid-service, so rollout runs alongside the existing process for a period.",
    },
    {
      heading: "What changes after",
      text: "Orders reach the right station with their modifiers and a clock on them. Food cost is computed from recipes and sales continuously, so variance shows up in days rather than at month-end. Branches report into one view, and the POS keeps trading through an outage.",
    },
  ],

  "warehouse-software": [
    {
      heading: "What actually breaks",
      text: "A picker walks the same aisle twice for one order, because the pick list is in the order the customer typed it rather than the order the warehouse is laid out in. Inbound pallets sit in receiving for a day before anyone counts them, so the stock exists physically but not in the system and sales cannot sell it. Packing is verified by eye, which means a missing or substituted line is found by the customer.",
    },
    {
      heading: "How we build it",
      text: "Location is the primary entity. The warehouse is modelled as zones, aisles and bins with a defined sequence, and every unit of stock has a bin rather than just a site. Picking is generated against that sequence, so a route is walked once, and wave picking groups by zone rather than by order. Receiving is a scan-based process against the purchase order, with putaway suggested by existing stock location and velocity. Packing is scan-verified line by line and cannot be closed on a mismatch.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "The bin map is the hard part, and it is physical work: locations have to be labelled, sequenced and correct before software helps, and this is consistently underestimated. Second, scanner ergonomics matter more than they sound, because a workflow with one extra tap per line costs real hours across a shift and gets bypassed. Third, pick optimisation depends on accurate item dimensions and velocity data, which most operations do not have on day one.",
    },
    {
      heading: "What changes after",
      text: "Stock is accurate to the bin, so picking stops involving a search. Inbound goods become sellable when they are received rather than when someone gets to them. Dispatch errors are caught at the packing bench instead of by the customer.",
    },
  ],

  "manufacturing-erp": [
    {
      heading: "What actually breaks",
      text: "The production plan is a spreadsheet the planner rebuilds every Monday, and the actuals are on paper on the shop floor, keyed in later if at all. A machine stopping mid-shift is recorded as a line in a logbook, so downtime is only visible at the monthly review, by which point the cause has been forgotten. Scrap is an estimate. Cost per unit is standard cost plus a guess.",
    },
    {
      heading: "How we build it",
      text: "The bill of materials and routing come first, because everything else derives from them. A BOM is versioned with effective dates, since a component change next month must not rewrite the cost of a batch produced last month. Work orders are exploded into operations routed across work centres, and each operation records start, stop, quantity good and quantity scrapped, captured at the machine rather than transcribed later. Downtime is booked against a reason code at the moment it happens, which is the only way that data stays honest.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Shop-floor data capture is where these projects live or die. If booking an operation interrupts the work, it gets done in a batch at the end of the shift and the timestamps become fiction, so terminals, scanners and screen design matter as much as the ERP. Second, the documented BOM and what the line actually consumes often differ. Third, machine integration is only as good as what the machine exposes.",
    },
    {
      heading: "What changes after",
      text: "Plan and actual sit in the same system, so schedule adherence is visible during the week rather than after it. Downtime is attributed to a reason while the reason is still known. Cost per batch and per unit accumulates from booked material, labour and machine time.",
    },
  ],

  "healthcare-software": [
    {
      heading: "What actually breaks",
      text: "A patient's history sits in three places: a paper file in records, a legacy system the front desk uses, and a spreadsheet the lab keeps. The clinician sees whichever arrives in time. Appointments are booked by phone, no-shows are unpredictable because there are no reminders, and the slot goes empty. Billing is reconciled by hand at night. And when someone asks who viewed a record, there is no way to answer.",
    },
    {
      heading: "How we build it",
      text: "The patient record is the anchor, and identity resolution is the first problem: one patient, one identifier, with a matching and merge process for the duplicates that already exist. Clinical data is written append-only, so a correction is a new versioned entry with an author and a reason and nothing is silently overwritten. Access is role-based and enforced at the data layer, with every read as well as every write logged, because regulatory review asks who looked, not only who changed. Lab and imaging integrate over HL7 or FHIR where the vendor supports it.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Duplicate patient records are the recurring problem, and past a point they cannot be resolved automatically; a clinical decision on merging is required and it needs a named owner. Second, integration with legacy lab or imaging vendors is often the longest item on the plan, because the interface is undocumented or licensed separately. Third, clinicians will not use a system that adds clicks during a consultation.",
    },
    {
      heading: "What changes after",
      text: "One record per patient, visible to the people entitled to see it and logged when they do. Appointments confirm and remind themselves. Dispensing moves stock, and billing reconciles from the same data the clinic recorded. Audit questions have answers.",
    },
  ],

  "school-erp": [
    {
      heading: "What actually breaks",
      text: "Fee follow-up is a phone call from the office, made from a list, from memory of who promised what. Attendance is taken on a register that reaches the parent only if there is a problem, and often not then. Exam results are compiled at the end of term by teachers filling sheets that someone merges. Admissions enquiries arrive by phone and WhatsApp and are tracked on paper. And the accountant's fee ledger and the office's fee list disagree.",
    },
    {
      heading: "How we build it",
      text: "The student record runs the whole lifecycle, from enquiry through admission, promotion between classes and eventually alumni, with class and section as a time-bound assignment rather than a field overwritten each year, which is what makes historical reporting possible at all. Fees are structured as a plan with heads, concessions, instalments and due dates per student, so a discount is recorded rather than applied by hand; reminders escalate automatically before the due date, and online payment writes the receipt into the ledger in one transaction.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Adoption sits with teachers, and teachers have no spare time, so anything that adds work after class will not be done consistently; entry has to happen during the period, on a phone, in under a minute. Second, the fee structure is always more complicated than the first description, with sibling concessions, staff wards, mid-year joiners and transport slabs. Third, parent app adoption depends on the school treating it as the channel.",
    },
    {
      heading: "What changes after",
      text: "Fee reminders go out on schedule and payments reconcile to the ledger without a second list. Parents see attendance and results the day they exist. Report cards compile from marks entered once. Admissions enquiries stay in a pipeline with a follow-up owner.",
    },
  ],

  "api-development": [
    {
      heading: "What actually breaks",
      text: "Every integration is a script. One syncs orders on a cron, one was written by a contractor years ago, and one runs on a developer's machine. None are documented, so a change to an underlying table breaks something in a different department days later. Partners who want data are told to wait for a developer, then sent a CSV by email. There is no versioning, so every change is a breaking change.",
    },
    {
      heading: "How we build it",
      text: "The contract comes before the code. Endpoints are specified in OpenAPI or a GraphQL schema, reviewed with the actual consumers, and the specification generates both the documentation and the client types, so docs cannot drift from implementation. Versioning is explicit in the path, with a deprecation policy and usage analytics that show who is still on an old version before it is retired. Writes are idempotent on a client-supplied key, because retries happen. Legacy systems are wrapped rather than exposed, so consumers depend on the contract and not the schema.",
    },
    {
      heading: "What goes wrong on these projects",
      text: "Once an API has consumers, it is permanent. Field names, nullability and enum values that felt provisional become things you cannot change, so the review before the first release is worth more than any refactor after it. Second, wrapping a legacy system frequently reveals that the underlying data does not support the clean contract everyone wants. Third, partner integration timelines depend on the partner.",
    },
    {
      heading: "What changes after",
      text: "Consumers integrate from documentation and a sandbox instead of a phone call. Changes ship behind a version with a deprecation window rather than breaking someone quietly. You can see who is calling what and how often. One-off scripts stop being infrastructure.",
    },
  ],
};
