import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FoxquartIcon } from "./ui";
import { Magnetic, Marquee, MaskLines, Parallax, Rise } from "./motion";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/*
 * Hero. The LCP element is the <h1> text — no image or canvas competes with it.
 * One decorative object: the fox mark, oversized, parallaxing off the right edge.
 * Display face is Instrument Serif (one weight; italics are the emphasis voice).
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
  const foxRef = useRef<HTMLDivElement>(null);

  /*
   * The cartoon intro, built from sprites cut out of the founder's artwork:
   * the fox head appears whole (hole filled), the Q-ball bounces in from the
   * left in two hops, leaps onto the head and lands exactly where the counter
   * belongs — at which point the true holed head swaps in and the mark punches
   * to rest. Afterwards a gentle idle rock repeats. Reduced motion shows the
   * finished mark immediately and nothing moves.
   */
  useGSAP(
    () => {
      const fox = foxRef.current;
      if (!fox) return;
      const full = fox.querySelector("[data-head-full]");
      const holed = fox.querySelector("[data-head-holed]");
      const ball = fox.querySelector("[data-ball]");
      if (!full || !holed || !ball) return;

      if (prefersReducedMotion()) {
        gsap.set(holed, { opacity: 1 });
        gsap.set(full, { opacity: 0 });
        gsap.set(ball, { opacity: 0 });
        return;
      }

      const START = { xPercent: -380, yPercent: 140, rotation: -160, scaleX: 1, scaleY: 1 };
      gsap.set(ball, { ...START, opacity: 1, transformOrigin: "50% 50%" });

      /*
       * One seamless cycle, repeated forever: the Q rolls in spinning, hops
       * twice with squash-and-stretch, crouches (anticipation), leaps onto the
       * face — the real holed artwork swaps in on impact — the head recoils and
       * settles, holds, then the Q pops back out and rolls away off-screen,
       * the head refills, and the cycle begins again from the exact start
       * state, so the loop has no visible seam.
       */
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9, delay: 0.6 });
      tl.from(fox, { rotation: -8, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      // Two roaming hops, spinning as it travels.
      for (const [toX, hopDur] of [
        [-250, 0.5],
        [-125, 0.45],
      ] as const) {
        tl.to(ball, { xPercent: toX, rotation: "+=110", duration: hopDur, ease: "none" }, "<")
          .to(ball, { yPercent: 60, duration: hopDur / 2, ease: "power2.out" }, "<")
          .to(ball, { yPercent: 140, duration: hopDur / 2, ease: "power2.in" }, ">")
          .to(ball, { scaleY: 0.8, scaleX: 1.14, duration: 0.09, ease: "power2.out" }, ">")
          .to(ball, { scaleY: 1.04, scaleX: 0.98, duration: 0.11, ease: "power2.out" }, ">")
          .to(ball, { scaleY: 1, scaleX: 1, duration: 0.08 }, ">");
      }
      // Anticipation: crouch, aim at the face…
      tl.to(ball, { scaleY: 0.72, scaleX: 1.2, yPercent: 148, duration: 0.22, ease: "power2.out" })
        // …and the leap, stretching in flight, spinning upright to land tail-true.
        .to(ball, { xPercent: 0, rotation: 0, duration: 0.5, ease: "none" })
        .to(
          ball,
          { yPercent: -55, scaleY: 1.12, scaleX: 0.92, duration: 0.28, ease: "power2.out" },
          "<",
        )
        .to(ball, { yPercent: 0, scaleY: 1, scaleX: 1, duration: 0.22, ease: "power3.in" }, ">")
        // Impact: the counter punches through and the head recoils like it took the hit.
        .set(full, { opacity: 0 })
        .set(holed, { opacity: 1 })
        .to(ball, { opacity: 0, duration: 0.18, ease: "power1.out" }, "<")
        .fromTo(
          fox,
          { scale: 1.06, rotation: 2.5 },
          { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" },
        )
        // Hold the finished mark, with one small proud rock.
        .to(fox, { rotation: -4, duration: 0.3, ease: "power2.inOut" }, "+=1.6")
        .to(fox, { rotation: 3, duration: 0.26, ease: "power2.inOut" })
        .to(fox, { rotation: 0, duration: 0.45, ease: "elastic.out(1, 0.5)" })
        // The Q pops back out and rolls away; the head refills. End = start.
        .to(ball, { opacity: 1, duration: 0.15 }, "+=1.9")
        .set(full, { opacity: 1 })
        .set(holed, { opacity: 0 })
        .to(ball, { yPercent: -40, duration: 0.22, ease: "power2.out" })
        .to(
          ball,
          { xPercent: START.xPercent, rotation: START.rotation, duration: 0.7, ease: "power1.in" },
          "<",
        )
        .to(ball, { yPercent: START.yPercent, duration: 0.5, ease: "power2.in" }, "<+=0.2")
        .to(fox, { rotation: -3, duration: 0.25, ease: "power2.inOut" }, "<")
        .to(fox, { rotation: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    },
    { scope: foxRef },
  );

  return (
    <section className="mesh-bg relative flex min-h-dvh flex-col overflow-hidden">
      {/* The mark as object — decorative, scrubbed, never in the reading path.
          Positioning lives on this wrapper; GSAP owns the transforms of the two
          nested layers (Parallax → translate, foxRef → rotation), so the layers
          never fight over one transform property. */}
      <div className="pointer-events-none absolute inset-y-0 -right-[16vw] flex items-center sm:-right-[8vw] lg:-right-[2vw]">
        <Parallax from={8} to={-8}>
          <div
            ref={foxRef}
            className="relative w-[72vw] opacity-[0.16] will-change-transform sm:w-[50vw] lg:w-[38vw] lg:opacity-[0.3]"
            style={{ aspectRatio: "900 / 1006" }}
          >
            {/* Sprites cut from public/foxquart.png — the mark is the artwork, verbatim. */}
            <img
              data-head-full
              src="/images/fox-head-full.webp"
              alt=""
              width={900}
              height={1006}
              className="absolute inset-0 size-full"
            />
            <img
              data-head-holed
              src="/images/fox-head-holed.webp"
              alt=""
              width={900}
              height={1006}
              className="absolute inset-0 size-full opacity-0"
            />
            {/* Resting geometry = the hole's measured position in the artwork:
                centre (48.94%, 67.77%), diameter 40.6% of the head's width. */}
            <img
              data-ball
              src="/images/fox-ball.webp"
              alt=""
              width={505}
              height={505}
              className="absolute w-[56.2%]"
              style={{ left: "20.86%", top: "42.65%" }}
            />
          </div>
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
            {/* Entity-first and self-contained on purpose — answer engines quote this
                passage for "what is Foxquart". Keep the definition in the first clause. */}
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              Foxquart is a product engineering studio. We build the operations systems,
              customer-facing products and automation a company runs on day to day — for teams still
              working out of spreadsheets, WhatsApp threads and paper files.
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
              See live systems
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
