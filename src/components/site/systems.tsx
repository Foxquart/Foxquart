import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Cloud,
  Database,
  HardDriveDownload,
  Boxes,
  Gauge,
  Globe,
  Users,
  Network,
  FileText,
  ScanText,
  Bot,
  Eye,
  Mail,
  LifeBuoy,
  BadgeDollarSign,
  BookOpen,
} from "lucide-react";
import { Counter, GlassPanel, Reveal, Section, SectionHeading } from "./ui";

const flowNodes = [
  "Website form",
  "AI qualification",
  "CRM record",
  "Slack alert",
  "Email sequence",
  "Invoice generated",
  "Database sync",
  "Dashboard update",
  "WhatsApp confirmation",
];

export function AutomationCanvas() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % flowNodes.length), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <Section id="automation">
      <SectionHeading
        eyebrow="n8n automation"
        title="One form submission. Nine systems updated. Zero humans."
        intro="We engineer automation estates that are versioned, monitored and documented — so they keep running when the person who built them is on holiday."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <GlassPanel lift={false} className="relative overflow-hidden p-6 md:p-8">
            <div className="mesh-bg absolute inset-0 -z-10 opacity-40" />
            <div className="grid gap-3">
              {flowNodes.map((node, i) => (
                <div key={node} className="flex items-center gap-4">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-lg border font-mono text-[11px] transition-colors ${
                      i === active
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border bg-surface/60 text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                      i === active
                        ? "border-primary/50 bg-primary/10"
                        : "border-border bg-surface/50 text-muted-foreground"
                    }`}
                  >
                    {node}
                  </div>
                  {i === active ? (
                    <motion.span
                      layoutId="flow-pulse"
                      className="size-2 rounded-full bg-signal"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  ) : (
                    <span className="size-2 rounded-full bg-border" />
                  )}
                </div>
              ))}
            </div>
            <svg className="pointer-events-none absolute top-16 bottom-8 left-[2.4rem] w-px" aria-hidden>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="var(--primary)"
                strokeWidth="1"
                className="animate-dash-flow"
                opacity="0.5"
              />
            </svg>
          </GlassPanel>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { v: <Counter to={410} suffix="k" />, l: "Manual hours removed for clients" },
            { v: <Counter to={2.4} prefix="$" suffix="M" decimals={1} />, l: "Annual cost avoided" },
            { v: <Counter to={620} suffix="+" />, l: "Processes automated" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassPanel className="p-6">
                <p className="font-display text-3xl font-semibold text-primary">{s.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const infraLayers = [
  { icon: Cloud, name: "Cloud region", detail: "AWS / Azure / GCP, multi-AZ" },
  { icon: Network, name: "Load balancer", detail: "TLS termination, health checks" },
  { icon: Boxes, name: "Container fleet", detail: "Docker on Kubernetes, autoscaled" },
  { icon: Database, name: "Database", detail: "Postgres HA with read replicas" },
  { icon: Gauge, name: "Monitoring", detail: "Metrics, logs, traces, alerting" },
  { icon: HardDriveDownload, name: "Backup & DR", detail: "Point-in-time restore, drills" },
  { icon: Globe, name: "CDN & WAF", detail: "Edge caching, DDoS protection" },
  { icon: Users, name: "Users", detail: "Sub-second global response" },
];

export function CloudInfrastructure() {
  return (
    <Section id="cloud">
      <SectionHeading
        eyebrow="Cloud infrastructure"
        title="Infrastructure your team never has to think about."
        intro="Managed hosting, containerisation, scaling, monitoring, security and 24/7 response — designed once, operated continuously."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {infraLayers.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.05}>
            <GlassPanel className="relative h-full p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface">
                  <l.icon className="size-4 text-primary" />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  L{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{l.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{l.detail}</p>
              <motion.span
                className="absolute right-4 bottom-4 size-1.5 rounded-full bg-signal"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
              />
            </GlassPanel>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="grid gap-4 rounded-2xl border border-border bg-surface/40 p-6 sm:grid-cols-3">
          {[
            ["Security", "Least privilege, secret rotation, hardened images, audit logging."],
            ["Performance", "Cache strategy, query tuning and load testing before every launch."],
            ["24/7 support", "On-call rotation, 15-minute acknowledgement on critical incidents."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">{t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

const conversation = [
  { role: "user", text: "How many invoices are still unmatched this week?" },
  { role: "ai", text: "31 unmatched. 24 are OCR-extracted and awaiting PO match, 7 have amount mismatches over 2%." },
  { role: "user", text: "Auto-approve the safe ones." },
  { role: "ai", text: "24 approved and posted to the ERP. 7 escalated to finance with the variance highlighted." },
];

export function AiSection() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const t = setInterval(
      () => setVisible((v) => (v >= conversation.length ? 1 : v + 1)),
      1800,
    );
    return () => clearInterval(t);
  }, []);

  const capabilities = [
    { icon: ScanText, t: "OCR extraction", d: "Invoices, delivery notes, IDs, forms." },
    { icon: FileText, t: "Document AI", d: "Classification, validation, structured output." },
    { icon: BookOpen, t: "Knowledge base", d: "Grounded answers from your own documents." },
    { icon: Bot, t: "Internal chatbot", d: "Ask your systems questions in plain language." },
    { icon: Eye, t: "Vision AI", d: "Quality checks, counting, defect detection." },
    { icon: Mail, t: "Email AI", d: "Triage, routing, drafted replies with approval." },
    { icon: LifeBuoy, t: "Support AI", d: "Tier-1 deflection with clean human handoff." },
    { icon: BadgeDollarSign, t: "Sales AI", d: "Lead scoring, enrichment, follow-up drafting." },
  ];

  return (
    <Section id="ai">
      <SectionHeading
        eyebrow="AI, in production"
        title="AI that takes actions inside your systems — with guardrails."
        intro="Every AI feature we ship has grounding, output validation, confidence thresholds and a human review path for anything financial or legal."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <GlassPanel lift={false} className="flex h-full flex-col p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <span className="size-2 rounded-full bg-signal animate-pulse-soft" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Finance operations assistant
              </span>
            </div>
            <div className="mt-4 flex-1 space-y-3">
              {conversation.slice(0, visible).map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-surface-2/80 text-foreground"
                      : "bg-primary/15 text-foreground"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>
            <p className="mt-4 border-t border-border pt-4 font-mono text-[10px] text-muted-foreground">
              grounded · schema-validated · audit-logged
            </p>
          </GlassPanel>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.t} delay={(i % 4) * 0.05}>
              <GlassPanel className="h-full p-5">
                <c.icon className="size-4 text-primary" />
                <h3 className="mt-3 font-display text-sm font-semibold">{c.t}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{c.d}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
