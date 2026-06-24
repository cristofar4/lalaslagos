import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Sets up Lenis smooth scrolling and drives it from GSAP's ticker so that
 * ScrollTrigger and Lenis stay perfectly in sync. Mount once, near the root.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Make sure triggers measure correctly once everything has settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(ticker);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/** Smoothly scroll to a selector or element, accounting for the fixed navbar. */
export function scrollToSection(target: string | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { offset: -8, duration: 1.25 });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
