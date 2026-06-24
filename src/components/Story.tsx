import { useRef } from "react";
import { images, story } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { Eyebrow } from "./ui/Eyebrow";
import { ArtPanel } from "./ui/ArtPanel";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (ref.current) ref.current.textContent = String(value);
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration: 1.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(Math.round(obj.v));
        },
      });
    },
    { scope: ref },
  );

  return (
    <div data-reveal>
      <p className="font-display text-5xl leading-none text-forest">
        <span ref={ref}>0</span>
        <span className="text-clay">{suffix}</span>
      </p>
      <p className="mt-2 text-[0.78rem] uppercase tracking-[0.18em] text-espresso/55">
        {label}
      </p>
    </div>
  );
}

export function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".story-art-inner", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-art",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="story"
      className="relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow className="text-clay" >
            <span data-reveal>{story.eyebrow}</span>
          </Eyebrow>
          <h2
            data-reveal
            className="mt-6 text-section text-balance text-forest"
          >
            {story.heading}
          </h2>
          <div className="mt-7 max-w-lg space-y-5 text-lg leading-relaxed text-espresso/75">
            {story.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-espresso/10 pt-8">
            {story.stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Image / art column */}
        <div className="story-art relative">
          <div className="arch-top relative aspect-[4/5] w-full overflow-hidden rounded-b-[1.5rem] shadow-xl">
            <div className="story-art-inner absolute inset-0 scale-[1.2]">
              <ArtPanel
                tone="sage"
                image={images.story}
                className="h-full w-full"
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
              <span className="font-display text-2xl italic text-bone">
                The dining room
              </span>
              <span className="rounded-full bg-bone/15 px-3 py-1 text-[0.66rem] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                Warm &amp; low-lit
              </span>
            </div>
          </div>

          {/* floating chip */}
          <div
            data-reveal
            className="absolute -left-4 -top-4 z-10 rounded-2xl bg-bone px-5 py-4 shadow-lg ring-1 ring-espresso/5 md:-left-8"
          >
            <p className="font-display text-xl text-forest">Est. in Lagos</p>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-clay">
              Sapara Williams
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
