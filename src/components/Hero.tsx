import { useRef } from "react";
import { hero, site } from "../data/site";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";
import { scrollToSection } from "../lib/smoothScroll";
import { Eyebrow } from "./ui/Eyebrow";
import { MagneticButton } from "./ui/MagneticButton";
import { ArtPanel } from "./ui/ArtPanel";

export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Intro — fires once the preloader hands off.
  useGSAP(
    () => {
      if (!start) {
        // Hold the curtain: keep animated bits hidden until `start`.
        gsap.set(".h-line span, .h-fade", { autoAlpha: 0 });
        gsap.set(".h-line span", { yPercent: 120 });
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".h-line span, .h-fade", { autoAlpha: 1, yPercent: 0, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".h-line span", {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.25,
        stagger: 0.12,
      })
        .to(
          ".h-fade",
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.8",
        )
        .from(
          ".h-accent",
          { autoAlpha: 0, scale: 0.9, duration: 1.2 },
          "-=1.1",
        );
    },
    { scope: root, dependencies: [start] },
  );

  // Parallax — decoupled from the intro so it always runs.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".h-accent", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".h-headline", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 75% 12%, rgba(201,162,75,0.20) 0%, transparent 60%), radial-gradient(70% 60% at 10% 90%, rgba(154,165,137,0.22) 0%, transparent 55%), linear-gradient(180deg, #f3ead9 0%, #efe4cf 100%)",
        }}
      />

      {/* Decorative arch accent */}
      <ArtPanel
        tone="forest"
        className="h-accent arch-top absolute right-[-6%] top-[14%] -z-[5] hidden h-[62%] w-[34%] rounded-b-[2rem] opacity-95 shadow-2xl md:block"
      />
      <div className="h-accent absolute left-[6%] top-[30%] -z-[5] hidden h-24 w-24 rounded-full border border-clay/40 md:block" />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-16 pt-32">
        <div className="flex items-center justify-between">
          <Eyebrow className="h-fade text-clay">{hero.eyebrow}</Eyebrow>
          <div className="h-fade hidden text-right text-[0.72rem] uppercase leading-relaxed tracking-[0.22em] text-espresso/55 sm:block">
            Open today
            <br />
            8:00 — 23:00
          </div>
        </div>

        <h1 className="h-headline mt-8 font-display text-hero text-espresso">
          {hero.lines.map((line, i) => (
            <span key={line} className="h-line block overflow-hidden">
              <span
                className={`inline-block ${i === 1 ? "italic text-clay" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <p className="h-fade max-w-xl text-pretty text-lg leading-relaxed text-espresso/75">
            {hero.lead}
          </p>
          <div className="h-fade flex flex-col items-start gap-5 md:items-end">
            <div className="flex flex-wrap gap-2">
              {hero.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-espresso/15 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-espresso/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href={site.phoneHref} className="btn btn--clay">
                Reserve a table
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection("#menu")}
                className="btn btn--ghost text-espresso"
              >
                View the menu
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToSection("#story")}
        className="h-fade group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-espresso/60"
        aria-label="Scroll to story"
      >
        <span className="text-[0.66rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-espresso/20">
          <span className="absolute inset-0 -translate-y-full animate-[scrollcue_1.8s_ease-in-out_infinite] bg-clay" />
        </span>
      </button>

      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}50%{transform:translateY(0)}100%{transform:translateY(100%)}}`}</style>
    </section>
  );
}
