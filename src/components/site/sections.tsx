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
    { v: <Counter to={140} suffix="+" />, l: "Projects delivered" },
    { v: <Counter to={9} />, l: "Years engineering" },
    { v: <Counter to={11} />, l: "Countries served" },
    { v: <Counter to={99.98} suffix="%" decimals={2} />, l: "Platform uptime" },
  ];
  const logos = ["NORTHWIND", "ATLAS FOODS", "MERIDIAN", "VOLTA LOGISTICS", "CEDARCARE", "KRAFTWORKS"];

  return (
    <Section className="py-16 md:py-20">
      <Reveal className="flex flex-col gap-8">
        <p className="text-center font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by startups, growing businesses and enterprise teams
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-6">
          {logos.map((l) => (
            <span
              key={l}
              className="text-center font-display text-sm font-semibold tracking-[0.14em] text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="hairline" />
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <dt className="font-display text-3xl font-semibold md:text-4xl">{s.v}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </dl>
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
        title="Six engineering practices. One operating system for your business."
        intro="Every engagement starts with the problem you are paying for today — not the technology we would like to use."
      />
      <div className="mt-12 grid gap-3">
        {services.map((s, idx) => {
          const isOpen = open === s.slug;
          return (
            <Reveal key={s.slug} delay={idx * 0.04}>
              <div
                className={`glass overflow-hidden rounded-2xl transition-colors ${
                  isOpen ? "border-primary/40" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
                >
                  <span className="font-mono text-xs text-primary">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-semibold md:text-xl">
                      {s.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{s.tagline}</span>
                  </span>
                  <span className="hidden rounded-full border border-border px-3 py-1 font-mono text-[10px] text-accent md:inline">
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
                              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                                {row.k}
                              </p>
                              <p className="mt-1.5 text-sm text-muted-foreground">{row.v}</p>
                            </div>
                          ))}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {s.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                            Capabilities
                          </p>
                          <ul className="space-y-2">
                            {s.capabilities.map((c) => (
                              <li key={c} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 size-3.5 shrink-0 text-signal" />
                                <span className="text-muted-foreground">{c}</span>
                              </li>
                            ))}
                          </ul>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary hover:underline"
                          >
                            View {s.name} <ArrowRight className="size-3.5" />
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
    "Manual inventory counts",
    "Excel as the operating system",
    "Approvals stuck in email",
    "Missed and unqualified leads",
    "Human data-entry errors",
    "Server downtime found by customers",
    "No automation, no visibility",
  ];
  const withUs = [
    "Automated, monitored workflows",
    "Real-time inventory across sites",
    "AI-assisted support and triage",
    "Resilient cloud infrastructure",
    "Business dashboards for every team",
    "Deployments in minutes, safely",
    "Centralised operations, one truth",
  ];

  return (
    <Section id="outcomes">
      <SectionHeading
        eyebrow="Outcomes, not tooling"
        title="The difference is measured in hours, errors and revenue."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassPanel className="h-full p-7" lift={false}>
            <p className="font-mono text-[11px] tracking-[0.18em] text-destructive uppercase">
              Without us
            </p>
            <ul className="mt-6 space-y-4">
              {without.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                  {w}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassPanel className="h-full border-primary/30 p-7">
            <p className="font-mono text-[11px] tracking-[0.18em] text-signal uppercase">With us</p>
            <ul className="mt-6 space-y-4">
              {withUs.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                  {w}
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
        intro="Ten operating environments, each with its own failure modes. Pick yours."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-xl border px-4 py-3 text-left text-sm transition-colors lg:w-full ${
                i === active
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border bg-surface/40 text-muted-foreground hover:text-foreground"
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
            className="glass rounded-2xl p-7"
          >
            <h3 className="font-display text-2xl font-semibold">{current.name}</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-destructive uppercase">
                  Problem
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{current.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                  Solution
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{current.solution}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-signal uppercase">
                  Benefit
                </p>
                <p className="mt-2 font-display text-xl font-semibold">{current.benefit}</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Operations view", "Field capture", "Executive KPIs"].map((label, i) => (
                <div key={label} className="rounded-xl border border-border bg-surface/50 p-3">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">{label}</p>
                  <div className="mt-3 space-y-2">
                    {[80, 55, 65].map((w, j) => (
                      <motion.div
                        key={j}
                        className="h-1.5 rounded-full bg-primary/40"
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
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="Featured platforms"
        title="Proven product foundations, customised to your operation."
        intro="Each platform starts from a battle-tested core, then gets modelled around your process — you are not paying to invent the basics again."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.06}>
            <GlassPanel className="group h-full p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
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
        eyebrow="Case studies"
        title="Systems in production, with numbers attached."
      />
      <div className="mt-12 space-y-5">
        {caseStudies.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.06}>
            <GlassPanel className="grid gap-8 p-7 lg:grid-cols-[1.6fr_1fr] lg:p-9">
              <div>
                <h3 className="font-display text-2xl font-semibold">{c.client}</h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-destructive uppercase">
                      Challenge
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                      Solution
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{c.solution}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {c.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-accent">
                    {c.timeline}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
                {c.results.map((r) => (
                  <div key={r.label} className="rounded-xl border border-border bg-surface/50 p-4">
                    <p className="font-display text-xl font-semibold text-primary lg:text-2xl">
                      {r.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.label}</p>
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
        title="A deliberately boring stack for systems that must not fail."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.04}>
            <GlassPanel className="h-full p-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                {g.name}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-md border border-border bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground"
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
    { icon: Cpu, t: "Engineering-first mindset", d: "Senior engineers on every project. No junior-shuffling." },
    { icon: Gauge, t: "Business-focused delivery", d: "We commit to metrics, not feature lists." },
    { icon: ShieldCheck, t: "Enterprise security", d: "Least-privilege access, audit trails, tested recovery." },
    { icon: Layers, t: "Scalable architecture", d: "Systems designed for your next order of magnitude." },
  ];
  const more = [
    "Long-term support agreements",
    "Fast, incremental delivery",
    "Transparent weekly communication",
    "Modern, maintainable stack",
    "AI-native by default",
    "Deep cloud and automation expertise",
  ];

  return (
    <Section id="why-us">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Why businesses choose us"
            title="You are hiring an engineering partner, not a vendor."
            intro="We stay after launch. Most of our clients have worked with us for more than three years."
          />
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {more.map((m) => (
              <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-3.5 shrink-0 text-signal" /> {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.06}>
              <GlassPanel className="h-full p-6">
                <r.icon className="size-5 text-primary" />
                <h3 className="mt-4 font-display text-base font-semibold">{r.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
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
      name: "Project based",
      for: "A defined system with a clear finish line.",
      includes: [
        "Fixed-price discovery phase",
        "Milestone-based delivery",
        "Full IP and code handover",
        "60 days post-launch warranty",
      ],
      support: "Business-hours support",
      timeline: "6–16 weeks",
    },
    {
      name: "Dedicated team",
      for: "Continuous product and platform development.",
      includes: [
        "Cross-functional squad",
        "Two-week delivery increments",
        "Shared backlog and roadmap",
        "Architecture governance",
      ],
      support: "Extended-hours support",
      timeline: "3 months minimum",
      featured: true,
    },
    {
      name: "Monthly partnership",
      for: "Running, monitoring and improving live systems.",
      includes: [
        "Managed hosting and DevOps",
        "Automation estate maintenance",
        "Quarterly improvement roadmap",
        "Incident response with SLA",
      ],
      support: "24/7 on-call",
      timeline: "Rolling monthly",
    },
  ];

  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Engagement models"
        title="Three ways to work with us. No hourly guesswork."
        intro="Pricing is scoped after discovery, when both sides know what the system actually has to do."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {models.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07}>
            <GlassPanel
              className={`flex h-full flex-col p-7 ${m.featured ? "border-primary/45 glow-ring" : ""}`}
            >
              {m.featured ? (
                <span className="mb-4 w-fit rounded-full bg-primary/15 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                  Most chosen
                </span>
              ) : null}
              <h3 className="font-display text-xl font-semibold">{m.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.for}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {m.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-signal" />
                    <span className="text-muted-foreground">{inc}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Support</dt>
                  <dd className="text-foreground">{m.support}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Timeline</dt>
                  <dd className="text-foreground">{m.timeline}</dd>
                </div>
              </dl>
              <Link
                to="/contact"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  m.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border hover:border-primary/50"
                }`}
              >
                Discuss this model <ArrowRight className="size-3.5" />
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
        <div className="glass-strong grain relative overflow-hidden rounded-3xl px-7 py-14 text-center md:px-16">
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
