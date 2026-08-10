import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Counter, Eyebrow, Reveal, Section, SectionHeading } from "./ui";
import { caseStudies } from "@/lib/site-data";

/**
 * Stat strip, directly under the hero.
 *
 * Every figure here is a claim about the practice and has to be confirmed by the
 * founder before launch — see docs/redesign-contract.md §6.7. The client logo row
 * that used to sit above these numbers was removed: the six names on it
 * (NORTHWIND, ATLAS FOODS, MERIDIAN, VOLTA LOGISTICS, CEDARCARE, KRAFTWORKS)
 * were invented, and an invented logo wall is the least defensible proof on a
 * site. Do not reinstate a logo row until there are real clients who have given
 * written permission to be named.
 */
export function SocialProof() {
  const stats = [
    {
      value: <Counter to={140} suffix="+" />,
      label: "Systems delivered",
      note: "Across 11 countries",
    },
    {
      value: <Counter to={9} />,
      label: "Years in practice",
      note: "Senior engineers only",
    },
    {
      value: <Counter to={410} suffix="k" />,
      label: "Manual hours automated",
      note: "Measured across client operations",
    },
    {
      value: <Counter to={99.98} suffix="%" decimals={2} />,
      label: "Platform uptime",
      note: "Systems we operate under SLA",
    },
  ];

  // Tighter than a full Section: this is a strip under the hero, not a stop.
  // Every breakpoint is restated because `twMerge` scopes overrides per variant —
  // `py-12` on its own would leave the Section's base `sm:py-24` in place.
  return (
    <Section className="py-12 sm:py-14 md:py-16">
      <Reveal className="flex flex-col gap-5 md:gap-6">
        <p className="eyebrow-type text-primary">The practice to date</p>
        {/* gap-px over a border-coloured ground gives true 1px hairlines between
            cells — depth from tint and rules, not shadows (contract §3). */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface p-4 sm:p-5">
              <dt className="tnum font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm font-medium text-foreground">{stat.label}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.note}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

/**
 * Three production systems with their measured results.
 *
 * The technology chip row was dropped: contract §5 says name systems, not
 * technologies. Every number rendered here comes from `caseStudies` in
 * src/lib/site-data.ts and needs the same founder confirmation as the stat strip.
 */
export function CaseStudies() {
  return (
    <Section id="case-studies">
      <SectionHeading
        eyebrow="Production proof"
        title="Three systems in production, with the numbers attached."
        intro="Before and after, measured on the metric the client actually cared about."
      />
      <div className="mt-10 space-y-4 md:mt-12 md:space-y-6">
        {caseStudies.map((study, i) => (
          <Reveal key={study.client} delay={i * 0.04}>
            <article className="grid gap-6 rounded-xl border border-border bg-surface p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr] lg:gap-10 lg:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="eyebrow-type text-primary">
                    Case {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tnum font-mono text-xs text-muted-foreground">
                    {study.timeline} to live
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
                  {study.client}
                </h3>

                <dl className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <dt className="eyebrow-type text-muted-foreground">Before</dt>
                    <dd className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                      {study.challenge}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <dt className="eyebrow-type text-primary">What we built</dt>
                    <dd className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                      {study.solution}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Rows rather than a tile grid: values like "< 3 min" keep their
                  full width at 375px instead of wrapping to three lines. */}
              <dl className="divide-y divide-border self-start rounded-xl border border-border bg-surface-2">
                {study.results.map((result) => (
                  <div
                    key={result.label}
                    className="flex items-baseline justify-between gap-4 px-4 py-3.5"
                  >
                    <dt className="text-sm text-muted-foreground">{result.label}</dt>
                    <dd className="tnum font-display text-xl font-semibold text-primary sm:text-2xl">
                      {result.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * Four stages, not eight. The original list broke delivery into Discovery,
 * Architecture, Design, Development, Testing, Deployment, Monitoring and
 * Improvement — accurate, but a spec sheet. Design/Development/Testing collapse
 * into Build; Deployment/Monitoring/Improvement collapse into Operate.
 */
export function Process() {
  const steps: Array<[string, string]> = [
    [
      "Discovery",
      "Process mapping, the cost of the current state, and the metrics the build gets judged on.",
    ],
    [
      "Architecture",
      "Data model, integrations, access control and the scaling plan — agreed before any code.",
    ],
    [
      "Build",
      "Two-week increments of working software, tested with the people who will run it daily.",
    ],
    [
      "Operate",
      "Zero-downtime cutover, alerting from day one, and a quarterly review against those metrics.",
    ],
  ];

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How we work"
        title="A delivery process built for accountability."
        intro="Four stages on every engagement, whether it is a single automation or a full ERP."
      />
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
        {steps.map(([title, body], i) => (
          <li key={title} className="list-none">
            <Reveal delay={i * 0.04} className="h-full">
              <div className="card-lift h-full rounded-xl border border-border bg-surface p-5">
                <span className="eyebrow-type text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/**
 * Three engagement models. Prices are starting points, stated as such.
 *
 * The featured tier is marked "Recommended" — our own editorial stance, which we
 * are entitled to hold. It previously read "Most Chosen Model", which is a claim
 * about client behaviour we cannot evidence (contract §6.7).
 */
export function Pricing() {
  const models = [
    {
      name: "Project Based",
      price: "$12,000",
      cadence: "starting price",
      for: "A defined custom software or automation system with a clear finish line.",
      includes: [
        "Fixed-price discovery and architecture phase",
        "Milestone-based two-week increment delivery",
        "Full IP, source code and environment handover",
        "60 days post-launch warranty and tuning",
      ],
      support: "Business hours",
      commitment: "6–16 weeks",
      featured: false,
    },
    {
      name: "Dedicated Squad",
      price: "$8,500",
      cadence: "per month",
      for: "Continuous product, automation and platform development.",
      includes: [
        "Dedicated senior cross-functional squad",
        "Two-week delivery sprints and demo cycles",
        "Shared backlog, roadmap and architecture governance",
        "Direct Slack channel and weekly engineer syncs",
      ],
      support: "Extended hours",
      commitment: "3 months minimum",
      featured: true,
    },
    {
      name: "Managed Partnership",
      price: "$2,500",
      cadence: "per month",
      for: "Running, monitoring and scaling live business systems and AI workflows.",
      includes: [
        "Managed cloud hosting, DevOps and security patching",
        "Automation estate maintenance and pipeline alerting",
        "Quarterly reliability and optimisation roadmap",
        "Incident response against an agreed SLA",
      ],
      support: "24/7 on-call SLA",
      commitment: "Rolling monthly",
      featured: false,
    },
  ];

  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Engagement models"
        title="Three ways to work with us. Starting prices, not final ones."
        intro="Scope and the exact figure are fixed after a 30-minute call, once the requirements are on the table."
      />
      <div className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-3">
        {models.map((model, i) => (
          <Reveal key={model.name} delay={i * 0.04} className="h-full">
            <div
              className={`flex h-full flex-col rounded-xl border p-6 md:p-7 ${
                model.featured ? "border-primary bg-surface-2" : "border-border bg-surface"
              }`}
            >
              {model.featured ? (
                <span className="mb-4 w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1 eyebrow-type text-primary">
                  Recommended
                </span>
              ) : null}
              <h3 className="font-display text-lg font-semibold text-foreground">{model.name}</h3>

              <p className="eyebrow-type mt-5 text-muted-foreground">From</p>
              <p className="tnum mt-1.5 font-display text-3xl font-semibold text-foreground">
                {model.price}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{model.cadence}</p>

              <p className="mt-5 text-sm leading-relaxed text-foreground/85">{model.for}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {model.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-2 border-t border-border pt-5 text-xs">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Support</dt>
                  <dd className="font-medium text-foreground">{model.support}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Commitment</dt>
                  <dd className="font-medium text-foreground">{model.commitment}</dd>
                </div>
              </dl>

              <Link
                to="/contact"
                className={`press mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                  model.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                Discuss {model.name}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
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
            className="press mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Schedule a strategy call <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
