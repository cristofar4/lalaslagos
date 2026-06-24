import { useRef } from "react";
import { signatures } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { scrollToSection } from "../lib/smoothScroll";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";
import { SmartImg } from "./ui/SmartImg";

export function Showcase() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Desktop: pin the section and scroll the track sideways.
    mm.add("(min-width: 1024px)", () => {
      const el = track.current;
      if (!el) return;
      const distance = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <section id="signatures" className="scroll-mt-24 bg-ink text-cream">
      <div className="container-x pt-24 md:pt-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-stone">Signatures</Eyebrow>
            <Headline
              as="h2"
              text="The plates worth the trip"
              accent="trip"
              className="mt-6 text-section text-cream"
            />
          </div>
          <p className="hidden items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-stone lg:flex">
            Scroll to explore
            <span className="text-lime">→</span>
          </p>
        </div>
      </div>

      {/* Pinned horizontal viewport */}
      <div
        ref={pin}
        className="no-scrollbar mt-12 overflow-x-auto pb-20 lg:mt-16 lg:h-screen lg:overflow-hidden lg:pb-0 [scroll-snap-type:x_mandatory] lg:[scroll-snap-type:none]"
      >
        <div
          ref={track}
          className="flex w-max gap-4 px-6 md:gap-6 md:px-10 lg:h-full lg:items-center xl:px-14"
        >
          {signatures.map((dish, i) => (
            <article
              key={dish.name}
              className="w-[82vw] shrink-0 [scroll-snap-align:start] sm:w-[58vw] lg:w-[44vw] xl:w-[37vw]"
            >
              <div
                data-cursor="View"
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-cream/10"
              >
                <SmartImg
                  src={dish.image || ""}
                  alt={dish.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

                <span className="absolute right-5 top-5 font-display text-2xl text-cream/70">
                  0{i + 1}
                </span>
                <span className="absolute left-5 top-5 rounded-full bg-lime px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink">
                  {dish.kicker}
                </span>

                <div className="absolute inset-x-6 bottom-6">
                  <h3 className="font-display text-3xl leading-tight md:text-4xl">
                    {dish.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-cream/75">{dish.desc}</p>
                </div>
              </div>
            </article>
          ))}

          {/* Closing CTA panel */}
          <article className="flex w-[70vw] shrink-0 items-center [scroll-snap-align:start] sm:w-[40vw] lg:w-[30vw]">
            <button
              onClick={() => scrollToSection("#menu")}
              className="group flex flex-col items-start gap-5 text-left"
            >
              <span className="font-display text-4xl italic leading-tight text-cream">
                See the
                <br />
                full menu
              </span>
              <span className="btn">Explore the menu</span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
