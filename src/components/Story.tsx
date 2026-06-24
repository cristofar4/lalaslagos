import { useRef } from "react";
import { images, story } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";
import { SmartImg } from "./ui/SmartImg";

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
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(Math.round(obj.v));
        },
      });
    },
    { scope: ref },
  );

  return (
    <div data-reveal>
      <p className="font-display text-5xl leading-none text-cream">
        <span ref={ref}>0</span>
        <span className="text-lime">{suffix}</span>
      </p>
      <p className="mt-2 text-[0.74rem] uppercase tracking-[0.18em] text-stone">
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
      gsap.from(".story-clip", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".story-clip", start: "top 82%" },
      });
      gsap.to(".story-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-clip",
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
      className="scroll-mt-24 border-t border-line bg-ink py-24 md:py-36"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div className="relative order-last lg:order-first">
          <div className="story-clip relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-cream/10">
            <SmartImg
              src={images.story}
              alt="Inside Lala's Bistro"
              className="story-img absolute inset-0 h-full w-full scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <span className="absolute bottom-5 left-5 font-display text-2xl italic text-cream">
              The dining room
            </span>
          </div>
          <div
            data-reveal
            className="absolute -right-4 -top-4 rounded-2xl bg-lime px-5 py-4 text-ink shadow-xl md:-right-8"
          >
            <p className="font-display text-xl">Est. in Lagos</p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
              Sapara Williams
            </p>
          </div>
        </div>

        {/* Text */}
        <div>
          <Eyebrow className="text-stone">{story.eyebrow}</Eyebrow>
          <Headline
            as="h2"
            text={story.heading}
            accent="home"
            className="mt-6 text-section text-cream"
          />
          <div className="mt-7 max-w-lg space-y-5 text-lg leading-relaxed text-cream/70">
            {story.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {story.stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
