import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { animate, stagger, steps, type JSAnimation } from "animejs";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  introOverlayMounts,
  introWillPlay,
  resolveIntro,
  resolveIntroPrepare,
} from "@/lib/intro-gate";

/*
 * Cinematic intro for hard loads of "/", in the register of a studio logo open:
 * abstract brand fragments flicker inside the wordmark's letterforms while the
 * camera pushes in, the lockup settles to the artwork verbatim, the Q counter
 * punches through the head (the brand's signature beat, mirrored from the hero
 * cartoon), and the exit zooms through that hole into the page. Light and
 * brand-true throughout: the Vanilla Veil ground with Velvet Merlot type and
 * Crimson Royale accents, all via tokens; the artwork keeps its own colors.
 *
 * Anime.js owns the flicker montage; GSAP owns the master timeline and exit.
 * The overlay is SSR'd (the server only renders this route for hard loads of
 * "/"), so the hold state paints with the first CSS paint and hydration always
 * matches. SPA remounts render null via introOverlayMounts(). The intro plays
 * on every hard load of "/", by design.
 */

/*
 * Vector fox silhouette, kept in sync with FoxquartIcon in ui.tsx. Decorative
 * flicker fragments ONLY: the lockup itself is always the founder's raster
 * artwork (the same sprites the hero uses), never this simplified vector.
 */
const FOX_PATH =
  "M104 88 C154 136 206 184 256 216 C306 184 358 134 408 86 C404 214 396 300 336 372 " +
  "C310 402 282 426 256 431 C230 426 202 402 176 372 C116 300 108 214 104 88 Z " +
  "M256 266 a62 62 0 1 0 0.01 0 Z M284 373 L301 356 L322 377 L305 394 Z";

/*
 * Artwork geometry on the 1600x900 stage. The head sprite (900:1006) is centred
 * on x=800 above the wordmark. The counter hole, measured from the sprite's
 * alpha channel: centre (49.28%, 68.09%) of the head box, diameter 41.2% of its
 * width. The hole is the exit portal.
 */
const ART_W = 240;
const ART_H = (ART_W * 1006) / 900;
const ART_X = 800 - ART_W / 2;
const ART_Y = 90;
const PORTAL_CX = ART_X + 0.4928 * ART_W;
const PORTAL_CY = ART_Y + 0.6809 * ART_H;
const PORTAL_R = 0.206 * ART_W;

const WORDMARK = {
  x: 800,
  y: 640,
  fontSize: 190,
  fontFamily: '"Instrument Serif", serif',
  letterSpacing: "0.02em",
} as const;

type FragKind = "fox" | "ring" | "card" | "cross" | "rows" | "arcs";
type Frag = {
  kind: FragKind;
  x: number;
  y: number;
  s?: number;
  rot?: number;
  tone?: "fg" | "primary";
};

/*
 * Deterministic fragment layout (SSR and client must render identical markup).
 * Everything sits inside the lockup mask: the head silhouette (~x 700-900,
 * y 120-350) and the wordmark band (~x 330-1270, y 505-645). Abstract brand
 * shapes only: fox marks, wireframes, rings, grids.
 */
const FRAGMENTS: Frag[] = [
  { kind: "ring", x: 800, y: 265, s: 1.1, tone: "primary" },
  { kind: "rows", x: 800, y: 195, tone: "fg" },
  { kind: "fox", x: 800, y: 250, s: 0.5, tone: "fg" },
  { kind: "cross", x: 758, y: 175, tone: "fg" },
  { kind: "arcs", x: 848, y: 240, s: 0.9, tone: "primary" },
  { kind: "card", x: 800, y: 320, s: 0.7, rot: -6, tone: "primary" },
  { kind: "ring", x: 700, y: 620, s: 0.8, tone: "primary" },
  { kind: "rows", x: 500, y: 600, tone: "fg" },
  { kind: "arcs", x: 1240, y: 540, s: 0.8, tone: "primary" },
  { kind: "fox", x: 380, y: 575, s: 0.55, rot: -10, tone: "primary" },
  { kind: "card", x: 470, y: 570, rot: -8, tone: "fg" },
  { kind: "ring", x: 560, y: 595, s: 0.9, tone: "fg" },
  { kind: "arcs", x: 640, y: 585, s: 0.7, tone: "fg" },
  { kind: "rows", x: 730, y: 555, tone: "primary" },
  { kind: "fox", x: 830, y: 585, s: 0.6, rot: 12, tone: "fg" },
  { kind: "arcs", x: 930, y: 565, tone: "fg" },
  { kind: "card", x: 1030, y: 585, rot: 6, tone: "primary" },
  { kind: "cross", x: 1120, y: 550, tone: "fg" },
  { kind: "fox", x: 1210, y: 575, s: 0.48, rot: -14, tone: "fg" },
  { kind: "ring", x: 1150, y: 610, s: 0.6, tone: "primary" },
  { kind: "ring", x: 420, y: 540, s: 0.7, tone: "primary" },
  { kind: "rows", x: 980, y: 620, tone: "fg" },
  { kind: "card", x: 350, y: 610, s: 0.8, rot: 4, tone: "fg" },
  { kind: "cross", x: 540, y: 545, s: 0.9, tone: "fg" },
  { kind: "cross", x: 880, y: 530, tone: "primary" },
];

function FragShape({ kind, s = 1, tone = "fg" }: Frag) {
  const color = tone === "primary" ? "var(--primary)" : "var(--foreground)";
  switch (kind) {
    case "fox":
      return (
        <path
          d={FOX_PATH}
          fillRule="evenodd"
          fill={color}
          transform={`scale(${s}) translate(-256 -256)`}
        />
      );
    case "ring":
      return (
        <circle r={90 * s} fill="none" stroke={color} strokeWidth={3} strokeDasharray="12 16" />
      );
    case "card":
      return (
        <g stroke={color} strokeWidth={3} fill="none" transform={`scale(${s})`}>
          <rect x={-110} y={-70} width={220} height={140} rx={10} />
          <line x1={-80} y1={-30} x2={40} y2={-30} />
          <line x1={-80} y1={0} x2={70} y2={0} />
          <circle cx={-80} cy={38} r={9} />
        </g>
      );
    case "cross":
      return (
        <g stroke={color} strokeWidth={3} fill="none" transform={`scale(${s})`}>
          <line x1={-34} y1={0} x2={34} y2={0} />
          <line x1={0} y1={-34} x2={0} y2={34} />
          <circle r={20} />
        </g>
      );
    case "rows":
      return (
        <g stroke={color} strokeWidth={4} transform={`scale(${s})`}>
          {[150, 110, 170, 90, 130].map((w, i) => (
            <line key={i} x1={-w / 2} y1={(i - 2) * 16} x2={w / 2} y2={(i - 2) * 16} />
          ))}
        </g>
      );
    case "arcs":
      return (
        <g stroke={color} strokeWidth={3} fill="none" transform={`scale(${s})`}>
          <circle r={60} strokeDasharray="40 30" />
          <circle r={95} strokeDasharray="90 50" />
        </g>
      );
  }
}

export function IntroLoader() {
  // Hydration must match the SSR'd overlay exactly, so the initial state never
  // consults client-only signals (reduced motion); the reduced-motion CSS below
  // hides the overlay pre-paint when it won't play, and the effect unmounts it
  // before the browser ever composits it.
  const [show, setShow] = useState(() =>
    typeof window === "undefined" ? true : introOverlayMounts(),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const cleanedRef = useRef(false);

  useGSAP(
    () => {
      const root = rootRef.current;

      /* Idempotent teardown: releases gated entrances, unlocks scroll, unmounts.
         Reached from completion, skip-exit end, failsafe, or unmount mid-play. */
      const finish = () => {
        if (cleanedRef.current) return;
        cleanedRef.current = true;
        resolveIntro();
        setShow(false);
        lenisRef.current?.start();
        // Deferred: a synchronous refresh would share a frame with the
        // overlay's unmount and hitch the handoff, visibly so on phones.
        gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
      };

      if (!root) return; // SPA remount: rendered null
      if (!introWillPlay()) {
        // Reduced motion (the overlay is already display:none via CSS) or replay.
        finish();
        return;
      }

      lenisRef.current?.stop();
      const failsafe = window.setTimeout(finish, 6000);

      const stage = root.querySelector("[data-stage]");
      const jitterEl = root.querySelector("[data-jitter]");
      const base = root.querySelector("[data-base]");
      const layer1 = root.querySelector("[data-layer1]");
      const wordmark = root.querySelector("[data-wordmark]");
      const flood = root.querySelector("[data-flood]");
      const probe = root.querySelector("[data-portal-probe]");
      const frags = root.querySelectorAll("[data-frag]");
      if (!stage || !jitterEl || !base || !layer1 || !wordmark || !flood || !probe) {
        finish();
        return () => window.clearTimeout(failsafe);
      }

      const animeInstances: JSAnimation[] = [];
      let flicker: JSAnimation | undefined;
      let jitter: JSAnimation | undefined;
      const exit = { scale: 12 };

      const startFlicker = () => {
        flicker = animate(frags, {
          opacity: [
            { to: 1, duration: 50 },
            { to: 0, duration: 70 },
            { to: 0.85, duration: 40 },
            { to: 0, duration: 90 },
            { to: 1, duration: 45 },
            { to: 0, duration: 60 },
          ],
          ease: steps(1),
          delay: () => Math.random() * 420,
          loop: true,
        });
        animeInstances.push(flicker);
      };
      const startSettle = () => {
        flicker?.pause();
        animeInstances.push(
          animate(frags, {
            opacity: 0,
            duration: 180,
            delay: stagger(24),
            ease: "outQuad",
          }),
        );
      };
      const startJitter = () => {
        jitter = animate(jitterEl, {
          x: [
            { to: 0.6, duration: 60 },
            { to: -0.5, duration: 60 },
            { to: 0.35, duration: 60 },
            { to: -0.6, duration: 60 },
          ],
          y: [
            { to: -0.4, duration: 60 },
            { to: 0.5, duration: 60 },
            { to: -0.6, duration: 60 },
            { to: 0.3, duration: 60 },
          ],
          ease: steps(1),
          loop: true,
        });
        animeInstances.push(jitter);
      };
      const stopJitter = () => {
        jitter?.pause();
        gsap.set(jitterEl, { x: 0, y: 0 });
      };

      /* Measured at exit time so the zoom's origin is the portal's true screen
         position (the probe rides every stage transform and the meet scaling). */
      const prepareExit = () => {
        const r = probe.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const r0 = Math.max(r.width / 2, 1);
        const far = Math.max(
          Math.hypot(cx, cy),
          Math.hypot(window.innerWidth - cx, cy),
          Math.hypot(cx, window.innerHeight - cy),
          Math.hypot(window.innerWidth - cx, window.innerHeight - cy),
        );
        exit.scale = Math.max(6, (far / r0) * 1.06);
        gsap.set(root, { transformOrigin: `${cx}px ${cy}px` });
      };

      const tl = gsap.timeline({ paused: true, onComplete: finish });
      // The push-in runs underneath phases A and B, Ken Burns slow.
      tl.fromTo(stage, { scale: 1 }, { scale: 1.12, duration: 2.45, ease: "power1.inOut" }, 0);
      tl.call(startFlicker, undefined, 0);
      tl.call(startSettle, undefined, 1.1);
      tl.to(wordmark, { opacity: 1, duration: 0.3, ease: "power2.out" }, 1.22);
      // The punch: one hard cut swaps the full head for the holed head, the
      // counter appearing as if the ball just went through (the hero cartoon's
      // impact, prefigured). A small elastic recoil sells the hit. Nothing
      // changes color; the wordmark text stays visible through the cover's
      // letter knockouts, so the lockup holds steady through the cut.
      tl.set(flood, { opacity: 1 }, 1.72);
      tl.set([layer1, ...root.querySelectorAll("[data-art]")], { autoAlpha: 0 }, 1.72);
      tl.fromTo(
        root,
        { scale: 1.018 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" },
        1.72,
      );
      tl.call(startJitter, undefined, 1.85);
      // The hold is the one static beat: entrances pay their layout costs now
      // (SplitText surgery, trigger measurement) so the zoom stays jank-free.
      tl.call(resolveIntroPrepare, undefined, 1.95);
      tl.call(stopJitter, undefined, 2.4);
      tl.addLabel("exit", 2.45);
      tl.set(base, { autoAlpha: 0 }, "exit");
      tl.call(prepareExit, undefined, "exit");
      tl.to(root, { scale: () => exit.scale, duration: 1, ease: "power3.in" }, "exit");
      // Release the header cascade and hero reveals while the zoom finishes.
      tl.call(resolveIntro, undefined, 3.0);

      // Hold on the plain brand ground until the display face is ready, capped
      // so a slow font never stalls the intro.
      let started = false;
      const begin = () => {
        if (started || cleanedRef.current) return;
        started = true;
        tl.play();
      };
      const fontsReady =
        typeof document.fonts?.load === "function"
          ? Promise.race([
              document.fonts
                .load(`400 ${WORDMARK.fontSize}px "Instrument Serif"`)
                .then(() => document.fonts.ready),
              new Promise((resolve) => setTimeout(resolve, 800)),
            ])
          : Promise.resolve();
      void fontsReady.then(begin, begin);

      // Skip: any pointer press or key jumps straight to the exit zoom.
      let skipScheduled = false;
      const skip = (event: Event) => {
        if (
          event instanceof KeyboardEvent &&
          ["Shift", "Control", "Alt", "Meta"].includes(event.key)
        )
          return;
        if (skipScheduled || cleanedRef.current || tl.time() >= 2.45) return;
        skipScheduled = true;
        // The input frame stays cheap (INP is the site's weakest field metric,
        // and taps land mid-intro on busy phones): just freeze the montage now.
        // resolveIntroPrepare's SplitText surgery, the exit measurement and the
        // seek all run after this frame presents; rAF alone fires before the
        // pending paint, rAF + timeout lands after it. One frame of extra hold
        // (~16ms) before the zoom reacts is imperceptible.
        started = true;
        for (const a of animeInstances) a.pause();
        tl.pause();
        requestAnimationFrame(() => {
          window.setTimeout(() => {
            if (cleanedRef.current) return;
            // Seeking skips the timeline's prepare call; fire it by hand so
            // gated entrances still pre-build before the zoom.
            resolveIntroPrepare();
            prepareExit();
            tl.seek("exit");
            tl.timeScale(1.3);
            tl.play();
          }, 0);
        });
      };
      root.addEventListener("pointerdown", skip);
      window.addEventListener("keydown", skip);

      return () => {
        window.clearTimeout(failsafe);
        root.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", skip);
        for (const a of animeInstances) a.pause();
        finish();
      };
    },
    { scope: rootRef },
  );

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      data-intro-overlay
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden will-change-transform"
    >
      {/* SSR'd with the overlay and removed with it: scroll stays locked from
          first paint, and reduced-motion kills the intro before any JS runs. */}
      <style>{`
        html:has([data-intro-overlay]) { overflow: hidden !important; }
        @media (prefers-reduced-motion: reduce) { [data-intro-overlay] { display: none !important; } }
      `}</style>

      {/* Brand-ground base, separate from the root so the flood's knockouts can
          reveal the live page once the base is cut away. */}
      <div data-base className="absolute inset-0 bg-background" />

      <div data-stage className="absolute inset-0 will-change-transform">
        <div data-jitter className="absolute inset-0">
          <svg className="h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Turns the head sprite's alpha into a white silhouette so the
                  luminance mask below can use the artwork's true shape. */}
              <filter id="fq-intro-alpha">
                <feFlood floodColor="#fff" result="f" />
                <feComposite in="f" in2="SourceAlpha" operator="in" />
              </filter>
              {/* Luminance mask: fragments exist only inside the lockup, the
                  wordmark's letterforms and the head's artwork silhouette. */}
              <mask
                id="fq-intro-letters"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1600"
                height="900"
              >
                <text {...WORDMARK} textAnchor="middle" fill="#fff">
                  FOXQUART
                </text>
                <image
                  href="/images/fox-head-full.webp"
                  x={ART_X}
                  y={ART_Y}
                  width={ART_W}
                  height={ART_H}
                  filter="url(#fq-intro-alpha)"
                />
              </mask>
              {/* Cover mask: knocks the wordmark and the portal circle out of
                  the cover's ground rect, so the solid text beneath shows through
                  the letters and the hole opens onto whatever sits behind the
                  overlay. The circle is a hair larger than the sprite's hole so
                  its rim never fringes; the artwork drawn above re-covers the
                  excess. */}
              <mask
                id="fq-intro-flood"
                maskUnits="userSpaceOnUse"
                x="-4000"
                y="-4000"
                width="9600"
                height="8900"
              >
                <rect x="-4000" y="-4000" width="9600" height="8900" fill="#fff" />
                <text {...WORDMARK} textAnchor="middle" fill="#000">
                  FOXQUART
                </text>
                <circle cx={PORTAL_CX} cy={PORTAL_CY} r={PORTAL_R + 1.2} fill="#000" />
              </mask>
            </defs>

            {/* Phase A stage: the flicker montage, clipped to the lockup. */}
            <g data-layer1 mask="url(#fq-intro-letters)">
              {FRAGMENTS.map((f, i) => (
                <g
                  key={i}
                  data-frag
                  opacity="0"
                  transform={`translate(${f.x} ${f.y}) rotate(${f.rot ?? 0})`}
                >
                  <FragShape {...f} />
                </g>
              ))}
            </g>

            {/* Solid lockup, crossfaded in at the settle: the founder's artwork
                verbatim over the wordmark. The FULL head (counter not yet
                punched) so no detached Q floats on the open field; the punch
                beat opens it. Held at 0.02 rather than 0 so the SSR hold state
                paints an LCP candidate. */}
            <g data-wordmark opacity="0.02">
              <image
                data-art
                href="/images/fox-head-full.webp"
                x={ART_X}
                y={ART_Y}
                width={ART_W}
                height={ART_H}
              />
              <text {...WORDMARK} textAnchor="middle" fill="var(--foreground)">
                FOXQUART
              </text>
            </g>

            {/* Phase B/C cover: same brand field, but the HOLED head verbatim,
                so cutting to it reads as the counter punching through. The
                mask's portal knock opens the hole through the ground rect too;
                the artwork's own tail diamond overlaps the window's edge, so
                the opening reads as the Q counter, not a bare circle. */}
            <g data-flood opacity="0">
              {/* Mask on the rect only: the artwork above must keep its tail
                  diamond over the window's edge. */}
              <rect
                x="-4000"
                y="-4000"
                width="9600"
                height="8900"
                fill="var(--background)"
                mask="url(#fq-intro-flood)"
              />
              <image
                href="/images/fox-head-holed.webp"
                x={ART_X}
                y={ART_Y}
                width={ART_W}
                height={ART_H}
              />
            </g>

            {/* Invisible geometry probe: the exit zoom measures the portal's
                on-screen position and radius from this element. */}
            <circle
              data-portal-probe
              cx={PORTAL_CX}
              cy={PORTAL_CY}
              r={PORTAL_R}
              fill="none"
              stroke="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
