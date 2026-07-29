import { Link } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-24 md:px-8 md:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
      <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl leading-[1.08] font-semibold text-balance md:text-5xl">{title}</h2>
      {intro ? <p className="text-base text-muted-foreground md:text-lg">{intro}</p> : null}
    </Reveal>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function MagneticLink({
  to,
  href,
  children,
  variant = "primary",
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-ring"
      : "glass text-foreground hover:border-primary/50",
    className,
  );

  const content = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-flex"
    >
      {to ? (
        <Link to={to} className={base}>
          {children}
        </Link>
      ) : (
        <a href={href} className={base}>
          {children}
        </a>
      )}
    </motion.div>
  );

  return content;
}

export function GlassPanel({
  children,
  className,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <div className={cn("glass rounded-2xl", lift && "card-lift", className)}>{children}</div>
  );
}

export function FoxquartIcon({ className = "size-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={cn("size-7 text-primary shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <path
          id="fox-blade-path"
          d="M 50,48 C 55,40 68,25 58,12 C 75,24 73,43 50,48 Z"
        />
      </defs>
      <use href="#fox-blade-path" transform="rotate(0 50 50)" />
      <use href="#fox-blade-path" transform="rotate(120 50 50)" />
      <use href="#fox-blade-path" transform="rotate(240 50 50)" />
    </svg>
  );
}

export function FoxquartLogo({
  iconClassName = "size-7",
  textClassName = "font-display text-xl font-bold tracking-tight text-foreground",
}: {
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <FoxquartIcon className={iconClassName} />
      <span className={textClassName}>Foxquart</span>
    </span>
  );
}
