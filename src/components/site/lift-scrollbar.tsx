import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * The scrollbar as a cartoon lift: a cabin with split doors and a roof lamp on
 * one cable, a counterweight on the other. It appears while the page scrolls,
 * fades away when scrolling stops, and the cabin is a real control — drag it
 * (mouse or touch) to move the page, arrow keys work when it has focus.
 *
 * All breakpoints. The native scrollbar is hidden on desktop only (styles.css,
 * and only when motion is allowed); mobile keeps its overlay scrollbar, and the
 * rail is a 20px strip at the screen edge so it never covers content.
 * Reduced-motion visitors get the browser default and no lift.
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
      const weight = root.querySelector<HTMLElement>("[data-weight]");
      if (!shaft || !cabin || !weight) return;

      const range = () => shaft.clientHeight - cabin.clientHeight;
      const maxScroll = () => ScrollTrigger.maxScroll(window);

      gsap.to(cabin, {
        y: range,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true, invalidateOnRefresh: true },
      });
      gsap.fromTo(
        weight,
        { y: range },
        {
          y: 0,
          ease: "none",
          immediateRender: true,
          scrollTrigger: { start: 0, end: "max", scrub: true, invalidateOnRefresh: true },
        },
      );

      // Visible while scrolling or dragging; fades shortly after both stop.
      gsap.set(root, { autoAlpha: 0, x: 6 });
      let fuse: ReturnType<typeof gsap.delayedCall> | null = null;
      let dragging = false;
      const show = () => {
        gsap.to(root, { autoAlpha: 1, x: 0, duration: 0.25, ease: "power2.out" });
        fuse?.kill();
        fuse = gsap.delayedCall(1.0, () => {
          if (!dragging) gsap.to(root, { autoAlpha: 0, x: 6, duration: 0.5, ease: "power2.in" });
        });
      };
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          show();
          cabin.setAttribute("aria-valuenow", String(Math.round(self.progress * 100)));
        },
      });

      // Dragging the cabin drives the page.
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
        // Bypass every smoothing layer while the finger owns the cabin —
        // dragging must track 1:1, not be re-eased by Lenis.
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
      <div data-shaft className="relative h-full w-8" aria-hidden="true">
        {/* Cables */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-[8px] bg-border" />
        <div className="absolute inset-y-0 left-1/2 w-px translate-x-[10px] bg-[var(--border-strong)]" />
        {/* Floor marks */}
        {[0, 20, 40, 60, 80, 100].map((f) => (
          <div key={f} className="absolute left-0 h-px w-1.5 bg-border" style={{ top: `${f}%` }} />
        ))}
        {/* Counterweight on the far cable */}
        <div
          data-weight
          className="absolute top-0 left-1/2 h-5 w-1.5 translate-x-[7px] rounded-sm border border-border bg-surface will-change-transform"
        />
      </div>

      {/* Cabin: the one interactive piece — draggable, focusable, labelled. */}
      <div
        data-cabin
        role="slider"
        aria-label="Page scroll position"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        tabIndex={0}
        className="pointer-events-auto absolute top-0 left-1/2 w-7 -translate-x-1/2 cursor-grab touch-none will-change-transform select-none active:cursor-grabbing"
      >
        <div className="mx-auto h-1.5 w-px bg-[var(--border-strong)]" />
        <div className="mx-auto size-1.5 rounded-full bg-primary" />
        <div className="relative mt-0.5 h-11 w-7 rounded-md border border-[var(--border-strong)] bg-surface-2 shadow-[var(--shadow-panel)]">
          <div className="absolute inset-y-1 left-1/2 w-px bg-border" />
          <div className="absolute inset-y-1 left-1 w-[9px] rounded-sm border border-border bg-surface" />
          <div className="absolute inset-y-1 right-1 w-[9px] rounded-sm border border-border bg-surface" />
          <div className="absolute -top-0.5 left-1 size-1 rounded-full bg-primary/80" />
          <div className="absolute -top-0.5 right-1 size-1 rounded-full bg-muted-foreground/50" />
        </div>
        <div className="mx-auto mt-0.5 flex w-4 justify-between">
          <span className="h-1 w-1 rounded-b-sm bg-[var(--border-strong)]" />
          <span className="h-1 w-1 rounded-b-sm bg-[var(--border-strong)]" />
        </div>
      </div>
    </div>
  );
}
