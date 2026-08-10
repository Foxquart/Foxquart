import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { PHONE_NUMBERS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * How much of the first viewport has to scroll past before the bar appears.
 * The hero fills roughly one screen, so this stands in for "the hero is gone"
 * without reaching into a file this component does not own.
 */
const HERO_SCROLLED_RATIO = 0.85;

type StickyCtaProps = {
  /**
   * The closing CTA panel. While it is on screen the bar hides, so the floating
   * action never covers the real one.
   */
  closingCtaSelector?: string;
};

/**
 * Mobile-only action bar. Hidden at `md:` and above, hidden until the hero has
 * scrolled away, and hidden again once the closing CTA is in view.
 */
export function StickyCta({ closingCtaSelector = "#contact" }: StickyCtaProps = {}) {
  const [pastHero, setPastHero] = useState(false);
  const [closingCtaInView, setClosingCtaInView] = useState(false);

  // Scroll position, sampled at most once per frame via rAF — the listener itself
  // only schedules, it never measures.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setPastHero(window.scrollY > window.innerHeight * HERO_SCROLLED_RATIO);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure(); // restored scroll positions and in-page anchors land mid-document
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // The closing panel is watched with an observer rather than measured on scroll.
  useEffect(() => {
    const target = document.querySelector(closingCtaSelector);
    if (!target) return;

    // Seeded synchronously: the observer's first callback lands a task later, and a
    // deep link straight to #contact would otherwise flash the bar for one frame.
    const rect = target.getBoundingClientRect();
    setClosingCtaInView(rect.top < window.innerHeight && rect.bottom > 0);

    const observer = new IntersectionObserver(
      ([entry]) => setClosingCtaInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [closingCtaSelector]);

  const shown = pastHero && !closingCtaInView;
  const phone = PHONE_NUMBERS[0];

  return (
    <div
      inert={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pt-3 md:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        "transition-[transform,opacity] duration-[var(--dur-base)] ease-[var(--ease-brand)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-border bg-surface p-1.5 shadow-[var(--shadow-elevated)]">
        <Link
          to="/contact"
          className="press flex min-h-12 flex-1 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-brand)] hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Book a build review
        </Link>
        <a
          href={phone.tel}
          aria-label={`Call Foxquart on ${phone.formatted}`}
          className="press grid size-12 shrink-0 place-items-center rounded-full border border-border bg-surface-2 text-primary transition-colors duration-[var(--dur-micro)] ease-[var(--ease-brand)] hover:border-[var(--border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
