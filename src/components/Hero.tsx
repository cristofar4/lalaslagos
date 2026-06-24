import { useRef } from "react";
import { gallery, hero, site } from "../data/site";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";
import { scrollToSection } from "../lib/smoothScroll";
import { Eyebrow } from "./ui/Eyebrow";
import { MagneticButton } from "./ui/MagneticButton";
import { SmartImg } from "./ui/SmartImg";

export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Intro — gated on the preloader handing off.
  useGSAP(
    () => {
      if (!start) {
        gsap.set(".h-line span, .h-fade", { autoAlpha: 0 });
        gsap.set(".h-line span", { yPercent: 120 });
        gsap.set(".h-strip-item", { clipPath: "inset(100% 0 0 0)" });
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".h-line span, .h-fade", { autoAlpha: 1, yPercent: 0 });
        gsap.set(".h-strip-item", { clipPath: "inset(0% 0 0 0)" });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".h-line span", {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.25,
          stagger: 0.12,
        })
        .to(
          ".h-fade",
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.85",
        )
        .to(
          ".h-strip-item",
          { clipPath: "inset(0% 0 0 0)", duration: 1.1, stagger: 0.1 },
          "-=0.9",
        );
    },
    { scope: root, dependencies: [start] },
  );

  // Parallax — always on.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".h-ghost", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".h-strip-img", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".h-strip",
          start: "top bottom",
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
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-28 text-cream"
    >
      {/* Oversized ghost word */}
      <div
        aria-hidden="true"
        className="h-ghost pointer-events-none absolute inset-x-0 top-[20%] z-0 select-none text-center font-display text-[32vw] italic leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(244,241,233,0.06)" }}
      >
        Bistro
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center">
        <div className="flex items-start justify-between">
          <Eyebrow className="h-fade text-cream/80">{hero.eyebrow}</Eyebrow>
          <div className="h-fade hidden text-right text-[0.7rem] uppercase leading-relaxed tracking-[0.22em] text-stone sm:block">
            Open today
            <br />
            8:00 — 23:00
          </div>
        </div>

        <h1 className="mt-8 font-display text-hero">
          <span className="h-line block overflow-hidden">
            <span className="inline-block">Lala's</span>
          </span>
          <span className="h-line block overflow-hidden">
            <span className="inline-block italic text-lime">Bistro</span>
          </span>
        </h1>

        <div className="mt-9 grid items-end gap-8 md:grid-cols-[1.5fr_1fr]">
          <p className="h-fade max-w-xl text-pretty text-lg leading-relaxed text-cream/75">
            {hero.lead}
          </p>
          <div className="h-fade flex flex-col items-start gap-5 md:items-end">
            <div className="flex flex-wrap gap-2">
              {hero.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cream/15 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-cream/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href={site.phoneHref} className="btn">
                Reserve a table
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection("#menu")}
                className="btn btn--ghost"
              >
                View the menu
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Image strip */}
      <div className="h-strip container-x relative z-10 pb-10 pt-12">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-4">
          {gallery.slice(0, 4).map((src, i) => (
            <div
              key={src}
              className={`h-strip-item overflow-hidden rounded-xl ${
                i === 3 ? "hidden md:block" : ""
              }`}
            >
              <SmartImg
                src={src}
                className="h-strip-img h-24 w-full scale-110 object-cover sm:h-32 md:h-44"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
