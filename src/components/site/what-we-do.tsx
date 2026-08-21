import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Boxes, Store, Workflow, type LucideIcon } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { Reveal, Section, SectionHeading } from "./ui";

type Capability = {
  index: string;
  icon: LucideIcon;
  title: string;
  /** One specific outcome. What is true after the system is live. */
  outcome: string;
  /** Real systems, named as systems, never as the stack they are built on. */
  systems: string[];
  /** Closest existing practice page. Slug is a `services` entry in site-data. */
  slug: string;
  linkLabel: string;
  /** Public path of the card's background illustration. Purely decorative. */
  image: string;
};

const capabilities: Capability[] = [
  {
    index: "01",
    icon: Boxes,
    title: "Operations systems",
    outcome: "Stock, ledgers, files and rosters in one record, every change audited.",
    systems: [
      "Inventory & warehouse",
      "Finance & procurement ERP",
      "Sales CRM",
      "Hospital records",
      "School ERP",
    ],
    slug: "custom-software-development",
    linkLabel: "Custom software development",
    image: "/images/capability_forest.webp",
  },
  {
    index: "02",
    icon: Store,
    title: "Customer-facing products",
    outcome: "Customers book, order and pay themselves, without the front desk.",
    systems: [
      "Appointment booking",
      "Table & delivery ordering",
      "Parent & client portals",
      "Marketing sites",
    ],
    slug: "enterprise-websites",
    linkLabel: "Websites & landing pages",
    image: "/images/capability_floral.webp",
  },
  {
    index: "03",
    icon: Workflow,
    title: "Automation & AI",
    outcome: "Repetitive work runs itself, with alerts and a log of every step.",
    systems: [
      "Workflow automation",
      "Lead qualification",
      "Document & OCR extraction",
      "Data pipelines",
    ],
    slug: "ai-automation",
    linkLabel: "AI workflow automation",
    image: "/images/capability_doodle_red.webp",
  },
  {
    index: "04",
    icon: Activity,
    title: "Run & operate",
    outcome: "We see outages before your customers do, and keep shipping after launch.",
    systems: ["Managed hosting", "Monitoring & alerting", "Tested restores", "Ongoing releases"],
    slug: "cloud-devops",
    linkLabel: "Cloud infrastructure & DevOps",
    image: "/images/capability_doodle_violet.webp",
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
        intro="Operations, customer products, automation, and someone on call after launch."
      />

      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
        {capabilities.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.04}>
            <Link
              to="/services/$slug"
              params={{ slug: c.slug }}
              className="card-lift press group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 sm:p-6"
            >
              <div className="absolute inset-0" aria-hidden="true">
                <Picture
                  src={c.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-background/78" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
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
              </div>
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
