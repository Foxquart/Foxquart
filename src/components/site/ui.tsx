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
    <section
      id={id}
      className={cn("relative px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32", className)}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    // `w-fit` matters: as a flex child of SectionHeading the pill would otherwise
    // stretch to the full column width and read as a bar, not a label.
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
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
  eyebrow?: string;
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
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl">
        {title}
      </h2>
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
  // Start at the real number, not 0. The server renders it, crawlers and answer
  // engines read it, and a client with JS off or broken still shows the figure
  // instead of "0+ systems delivered". We only drop to 0 once we know the counter
  // is off-screen and will actually be watched into view.
  const [value, setValue] = useState(to);
  const armed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || armed.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return; // already visible: no count-up
    armed.current = true;
    setValue(0);
  }, []);

  useEffect(() => {
    if (!inView || !armed.current) return;
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
  return <div className={cn("glass rounded-2xl", lift && "card-lift", className)}>{children}</div>;
}

/**
 * The fox mark: two ears sweeping into a shield, with a Q counter cut from the muzzle.
 * Single even-odd path so it inherits `currentColor` and stays legible down to 16px.
 * Kept in sync with public/logo.svg.
 */
export function FoxquartIcon({ className = "size-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={cn("size-7 shrink-0 text-primary", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Centres the mark in its 512 box: without this it sits 84px from the top
          and 8px from the bottom, which reads as bottom-heavy at large sizes. */}
      <g transform="translate(256 256) scale(0.952) translate(-256 -294)">
        <path
          fillRule="evenodd"
          d="M97 84 L256 216 L415 84
           C415 84 413 246 404 318
           C396 382 380 424 356 456
           C332 488 292 504 256 504
           C220 504 180 488 156 456
           C132 424 116 382 108 318
           C99 246 97 84 97 84 Z
           M256 262
           C205 262 180 300 180 344
           C180 388 205 426 256 426
           C275 426 291 420 303 410
           L284 389 L311 366 L332 390
           C339 376 343 361 343 344
           C343 300 307 262 256 262 Z"
        />
      </g>
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
