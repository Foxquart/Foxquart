import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/*
 * The scrollbar as a lift, drawn the way a real passenger lift reads: a framed
 * car with centre-opening metal doors and, above them, an LED indicator showing
 * the floor and travel direction. Page top is "G" (ground), the bottom is floor
 * 9; the arrows light with the direction of travel; when the lift stops the
 * doors slide open on a warm-lit car, then it fades away until the next scroll.
 * No shaft rails or cables; the car rides an invisible track.
 *
 * The cabin is a real control: drag it (mouse or touch) to move the page 1:1
 * (Lenis is bypassed with immediate scrolls while dragging), arrow/page keys
 * work when focused, and it exposes slider semantics to assistive tech.
 * Reduced-motion visitors keep the browser's native scrollbar instead.
 */
export function LiftScrollbar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (prefersReducedMotion()) {
        root.style.display = "none";
        return;
      }
      const shaft = root.querySelector<HTMLElement>("[data-shaft]");
      const cabin = root.querySelector<HTMLElement>("[data-cabin]");
      const floorEl = root.querySelector<HTMLElement>("[data-floor]");
      const upEl = root.querySelector<HTMLElement>("[data-up]");
      const downEl = root.querySelector<HTMLElement>("[data-down]");
      const doors = root.querySelectorAll<HTMLElement>("[data-door]");
      if (!shaft || !cabin || !floorEl) return;

      const range = () => shaft.clientHeight - cabin.clientHeight;
      const maxScroll = () => ScrollTrigger.maxScroll(window);

      gsap.to(cabin, {
        y: range,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true, invalidateOnRefresh: true },
      });

      const setDoors = (open: boolean) =>
        gsap.to(doors, {
          xPercent: (i) => (open ? (i === 0 ? -88 : 88) : 0),
          duration: 0.35,
          ease: "power2.inOut",
        });

      // Visible while scrolling or dragging; when travel stops, the doors open,
      // then the whole lift fades until the next movement.
      gsap.set(root, { autoAlpha: 0, x: 6 });
      let fuse: ReturnType<typeof gsap.delayedCall> | null = null;
      let dragging = false;
      const show = () => {
        setDoors(false);
        gsap.to(root, { autoAlpha: 1, x: 0, duration: 0.25, ease: "power2.out" });
        fuse?.kill();
        fuse = gsap.delayedCall(0.8, () => {
          if (dragging) return;
          setDoors(true);
          gsap.to(root, {
            autoAlpha: 0,
            x: 6,
            duration: 0.5,
            ease: "power2.in",
            delay: 0.9,
          });
        });
      };

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          show();
          const floor = Math.round(self.progress * 9);
          floorEl.textContent = floor === 0 ? "G" : String(floor);
          cabin.setAttribute("aria-valuenow", String(Math.round(self.progress * 100)));
          // Page-down = the car travelling down: light the down arrow.
          if (upEl && downEl) {
            upEl.style.opacity = self.direction === -1 ? "1" : "0.25";
            downEl.style.opacity = self.direction === 1 ? "1" : "0.25";
          }
        },
      });

      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        cabin.setPointerCapture(e.pointerId);
        show();
        e.preventDefault();
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        const rect = shaft.getBoundingClientRect();
        const ratio = gsap.utils.clamp(
          0,
          1,
          (e.clientY - rect.top - cabin.clientHeight / 2) / range(),
        );
        const top = ratio * maxScroll();
        const l = lenisRef.current;
        // Bypass every smoothing layer while the finger owns the cabin.
        if (l) l.scrollTo(top, { immediate: true, force: true });
        else window.scrollTo({ top, behavior: "auto" });
      };
      const onPointerUp = (e: PointerEvent) => {
        dragging = false;
        if (cabin.hasPointerCapture(e.pointerId)) cabin.releasePointerCapture(e.pointerId);
        show();
      };
      const onKeyDown = (e: KeyboardEvent) => {
        const step = window.innerHeight * 0.8;
        const jump =
          e.key === "ArrowDown"
            ? step * 0.25
            : e.key === "ArrowUp"
              ? -step * 0.25
              : e.key === "PageDown"
                ? step
                : e.key === "PageUp"
                  ? -step
                  : e.key === "Home"
                    ? -maxScroll()
                    : e.key === "End"
                      ? maxScroll()
                      : null;
        if (jump === null) return;
        e.preventDefault();
        show();
        window.scrollBy({ top: jump, behavior: "smooth" });
      };

      cabin.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      cabin.addEventListener("keydown", onKeyDown);
      return () => {
        st.kill();
        fuse?.kill();
        cabin.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        cabin.removeEventListener("keydown", onKeyDown);
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed top-1/2 right-1 z-40 h-[52vh] -translate-y-1/2 sm:right-2"
    >
      {/* Invisible track the car rides: no rails, no cables. */}
      <div data-shaft className="h-full w-9" aria-hidden="true" />

      <div
        data-cabin
        role="slider"
        aria-label="Page scroll position"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        tabIndex={0}
        className="pointer-events-auto absolute top-0 left-1/2 w-9 -translate-x-1/2 cursor-grab touch-none will-change-transform select-none active:cursor-grabbing"
      >
        {/* Floor indicator: LED digit between direction arrows */}
        <div className="mx-auto flex h-4 w-8 items-center justify-center gap-1 rounded-t-sm border border-[var(--border-strong)] border-b-0 bg-background">
          <span
            data-up
            aria-hidden="true"
            className="block border-x-[3px] border-b-[4px] border-x-transparent border-b-primary opacity-25"
          />
          <span data-floor className="tnum font-mono text-[9px] leading-none text-primary">
            G
          </span>
          <span
            data-down
            aria-hidden="true"
            className="block border-x-[3px] border-t-[4px] border-x-transparent border-t-primary opacity-25"
          />
        </div>

        {/* The car: warm-lit interior behind centre-opening metal doors */}
        <div className="relative h-12 w-9 overflow-hidden rounded-b-sm border border-[var(--border-strong)] bg-surface shadow-[var(--shadow-panel)]">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-primary/10 to-transparent" />
          <div
            data-door
            className="absolute inset-y-0 left-0 w-1/2 border-r border-background/70 bg-gradient-to-b from-surface-2 via-surface to-surface-2 will-change-transform"
          >
            <div className="absolute inset-y-2 right-1 w-px bg-foreground/10" />
          </div>
          <div
            data-door
            className="absolute inset-y-0 right-0 w-1/2 border-l border-background/70 bg-gradient-to-b from-surface-2 via-surface to-surface-2 will-change-transform"
          >
            <div className="absolute inset-y-2 left-1 w-px bg-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
