import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Boxes, Store, Workflow, type LucideIcon } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui";

type Capability = {
  index: string;
  icon: LucideIcon;
  title: string;
  /** One specific outcome. What is true after the system is live. */
  outcome: string;
  /** Real systems, named as systems — never as the stack they are built on. */
  systems: string[];
  /** Closest existing practice page. Slug is a `services` entry in site-data. */
  slug: string;
  linkLabel: string;
};

const capabilities: Capability[] = [
  {
    index: "01",
    icon: Boxes,
    title: "Operations systems",
    outcome:
      "Stock, ledgers, patient files and class rosters in one record, with roles, approvals and an audit trail behind every change.",
    systems: [
      "Inventory & warehouse",
      "Finance & procurement ERP",
      "Sales CRM",
      "Hospital records",
      "School ERP",
    ],
    slug: "custom-software-development",
    linkLabel: "Custom software development",
  },
  {
    index: "02",
    icon: Store,
    title: "Customer-facing products",
    outcome:
      "Customers book, order, pay and check status themselves, so the front desk stops being the bottleneck.",
    systems: [
      "Appointment booking",
      "Table & delivery ordering",
      "Parent & client portals",
      "Marketing sites",
    ],
    slug: "enterprise-websites",
    linkLabel: "Websites & landing pages",
  },
  {
    index: "03",
    icon: Workflow,
    title: "Automation & AI",
    outcome:
      "The repetitive middle of a process runs itself, with retries, alerts and a log of every decision it made.",
    systems: [
      "Workflow automation",
      "Lead qualification",
      "Document & OCR extraction",
      "Data pipelines",
    ],
    slug: "ai-automation",
    linkLabel: "AI workflow automation",
  },
  {
    index: "04",
    icon: Activity,
    title: "Run & operate",
    outcome:
      "Outages reach us before they reach your customers, and changes keep shipping long after launch week.",
    systems: ["Managed hosting", "Monitoring & alerting", "Tested restores", "Ongoing releases"],
    slug: "cloud-devops",
    linkLabel: "Cloud infrastructure & DevOps",
  },
];

/**
 * Deep links into the solution pages. These pages carry the long-tail search
 * intent but were previously reachable only from the /solutions index.
 * Every slug is a `solutionPages` entry in site-data.
 */
const systemIndex: { label: string; slug: string }[] = [
  { label: "Inventory management", slug: "inventory-management-software" },
  { label: "Warehouse operations", slug: "warehouse-software" },
  { label: "ERP & finance", slug: "erp-development" },
  { label: "Manufacturing ERP", slug: "manufacturing-erp" },
  { label: "Custom CRM", slug: "crm-development" },
  { label: "Hospital & clinic systems", slug: "healthcare-software" },
  { label: "School ERP", slug: "school-erp" },
  { label: "Restaurant POS", slug: "restaurant-software" },
  { label: "Business process automation", slug: "business-process-automation" },
];

export function WhatWeDo() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Capabilities"
        title="The systems your business runs on."
        intro="Operations first. Customer-facing products second. Automation around both. And someone still on call after launch."
      />

      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
        {capabilities.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.04}>
            <Link
              to="/services/$slug"
              params={{ slug: c.slug }}
              className="card-lift press flex h-full flex-col rounded-xl border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <c.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="eyebrow-type tnum text-muted-foreground">{c.index}</span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground sm:text-[22px]">
                {c.title}
              </h3>
              <p className="mt-2.5 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
                {c.outcome}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {c.systems.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-foreground/75">
                    <span className="size-1 rounded-full bg-primary" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>

              <span className="mt-auto flex min-h-11 items-center gap-2 pt-6 text-sm font-medium text-primary">
                {c.linkLabel}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16}>
        <div className="mt-10 border-t border-border pt-6 md:mt-14">
          <h3 className="eyebrow-type text-muted-foreground">Systems we build</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {systemIndex.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="press inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 text-sm text-foreground/85 transition-colors hover:bg-surface-2"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
