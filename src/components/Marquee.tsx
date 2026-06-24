import { useRef } from "react";
import { marquee } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";

function Group() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {marquee.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-8 font-display text-[clamp(2rem,5vw,4.5rem)] italic text-bone">
            {word}
          </span>
          <span className="text-[clamp(1rem,2vw,1.6rem)] text-ochre">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tween = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
      const el = wrap.current;
      if (!el) return;
      const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", fast);
      return () => {
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", fast);
      };
    },
    { scope: wrap },
  );

  return (
    <section className="border-y border-bone/10 bg-forest py-6 text-bone">
      <div ref={wrap} className="edge-fade overflow-hidden">
        <div ref={track} className="flex w-max">
          <Group />
          <Group />
        </div>
      </div>
    </section>
  );
}
