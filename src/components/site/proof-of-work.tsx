import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  X,
  ExternalLink,
  Layers,
  Cpu,
  ShieldCheck,
  Activity,
  Zap,
  Boxes,
  Bot,
  Workflow,
  Sparkles,
} from "lucide-react";
import { Counter, GlassPanel, Reveal, Section, SectionHeading } from "./ui";

export type ProofProject = {
  id: string;
  title: string;
  client: string;
  category: "Enterprise ERP & WMS" | "AI & n8n Workflows" | "Mobile & Field Apps" | "Healthcare & Compliance";
  image: string;
  timeline: string;
  location: string;
  summary: string;
  beforeState: string;
  engineeredSolution: string;
  results: { label: string; value: string; detail: string }[];
  techStack: string[];
  architectureHighlights: string[];
  metrics: { label: string; value: string }[];
};

export const proofProjects: ProofProject[] = [
  {
    id: "fmcg-wms",
    title: "Apex FMCG Multi-Warehouse WMS & Transfer Engine",
    client: "National FMCG & Logistics Group",
    category: "Enterprise ERP & WMS",
    image: "/images/wms_dashboard.png",
    timeline: "14 weeks to live cutover",
    location: "Singapore & SEA Distribution",
    summary:
      "Automated stock control, bin-level scanning, and real-time replenishment across 9 major warehouses.",
    beforeState:
      "Manual stock counts managed in detached Excel spreadsheets, resulting in a 3-day reporting lag and frequent stockouts during peak orders.",
    engineeredSolution:
      "High-throughput Go backend with PostgreSQL, real-time WebSockets telemetry, Android barcode scanner PWA, and automated purchase order generation.",
    results: [
      { label: "Stock Accuracy", value: "99.4%", detail: "Across 9 regional hubs" },
      { label: "Hours Automated", value: "740 hrs/mo", detail: "Manual entry eliminated" },
      { label: "Order Cycle Time", value: "-38%", detail: "From placement to dispatch" },
    ],
    techStack: ["Go", "PostgreSQL", "React", "Docker", "Kubernetes", "WebSockets"],
    architectureHighlights: [
      "Sub-second bin transfer validation queue",
      "Offline-first barcode scanner offline buffer",
      "Automated low-stock notification triggers to ERP",
      "Role-based audit logging for compliance",
    ],
    metrics: [
      { label: "Daily Transactions", value: "125,000+" },
      { label: "API Latency", value: "< 45ms" },
      { label: "Active Bin Locations", value: "14,200" },
    ],
  },
  {
    id: "ai-document-pipeline",
    title: "Autonomous AI Lead Triage & Document OCR Pipeline",
    client: "B2B Financial Services Group",
    category: "AI & n8n Workflows",
    image: "/images/ai_pipeline.png",
    timeline: "7 weeks deployment",
    location: "UK & European Operations",
    summary:
      "Self-hosted n8n engine with Anthropic Claude & OpenAI for autonomous lead qualification, document extraction, and instant CRM sync.",
    beforeState:
      "Sales leads and invoice PDFs sat in unread email inboxes for an average of 9 hours, causing lost conversions and slow processing.",
    engineeredSolution:
      "Resilient self-hosted n8n automation estate with multi-stage LLM evaluation, schema validation, dead-letter queues, and WhatsApp business notifications.",
    results: [
      { label: "Lead Triage Speed", value: "< 3 min", detail: "Down from 9 hours" },
      { label: "Qualified Lead Volume", value: "+64%", detail: "Instant response conversion" },
      { label: "First-Year ROI", value: "5.2x", detail: "Measured operational return" },
    ],
    techStack: ["n8n", "OpenAI", "Anthropic", "Python", "Redis", "PostgreSQL"],
    architectureHighlights: [
      "Zero data retention LLM processing guardrails",
      "Dead-letter queue with human-in-the-loop fallback",
      "Automatic PDF document entity extraction to ERP",
      "Multi-channel instant alert pipeline (Slack/WhatsApp)",
    ],
    metrics: [
      { label: "Monthly Executions", value: "48,000+" },
      { label: "Extraction Accuracy", value: "99.1%" },
      { label: "Failover SLA", value: "Zero Downtime" },
    ],
  },
  {
    id: "field-service-app",
    title: "RouteFlow Offline Field Dispatch & Service Platform",
    client: "Enterprise Logistics & Field Services",
    category: "Mobile & Field Apps",
    image: "/images/field_app.png",
    timeline: "9 weeks deployment",
    location: "Pan-regional Logistics Network",
    summary:
      "Offline-first mobile app for field engineers and delivery drivers, featuring GPS route optimization and digital proof of delivery.",
    beforeState:
      "Drivers updated delivery statuses via phone calls and paper receipts, leading to lost billing records and uncoordinated route backtracking.",
    engineeredSolution:
      "React Native & Expo cross-platform mobile application with SQLite local sync, barcode scanning, auto route optimization, and digital signature capture.",
    results: [
      { label: "Deliveries / Driver", value: "+22%", detail: "Optimized daily routes" },
      { label: "Dispute Rate", value: "-84%", detail: "Scan & signature proof" },
      { label: "Paperwork Saved", value: "100%", detail: "Fully paperless field ops" },
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Node.js", "Supabase", "Mapbox"],
    architectureHighlights: [
      "Offline-first SQLite queue with conflict-free sync",
      "Background GPS route calculation & ETA broadcast",
      "Digital signature and photo proof upload pipeline",
      "Real-time dispatch dashboard for office operators",
    ],
    metrics: [
      { label: "Active Field Drivers", value: "320+" },
      { label: "Daily Route Stops", value: "4,500+" },
      { label: "Sync Latency", value: "< 200ms" },
    ],
  },
  {
    id: "carepulse-healthcare",
    title: "CarePulse Unified Hospital EHR & Audit Command System",
    client: "Regional Hospital Network",
    category: "Healthcare & Compliance",
    image: "/images/healthcare_erp.png",
    timeline: "11 weeks to go-live",
    location: "Middle East Healthcare Network",
    summary:
      "High-availability patient record system, pharmacy inventory tracker, and emergency department command center.",
    beforeState:
      "Legacy desktop EHR system suffered from frequent nightly crashes, slow patient lookups, and incomplete audit trails.",
    engineeredSolution:
      "Containerised Docker microservices on AWS, read-replica PostgreSQL database cluster, automated HIPAA-level audit trail, and Grafana monitoring.",
    results: [
      { label: "System Uptime", value: "99.98%", detail: "24/7 SLA availability" },
      { label: "Page Load Speed", value: "-72%", detail: "Instant clinical lookup" },
      { label: "Cloud Infra Cost", value: "-44%", detail: "Optimized container architecture" },
    ],
    techStack: ["Docker", "AWS", "Terraform", "React", "FastAPI", "Grafana"],
    architectureHighlights: [
      "HIPAA compliance audit trail on every record write",
      "High availability database cluster with automated failover",
      "Real-time bed occupancy & pharmacy stock alerts",
      "Role-based access matrix for doctors, nurses & admins",
    ],
    metrics: [
      { label: "Patient Records", value: "1.2M+" },
      { label: "99.99th Percentile Latency", value: "120ms" },
      { label: "Audit Log Records", value: "18M+" },
    ],
  },
];

export function ProofOfWorkShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Systems");
  const [activeProject, setActiveProject] = useState<ProofProject | null>(null);
  const [viewModes, setViewModes] = useState<Record<string, "engineered" | "before">>({});

  const categories = [
    "All Systems",
    "Enterprise ERP & WMS",
    "AI & n8n Workflows",
    "Mobile & Field Apps",
    "Healthcare & Compliance",
  ];

  const filteredProjects =
    selectedCategory === "All Systems"
      ? proofProjects
      : proofProjects.filter((p) => p.category === selectedCategory);

  const toggleViewMode = (projectId: string) => {
    setViewModes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === "before" ? "engineered" : "before",
    }));
  };

  return (
    <Section id="proof-of-work" className="bg-surface/30">
      <SectionHeading
        eyebrow="Proof of engineering"
        title="Production-grade work. Real business outcomes."
        intro="Explore custom software platforms, AI automation pipelines, and operational engines engineered and deployed into production."
      />

      {/* Global Engineering Stats Banner */}
      <Reveal className="mt-10">
        <div className="glass-strong grid grid-cols-2 gap-6 rounded-2xl border-primary/30 p-6 md:grid-cols-4 md:p-8">
          <div className="space-y-1 text-left">
            <p className="font-display text-3xl font-bold text-foreground md:text-4xl">
              <Counter to={140} suffix="+" />
            </p>
            <p className="font-mono text-xs font-semibold text-primary uppercase">Production Deployments</p>
            <p className="text-[11px] text-muted-foreground">Across 11 countries</p>
          </div>
          <div className="space-y-1 text-left">
            <p className="font-display text-3xl font-bold text-foreground md:text-4xl">
              <Counter to={740} suffix=" hrs" />
            </p>
            <p className="font-mono text-xs font-semibold text-primary uppercase">Avg. Monthly Hours Saved</p>
            <p className="text-[11px] text-muted-foreground">Per enterprise project</p>
          </div>
          <div className="space-y-1 text-left">
            <p className="font-display text-3xl font-bold text-signal md:text-4xl">
              <Counter to={99.98} suffix="%" decimals={2} />
            </p>
            <p className="font-mono text-xs font-semibold text-signal uppercase">Measured SLA Uptime</p>
            <p className="text-[11px] text-muted-foreground">24/7 automated monitoring</p>
          </div>
          <div className="space-y-1 text-left">
            <p className="font-display text-3xl font-bold text-foreground md:text-4xl">
              <Counter to={4.82} prefix="$" suffix="M" decimals={2} />
            </p>
            <p className="font-mono text-xs font-semibold text-primary uppercase">Client Value Unlocked</p>
            <p className="text-[11px] text-muted-foreground">Annualized savings & growth</p>
          </div>
        </div>
      </Reveal>

      {/* Category Tabs */}
      <div className="mt-10 flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-mono font-medium transition-all ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground font-semibold shadow-md glow-ring"
                : "border border-border bg-surface/60 text-foreground/80 hover:text-foreground hover:bg-surface"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Proof Projects Grid */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project, idx) => {
          const isBeforeMode = viewModes[project.id] === "before";

          return (
            <Reveal key={project.id} delay={idx * 0.08}>
              <GlassPanel className="group flex h-full flex-col overflow-hidden border-primary/30 transition-all hover:border-primary/60">
                {/* Visual Image Preview Header */}
                <div className="relative h-64 w-full overflow-hidden bg-surface-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-background/80 px-3 py-1 font-mono text-[10px] font-bold text-signal backdrop-blur-md">
                      <span className="size-2 rounded-full bg-signal animate-pulse" />
                      LIVE IN PRODUCTION
                    </span>
                    <span className="rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
                      {project.timeline}
                    </span>
                  </div>

                  {/* Image Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[9px] text-primary uppercase font-bold border border-primary/30">
                      {project.category}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-foreground drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Before vs After View Switcher Button */}
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="font-mono text-xs text-muted-foreground">{project.client}</span>
                      <button
                        type="button"
                        onClick={() => toggleViewMode(project.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold transition-colors ${
                          isBeforeMode
                            ? "border-destructive/50 bg-destructive/10 text-destructive"
                            : "border-primary/40 bg-primary/10 text-primary"
                        }`}
                      >
                        {isBeforeMode ? (
                          <>
                            <X className="size-3" /> Showing Manual Problem
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-3" /> Engineered Solution
                          </>
                        )}
                      </button>
                    </div>

                    {/* Dynamic View: Before vs Engineered */}
                    <div className="mt-4">
                      {isBeforeMode ? (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                          <p className="font-mono text-[10px] font-bold text-destructive uppercase tracking-wider">
                            Legacy Manual State (Before)
                          </p>
                          <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                            {project.beforeState}
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                          <p className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider">
                            Foxquart Solution
                          </p>
                          <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                            {project.engineeredSolution}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Key Verified Results Cards */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {project.results.map((res) => (
                        <div
                          key={res.label}
                          className="rounded-xl border border-border/80 bg-surface/70 p-3 text-center transition-colors hover:border-primary/40"
                        >
                          <p className="font-display text-lg font-bold text-primary">{res.value}</p>
                          <p className="mt-0.5 text-[10px] font-semibold text-foreground truncate">{res.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Trigger Modal */}
                  <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground">{project.location}</span>
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline font-mono"
                    >
                      View Architecture &amp; Metrics <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          );
        })}
      </div>

      {/* Interactive Project Architecture Modal */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="glass-strong max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-primary/40 p-6 md:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <span className="rounded-full bg-primary/20 px-3 py-1 font-mono text-xs text-primary font-bold border border-primary/30">
                    {activeProject.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">{activeProject.client} · {activeProject.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-surface"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="mt-6 space-y-6">
                <div className="rounded-xl overflow-hidden border border-border h-64">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                    <p className="font-mono text-xs font-bold text-destructive uppercase">Challenge / Bottleneck</p>
                    <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{activeProject.beforeState}</p>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                    <p className="font-mono text-xs font-bold text-primary uppercase">Engineered Architecture</p>
                    <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{activeProject.engineeredSolution}</p>
                  </div>
                </div>

                {/* Key Architecture Highlights */}
                <div>
                  <p className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
                    Technical Architecture Highlights
                  </p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {activeProject.architectureHighlights.map((high) => (
                      <li key={high} className="flex items-start gap-2 text-sm text-foreground/90 font-medium">
                        <Check className="mt-0.5 size-4 shrink-0 text-signal font-bold" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Production Metrics Grid */}
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    Production Performance Telemetry
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    {activeProject.metrics.map((met) => (
                      <div key={met.label} className="rounded-xl border border-border/60 bg-surface-2 p-3">
                        <p className="font-display text-xl font-bold text-primary">{met.value}</p>
                        <p className="mt-1 text-[11px] font-mono text-muted-foreground">{met.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex justify-end border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full bg-primary px-6 py-2.5 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Close Architecture View
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
