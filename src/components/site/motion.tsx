import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, SplitText, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

/*
 * Shared motion primitives for the landing page. Rules every consumer inherits:
 * transform/opacity only, scroll-driven (scrub) rather than time-driven where the
 * trigger is scroll, everything no-ops under prefers-reduced-motion, and pinning
 * is reserved for `lg:` via gsap.matchMedia at the call site.
 */

/**
 * Headline reveal: splits into lines, masks each line, slides them up with a
 * stagger. The text is fully present in SSR HTML — SplitText runs client-side
 * only, so crawlers and no-JS visitors read normal markup.
 */
export function MaskLines({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  once = true,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, {
        type: "lines",
        linesClass: "mask-line",
        mask: "lines",
        autoSplit: true,
      });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 0.9,
        ease: EASE,
        stagger: 0.09,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Scroll-scrubbed parallax on a decorative layer. Never put text or CTAs in here. */
export function Parallax({
  children,
  className,
  from = 8,
  to = -8,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** yPercent at the start/end of the section's pass through the viewport. */
  from?: number;
  to?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { yPercent: from },
        {
          yPercent: to,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={style} aria-hidden="true">
      {children}
    </div>
  );
}

/**
 * Fade-and-rise on scroll entry for blocks that aren't headline text.
 * Replaces the old motion/react <Reveal> where GSAP already owns the section.
 */
export function Rise({
  children,
  className,
  y = 36,
  delay = 0,
  stagger,
  childSelector,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  /** When set with childSelector, staggers matched children instead of the wrapper. */
  stagger?: number;
  childSelector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = childSelector ? el.querySelectorAll(childSelector) : el;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.8,
        ease: EASE,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Infinite marquee. Pure CSS animation (see .marquee-track in styles.css), so it
 * costs no JS per frame; halts under reduced motion via the global killswitch.
 * Children are rendered twice — the second copy is aria-hidden.
 */
export function Marquee({
  children,
  className,
  trackClassName,
  reverse = false,
  duration = 36,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className={cn("marquee", className)}>
      <div
        className={cn("marquee-track", trackClassName)}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Magnetic pull on pointer-fine devices only; plain element on touch. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("inline-flex", className)}>
      {children}
    </div>
  );
}
