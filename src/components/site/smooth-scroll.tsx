import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Weighted smooth scroll (Lenis) driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree. Touch devices keep native scrolling (Lenis only
 * smooths wheel input), and reduced-motion visitors get the browser's own scroll.
 */
function LenisScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  if (typeof window !== "undefined" && prefersReducedMotion()) {
    return <>{children}</>;
  }
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.15, smoothWheel: true, autoRaf: false }}>
      <LenisScrollSync />
      {children}
    </ReactLenis>
  );
}
