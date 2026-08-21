import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { FoxquartIcon } from "./ui";
import { Magnetic, Marquee, MaskLines, Parallax, Rise } from "./motion";

/*
 * Hero. The LCP element is the <h1> text; the forest photo behind it is a
 * decorative backdrop, never the paint that gates LCP (the h1's own text
 * paints independently of the <img> decoding). The fox logo mark sits on top
 * of it to the right, static but for a light scroll parallax drift.
 *
 * The photo is dark, so this section pins to the dark palette via a local
 * `dark` class regardless of the site-wide theme toggle -- a light-theme
 * visitor would otherwise get dark-mode-only foreground text over a photo
 * that never lightens. That makes the hero a fixed dark band with a clean
 * edge into the next (theme-following) section, not a seamless blend; the
 * photo's own dark edges make that edge read as intentional rather than a
 * broken theme switch. Display face is Instrument Serif (one weight; italics
 * are the emphasis voice).
 */

const marqueeSystems = [
  "Inventory & Warehouse",
  "Hospital ERP",
  "School Management",
  "Restaurant POS",
  "Custom CRM",
  "AI Automation",
  "Booking Systems",
  "Data Pipelines",
];

export function Hero() {
  return (
    <section className="dark relative flex min-h-dvh flex-col overflow-hidden">
      {/* Full-bleed photo backdrop, painted before everything else so later
          siblings (fox mark, content, marquee) stack above it by DOM order
          alone -- no z-index needed. The scrim fades the photo into the
          section's own (forced-dark) background at the edges, and a flat
          wash over the middle keeps the headline readable regardless of
          where the photo itself is busy. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Picture
          src="/images/hero.png"
          alt=""
          priority
          className="size-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/60 to-background" />
      </div>

      {/* Below lg, the logo folds into the backdrop instead of sitting as a
          foreground cutout: full-bleed, faint, blended with the forest photo
          so it never competes with the headline on a small viewport. */}
      <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true">
        <Picture
          src="/images/logohero.png"
          alt=""
          className="size-full object-cover object-center opacity-[0.14]"
          sizes="100vw"
        />
      </div>

      {/* Large screens: the logo sits low and right, in the photo's own
          empty ground -- clear of both the headline measure above and the
          marquee strip below. Muted saturation/brightness plus a soft,
          photo-realistic shadow (not a flat sticker drop-shadow) so it reads
          as part of the scene rather than pasted over it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-end pb-[9vh] lg:flex xl:pb-[11vh]">
        <Parallax from={8} to={-8}>
          <Picture
            src="/images/logohero.png"
            alt=""
            className="w-[40vw] max-w-xl opacity-95 saturate-[0.85] brightness-[0.94] drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)] xl:w-[902vw]"
            sizes="40vw"
          />
        </Parallax>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-32 pb-16 sm:px-5 lg:px-8 lg:pt-36">
        <div className="max-w-6xl">
          {/* LCP element. Serif at display scale; the promise's verb carries the italic. */}
          <MaskLines
            as="h1"
            className="font-display text-[clamp(2.9rem,8vw,5.9rem)] leading-[1.04] text-foreground"
          >
            Software your business <em className="text-primary italic">runs&nbsp;on.</em>
            <br />
            Built in weeks. <span className="text-muted-foreground">Built to keep.</span>
          </MaskLines>

          <Rise delay={0.35} className="mt-6 max-w-xl">
            {/* Entity-first and self-contained on purpose, answer engines quote this
                passage for "what is Foxquart". Keep the definition in the first clause. */}
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              Foxquart is a product engineering studio. We turn spreadsheets, WhatsApp threads and
              paper files into one system your team runs on.
            </p>
          </Rise>

          <Rise
            delay={0.5}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Magnetic className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="group press inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-colors duration-[var(--dur-micro)] hover:bg-[var(--primary-hover)] sm:w-auto"
              >
                Book a 30-min build review
                <ArrowRight className="icon-nudge size-4" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Link
              to="/work"
              className="press inline-flex min-h-13 w-full items-center justify-center rounded-full border border-border bg-surface px-7 text-base font-medium text-foreground transition-colors duration-[var(--dur-micro)] hover:bg-surface-2 sm:w-auto"
            >
              See live demos
            </Link>
          </Rise>

          <Rise delay={0.62} className="mt-6">
            <p className="text-sm text-muted-foreground">
              <span className="tnum">Typical delivery 3–5 weeks</span>
              <span aria-hidden="true"> · </span>
              Senior engineers only
            </p>
          </Rise>
        </div>
      </div>

      {/* Full-bleed systems strip along the hero's bottom edge. */}
      <div className="relative border-t border-border py-5">
        <Marquee duration={44}>
          {marqueeSystems.map((s) => (
            <span key={s} className="flex items-center">
              <span className="eyebrow-type px-6 text-muted-foreground">{s}</span>
              <FoxquartIcon className="size-3 shrink-0 text-primary/50" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
