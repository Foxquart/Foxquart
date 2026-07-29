import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight, Boxes, Activity, Bot, Cloud, Workflow, Bell } from "lucide-react";
import { Counter, MagneticLink } from "./ui";

function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    delay: (i % 9) * 0.7,
    size: i % 5 === 0 ? 3 : 2,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-primary/60"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 9 + (d.id % 5), repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${34 - (p / max) * 30}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="h-10 w-full">
      <motion.polyline
        points={d}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <polyline
        points={`0,36 ${d} 100,36`}
        fill="color-mix(in oklab, var(--primary) 14%, transparent)"
        stroke="none"
      />
    </svg>
  );
}

function Bars() {
  const bars = [42, 68, 55, 84, 61, 92, 74];
  return (
    <div className="flex h-16 items-end gap-1.5">
      {bars.map((b, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm bg-primary/70"
          initial={{ height: 0 }}
          animate={{ height: `${b}%` }}
          transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
        />
      ))}
    </div>
  );
}

function DashboardCard({
  title,
  icon,
  children,
  className,
  float = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  float?: number;
}) {
  return (
    <motion.div
      className={`glass rounded-xl p-4 ${className ?? ""}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6 + float, repeat: Infinity, ease: "easeInOut", delay: float }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase">{title}</span>
      </div>
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}

function HeroDashboard() {
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotateX = useTransform(rx, (v) => v);
  const rotateY = useTransform(ry, (v) => v);

  return (
    <motion.div
      className="relative w-full [perspective:1400px]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
        rx.set(-((e.clientY - (r.top + r.height / 2)) / r.height) * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-strong rounded-3xl p-4 md:p-5"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-signal" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              Operations Console
            </span>
          </div>
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-signal">
            LIVE
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          <DashboardCard title="Client Impact" icon={<Activity className="size-3.5" />} float={0.2}>
            <p className="font-display text-2xl font-semibold text-foreground">
              <Counter to={4.82} prefix="$" suffix="M" decimals={2} />
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Annualised value unlocked</p>
            <Sparkline points={[12, 18, 15, 24, 22, 31, 29, 38, 44]} />
          </DashboardCard>

          <DashboardCard title="Inventory Sync" icon={<Boxes className="size-3.5" />} float={0.9}>
            <p className="font-display text-2xl font-semibold text-foreground">
              <Counter to={99.4} suffix="%" decimals={1} />
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Stock accuracy across 9 hubs</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 1.4, delay: 0.4 }}
              />
            </div>
          </DashboardCard>

          <DashboardCard title="Daily Throughput" icon={<Activity className="size-3.5" />} float={1.4}>
            <p className="font-display text-2xl font-semibold text-foreground">
              <Counter to={1284} />
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Orders auto-processed today</p>
            <Bars />
          </DashboardCard>

          <DashboardCard title="AI Agent Actions" icon={<Bot className="size-3.5" />} float={0.6}>
            <div className="space-y-1.5 text-xs">
              <p className="rounded-lg bg-surface-2/90 px-2.5 py-1 text-muted-foreground font-mono text-[11px]">
                Query: "Which SKUs risk stockout?"
              </p>
              <motion.p
                className="rounded-lg bg-primary/20 px-2.5 py-1 text-foreground font-medium text-[11px]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                Action: 7 SKUs flagged · 3 POs drafted.
              </motion.p>
            </div>
          </DashboardCard>

          <DashboardCard title="Platform SLA" icon={<Cloud className="size-3.5" />} float={1.1}>
            <p className="font-display text-2xl font-semibold text-signal">
              <Counter to={99.98} suffix="%" decimals={2} />
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">30-day rolling uptime</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-5 flex-1 rounded-sm ${i === 9 ? "bg-warn/80" : "bg-signal/80"}`}
                />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Automation Engine" icon={<Workflow className="size-3.5" />} float={1.7}>
            <p className="font-display text-2xl font-semibold text-foreground">
              <Counter to={38} suffix="k" />
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Monthly runs · 0 downtime</p>
            <div className="mt-3 flex items-center gap-1.5">
              {["Form", "AI", "CRM", "ERP"].map((n) => (
                <span
                  key={n}
                  className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[9px] font-medium text-foreground"
                >
                  {n}
                </span>
              ))}
            </div>
          </DashboardCard>
        </div>

        <motion.div
          className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Bell className="size-4 text-accent" />
          <p className="text-xs text-muted-foreground">
            Invoice #48219 auto-approved · posted to ERP · Slack notified
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const light = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(45rem 30rem at ${x}% ${y}%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)`,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div ref={ref} className="relative grain overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mesh-bg animate-drift absolute inset-0 -z-10" />
      <motion.div className="absolute inset-0 -z-10" style={{ background: light }} />
      <div className="absolute -top-24 left-1/4 -z-10 size-[32rem] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 -z-10 size-[28rem] rounded-full bg-chart-4/10 blur-[120px]" />
      <Particles />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_1.15fr]">
        <div className="flex flex-col gap-7">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase"
          >
            <span className="size-1.5 rounded-full bg-signal animate-pulse-soft" />
            AI &amp; Software Engineering Studio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl leading-[1.03] font-semibold text-balance md:text-6xl xl:text-[4.2rem]"
          >
            <span className="text-gradient">Engineering software that runs modern businesses.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl text-base text-muted-foreground md:text-lg"
          >
            We build custom software, AI automation, cloud infrastructure, enterprise dashboards and
            intelligent workflows that eliminate repetitive work and help businesses scale faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticLink to="/contact">
              Schedule a strategy call <ArrowRight className="size-4" />
            </MagneticLink>
            <MagneticLink href="#services" variant="ghost">
              Explore solutions
            </MagneticLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-2 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {[
              { v: <Counter to={140} suffix="+" />, l: "Systems delivered" },
              { v: <Counter to={99.98} suffix="%" decimals={2} />, l: "Measured uptime" },
              { v: <Counter to={410} suffix="k" />, l: "Manual hours removed" },
            ].map((s, i) => (
              <div key={i}>
                <dt className="font-display text-2xl font-semibold">{s.v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </div>
  );
}
