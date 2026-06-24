import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../../lib/gsap";

/** Thin lime progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[80] h-[3px]">
      <div ref={bar} className="h-full w-full bg-lime" />
    </div>
  );
}
