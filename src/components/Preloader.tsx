import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

const WORD = "Lala's";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set(root.current, { display: "none" });
        onComplete();
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete });

      tl.set(root.current, { autoAlpha: 1 });
      tl.from(
        ".pl-letter",
        { yPercent: 130, duration: 1, ease: "expo.out", stagger: 0.06 },
        0.1,
      );
      tl.from(".pl-sub", { autoAlpha: 0, y: 12, duration: 0.6 }, 0.5);
      tl.to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = String(
                Math.round(counter.v),
              ).padStart(2, "0");
          },
        },
        0.2,
      );
      tl.to(".pl-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.2);
      tl.to(
        ".pl-letter",
        { yPercent: -130, duration: 0.8, ease: "expo.in", stagger: 0.05 },
        "+=0.25",
      );
      tl.to(".pl-fade", { autoAlpha: 0, duration: 0.3 }, "<");
      tl.to(
        root.current,
        { yPercent: -100, duration: 1, ease: "expo.inOut" },
        "-=0.15",
      );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="invisible fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest text-bone"
    >
      <div className="pl-fade absolute inset-x-0 top-0 flex justify-between px-6 py-6 text-[0.68rem] uppercase tracking-[0.28em] text-bone/55">
        <span>Lagos · NG</span>
        <span>Boho-chic</span>
      </div>

      <h1 className="flex overflow-hidden font-display text-[20vw] leading-none italic md:text-[10vw]">
        {WORD.split("").map((c, i) => (
          <span key={i} className="pl-letter inline-block">
            {c}
          </span>
        ))}
      </h1>

      <p className="pl-sub pl-fade mt-5 text-[0.72rem] uppercase tracking-[0.32em] text-bone/55">
        Bistro · Victoria Island
      </p>

      <div className="pl-fade absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-6">
        <div className="h-px w-40 overflow-hidden bg-bone/15">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-ochre" />
        </div>
        <span className="font-display text-lg">
          <span ref={countRef}>00</span>
          <span className="text-ochre">%</span>
        </span>
      </div>
    </div>
  );
}
