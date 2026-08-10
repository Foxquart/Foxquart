import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/* House easing — mirrors --ease-brand in styles.css. */
export const EASE = "expo.out";
export const EASE_INOUT = "power4.inOut";

/** True when the visitor asked for reduced motion; every choreography checks this. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
