import { useRef } from "react";
import { hero, heroVideo, site } from "../data/site";
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
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".h-line span, .h-fade", { autoAlpha: 1, yPercent: 0 });
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
        );
    },
    { scope: root, dependencies: [start] },
  );

  // Parallax on the media layer.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".h-media", {
        yPercent: 12,
        scale: 1.06,
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
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream"
    >
      {/* Background media: video over image fallback */}
      <div className="h-media absolute inset-0 z-0 scale-110">
        <SmartImg
          src={heroVideo.poster}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroVideo.poster}
          preload="auto"
        >
          {heroVideo.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      </div>

      {/* Legibility overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top, rgba(15,15,13,0.92) 0%, rgba(15,15,13,0.40) 48%, rgba(15,15,13,0.70) 100%)",
        }}
      />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-16 pt-32">
        <div className="flex items-start justify-between">
          <Eyebrow className="h-fade text-cream/80">{hero.eyebrow}</Eyebrow>
          <div className="h-fade hidden text-right text-[0.7rem] uppercase leading-relaxed tracking-[0.22em] text-cream/60 sm:block">
            Open today
            <br />
            8am till late
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
          <p className="h-fade max-w-xl text-pretty text-lg leading-relaxed text-cream/80">
            {hero.lead}
          </p>
          <div className="h-fade flex flex-col items-start gap-5 md:items-end">
            <div className="flex flex-wrap gap-2">
              {hero.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cream/20 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-cream/75"
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
    </section>
  );
}
