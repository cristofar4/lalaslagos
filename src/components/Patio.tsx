import { useRef } from "react";
import { images, patio } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";
import { ArtPanel } from "./ui/ArtPanel";

const lights = [
  { top: "18%", left: "12%", d: "0s" },
  { top: "30%", left: "82%", d: "0.6s" },
  { top: "62%", left: "22%", d: "1.1s" },
  { top: "72%", left: "70%", d: "0.3s" },
  { top: "44%", left: "48%", d: "0.9s" },
  { top: "24%", left: "60%", d: "1.4s" },
];

export function Patio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".patio-bg", {
        yPercent: 14,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".patio-copy > *", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="patio"
      className="relative flex min-h-[92svh] scroll-mt-24 items-center overflow-hidden text-cream"
    >
      <ArtPanel
        tone="dusk"
        sprig={false}
        image={images.patio}
        overlay={false}
        className="patio-bg absolute inset-0 -z-10 scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/70" />

      {lights.map((l, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-lime blur-[1px]"
          style={{
            top: l.top,
            left: l.left,
            boxShadow: "0 0 12px 3px rgba(201,242,77,0.7)",
            animation: `twinkle 3s ease-in-out ${l.d} infinite`,
          }}
        />
      ))}

      <div className="container-x patio-copy relative max-w-3xl">
        <Eyebrow className="text-lime">{patio.eyebrow}</Eyebrow>
        <Headline
          as="h2"
          text="Boho chic, after dark"
          accent="dark"
          className="mt-6 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98]"
        />
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80">
          {patio.body}
        </p>
        <p className="mt-8 text-[0.74rem] uppercase tracking-[0.22em] text-cream/60">
          {patio.caption}
        </p>
      </div>

      <style>{`@keyframes twinkle{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1.15)}}`}</style>
    </section>
  );
}
