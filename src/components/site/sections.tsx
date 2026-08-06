import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  X,
  ChevronDown,
  ShieldCheck,
  Gauge,
  Layers,
  Cpu,
} from "lucide-react";
import { Counter, Eyebrow, GlassPanel, Reveal, Section, SectionHeading } from "./ui";
import { caseStudies, industries, products, services } from "@/lib/site-data";

export function SocialProof() {
  const stats = [
    { v: <Counter to={140} suffix="+" />, l: "Systems & Projects Delivered", d: "Across 11 countries" },
    { v: <Counter to={9} />, l: "Years Engineering Practice", d: "Senior-only teams" },
    { v: <Counter to={410} suffix="k" />, l: "Manual Hours Automated", d: "Client operational savings" },
    { v: <Counter to={99.98} suffix="%" decimals={2} />, l: "Measured Platform Uptime", d: "24/7 SLA cover" },
  ];
  const logos = ["NORTHWIND", "ATLAS FOODS", "MERIDIAN", "VOLTA LOGISTICS", "CEDARCARE", "KRAFTWORKS"];

  return (
    <Section className="py-16 md:py-20">
      <Reveal className="flex flex-col gap-10">
        <p className="text-center font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase font-semibold">
          Trusted by high-growth startups, logistics leaders and enterprise operations
        </p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((l) => (
            <span
              key={l}
              className="text-center font-display text-sm font-semibold tracking-[0.16em] text-foreground/75 transition-colors hover:text-foreground"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="hairline" />

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-surface/40 p-5 text-left transition-colors hover:border-primary/40">
              <dt className="font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">{s.v}</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">{s.l}</dd>
              <dd className="mt-0.5 text-xs text-muted-foreground">{s.d}</dd>
            </div>
          ))}
        </dl>

        {/* Front-loaded Proof Banner */}
        <div className="glass-strong flex flex-col items-start justify-between gap-4 rounded-2xl border-primary/30 p-4 sm:p-5 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary font-mono font-bold text-xs">
              PROOF
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                Verified Production Outcome: FMCG Warehouse Operations
              </p>
              <p className="text-xs text-muted-foreground">
                Reduced stock reporting lag from 3 days to real-time. Saved 740 manual hours/month.
              </p>
            </div>
          </div>
          <a
            href="#case-studies"
            className="shrink-0 text-xs font-medium text-primary hover:underline flex items-center gap-1 font-mono"
          >
            Read all 3 production case studies <ArrowRight className="size-3.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

export function ServiceExplorer() {
  const [open, setOpen] = useState<string | null>(services[0].slug);

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Service explorer"
        title="Six engineering practices. Focused on high-return business outcomes."
        intro="Flagship practices represent our core expertise — mapped, built, and operated with total accountability."
      />
      <div className="mt-12 grid gap-3.5">
        {services.map((s, idx) => {
          const isOpen = open === s.slug;
          return (
            <Reveal key={s.slug} delay={idx * 0.04}>
              <div
                className={`glass overflow-hidden rounded-2xl transition-all ${
                  s.isFlagship ? "border-primary/45 bg-surface/60" : ""
                } ${isOpen ? "border-primary/60 glow-ring" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
                >
                  <span className="font-mono text-xs font-bold text-primary">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-3">
                      <span className="font-display text-lg font-semibold text-foreground md:text-xl">
                        {s.name}
                      </span>
                      {s.isFlagship ? (
                        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-[9px] tracking-wider text-primary uppercase font-bold border border-primary/30">
                          Flagship Practice
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{s.tagline}</span>
                  </span>
                  <span className="hidden rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] font-medium text-accent md:inline">
                    ROI {s.roi}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <div className="grid gap-8 border-t border-border px-5 py-6 md:grid-cols-[1.4fr_1fr] md:px-7">
                        <div className="space-y-5">
                          {[
                            { k: "Problem", v: s.problem },
                            { k: "Solution", v: s.solution },
                            { k: "Business impact", v: s.impact },
                          ].map((row) => (
                            <div key={row.k}>
                              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase font-semibold">
                                {row.k}
                              </p>
                              <p className="mt-1.5 text-sm text-foreground/90 font-normal leading-relaxed">{row.v}</p>
                            </div>
                          ))}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {s.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-foreground/80 font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase font-semibold">
                            Capabilities
                          </p>
                          <ul className="space-y-2">
                            {s.capabilities.map((c) => (
                              <li key={c} className="flex items-start gap-2 text-sm text-foreground/90">
                                <Check className="mt-0.5 size-3.5 shrink-0 text-signal" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary hover:underline"
                          >
                            View practice breakdown <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function ProblemComparison() {
  const without = [
    "Manual inventory counts & spreadsheets that drift out of sync",
    "Excel used as the brittle core operating system",
    "Multi-day approval delays trapped in unread email threads",
    "Missed and unqualified sales leads due to slow response",
    "Costly human data-entry & re-keying errors across tools",
    "Server downtime first discovered by angry customers",
    "Zero automation observability & fragmented operating status",
  ];
  const withUs = [
    "Automated, 24/7 monitored workflows with audit logging",
    "Real-time bin-level stock accuracy across all locations",
    "AI-assisted lead qualification, document extraction & triage",
    "Resilient, self-healing cloud infrastructure with 99.98% uptime",
    "Unified business dashboards for executive & field teams",
    "Zero-downtime deployments with instant rollback paths",
    "Centralised operational truth across finance, ERP & field",
  ];

  return (
    <Section id="outcomes">
      <SectionHeading
        eyebrow="Outcomes, not tooling"
        title="The difference is measured in hours, errors and revenue."
        intro="Moving from manual friction to automated engineering precision."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <GlassPanel className="h-full border-destructive/30 p-7 md:p-8" lift={false}>
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-destructive uppercase">
              Without Foxquart (Current Manual Pain)
            </p>
            <ul className="mt-6 space-y-4">
              {without.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-foreground/90 font-medium">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive font-bold" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassPanel className="h-full border-signal/40 bg-surface-2/60 p-7 md:p-8">
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-signal uppercase">
              With Foxquart (Engineered Precision)
            </p>
            <ul className="mt-6 space-y-4">
              {withUs.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-foreground font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0 text-signal font-bold" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </Reveal>
      </div>
    </Section>
  );
}

export function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industry solutions"
        title="We already know what breaks in your sector."
        intro="Ten operating environments, each with its own failure modes. Select your industry to view the engineering fix."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible pb-2 lg:pb-0">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm sm:px-4 sm:py-3 font-medium transition-all lg:w-full ${
                i === active
                  ? "border-primary bg-primary/15 text-foreground font-semibold shadow-sm"
                  : "border-border bg-surface/40 text-foreground/80 hover:text-foreground hover:bg-surface"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="glass-strong rounded-2xl p-7 md:p-8"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">{current.name} Operations</h3>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary font-bold">
                {current.benefit}
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3 border-t border-border/80 pt-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-destructive uppercase font-bold">
                  Sector Failure Point
                </p>
                <p className="mt-2 text-sm text-foreground/90 font-medium leading-relaxed">{current.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase font-bold">
                  Engineering Architecture
                </p>
                <p className="mt-2 text-sm text-foreground/90 font-medium leading-relaxed">{current.solution}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-signal uppercase font-bold">
                  Measured Business Impact
                </p>
                <p className="mt-2 font-display text-xl font-bold text-signal">{current.benefit}</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Operations Console", "Field Capture App", "Executive Reporting"].map((label, i) => (
                <div key={label} className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="font-mono text-[10px] text-foreground/80 font-semibold uppercase">{label}</p>
                  <div className="mt-3 space-y-2">
                    {[85, 60, 72].map((w, j) => (
                      <motion.div
                        key={j}
                        className="h-1.5 rounded-full bg-primary/60"
                        initial={{ width: 0 }}
                        animate={{ width: `${w - j * 10 + i * 4}%` }}
                        transition={{ duration: 0.8, delay: j * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

export function Products() {
  const [selectedPillar, setSelectedPillar] = useState<string>("All Foundations");

  const filteredProducts =
    selectedPillar === "All Foundations"
      ? products
      : products.filter((p) => p.pillar === selectedPillar);

  return (
    <Section id="products">
      <SectionHeading
        eyebrow="Featured platforms"
        title="Proven product foundations. Structured into 3 core pillars."
        intro="Each foundation starts from a battle-tested architecture core, then gets tailored to your workflow — avoiding expensive reinvent-the-wheel costs."
      />

      {/* Category Pillar Selector Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {["All Foundations", "Core Operations", "Automation & AI", "Industry Systems"].map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => setSelectedPillar(pill)}
            className={`rounded-full px-4 py-2 text-xs font-medium font-mono transition-colors ${
              selectedPillar === pill
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "border border-border bg-surface/60 text-foreground/80 hover:text-foreground hover:bg-surface"
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.05}>
            <GlassPanel className="group flex h-full flex-col justify-between p-6 transition-all hover:border-primary/40">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-surface border border-border px-2 py-0.5 font-mono text-[9px] text-primary uppercase font-bold">
                    {p.pillar}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed">{p.detail}</p>
              </div>
              <div className="mt-5 border-t border-border/60 pt-3">
                <span className="text-[11px] font-mono text-muted-foreground">Customised &amp; deployed in 6–10 weeks</span>
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function CaseStudies() {
  return (
    <Section id="case-studies">
      <SectionHeading
        eyebrow="Production proof"
        title="Systems running in production, with verified numbers attached."
        intro="Real client metrics before and after Foxquart engineering deployments."
      />
      <div className="mt-12 space-y-6">
        {caseStudies.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.06}>
            <GlassPanel className="grid gap-8 p-7 lg:grid-cols-[1.5fr_1fr] lg:p-9 border-primary/30">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/15 border border-primary/30 px-3 py-1 font-mono text-[10px] font-bold text-primary uppercase">
                    Case Study #{i + 1}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{c.timeline} delivery</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{c.client}</h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-destructive uppercase font-bold">
                      Challenge Before Us
                    </p>
                    <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{c.challenge}</p>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase font-bold">
                      Engineered Solution
                    </p>
                    <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{c.solution}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {c.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-foreground/80 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {c.results.map((r) => (
                  <div key={r.label} className="rounded-xl border border-primary/40 bg-surface-2/90 p-4 text-center lg:text-left">
                    <p className="font-display text-2xl font-bold text-primary lg:text-3xl">
                      {r.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-foreground">{r.label}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Process() {
  const steps = [
    ["Discovery", "Process mapping, cost of the current state, success metrics."],
    ["Architecture", "Data model, integrations, security and scaling plan."],
    ["Design", "Interface design around the real workflow, not screens for a demo."],
    ["Development", "Two-week increments with working software you can use."],
    ["Testing", "Automated tests, load testing, UAT with your operators."],
    ["Deployment", "Containerised rollout with rollback and zero-downtime cutover."],
    ["Monitoring", "Alerting, dashboards and incident response from day one."],
    ["Improvement", "Quarterly review against the metrics we agreed in discovery."],
  ];

  return (
    <Section id="process">
      <SectionHeading eyebrow="How we work" title="A delivery process built for accountability." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([title, body], i) => (
          <Reveal key={title} delay={i * 0.05}>
            <div className="relative h-full rounded-2xl border border-border bg-surface/40 p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-full border border-primary/40 font-mono text-[11px] text-primary">
                  {i + 1}
                </span>
                <h3 className="font-display text-base font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              <motion.div
                className="mt-4 h-0.5 rounded-full bg-primary/60"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function TechStack() {
  const groups = [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { name: "Backend", items: ["Go", "Node.js", "Python", "FastAPI", "NestJS"] },
    { name: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
    { name: "Cloud", items: ["AWS", "Azure", "Cloudflare", "Docker", "Kubernetes"] },
    { name: "AI", items: ["OpenAI", "Anthropic", "Google AI", "n8n", "LangChain"] },
    { name: "Automation", items: ["Playwright", "Puppeteer", "Browser automation"] },
    { name: "APIs", items: ["GraphQL", "REST", "WebSockets"] },
  ];

  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Technology"
        title="A battle-tested stack for zero-downtime operational systems."
      />

      {/* Business-Buyer Summary Box */}
      <div className="mt-8 rounded-2xl border border-border bg-surface/50 p-6 md:p-7">
        <p className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
          Business Value of Our Technology Stack
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Zero Vendor Lock-in</p>
            <p className="mt-1 text-xs text-muted-foreground">Full source code ownership, standard open formats, and portable docker containers.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Sub-Second Performance</p>
            <p className="mt-1 text-xs text-muted-foreground">Server-rendered UI and optimized databases for high-volume transactions.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Audit &amp; Compliance Ready</p>
            <p className="mt-1 text-xs text-muted-foreground">Strict typing, schema validation, and structured activity logging built in.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.04}>
            <GlassPanel className="h-full p-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase font-bold">
                {g.name}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground/90"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function WhyUs() {
  const reasons = [
    { icon: Cpu, t: "Engineering-first mindset", d: "Senior engineers on every project. No junior-shuffling or outsourced handoffs." },
    { icon: Gauge, t: "Business-focused delivery", d: "We commit to concrete business metrics and ROI, not just feature lists." },
    { icon: ShieldCheck, t: "Enterprise security", d: "Least-privilege access, strict role permissions, audit trails, and tested recovery." },
    { icon: Layers, t: "Scalable architecture", d: "Systems designed from day one to handle your next order of magnitude." },
  ];
  const more = [
    "Long-term support & maintenance SLAs",
    "Fast 2-week incremental software delivery",
    "Transparent weekly async & call updates",
    "Modern, zero-lockin maintainable stack",
    "AI-native workflow automation default",
    "Deep cloud infrastructure & DevOps expertise",
  ];

  return (
    <Section id="why-us">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Why businesses choose us"
            title="You are hiring an engineering partner, not a vendor."
            intro="We stay long after launch. Over 80% of our clients have partnered with us for more than three years."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {more.map((m) => (
              <li key={m} className="flex items-center gap-2 text-sm text-foreground font-medium">
                <Check className="size-4 shrink-0 text-signal font-bold" /> {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.06}>
              <GlassPanel className="h-full p-6">
                <r.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-display text-base font-bold text-foreground">{r.t}</h3>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed">{r.d}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Pricing() {
  const models = [
    {
      name: "Project Based",
      startingAt: "From $12,000",
      for: "A defined custom software or automation system with a clear finish line.",
      includes: [
        "Fixed-price discovery & architecture phase",
        "Milestone-based 2-week increment delivery",
        "Full IP, source code and environment handover",
        "60 days post-launch warranty & tuning",
      ],
      support: "Business-hours support",
      timeline: "6–16 weeks",
    },
    {
      name: "Dedicated Squad",
      startingAt: "From $8,500 / mo",
      for: "Continuous product, automation and platform development.",
      includes: [
        "Dedicated senior cross-functional squad",
        "Two-week delivery sprints & demo cycles",
        "Shared backlog, roadmap & architecture governance",
        "Direct Slack & weekly engineer syncs",
      ],
      support: "Extended-hours support",
      timeline: "3 months minimum",
      featured: true,
    },
    {
      name: "Managed Partnership",
      startingAt: "From $2,500 / mo",
      for: "Running, monitoring and scaling live business systems & AI workflows.",
      includes: [
        "Managed cloud hosting, DevOps & security patches",
        "Automation estate maintenance & broken pipeline alerts",
        "Quarterly reliability & optimization roadmap",
        "Incident response with guaranteed SLA",
      ],
      support: "24/7 on-call SLA",
      timeline: "Rolling monthly",
    },
  ];

  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Engagement models"
        title="Three transparent ways to work with us. Clear starting scale."
        intro="Exact scope and pricing are confirmed after a 30-minute strategy discovery call when requirements are clear."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {models.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07}>
            <GlassPanel
              className={`flex h-full flex-col p-7 ${m.featured ? "border-primary/60 glow-ring bg-surface-2/80" : ""}`}
            >
              {m.featured ? (
                <span className="mb-4 w-fit rounded-full bg-primary/20 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-primary uppercase font-bold border border-primary/30">
                  Most Chosen Model
                </span>
              ) : null}
              <h3 className="font-display text-xl font-bold text-foreground">{m.name}</h3>
              <p className="mt-2 font-mono text-lg font-semibold text-primary">{m.startingAt}</p>
              <p className="mt-2 text-sm text-foreground/85 leading-relaxed">{m.for}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {m.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-signal" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt className="font-medium">Support Level</dt>
                  <dd className="text-foreground font-semibold">{m.support}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Commitment</dt>
                  <dd className="text-foreground font-semibold">{m.timeline}</dd>
                </div>
              </dl>
              <Link
                to="/contact"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  m.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-surface text-foreground hover:border-primary/50 hover:bg-surface-2"
                }`}
              >
                Discuss {m.name} <ArrowRight className="size-3.5" />
              </Link>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function CtaBand() {
  return (
    <Section className="pb-8">
      <Reveal>
        <div className="glass-strong grain relative overflow-hidden rounded-2xl px-5 py-10 text-center sm:rounded-3xl sm:px-7 sm:py-14 md:px-16">
          <div className="mesh-bg animate-drift absolute inset-0 -z-10 opacity-70" />
          <Eyebrow>Next step</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold text-balance md:text-4xl">
            Tell us the process that is costing you the most hours.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A 30-minute strategy call. We will tell you what to automate first, what to rebuild, and
            what to leave alone.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Schedule a strategy call <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
